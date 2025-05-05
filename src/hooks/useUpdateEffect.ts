import { useEffect, useRef, EffectCallback, DependencyList } from "react";

export const useUpdateEffect = (effect: EffectCallback, deps?: DependencyList): void => {
  const isInitialMount = useRef(true)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
    } else {
      return effect()
    }
  }, deps)
}