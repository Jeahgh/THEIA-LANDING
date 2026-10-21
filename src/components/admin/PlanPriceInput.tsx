'use client';

import type { ChangeEvent } from 'react';

export default function PlanPriceInput({ defaultValue }: { defaultValue?: number }) {
  function formatPrice(event: ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    const rawValue = input.value;
    const cursor = input.selectionStart ?? rawValue.length;
    const digitsBeforeCursor = rawValue.slice(0, cursor).replace(/\D/g, '').length;
    const rawDigits = rawValue.replace(/\D/g, '');
    const digits = rawDigits.replace(/^0+(?=\d)/, '');
    const removedZeros = rawDigits.length - digits.length;

    input.value = digits.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    let position = 0;
    let digitCount = 0;
    while (position < input.value.length && digitCount < Math.max(0, digitsBeforeCursor - removedZeros)) {
      if (/\d/.test(input.value[position])) digitCount++;
      position++;
    }
    input.setSelectionRange(position, position);
  }

  return (
    <input
      id="plan-price"
      name="price"
      defaultValue={defaultValue === undefined ? '' : defaultValue.toLocaleString('es-CL')}
      onChange={formatPrice}
      inputMode="numeric"
      className="min-w-0 w-full rounded-r-lg px-4 py-3 text-text-primary outline-none placeholder:text-text-muted"
      placeholder="45.000"
      required
    />
  );
}
