import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';

import { NEXT_APP_NAME } from '@documenso/lib/constants/app';

import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '../components';
import { useBranding } from '../providers/branding';
import { TemplateFooter } from '../template-components/template-footer';

export type ContactSalesEmailTemplateProps = {
  name: string;
  email: string;
  company: string;
  phone?: string;
  message: string;
  assetBaseUrl?: string;
  isCustomerCopy?: boolean;
};

export const ContactSalesEmailTemplate = ({
  name,
  email,
  company,
  phone,
  message,
  assetBaseUrl = 'http://localhost:3002',
  isCustomerCopy = false,
}: ContactSalesEmailTemplateProps) => {
  const { _ } = useLingui();
  const branding = useBranding();

  const previewText = isCustomerCopy
    ? msg`Thank you for contacting Doxsigner Sales`
    : msg`New Sales Inquiry from ${name}`;

  const getAssetUrl = (path: string) => {
    return new URL(path, assetBaseUrl).toString();
  };

  return (
    <Html>
      <Head />
      <Preview>{_(previewText)}</Preview>

      <Body className="mx-auto my-auto bg-white font-sans">
        <Section>
          <Container className="mx-auto mb-2 mt-8 max-w-xl rounded-lg border border-solid border-slate-200 p-4 backdrop-blur-sm">
            <Section>
              {branding.brandingEnabled && branding.brandingLogo ? (
                <Img src={branding.brandingLogo} alt="Branding Logo" className="mb-4 h-6" />
              ) : (
                <Img
                  src={getAssetUrl('/static/logo.png')}
                  alt={`${NEXT_APP_NAME()} Logo`}
                  className="mb-4 h-6"
                />
              )}

              {isCustomerCopy ? (
                <>
                  <Heading className="text-xl font-semibold">Thank you for contacting us!</Heading>

                  <Text className="text-slate-600">Hi {name},</Text>

                  <Text className="text-slate-600">
                    Thank you for your interest in {NEXT_APP_NAME()}. We've received your inquiry
                    and our sales team will get back to you within 24 hours.
                  </Text>

                  <Section className="my-4 rounded-lg bg-slate-50 p-4">
                    <Text className="mb-2 text-sm font-semibold text-slate-900">
                      Your inquiry details:
                    </Text>
                    <Text className="text-sm text-slate-600">
                      <strong>Company:</strong> {company}
                    </Text>
                    {phone && (
                      <Text className="text-sm text-slate-600">
                        <strong>Phone:</strong> {phone}
                      </Text>
                    )}
                    <Text className="text-sm text-slate-600">
                      <strong>Message:</strong>
                    </Text>
                    <Text className="whitespace-pre-wrap text-sm text-slate-600">{message}</Text>
                  </Section>

                  <Text className="text-slate-600">
                    In the meantime, feel free to explore our{' '}
                    <Link href={assetBaseUrl} className="text-blue-600 underline">
                      platform
                    </Link>
                  </Text>

                  <Text className="mt-4 text-slate-600">
                    Best regards,
                    <br />
                    The {NEXT_APP_NAME()} Sales Team
                  </Text>
                </>
              ) : (
                <>
                  <Heading className="text-xl font-semibold">New Sales Inquiry</Heading>

                  <Text className="text-slate-600">
                    You have received a new sales inquiry from the contact form.
                  </Text>

                  <Hr className="my-4" />

                  <Section className="my-4">
                    <Text className="mb-2 text-sm font-semibold text-slate-900">
                      Contact Information:
                    </Text>
                    <Text className="text-sm text-slate-600">
                      <strong>Name:</strong> {name}
                    </Text>
                    <Text className="text-sm text-slate-600">
                      <strong>Email:</strong>{' '}
                      <Link href={`mailto:${email}`} className="text-blue-600 underline">
                        {email}
                      </Link>
                    </Text>
                    <Text className="text-sm text-slate-600">
                      <strong>Company:</strong> {company}
                    </Text>
                    {phone && (
                      <Text className="text-sm text-slate-600">
                        <strong>Phone:</strong> {phone}
                      </Text>
                    )}
                  </Section>

                  <Hr className="my-4" />

                  <Section className="my-4">
                    <Text className="mb-2 text-sm font-semibold text-slate-900">Message:</Text>
                    <Text className="whitespace-pre-wrap text-sm text-slate-600">{message}</Text>
                  </Section>

                  <Hr className="my-4" />

                  <Text className="text-sm text-slate-500">
                    You can reply directly to this email to respond to {name}.
                  </Text>
                </>
              )}
            </Section>
          </Container>

          <Container className="mx-auto max-w-xl">
            <TemplateFooter isDocument={false} />
          </Container>
        </Section>
      </Body>
    </Html>
  );
};

export default ContactSalesEmailTemplate;
