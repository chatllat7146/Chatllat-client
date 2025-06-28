import {
  useEnhancedEffect_default
} from "./chunk-7HVHNYGT.js";
import {
  require_react
} from "./chunk-Z4L4S4OG.js";
import {
  __toESM
} from "./chunk-WOOG5QLI.js";

// node_modules/@mui/utils/esm/useForkRef/useForkRef.js
var React = __toESM(require_react(), 1);
function useForkRef(...refs) {
  const cleanupRef = React.useRef(void 0);
  const refEffect = React.useCallback((instance) => {
    const cleanups = refs.map((ref) => {
      if (ref == null) {
        return null;
      }
      if (typeof ref === "function") {
        const refCallback = ref;
        const refCleanup = refCallback(instance);
        return typeof refCleanup === "function" ? refCleanup : () => {
          refCallback(null);
        };
      }
      ref.current = instance;
      return () => {
        ref.current = null;
      };
    });
    return () => {
      cleanups.forEach((refCleanup) => refCleanup == null ? void 0 : refCleanup());
    };
  }, refs);
  return React.useMemo(() => {
    if (refs.every((ref) => ref == null)) {
      return null;
    }
    return (value) => {
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = void 0;
      }
      if (value != null) {
        cleanupRef.current = refEffect(value);
      }
    };
  }, refs);
}

// node_modules/@mui/material/esm/utils/useForkRef.js
var useForkRef_default = useForkRef;

// node_modules/@mui/utils/esm/useEventCallback/useEventCallback.js
var React2 = __toESM(require_react(), 1);
function useEventCallback(fn) {
  const ref = React2.useRef(fn);
  useEnhancedEffect_default(() => {
    ref.current = fn;
  });
  return React2.useRef((...args) => (
    // @ts-expect-error hide `this`
    (0, ref.current)(...args)
  )).current;
}
var useEventCallback_default = useEventCallback;

// node_modules/@mui/material/esm/utils/useEventCallback.js
var useEventCallback_default2 = useEventCallback_default;

export {
  useForkRef,
  useForkRef_default,
  useEventCallback_default,
  useEventCallback_default2
};
//# sourceMappingURL=chunk-BEEUMZAS.js.map
