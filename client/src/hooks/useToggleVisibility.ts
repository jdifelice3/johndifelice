import * as React from "react";

type WithVisibility = {
  id: string;
  manuscriptIsVisible: boolean;
};

type Options<T extends WithVisibility> = {
  /** Optional callback after the item is toggled */
  onToggle?: (item: T, nextVisible: boolean) => void;
  /** Stop event propagation (default: true) */
  stopPropagation?: boolean;
};

export function useToggleVisibility<T extends WithVisibility>(
  setItems: React.Dispatch<React.SetStateAction<T[]>>,
  options: Options<T> = {}
) {
  const { onToggle, stopPropagation = true } = options;

  // Direct handler: (event, id) => void
  const handleToggle = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>, id: string) => {
      if (stopPropagation) event.stopPropagation();

      setItems(prev => {
        const idx = prev.findIndex(i => i.id === id);
        if (idx === -1) return prev;

        const next = prev.slice();
        const current = next[idx];
        const toggled = {
          ...current,
          manuscriptIsVisible: !current.manuscriptIsVisible,
        };
        next[idx] = toggled;

        // fire-and-forget callback (no state reads here)
        if (onToggle) onToggle(toggled, toggled.manuscriptIsVisible);

        return next;
      });
    },
    [setItems, onToggle, stopPropagation]
  );

  // Curried variant: bind an id once, get an onClick handler
  const getToggleHandler = React.useCallback(
    (id: string) =>
      (event: React.MouseEvent<HTMLButtonElement>) =>
        handleToggle(event, id),
    [handleToggle]
  );

  return { handleToggle, getToggleHandler };
}
