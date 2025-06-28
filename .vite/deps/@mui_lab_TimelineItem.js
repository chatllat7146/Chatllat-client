import {
  timelineContentClasses_default
} from "./chunk-NV2QAUBT.js";
import {
  timelineOppositeContentClasses_default
} from "./chunk-UVSHDAMQ.js";
import {
  TimelineContext_default,
  convertTimelinePositionToClass
} from "./chunk-VV2IBW2M.js";
import {
  useThemeProps
} from "./chunk-3CGTGRNV.js";
import "./chunk-6C5TDENR.js";
import "./chunk-7B6WQUSG.js";
import "./chunk-A6VN6OYH.js";
import "./chunk-YN4LU4GR.js";
import "./chunk-VQCWGFWO.js";
import "./chunk-BEEUMZAS.js";
import "./chunk-G4FQZWC4.js";
import "./chunk-Y3AHWW6X.js";
import {
  isMuiElement_default
} from "./chunk-O44QB2LU.js";
import "./chunk-P7YGNIFU.js";
import "./chunk-FPU6J2CK.js";
import "./chunk-KUHBAR4E.js";
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

// node_modules/@mui/lab/esm/TimelineItem/TimelineItem.js
var React = __toESM(require_react(), 1);
var import_prop_types = __toESM(require_prop_types(), 1);

// node_modules/@mui/lab/esm/TimelineItem/timelineItemClasses.js
function getTimelineItemUtilityClass(slot) {
  return generateUtilityClass("MuiTimelineItem", slot);
}
var timelineItemClasses = generateUtilityClasses("MuiTimelineItem", ["root", "positionLeft", "positionRight", "positionAlternate", "positionAlternateReverse", "missingOppositeContent"]);
var timelineItemClasses_default = timelineItemClasses;

// node_modules/@mui/lab/esm/TimelineItem/TimelineItem.js
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var useUtilityClasses = (ownerState) => {
  const {
    position,
    classes,
    hasOppositeContent
  } = ownerState;
  const slots = {
    root: ["root", convertTimelinePositionToClass(position), !hasOppositeContent && "missingOppositeContent"]
  };
  return composeClasses(slots, getTimelineItemUtilityClass, classes);
};
var TimelineItemRoot = styled_default("li", {
  name: "MuiTimelineItem",
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
  listStyle: "none",
  display: "flex",
  position: "relative",
  minHeight: 70,
  ...ownerState.position === "left" && {
    flexDirection: "row-reverse"
  },
  ...(ownerState.position === "alternate" || ownerState.position === "alternate-reverse") && {
    [`&:nth-of-type(${ownerState.position === "alternate" ? "even" : "odd"})`]: {
      flexDirection: "row-reverse",
      [`& .${timelineContentClasses_default.root}`]: {
        textAlign: "right"
      },
      [`& .${timelineOppositeContentClasses_default.root}`]: {
        textAlign: "left"
      }
    }
  },
  ...!ownerState.hasOppositeContent && {
    "&::before": {
      content: '""',
      flex: 1,
      padding: "6px 16px"
    }
  }
}));
var TimelineItem = React.forwardRef(function TimelineItem2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiTimelineItem"
  });
  const {
    position: positionProp,
    className,
    ...other
  } = props;
  const {
    position: positionContext
  } = React.useContext(TimelineContext_default);
  let hasOppositeContent = false;
  React.Children.forEach(props.children, (child) => {
    if (isMuiElement_default(child, ["TimelineOppositeContent"])) {
      hasOppositeContent = true;
    }
  });
  const ownerState = {
    ...props,
    position: positionProp || positionContext || "right",
    hasOppositeContent
  };
  const classes = useUtilityClasses(ownerState);
  const contextValue = React.useMemo(() => ({
    position: ownerState.position
  }), [ownerState.position]);
  return (0, import_jsx_runtime.jsx)(TimelineContext_default.Provider, {
    value: contextValue,
    children: (0, import_jsx_runtime.jsx)(TimelineItemRoot, {
      className: clsx_default(classes.root, className),
      ownerState,
      ref,
      ...other
    })
  });
});
true ? TimelineItem.propTypes = {
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
   * The position where the timeline's item should appear.
   */
  position: import_prop_types.default.oneOf(["alternate-reverse", "alternate", "left", "right"]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object])
} : void 0;
var TimelineItem_default = TimelineItem;
export {
  TimelineItem_default as default,
  getTimelineItemUtilityClass,
  timelineItemClasses_default as timelineItemClasses
};
//# sourceMappingURL=@mui_lab_TimelineItem.js.map
