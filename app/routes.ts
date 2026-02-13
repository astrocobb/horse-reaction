import { index, layout, type RouteConfig } from '@react-router/dev/routes'


export default [

  layout('layout/RootLayout.tsx', [

    index('routes/Home.tsx')

  ])

] satisfies RouteConfig
