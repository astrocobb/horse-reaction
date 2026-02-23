import { z } from 'zod'


export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .refine(val => val.split(/\s+/).filter(p => p.length > 0).length >= 2, {
      message: 'Please enter both your first and last name'
    }),
  phone: z
    .e164('Please enter a valid phone number'),
  email: z
    .email()
    .min(8)
    .max(64),
  subject: z
    .string()
    .trim()
    .min(8, 'Subject must be at least 8 characters')
    .max(64, 'Subject must be at most 64 characters'),
  message: z
    .string()
    .trim()
    .min(16, 'Message must be at least 16 characters')
    .max(1024, 'Message must be at most 1024 characters')
})