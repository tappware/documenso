import { zodResolver } from '@hookform/resolvers/zod';
import { Trans, useLingui } from '@lingui/react/macro';
import { BuildingIcon, MailIcon, PhoneIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import type { MetaFunction } from 'react-router';
import { z } from 'zod';

import { trpc } from '@documenso/trpc/react';
import { Button } from '@documenso/ui/primitives/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@documenso/ui/primitives/form/form';
import { Input } from '@documenso/ui/primitives/input';
import { Textarea } from '@documenso/ui/primitives/textarea';
import { useToast } from '@documenso/ui/primitives/use-toast';

import { BrandingLogo } from '~/components/general/branding-logo';

export const meta: MetaFunction = () => {
  return [
    { title: 'Contact Sales - Doxsigner' },
    {
      name: 'description',
      content: 'Get in touch with our sales team to learn more about Doxsigner for your business.',
    },
  ];
};

const ZContactSalesFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  company: z.string().min(1, 'Company name is required'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type TContactSalesForm = z.infer<typeof ZContactSalesFormSchema>;

export default function ContactPage() {
  const { t } = useLingui();
  const { toast } = useToast();

  const { mutateAsync: submitContactSales, isPending } =
    trpc.contact.submitContactSales.useMutation();

  const form = useForm<TContactSalesForm>({
    resolver: zodResolver(ZContactSalesFormSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      phone: '',
      message: '',
    },
  });

  const isLoading = form.formState.isSubmitting || isPending;

  const onSubmit = async (data: TContactSalesForm) => {
    try {
      await submitContactSales(data);

      toast({
        title: t`Message sent!`,
        description: t`Thank you for contacting us. We'll get back to you within 24 hours.`,
      });

      form.reset();
    } catch (error) {
      console.error(error);
      toast({
        title: t`Something went wrong`,
        description: t`Please try again or email us directly at support@doxsigner.com`,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <a href="/" className="flex items-center">
            <BrandingLogo className="h-8 w-auto" />
          </a>
          <div className="flex gap-4">
            <Button variant="ghost" asChild>
              <a href="/signin">
                <Trans>Sign In</Trans>
              </a>
            </Button>
            <Button asChild>
              <a href="/signup">
                <Trans>Sign Up</Trans>
              </a>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
            {/* Left Column - Info */}
            <div className="flex flex-col justify-center space-y-8">
              <div>
                <h1 className="mb-4 text-4xl font-bold text-slate-900">
                  <Trans>Contact Sales</Trans>
                </h1>
                <p className="text-lg text-slate-600">
                  <Trans>
                    Get in touch with our sales team to learn how Doxsigner can help your business
                    streamline document signing and management.
                  </Trans>
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 rounded-lg p-3">
                    <MailIcon className="text-primary h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-slate-900">
                      <Trans>Email Us</Trans>
                    </h3>
                    <p className="text-slate-600">support@doxsigner.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 rounded-lg p-3">
                    <PhoneIcon className="text-primary h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-slate-900">
                      <Trans>Call Us</Trans>
                    </h3>
                    <p className="text-slate-600">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 rounded-lg p-3">
                    <BuildingIcon className="text-primary h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-slate-900">
                      <Trans>Enterprise Solutions</Trans>
                    </h3>
                    <p className="text-slate-600">
                      <Trans>Custom pricing and dedicated support for large organizations</Trans>
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h3 className="mb-4 font-semibold text-slate-900">
                  <Trans>Why Choose Doxsigner?</Trans>
                </h3>
                <ul className="space-y-3 text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>
                      <Trans>Open-source and self-hostable</Trans>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>
                      <Trans>Secure and compliant document signing</Trans>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>
                      <Trans>Advanced team collaboration features</Trans>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>
                      <Trans>API and webhook integration</Trans>
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-lg">
              <h2 className="mb-6 text-2xl font-semibold text-slate-900">
                <Trans>Send us a message</Trans>
              </h2>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <fieldset disabled={isLoading} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel required>
                            <Trans>Full Name</Trans>
                          </FormLabel>
                          <FormControl>
                            <Input placeholder={t`John Doe`} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel required>
                            <Trans>Email Address</Trans>
                          </FormLabel>
                          <FormControl>
                            <Input type="email" placeholder={t`john@company.com`} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel required>
                            <Trans>Company Name</Trans>
                          </FormLabel>
                          <FormControl>
                            <Input placeholder={t`Acme Inc.`} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            <Trans>Phone Number</Trans> <Trans>(Optional)</Trans>
                          </FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder={t`+1 (555) 123-4567`} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel required>
                            <Trans>Message</Trans>
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              rows={5}
                              placeholder={t`Tell us about your needs and how we can help...`}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full" size="lg" loading={isLoading}>
                      <Trans>Send Message</Trans>
                    </Button>

                    <p className="text-center text-sm text-slate-500">
                      <Trans>We'll respond within 24 hours</Trans>
                    </p>
                  </fieldset>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-slate-600">
            © {new Date().getFullYear()} Doxsigner. <Trans>All rights reserved.</Trans>
          </p>
        </div>
      </footer>
    </div>
  );
}
