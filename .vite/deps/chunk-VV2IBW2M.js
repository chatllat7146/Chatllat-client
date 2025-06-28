import {
  capitalize_default
} from "./chunk-P7YGNIFU.js";
import {
  require_react
} from "./chunk-Z4L4S4OG.js";
import {
  __toESM
} from "./chunk-WOOG5QLI.js";

// node_modules/@mui/lab/esm/Timeline/TimelineContext.js
var React = __toESM(require_react(), 1);
var TimelineContext = React.createContext({});
if (true) {
  TimelineContext.displayName = "TimelineContext";
}
var TimelineContext_default = TimelineContext;

// node_modules/@mui/lab/esm/internal/convertTimelinePositionToClass.js
function convertTimelinePositionToClass(position) {
  return position === "alternate-reverse" ? "positionAlternateReverse" : `position${capitalize_default(position)}`;
}

export {
  TimelineContext_default,
  convertTimelinePositionToClass
};
//# sourceMappingURL=chunk-VV2IBW2M.js.map
