// src/utils/viewTransition.ts
import type { NavigateFunction } from 'react-router-dom';

type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => { finished: Promise<void> };
};

export function navigateWithTransition(navigate: NavigateFunction, to: string) {
  const doc = document as ViewTransitionDocument;
  if (typeof doc.startViewTransition === 'function') {
    doc.startViewTransition(() => {
      navigate(to);
    });
  } else {
    navigate(to);
  }
}
