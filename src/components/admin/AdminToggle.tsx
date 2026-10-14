'use client';

import type { ChangeEventHandler } from 'react';

type AdminToggleProps = {
  name: string;
  label: string;
  defaultChecked?: boolean;
  checked?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
  form?: string;
  compact?: boolean;
};

export default function AdminToggle({ label, compact = false, ...inputProps }: AdminToggleProps) {
  return (
    <label className={compact ? 'inline-flex cursor-pointer items-center' : 'mt-5 flex cursor-pointer items-center justify-between gap-3 py-2'}>
      <span className={compact ? 'sr-only' : 'text-sm font-medium text-text-primary'}>{label}</span>
      <span className="relative inline-flex shrink-0">
        <input {...inputProps} type="checkbox" role="switch" className="peer sr-only" />
        <span aria-hidden="true" className="relative h-6 w-11 rounded-full bg-slate-300 transition-colors after:absolute after:left-1 after:top-1 after:h-4 after:w-4 after:rounded-full after:bg-white after:shadow-sm after:transition-transform peer-checked:bg-brand-blue peer-checked:after:translate-x-5 peer-focus-visible:ring-2 peer-focus-visible:ring-brand-blue peer-focus-visible:ring-offset-2 peer-disabled:opacity-60" />
      </span>
    </label>
  );
}
