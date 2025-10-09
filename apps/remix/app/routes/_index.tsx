import { Trans } from '@lingui/react/macro';
import { Link, redirect } from 'react-router';

import { extractCookieFromHeaders } from '@documenso/auth/server/lib/utils/cookies';
import { getOptionalSession } from '@documenso/auth/server/lib/utils/get-session';
import { getTeams } from '@documenso/lib/server-only/team/get-teams';
import { formatDocumentsPath } from '@documenso/lib/utils/teams';
import { ZTeamUrlSchema } from '@documenso/trpc/server/team-router/schema';
import { Button } from '@documenso/ui/primitives/button';

import { BrandingLogo } from '~/components/general/branding-logo';
import { appMetaTags } from '~/utils/meta';

import type { Route } from './+types/_index';

export function meta() {
  return appMetaTags('Home');
}

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getOptionalSession(request);

  if (session.isAuthenticated) {
    const teamUrlCookie = extractCookieFromHeaders('preferred-team-url', request.headers);

    const preferredTeamUrl =
      teamUrlCookie && ZTeamUrlSchema.safeParse(teamUrlCookie).success ? teamUrlCookie : undefined;

    const teams = await getTeams({ userId: session.user.id });

    let currentTeam = teams.find((team) => team.url === preferredTeamUrl);

    if (!currentTeam && teams.length === 1) {
      currentTeam = teams[0];
    }

    if (!currentTeam) {
      throw redirect('/inbox');
    }

    throw redirect(formatDocumentsPath(currentTeam.url));
  }

  return {};
}

