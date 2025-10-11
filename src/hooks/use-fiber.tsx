import { useEffect, useRef } from 'react';
import _clone from 'lodash/cloneDeep';

export const useFiber = () => {
  const ref = useRef<HTMLDivElement>(null);
  const getFiber = () => {
    if (!ref.current) return null;
    const props = Object.getOwnPropertyNames(ref.current);
    const prop = props.find((p) => p.startsWith('__reactFiber$')) as string;

    // @ts-ignore
    const fiber = ref.current?.[prop!].return;
    return fiber;
  };

  useEffect(() => {
    const fiber = getFiber();
    console.log(`Fiber: ${fiber.type.name || fiber.type}`, _clone(fiber));
  });

  return [ref, getFiber] as const;
};
