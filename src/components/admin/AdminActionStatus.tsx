import TimedStatusMessage from '@/components/admin/TimedStatusMessage';

export default function AdminActionStatus({ saved, deleted }: { saved?: string; deleted?: string }) {
  if (deleted) return <TimedStatusMessage message="Eliminado correctamente." />;
  if (saved === 'creado') return <TimedStatusMessage message="Creado correctamente." />;
  if (saved) return <TimedStatusMessage message="Cambios guardados correctamente." />;
  return null;
}
