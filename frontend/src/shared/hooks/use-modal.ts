import { useState, useMemo } from 'react';

export const useModal = (initialOpen?: boolean) => {
  const [isOpen, setIsOpen] = useState(initialOpen || false);
  const [context, setContext] = useState<any>(null);

  const actions = useMemo(
    () => ({
      open(_context: any) {
        setIsOpen(true);
        setContext(_context);
      },
      close() {
        setIsOpen(false);
        setContext(null);
      },
    }),
    [setIsOpen, setContext],
  );

  return useMemo(
    () => ({
      isOpen,
      actions,
      context,
    }),
    [actions, context, isOpen],
  );
};
