import { router } from '../trpc';
import { submitContactSales } from './submit-contact-sales';

export const contactRouter = router({
  submitContactSales,
});
