import { useState } from 'react';

import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import type { Field, Recipient } from '@prisma/client';
import { FieldType } from '@prisma/client';
import { useRevalidator } from 'react-router';

import { AppError, AppErrorCode } from '@documenso/lib/errors/app-error';
import { trpc } from '@documenso/trpc/react';
import { Button } from '@documenso/ui/primitives/button';
import { useToast } from '@documenso/ui/primitives/use-toast';

import { useRequiredDocumentSigningAuthContext } from './document-signing-auth-provider';
import { useRequiredDocumentSigningContext } from './document-signing-provider';

export type DocumentSigningSignAllButtonProps = {
  recipient: Pick<Recipient, 'id' | 'token'>;
  fields: Field[];
  disabled?: boolean;
};

export const DocumentSigningSignAllButton = ({
  recipient,
  fields,
  disabled = false,
}: DocumentSigningSignAllButtonProps) => {
  const { _ } = useLingui();
  const { toast } = useToast();
  const { revalidate } = useRevalidator();

  const { signature: providedSignature } = useRequiredDocumentSigningContext();
  const { executeActionAuthProcedure } = useRequiredDocumentSigningAuthContext();

  const [isSigning, setIsSigning] = useState(false);

  const { mutateAsync: signFieldWithToken } = trpc.field.signFieldWithToken.useMutation();

  // Get all unsigned signature fields for this recipient
  const unsignedSignatureFields = fields.filter(
    (field) =>
      field.type === FieldType.SIGNATURE && !field.inserted && field.recipientId === recipient.id,
  );

  const hasUnsignedSignatureFields = unsignedSignatureFields.length > 0;

  const handleSignAll = async () => {
    if (!providedSignature) {
      toast({
        title: _(msg`Error`),
        description: _(msg`Please provide your signature first.`),
        variant: 'destructive',
      });
      return;
    }

    if (unsignedSignatureFields.length === 0) {
      toast({
        title: _(msg`Info`),
        description: _(msg`No signature fields to sign.`),
        variant: 'default',
      });
      return;
    }

    // Show confirmation dialog
    const confirmed = window.confirm(
      `You are about to sign all ${unsignedSignatureFields.length} signature fields in this document with your current signature. This action cannot be undone.\n\nDo you want to continue?`,
    );

    if (!confirmed) {
      return;
    }

    setIsSigning(true);

    try {
      const isTypedSignature = !providedSignature.startsWith('data:image');

      // Sign all signature fields with the same signature
      const results = await Promise.allSettled(
        unsignedSignatureFields.map(async (field) => {
          const payload = {
            token: recipient.token,
            fieldId: field.id,
            value: providedSignature,
            isBase64: !isTypedSignature,
          };

          return await signFieldWithToken(payload);
        }),
      );

      const failedSignatures = results.filter((result) => result.status === 'rejected');

      if (failedSignatures.length > 0) {
        toast({
          title: _(msg`Partial Success`),
          description: _(
            msg`Successfully signed ${unsignedSignatureFields.length - failedSignatures.length} of ${unsignedSignatureFields.length} signature fields. Some fields may need to be signed manually.`,
          ),
          duration: 5000,
          variant: 'destructive',
        });
      } else {
        toast({
          title: _(msg`Success`),
          description: _(
            msg`Successfully signed all ${unsignedSignatureFields.length} signature fields.`,
          ),
          variant: 'default',
        });
      }

      await revalidate();
    } catch (err) {
      const error = AppError.parseError(err);

      if (error.code === AppErrorCode.UNAUTHORIZED) {
        throw error;
      }

      console.error(err);

      toast({
        title: _(msg`Error`),
        description: _(msg`An error occurred while signing the document.`),
        variant: 'destructive',
      });
    } finally {
      setIsSigning(false);
    }
  };

  const handleSignAllWithAuth = async () => {
    await executeActionAuthProcedure({
      onReauthFormSubmit: handleSignAll,
      actionTarget: FieldType.SIGNATURE,
    });
  };

  if (!hasUnsignedSignatureFields) {
    return null;
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="lg"
      disabled={disabled || !providedSignature}
      onClick={handleSignAllWithAuth}
      loading={isSigning}
      className="w-full"
    >
      <Trans>Sign All Pages ({unsignedSignatureFields.length})</Trans>
    </Button>
  );
};
