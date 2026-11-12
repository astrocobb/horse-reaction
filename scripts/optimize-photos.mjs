/*
  Turns full-size phone photos into web-sized gallery images.

  1. Put photos (JPEG, PNG, HEIC, WebP) in ./photos at the project root. That folder is not committed.
  2. Run `npm run photos`.
  3. Resized WebP files land in public/assets/gallery/, and their sizes in app/data/gallery-manifest.json.
  4. Add an entry for each new photo in app/data/gallery.ts. The script prints a starter entry for any photo
     that isn't listed yet.

  Photos that were already processed are skipped unless the original is newer than the output.
*/
import { readdir, readFile, writeFile, mkdir, stat } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const root = path.resolve(import.meta.dirname, '..')
const sourceDir = path.join(root, 'photos')
const outDir = path.join(root, 'public/assets/gallery')
const manifestPath = path.join(root, 'app/data/gallery-manifest.json')
const galleryPath = path.join(root, 'app/data/gallery.ts')

// Rail frames are ~20rem wide (640px at 2x); the viewer goes up to full screen.
const WIDTHS = [480, 960, 1600, 2400]
const QUALITY = 76
const EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.heic', '.heif'])

const slugify = name =>
  name.toLowerCase().replace(/\.[^.]+$/, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

async function decode(file) {
  const ext = path.extname(file).toLowerCase()
  if (ext !== '.heic' && ext !== '.heif') return sharp(file)
  // sharp's prebuilt binaries can't read iPhone HEIC, so convert to JPEG in memory first
  const { default: convert } = await import('heic-convert')
  const jpeg = await convert({ buffer: await readFile(file), format: 'JPEG', quality: 0.95 })
  return sharp(Buffer.from(jpeg))
}

async function main() {
  if (!existsSync(sourceDir)) {
    await mkdir(sourceDir, { recursive: true })
    console.log('Created ./photos. Put your photos there and run `npm run photos` again.')
    return
  }
  await mkdir(outDir, { recursive: true })

  const manifest = existsSync(manifestPath) ? JSON.parse(await readFile(manifestPath, 'utf8')) : {}
  const files = (await readdir(sourceDir)).filter(f => EXTENSIONS.has(path.extname(f).toLowerCase())).sort()

  if (files.length === 0) {
    console.log('No photos found in ./photos.')
    return
  }

  let processed = 0
  for (const file of files) {
    const source = path.join(sourceDir, file)
    const slug = slugify(file)
    const existing = manifest[slug]

    if (existing) {
      const newest = path.join(outDir, `${ slug }-${ existing.widths.at(-1) }.webp`)
      if (existsSync(newest) && (await stat(newest)).mtimeMs >= (await stat(source)).mtimeMs) continue
    }

    // rotate() applies the phone's EXIF orientation so portrait shots stay portrait
    const image = (await decode(source)).rotate()
    const meta = await image.metadata()
    // EXIF orientations 5–8 are 90° turns, so width and height swap once rotated
    const turned = (meta.orientation ?? 1) >= 5
    const width = turned ? meta.height : meta.width
    const height = turned ? meta.width : meta.height

    const widths = WIDTHS.filter(w => w < width)
    if (widths.length < WIDTHS.length) widths.push(Math.min(width, WIDTHS.at(-1)))

    for (const w of widths) {
      await image
        .clone()
        .resize({ width: w, withoutEnlargement: true })
        .webp({ quality: QUALITY, effort: 5 })
        .toFile(path.join(outDir, `${ slug }-${ w }.webp`))
    }

    manifest[slug] = { width, height, widths: [...new Set(widths)] }
    processed++
    console.log(`  ${ file } -> ${ slug } (${ width }x${ height })`)
  }

  const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)))
  await writeFile(manifestPath, JSON.stringify(sorted, null, 2) + '\n')
  console.log(processed ? `Processed ${ processed } photo(s).` : 'All photos already up to date.')

  const galleryText = existsSync(galleryPath) ? await readFile(galleryPath, 'utf8') : ''
  const unlisted = Object.keys(sorted).filter(slug => !galleryText.includes(`'${ slug }'`))
  if (unlisted.length) {
    console.log(`\nNot shown on the site yet. Add these to app/data/gallery.ts and fill in the details:\n`)
    for (const slug of unlisted) {
      console.log(`  { slug: '${ slug }', caption: '', place: '', alt: '', ground: 0.85, focusX: 0.5 },`)
    }
  }
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
