'use client';

import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import ToastMessage from '@/components/ui/ToastMessage';
import SquareImageCropper from '@/components/ui/SquareImageCropper';
import ProfileAvatar from '@/components/profile/ProfileAvatar';

export default function AvatarUpload({
  image,
  name,
}: {
  image?: string | null;
  name?: string | null;
}) {
  const router = useRouter();
  const { update: updateSession } = useSession();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const preview = uploadedImage ?? image ?? '';
  const [message, setMessage] = useState('');
  const [messageTone, setMessageTone] = useState<'success' | 'error'>('success');
  const [messageKey, setMessageKey] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [fileToCrop, setFileToCrop] = useState<File | null>(null);

  const uploadFile = async (file: File) => {
    setIsUploading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const response = await fetch('/api/profile/avatar', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();

      if (!response.ok || !data.success || !data.imageUrl) {
        throw new Error(data.message ?? 'No pudimos subir la imagen.');
      }

      setUploadedImage(data.imageUrl);
      setMessageTone('success');
      setMessage('Foto actualizada.');
      // La sesión vuelve a leer el perfil de la base; no confía en datos del cliente.
      await updateSession().catch(() => undefined);
      router.refresh();
    } catch (error) {
      setMessageTone('error');
      setMessage(error instanceof Error ? error.message : 'No pudimos subir la imagen.');
    } finally {
      setIsUploading(false);
      setMessageKey((current) => current + 1);
    }
  };

  return (
    <div>
      {fileToCrop && (
        <SquareImageCropper
          file={fileToCrop}
          onCancel={() => setFileToCrop(null)}
          onConfirm={(croppedFile) => {
            setFileToCrop(null);
            void uploadFile(croppedFile);
          }}
        />
      )}
      {message && <ToastMessage key={messageKey} message={message} tone={messageTone} />}
      <h2 className="text-xl font-bold text-text-primary">Foto de perfil</h2>

      <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={isUploading}
          className="group relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-brand-blue-pale text-3xl font-bold text-brand-blue ring-4 ring-brand-blue-pale ring-offset-4 ring-offset-white transition-transform hover:scale-[1.02] disabled:cursor-wait"
          aria-label="Cambiar foto de perfil"
        >
          <ProfileAvatar image={preview} name={name} sizes="112px" />
          <span className="absolute inset-0 flex items-center justify-center bg-slate-950/45 px-3 text-center text-xs font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100">
            {isUploading ? 'Subiendo...' : 'Cambiar foto'}
          </span>
        </button>
        <div className="flex-1">
          <input
            ref={inputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) setFileToCrop(file);
              event.target.value = '';
            }}
          />
          <p className="text-sm text-text-secondary">Formatos JPG, PNG o WebP. Podrás mover y recortar la foto antes de subirla.</p>
        </div>
      </div>
    </div>
  );
}
