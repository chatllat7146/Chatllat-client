import {
  TimelineContext_default,
  convertTimelinePositionToClass
} from "./chunk-VV2IBW2M.js";
import {
  useThemeProps
} from "./chunk-3CGTGRNV.js";
import {
  Typography_default
} from "./chunk-6C5TDENR.js";
import {
  clsx_default,
  composeClasses,
  generateUtilityClass,
  generateUtilityClasses,
  require_jsx_runtime,
  styled_default2 as styled_default
} from "./chunk-7HVHNYGT.js";
import {
  require_prop_types
} from "./chunk-LQRC5G25.js";
import {
  require_react
} from "./chunk-Z4L4S4OG.js";
import {
  __toESM
} from "./chunk-WOOG5QLI.js";

// node_modules/@mui/lab/esm/TimelineOppositeContent/TimelineOppositeContent.js
var React = __toESM(require_react(), 1);
var import_prop_types = __toESM(require_prop_types(), 1);

// node_modules/@mui/lab/esm/TimelineOppositeContent/timelineOppositeContentClasses.js
function getTimelineOppositeContentUtilityClass(slot) {
  return generateUtilityClass("MuiTimelineOppositeContent", slot);
}
var timelineOppositeContentClasses = generateUtilityClasses("MuiTimelineOppositeContent", ["root", "positionLeft", "positionRight", "positionAlternate", "positionAlternateReverse"]);
var timelineOppositeContentClasses_default = timelineOppositeContentClasses;

// node_modules/@mui/lab/esm/TimelineOppositeContent/TimelineOppositeContent.js
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var useUtilityClasses = (ownerState) => {
  const {
    position,
    classes
  } = ownerState;
  const slots = {
    root: ["root", convertTimelinePositionToClass(position)]
  };
  return composeClasses(slots, getTimelineOppositeContentUtilityClass, classes);
};
var TimelineOppositeContentRoot = styled_default(Typography_default, {
  name: "MuiTimelineOppositeContent",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, styles[convertTimelinePositionToClass(ownerState.position)]];
  }
})(({
  ownerState
}) => ({
  padding: "6px 16px",
  marginRight: "auto",
  textAlign: "right",
  flex: 1,
  ...ownerState.position === "left" && {
    textAlign: "left"
  }
}));
var TimelineOppositeContent = React.forwardRef(function TimelineOppositeContent2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiTimelineOppositeContent"
  });
  const {
    className,
    ...other
  } = props;
  const {
    position: positionContext
  } = React.useContext(TimelineContext_default);
  const ownerState = {
    ...props,
    position: positionContext || "left"
  };
  const classes = useUtilityClasses(ownerState);
  return (0, import_jsx_runtime.jsx)(TimelineOppositeContentRoot, {
    component: "div",
    className: clsx_default(classes.root, className),
    ownerState,
    ref,
    ...other
  });
});
true ? TimelineOppositeContent.propTypes = {
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
TimelineOppositeContent.muiName = "TimelineOppositeContent";
var TimelineOppositeContent_default = TimelineOppositeContent;

export {
  getTimelineOppositeContentUtilityClass,
  timelineOppositeContentClasses_default,
  TimelineOppositeContent_default
};
//# sourceMappingURL=chunk-UVSHDAMQ.js.map
