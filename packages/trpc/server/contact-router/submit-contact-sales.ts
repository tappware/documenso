import { sendContactSalesEmail } from '@documenso/lib/server-only/contact/send-contact-sales-email';

import { procedure } from '../trpc';
import {
  type TSubmitContactSalesResponse,
  ZSubmitContactSalesRequestSchema,
  ZSubmitContactSalesResponseSchema,
} from './submit-contact-sales.types';

export const submitContactSales = procedure
  .meta({
    openapi: {
      method: 'POST',
      path: '/contact/sales',
      summary: 'Submit contact sales inquiry',
      description: 'Submit a contact sales inquiry form',
      tags: ['Contact'],
    },
  })
  .input(ZSubmitContactSalesRequestSchema)
  .output(ZSubmitContactSalesResponseSchema)
  .mutation(async ({ input }): Promise<TSubmitContactSalesResponse> => {
    const { name, email, company, phone, message } = input;

    await sendContactSalesEmail({
      name,
      email,
      company,
      phone,
      message,
    });

    return {
      success: true,
    };
  });
