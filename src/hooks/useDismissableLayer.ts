'use client';

import { type RefObject, useEffect } from 'react';

type DismissableRef = RefObject<HTMLElement | null>;

export function useDismissableLayer({
  enabled,
  refs,
  onDismiss,
}: {
  enabled: boolean;
  refs: DismissableRef[];
  onDismiss: () => void;
}) {
  useEffect(() => {
    if (!enabled) return;

    function handlePointerDown(event: MouseEvent | TouchEvent) {
      const target = event.target;

      if (!(target instanceof Node)) return;

      const clickedInside = refs.some((ref) => ref.current?.contains(target));

      if (!clickedInside) {
        onDismiss();
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onDismiss();
      }
    }

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [enabled, onDismiss, refs]);
}
