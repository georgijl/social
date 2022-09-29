import { RefObject, useCallback, useEffect } from "react";

export const useClickOutside = (ref: RefObject<HTMLElement>, cb: Function) => {
  const handleClickOutside = useCallback(
    (e: any) => {
      if (ref.current && !ref.current.contains(e.target)) {
        cb();
      }
    },
    [cb, ref]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);
};
