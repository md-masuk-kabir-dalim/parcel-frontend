import { useEffect, useState } from "react";

interface UseDebouncedProps {
  searchQuery: string;
  delay: number;
}
export const useDebounced = ({ searchQuery, delay }: UseDebouncedProps) => {
  const [debouncedValue, setDebouncedValue] = useState<string>(searchQuery);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(searchQuery);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery, delay]);

  return debouncedValue;
};
