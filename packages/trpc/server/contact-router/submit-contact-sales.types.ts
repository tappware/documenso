import { z } from 'zod';

export const ZSubmitContactSalesRequestSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  company: z.string().min(1, 'Company name is required'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export type TSubmitContactSalesRequest = z.infer<typeof ZSubmitContactSalesRequestSchema>;

export const ZSubmitContactSalesResponseSchema = z.object({
  success: z.boolean(),
});

export type TSubmitContactSalesResponse = z.infer<typeof ZSubmitContactSalesResponseSchema>;
