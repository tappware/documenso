import { createElement } from 'react';

import { mailer } from '@documenso/email/mailer';
import { ContactSalesEmailTemplate } from '@documenso/email/templates/contact-sales';

import { NEXT_PUBLIC_WEBAPP_URL } from '../../constants/app';
import { DOCUMENSO_INTERNAL_EMAIL } from '../../constants/email';
import { renderEmailWithI18N } from '../../utils/render-email-with-i18n';

export type SendContactSalesEmailOptions = {
  name: string;
  email: string;
  company: string;
  phone?: string;
  message: string;
};

export const sendContactSalesEmail = async ({
  name,
  email,
  company,
  phone,
  message,
}: SendContactSalesEmailOptions) => {
  const assetBaseUrl = NEXT_PUBLIC_WEBAPP_URL() || 'http://localhost:3000';

  const template = createElement(ContactSalesEmailTemplate, {
    name,
    email,
    company,
    phone,
    message,
    assetBaseUrl,
  });

  const [html, text] = await Promise.all([
    renderEmailWithI18N(template),
    renderEmailWithI18N(template, { plainText: true }),
  ]);

  // Send to sales team (you can configure this email in environment variables)
  const salesEmail = process.env.NEXT_PRIVATE_SALES_EMAIL || 'support@doxsigner.com';

  await mailer.sendMail({
    to: salesEmail,
    from: DOCUMENSO_INTERNAL_EMAIL,
    replyTo: {
      name,
      address: email,
    },
    subject: `New Sales Inquiry from ${name} at ${company}`,
    html,
    text,
  });

  // Send confirmation email to the customer
  const confirmationTemplate = createElement(ContactSalesEmailTemplate, {
    name,
    email,
    company,
    phone,
    message,
    assetBaseUrl,
    isCustomerCopy: true,
  });

  const [confirmationHtml, confirmationText] = await Promise.all([
    renderEmailWithI18N(confirmationTemplate),
    renderEmailWithI18N(confirmationTemplate, { plainText: true }),
  ]);

  await mailer.sendMail({
    to: {
      name,
      address: email,
    },
    from: DOCUMENSO_INTERNAL_EMAIL,
    subject: 'Thank you for contacting Doxsigner Sales',
    html: confirmationHtml,
    text: confirmationText,
  });
};
