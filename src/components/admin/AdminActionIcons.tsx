export const adminIconButtonClass = 'inline-flex h-10 w-10 items-center justify-center rounded-xl border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue disabled:cursor-not-allowed disabled:opacity-40';
export const editIconButtonClass = `${adminIconButtonClass} border-slate-200/70 text-slate-500 hover:bg-brand-blue-pale/50 hover:text-brand-blue`;
export const deleteIconButtonClass = `${adminIconButtonClass} border-slate-200/70 text-slate-500 hover:bg-red-50 hover:text-red-600`;

export function PencilIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="m16 4 4 4M4 20l4-1L20 7a2.8 2.8 0 0 0-4-4L4 15v5Z" /></svg>;
}

export function TrashIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v5m4-5v5" /></svg>;
}

export function PinIcon({ filled = false }: { filled?: boolean }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true" className="h-5 w-5"><path fill={filled ? 'currentColor' : 'none'} strokeLinecap="round" strokeLinejoin="round" d="m15 3 6 6-4 1-3 3v4l-2 2-7-7 2-2h4l3-3 1-4Z" /><path strokeLinecap="round" d="M3 21l5-5" /></svg>;
}