export default function Index() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-white dark:bg-gray-950">
      {/* Animated Background Gradients - Only for non-hero sections */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-96 w-96 animate-pulse rounded-full bg-gradient-to-br from-blue-400/10 to-purple-400/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 animate-pulse rounded-full bg-gradient-to-tr from-indigo-400/10 to-pink-400/10 blur-3xl delay-1000" />
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-gradient-to-r from-cyan-400/5 to-blue-400/5 blur-3xl delay-500" />
      </div>

      {/* Glassmorphic Sticky Header */}
      <header className="sticky top-0 z-50 border-b border-white/20 bg-white/70 backdrop-blur-xl dark:border-gray-800/50 dark:bg-gray-950/70">
        <div className="container mx-auto flex items-center justify-between px-4 py-4 lg:px-8">
          <BrandingLogo className="h-8 transition-transform hover:scale-105" />
          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#about"
              className="text-muted-foreground hover:text-foreground font-medium transition-all hover:scale-105"
            >
              <Trans>About</Trans>
            </a>
            <a
              href="#steps"
              className="text-muted-foreground hover:text-foreground font-medium transition-all hover:scale-105"
            >
              <Trans>Steps</Trans>
            </a>
            <a
              href="#packages"
              className="text-muted-foreground hover:text-foreground font-medium transition-all hover:scale-105"
            >
              <Trans>Packages</Trans>
            </a>
            <a
              href="#demo"
              className="text-muted-foreground hover:text-foreground font-medium transition-all hover:scale-105"
            >
              <Trans>Demo</Trans>
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" size="sm" className="hover:scale-105">
              <Link to="/signin">
                <Trans>Sign In</Trans>
              </Link>
            </Button>
            <Button
              asChild
              size="sm"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 transition-all hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50"
            >
              <Link to="/signup">
                <Trans>Get Started</Trans>
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Modern Hero Section */}
      <section
        id="about"
        className="relative z-0 flex min-h-[700px] flex-col items-center justify-center overflow-hidden px-4 py-32 text-center"
      >
        {/* Gradient Background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              'linear-gradient(135deg, rgba(59, 130, 246, 0.95), rgba(99, 102, 241, 0.9), rgba(139, 92, 246, 0.85)), url(https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1600&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {/* Animated Grid Pattern */}
        <div
          className="absolute inset-0 z-0 opacity-20"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />

        <div className="animate-in fade-in slide-in-from-bottom-4 relative z-10 max-w-5xl space-y-8 duration-1000">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            <Trans>Join 25,000+ users signing documents daily</Trans>
          </div>

          <h1 className="bg-gradient-to-r from-white via-white to-blue-100 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent drop-shadow-lg md:text-6xl lg:text-7xl">
            <Trans>The Future of</Trans>
            <br />
            <span className="bg-gradient-to-r from-yellow-200 via-pink-200 to-blue-200 bg-clip-text">
              <Trans>Document Signing</Trans>
            </span>
          </h1>

          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-white/95 drop-shadow-md md:text-2xl">
            <Trans>
              Transform how you sign documents. DoxSigner combines enterprise-grade security with
              elegant simplicity. Perfect for contracts, agreements, NDAs, and more — all 100%
              digital.
            </Trans>
          </p>

          <div className="flex flex-col items-center justify-center gap-4 pt-6 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="group relative overflow-hidden bg-gradient-to-r from-red-600 to-pink-600 px-8 py-6 text-lg font-semibold shadow-2xl shadow-red-500/50 transition-all hover:scale-105 hover:shadow-red-500/70"
            >
              <a href="#steps">
                <Trans>Get Started Free</Trans>
                <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/30 bg-white/10 px-8 py-6 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:scale-105 hover:bg-white/20"
            >
              <a href="#demo">
                <Trans>Watch Demo</Trans>
              </a>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-12">
            <div className="space-y-1">
              <div className="text-3xl font-bold text-white">250K+</div>
              <div className="text-sm text-white/80">
                <Trans>Documents Signed</Trans>
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold text-white">99.9%</div>
              <div className="text-sm text-white/80">
                <Trans>Uptime SLA</Trans>
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold text-white">&lt;2min</div>
              <div className="text-sm text-white/80">
                <Trans>Avg. Sign Time</Trans>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <div id="steps" className="scroll-mt-20 py-20">
        {/* Section Header */}
        <div className="container mx-auto mb-16 px-4 text-center lg:px-8">
          <h2 className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-extrabold text-transparent md:text-5xl">
            <Trans>How It Works</Trans>
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            <Trans>Simple, secure, and efficient document signing in just 5 easy steps</Trans>
          </p>
        </div>

        {/* Step 1: Upload */}
        <section className="container mx-auto px-4 py-12 lg:px-8">
          <div className="group flex flex-col items-center gap-12 md:flex-row">
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-xl font-bold text-white shadow-lg">
                  1
                </span>
                <h2 className="text-3xl font-bold md:text-4xl">
                  <Trans>Upload Your Documents</Trans>
                </h2>
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed">
                <Trans>
                  Simply drag and drop your PDF documents or select from your device. Our advanced
                  encryption ensures your files are secure from upload to signature completion.
                </Trans>
              </p>
              <div className="flex items-start gap-3 rounded-lg border border-blue-200 bg-blue-50/50 p-4 dark:border-blue-900 dark:bg-blue-950/30">
                <span className="text-2xl">🚀</span>
                <p className="text-sm">
                  <Trans>Lightning-fast upload • Multi-page support • 256-bit AES encryption</Trans>
                </p>
              </div>
            </div>
            <div className="flex-1">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl transition-transform group-hover:scale-105">
                <img
                  src="https://images.unsplash.com/photo-1735825764485-93a381fd5779?auto=format&fit=crop&w=1200&q=80"
                  alt="Upload PDF Document - Drag and drop interface"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent" />
              </div>
            </div>
          </div>
        </section>

        {/* Step 2: Set Signatories */}
        <section className="bg-gradient-to-br from-purple-50/50 to-pink-50/50 py-16 dark:from-purple-950/20 dark:to-pink-950/20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="group flex flex-col items-center gap-12 md:flex-row-reverse">
              <div className="flex-1 space-y-6">
                <div className="inline-flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-purple-600 text-xl font-bold text-white shadow-lg">
                    2
                  </span>
                  <h2 className="text-3xl font-bold md:text-4xl">
                    <Trans>Set the Signatories</Trans>
                  </h2>
                </div>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  <Trans>
                    Add unlimited signatories with custom roles. Drag signature fields anywhere on
                    your document. Set sequential or parallel signing workflows with complete
                    control.
                  </Trans>
                </p>
                <div className="flex items-start gap-3 rounded-lg border border-purple-200 bg-purple-50/50 p-4 dark:border-purple-900 dark:bg-purple-950/30">
                  <span className="text-2xl">⚡</span>
                  <p className="text-sm">
                    <Trans>Custom signing order • Role-based permissions • Bulk actions</Trans>
                  </p>
                </div>
              </div>
              <div className="flex-1">
                <div className="relative overflow-hidden rounded-2xl shadow-2xl transition-transform group-hover:scale-105">
                  <img
                    src="https://images.unsplash.com/photo-1666018215790-867b14fe4822?auto=format&fit=crop&w=1200&q=80"
                    alt="Set Multiple Signatories - Team collaboration"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Step 3: Send via Email */}
        <section className="container mx-auto px-4 py-12 lg:px-8">
          <div className="group flex flex-col items-center gap-12 md:flex-row">
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 text-xl font-bold text-white shadow-lg">
                  3
                </span>
                <h2 className="text-3xl font-bold md:text-4xl">
                  <Trans>Send Documents via Email</Trans>
                </h2>
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed">
                <Trans>
                  Securely deliver documents with one click. Automated reminders keep everyone on
                  track. Monitor opens, views, and completion status in real-time from your
                  dashboard.
                </Trans>
              </p>
              <div className="flex items-start gap-3 rounded-lg border border-indigo-200 bg-indigo-50/50 p-4 dark:border-indigo-900 dark:bg-indigo-950/30">
                <span className="text-2xl">📊</span>
                <p className="text-sm">
                  <Trans>Real-time tracking • Auto reminders • Email notifications</Trans>
                </p>
              </div>
            </div>
            <div className="flex-1">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl transition-transform group-hover:scale-105">
                <img
                  src="https://images.unsplash.com/photo-1596526131083-e8c633c948d2?auto=format&fit=crop&w=1200&q=80"
                  alt="Send Documents via Email - Email notification"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-600/20 to-transparent" />
              </div>
            </div>
          </div>
        </section>

        {/* Step 4: Sign Electronically */}
        <section className="bg-gradient-to-br from-green-50/50 to-emerald-50/50 py-16 dark:from-green-950/20 dark:to-emerald-950/20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="group flex flex-col items-center gap-12 md:flex-row-reverse">
              <div className="flex-1 space-y-6">
                <div className="inline-flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-green-600 text-xl font-bold text-white shadow-lg">
                    4
                  </span>
                  <h2 className="text-3xl font-bold md:text-4xl">
                    <Trans>Sign the Document Electronically</Trans>
                  </h2>
                </div>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  <Trans>
                    Sign from anywhere, on any device — mobile, tablet, or desktop. Choose between
                    typed, drawn, or uploaded signatures. Legally binding and compliant with global
                    standards.
                  </Trans>
                </p>
                <div className="flex items-start gap-3 rounded-lg border border-green-200 bg-green-50/50 p-4 dark:border-green-900 dark:bg-green-950/30">
                  <span className="text-2xl">✅</span>
                  <p className="text-sm">
                    <Trans>ESIGN & UETA compliant • Audit trail • Tamper-proof</Trans>
                  </p>
                </div>
              </div>
              <div className="flex-1">
                <div className="relative overflow-hidden rounded-2xl shadow-2xl transition-transform group-hover:scale-105">
                  <img
                    src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80"
                    alt="Electronic Signature - Digital signing on tablet"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-600/20 to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Step 5: Complete */}
        <section className="container mx-auto px-4 py-12 lg:px-8">
          <div className="group flex flex-col items-center gap-12 md:flex-row">
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-amber-600 text-xl font-bold text-white shadow-lg">
                  5
                </span>
                <h2 className="text-3xl font-bold md:text-4xl">
                  <Trans>Complete and Secure Your Document</Trans>
                </h2>
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed">
                <Trans>
                  Instantly receive your signed document with a complete audit trail. Download,
                  archive, or share certificates. All documents are encrypted and stored with
                  enterprise-grade security.
                </Trans>
              </p>
              <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50/50 p-4 dark:border-amber-900 dark:bg-amber-950/30">
                <span className="text-2xl">🏆</span>
                <p className="text-sm">
                  <Trans>Cloud storage • PDF certificates • Complete audit logs</Trans>
                </p>
              </div>
            </div>
            <div className="flex-1">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl transition-transform group-hover:scale-105">
                <img
                  src="https://images.unsplash.com/photo-1655036387197-566206c80980?auto=format&fit=crop&w=1200&q=80"
                  alt="Completed Signed Document - Secure and verified"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-amber-600/20 to-transparent" />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Packages Section */}
      <section id="packages" className="relative scroll-mt-20 overflow-hidden py-24">
        {/* Background gradient */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-pink-950/20" />

        <div className="container mx-auto px-4 text-center lg:px-8">
          <h2 className="mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-4xl font-extrabold text-transparent md:text-5xl">
            <Trans>Choose Your Plan</Trans>
          </h2>
          <p className="text-muted-foreground mx-auto mb-16 max-w-2xl text-lg">
            <Trans>Flexible plans for individuals and teams. Start free, upgrade anytime.</Trans>
          </p>

          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-3">
            {/* Free Tier */}
            <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-lg transition-all hover:scale-105 hover:shadow-2xl dark:border-gray-800 dark:bg-gray-950">
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 to-transparent opacity-0 transition-opacity group-hover:opacity-100 dark:from-blue-950/50" />
              <h3 className="mb-2 text-2xl font-bold">
                <Trans>Free Tier</Trans>
              </h3>
              <div className="mb-6 flex items-baseline gap-2">
                <span className="text-5xl font-extrabold">$0</span>
                <span className="text-muted-foreground text-sm">
                  <Trans>/month</Trans>
                </span>
              </div>
              <ul className="mb-8 space-y-4 text-left">
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900">
                    ✓
                  </span>
                  <span>
                    <Trans>5 Documents / Month</Trans>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900">
                    ✓
                  </span>
                  <span>
                    <Trans>Unlimited Signatories</Trans>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900">
                    ✓
                  </span>
                  <span>
                    <Trans>Email Support</Trans>
                  </span>
                </li>
                <li className="text-muted-foreground flex items-start gap-3">
                  <span className="mt-1">✗</span>
                  <span>
                    <Trans>Custom Branding</Trans>
                  </span>
                </li>
              </ul>
              <Button asChild className="w-full" variant="outline">
                <Link to="/signup">
                  <Trans>Get Started</Trans>
                </Link>
              </Button>
            </div>

            {/* Professional - Popular */}
            <div className="group relative overflow-hidden rounded-2xl border-2 border-blue-500 bg-white p-8 shadow-2xl transition-all hover:scale-105 dark:bg-gray-950">
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10" />
              <div className="absolute right-4 top-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-1 text-xs font-bold text-white">
                <Trans>Most Popular</Trans>
              </div>
              <h3 className="mb-2 text-2xl font-bold">
                <Trans>Professional</Trans>
              </h3>
              <div className="mb-6 flex items-baseline gap-2">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-5xl font-extrabold text-transparent">
                  $19
                </span>
                <span className="text-muted-foreground text-sm">
                  <Trans>/month</Trans>
                </span>
              </div>
              <ul className="mb-8 space-y-4 text-left">
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900">
                    ✓
                  </span>
                  <span>
                    <Trans>50 Documents / Month</Trans>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900">
                    ✓
                  </span>
                  <span>
                    <Trans>Advanced Workflows</Trans>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900">
                    ✓
                  </span>
                  <span>
                    <Trans>Real-time Tracking</Trans>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900">
                    ✓
                  </span>
                  <span>
                    <Trans>Priority Support</Trans>
                  </span>
                </li>
              </ul>
              <Button
                asChild
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 font-semibold shadow-lg hover:shadow-blue-500/50"
              >
                <Link to="/contact">
                  <Trans>Contact Sales</Trans>
                </Link>
              </Button>
            </div>

            {/* Enterprise */}
            <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-lg transition-all hover:scale-105 hover:shadow-2xl dark:border-gray-800 dark:bg-gray-950">
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-50 to-transparent opacity-0 transition-opacity group-hover:opacity-100 dark:from-purple-950/50" />
              <h3 className="mb-2 text-2xl font-bold">
                <Trans>Enterprise</Trans>
              </h3>
              <div className="mb-6 flex items-baseline gap-2">
                <span className="text-5xl font-extrabold">$49</span>
                <span className="text-muted-foreground text-sm">
                  <Trans>/month</Trans>
                </span>
              </div>
              <ul className="mb-8 space-y-4 text-left">
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900">
                    ✓
                  </span>
                  <span>
                    <Trans>Unlimited Documents</Trans>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900">
                    ✓
                  </span>
                  <span>
                    <Trans>Team Collaboration</Trans>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900">
                    ✓
                  </span>
                  <span>
                    <Trans>API & Webhooks</Trans>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900">
                    ✓
                  </span>
                  <span>
                    <Trans>Dedicated Support</Trans>
                  </span>
                </li>
              </ul>
              <Button asChild className="w-full" variant="outline">
                <Link to="/contact">
                  <Trans>Contact Sales</Trans>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section
        id="demo"
        className="relative scroll-mt-20 overflow-hidden py-24"
        style={{
          backgroundImage:
            'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))',
        }}
      >
        <div className="container mx-auto px-4 text-center lg:px-8">
          <div className="mx-auto max-w-3xl space-y-8">
            <h2 className="text-4xl font-extrabold md:text-5xl">
              <Trans>See It In Action</Trans>
            </h2>
            <p className="text-muted-foreground text-xl">
              <Trans>
                Explore DoxSigner's powerful digital signing workflow through an interactive demo.
                Experience the future of document management.
              </Trans>
            </p>
            <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6 text-lg font-semibold shadow-xl hover:scale-105 hover:shadow-blue-500/50"
              >
                <Link to="/signup">
                  <Trans>Try Demo Now</Trans>
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="px-8 py-6 text-lg font-semibold"
              >
                <Link to="/signin">
                  <Trans>Sign In</Trans>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Footer */}
      <footer className="border-t border-gray-200 bg-white/50 py-12 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-950/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
            <div className="flex items-center gap-2">
              <BrandingLogo className="h-6" />
              <span className="text-muted-foreground text-sm font-medium">
                <Trans>Secure • Fast • Paperless</Trans>
              </span>
            </div>
            <p className="text-muted-foreground text-sm">
              <Trans>© 2025 DoxSigner. All Rights Reserved.</Trans>
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
