import {
  useThemeProps
} from "./chunk-3CGTGRNV.js";
import {
  clsx_default,
  composeClasses,
  generateUtilityClass,
  generateUtilityClasses,
  require_jsx_runtime,
  styled_default2 as styled_default
} from "./chunk-7HVHNYGT.js";
import "./chunk-HQ6ZTAWL.js";
import {
  require_prop_types
} from "./chunk-LQRC5G25.js";
import {
  require_react
} from "./chunk-Z4L4S4OG.js";
import {
  __toESM
} from "./chunk-WOOG5QLI.js";

// node_modules/@mui/lab/esm/TimelineConnector/TimelineConnector.js
var React = __toESM(require_react(), 1);
var import_prop_types = __toESM(require_prop_types(), 1);

// node_modules/@mui/lab/esm/TimelineConnector/timelineConnectorClasses.js
function getTimelineConnectorUtilityClass(slot) {
  return generateUtilityClass("MuiTimelineConnector", slot);
}
var timelineConnectorClasses = generateUtilityClasses("MuiTimelineConnector", ["root"]);
var timelineConnectorClasses_default = timelineConnectorClasses;

// node_modules/@mui/lab/esm/TimelineConnector/TimelineConnector.js
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var useUtilityClasses = (ownerState) => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ["root"]
  };
  return composeClasses(slots, getTimelineConnectorUtilityClass, classes);
};
var TimelineConnectorRoot = styled_default("span", {
  name: "MuiTimelineConnector",
  slot: "Root"
})(({
  theme
}) => {
  return {
    width: 2,
    backgroundColor: (theme.vars || theme).palette.grey[400],
    flexGrow: 1
  };
});
var TimelineConnector = React.forwardRef(function TimelineConnector2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiTimelineConnector"
  });
  const {
    className,
    ...other
  } = props;
  const ownerState = props;
  const classes = useUtilityClasses(ownerState);
  return (0, import_jsx_runtime.jsx)(TimelineConnectorRoot, {
    className: clsx_default(classes.root, className),
    ownerState,
    ref,
    ...other
  });
});
true ? TimelineConnector.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: import_prop_types.default.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types.default.object,
  /**
   * @ignore
   */
  className: import_prop_types.default.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object])
} : void 0;
var TimelineConnector_default = TimelineConnector;
export {
  TimelineConnector_default as default,
  getTimelineConnectorUtilityClass,
  timelineConnectorClasses_default as timelineConnectorClasses
};
//# sourceMappingURL=@mui_lab_TimelineConnector.js.map
