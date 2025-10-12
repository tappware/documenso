import { NEXT_PUBLIC_WEBAPP_URL } from '@documenso/lib/constants/app';

export const appMetaTags = (title?: string) => {
  const description =
    'Join DoxSigner, the open signing infrastructure, and get a 10x better signing experience. Sign in now and enjoy a faster, smarter, and more beautiful document signing process. Integrates with your favorite tools, customizable, and expandable.';

  return [
    {
      // title: title ? `${title} - DoxSigner` : 'DoxSigner',
      title: title ? `DoxSigner - ${title}` : 'DoxSigner',
    },
    {
      name: 'description',
      content: description,
    },
    {
      name: 'keywords',
      content:
        'DoxSigner, document signing, open signing infrastructure, fast signing, beautiful signing, smart templates',
    },
    {
      name: 'author',
      content: 'DoxSigner, Inc.',
    },
    {
      name: 'robots',
      content: 'index, follow',
    },
    {
      property: 'og:title',
      content: 'DoxSigner - Document Signing Platform',
    },
    {
      property: 'og:description',
      content: description,
    },
    {
      property: 'og:image',
      content: `${NEXT_PUBLIC_WEBAPP_URL()}/opengraph-image.jpg`,
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'twitter:site',
      content: '@DoxSigner',
    },
    {
      name: 'twitter:description',
      content: description,
    },
    {
      name: 'twitter:image',
      content: `${NEXT_PUBLIC_WEBAPP_URL()}/opengraph-image.jpg`,
    },
  ];
};
