import { Trans } from '@lingui/react/macro';

import { NEXT_APP_NAME } from '@documenso/lib/constants/app';
import { NEXT_APP_AUTHOR_NAME } from '@documenso/lib/constants/app';
import { NEXT_APP_AUTHOR_ADDRESS } from '@documenso/lib/constants/app';

import { Link, Section, Text } from '../components';
import { useBranding } from '../providers/branding';

export type TemplateFooterProps = {
  isDocument?: boolean;
};

export const TemplateFooter = ({ isDocument = true }: TemplateFooterProps) => {
  const branding = useBranding();

  return (
    <Section>
      {isDocument && !branding.brandingHidePoweredBy && (
        <Text className="my-4 text-base text-slate-400">
          <Trans>
            This document was sent using{' '}
            <Link className="text-[#7AC455]" href="https://documen.so/mail-footer">
              `${NEXT_APP_NAME()}`.
            </Link>
          </Trans>
        </Text>
      )}

      {branding.brandingCompanyDetails ? (
        <Text className="my-8 text-sm text-slate-400">
          {branding.brandingCompanyDetails.split('\n').map((line, idx) => {
            return (
              <>
                {idx > 0 && <br />}
                {line}
              </>
            );
          })}
        </Text>
      ) : (
        <Text className="my-8 text-sm text-slate-400">
          {NEXT_APP_AUTHOR_NAME()}
          <br />
          {NEXT_APP_AUTHOR_ADDRESS()}
        </Text>
      )}
    </Section>
  );
};

export default TemplateFooter;
