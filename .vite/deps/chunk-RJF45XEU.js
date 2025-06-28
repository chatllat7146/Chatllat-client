import {
  Timeout
} from "./chunk-4HQWGXMP.js";
import {
  require_react
} from "./chunk-Z4L4S4OG.js";
import {
  __toESM
} from "./chunk-WOOG5QLI.js";

// node_modules/@mui/utils/esm/ponyfillGlobal/ponyfillGlobal.js
var ponyfillGlobal_default = typeof window != "undefined" && window.Math == Math ? window : typeof self != "undefined" && self.Math == Math ? self : Function("return this")();

// node_modules/@mui/utils/esm/useIsFocusVisible/useIsFocusVisible.js
var React = __toESM(require_react(), 1);
var hadFocusVisibleRecentlyTimeout = new Timeout();

// node_modules/@mui/utils/esm/getReactNodeRef/getReactNodeRef.js
var React2 = __toESM(require_react(), 1);

// node_modules/@mui/x-internals/esm/warning/warning.js
var warnedOnceCache = /* @__PURE__ */ new Set();
function warnOnce(message, gravity = "warning") {
  if (false) {
    return;
  }
  const cleanMessage = Array.isArray(message) ? message.join("\n") : message;
  if (!warnedOnceCache.has(cleanMessage)) {
    warnedOnceCache.add(cleanMessage);
    if (gravity === "error") {
      console.error(cleanMessage);
    } else {
      console.warn(cleanMessage);
    }
  }
}

export {
  warnOnce
};
/*! Bundled license information:

@mui/utils/esm/index.js:
  (**
   * @mui/utils v7.1.0
   *
   * @license MIT
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
//# sourceMappingURL=chunk-RJF45XEU.js.map
