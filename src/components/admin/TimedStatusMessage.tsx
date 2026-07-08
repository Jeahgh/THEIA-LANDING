import ToastMessage from '@/components/ui/ToastMessage';

export default function TimedStatusMessage({ message }: { message: string }) {
  return <ToastMessage message={message} />;
}
