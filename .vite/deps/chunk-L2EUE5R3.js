import {
  warnOnce
} from "./chunk-RJF45XEU.js";
import {
  DialogActions_default,
  ListItem_default,
  useMediaQuery_default
} from "./chunk-SASUPUCW.js";
import {
  Chip_default,
  InputAdornment_default,
  Popper_default,
  visuallyHidden_default
} from "./chunk-QWRQS2IR.js";
import {
  FormHelperText_default,
  TextField_default
} from "./chunk-4T5CHBEM.js";
import {
  Button_default
} from "./chunk-IQC45S7G.js";
import {
  IconButton_default
} from "./chunk-OQZTVMK2.js";
import {
  useThemeProps
} from "./chunk-3CGTGRNV.js";
import {
  InputLabel_default
} from "./chunk-Z5QMPD3Z.js";
import {
  Typography_default
} from "./chunk-6C5TDENR.js";
import {
  ButtonBase_default
} from "./chunk-23AM4SJ4.js";
import {
  FormControl_default
} from "./chunk-TZPC7EGR.js";
import {
  Fade_default,
  FocusTrap_default,
  Grow_default,
  List_default,
  Paper_default
} from "./chunk-U7UCBFMT.js";
import {
  useSlotProps_default
} from "./chunk-EP53E5NS.js";
import {
  createSvgIcon,
  ownerDocument,
  useControlled,
  useId
} from "./chunk-7B6WQUSG.js";
import {
  resolveComponentProps_default
} from "./chunk-WY7LVTRS.js";
import {
  CSSTransition_default,
  TransitionGroup_default,
  _objectWithoutPropertiesLoose,
  refType_default,
  useTimeout
} from "./chunk-4HQWGXMP.js";
import {
  useEventCallback_default,
  useForkRef
} from "./chunk-BEEUMZAS.js";
import {
  useFormControl
} from "./chunk-A7HOYCYJ.js";
import {
  alpha,
  capitalize,
  clsx_default,
  composeClasses,
  generateUtilityClass,
  generateUtilityClasses,
  require_jsx_runtime,
  shouldForwardProp,
  styled_default2 as styled_default,
  useEnhancedEffect_default,
  useRtl,
  useTheme
} from "./chunk-7HVHNYGT.js";
import {
  _extends
} from "./chunk-HQ6ZTAWL.js";
import {
  require_prop_types
} from "./chunk-LQRC5G25.js";
import {
  require_react
} from "./chunk-Z4L4S4OG.js";
import {
  __toESM
} from "./chunk-WOOG5QLI.js";

// node_modules/@mui/x-date-pickers/esm/DesktopDatePicker/DesktopDatePicker.js
var React66 = __toESM(require_react(), 1);
var import_prop_types18 = __toESM(require_prop_types(), 1);

// node_modules/@mui/x-date-pickers/esm/internals/utils/views.js
var areViewsEqual = (views, expectedViews) => {
  if (views.length !== expectedViews.length) {
    return false;
  }
  return expectedViews.every((expectedView) => views.includes(expectedView));
};
var applyDefaultViewProps = ({
  openTo,
  defaultOpenTo,
  views,
  defaultViews
}) => {
  const viewsWithDefault = views ?? defaultViews;
  let openToWithDefault;
  if (openTo != null) {
    openToWithDefault = openTo;
  } else if (viewsWithDefault.includes(defaultOpenTo)) {
    openToWithDefault = defaultOpenTo;
  } else if (viewsWithDefault.length > 0) {
    openToWithDefault = viewsWithDefault[0];
  } else {
    throw new Error("MUI X: The `views` prop must contain at least one view.");
  }
  return {
    views: viewsWithDefault,
    openTo: openToWithDefault
  };
};

// node_modules/@mui/x-date-pickers/esm/internals/utils/date-utils.js
var mergeDateAndTime = (utils, dateParam, timeParam) => {
  let mergedDate = dateParam;
  mergedDate = utils.setHours(mergedDate, utils.getHours(timeParam));
  mergedDate = utils.setMinutes(mergedDate, utils.getMinutes(timeParam));
  mergedDate = utils.setSeconds(mergedDate, utils.getSeconds(timeParam));
  mergedDate = utils.setMilliseconds(mergedDate, utils.getMilliseconds(timeParam));
  return mergedDate;
};
var findClosestEnabledDate = ({
  date,
  disableFuture,
  disablePast,
  maxDate,
  minDate,
  isDateDisabled,
  utils,
  timezone
}) => {
  const today = mergeDateAndTime(utils, utils.date(void 0, timezone), date);
  if (disablePast && utils.isBefore(minDate, today)) {
    minDate = today;
  }
  if (disableFuture && utils.isAfter(maxDate, today)) {
    maxDate = today;
  }
  let forward = date;
  let backward = date;
  if (utils.isBefore(date, minDate)) {
    forward = minDate;
    backward = null;
  }
  if (utils.isAfter(date, maxDate)) {
    if (backward) {
      backward = maxDate;
    }
    forward = null;
  }
  while (forward || backward) {
    if (forward && utils.isAfter(forward, maxDate)) {
      forward = null;
    }
    if (backward && utils.isBefore(backward, minDate)) {
      backward = null;
    }
    if (forward) {
      if (!isDateDisabled(forward)) {
        return forward;
      }
      forward = utils.addDays(forward, 1);
    }
    if (backward) {
      if (!isDateDisabled(backward)) {
        return backward;
      }
      backward = utils.addDays(backward, -1);
    }
  }
  return null;
};
var replaceInvalidDateByNull = (utils, value) => !utils.isValid(value) ? null : value;
var applyDefaultDate = (utils, value, defaultValue) => {
  if (value == null || !utils.isValid(value)) {
    return defaultValue;
  }
  return value;
};
var areDatesEqual = (utils, a, b) => {
  if (!utils.isValid(a) && a != null && !utils.isValid(b) && b != null) {
    return true;
  }
  return utils.isEqual(a, b);
};
var getMonthsInYear = (utils, year) => {
  const firstMonth = utils.startOfYear(year);
  const months = [firstMonth];
  while (months.length < 12) {
    const prevMonth = months[months.length - 1];
    months.push(utils.addMonths(prevMonth, 1));
  }
  return months;
};
var getTodayDate = (utils, timezone, valueType) => valueType === "date" ? utils.startOfDay(utils.date(void 0, timezone)) : utils.date(void 0, timezone);
var formatMeridiem = (utils, meridiem) => {
  const date = utils.setHours(utils.date(), meridiem === "am" ? 2 : 14);
  return utils.format(date, "meridiem");
};
var DATE_VIEWS = ["year", "month", "day"];
var isDatePickerView = (view) => DATE_VIEWS.includes(view);
var resolveDateFormat = (utils, {
  format,
  views
}, isInToolbar) => {
  if (format != null) {
    return format;
  }
  const formats = utils.formats;
  if (areViewsEqual(views, ["year"])) {
    return formats.year;
  }
  if (areViewsEqual(views, ["month"])) {
    return formats.month;
  }
  if (areViewsEqual(views, ["day"])) {
    return formats.dayOfMonth;
  }
  if (areViewsEqual(views, ["month", "year"])) {
    return `${formats.month} ${formats.year}`;
  }
  if (areViewsEqual(views, ["day", "month"])) {
    return `${formats.month} ${formats.dayOfMonth}`;
  }
  if (isInToolbar) {
    return /en/.test(utils.getCurrentLocaleCode()) ? formats.normalDateWithWeekday : formats.normalDate;
  }
  return formats.keyboardDate;
};
var getWeekdays = (utils, date) => {
  const start = utils.startOfWeek(date);
  return [0, 1, 2, 3, 4, 5, 6].map((diff) => utils.addDays(start, diff));
};

// node_modules/@mui/x-date-pickers/esm/internals/utils/time-utils.js
var EXPORTED_TIME_VIEWS = ["hours", "minutes", "seconds"];
var TIME_VIEWS = ["hours", "minutes", "seconds", "meridiem"];
var isTimeView = (view) => EXPORTED_TIME_VIEWS.includes(view);
var isInternalTimeView = (view) => TIME_VIEWS.includes(view);
var getMeridiem = (date, utils) => {
  if (!date) {
    return null;
  }
  return utils.getHours(date) >= 12 ? "pm" : "am";
};
var convertValueToMeridiem = (value, meridiem, ampm) => {
  if (ampm) {
    const currentMeridiem = value >= 12 ? "pm" : "am";
    if (currentMeridiem !== meridiem) {
      return meridiem === "am" ? value - 12 : value + 12;
    }
  }
  return value;
};
var convertToMeridiem = (time, meridiem, ampm, utils) => {
  const newHoursAmount = convertValueToMeridiem(utils.getHours(time), meridiem, ampm);
  return utils.setHours(time, newHoursAmount);
};
var getSecondsInDay = (date, utils) => {
  return utils.getHours(date) * 3600 + utils.getMinutes(date) * 60 + utils.getSeconds(date);
};
var createIsAfterIgnoreDatePart = (disableIgnoringDatePartForTimeValidation, utils) => (dateLeft, dateRight) => {
  if (disableIgnoringDatePartForTimeValidation) {
    return utils.isAfter(dateLeft, dateRight);
  }
  return getSecondsInDay(dateLeft, utils) > getSecondsInDay(dateRight, utils);
};
var resolveTimeFormat = (utils, {
  format,
  views,
  ampm
}) => {
  if (format != null) {
    return format;
  }
  const formats = utils.formats;
  if (areViewsEqual(views, ["hours"])) {
    return ampm ? `${formats.hours12h} ${formats.meridiem}` : formats.hours24h;
  }
  if (areViewsEqual(views, ["minutes"])) {
    return formats.minutes;
  }
  if (areViewsEqual(views, ["seconds"])) {
    return formats.seconds;
  }
  if (areViewsEqual(views, ["minutes", "seconds"])) {
    return `${formats.minutes}:${formats.seconds}`;
  }
  if (areViewsEqual(views, ["hours", "minutes", "seconds"])) {
    return ampm ? `${formats.hours12h}:${formats.minutes}:${formats.seconds} ${formats.meridiem}` : `${formats.hours24h}:${formats.minutes}:${formats.seconds}`;
  }
  return ampm ? `${formats.hours12h}:${formats.minutes} ${formats.meridiem}` : `${formats.hours24h}:${formats.minutes}`;
};

// node_modules/@mui/x-date-pickers/esm/internals/utils/getDefaultReferenceDate.js
var SECTION_TYPE_GRANULARITY = {
  year: 1,
  month: 2,
  day: 3,
  hours: 4,
  minutes: 5,
  seconds: 6,
  milliseconds: 7
};
var getSectionTypeGranularity = (sections) => Math.max(...sections.map((section) => SECTION_TYPE_GRANULARITY[section.type] ?? 1));
var roundDate = (utils, granularity, date) => {
  if (granularity === SECTION_TYPE_GRANULARITY.year) {
    return utils.startOfYear(date);
  }
  if (granularity === SECTION_TYPE_GRANULARITY.month) {
    return utils.startOfMonth(date);
  }
  if (granularity === SECTION_TYPE_GRANULARITY.day) {
    return utils.startOfDay(date);
  }
  let roundedDate = date;
  if (granularity < SECTION_TYPE_GRANULARITY.minutes) {
    roundedDate = utils.setMinutes(roundedDate, 0);
  }
  if (granularity < SECTION_TYPE_GRANULARITY.seconds) {
    roundedDate = utils.setSeconds(roundedDate, 0);
  }
  if (granularity < SECTION_TYPE_GRANULARITY.milliseconds) {
    roundedDate = utils.setMilliseconds(roundedDate, 0);
  }
  return roundedDate;
};
var getDefaultReferenceDate = ({
  props,
  utils,
  granularity,
  timezone,
  getTodayDate: inGetTodayDate
}) => {
  let referenceDate = inGetTodayDate ? inGetTodayDate() : roundDate(utils, granularity, getTodayDate(utils, timezone));
  if (props.minDate != null && utils.isAfterDay(props.minDate, referenceDate)) {
    referenceDate = roundDate(utils, granularity, props.minDate);
  }
  if (props.maxDate != null && utils.isBeforeDay(props.maxDate, referenceDate)) {
    referenceDate = roundDate(utils, granularity, props.maxDate);
  }
  const isAfter = createIsAfterIgnoreDatePart(props.disableIgnoringDatePartForTimeValidation ?? false, utils);
  if (props.minTime != null && isAfter(props.minTime, referenceDate)) {
    referenceDate = roundDate(utils, granularity, props.disableIgnoringDatePartForTimeValidation ? props.minTime : mergeDateAndTime(utils, referenceDate, props.minTime));
  }
  if (props.maxTime != null && isAfter(referenceDate, props.maxTime)) {
    referenceDate = roundDate(utils, granularity, props.disableIgnoringDatePartForTimeValidation ? props.maxTime : mergeDateAndTime(utils, referenceDate, props.maxTime));
  }
  return referenceDate;
};

// node_modules/@mui/x-date-pickers/esm/internals/hooks/useField/useField.utils.js
var getDateSectionConfigFromFormatToken = (utils, formatToken) => {
  const config = utils.formatTokenMap[formatToken];
  if (config == null) {
    throw new Error([`MUI X: The token "${formatToken}" is not supported by the Date and Time Pickers.`, "Please try using another token or open an issue on https://github.com/mui/mui-x/issues/new/choose if you think it should be supported."].join("\n"));
  }
  if (typeof config === "string") {
    return {
      type: config,
      contentType: config === "meridiem" ? "letter" : "digit",
      maxLength: void 0
    };
  }
  return {
    type: config.sectionType,
    contentType: config.contentType,
    maxLength: config.maxLength
  };
};
var getDaysInWeekStr = (utils, format) => {
  const elements = [];
  const now = utils.date(void 0, "default");
  const startDate = utils.startOfWeek(now);
  const endDate = utils.endOfWeek(now);
  let current = startDate;
  while (utils.isBefore(current, endDate)) {
    elements.push(current);
    current = utils.addDays(current, 1);
  }
  return elements.map((weekDay) => utils.formatByString(weekDay, format));
};
var getLetterEditingOptions = (utils, timezone, sectionType, format) => {
  switch (sectionType) {
    case "month": {
      return getMonthsInYear(utils, utils.date(void 0, timezone)).map((month) => utils.formatByString(month, format));
    }
    case "weekDay": {
      return getDaysInWeekStr(utils, format);
    }
    case "meridiem": {
      const now = utils.date(void 0, timezone);
      return [utils.startOfDay(now), utils.endOfDay(now)].map((date) => utils.formatByString(date, format));
    }
    default: {
      return [];
    }
  }
};
var FORMAT_SECONDS_NO_LEADING_ZEROS = "s";
var NON_LOCALIZED_DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
var getLocalizedDigits = (utils) => {
  const today = utils.date(void 0);
  const formattedZero = utils.formatByString(utils.setSeconds(today, 0), FORMAT_SECONDS_NO_LEADING_ZEROS);
  if (formattedZero === "0") {
    return NON_LOCALIZED_DIGITS;
  }
  return Array.from({
    length: 10
  }).map((_, index) => utils.formatByString(utils.setSeconds(today, index), FORMAT_SECONDS_NO_LEADING_ZEROS));
};
var removeLocalizedDigits = (valueStr, localizedDigits) => {
  if (localizedDigits[0] === "0") {
    return valueStr;
  }
  const digits = [];
  let currentFormattedDigit = "";
  for (let i = 0; i < valueStr.length; i += 1) {
    currentFormattedDigit += valueStr[i];
    const matchingDigitIndex = localizedDigits.indexOf(currentFormattedDigit);
    if (matchingDigitIndex > -1) {
      digits.push(matchingDigitIndex.toString());
      currentFormattedDigit = "";
    }
  }
  return digits.join("");
};
var applyLocalizedDigits = (valueStr, localizedDigits) => {
  if (localizedDigits[0] === "0") {
    return valueStr;
  }
  return valueStr.split("").map((char) => localizedDigits[Number(char)]).join("");
};
var isStringNumber = (valueStr, localizedDigits) => {
  const nonLocalizedValueStr = removeLocalizedDigits(valueStr, localizedDigits);
  return nonLocalizedValueStr !== " " && !Number.isNaN(Number(nonLocalizedValueStr));
};
var cleanLeadingZeros = (valueStr, size) => {
  return Number(valueStr).toString().padStart(size, "0");
};
var cleanDigitSectionValue = (utils, value, sectionBoundaries, localizedDigits, section) => {
  if (true) {
    if (section.type !== "day" && section.contentType === "digit-with-letter") {
      throw new Error([`MUI X: The token "${section.format}" is a digit format with letter in it.'
             This type of format is only supported for 'day' sections`].join("\n"));
    }
  }
  if (section.type === "day" && section.contentType === "digit-with-letter") {
    const date = utils.setDate(sectionBoundaries.longestMonth, value);
    return utils.formatByString(date, section.format);
  }
  let valueStr = value.toString();
  if (section.hasLeadingZerosInInput) {
    valueStr = cleanLeadingZeros(valueStr, section.maxLength);
  }
  return applyLocalizedDigits(valueStr, localizedDigits);
};
var getSectionVisibleValue = (section, target, localizedDigits) => {
  let value = section.value || section.placeholder;
  const hasLeadingZeros = target === "non-input" ? section.hasLeadingZerosInFormat : section.hasLeadingZerosInInput;
  if (target === "non-input" && section.hasLeadingZerosInInput && !section.hasLeadingZerosInFormat) {
    value = Number(removeLocalizedDigits(value, localizedDigits)).toString();
  }
  const shouldAddInvisibleSpace = ["input-rtl", "input-ltr"].includes(target) && section.contentType === "digit" && !hasLeadingZeros && value.length === 1;
  if (shouldAddInvisibleSpace) {
    value = `${value}‎`;
  }
  if (target === "input-rtl") {
    value = `⁨${value}⁩`;
  }
  return value;
};
var changeSectionValueFormat = (utils, valueStr, currentFormat, newFormat) => {
  if (true) {
    if (getDateSectionConfigFromFormatToken(utils, currentFormat).type === "weekDay") {
      throw new Error("changeSectionValueFormat doesn't support week day formats");
    }
  }
  return utils.formatByString(utils.parse(valueStr, currentFormat), newFormat);
};
var isFourDigitYearFormat = (utils, format) => utils.formatByString(utils.date(void 0, "system"), format).length === 4;
var doesSectionFormatHaveLeadingZeros = (utils, contentType, sectionType, format) => {
  if (contentType !== "digit") {
    return false;
  }
  const now = utils.date(void 0, "default");
  switch (sectionType) {
    // We can't use `changeSectionValueFormat`, because  `utils.parse('1', 'YYYY')` returns `1971` instead of `1`.
    case "year": {
      if (utils.lib === "dayjs" && format === "YY") {
        return true;
      }
      return utils.formatByString(utils.setYear(now, 1), format).startsWith("0");
    }
    case "month": {
      return utils.formatByString(utils.startOfYear(now), format).length > 1;
    }
    case "day": {
      return utils.formatByString(utils.startOfMonth(now), format).length > 1;
    }
    case "weekDay": {
      return utils.formatByString(utils.startOfWeek(now), format).length > 1;
    }
    case "hours": {
      return utils.formatByString(utils.setHours(now, 1), format).length > 1;
    }
    case "minutes": {
      return utils.formatByString(utils.setMinutes(now, 1), format).length > 1;
    }
    case "seconds": {
      return utils.formatByString(utils.setSeconds(now, 1), format).length > 1;
    }
    default: {
      throw new Error("Invalid section type");
    }
  }
};
var getDateFromDateSections = (utils, sections, localizedDigits) => {
  const shouldSkipWeekDays = sections.some((section) => section.type === "day");
  const sectionFormats = [];
  const sectionValues = [];
  for (let i = 0; i < sections.length; i += 1) {
    const section = sections[i];
    const shouldSkip = shouldSkipWeekDays && section.type === "weekDay";
    if (!shouldSkip) {
      sectionFormats.push(section.format);
      sectionValues.push(getSectionVisibleValue(section, "non-input", localizedDigits));
    }
  }
  const formatWithoutSeparator = sectionFormats.join(" ");
  const dateWithoutSeparatorStr = sectionValues.join(" ");
  return utils.parse(dateWithoutSeparatorStr, formatWithoutSeparator);
};
var createDateStrForV7HiddenInputFromSections = (sections) => sections.map((section) => {
  return `${section.startSeparator}${section.value || section.placeholder}${section.endSeparator}`;
}).join("");
var createDateStrForV6InputFromSections = (sections, localizedDigits, isRtl) => {
  const formattedSections = sections.map((section) => {
    const dateValue = getSectionVisibleValue(section, isRtl ? "input-rtl" : "input-ltr", localizedDigits);
    return `${section.startSeparator}${dateValue}${section.endSeparator}`;
  });
  const dateStr = formattedSections.join("");
  if (!isRtl) {
    return dateStr;
  }
  return `⁦${dateStr}⁩`;
};
var getSectionsBoundaries = (utils, localizedDigits, timezone) => {
  const today = utils.date(void 0, timezone);
  const endOfYear = utils.endOfYear(today);
  const endOfDay = utils.endOfDay(today);
  const {
    maxDaysInMonth,
    longestMonth
  } = getMonthsInYear(utils, today).reduce((acc, month) => {
    const daysInMonth = utils.getDaysInMonth(month);
    if (daysInMonth > acc.maxDaysInMonth) {
      return {
        maxDaysInMonth: daysInMonth,
        longestMonth: month
      };
    }
    return acc;
  }, {
    maxDaysInMonth: 0,
    longestMonth: null
  });
  return {
    year: ({
      format
    }) => ({
      minimum: 0,
      maximum: isFourDigitYearFormat(utils, format) ? 9999 : 99
    }),
    month: () => ({
      minimum: 1,
      // Assumption: All years have the same amount of months
      maximum: utils.getMonth(endOfYear) + 1
    }),
    day: ({
      currentDate
    }) => ({
      minimum: 1,
      maximum: utils.isValid(currentDate) ? utils.getDaysInMonth(currentDate) : maxDaysInMonth,
      longestMonth
    }),
    weekDay: ({
      format,
      contentType
    }) => {
      if (contentType === "digit") {
        const daysInWeek = getDaysInWeekStr(utils, format).map(Number);
        return {
          minimum: Math.min(...daysInWeek),
          maximum: Math.max(...daysInWeek)
        };
      }
      return {
        minimum: 1,
        maximum: 7
      };
    },
    hours: ({
      format
    }) => {
      const lastHourInDay = utils.getHours(endOfDay);
      const hasMeridiem = removeLocalizedDigits(utils.formatByString(utils.endOfDay(today), format), localizedDigits) !== lastHourInDay.toString();
      if (hasMeridiem) {
        return {
          minimum: 1,
          maximum: Number(removeLocalizedDigits(utils.formatByString(utils.startOfDay(today), format), localizedDigits))
        };
      }
      return {
        minimum: 0,
        maximum: lastHourInDay
      };
    },
    minutes: () => ({
      minimum: 0,
      // Assumption: All years have the same amount of minutes
      maximum: utils.getMinutes(endOfDay)
    }),
    seconds: () => ({
      minimum: 0,
      // Assumption: All years have the same amount of seconds
      maximum: utils.getSeconds(endOfDay)
    }),
    meridiem: () => ({
      minimum: 0,
      maximum: 1
    }),
    empty: () => ({
      minimum: 0,
      maximum: 0
    })
  };
};
var warnedOnceInvalidSection = false;
var validateSections = (sections, valueType) => {
  if (true) {
    if (!warnedOnceInvalidSection) {
      const supportedSections = ["empty"];
      if (["date", "date-time"].includes(valueType)) {
        supportedSections.push("weekDay", "day", "month", "year");
      }
      if (["time", "date-time"].includes(valueType)) {
        supportedSections.push("hours", "minutes", "seconds", "meridiem");
      }
      const invalidSection = sections.find((section) => !supportedSections.includes(section.type));
      if (invalidSection) {
        console.warn(`MUI X: The field component you are using is not compatible with the "${invalidSection.type}" date section.`, `The supported date sections are ["${supportedSections.join('", "')}"]\`.`);
        warnedOnceInvalidSection = true;
      }
    }
  }
};
var transferDateSectionValue = (utils, section, dateToTransferFrom, dateToTransferTo) => {
  switch (section.type) {
    case "year": {
      return utils.setYear(dateToTransferTo, utils.getYear(dateToTransferFrom));
    }
    case "month": {
      return utils.setMonth(dateToTransferTo, utils.getMonth(dateToTransferFrom));
    }
    case "weekDay": {
      let dayInWeekStrOfActiveDate = utils.formatByString(dateToTransferFrom, section.format);
      if (section.hasLeadingZerosInInput) {
        dayInWeekStrOfActiveDate = cleanLeadingZeros(dayInWeekStrOfActiveDate, section.maxLength);
      }
      const formattedDaysInWeek = getDaysInWeekStr(utils, section.format);
      const dayInWeekOfActiveDate = formattedDaysInWeek.indexOf(dayInWeekStrOfActiveDate);
      const dayInWeekOfNewSectionValue = formattedDaysInWeek.indexOf(section.value);
      const diff = dayInWeekOfNewSectionValue - dayInWeekOfActiveDate;
      return utils.addDays(dateToTransferFrom, diff);
    }
    case "day": {
      return utils.setDate(dateToTransferTo, utils.getDate(dateToTransferFrom));
    }
    case "meridiem": {
      const isAM = utils.getHours(dateToTransferFrom) < 12;
      const mergedDateHours = utils.getHours(dateToTransferTo);
      if (isAM && mergedDateHours >= 12) {
        return utils.addHours(dateToTransferTo, -12);
      }
      if (!isAM && mergedDateHours < 12) {
        return utils.addHours(dateToTransferTo, 12);
      }
      return dateToTransferTo;
    }
    case "hours": {
      return utils.setHours(dateToTransferTo, utils.getHours(dateToTransferFrom));
    }
    case "minutes": {
      return utils.setMinutes(dateToTransferTo, utils.getMinutes(dateToTransferFrom));
    }
    case "seconds": {
      return utils.setSeconds(dateToTransferTo, utils.getSeconds(dateToTransferFrom));
    }
    default: {
      return dateToTransferTo;
    }
  }
};
var reliableSectionModificationOrder = {
  year: 1,
  month: 2,
  day: 3,
  weekDay: 4,
  hours: 5,
  minutes: 6,
  seconds: 7,
  meridiem: 8,
  empty: 9
};
var mergeDateIntoReferenceDate = (utils, dateToTransferFrom, sections, referenceDate, shouldLimitToEditedSections) => (
  // cloning sections before sort to avoid mutating it
  [...sections].sort((a, b) => reliableSectionModificationOrder[a.type] - reliableSectionModificationOrder[b.type]).reduce((mergedDate, section) => {
    if (!shouldLimitToEditedSections || section.modified) {
      return transferDateSectionValue(utils, section, dateToTransferFrom, mergedDate);
    }
    return mergedDate;
  }, referenceDate)
);
var isAndroid = () => navigator.userAgent.toLowerCase().includes("android");
var getSectionOrder = (sections, shouldApplyRTL) => {
  const neighbors = {};
  if (!shouldApplyRTL) {
    sections.forEach((_, index) => {
      const leftIndex = index === 0 ? null : index - 1;
      const rightIndex = index === sections.length - 1 ? null : index + 1;
      neighbors[index] = {
        leftIndex,
        rightIndex
      };
    });
    return {
      neighbors,
      startIndex: 0,
      endIndex: sections.length - 1
    };
  }
  const rtl2ltr = {};
  const ltr2rtl = {};
  let groupedSectionsStart = 0;
  let groupedSectionsEnd = 0;
  let RTLIndex = sections.length - 1;
  while (RTLIndex >= 0) {
    groupedSectionsEnd = sections.findIndex(
      // eslint-disable-next-line @typescript-eslint/no-loop-func
      (section, index) => {
        var _a;
        return index >= groupedSectionsStart && ((_a = section.endSeparator) == null ? void 0 : _a.includes(" ")) && // Special case where the spaces were not there in the initial input
        section.endSeparator !== " / ";
      }
    );
    if (groupedSectionsEnd === -1) {
      groupedSectionsEnd = sections.length - 1;
    }
    for (let i = groupedSectionsEnd; i >= groupedSectionsStart; i -= 1) {
      ltr2rtl[i] = RTLIndex;
      rtl2ltr[RTLIndex] = i;
      RTLIndex -= 1;
    }
    groupedSectionsStart = groupedSectionsEnd + 1;
  }
  sections.forEach((_, index) => {
    const rtlIndex = ltr2rtl[index];
    const leftIndex = rtlIndex === 0 ? null : rtl2ltr[rtlIndex - 1];
    const rightIndex = rtlIndex === sections.length - 1 ? null : rtl2ltr[rtlIndex + 1];
    neighbors[index] = {
      leftIndex,
      rightIndex
    };
  });
  return {
    neighbors,
    startIndex: rtl2ltr[0],
    endIndex: rtl2ltr[sections.length - 1]
  };
};
var parseSelectedSections = (selectedSections, sections) => {
  if (selectedSections == null) {
    return null;
  }
  if (selectedSections === "all") {
    return "all";
  }
  if (typeof selectedSections === "string") {
    const index = sections.findIndex((section) => section.type === selectedSections);
    return index === -1 ? null : index;
  }
  return selectedSections;
};

// node_modules/@mui/x-date-pickers/esm/internals/utils/valueManagers.js
var _excluded = ["value", "referenceDate"];
var singleItemValueManager = {
  emptyValue: null,
  getTodayValue: getTodayDate,
  getInitialReferenceValue: (_ref) => {
    let {
      value,
      referenceDate
    } = _ref, params = _objectWithoutPropertiesLoose(_ref, _excluded);
    if (params.utils.isValid(value)) {
      return value;
    }
    if (referenceDate != null) {
      return referenceDate;
    }
    return getDefaultReferenceDate(params);
  },
  cleanValue: replaceInvalidDateByNull,
  areValuesEqual: areDatesEqual,
  isSameError: (a, b) => a === b,
  hasError: (error) => error != null,
  defaultErrorState: null,
  getTimezone: (utils, value) => utils.isValid(value) ? utils.getTimezone(value) : null,
  setTimezone: (utils, timezone, value) => value == null ? null : utils.setTimezone(value, timezone)
};
var singleItemFieldValueManager = {
  updateReferenceValue: (utils, value, prevReferenceValue) => utils.isValid(value) ? value : prevReferenceValue,
  getSectionsFromValue: (date, getSectionsFromDate) => getSectionsFromDate(date),
  getV7HiddenInputValueFromSections: createDateStrForV7HiddenInputFromSections,
  getV6InputValueFromSections: createDateStrForV6InputFromSections,
  parseValueStr: (valueStr, referenceValue, parseDate) => parseDate(valueStr.trim(), referenceValue),
  getDateFromSection: (value) => value,
  getDateSectionsFromValue: (sections) => sections,
  updateDateInValue: (value, activeSection, activeDate) => activeDate,
  clearDateSections: (sections) => sections.map((section) => _extends({}, section, {
    value: ""
  }))
};

// node_modules/@mui/x-date-pickers/esm/DatePicker/shared.js
var React17 = __toESM(require_react(), 1);

// node_modules/@mui/x-date-pickers/esm/DatePicker/DatePickerToolbar.js
var React14 = __toESM(require_react(), 1);
var import_prop_types2 = __toESM(require_prop_types(), 1);

// node_modules/@mui/x-date-pickers/esm/internals/components/PickersToolbar.js
var React8 = __toESM(require_react(), 1);

// node_modules/@mui/x-date-pickers/esm/internals/components/pickersToolbarClasses.js
function getPickersToolbarUtilityClass(slot) {
  return generateUtilityClass("MuiPickersToolbar", slot);
}
var pickersToolbarClasses = generateUtilityClasses("MuiPickersToolbar", ["root", "title", "content"]);

// node_modules/@mui/x-date-pickers/esm/internals/hooks/useToolbarOwnerState.js
var React7 = __toESM(require_react(), 1);

// node_modules/@mui/x-date-pickers/esm/internals/hooks/usePickerPrivateContext.js
var React6 = __toESM(require_react(), 1);

// node_modules/@mui/x-date-pickers/esm/internals/components/PickerProvider.js
var React5 = __toESM(require_react(), 1);

// node_modules/@mui/x-date-pickers/esm/LocalizationProvider/LocalizationProvider.js
var React = __toESM(require_react(), 1);
var import_prop_types = __toESM(require_prop_types(), 1);
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var _excluded2 = ["localeText"];
var MuiPickersAdapterContext = React.createContext(null);
if (true) {
  MuiPickersAdapterContext.displayName = "MuiPickersAdapterContext";
}
var LocalizationProvider = function LocalizationProvider2(inProps) {
  const {
    localeText: inLocaleText
  } = inProps, otherInProps = _objectWithoutPropertiesLoose(inProps, _excluded2);
  const {
    utils: parentUtils,
    localeText: parentLocaleText
  } = React.useContext(MuiPickersAdapterContext) ?? {
    utils: void 0,
    localeText: void 0
  };
  const props = useThemeProps({
    // We don't want to pass the `localeText` prop to the theme, that way it will always return the theme value,
    // We will then merge this theme value with our value manually
    props: otherInProps,
    name: "MuiLocalizationProvider"
  });
  const {
    children,
    dateAdapter: DateAdapter,
    dateFormats,
    dateLibInstance,
    adapterLocale,
    localeText: themeLocaleText
  } = props;
  const localeText = React.useMemo(() => _extends({}, themeLocaleText, parentLocaleText, inLocaleText), [themeLocaleText, parentLocaleText, inLocaleText]);
  const utils = React.useMemo(() => {
    if (!DateAdapter) {
      if (parentUtils) {
        return parentUtils;
      }
      return null;
    }
    const adapter = new DateAdapter({
      locale: adapterLocale,
      formats: dateFormats,
      instance: dateLibInstance
    });
    if (!adapter.isMUIAdapter) {
      throw new Error(["MUI X: The date adapter should be imported from `@mui/x-date-pickers` or `@mui/x-date-pickers-pro`, not from `@date-io`", "For example, `import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'` instead of `import AdapterDayjs from '@date-io/dayjs'`", "More information on the installation documentation: https://mui.com/x/react-date-pickers/quickstart/#installation"].join(`
`));
    }
    return adapter;
  }, [DateAdapter, adapterLocale, dateFormats, dateLibInstance, parentUtils]);
  const defaultDates = React.useMemo(() => {
    if (!utils) {
      return null;
    }
    return {
      minDate: utils.date("1900-01-01T00:00:00.000"),
      maxDate: utils.date("2099-12-31T00:00:00.000")
    };
  }, [utils]);
  const contextValue = React.useMemo(() => {
    return {
      utils,
      defaultDates,
      localeText
    };
  }, [defaultDates, utils, localeText]);
  return (0, import_jsx_runtime.jsx)(MuiPickersAdapterContext.Provider, {
    value: contextValue,
    children
  });
};
true ? LocalizationProvider.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Locale for the date library you are using
   */
  adapterLocale: import_prop_types.default.any,
  children: import_prop_types.default.node,
  /**
   * Date library adapter class function.
   * @see See the localization provider {@link https://mui.com/x/react-date-pickers/quickstart/#integrate-provider-and-adapter date adapter setup section} for more details.
   */
  dateAdapter: import_prop_types.default.func,
  /**
   * Formats that are used for any child pickers
   */
  dateFormats: import_prop_types.default.shape({
    dayOfMonth: import_prop_types.default.string,
    dayOfMonthFull: import_prop_types.default.string,
    fullDate: import_prop_types.default.string,
    fullTime12h: import_prop_types.default.string,
    fullTime24h: import_prop_types.default.string,
    hours12h: import_prop_types.default.string,
    hours24h: import_prop_types.default.string,
    keyboardDate: import_prop_types.default.string,
    keyboardDateTime12h: import_prop_types.default.string,
    keyboardDateTime24h: import_prop_types.default.string,
    meridiem: import_prop_types.default.string,
    minutes: import_prop_types.default.string,
    month: import_prop_types.default.string,
    monthShort: import_prop_types.default.string,
    normalDate: import_prop_types.default.string,
    normalDateWithWeekday: import_prop_types.default.string,
    seconds: import_prop_types.default.string,
    shortDate: import_prop_types.default.string,
    weekday: import_prop_types.default.string,
    weekdayShort: import_prop_types.default.string,
    year: import_prop_types.default.string
  }),
  /**
   * Date library instance you are using, if it has some global overrides
   * ```jsx
   * dateLibInstance={momentTimeZone}
   * ```
   */
  dateLibInstance: import_prop_types.default.any,
  /**
   * Locale for components texts
   */
  localeText: import_prop_types.default.object
} : void 0;

// node_modules/@mui/x-date-pickers/esm/hooks/useIsValidValue.js
var React2 = __toESM(require_react(), 1);
var IsValidValueContext = React2.createContext(() => true);
function useIsValidValue() {
  return React2.useContext(IsValidValueContext);
}

// node_modules/@mui/x-date-pickers/esm/internals/hooks/useNullableFieldPrivateContext.js
var React3 = __toESM(require_react(), 1);
var PickerFieldPrivateContext = React3.createContext(null);
function useNullableFieldPrivateContext() {
  return React3.useContext(PickerFieldPrivateContext);
}

// node_modules/@mui/x-date-pickers/esm/hooks/usePickerContext.js
var React4 = __toESM(require_react(), 1);
var PickerContext = React4.createContext(null);
var usePickerContext = () => {
  const value = React4.useContext(PickerContext);
  if (value == null) {
    throw new Error("MUI X: The `usePickerContext` hook can only be called inside the context of a Picker component");
  }
  return value;
};

// node_modules/@mui/x-date-pickers/esm/internals/components/PickerProvider.js
var import_jsx_runtime2 = __toESM(require_jsx_runtime(), 1);
var PickerActionsContext = React5.createContext(null);
var PickerPrivateContext = React5.createContext({
  ownerState: {
    isPickerDisabled: false,
    isPickerReadOnly: false,
    isPickerValueEmpty: false,
    isPickerOpen: false,
    pickerVariant: "desktop",
    pickerOrientation: "portrait"
  },
  rootRefObject: {
    current: null
  },
  labelId: void 0,
  dismissViews: () => {
  },
  hasUIView: true,
  getCurrentViewMode: () => "UI",
  triggerElement: null,
  viewContainerRole: null,
  defaultActionBarActions: [],
  onPopperExited: void 0
});
function PickerProvider(props) {
  const {
    contextValue,
    actionsContextValue,
    privateContextValue,
    fieldPrivateContextValue,
    isValidContextValue,
    localeText,
    children
  } = props;
  return (0, import_jsx_runtime2.jsx)(PickerContext.Provider, {
    value: contextValue,
    children: (0, import_jsx_runtime2.jsx)(PickerActionsContext.Provider, {
      value: actionsContextValue,
      children: (0, import_jsx_runtime2.jsx)(PickerPrivateContext.Provider, {
        value: privateContextValue,
        children: (0, import_jsx_runtime2.jsx)(PickerFieldPrivateContext.Provider, {
          value: fieldPrivateContextValue,
          children: (0, import_jsx_runtime2.jsx)(IsValidValueContext.Provider, {
            value: isValidContextValue,
            children: (0, import_jsx_runtime2.jsx)(LocalizationProvider, {
              localeText,
              children
            })
          })
        })
      })
    })
  });
}

// node_modules/@mui/x-date-pickers/esm/internals/hooks/usePickerPrivateContext.js
var usePickerPrivateContext = () => React6.useContext(PickerPrivateContext);

// node_modules/@mui/x-date-pickers/esm/internals/hooks/useToolbarOwnerState.js
function useToolbarOwnerState() {
  const {
    ownerState: pickerOwnerState
  } = usePickerPrivateContext();
  const isRtl = useRtl();
  return React7.useMemo(() => _extends({}, pickerOwnerState, {
    toolbarDirection: isRtl ? "rtl" : "ltr"
  }), [pickerOwnerState, isRtl]);
}

// node_modules/@mui/x-date-pickers/esm/internals/components/PickersToolbar.js
var import_jsx_runtime3 = __toESM(require_jsx_runtime(), 1);
var _excluded3 = ["children", "className", "classes", "toolbarTitle", "hidden", "titleId", "classes", "landscapeDirection"];
var useUtilityClasses = (classes) => {
  const slots = {
    root: ["root"],
    title: ["title"],
    content: ["content"]
  };
  return composeClasses(slots, getPickersToolbarUtilityClass, classes);
};
var PickersToolbarRoot = styled_default("div", {
  name: "MuiPickersToolbar",
  slot: "Root"
})(({
  theme
}) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "space-between",
  padding: theme.spacing(2, 3),
  variants: [{
    props: {
      pickerOrientation: "landscape"
    },
    style: {
      height: "auto",
      maxWidth: 160,
      padding: 16,
      justifyContent: "flex-start",
      flexWrap: "wrap"
    }
  }]
}));
var PickersToolbarContent = styled_default("div", {
  name: "MuiPickersToolbar",
  slot: "Content",
  shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== "landscapeDirection"
})({
  display: "flex",
  flexWrap: "wrap",
  width: "100%",
  flex: 1,
  justifyContent: "space-between",
  alignItems: "center",
  flexDirection: "row",
  variants: [{
    props: {
      pickerOrientation: "landscape"
    },
    style: {
      justifyContent: "flex-start",
      alignItems: "flex-start",
      flexDirection: "column"
    }
  }, {
    props: {
      pickerOrientation: "landscape",
      landscapeDirection: "row"
    },
    style: {
      flexDirection: "row"
    }
  }]
});
var PickersToolbar = React8.forwardRef(function PickersToolbar2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiPickersToolbar"
  });
  const {
    children,
    className,
    classes: classesProp,
    toolbarTitle,
    hidden,
    titleId,
    landscapeDirection
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded3);
  const ownerState = useToolbarOwnerState();
  const classes = useUtilityClasses(classesProp);
  if (hidden) {
    return null;
  }
  return (0, import_jsx_runtime3.jsxs)(PickersToolbarRoot, _extends({
    ref,
    className: clsx_default(classes.root, className),
    ownerState
  }, other, {
    children: [(0, import_jsx_runtime3.jsx)(Typography_default, {
      color: "text.secondary",
      variant: "overline",
      id: titleId,
      className: classes.title,
      children: toolbarTitle
    }), (0, import_jsx_runtime3.jsx)(PickersToolbarContent, {
      className: classes.content,
      ownerState,
      landscapeDirection,
      children
    })]
  }));
});

// node_modules/@mui/x-date-pickers/esm/internals/hooks/useUtils.js
var React9 = __toESM(require_react(), 1);

// node_modules/@mui/x-date-pickers/esm/locales/utils/getPickersLocalization.js
var getPickersLocalization = (pickersTranslations) => {
  return {
    components: {
      MuiLocalizationProvider: {
        defaultProps: {
          localeText: _extends({}, pickersTranslations)
        }
      }
    }
  };
};

// node_modules/@mui/x-date-pickers/esm/locales/enUS.js
var enUSPickers = {
  // Calendar navigation
  previousMonth: "Previous month",
  nextMonth: "Next month",
  // View navigation
  openPreviousView: "Open previous view",
  openNextView: "Open next view",
  calendarViewSwitchingButtonAriaLabel: (view) => view === "year" ? "year view is open, switch to calendar view" : "calendar view is open, switch to year view",
  // DateRange labels
  start: "Start",
  end: "End",
  startDate: "Start date",
  startTime: "Start time",
  endDate: "End date",
  endTime: "End time",
  // Action bar
  cancelButtonLabel: "Cancel",
  clearButtonLabel: "Clear",
  okButtonLabel: "OK",
  todayButtonLabel: "Today",
  nextStepButtonLabel: "Next",
  // Toolbar titles
  datePickerToolbarTitle: "Select date",
  dateTimePickerToolbarTitle: "Select date & time",
  timePickerToolbarTitle: "Select time",
  dateRangePickerToolbarTitle: "Select date range",
  timeRangePickerToolbarTitle: "Select time range",
  // Clock labels
  clockLabelText: (view, formattedTime) => `Select ${view}. ${!formattedTime ? "No time selected" : `Selected time is ${formattedTime}`}`,
  hoursClockNumberText: (hours) => `${hours} hours`,
  minutesClockNumberText: (minutes) => `${minutes} minutes`,
  secondsClockNumberText: (seconds) => `${seconds} seconds`,
  // Digital clock labels
  selectViewText: (view) => `Select ${view}`,
  // Calendar labels
  calendarWeekNumberHeaderLabel: "Week number",
  calendarWeekNumberHeaderText: "#",
  calendarWeekNumberAriaLabelText: (weekNumber) => `Week ${weekNumber}`,
  calendarWeekNumberText: (weekNumber) => `${weekNumber}`,
  // Open Picker labels
  openDatePickerDialogue: (formattedDate) => formattedDate ? `Choose date, selected date is ${formattedDate}` : "Choose date",
  openTimePickerDialogue: (formattedTime) => formattedTime ? `Choose time, selected time is ${formattedTime}` : "Choose time",
  openRangePickerDialogue: (formattedRange) => formattedRange ? `Choose range, selected range is ${formattedRange}` : "Choose range",
  fieldClearLabel: "Clear",
  // Table labels
  timeTableLabel: "pick time",
  dateTableLabel: "pick date",
  // Field section placeholders
  fieldYearPlaceholder: (params) => "Y".repeat(params.digitAmount),
  fieldMonthPlaceholder: (params) => params.contentType === "letter" ? "MMMM" : "MM",
  fieldDayPlaceholder: () => "DD",
  fieldWeekDayPlaceholder: (params) => params.contentType === "letter" ? "EEEE" : "EE",
  fieldHoursPlaceholder: () => "hh",
  fieldMinutesPlaceholder: () => "mm",
  fieldSecondsPlaceholder: () => "ss",
  fieldMeridiemPlaceholder: () => "aa",
  // View names
  year: "Year",
  month: "Month",
  day: "Day",
  weekDay: "Week day",
  hours: "Hours",
  minutes: "Minutes",
  seconds: "Seconds",
  meridiem: "Meridiem",
  // Common
  empty: "Empty"
};
var DEFAULT_LOCALE = enUSPickers;
var enUS = getPickersLocalization(enUSPickers);

// node_modules/@mui/x-date-pickers/esm/internals/hooks/useUtils.js
var useLocalizationContext = () => {
  const localization = React9.useContext(MuiPickersAdapterContext);
  if (localization === null) {
    throw new Error(["MUI X: Can not find the date and time pickers localization context.", "It looks like you forgot to wrap your component in LocalizationProvider.", "This can also happen if you are bundling multiple versions of the `@mui/x-date-pickers` package"].join("\n"));
  }
  if (localization.utils === null) {
    throw new Error(["MUI X: Can not find the date and time pickers adapter from its localization context.", "It looks like you forgot to pass a `dateAdapter` to your LocalizationProvider."].join("\n"));
  }
  const localeText = React9.useMemo(() => _extends({}, DEFAULT_LOCALE, localization.localeText), [localization.localeText]);
  return React9.useMemo(() => _extends({}, localization, {
    localeText
  }), [localization, localeText]);
};
var useUtils = () => useLocalizationContext().utils;
var useDefaultDates = () => useLocalizationContext().defaultDates;
var useNow = (timezone) => {
  const utils = useUtils();
  const now = React9.useRef(void 0);
  if (now.current === void 0) {
    now.current = utils.date(void 0, timezone);
  }
  return now.current;
};

// node_modules/@mui/x-date-pickers/esm/hooks/usePickerTranslations.js
var usePickerTranslations = () => useLocalizationContext().localeText;

// node_modules/@mui/x-date-pickers/esm/DatePicker/datePickerToolbarClasses.js
function getDatePickerToolbarUtilityClass(slot) {
  return generateUtilityClass("MuiDatePickerToolbar", slot);
}
var datePickerToolbarClasses = generateUtilityClasses("MuiDatePickerToolbar", ["root", "title"]);

// node_modules/@mui/x-date-pickers/esm/hooks/useSplitFieldProps.js
var React10 = __toESM(require_react(), 1);

// node_modules/@mui/x-date-pickers/esm/validation/extractValidationProps.js
var DATE_VALIDATION_PROP_NAMES = ["disablePast", "disableFuture", "minDate", "maxDate", "shouldDisableDate", "shouldDisableMonth", "shouldDisableYear"];
var TIME_VALIDATION_PROP_NAMES = ["disablePast", "disableFuture", "minTime", "maxTime", "shouldDisableTime", "minutesStep", "ampm", "disableIgnoringDatePartForTimeValidation"];
var DATE_TIME_VALIDATION_PROP_NAMES = ["minDateTime", "maxDateTime"];
var VALIDATION_PROP_NAMES = [...DATE_VALIDATION_PROP_NAMES, ...TIME_VALIDATION_PROP_NAMES, ...DATE_TIME_VALIDATION_PROP_NAMES];
var extractValidationProps = (props) => VALIDATION_PROP_NAMES.reduce((extractedProps, propName) => {
  if (props.hasOwnProperty(propName)) {
    extractedProps[propName] = props[propName];
  }
  return extractedProps;
}, {});

// node_modules/@mui/x-date-pickers/esm/hooks/useSplitFieldProps.js
var SHARED_FIELD_INTERNAL_PROP_NAMES = ["value", "defaultValue", "referenceDate", "format", "formatDensity", "onChange", "timezone", "onError", "shouldRespectLeadingZeros", "selectedSections", "onSelectedSectionsChange", "unstableFieldRef", "unstableStartFieldRef", "unstableEndFieldRef", "enableAccessibleFieldDOMStructure", "disabled", "readOnly", "dateSeparator", "autoFocus", "focused"];
var useSplitFieldProps = (props, valueType) => {
  return React10.useMemo(() => {
    const forwardedProps = _extends({}, props);
    const internalProps = {};
    const extractProp = (propName) => {
      if (forwardedProps.hasOwnProperty(propName)) {
        internalProps[propName] = forwardedProps[propName];
        delete forwardedProps[propName];
      }
    };
    SHARED_FIELD_INTERNAL_PROP_NAMES.forEach(extractProp);
    if (valueType === "date") {
      DATE_VALIDATION_PROP_NAMES.forEach(extractProp);
    } else if (valueType === "time") {
      TIME_VALIDATION_PROP_NAMES.forEach(extractProp);
    } else if (valueType === "date-time") {
      DATE_VALIDATION_PROP_NAMES.forEach(extractProp);
      TIME_VALIDATION_PROP_NAMES.forEach(extractProp);
      DATE_TIME_VALIDATION_PROP_NAMES.forEach(extractProp);
    }
    return {
      forwardedProps,
      internalProps
    };
  }, [props, valueType]);
};

// node_modules/@mui/x-date-pickers/esm/hooks/useParsedFormat.js
var React12 = __toESM(require_react(), 1);

// node_modules/@mui/x-date-pickers/esm/internals/hooks/useField/buildSectionsFromFormat.js
var expandFormat = ({
  utils,
  format
}) => {
  let formatExpansionOverflow = 10;
  let prevFormat = format;
  let nextFormat = utils.expandFormat(format);
  while (nextFormat !== prevFormat) {
    prevFormat = nextFormat;
    nextFormat = utils.expandFormat(prevFormat);
    formatExpansionOverflow -= 1;
    if (formatExpansionOverflow < 0) {
      throw new Error("MUI X: The format expansion seems to be in an infinite loop. Please open an issue with the format passed to the component.");
    }
  }
  return nextFormat;
};
var getEscapedPartsFromFormat = ({
  utils,
  expandedFormat
}) => {
  const escapedParts = [];
  const {
    start: startChar,
    end: endChar
  } = utils.escapedCharacters;
  const regExp = new RegExp(`(\\${startChar}[^\\${endChar}]*\\${endChar})+`, "g");
  let match = null;
  while (match = regExp.exec(expandedFormat)) {
    escapedParts.push({
      start: match.index,
      end: regExp.lastIndex - 1
    });
  }
  return escapedParts;
};
var getSectionPlaceholder = (utils, localeText, sectionConfig, sectionFormat) => {
  switch (sectionConfig.type) {
    case "year": {
      return localeText.fieldYearPlaceholder({
        digitAmount: utils.formatByString(utils.date(void 0, "default"), sectionFormat).length,
        format: sectionFormat
      });
    }
    case "month": {
      return localeText.fieldMonthPlaceholder({
        contentType: sectionConfig.contentType,
        format: sectionFormat
      });
    }
    case "day": {
      return localeText.fieldDayPlaceholder({
        format: sectionFormat
      });
    }
    case "weekDay": {
      return localeText.fieldWeekDayPlaceholder({
        contentType: sectionConfig.contentType,
        format: sectionFormat
      });
    }
    case "hours": {
      return localeText.fieldHoursPlaceholder({
        format: sectionFormat
      });
    }
    case "minutes": {
      return localeText.fieldMinutesPlaceholder({
        format: sectionFormat
      });
    }
    case "seconds": {
      return localeText.fieldSecondsPlaceholder({
        format: sectionFormat
      });
    }
    case "meridiem": {
      return localeText.fieldMeridiemPlaceholder({
        format: sectionFormat
      });
    }
    default: {
      return sectionFormat;
    }
  }
};
var createSection = ({
  utils,
  date,
  shouldRespectLeadingZeros,
  localeText,
  localizedDigits,
  now,
  token,
  startSeparator
}) => {
  if (token === "") {
    throw new Error("MUI X: Should not call `commitToken` with an empty token");
  }
  const sectionConfig = getDateSectionConfigFromFormatToken(utils, token);
  const hasLeadingZerosInFormat = doesSectionFormatHaveLeadingZeros(utils, sectionConfig.contentType, sectionConfig.type, token);
  const hasLeadingZerosInInput = shouldRespectLeadingZeros ? hasLeadingZerosInFormat : sectionConfig.contentType === "digit";
  const isValidDate = utils.isValid(date);
  let sectionValue = isValidDate ? utils.formatByString(date, token) : "";
  let maxLength = null;
  if (hasLeadingZerosInInput) {
    if (hasLeadingZerosInFormat) {
      maxLength = sectionValue === "" ? utils.formatByString(now, token).length : sectionValue.length;
    } else {
      if (sectionConfig.maxLength == null) {
        throw new Error(`MUI X: The token ${token} should have a 'maxLength' property on it's adapter`);
      }
      maxLength = sectionConfig.maxLength;
      if (isValidDate) {
        sectionValue = applyLocalizedDigits(cleanLeadingZeros(removeLocalizedDigits(sectionValue, localizedDigits), maxLength), localizedDigits);
      }
    }
  }
  return _extends({}, sectionConfig, {
    format: token,
    maxLength,
    value: sectionValue,
    placeholder: getSectionPlaceholder(utils, localeText, sectionConfig, token),
    hasLeadingZerosInFormat,
    hasLeadingZerosInInput,
    startSeparator,
    endSeparator: "",
    modified: false
  });
};
var buildSections = (parameters) => {
  var _a;
  const {
    utils,
    expandedFormat,
    escapedParts
  } = parameters;
  const now = utils.date(void 0);
  const sections = [];
  let startSeparator = "";
  const validTokens = Object.keys(utils.formatTokenMap).sort((a, b) => b.length - a.length);
  const regExpFirstWordInFormat = /^([a-zA-Z]+)/;
  const regExpWordOnlyComposedOfTokens = new RegExp(`^(${validTokens.join("|")})*$`);
  const regExpFirstTokenInWord = new RegExp(`^(${validTokens.join("|")})`);
  const getEscapedPartOfCurrentChar = (i2) => escapedParts.find((escapeIndex) => escapeIndex.start <= i2 && escapeIndex.end >= i2);
  let i = 0;
  while (i < expandedFormat.length) {
    const escapedPartOfCurrentChar = getEscapedPartOfCurrentChar(i);
    const isEscapedChar = escapedPartOfCurrentChar != null;
    const firstWordInFormat = (_a = regExpFirstWordInFormat.exec(expandedFormat.slice(i))) == null ? void 0 : _a[1];
    if (!isEscapedChar && firstWordInFormat != null && regExpWordOnlyComposedOfTokens.test(firstWordInFormat)) {
      let word = firstWordInFormat;
      while (word.length > 0) {
        const firstWord = regExpFirstTokenInWord.exec(word)[1];
        word = word.slice(firstWord.length);
        sections.push(createSection(_extends({}, parameters, {
          now,
          token: firstWord,
          startSeparator
        })));
        startSeparator = "";
      }
      i += firstWordInFormat.length;
    } else {
      const char = expandedFormat[i];
      const isEscapeBoundary = isEscapedChar && (escapedPartOfCurrentChar == null ? void 0 : escapedPartOfCurrentChar.start) === i || (escapedPartOfCurrentChar == null ? void 0 : escapedPartOfCurrentChar.end) === i;
      if (!isEscapeBoundary) {
        if (sections.length === 0) {
          startSeparator += char;
        } else {
          sections[sections.length - 1].endSeparator += char;
          sections[sections.length - 1].isEndFormatSeparator = true;
        }
      }
      i += 1;
    }
  }
  if (sections.length === 0 && startSeparator.length > 0) {
    sections.push({
      type: "empty",
      contentType: "letter",
      maxLength: null,
      format: "",
      value: "",
      placeholder: "",
      hasLeadingZerosInFormat: false,
      hasLeadingZerosInInput: false,
      startSeparator,
      endSeparator: "",
      modified: false
    });
  }
  return sections;
};
var postProcessSections = ({
  isRtl,
  formatDensity,
  sections
}) => {
  return sections.map((section) => {
    const cleanSeparator = (separator) => {
      let cleanedSeparator = separator;
      if (isRtl && cleanedSeparator !== null && cleanedSeparator.includes(" ")) {
        cleanedSeparator = `⁩${cleanedSeparator}⁦`;
      }
      if (formatDensity === "spacious" && ["/", ".", "-"].includes(cleanedSeparator)) {
        cleanedSeparator = ` ${cleanedSeparator} `;
      }
      return cleanedSeparator;
    };
    section.startSeparator = cleanSeparator(section.startSeparator);
    section.endSeparator = cleanSeparator(section.endSeparator);
    return section;
  });
};
var buildSectionsFromFormat = (parameters) => {
  let expandedFormat = expandFormat(parameters);
  if (parameters.isRtl && parameters.enableAccessibleFieldDOMStructure) {
    expandedFormat = expandedFormat.split(" ").reverse().join(" ");
  }
  const escapedParts = getEscapedPartsFromFormat(_extends({}, parameters, {
    expandedFormat
  }));
  const sections = buildSections(_extends({}, parameters, {
    expandedFormat,
    escapedParts
  }));
  return postProcessSections(_extends({}, parameters, {
    sections
  }));
};

// node_modules/@mui/x-date-pickers/esm/internals/hooks/useNullablePickerContext.js
var React11 = __toESM(require_react(), 1);
var useNullablePickerContext = () => React11.useContext(PickerContext);

// node_modules/@mui/x-date-pickers/esm/hooks/useParsedFormat.js
var useParsedFormat = (parameters = {}) => {
  const pickerContext = useNullablePickerContext();
  const utils = useUtils();
  const isRtl = useRtl();
  const translations = usePickerTranslations();
  const localizedDigits = React12.useMemo(() => getLocalizedDigits(utils), [utils]);
  const {
    format = (pickerContext == null ? void 0 : pickerContext.fieldFormat) ?? utils.formats.fullDate
  } = parameters;
  return React12.useMemo(() => {
    const sections = buildSectionsFromFormat({
      utils,
      format,
      formatDensity: "dense",
      isRtl,
      shouldRespectLeadingZeros: true,
      localeText: translations,
      localizedDigits,
      date: null,
      // TODO v9: Make sure we still don't reverse in `buildSectionsFromFormat` when using `useParsedFormat`.
      enableAccessibleFieldDOMStructure: false
    });
    return sections.map((section) => `${section.startSeparator}${section.placeholder}${section.endSeparator}`).join("");
  }, [utils, isRtl, translations, localizedDigits, format]);
};

// node_modules/@mui/x-date-pickers/esm/hooks/usePickerActionsContext.js
var React13 = __toESM(require_react(), 1);
var usePickerActionsContext = () => {
  const value = React13.useContext(PickerActionsContext);
  if (value == null) {
    throw new Error(["MUI X: The `usePickerActionsContext` can only be called in fields that are used as a slot of a Picker component"].join("\n"));
  }
  return value;
};

// node_modules/@mui/x-date-pickers/esm/DatePicker/DatePickerToolbar.js
var import_jsx_runtime4 = __toESM(require_jsx_runtime(), 1);
var _excluded4 = ["toolbarFormat", "toolbarPlaceholder", "className", "classes"];
var useUtilityClasses2 = (classes) => {
  const slots = {
    root: ["root"],
    title: ["title"]
  };
  return composeClasses(slots, getDatePickerToolbarUtilityClass, classes);
};
var DatePickerToolbarRoot = styled_default(PickersToolbar, {
  name: "MuiDatePickerToolbar",
  slot: "Root"
})({});
var DatePickerToolbarTitle = styled_default(Typography_default, {
  name: "MuiDatePickerToolbar",
  slot: "Title"
})({
  variants: [{
    props: {
      pickerOrientation: "landscape"
    },
    style: {
      margin: "auto 16px auto auto"
    }
  }]
});
var DatePickerToolbar = React14.forwardRef(function DatePickerToolbar2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiDatePickerToolbar"
  });
  const {
    toolbarFormat,
    toolbarPlaceholder = "––",
    className,
    classes: classesProp
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded4);
  const utils = useUtils();
  const {
    value,
    views,
    orientation
  } = usePickerContext();
  const translations = usePickerTranslations();
  const ownerState = useToolbarOwnerState();
  const classes = useUtilityClasses2(classesProp);
  const dateText = React14.useMemo(() => {
    if (!utils.isValid(value)) {
      return toolbarPlaceholder;
    }
    const formatFromViews = resolveDateFormat(utils, {
      format: toolbarFormat,
      views
    }, true);
    return utils.formatByString(value, formatFromViews);
  }, [value, toolbarFormat, toolbarPlaceholder, utils, views]);
  return (0, import_jsx_runtime4.jsx)(DatePickerToolbarRoot, _extends({
    ref,
    toolbarTitle: translations.datePickerToolbarTitle,
    className: clsx_default(classes.root, className)
  }, other, {
    children: (0, import_jsx_runtime4.jsx)(DatePickerToolbarTitle, {
      variant: "h4",
      align: orientation === "landscape" ? "left" : "center",
      ownerState,
      className: classes.title,
      children: dateText
    })
  }));
});
true ? DatePickerToolbar.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types2.default.object,
  className: import_prop_types2.default.string,
  /**
   * If `true`, show the toolbar even in desktop mode.
   * @default `true` for Desktop, `false` for Mobile.
   */
  hidden: import_prop_types2.default.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types2.default.oneOfType([import_prop_types2.default.arrayOf(import_prop_types2.default.oneOfType([import_prop_types2.default.func, import_prop_types2.default.object, import_prop_types2.default.bool])), import_prop_types2.default.func, import_prop_types2.default.object]),
  titleId: import_prop_types2.default.string,
  /**
   * Toolbar date format.
   */
  toolbarFormat: import_prop_types2.default.string,
  /**
   * Toolbar value placeholder—it is displayed when the value is empty.
   * @default "––"
   */
  toolbarPlaceholder: import_prop_types2.default.node
} : void 0;

// node_modules/@mui/x-date-pickers/esm/managers/useDateManager.js
var React16 = __toESM(require_react(), 1);

// node_modules/@mui/x-date-pickers/esm/validation/validateDate.js
var validateDate = ({
  props,
  value,
  timezone,
  adapter
}) => {
  if (value === null) {
    return null;
  }
  const {
    shouldDisableDate,
    shouldDisableMonth,
    shouldDisableYear,
    disablePast,
    disableFuture,
    minDate,
    maxDate
  } = props;
  const now = adapter.utils.date(void 0, timezone);
  switch (true) {
    case !adapter.utils.isValid(value):
      return "invalidDate";
    case Boolean(shouldDisableDate && shouldDisableDate(value)):
      return "shouldDisableDate";
    case Boolean(shouldDisableMonth && shouldDisableMonth(value)):
      return "shouldDisableMonth";
    case Boolean(shouldDisableYear && shouldDisableYear(value)):
      return "shouldDisableYear";
    case Boolean(disableFuture && adapter.utils.isAfterDay(value, now)):
      return "disableFuture";
    case Boolean(disablePast && adapter.utils.isBeforeDay(value, now)):
      return "disablePast";
    case Boolean(minDate && adapter.utils.isBeforeDay(value, minDate)):
      return "minDate";
    case Boolean(maxDate && adapter.utils.isAfterDay(value, maxDate)):
      return "maxDate";
    default:
      return null;
  }
};
validateDate.valueManager = singleItemValueManager;

// node_modules/@mui/x-date-pickers/esm/validation/validateTime.js
var validateTime = ({
  adapter,
  value,
  timezone,
  props
}) => {
  if (value === null) {
    return null;
  }
  const {
    minTime,
    maxTime,
    minutesStep,
    shouldDisableTime,
    disableIgnoringDatePartForTimeValidation = false,
    disablePast,
    disableFuture
  } = props;
  const now = adapter.utils.date(void 0, timezone);
  const isAfter = createIsAfterIgnoreDatePart(disableIgnoringDatePartForTimeValidation, adapter.utils);
  switch (true) {
    case !adapter.utils.isValid(value):
      return "invalidDate";
    case Boolean(minTime && isAfter(minTime, value)):
      return "minTime";
    case Boolean(maxTime && isAfter(value, maxTime)):
      return "maxTime";
    case Boolean(disableFuture && adapter.utils.isAfter(value, now)):
      return "disableFuture";
    case Boolean(disablePast && adapter.utils.isBefore(value, now)):
      return "disablePast";
    case Boolean(shouldDisableTime && shouldDisableTime(value, "hours")):
      return "shouldDisableTime-hours";
    case Boolean(shouldDisableTime && shouldDisableTime(value, "minutes")):
      return "shouldDisableTime-minutes";
    case Boolean(shouldDisableTime && shouldDisableTime(value, "seconds")):
      return "shouldDisableTime-seconds";
    case Boolean(minutesStep && adapter.utils.getMinutes(value) % minutesStep !== 0):
      return "minutesStep";
    default:
      return null;
  }
};
validateTime.valueManager = singleItemValueManager;

// node_modules/@mui/x-date-pickers/esm/validation/validateDateTime.js
var validateDateTime = ({
  adapter,
  value,
  timezone,
  props
}) => {
  const dateValidationResult = validateDate({
    adapter,
    value,
    timezone,
    props
  });
  if (dateValidationResult !== null) {
    return dateValidationResult;
  }
  return validateTime({
    adapter,
    value,
    timezone,
    props
  });
};
validateDateTime.valueManager = singleItemValueManager;

// node_modules/@mui/x-date-pickers/esm/validation/useValidation.js
var React15 = __toESM(require_react(), 1);
function useValidation(options) {
  const {
    props,
    validator,
    value,
    timezone,
    onError
  } = options;
  const adapter = useLocalizationContext();
  const previousValidationErrorRef = React15.useRef(validator.valueManager.defaultErrorState);
  const validationError = validator({
    adapter,
    value,
    timezone,
    props
  });
  const hasValidationError = validator.valueManager.hasError(validationError);
  React15.useEffect(() => {
    if (onError && !validator.valueManager.isSameError(validationError, previousValidationErrorRef.current)) {
      onError(validationError, value);
    }
    previousValidationErrorRef.current = validationError;
  }, [validator, onError, validationError, value]);
  const getValidationErrorForNewValue = useEventCallback_default((newValue) => {
    return validator({
      adapter,
      value: newValue,
      timezone,
      props
    });
  });
  return {
    validationError,
    hasValidationError,
    getValidationErrorForNewValue
  };
}

// node_modules/@mui/x-date-pickers/esm/managers/useDateManager.js
function useDateManager(parameters = {}) {
  const {
    enableAccessibleFieldDOMStructure = true
  } = parameters;
  return React16.useMemo(() => ({
    valueType: "date",
    validator: validateDate,
    internal_valueManager: singleItemValueManager,
    internal_fieldValueManager: singleItemFieldValueManager,
    internal_enableAccessibleFieldDOMStructure: enableAccessibleFieldDOMStructure,
    internal_useApplyDefaultValuesToFieldInternalProps: useApplyDefaultValuesToDateFieldInternalProps,
    internal_useOpenPickerButtonAriaLabel: useOpenPickerButtonAriaLabel
  }), [enableAccessibleFieldDOMStructure]);
}
function useOpenPickerButtonAriaLabel(value) {
  const utils = useUtils();
  const translations = usePickerTranslations();
  return React16.useMemo(() => {
    const formattedValue = utils.isValid(value) ? utils.format(value, "fullDate") : null;
    return translations.openDatePickerDialogue(formattedValue);
  }, [value, translations, utils]);
}
function useApplyDefaultValuesToDateFieldInternalProps(internalProps) {
  const utils = useUtils();
  const validationProps = useApplyDefaultValuesToDateValidationProps(internalProps);
  return React16.useMemo(() => _extends({}, internalProps, validationProps, {
    format: internalProps.format ?? utils.formats.keyboardDate
  }), [internalProps, validationProps, utils]);
}
function useApplyDefaultValuesToDateValidationProps(props) {
  const utils = useUtils();
  const defaultDates = useDefaultDates();
  return React16.useMemo(() => ({
    disablePast: props.disablePast ?? false,
    disableFuture: props.disableFuture ?? false,
    minDate: applyDefaultDate(utils, props.minDate, defaultDates.minDate),
    maxDate: applyDefaultDate(utils, props.maxDate, defaultDates.maxDate)
  }), [props.minDate, props.maxDate, props.disableFuture, props.disablePast, utils, defaultDates]);
}

// node_modules/@mui/x-date-pickers/esm/DatePicker/shared.js
function useDatePickerDefaultizedProps(props, name) {
  const themeProps = useThemeProps({
    props,
    name
  });
  const validationProps = useApplyDefaultValuesToDateValidationProps(themeProps);
  const localeText = React17.useMemo(() => {
    var _a;
    if (((_a = themeProps.localeText) == null ? void 0 : _a.toolbarTitle) == null) {
      return themeProps.localeText;
    }
    return _extends({}, themeProps.localeText, {
      datePickerToolbarTitle: themeProps.localeText.toolbarTitle
    });
  }, [themeProps.localeText]);
  return _extends({}, themeProps, validationProps, {
    localeText
  }, applyDefaultViewProps({
    views: themeProps.views,
    openTo: themeProps.openTo,
    defaultViews: ["year", "day"],
    defaultOpenTo: "day"
  }), {
    slots: _extends({
      toolbar: DatePickerToolbar
    }, themeProps.slots)
  });
}

// node_modules/@mui/x-date-pickers/esm/internals/hooks/useDesktopPicker/useDesktopPicker.js
var React39 = __toESM(require_react(), 1);

// node_modules/@mui/x-date-pickers/esm/internals/components/PickerPopper/PickerPopper.js
var React18 = __toESM(require_react(), 1);

// node_modules/@mui/x-date-pickers/esm/internals/components/PickerPopper/pickerPopperClasses.js
function getPickerPopperUtilityClass(slot) {
  return generateUtilityClass("MuiPickerPopper", slot);
}
var pickerPopperClasses = generateUtilityClasses("MuiPickerPopper", ["root", "paper"]);

// node_modules/@mui/x-date-pickers/esm/internals/utils/utils.js
function arrayIncludes(array, itemOrItems) {
  if (Array.isArray(itemOrItems)) {
    return itemOrItems.every((item) => array.indexOf(item) !== -1);
  }
  return array.indexOf(itemOrItems) !== -1;
}
var executeInTheNextEventLoopTick = (fn) => {
  setTimeout(fn, 0);
};
var getActiveElement = (root = document) => {
  const activeEl = root.activeElement;
  if (!activeEl) {
    return null;
  }
  if (activeEl.shadowRoot) {
    return getActiveElement(activeEl.shadowRoot);
  }
  return activeEl;
};
var getFocusedListItemIndex = (listElement) => {
  const children = Array.from(listElement.children);
  return children.indexOf(getActiveElement(document));
};
var DEFAULT_DESKTOP_MODE_MEDIA_QUERY = "@media (pointer: fine)";
function mergeSx(...sxProps) {
  return sxProps.reduce((acc, sxProp) => {
    if (Array.isArray(sxProp)) {
      acc.push(...sxProp);
    } else if (sxProp != null) {
      acc.push(sxProp);
    }
    return acc;
  }, []);
}

// node_modules/@mui/x-date-pickers/esm/internals/components/PickerPopper/PickerPopper.js
var import_jsx_runtime5 = __toESM(require_jsx_runtime(), 1);
var _excluded5 = ["PaperComponent", "ownerState", "children", "paperSlotProps", "paperClasses", "onPaperClick", "onPaperTouchStart"];
var useUtilityClasses3 = (classes) => {
  const slots = {
    root: ["root"],
    paper: ["paper"]
  };
  return composeClasses(slots, getPickerPopperUtilityClass, classes);
};
var PickerPopperRoot = styled_default(Popper_default, {
  name: "MuiPickerPopper",
  slot: "Root"
})(({
  theme
}) => ({
  zIndex: theme.zIndex.modal
}));
var PickerPopperPaper = styled_default(Paper_default, {
  name: "MuiPickerPopper",
  slot: "Paper"
})({
  outline: 0,
  transformOrigin: "top center",
  variants: [{
    props: ({
      popperPlacement
    }) => ["top", "top-start", "top-end"].includes(popperPlacement),
    style: {
      transformOrigin: "bottom center"
    }
  }]
});
function clickedRootScrollbar(event, doc) {
  return doc.documentElement.clientWidth < event.clientX || doc.documentElement.clientHeight < event.clientY;
}
function useClickAwayListener(active, onClickAway) {
  const movedRef = React18.useRef(false);
  const syntheticEventRef = React18.useRef(false);
  const nodeRef = React18.useRef(null);
  const activatedRef = React18.useRef(false);
  React18.useEffect(() => {
    if (!active) {
      return void 0;
    }
    function armClickAwayListener() {
      activatedRef.current = true;
    }
    document.addEventListener("mousedown", armClickAwayListener, true);
    document.addEventListener("touchstart", armClickAwayListener, true);
    return () => {
      document.removeEventListener("mousedown", armClickAwayListener, true);
      document.removeEventListener("touchstart", armClickAwayListener, true);
      activatedRef.current = false;
    };
  }, [active]);
  const handleClickAway = useEventCallback_default((event) => {
    if (!activatedRef.current) {
      return;
    }
    const insideReactTree = syntheticEventRef.current;
    syntheticEventRef.current = false;
    const doc = ownerDocument(nodeRef.current);
    if (!nodeRef.current || // is a TouchEvent?
    "clientX" in event && clickedRootScrollbar(event, doc)) {
      return;
    }
    if (movedRef.current) {
      movedRef.current = false;
      return;
    }
    let insideDOM;
    if (event.composedPath) {
      insideDOM = event.composedPath().indexOf(nodeRef.current) > -1;
    } else {
      insideDOM = !doc.documentElement.contains(event.target) || nodeRef.current.contains(event.target);
    }
    if (!insideDOM && !insideReactTree) {
      onClickAway(event);
    }
  });
  const handleSynthetic = () => {
    syntheticEventRef.current = true;
  };
  React18.useEffect(() => {
    if (active) {
      const doc = ownerDocument(nodeRef.current);
      const handleTouchMove = () => {
        movedRef.current = true;
      };
      doc.addEventListener("touchstart", handleClickAway);
      doc.addEventListener("touchmove", handleTouchMove);
      return () => {
        doc.removeEventListener("touchstart", handleClickAway);
        doc.removeEventListener("touchmove", handleTouchMove);
      };
    }
    return void 0;
  }, [active, handleClickAway]);
  React18.useEffect(() => {
    if (active) {
      const doc = ownerDocument(nodeRef.current);
      doc.addEventListener("click", handleClickAway);
      return () => {
        doc.removeEventListener("click", handleClickAway);
        syntheticEventRef.current = false;
      };
    }
    return void 0;
  }, [active, handleClickAway]);
  return [nodeRef, handleSynthetic, handleSynthetic];
}
var PickerPopperPaperWrapper = React18.forwardRef((props, ref) => {
  const {
    PaperComponent,
    ownerState,
    children,
    paperSlotProps,
    paperClasses,
    onPaperClick,
    onPaperTouchStart
    // picks up the style props provided by `Transition`
    // https://mui.com/material-ui/transitions/#child-requirement
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded5);
  const paperProps = useSlotProps_default({
    elementType: PaperComponent,
    externalSlotProps: paperSlotProps,
    additionalProps: {
      tabIndex: -1,
      elevation: 8,
      ref
    },
    className: paperClasses,
    ownerState
  });
  return (0, import_jsx_runtime5.jsx)(PaperComponent, _extends({}, other, paperProps, {
    onClick: (event) => {
      var _a;
      onPaperClick(event);
      (_a = paperProps.onClick) == null ? void 0 : _a.call(paperProps, event);
    },
    onTouchStart: (event) => {
      var _a;
      onPaperTouchStart(event);
      (_a = paperProps.onTouchStart) == null ? void 0 : _a.call(paperProps, event);
    },
    ownerState,
    children
  }));
});
function PickerPopper(inProps) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiPickerPopper"
  });
  const {
    children,
    placement = "bottom-start",
    slots,
    slotProps,
    classes: classesProp
  } = props;
  const {
    open,
    popupRef,
    reduceAnimations
  } = usePickerContext();
  const {
    dismissViews,
    getCurrentViewMode,
    onPopperExited,
    triggerElement,
    viewContainerRole
  } = usePickerPrivateContext();
  React18.useEffect(() => {
    function handleKeyDown2(nativeEvent) {
      if (open && nativeEvent.key === "Escape") {
        dismissViews();
      }
    }
    document.addEventListener("keydown", handleKeyDown2);
    return () => {
      document.removeEventListener("keydown", handleKeyDown2);
    };
  }, [dismissViews, open]);
  const lastFocusedElementRef = React18.useRef(null);
  React18.useEffect(() => {
    if (viewContainerRole === "tooltip" || getCurrentViewMode() === "field") {
      return;
    }
    if (open) {
      lastFocusedElementRef.current = getActiveElement(document);
    } else if (lastFocusedElementRef.current && lastFocusedElementRef.current instanceof HTMLElement) {
      setTimeout(() => {
        if (lastFocusedElementRef.current instanceof HTMLElement) {
          lastFocusedElementRef.current.focus();
        }
      });
    }
  }, [open, viewContainerRole, getCurrentViewMode]);
  const classes = useUtilityClasses3(classesProp);
  const {
    ownerState: pickerOwnerState,
    rootRefObject
  } = usePickerPrivateContext();
  const ownerState = _extends({}, pickerOwnerState, {
    popperPlacement: placement
  });
  const handleClickAway = useEventCallback_default(() => {
    if (viewContainerRole === "tooltip") {
      executeInTheNextEventLoopTick(() => {
        var _a, _b;
        if (((_a = rootRefObject.current) == null ? void 0 : _a.contains(getActiveElement(document))) || ((_b = popupRef.current) == null ? void 0 : _b.contains(getActiveElement(document)))) {
          return;
        }
        dismissViews();
      });
    } else {
      dismissViews();
    }
  });
  const [clickAwayRef, onPaperClick, onPaperTouchStart] = useClickAwayListener(open, handleClickAway);
  const paperRef = React18.useRef(null);
  const handleRef = useForkRef(paperRef, popupRef);
  const handlePaperRef = useForkRef(handleRef, clickAwayRef);
  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      event.stopPropagation();
      dismissViews();
    }
  };
  const Transition = (slots == null ? void 0 : slots.desktopTransition) ?? reduceAnimations ? Fade_default : Grow_default;
  const FocusTrap = (slots == null ? void 0 : slots.desktopTrapFocus) ?? FocusTrap_default;
  const Paper = (slots == null ? void 0 : slots.desktopPaper) ?? PickerPopperPaper;
  const Popper = (slots == null ? void 0 : slots.popper) ?? PickerPopperRoot;
  const popperProps = useSlotProps_default({
    elementType: Popper,
    externalSlotProps: slotProps == null ? void 0 : slotProps.popper,
    additionalProps: {
      transition: true,
      role: viewContainerRole == null ? void 0 : viewContainerRole,
      open,
      placement,
      anchorEl: triggerElement,
      onKeyDown: handleKeyDown
    },
    className: classes.root,
    ownerState
  });
  return (0, import_jsx_runtime5.jsx)(Popper, _extends({}, popperProps, {
    children: ({
      TransitionProps
    }) => (0, import_jsx_runtime5.jsx)(FocusTrap, _extends({
      open,
      disableAutoFocus: true,
      disableRestoreFocus: true,
      disableEnforceFocus: viewContainerRole === "tooltip",
      isEnabled: () => true
    }, slotProps == null ? void 0 : slotProps.desktopTrapFocus, {
      children: (0, import_jsx_runtime5.jsx)(Transition, _extends({}, TransitionProps, slotProps == null ? void 0 : slotProps.desktopTransition, {
        onExited: (event) => {
          var _a, _b, _c;
          onPopperExited == null ? void 0 : onPopperExited();
          (_b = (_a = slotProps == null ? void 0 : slotProps.desktopTransition) == null ? void 0 : _a.onExited) == null ? void 0 : _b.call(_a, event);
          (_c = TransitionProps == null ? void 0 : TransitionProps.onExited) == null ? void 0 : _c.call(TransitionProps);
        },
        children: (0, import_jsx_runtime5.jsx)(PickerPopperPaperWrapper, {
          PaperComponent: Paper,
          ownerState,
          ref: handlePaperRef,
          onPaperClick,
          onPaperTouchStart,
          paperClasses: classes.paper,
          paperSlotProps: slotProps == null ? void 0 : slotProps.desktopPaper,
          children
        })
      }))
    }))
  }));
}

// node_modules/@mui/x-date-pickers/esm/internals/hooks/usePicker/usePicker.js
var React23 = __toESM(require_react(), 1);

// node_modules/@mui/x-date-pickers/esm/internals/hooks/useReduceAnimations.js
var PREFERS_REDUCED_MOTION = "@media (prefers-reduced-motion: reduce)";
var mobileVersionMatches = typeof navigator !== "undefined" && navigator.userAgent.match(/android\s(\d+)|OS\s(\d+)/i);
var androidVersion = mobileVersionMatches && mobileVersionMatches[1] ? parseInt(mobileVersionMatches[1], 10) : null;
var iOSVersion = mobileVersionMatches && mobileVersionMatches[2] ? parseInt(mobileVersionMatches[2], 10) : null;
var slowAnimationDevices = androidVersion && androidVersion < 10 || iOSVersion && iOSVersion < 13 || false;
function useReduceAnimations(customReduceAnimations) {
  const prefersReduced = useMediaQuery_default(PREFERS_REDUCED_MOTION, {
    defaultMatches: false
  });
  if (customReduceAnimations != null) {
    return customReduceAnimations;
  }
  return prefersReduced || slowAnimationDevices;
}

// node_modules/@mui/x-date-pickers/esm/internals/hooks/useViews.js
var React19 = __toESM(require_react(), 1);

// node_modules/@mui/x-date-pickers/esm/internals/utils/createStepNavigation.js
var DEFAULT_STEP_NAVIGATION = {
  hasNextStep: false,
  hasSeveralSteps: false,
  goToNextStep: () => {
  },
  areViewsInSameStep: () => true
};
function createStepNavigation(parameters) {
  const {
    steps,
    isViewMatchingStep,
    onStepChange
  } = parameters;
  return (parametersBis) => {
    if (steps == null) {
      return DEFAULT_STEP_NAVIGATION;
    }
    const currentStepIndex = steps.findIndex((step) => isViewMatchingStep(parametersBis.view, step));
    const nextStep = currentStepIndex === -1 || currentStepIndex === steps.length - 1 ? null : steps[currentStepIndex + 1];
    return {
      hasNextStep: nextStep != null,
      hasSeveralSteps: steps.length > 1,
      goToNextStep: () => {
        if (nextStep == null) {
          return;
        }
        onStepChange(_extends({}, parametersBis, {
          step: nextStep
        }));
      },
      areViewsInSameStep: (viewA, viewB) => {
        const stepA = steps.find((step) => isViewMatchingStep(viewA, step));
        const stepB = steps.find((step) => isViewMatchingStep(viewB, step));
        return stepA === stepB;
      }
    };
  };
}

// node_modules/@mui/x-date-pickers/esm/internals/hooks/useViews.js
var warnedOnceNotValidView = false;
function useViews({
  onChange,
  onViewChange,
  openTo,
  view: inView,
  views,
  autoFocus,
  focusedView: inFocusedView,
  onFocusedViewChange,
  getStepNavigation
}) {
  if (true) {
    if (!warnedOnceNotValidView) {
      if (inView != null && !views.includes(inView)) {
        console.warn(`MUI X: \`view="${inView}"\` is not a valid prop.`, `It must be an element of \`views=["${views.join('", "')}"]\`.`);
        warnedOnceNotValidView = true;
      }
      if (inView == null && openTo != null && !views.includes(openTo)) {
        console.warn(`MUI X: \`openTo="${openTo}"\` is not a valid prop.`, `It must be an element of \`views=["${views.join('", "')}"]\`.`);
        warnedOnceNotValidView = true;
      }
    }
  }
  const previousOpenTo = React19.useRef(openTo);
  const previousViews = React19.useRef(views);
  const defaultView = React19.useRef(views.includes(openTo) ? openTo : views[0]);
  const [view, setView] = useControlled({
    name: "useViews",
    state: "view",
    controlled: inView,
    default: defaultView.current
  });
  const defaultFocusedView = React19.useRef(autoFocus ? view : null);
  const [focusedView, setFocusedView] = useControlled({
    name: "useViews",
    state: "focusedView",
    controlled: inFocusedView,
    default: defaultFocusedView.current
  });
  const stepNavigation = getStepNavigation ? getStepNavigation({
    setView,
    view,
    defaultView: defaultView.current,
    views
  }) : DEFAULT_STEP_NAVIGATION;
  React19.useEffect(() => {
    if (previousOpenTo.current && previousOpenTo.current !== openTo || previousViews.current && previousViews.current.some((previousView2) => !views.includes(previousView2))) {
      setView(views.includes(openTo) ? openTo : views[0]);
      previousViews.current = views;
      previousOpenTo.current = openTo;
    }
  }, [openTo, setView, view, views]);
  const viewIndex = views.indexOf(view);
  const previousView = views[viewIndex - 1] ?? null;
  const nextView = views[viewIndex + 1] ?? null;
  const handleFocusedViewChange = useEventCallback_default((viewToFocus, hasFocus) => {
    if (hasFocus) {
      setFocusedView(viewToFocus);
    } else {
      setFocusedView(
        (prevFocusedView) => viewToFocus === prevFocusedView ? null : prevFocusedView
        // If false the blur is due to view switching
      );
    }
    onFocusedViewChange == null ? void 0 : onFocusedViewChange(viewToFocus, hasFocus);
  });
  const handleChangeView = useEventCallback_default((newView) => {
    handleFocusedViewChange(newView, true);
    if (newView === view) {
      return;
    }
    setView(newView);
    if (onViewChange) {
      onViewChange(newView);
    }
  });
  const goToNextView = useEventCallback_default(() => {
    if (nextView) {
      handleChangeView(nextView);
    }
  });
  const setValueAndGoToNextView = useEventCallback_default((value, currentViewSelectionState, selectedView) => {
    const isSelectionFinishedOnCurrentView = currentViewSelectionState === "finish";
    const hasMoreViews = selectedView ? (
      // handles case like `DateTimePicker`, where a view might return a `finish` selection state
      // but when it's not the final view given all `views` -> overall selection state should be `partial`.
      views.indexOf(selectedView) < views.length - 1
    ) : Boolean(nextView);
    const globalSelectionState = isSelectionFinishedOnCurrentView && hasMoreViews ? "partial" : currentViewSelectionState;
    onChange(value, globalSelectionState, selectedView);
    let currentView = null;
    if (selectedView != null && selectedView !== view) {
      currentView = selectedView;
    } else if (isSelectionFinishedOnCurrentView) {
      currentView = view;
    }
    if (currentView == null) {
      return;
    }
    const viewToNavigateTo = views[views.indexOf(currentView) + 1];
    if (viewToNavigateTo == null || !stepNavigation.areViewsInSameStep(currentView, viewToNavigateTo)) {
      return;
    }
    handleChangeView(viewToNavigateTo);
  });
  return _extends({}, stepNavigation, {
    view,
    setView: handleChangeView,
    focusedView,
    setFocusedView: handleFocusedViewChange,
    nextView,
    previousView,
    // Always return up-to-date default view instead of the initial one (i.e. defaultView.current)
    defaultView: views.includes(openTo) ? openTo : views[0],
    goToNextView,
    setValueAndGoToNextView
  });
}

// node_modules/@mui/x-date-pickers/esm/internals/hooks/usePicker/hooks/useOrientation.js
var React20 = __toESM(require_react(), 1);
function getOrientation() {
  if (typeof window === "undefined") {
    return "portrait";
  }
  if (window.screen && window.screen.orientation && window.screen.orientation.angle) {
    return Math.abs(window.screen.orientation.angle) === 90 ? "landscape" : "portrait";
  }
  if (window.orientation) {
    return Math.abs(Number(window.orientation)) === 90 ? "landscape" : "portrait";
  }
  return "portrait";
}
function useOrientation(views, customOrientation) {
  const [orientation, setOrientation] = React20.useState(getOrientation);
  useEnhancedEffect_default(() => {
    const eventHandler = () => {
      setOrientation(getOrientation());
    };
    window.addEventListener("orientationchange", eventHandler);
    return () => {
      window.removeEventListener("orientationchange", eventHandler);
    };
  }, []);
  if (arrayIncludes(views, ["hours", "minutes", "seconds"])) {
    return "portrait";
  }
  return customOrientation ?? orientation;
}

// node_modules/@mui/x-date-pickers/esm/internals/hooks/usePicker/hooks/useValueAndOpenStates.js
var React22 = __toESM(require_react(), 1);

// node_modules/@mui/x-date-pickers/esm/internals/hooks/useControlledValue.js
var React21 = __toESM(require_react(), 1);
var useControlledValue = ({
  name,
  timezone: timezoneProp,
  value: valueProp,
  defaultValue,
  referenceDate,
  onChange: onChangeProp,
  valueManager
}) => {
  const utils = useUtils();
  const [valueWithInputTimezone, setValue] = useControlled({
    name,
    state: "value",
    controlled: valueProp,
    default: defaultValue ?? valueManager.emptyValue
  });
  const inputTimezone = React21.useMemo(() => valueManager.getTimezone(utils, valueWithInputTimezone), [utils, valueManager, valueWithInputTimezone]);
  const setInputTimezone = useEventCallback_default((newValue) => {
    if (inputTimezone == null) {
      return newValue;
    }
    return valueManager.setTimezone(utils, inputTimezone, newValue);
  });
  const timezoneToRender = React21.useMemo(() => {
    if (timezoneProp) {
      return timezoneProp;
    }
    if (inputTimezone) {
      return inputTimezone;
    }
    if (referenceDate) {
      return utils.getTimezone(referenceDate);
    }
    return "default";
  }, [timezoneProp, inputTimezone, referenceDate, utils]);
  const valueWithTimezoneToRender = React21.useMemo(() => valueManager.setTimezone(utils, timezoneToRender, valueWithInputTimezone), [valueManager, utils, timezoneToRender, valueWithInputTimezone]);
  const handleValueChange = useEventCallback_default((newValue, ...otherParams) => {
    const newValueWithInputTimezone = setInputTimezone(newValue);
    setValue(newValueWithInputTimezone);
    onChangeProp == null ? void 0 : onChangeProp(newValueWithInputTimezone, ...otherParams);
  });
  return {
    value: valueWithTimezoneToRender,
    handleValueChange,
    timezone: timezoneToRender
  };
};

// node_modules/@mui/x-date-pickers/esm/internals/hooks/usePicker/hooks/useValueAndOpenStates.js
function useValueAndOpenStates(parameters) {
  const {
    props,
    valueManager,
    validator
  } = parameters;
  const {
    value: valueProp,
    defaultValue: defaultValueProp,
    onChange,
    referenceDate,
    timezone: timezoneProp,
    onAccept,
    closeOnSelect,
    open: openProp,
    onOpen,
    onClose
  } = props;
  const {
    current: defaultValue
  } = React22.useRef(defaultValueProp);
  const {
    current: isValueControlled
  } = React22.useRef(valueProp !== void 0);
  const {
    current: isOpenControlled
  } = React22.useRef(openProp !== void 0);
  const utils = useUtils();
  if (true) {
    if (props.renderInput != null) {
      warnOnce(["MUI X: The `renderInput` prop has been removed in version 6.0 of the Date and Time Pickers.", "You can replace it with the `textField` component slot in most cases.", "For more information, please have a look at the migration guide (https://mui.com/x/migration/migration-pickers-v5/#input-renderer-required-in-v5)."]);
    }
  }
  if (true) {
    React22.useEffect(() => {
      if (isValueControlled !== (valueProp !== void 0)) {
        console.error([`MUI X: A component is changing the ${isValueControlled ? "" : "un"}controlled value of a Picker to be ${isValueControlled ? "un" : ""}controlled.`, "Elements should not switch from uncontrolled to controlled (or vice versa).", `Decide between using a controlled or uncontrolled valuefor the lifetime of the component.`, "The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.", "More info: https://fb.me/react-controlled-components"].join("\n"));
      }
    }, [valueProp]);
    React22.useEffect(() => {
      if (!isValueControlled && defaultValue !== defaultValueProp) {
        console.error([`MUI X: A component is changing the defaultValue of an uncontrolled Picker after being initialized. To suppress this warning opt to use a controlled value.`].join("\n"));
      }
    }, [JSON.stringify(defaultValue)]);
  }
  const {
    timezone,
    value,
    handleValueChange
  } = useControlledValue({
    name: "a picker component",
    timezone: timezoneProp,
    value: valueProp,
    defaultValue,
    referenceDate,
    onChange,
    valueManager
  });
  const [state, setState] = React22.useState(() => ({
    open: false,
    lastExternalValue: value,
    clockShallowValue: void 0,
    lastCommittedValue: value,
    hasBeenModifiedSinceMount: false
  }));
  const {
    getValidationErrorForNewValue
  } = useValidation({
    props,
    validator,
    timezone,
    value,
    onError: props.onError
  });
  const setOpen = useEventCallback_default((action) => {
    const newOpen = typeof action === "function" ? action(state.open) : action;
    if (!isOpenControlled) {
      setState((prevState) => _extends({}, prevState, {
        open: newOpen
      }));
    }
    if (newOpen && onOpen) {
      onOpen();
    }
    if (!newOpen) {
      onClose == null ? void 0 : onClose();
    }
  });
  const setValue = useEventCallback_default((newValue, options) => {
    const {
      changeImportance = "accept",
      skipPublicationIfPristine = false,
      validationError,
      shortcut,
      shouldClose = changeImportance === "accept"
    } = options ?? {};
    let shouldFireOnChange;
    let shouldFireOnAccept;
    if (!skipPublicationIfPristine && !isValueControlled && !state.hasBeenModifiedSinceMount) {
      shouldFireOnChange = true;
      shouldFireOnAccept = changeImportance === "accept";
    } else {
      shouldFireOnChange = !valueManager.areValuesEqual(utils, newValue, value);
      shouldFireOnAccept = changeImportance === "accept" && !valueManager.areValuesEqual(utils, newValue, state.lastCommittedValue);
    }
    setState((prevState) => _extends({}, prevState, {
      // We reset the shallow value whenever we fire onChange.
      clockShallowValue: shouldFireOnChange ? void 0 : prevState.clockShallowValue,
      lastCommittedValue: shouldFireOnAccept ? value : prevState.lastCommittedValue,
      hasBeenModifiedSinceMount: true
    }));
    let cachedContext = null;
    const getContext = () => {
      if (!cachedContext) {
        cachedContext = {
          validationError: validationError == null ? getValidationErrorForNewValue(newValue) : validationError
        };
        if (shortcut) {
          cachedContext.shortcut = shortcut;
        }
      }
      return cachedContext;
    };
    if (shouldFireOnChange) {
      handleValueChange(newValue, getContext());
    }
    if (shouldFireOnAccept && onAccept) {
      onAccept(newValue, getContext());
    }
    if (shouldClose) {
      setOpen(false);
    }
  });
  if (value !== state.lastExternalValue) {
    setState((prevState) => _extends({}, prevState, {
      lastExternalValue: value,
      clockShallowValue: void 0,
      hasBeenModifiedSinceMount: true
    }));
  }
  const setValueFromView = useEventCallback_default((newValue, selectionState = "partial") => {
    if (selectionState === "shallow") {
      setState((prev) => _extends({}, prev, {
        clockShallowValue: newValue,
        hasBeenModifiedSinceMount: true
      }));
      return;
    }
    setValue(newValue, {
      changeImportance: selectionState === "finish" && closeOnSelect ? "accept" : "set"
    });
  });
  React22.useEffect(() => {
    if (isOpenControlled) {
      if (openProp === void 0) {
        throw new Error("You must not mix controlling and uncontrolled mode for `open` prop");
      }
      setState((prevState) => _extends({}, prevState, {
        open: openProp
      }));
    }
  }, [isOpenControlled, openProp]);
  const viewValue = React22.useMemo(() => valueManager.cleanValue(utils, state.clockShallowValue === void 0 ? value : state.clockShallowValue), [utils, valueManager, state.clockShallowValue, value]);
  return {
    timezone,
    state,
    setValue,
    setValueFromView,
    setOpen,
    value,
    viewValue
  };
}

// node_modules/@mui/x-date-pickers/esm/internals/hooks/usePicker/usePicker.js
var import_jsx_runtime6 = __toESM(require_jsx_runtime(), 1);
var _excluded6 = ["className", "sx"];
var usePicker = ({
  ref,
  props,
  valueManager,
  valueType,
  variant,
  validator,
  onPopperExited,
  autoFocusView,
  rendererInterceptor: RendererInterceptor,
  localeText,
  viewContainerRole,
  getStepNavigation
}) => {
  const {
    // View props
    views,
    view: viewProp,
    openTo,
    onViewChange,
    viewRenderers,
    reduceAnimations: reduceAnimationsProp,
    orientation: orientationProp,
    disableOpenPicker,
    closeOnSelect,
    // Form props
    disabled,
    readOnly,
    // Field props
    formatDensity,
    enableAccessibleFieldDOMStructure,
    selectedSections,
    onSelectedSectionsChange,
    format,
    label,
    // Other props
    autoFocus,
    name
  } = props;
  const {
    className,
    sx
  } = props, propsToForwardToView = _objectWithoutPropertiesLoose(props, _excluded6);
  const labelId = useId();
  const utils = useUtils();
  const adapter = useLocalizationContext();
  const reduceAnimations = useReduceAnimations(reduceAnimationsProp);
  const orientation = useOrientation(views, orientationProp);
  const {
    current: initialView
  } = React23.useRef(openTo ?? null);
  const [triggerElement, triggerRef] = React23.useState(null);
  const popupRef = React23.useRef(null);
  const fieldRef = React23.useRef(null);
  const rootRefObject = React23.useRef(null);
  const rootRef = useForkRef(ref, rootRefObject);
  const {
    timezone,
    state,
    setOpen,
    setValue,
    setValueFromView,
    value,
    viewValue
  } = useValueAndOpenStates({
    props,
    valueManager,
    validator
  });
  const {
    view,
    setView,
    defaultView,
    focusedView,
    setFocusedView,
    setValueAndGoToNextView,
    goToNextStep,
    hasNextStep,
    hasSeveralSteps
  } = useViews({
    view: viewProp,
    views,
    openTo,
    onChange: setValueFromView,
    onViewChange,
    autoFocus: autoFocusView,
    getStepNavigation
  });
  const clearValue = useEventCallback_default(() => setValue(valueManager.emptyValue));
  const setValueToToday = useEventCallback_default(() => setValue(valueManager.getTodayValue(utils, timezone, valueType)));
  const acceptValueChanges = useEventCallback_default(() => setValue(value));
  const cancelValueChanges = useEventCallback_default(() => setValue(state.lastCommittedValue, {
    skipPublicationIfPristine: true
  }));
  const dismissViews = useEventCallback_default(() => {
    setValue(value, {
      skipPublicationIfPristine: true
    });
  });
  const {
    hasUIView,
    viewModeLookup,
    timeViewsCount
  } = React23.useMemo(() => views.reduce((acc, viewForReduce) => {
    const viewMode = viewRenderers[viewForReduce] == null ? "field" : "UI";
    acc.viewModeLookup[viewForReduce] = viewMode;
    if (viewMode === "UI") {
      acc.hasUIView = true;
      if (isTimeView(viewForReduce)) {
        acc.timeViewsCount += 1;
      }
    }
    return acc;
  }, {
    hasUIView: false,
    viewModeLookup: {},
    timeViewsCount: 0
  }), [viewRenderers, views]);
  const currentViewMode = viewModeLookup[view];
  const getCurrentViewMode = useEventCallback_default(() => currentViewMode);
  const [popperView, setPopperView] = React23.useState(currentViewMode === "UI" ? view : null);
  if (popperView !== view && viewModeLookup[view] === "UI") {
    setPopperView(view);
  }
  useEnhancedEffect_default(() => {
    if (currentViewMode === "field" && state.open) {
      setOpen(false);
      setTimeout(() => {
        var _a, _b;
        (_a = fieldRef == null ? void 0 : fieldRef.current) == null ? void 0 : _a.setSelectedSections(view);
        (_b = fieldRef == null ? void 0 : fieldRef.current) == null ? void 0 : _b.focusField(view);
      });
    }
  }, [view]);
  useEnhancedEffect_default(() => {
    if (!state.open) {
      return;
    }
    let newView = view;
    if (currentViewMode === "field" && popperView != null) {
      newView = popperView;
    }
    if (newView !== defaultView && viewModeLookup[newView] === "UI" && viewModeLookup[defaultView] === "UI") {
      newView = defaultView;
    }
    if (newView !== view) {
      setView(newView);
    }
    setFocusedView(newView, true);
  }, [state.open]);
  const ownerState = React23.useMemo(() => ({
    isPickerValueEmpty: valueManager.areValuesEqual(utils, value, valueManager.emptyValue),
    isPickerOpen: state.open,
    isPickerDisabled: props.disabled ?? false,
    isPickerReadOnly: props.readOnly ?? false,
    pickerOrientation: orientation,
    pickerVariant: variant
  }), [utils, valueManager, value, state.open, orientation, variant, props.disabled, props.readOnly]);
  const triggerStatus = React23.useMemo(() => {
    if (disableOpenPicker || !hasUIView) {
      return "hidden";
    }
    if (disabled || readOnly) {
      return "disabled";
    }
    return "enabled";
  }, [disableOpenPicker, hasUIView, disabled, readOnly]);
  const wrappedGoToNextStep = useEventCallback_default(goToNextStep);
  const defaultActionBarActions = React23.useMemo(() => {
    if (closeOnSelect && !hasSeveralSteps) {
      return [];
    }
    return ["cancel", "nextOrAccept"];
  }, [closeOnSelect, hasSeveralSteps]);
  const actionsContextValue = React23.useMemo(() => ({
    setValue,
    setOpen,
    clearValue,
    setValueToToday,
    acceptValueChanges,
    cancelValueChanges,
    setView,
    goToNextStep: wrappedGoToNextStep
  }), [setValue, setOpen, clearValue, setValueToToday, acceptValueChanges, cancelValueChanges, setView, wrappedGoToNextStep]);
  const contextValue = React23.useMemo(() => _extends({}, actionsContextValue, {
    value,
    timezone,
    open: state.open,
    views,
    view: popperView,
    initialView,
    disabled: disabled ?? false,
    readOnly: readOnly ?? false,
    autoFocus: autoFocus ?? false,
    variant,
    orientation,
    popupRef,
    reduceAnimations,
    triggerRef,
    triggerStatus,
    hasNextStep,
    fieldFormat: format ?? "",
    name,
    label,
    rootSx: sx,
    rootRef,
    rootClassName: className
  }), [actionsContextValue, value, rootRef, variant, orientation, reduceAnimations, disabled, readOnly, format, className, name, label, sx, triggerStatus, hasNextStep, timezone, state.open, popperView, views, initialView, autoFocus]);
  const privateContextValue = React23.useMemo(() => ({
    dismissViews,
    ownerState,
    hasUIView,
    getCurrentViewMode,
    rootRefObject,
    labelId,
    triggerElement,
    viewContainerRole,
    defaultActionBarActions,
    onPopperExited
  }), [dismissViews, ownerState, hasUIView, getCurrentViewMode, labelId, triggerElement, viewContainerRole, defaultActionBarActions, onPopperExited]);
  const fieldPrivateContextValue = React23.useMemo(() => ({
    formatDensity,
    enableAccessibleFieldDOMStructure,
    selectedSections,
    onSelectedSectionsChange,
    fieldRef
  }), [formatDensity, enableAccessibleFieldDOMStructure, selectedSections, onSelectedSectionsChange, fieldRef]);
  const isValidContextValue = (testedValue) => {
    const error = validator({
      adapter,
      value: testedValue,
      timezone,
      props
    });
    return !valueManager.hasError(error);
  };
  const renderCurrentView = () => {
    if (popperView == null) {
      return null;
    }
    const renderer = viewRenderers[popperView];
    if (renderer == null) {
      return null;
    }
    const rendererProps = _extends({}, propsToForwardToView, {
      views,
      timezone,
      value: viewValue,
      onChange: setValueAndGoToNextView,
      view: popperView,
      onViewChange: setView,
      showViewSwitcher: timeViewsCount > 1,
      timeViewsCount
    }, viewContainerRole === "tooltip" ? {
      focusedView: null,
      onFocusedViewChange: () => {
      }
    } : {
      focusedView,
      onFocusedViewChange: setFocusedView
    });
    if (RendererInterceptor) {
      return (0, import_jsx_runtime6.jsx)(RendererInterceptor, {
        viewRenderers,
        popperView,
        rendererProps
      });
    }
    return renderer(rendererProps);
  };
  return {
    providerProps: {
      localeText,
      contextValue,
      privateContextValue,
      actionsContextValue,
      fieldPrivateContextValue,
      isValidContextValue
    },
    renderCurrentView,
    ownerState
  };
};

// node_modules/@mui/x-date-pickers/esm/PickersLayout/PickersLayout.js
var React27 = __toESM(require_react(), 1);
var import_prop_types5 = __toESM(require_prop_types(), 1);

// node_modules/@mui/x-date-pickers/esm/PickersLayout/pickersLayoutClasses.js
function getPickersLayoutUtilityClass(slot) {
  return generateUtilityClass("MuiPickersLayout", slot);
}
var pickersLayoutClasses = generateUtilityClasses("MuiPickersLayout", ["root", "landscape", "contentWrapper", "toolbar", "actionBar", "tabs", "shortcuts"]);

// node_modules/@mui/x-date-pickers/esm/PickersLayout/usePickerLayout.js
var React26 = __toESM(require_react(), 1);

// node_modules/@mui/x-date-pickers/esm/PickersActionBar/PickersActionBar.js
var React24 = __toESM(require_react(), 1);
var import_prop_types3 = __toESM(require_prop_types(), 1);
var import_jsx_runtime7 = __toESM(require_jsx_runtime(), 1);
var _excluded7 = ["actions"];
var PickersActionBarRoot = styled_default(DialogActions_default, {
  name: "MuiPickersLayout",
  slot: "ActionBar"
})({});
function PickersActionBarComponent(props) {
  const {
    actions
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded7);
  const translations = usePickerTranslations();
  const {
    clearValue,
    setValueToToday,
    acceptValueChanges,
    cancelValueChanges,
    goToNextStep,
    hasNextStep
  } = usePickerContext();
  if (actions == null || actions.length === 0) {
    return null;
  }
  const buttons = actions == null ? void 0 : actions.map((actionType) => {
    switch (actionType) {
      case "clear":
        return (0, import_jsx_runtime7.jsx)(Button_default, {
          onClick: clearValue,
          children: translations.clearButtonLabel
        }, actionType);
      case "cancel":
        return (0, import_jsx_runtime7.jsx)(Button_default, {
          onClick: cancelValueChanges,
          children: translations.cancelButtonLabel
        }, actionType);
      case "accept":
        return (0, import_jsx_runtime7.jsx)(Button_default, {
          onClick: acceptValueChanges,
          children: translations.okButtonLabel
        }, actionType);
      case "today":
        return (0, import_jsx_runtime7.jsx)(Button_default, {
          onClick: setValueToToday,
          children: translations.todayButtonLabel
        }, actionType);
      case "next":
        return (0, import_jsx_runtime7.jsx)(Button_default, {
          onClick: goToNextStep,
          children: translations.nextStepButtonLabel
        }, actionType);
      case "nextOrAccept":
        if (hasNextStep) {
          return (0, import_jsx_runtime7.jsx)(Button_default, {
            onClick: goToNextStep,
            children: translations.nextStepButtonLabel
          }, actionType);
        }
        return (0, import_jsx_runtime7.jsx)(Button_default, {
          onClick: acceptValueChanges,
          children: translations.okButtonLabel
        }, actionType);
      default:
        return null;
    }
  });
  return (0, import_jsx_runtime7.jsx)(PickersActionBarRoot, _extends({}, other, {
    children: buttons
  }));
}
true ? PickersActionBarComponent.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Ordered array of actions to display.
   * If empty, does not display that action bar.
   * @default
   * - `[]` for Desktop Date Picker and Desktop Date Range Picker
   * - `['cancel', 'accept']` for all other Pickers
   */
  actions: import_prop_types3.default.arrayOf(import_prop_types3.default.oneOf(["accept", "cancel", "clear", "next", "nextOrAccept", "today"]).isRequired),
  /**
   * If `true`, the actions do not have additional margin.
   * @default false
   */
  disableSpacing: import_prop_types3.default.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types3.default.oneOfType([import_prop_types3.default.arrayOf(import_prop_types3.default.oneOfType([import_prop_types3.default.func, import_prop_types3.default.object, import_prop_types3.default.bool])), import_prop_types3.default.func, import_prop_types3.default.object])
} : void 0;
var PickersActionBar = React24.memo(PickersActionBarComponent);

// node_modules/@mui/x-date-pickers/esm/PickersShortcuts/PickersShortcuts.js
var React25 = __toESM(require_react(), 1);
var import_prop_types4 = __toESM(require_prop_types(), 1);

// node_modules/@mui/x-date-pickers/esm/internals/constants/dimensions.js
var DAY_SIZE = 36;
var DAY_MARGIN = 2;
var DIALOG_WIDTH = 320;
var MAX_CALENDAR_HEIGHT = 280;
var VIEW_HEIGHT = 336;
var DIGITAL_CLOCK_VIEW_HEIGHT = 232;
var MULTI_SECTION_CLOCK_SECTION_WIDTH = 48;

// node_modules/@mui/x-date-pickers/esm/PickersShortcuts/PickersShortcuts.js
var import_jsx_runtime8 = __toESM(require_jsx_runtime(), 1);
var _excluded8 = ["items", "changeImportance"];
var _excluded22 = ["getValue"];
var PickersShortcutsRoot = styled_default(List_default, {
  name: "MuiPickersLayout",
  slot: "Shortcuts"
})({});
function PickersShortcuts(props) {
  const {
    items,
    changeImportance = "accept"
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded8);
  const {
    setValue
  } = usePickerActionsContext();
  const isValidValue = useIsValidValue();
  if (items == null || items.length === 0) {
    return null;
  }
  const resolvedItems = items.map((_ref) => {
    let {
      getValue
    } = _ref, item = _objectWithoutPropertiesLoose(_ref, _excluded22);
    const newValue = getValue({
      isValid: isValidValue
    });
    return _extends({}, item, {
      label: item.label,
      onClick: () => {
        setValue(newValue, {
          changeImportance,
          shortcut: item
        });
      },
      disabled: !isValidValue(newValue)
    });
  });
  return (0, import_jsx_runtime8.jsx)(PickersShortcutsRoot, _extends({
    dense: true,
    sx: [{
      maxHeight: VIEW_HEIGHT,
      maxWidth: 200,
      overflow: "auto"
    }, ...Array.isArray(other.sx) ? other.sx : [other.sx]]
  }, other, {
    children: resolvedItems.map((item) => {
      return (0, import_jsx_runtime8.jsx)(ListItem_default, {
        children: (0, import_jsx_runtime8.jsx)(Chip_default, _extends({}, item))
      }, item.id ?? item.label);
    })
  }));
}
true ? PickersShortcuts.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Importance of the change when picking a shortcut:
   * - "accept": fires `onChange`, fires `onAccept` and closes the Picker.
   * - "set": fires `onChange` but do not fire `onAccept` and does not close the Picker.
   * @default "accept"
   */
  changeImportance: import_prop_types4.default.oneOf(["accept", "set"]),
  className: import_prop_types4.default.string,
  component: import_prop_types4.default.elementType,
  /**
   * If `true`, compact vertical padding designed for keyboard and mouse input is used for
   * the list and list items.
   * The prop is available to descendant components as the `dense` context.
   * @default false
   */
  dense: import_prop_types4.default.bool,
  /**
   * If `true`, vertical padding is removed from the list.
   * @default false
   */
  disablePadding: import_prop_types4.default.bool,
  /**
   * Ordered array of shortcuts to display.
   * If empty, does not display the shortcuts.
   * @default []
   */
  items: import_prop_types4.default.arrayOf(import_prop_types4.default.shape({
    getValue: import_prop_types4.default.func.isRequired,
    id: import_prop_types4.default.string,
    label: import_prop_types4.default.string.isRequired
  })),
  style: import_prop_types4.default.object,
  /**
   * The content of the subheader, normally `ListSubheader`.
   */
  subheader: import_prop_types4.default.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types4.default.oneOfType([import_prop_types4.default.arrayOf(import_prop_types4.default.oneOfType([import_prop_types4.default.func, import_prop_types4.default.object, import_prop_types4.default.bool])), import_prop_types4.default.func, import_prop_types4.default.object])
} : void 0;

// node_modules/@mui/x-date-pickers/esm/PickersLayout/usePickerLayout.js
var import_jsx_runtime9 = __toESM(require_jsx_runtime(), 1);
var _excluded9 = ["ownerState"];
function toolbarHasView(toolbarProps) {
  return toolbarProps.view !== null;
}
var useUtilityClasses4 = (classes, ownerState) => {
  const {
    pickerOrientation
  } = ownerState;
  const slots = {
    root: ["root", pickerOrientation === "landscape" && "landscape"],
    contentWrapper: ["contentWrapper"],
    toolbar: ["toolbar"],
    actionBar: ["actionBar"],
    tabs: ["tabs"],
    landscape: ["landscape"],
    shortcuts: ["shortcuts"]
  };
  return composeClasses(slots, getPickersLayoutUtilityClass, classes);
};
var usePickerLayout = (props) => {
  const {
    ownerState: pickerOwnerState,
    defaultActionBarActions
  } = usePickerPrivateContext();
  const {
    view
  } = usePickerContext();
  const isRtl = useRtl();
  const {
    children,
    slots,
    slotProps,
    classes: classesProp
  } = props;
  const ownerState = React26.useMemo(() => _extends({}, pickerOwnerState, {
    layoutDirection: isRtl ? "rtl" : "ltr"
  }), [pickerOwnerState, isRtl]);
  const classes = useUtilityClasses4(classesProp, ownerState);
  const ActionBar = (slots == null ? void 0 : slots.actionBar) ?? PickersActionBar;
  const _useSlotProps = useSlotProps_default({
    elementType: ActionBar,
    externalSlotProps: slotProps == null ? void 0 : slotProps.actionBar,
    additionalProps: {
      actions: defaultActionBarActions
    },
    className: classes.actionBar,
    ownerState
  }), actionBarProps = _objectWithoutPropertiesLoose(_useSlotProps, _excluded9);
  const actionBar = (0, import_jsx_runtime9.jsx)(ActionBar, _extends({}, actionBarProps));
  const Toolbar = slots == null ? void 0 : slots.toolbar;
  const toolbarProps = useSlotProps_default({
    elementType: Toolbar,
    externalSlotProps: slotProps == null ? void 0 : slotProps.toolbar,
    className: classes.toolbar,
    ownerState
  });
  const toolbar = toolbarHasView(toolbarProps) && !!Toolbar ? (0, import_jsx_runtime9.jsx)(Toolbar, _extends({}, toolbarProps)) : null;
  const content = children;
  const Tabs = slots == null ? void 0 : slots.tabs;
  const tabs = view && Tabs ? (0, import_jsx_runtime9.jsx)(Tabs, _extends({
    className: classes.tabs
  }, slotProps == null ? void 0 : slotProps.tabs)) : null;
  const Shortcuts = (slots == null ? void 0 : slots.shortcuts) ?? PickersShortcuts;
  const shortcutsProps = useSlotProps_default({
    elementType: Shortcuts,
    externalSlotProps: slotProps == null ? void 0 : slotProps.shortcuts,
    className: classes.shortcuts,
    ownerState
  });
  const shortcuts = view && !!Shortcuts ? (0, import_jsx_runtime9.jsx)(Shortcuts, _extends({}, shortcutsProps)) : null;
  return {
    toolbar,
    content,
    tabs,
    actionBar,
    shortcuts,
    ownerState
  };
};
var usePickerLayout_default = usePickerLayout;

// node_modules/@mui/x-date-pickers/esm/PickersLayout/PickersLayout.js
var import_jsx_runtime10 = __toESM(require_jsx_runtime(), 1);
var useUtilityClasses5 = (classes, ownerState) => {
  const {
    pickerOrientation
  } = ownerState;
  const slots = {
    root: ["root", pickerOrientation === "landscape" && "landscape"],
    contentWrapper: ["contentWrapper"]
  };
  return composeClasses(slots, getPickersLayoutUtilityClass, classes);
};
var PickersLayoutRoot = styled_default("div", {
  name: "MuiPickersLayout",
  slot: "Root"
})({
  display: "grid",
  gridAutoColumns: "max-content auto max-content",
  gridAutoRows: "max-content auto max-content",
  [`& .${pickersLayoutClasses.actionBar}`]: {
    gridColumn: "1 / 4",
    gridRow: 3
  },
  variants: [{
    props: {
      pickerOrientation: "landscape"
    },
    style: {
      [`& .${pickersLayoutClasses.toolbar}`]: {
        gridColumn: 1,
        gridRow: "2 / 3"
      },
      [`.${pickersLayoutClasses.shortcuts}`]: {
        gridColumn: "2 / 4",
        gridRow: 1
      }
    }
  }, {
    props: {
      pickerOrientation: "landscape",
      layoutDirection: "rtl"
    },
    style: {
      [`& .${pickersLayoutClasses.toolbar}`]: {
        gridColumn: 3
      }
    }
  }, {
    props: {
      pickerOrientation: "portrait"
    },
    style: {
      [`& .${pickersLayoutClasses.toolbar}`]: {
        gridColumn: "2 / 4",
        gridRow: 1
      },
      [`& .${pickersLayoutClasses.shortcuts}`]: {
        gridColumn: 1,
        gridRow: "2 / 3"
      }
    }
  }, {
    props: {
      pickerOrientation: "portrait",
      layoutDirection: "rtl"
    },
    style: {
      [`& .${pickersLayoutClasses.shortcuts}`]: {
        gridColumn: 3
      }
    }
  }]
});
var PickersLayoutContentWrapper = styled_default("div", {
  name: "MuiPickersLayout",
  slot: "ContentWrapper"
})({
  gridColumn: "2 / 4",
  gridRow: 2,
  display: "flex",
  flexDirection: "column"
});
var PickersLayout = React27.forwardRef(function PickersLayout2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiPickersLayout"
  });
  const {
    toolbar,
    content,
    tabs,
    actionBar,
    shortcuts,
    ownerState
  } = usePickerLayout_default(props);
  const {
    orientation,
    variant
  } = usePickerContext();
  const {
    sx,
    className,
    classes: classesProp
  } = props;
  const classes = useUtilityClasses5(classesProp, ownerState);
  return (0, import_jsx_runtime10.jsxs)(PickersLayoutRoot, {
    ref,
    sx,
    className: clsx_default(classes.root, className),
    ownerState,
    children: [orientation === "landscape" ? shortcuts : toolbar, orientation === "landscape" ? toolbar : shortcuts, (0, import_jsx_runtime10.jsx)(PickersLayoutContentWrapper, {
      className: classes.contentWrapper,
      ownerState,
      children: variant === "desktop" ? (0, import_jsx_runtime10.jsxs)(React27.Fragment, {
        children: [content, tabs]
      }) : (0, import_jsx_runtime10.jsxs)(React27.Fragment, {
        children: [tabs, content]
      })
    }), actionBar]
  });
});
true ? PickersLayout.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  children: import_prop_types5.default.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types5.default.object,
  className: import_prop_types5.default.string,
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps: import_prop_types5.default.object,
  /**
   * Overridable component slots.
   * @default {}
   */
  slots: import_prop_types5.default.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types5.default.oneOfType([import_prop_types5.default.arrayOf(import_prop_types5.default.oneOfType([import_prop_types5.default.func, import_prop_types5.default.object, import_prop_types5.default.bool])), import_prop_types5.default.func, import_prop_types5.default.object])
} : void 0;

// node_modules/@mui/x-date-pickers/esm/internals/components/PickerFieldUI.js
var React38 = __toESM(require_react(), 1);

// node_modules/@mui/x-date-pickers/esm/internals/hooks/useFieldOwnerState.js
var React28 = __toESM(require_react(), 1);
function useFieldOwnerState(parameters) {
  const {
    ownerState: pickerOwnerState
  } = usePickerPrivateContext();
  const isRtl = useRtl();
  return React28.useMemo(() => _extends({}, pickerOwnerState, {
    isFieldDisabled: parameters.disabled ?? false,
    isFieldReadOnly: parameters.readOnly ?? false,
    isFieldRequired: parameters.required ?? false,
    fieldDirection: isRtl ? "rtl" : "ltr"
  }), [pickerOwnerState, parameters.disabled, parameters.readOnly, parameters.required, isRtl]);
}

// node_modules/@mui/x-date-pickers/esm/icons/index.js
var React29 = __toESM(require_react(), 1);
var import_jsx_runtime11 = __toESM(require_jsx_runtime(), 1);
var ArrowDropDownIcon = createSvgIcon((0, import_jsx_runtime11.jsx)("path", {
  d: "M7 10l5 5 5-5z"
}), "ArrowDropDown");
var ArrowLeftIcon = createSvgIcon((0, import_jsx_runtime11.jsx)("path", {
  d: "M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"
}), "ArrowLeft");
var ArrowRightIcon = createSvgIcon((0, import_jsx_runtime11.jsx)("path", {
  d: "M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"
}), "ArrowRight");
var CalendarIcon = createSvgIcon((0, import_jsx_runtime11.jsx)("path", {
  d: "M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"
}), "Calendar");
var ClockIcon = createSvgIcon((0, import_jsx_runtime11.jsxs)(React29.Fragment, {
  children: [(0, import_jsx_runtime11.jsx)("path", {
    d: "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
  }), (0, import_jsx_runtime11.jsx)("path", {
    d: "M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"
  })]
}), "Clock");
var DateRangeIcon = createSvgIcon((0, import_jsx_runtime11.jsx)("path", {
  d: "M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"
}), "DateRange");
var TimeIcon = createSvgIcon((0, import_jsx_runtime11.jsxs)(React29.Fragment, {
  children: [(0, import_jsx_runtime11.jsx)("path", {
    d: "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
  }), (0, import_jsx_runtime11.jsx)("path", {
    d: "M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"
  })]
}), "Time");
var ClearIcon = createSvgIcon((0, import_jsx_runtime11.jsx)("path", {
  d: "M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
}), "Clear");

// node_modules/@mui/x-date-pickers/esm/PickersTextField/PickersTextField.js
var React37 = __toESM(require_react(), 1);
var import_prop_types11 = __toESM(require_prop_types(), 1);

// node_modules/@mui/x-date-pickers/esm/PickersTextField/pickersTextFieldClasses.js
function getPickersTextFieldUtilityClass(slot) {
  return generateUtilityClass("MuiPickersTextField", slot);
}
var pickersTextFieldClasses = generateUtilityClasses("MuiPickersTextField", ["root", "focused", "disabled", "error", "required"]);

// node_modules/@mui/x-date-pickers/esm/PickersTextField/PickersOutlinedInput/PickersOutlinedInput.js
var React34 = __toESM(require_react(), 1);
var import_prop_types8 = __toESM(require_prop_types(), 1);

// node_modules/@mui/x-date-pickers/esm/PickersTextField/PickersInputBase/PickersInputBase.js
var React32 = __toESM(require_react(), 1);
var import_prop_types7 = __toESM(require_prop_types(), 1);

// node_modules/@mui/x-date-pickers/esm/PickersTextField/PickersInputBase/pickersInputBaseClasses.js
function getPickersInputBaseUtilityClass(slot) {
  return generateUtilityClass("MuiPickersInputBase", slot);
}
var pickersInputBaseClasses = generateUtilityClasses("MuiPickersInputBase", ["root", "focused", "disabled", "error", "notchedOutline", "sectionContent", "sectionBefore", "sectionAfter", "adornedStart", "adornedEnd", "input", "activeBar"]);

// node_modules/@mui/x-date-pickers/esm/PickersSectionList/PickersSectionList.js
var React30 = __toESM(require_react(), 1);
var import_prop_types6 = __toESM(require_prop_types(), 1);

// node_modules/@mui/x-date-pickers/esm/PickersSectionList/pickersSectionListClasses.js
function getPickersSectionListUtilityClass(slot) {
  return generateUtilityClass("MuiPickersSectionList", slot);
}
var pickersSectionListClasses = generateUtilityClasses("MuiPickersSectionList", ["root", "section", "sectionContent"]);

// node_modules/@mui/x-date-pickers/esm/PickersSectionList/PickersSectionList.js
var import_jsx_runtime12 = __toESM(require_jsx_runtime(), 1);
var _excluded10 = ["slots", "slotProps", "elements", "sectionListRef", "classes"];
var PickersSectionListRoot = styled_default("div", {
  name: "MuiPickersSectionList",
  slot: "Root"
})({
  direction: "ltr /*! @noflip */",
  outline: "none"
});
var PickersSectionListSection = styled_default("span", {
  name: "MuiPickersSectionList",
  slot: "Section"
})({});
var PickersSectionListSectionSeparator = styled_default("span", {
  name: "MuiPickersSectionList",
  slot: "SectionSeparator"
})({
  whiteSpace: "pre"
});
var PickersSectionListSectionContent = styled_default("span", {
  name: "MuiPickersSectionList",
  slot: "SectionContent"
})({
  outline: "none"
});
var useUtilityClasses6 = (classes) => {
  const slots = {
    root: ["root"],
    section: ["section"],
    sectionContent: ["sectionContent"]
  };
  return composeClasses(slots, getPickersSectionListUtilityClass, classes);
};
function PickersSection(props) {
  const {
    slots,
    slotProps,
    element,
    classes
  } = props;
  const {
    ownerState
  } = usePickerPrivateContext();
  const Section = (slots == null ? void 0 : slots.section) ?? PickersSectionListSection;
  const sectionProps = useSlotProps_default({
    elementType: Section,
    externalSlotProps: slotProps == null ? void 0 : slotProps.section,
    externalForwardedProps: element.container,
    className: classes.section,
    ownerState
  });
  const SectionContent = (slots == null ? void 0 : slots.sectionContent) ?? PickersSectionListSectionContent;
  const sectionContentProps = useSlotProps_default({
    elementType: SectionContent,
    externalSlotProps: slotProps == null ? void 0 : slotProps.sectionContent,
    externalForwardedProps: element.content,
    additionalProps: {
      suppressContentEditableWarning: true
    },
    className: classes.sectionContent,
    ownerState
  });
  const SectionSeparator = (slots == null ? void 0 : slots.sectionSeparator) ?? PickersSectionListSectionSeparator;
  const sectionSeparatorBeforeProps = useSlotProps_default({
    elementType: SectionSeparator,
    externalSlotProps: slotProps == null ? void 0 : slotProps.sectionSeparator,
    externalForwardedProps: element.before,
    ownerState: _extends({}, ownerState, {
      separatorPosition: "before"
    })
  });
  const sectionSeparatorAfterProps = useSlotProps_default({
    elementType: SectionSeparator,
    externalSlotProps: slotProps == null ? void 0 : slotProps.sectionSeparator,
    externalForwardedProps: element.after,
    ownerState: _extends({}, ownerState, {
      separatorPosition: "after"
    })
  });
  return (0, import_jsx_runtime12.jsxs)(Section, _extends({}, sectionProps, {
    children: [(0, import_jsx_runtime12.jsx)(SectionSeparator, _extends({}, sectionSeparatorBeforeProps)), (0, import_jsx_runtime12.jsx)(SectionContent, _extends({}, sectionContentProps)), (0, import_jsx_runtime12.jsx)(SectionSeparator, _extends({}, sectionSeparatorAfterProps))]
  }));
}
true ? PickersSection.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  classes: import_prop_types6.default.object.isRequired,
  element: import_prop_types6.default.shape({
    after: import_prop_types6.default.object.isRequired,
    before: import_prop_types6.default.object.isRequired,
    container: import_prop_types6.default.object.isRequired,
    content: import_prop_types6.default.object.isRequired
  }).isRequired,
  /**
   * The props used for each component slot.
   */
  slotProps: import_prop_types6.default.object,
  /**
   * Overridable component slots.
   */
  slots: import_prop_types6.default.object
} : void 0;
var PickersSectionList = React30.forwardRef(function PickersSectionList2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiPickersSectionList"
  });
  const {
    slots,
    slotProps,
    elements,
    sectionListRef,
    classes: classesProp
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded10);
  const classes = useUtilityClasses6(classesProp);
  const {
    ownerState
  } = usePickerPrivateContext();
  const rootRef = React30.useRef(null);
  const handleRootRef = useForkRef(ref, rootRef);
  const getRoot = (methodName) => {
    if (!rootRef.current) {
      throw new Error(`MUI X: Cannot call sectionListRef.${methodName} before the mount of the component.`);
    }
    return rootRef.current;
  };
  React30.useImperativeHandle(sectionListRef, () => ({
    getRoot() {
      return getRoot("getRoot");
    },
    getSectionContainer(index) {
      const root = getRoot("getSectionContainer");
      return root.querySelector(`.${pickersSectionListClasses.section}[data-sectionindex="${index}"]`);
    },
    getSectionContent(index) {
      const root = getRoot("getSectionContent");
      return root.querySelector(`.${pickersSectionListClasses.section}[data-sectionindex="${index}"] .${pickersSectionListClasses.sectionContent}`);
    },
    getSectionIndexFromDOMElement(element) {
      const root = getRoot("getSectionIndexFromDOMElement");
      if (element == null || !root.contains(element)) {
        return null;
      }
      let sectionContainer = null;
      if (element.classList.contains(pickersSectionListClasses.section)) {
        sectionContainer = element;
      } else if (element.classList.contains(pickersSectionListClasses.sectionContent)) {
        sectionContainer = element.parentElement;
      }
      if (sectionContainer == null) {
        return null;
      }
      return Number(sectionContainer.dataset.sectionindex);
    }
  }));
  const Root = (slots == null ? void 0 : slots.root) ?? PickersSectionListRoot;
  const rootProps = useSlotProps_default({
    elementType: Root,
    externalSlotProps: slotProps == null ? void 0 : slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      ref: handleRootRef,
      suppressContentEditableWarning: true
    },
    className: classes.root,
    ownerState
  });
  return (0, import_jsx_runtime12.jsx)(Root, _extends({}, rootProps, {
    children: rootProps.contentEditable ? elements.map(({
      content,
      before,
      after
    }) => `${before.children}${content.children}${after.children}`).join("") : (0, import_jsx_runtime12.jsx)(React30.Fragment, {
      children: elements.map((element, elementIndex) => (0, import_jsx_runtime12.jsx)(PickersSection, {
        slots,
        slotProps,
        element,
        classes
      }, elementIndex))
    })
  }));
});
true ? PickersSectionList.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types6.default.object,
  /**
   * If true, the whole element is editable.
   * Useful when all the sections are selected.
   */
  contentEditable: import_prop_types6.default.bool.isRequired,
  /**
   * The elements to render.
   * Each element contains the prop to edit a section of the value.
   */
  elements: import_prop_types6.default.arrayOf(import_prop_types6.default.shape({
    after: import_prop_types6.default.object.isRequired,
    before: import_prop_types6.default.object.isRequired,
    container: import_prop_types6.default.object.isRequired,
    content: import_prop_types6.default.object.isRequired
  })).isRequired,
  sectionListRef: import_prop_types6.default.oneOfType([import_prop_types6.default.func, import_prop_types6.default.shape({
    current: import_prop_types6.default.shape({
      getRoot: import_prop_types6.default.func.isRequired,
      getSectionContainer: import_prop_types6.default.func.isRequired,
      getSectionContent: import_prop_types6.default.func.isRequired,
      getSectionIndexFromDOMElement: import_prop_types6.default.func.isRequired
    })
  })]),
  /**
   * The props used for each component slot.
   */
  slotProps: import_prop_types6.default.object,
  /**
   * Overridable component slots.
   */
  slots: import_prop_types6.default.object
} : void 0;

// node_modules/@mui/x-date-pickers/esm/PickersTextField/usePickerTextFieldOwnerState.js
var React31 = __toESM(require_react(), 1);
var PickerTextFieldOwnerStateContext = React31.createContext(null);
var usePickerTextFieldOwnerState = () => {
  const value = React31.useContext(PickerTextFieldOwnerStateContext);
  if (value == null) {
    throw new Error(["MUI X: The `usePickerTextFieldOwnerState` can only be called in components that are used inside a PickerTextField component"].join("\n"));
  }
  return value;
};

// node_modules/@mui/x-date-pickers/esm/PickersTextField/PickersInputBase/PickersInputBase.js
var import_jsx_runtime13 = __toESM(require_jsx_runtime(), 1);
var _excluded11 = ["elements", "areAllSectionsEmpty", "defaultValue", "label", "value", "onChange", "id", "autoFocus", "endAdornment", "startAdornment", "renderSuffix", "slots", "slotProps", "contentEditable", "tabIndex", "onInput", "onPaste", "onKeyDown", "fullWidth", "name", "readOnly", "inputProps", "inputRef", "sectionListRef", "onFocus", "onBlur", "classes", "ownerState"];
var round = (value) => Math.round(value * 1e5) / 1e5;
var PickersInputBaseRoot = styled_default("div", {
  name: "MuiPickersInputBase",
  slot: "Root"
})(({
  theme
}) => _extends({}, theme.typography.body1, {
  color: (theme.vars || theme).palette.text.primary,
  cursor: "text",
  padding: 0,
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  position: "relative",
  boxSizing: "border-box",
  // Prevent padding issue with fullWidth.
  letterSpacing: `${round(0.15 / 16)}em`,
  variants: [{
    props: {
      isInputInFullWidth: true
    },
    style: {
      width: "100%"
    }
  }]
}));
var PickersInputBaseSectionsContainer = styled_default(PickersSectionListRoot, {
  name: "MuiPickersInputBase",
  slot: "SectionsContainer"
})(({
  theme
}) => ({
  padding: "4px 0 5px",
  fontFamily: theme.typography.fontFamily,
  fontSize: "inherit",
  lineHeight: "1.4375em",
  // 23px
  flexGrow: 1,
  outline: "none",
  display: "flex",
  flexWrap: "nowrap",
  overflow: "hidden",
  letterSpacing: "inherit",
  // Baseline behavior
  width: "182px",
  variants: [{
    props: {
      fieldDirection: "rtl"
    },
    style: {
      textAlign: "right /*! @noflip */"
    }
  }, {
    props: {
      inputSize: "small"
    },
    style: {
      paddingTop: 1
    }
  }, {
    props: {
      hasStartAdornment: false,
      isFieldFocused: false,
      isFieldValueEmpty: true
    },
    style: {
      color: "currentColor",
      opacity: 0
    }
  }, {
    props: {
      hasStartAdornment: false,
      isFieldFocused: false,
      isFieldValueEmpty: true,
      inputHasLabel: false
    },
    style: theme.vars ? {
      opacity: theme.vars.opacity.inputPlaceholder
    } : {
      opacity: theme.palette.mode === "light" ? 0.42 : 0.5
    }
  }]
}));
var PickersInputBaseSection = styled_default(PickersSectionListSection, {
  name: "MuiPickersInputBase",
  slot: "Section"
})(({
  theme
}) => ({
  fontFamily: theme.typography.fontFamily,
  fontSize: "inherit",
  letterSpacing: "inherit",
  lineHeight: "1.4375em",
  // 23px
  display: "inline-block",
  whiteSpace: "nowrap"
}));
var PickersInputBaseSectionContent = styled_default(PickersSectionListSectionContent, {
  name: "MuiPickersInputBase",
  slot: "SectionContent",
  overridesResolver: (props, styles) => styles.content
  // FIXME: Inconsistent naming with slot
})(({
  theme
}) => ({
  fontFamily: theme.typography.fontFamily,
  lineHeight: "1.4375em",
  // 23px
  letterSpacing: "inherit",
  width: "fit-content",
  outline: "none"
}));
var PickersInputBaseSectionSeparator = styled_default(PickersSectionListSectionSeparator, {
  name: "MuiPickersInputBase",
  slot: "Separator"
})(() => ({
  whiteSpace: "pre",
  letterSpacing: "inherit"
}));
var PickersInputBaseInput = styled_default("input", {
  name: "MuiPickersInputBase",
  slot: "Input",
  overridesResolver: (props, styles) => styles.hiddenInput
  // FIXME: Inconsistent naming with slot
})(_extends({}, visuallyHidden_default));
var PickersInputBaseActiveBar = styled_default("div", {
  name: "MuiPickersInputBase",
  slot: "ActiveBar"
})(({
  theme,
  ownerState
}) => ({
  display: "none",
  position: "absolute",
  height: 2,
  bottom: 2,
  borderTopLeftRadius: 2,
  borderTopRightRadius: 2,
  transition: theme.transitions.create(["width", "left"], {
    duration: theme.transitions.duration.shortest
  }),
  backgroundColor: (theme.vars || theme).palette.primary.main,
  '[data-active-range-position="start"] &, [data-active-range-position="end"] &': {
    display: "block"
  },
  '[data-active-range-position="start"] &': {
    left: ownerState.sectionOffsets[0]
  },
  '[data-active-range-position="end"] &': {
    left: ownerState.sectionOffsets[1]
  }
}));
var useUtilityClasses7 = (classes, ownerState) => {
  const {
    isFieldFocused: isFieldFocused3,
    isFieldDisabled,
    isFieldReadOnly,
    hasFieldError,
    inputSize,
    isInputInFullWidth,
    inputColor,
    hasStartAdornment,
    hasEndAdornment
  } = ownerState;
  const slots = {
    root: ["root", isFieldFocused3 && !isFieldDisabled && "focused", isFieldDisabled && "disabled", isFieldReadOnly && "readOnly", hasFieldError && "error", isInputInFullWidth && "fullWidth", `color${capitalize(inputColor)}`, inputSize === "small" && "inputSizeSmall", hasStartAdornment && "adornedStart", hasEndAdornment && "adornedEnd"],
    notchedOutline: ["notchedOutline"],
    input: ["input"],
    sectionsContainer: ["sectionsContainer"],
    sectionContent: ["sectionContent"],
    sectionBefore: ["sectionBefore"],
    sectionAfter: ["sectionAfter"],
    activeBar: ["activeBar"]
  };
  return composeClasses(slots, getPickersInputBaseUtilityClass, classes);
};
function resolveSectionElementWidth(sectionElement, rootRef, index, dateRangePosition) {
  var _a;
  if (sectionElement.content.id) {
    const activeSectionElements = (_a = rootRef.current) == null ? void 0 : _a.querySelectorAll(`[data-sectionindex="${index}"] [data-range-position="${dateRangePosition}"]`);
    if (activeSectionElements) {
      return Array.from(activeSectionElements).reduce((currentActiveBarWidth, element) => {
        return currentActiveBarWidth + element.offsetWidth;
      }, 0);
    }
  }
  return 0;
}
function resolveSectionWidthAndOffsets(elements, rootRef) {
  var _a, _b, _c, _d, _e;
  let activeBarWidth = 0;
  const activeRangePosition = (_a = rootRef.current) == null ? void 0 : _a.getAttribute("data-active-range-position");
  if (activeRangePosition === "end") {
    for (let i = elements.length - 1; i >= elements.length / 2; i -= 1) {
      activeBarWidth += resolveSectionElementWidth(elements[i], rootRef, i, "end");
    }
  } else {
    for (let i = 0; i < elements.length / 2; i += 1) {
      activeBarWidth += resolveSectionElementWidth(elements[i], rootRef, i, "start");
    }
  }
  return {
    activeBarWidth,
    sectionOffsets: [((_c = (_b = rootRef.current) == null ? void 0 : _b.querySelector(`[data-sectionindex="0"]`)) == null ? void 0 : _c.offsetLeft) || 0, ((_e = (_d = rootRef.current) == null ? void 0 : _d.querySelector(`[data-sectionindex="${elements.length / 2}"]`)) == null ? void 0 : _e.offsetLeft) || 0]
  };
}
var PickersInputBase = React32.forwardRef(function PickersInputBase2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiPickersInputBase"
  });
  const {
    elements,
    areAllSectionsEmpty,
    value,
    onChange,
    id,
    endAdornment,
    startAdornment,
    renderSuffix,
    slots,
    slotProps,
    contentEditable,
    tabIndex,
    onInput,
    onPaste,
    onKeyDown,
    name,
    readOnly,
    inputProps,
    inputRef,
    sectionListRef,
    onFocus,
    onBlur,
    classes: classesProp,
    ownerState: ownerStateProp
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded11);
  const ownerStateContext = usePickerTextFieldOwnerState();
  const rootRef = React32.useRef(null);
  const activeBarRef = React32.useRef(null);
  const sectionOffsetsRef = React32.useRef([]);
  const handleRootRef = useForkRef(ref, rootRef);
  const handleInputRef = useForkRef(inputProps == null ? void 0 : inputProps.ref, inputRef);
  const muiFormControl = useFormControl();
  if (!muiFormControl) {
    throw new Error("MUI X: PickersInputBase should always be used inside a PickersTextField component");
  }
  const ownerState = ownerStateProp ?? ownerStateContext;
  const handleInputFocus = (event) => {
    var _a;
    (_a = muiFormControl.onFocus) == null ? void 0 : _a.call(muiFormControl, event);
    onFocus == null ? void 0 : onFocus(event);
  };
  const handleHiddenInputFocus = (event) => {
    handleInputFocus(event);
  };
  const handleKeyDown = (event) => {
    var _a, _b;
    onKeyDown == null ? void 0 : onKeyDown(event);
    if (event.key === "Enter" && !event.defaultMuiPrevented) {
      if ((_a = rootRef.current) == null ? void 0 : _a.dataset.multiInput) {
        return;
      }
      const closestForm = (_b = rootRef.current) == null ? void 0 : _b.closest("form");
      const submitTrigger = closestForm == null ? void 0 : closestForm.querySelector('[type="submit"]');
      if (!closestForm || !submitTrigger) {
        return;
      }
      event.preventDefault();
      closestForm.requestSubmit(submitTrigger);
    }
  };
  const handleInputBlur = (event) => {
    var _a;
    (_a = muiFormControl.onBlur) == null ? void 0 : _a.call(muiFormControl, event);
    onBlur == null ? void 0 : onBlur(event);
  };
  React32.useEffect(() => {
    if (muiFormControl) {
      muiFormControl.setAdornedStart(Boolean(startAdornment));
    }
  }, [muiFormControl, startAdornment]);
  React32.useEffect(() => {
    if (!muiFormControl) {
      return;
    }
    if (areAllSectionsEmpty) {
      muiFormControl.onEmpty();
    } else {
      muiFormControl.onFilled();
    }
  }, [muiFormControl, areAllSectionsEmpty]);
  const classes = useUtilityClasses7(classesProp, ownerState);
  const InputRoot = (slots == null ? void 0 : slots.root) || PickersInputBaseRoot;
  const inputRootProps = useSlotProps_default({
    elementType: InputRoot,
    externalSlotProps: slotProps == null ? void 0 : slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      "aria-invalid": muiFormControl.error,
      ref: handleRootRef
    },
    className: classes.root,
    ownerState
  });
  const InputSectionsContainer = (slots == null ? void 0 : slots.input) || PickersInputBaseSectionsContainer;
  const isSingleInputRange = elements.some((element) => element.content["data-range-position"] !== void 0);
  React32.useEffect(() => {
    if (!isSingleInputRange || !ownerState.isPickerOpen) {
      return;
    }
    const {
      activeBarWidth,
      sectionOffsets
    } = resolveSectionWidthAndOffsets(elements, rootRef);
    sectionOffsetsRef.current = [sectionOffsets[0], sectionOffsets[1]];
    if (activeBarRef.current) {
      activeBarRef.current.style.width = `${activeBarWidth}px`;
    }
  }, [elements, isSingleInputRange, ownerState.isPickerOpen]);
  return (0, import_jsx_runtime13.jsxs)(InputRoot, _extends({}, inputRootProps, {
    children: [startAdornment, (0, import_jsx_runtime13.jsx)(PickersSectionList, {
      sectionListRef,
      elements,
      contentEditable,
      tabIndex,
      className: classes.sectionsContainer,
      onFocus: handleInputFocus,
      onBlur: handleInputBlur,
      onInput,
      onPaste,
      onKeyDown: handleKeyDown,
      slots: {
        root: InputSectionsContainer,
        section: PickersInputBaseSection,
        sectionContent: PickersInputBaseSectionContent,
        sectionSeparator: PickersInputBaseSectionSeparator
      },
      slotProps: {
        root: _extends({}, slotProps == null ? void 0 : slotProps.input, {
          ownerState
        }),
        sectionContent: {
          className: pickersInputBaseClasses.sectionContent
        },
        sectionSeparator: ({
          separatorPosition
        }) => ({
          className: separatorPosition === "before" ? pickersInputBaseClasses.sectionBefore : pickersInputBaseClasses.sectionAfter
        })
      }
    }), endAdornment, renderSuffix ? renderSuffix(_extends({}, muiFormControl)) : null, (0, import_jsx_runtime13.jsx)(PickersInputBaseInput, _extends({
      name,
      className: classes.input,
      value,
      onChange,
      id,
      "aria-hidden": "true",
      tabIndex: -1,
      readOnly,
      required: muiFormControl.required,
      disabled: muiFormControl.disabled,
      onFocus: handleHiddenInputFocus
    }, inputProps, {
      ref: handleInputRef
    })), isSingleInputRange && (0, import_jsx_runtime13.jsx)(PickersInputBaseActiveBar, {
      className: classes.activeBar,
      ref: activeBarRef,
      ownerState: {
        sectionOffsets: sectionOffsetsRef.current
      }
    })]
  }));
});
true ? PickersInputBase.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Is `true` if the current values equals the empty value.
   * For a single item value, it means that `value === null`
   * For a range value, it means that `value === [null, null]`
   */
  areAllSectionsEmpty: import_prop_types7.default.bool.isRequired,
  className: import_prop_types7.default.string,
  component: import_prop_types7.default.elementType,
  /**
   * If true, the whole element is editable.
   * Useful when all the sections are selected.
   */
  contentEditable: import_prop_types7.default.bool.isRequired,
  "data-multi-input": import_prop_types7.default.string,
  /**
   * The elements to render.
   * Each element contains the prop to edit a section of the value.
   */
  elements: import_prop_types7.default.arrayOf(import_prop_types7.default.shape({
    after: import_prop_types7.default.object.isRequired,
    before: import_prop_types7.default.object.isRequired,
    container: import_prop_types7.default.object.isRequired,
    content: import_prop_types7.default.object.isRequired
  })).isRequired,
  endAdornment: import_prop_types7.default.node,
  fullWidth: import_prop_types7.default.bool,
  id: import_prop_types7.default.string,
  inputProps: import_prop_types7.default.object,
  inputRef: refType_default,
  label: import_prop_types7.default.node,
  margin: import_prop_types7.default.oneOf(["dense", "none", "normal"]),
  name: import_prop_types7.default.string,
  onChange: import_prop_types7.default.func.isRequired,
  onClick: import_prop_types7.default.func.isRequired,
  onInput: import_prop_types7.default.func.isRequired,
  onKeyDown: import_prop_types7.default.func.isRequired,
  onPaste: import_prop_types7.default.func.isRequired,
  ownerState: import_prop_types7.default.any,
  readOnly: import_prop_types7.default.bool,
  renderSuffix: import_prop_types7.default.func,
  sectionListRef: import_prop_types7.default.oneOfType([import_prop_types7.default.func, import_prop_types7.default.shape({
    current: import_prop_types7.default.shape({
      getRoot: import_prop_types7.default.func.isRequired,
      getSectionContainer: import_prop_types7.default.func.isRequired,
      getSectionContent: import_prop_types7.default.func.isRequired,
      getSectionIndexFromDOMElement: import_prop_types7.default.func.isRequired
    })
  })]),
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps: import_prop_types7.default.object,
  /**
   * The components used for each slot inside.
   *
   * @default {}
   */
  slots: import_prop_types7.default.object,
  startAdornment: import_prop_types7.default.node,
  style: import_prop_types7.default.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types7.default.oneOfType([import_prop_types7.default.arrayOf(import_prop_types7.default.oneOfType([import_prop_types7.default.func, import_prop_types7.default.object, import_prop_types7.default.bool])), import_prop_types7.default.func, import_prop_types7.default.object]),
  value: import_prop_types7.default.string.isRequired
} : void 0;

// node_modules/@mui/x-date-pickers/esm/PickersTextField/PickersOutlinedInput/pickersOutlinedInputClasses.js
function getPickersOutlinedInputUtilityClass(slot) {
  return generateUtilityClass("MuiPickersOutlinedInput", slot);
}
var pickersOutlinedInputClasses = _extends({}, pickersInputBaseClasses, generateUtilityClasses("MuiPickersOutlinedInput", ["root", "notchedOutline", "input"]));

// node_modules/@mui/x-date-pickers/esm/PickersTextField/PickersOutlinedInput/Outline.js
var React33 = __toESM(require_react(), 1);
var import_jsx_runtime14 = __toESM(require_jsx_runtime(), 1);
var _excluded12 = ["children", "className", "label", "notched", "shrink"];
var OutlineRoot = styled_default("fieldset", {
  name: "MuiPickersOutlinedInput",
  slot: "NotchedOutline"
})(({
  theme
}) => {
  const borderColor = theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.23)" : "rgba(255, 255, 255, 0.23)";
  return {
    textAlign: "left",
    position: "absolute",
    bottom: 0,
    right: 0,
    top: -5,
    left: 0,
    margin: 0,
    padding: "0 8px",
    pointerEvents: "none",
    borderRadius: "inherit",
    borderStyle: "solid",
    borderWidth: 1,
    overflow: "hidden",
    minWidth: "0%",
    borderColor: theme.vars ? `rgba(${theme.vars.palette.common.onBackgroundChannel} / 0.23)` : borderColor
  };
});
var OutlineLabel = styled_default("span")(({
  theme
}) => ({
  fontFamily: theme.typography.fontFamily,
  fontSize: "inherit"
}));
var OutlineLegend = styled_default("legend", {
  shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== "notched"
})(({
  theme
}) => ({
  float: "unset",
  // Fix conflict with bootstrap
  width: "auto",
  // Fix conflict with bootstrap
  overflow: "hidden",
  // Fix Horizontal scroll when label too long
  variants: [{
    props: {
      inputHasLabel: false
    },
    style: {
      padding: 0,
      lineHeight: "11px",
      // sync with `height` in `legend` styles
      transition: theme.transitions.create("width", {
        duration: 150,
        easing: theme.transitions.easing.easeOut
      })
    }
  }, {
    props: {
      inputHasLabel: true
    },
    style: {
      display: "block",
      // Fix conflict with normalize.css and sanitize.css
      padding: 0,
      height: 11,
      // sync with `lineHeight` in `legend` styles
      fontSize: "0.75em",
      visibility: "hidden",
      maxWidth: 0.01,
      transition: theme.transitions.create("max-width", {
        duration: 50,
        easing: theme.transitions.easing.easeOut
      }),
      whiteSpace: "nowrap",
      "& > span": {
        paddingLeft: 5,
        paddingRight: 5,
        display: "inline-block",
        opacity: 0,
        visibility: "visible"
      }
    }
  }, {
    props: {
      inputHasLabel: true,
      notched: true
    },
    style: {
      maxWidth: "100%",
      transition: theme.transitions.create("max-width", {
        duration: 100,
        easing: theme.transitions.easing.easeOut,
        delay: 50
      })
    }
  }]
}));
function Outline(props) {
  const {
    className,
    label,
    notched
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded12);
  const ownerState = usePickerTextFieldOwnerState();
  return (0, import_jsx_runtime14.jsx)(OutlineRoot, _extends({
    "aria-hidden": true,
    className
  }, other, {
    ownerState,
    children: (0, import_jsx_runtime14.jsx)(OutlineLegend, {
      ownerState,
      notched,
      children: label ? (0, import_jsx_runtime14.jsx)(OutlineLabel, {
        children: label
      }) : (
        // notranslate needed while Google Translate will not fix zero-width space issue
        (0, import_jsx_runtime14.jsx)(OutlineLabel, {
          className: "notranslate",
          children: "​"
        })
      )
    })
  }));
}

// node_modules/@mui/x-date-pickers/esm/PickersTextField/PickersOutlinedInput/PickersOutlinedInput.js
var import_jsx_runtime15 = __toESM(require_jsx_runtime(), 1);
var _excluded13 = ["label", "autoFocus", "ownerState", "classes", "notched"];
var PickersOutlinedInputRoot = styled_default(PickersInputBaseRoot, {
  name: "MuiPickersOutlinedInput",
  slot: "Root"
})(({
  theme
}) => {
  const borderColor = theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.23)" : "rgba(255, 255, 255, 0.23)";
  return {
    padding: "0 14px",
    borderRadius: (theme.vars || theme).shape.borderRadius,
    [`&:hover .${pickersOutlinedInputClasses.notchedOutline}`]: {
      borderColor: (theme.vars || theme).palette.text.primary
    },
    // Reset on touch devices, it doesn't add specificity
    "@media (hover: none)": {
      [`&:hover .${pickersOutlinedInputClasses.notchedOutline}`]: {
        borderColor: theme.vars ? `rgba(${theme.vars.palette.common.onBackgroundChannel} / 0.23)` : borderColor
      }
    },
    [`&.${pickersOutlinedInputClasses.focused} .${pickersOutlinedInputClasses.notchedOutline}`]: {
      borderStyle: "solid",
      borderWidth: 2
    },
    [`&.${pickersOutlinedInputClasses.disabled}`]: {
      [`& .${pickersOutlinedInputClasses.notchedOutline}`]: {
        borderColor: (theme.vars || theme).palette.action.disabled
      },
      "*": {
        color: (theme.vars || theme).palette.action.disabled
      }
    },
    [`&.${pickersOutlinedInputClasses.error} .${pickersOutlinedInputClasses.notchedOutline}`]: {
      borderColor: (theme.vars || theme).palette.error.main
    },
    variants: Object.keys((theme.vars ?? theme).palette).filter((key) => {
      var _a;
      return ((_a = (theme.vars ?? theme).palette[key]) == null ? void 0 : _a.main) ?? false;
    }).map((color) => ({
      props: {
        inputColor: color
      },
      style: {
        [`&.${pickersOutlinedInputClasses.focused}:not(.${pickersOutlinedInputClasses.error}) .${pickersOutlinedInputClasses.notchedOutline}`]: {
          // @ts-ignore
          borderColor: (theme.vars || theme).palette[color].main
        }
      }
    }))
  };
});
var PickersOutlinedInputSectionsContainer = styled_default(PickersInputBaseSectionsContainer, {
  name: "MuiPickersOutlinedInput",
  slot: "SectionsContainer"
})({
  padding: "16.5px 0",
  variants: [{
    props: {
      inputSize: "small"
    },
    style: {
      padding: "8.5px 0"
    }
  }]
});
var useUtilityClasses8 = (classes) => {
  const slots = {
    root: ["root"],
    notchedOutline: ["notchedOutline"],
    input: ["input"]
  };
  const composedClasses = composeClasses(slots, getPickersOutlinedInputUtilityClass, classes);
  return _extends({}, classes, composedClasses);
};
var PickersOutlinedInput = React34.forwardRef(function PickersOutlinedInput2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiPickersOutlinedInput"
  });
  const {
    label,
    classes: classesProp,
    notched
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded13);
  const muiFormControl = useFormControl();
  const classes = useUtilityClasses8(classesProp);
  return (0, import_jsx_runtime15.jsx)(PickersInputBase, _extends({
    slots: {
      root: PickersOutlinedInputRoot,
      input: PickersOutlinedInputSectionsContainer
    },
    renderSuffix: (state) => (0, import_jsx_runtime15.jsx)(Outline, {
      shrink: Boolean(notched || state.adornedStart || state.focused || state.filled),
      notched: Boolean(notched || state.adornedStart || state.focused || state.filled),
      className: classes.notchedOutline,
      label: label != null && label !== "" && (muiFormControl == null ? void 0 : muiFormControl.required) ? (0, import_jsx_runtime15.jsxs)(React34.Fragment, {
        children: [label, " ", "*"]
      }) : label
    })
  }, other, {
    label,
    classes,
    ref
  }));
});
true ? PickersOutlinedInput.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Is `true` if the current values equals the empty value.
   * For a single item value, it means that `value === null`
   * For a range value, it means that `value === [null, null]`
   */
  areAllSectionsEmpty: import_prop_types8.default.bool.isRequired,
  className: import_prop_types8.default.string,
  component: import_prop_types8.default.elementType,
  /**
   * If true, the whole element is editable.
   * Useful when all the sections are selected.
   */
  contentEditable: import_prop_types8.default.bool.isRequired,
  "data-multi-input": import_prop_types8.default.string,
  /**
   * The elements to render.
   * Each element contains the prop to edit a section of the value.
   */
  elements: import_prop_types8.default.arrayOf(import_prop_types8.default.shape({
    after: import_prop_types8.default.object.isRequired,
    before: import_prop_types8.default.object.isRequired,
    container: import_prop_types8.default.object.isRequired,
    content: import_prop_types8.default.object.isRequired
  })).isRequired,
  endAdornment: import_prop_types8.default.node,
  fullWidth: import_prop_types8.default.bool,
  id: import_prop_types8.default.string,
  inputProps: import_prop_types8.default.object,
  inputRef: refType_default,
  label: import_prop_types8.default.node,
  margin: import_prop_types8.default.oneOf(["dense", "none", "normal"]),
  name: import_prop_types8.default.string,
  notched: import_prop_types8.default.bool,
  onChange: import_prop_types8.default.func.isRequired,
  onClick: import_prop_types8.default.func.isRequired,
  onInput: import_prop_types8.default.func.isRequired,
  onKeyDown: import_prop_types8.default.func.isRequired,
  onPaste: import_prop_types8.default.func.isRequired,
  ownerState: import_prop_types8.default.any,
  readOnly: import_prop_types8.default.bool,
  renderSuffix: import_prop_types8.default.func,
  sectionListRef: import_prop_types8.default.oneOfType([import_prop_types8.default.func, import_prop_types8.default.shape({
    current: import_prop_types8.default.shape({
      getRoot: import_prop_types8.default.func.isRequired,
      getSectionContainer: import_prop_types8.default.func.isRequired,
      getSectionContent: import_prop_types8.default.func.isRequired,
      getSectionIndexFromDOMElement: import_prop_types8.default.func.isRequired
    })
  })]),
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps: import_prop_types8.default.object,
  /**
   * The components used for each slot inside.
   *
   * @default {}
   */
  slots: import_prop_types8.default.object,
  startAdornment: import_prop_types8.default.node,
  style: import_prop_types8.default.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types8.default.oneOfType([import_prop_types8.default.arrayOf(import_prop_types8.default.oneOfType([import_prop_types8.default.func, import_prop_types8.default.object, import_prop_types8.default.bool])), import_prop_types8.default.func, import_prop_types8.default.object]),
  value: import_prop_types8.default.string.isRequired
} : void 0;
PickersOutlinedInput.muiName = "Input";

// node_modules/@mui/x-date-pickers/esm/PickersTextField/PickersFilledInput/PickersFilledInput.js
var React35 = __toESM(require_react(), 1);
var import_prop_types9 = __toESM(require_prop_types(), 1);

// node_modules/@mui/x-date-pickers/esm/PickersTextField/PickersFilledInput/pickersFilledInputClasses.js
function getPickersFilledInputUtilityClass(slot) {
  return generateUtilityClass("MuiPickersFilledInput", slot);
}
var pickersFilledInputClasses = _extends({}, pickersInputBaseClasses, generateUtilityClasses("MuiPickersFilledInput", ["root", "underline", "input"]));

// node_modules/@mui/x-date-pickers/esm/PickersTextField/PickersFilledInput/PickersFilledInput.js
var import_jsx_runtime16 = __toESM(require_jsx_runtime(), 1);
var _excluded14 = ["label", "autoFocus", "disableUnderline", "hiddenLabel", "classes"];
var PickersFilledInputRoot = styled_default(PickersInputBaseRoot, {
  name: "MuiPickersFilledInput",
  slot: "Root",
  shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== "disableUnderline"
})(({
  theme
}) => {
  const light = theme.palette.mode === "light";
  const bottomLineColor = light ? "rgba(0, 0, 0, 0.42)" : "rgba(255, 255, 255, 0.7)";
  const backgroundColor = light ? "rgba(0, 0, 0, 0.06)" : "rgba(255, 255, 255, 0.09)";
  const hoverBackground = light ? "rgba(0, 0, 0, 0.09)" : "rgba(255, 255, 255, 0.13)";
  const disabledBackground = light ? "rgba(0, 0, 0, 0.12)" : "rgba(255, 255, 255, 0.12)";
  return {
    backgroundColor: theme.vars ? theme.vars.palette.FilledInput.bg : backgroundColor,
    borderTopLeftRadius: (theme.vars || theme).shape.borderRadius,
    borderTopRightRadius: (theme.vars || theme).shape.borderRadius,
    transition: theme.transitions.create("background-color", {
      duration: theme.transitions.duration.shorter,
      easing: theme.transitions.easing.easeOut
    }),
    "&:hover": {
      backgroundColor: theme.vars ? theme.vars.palette.FilledInput.hoverBg : hoverBackground,
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        backgroundColor: theme.vars ? theme.vars.palette.FilledInput.bg : backgroundColor
      }
    },
    [`&.${pickersFilledInputClasses.focused}`]: {
      backgroundColor: theme.vars ? theme.vars.palette.FilledInput.bg : backgroundColor
    },
    [`&.${pickersFilledInputClasses.disabled}`]: {
      backgroundColor: theme.vars ? theme.vars.palette.FilledInput.disabledBg : disabledBackground
    },
    variants: [...Object.keys((theme.vars ?? theme).palette).filter((key) => (theme.vars ?? theme).palette[key].main).map((color) => {
      var _a;
      return {
        props: {
          inputColor: color,
          disableUnderline: false
        },
        style: {
          "&::after": {
            // @ts-ignore
            borderBottom: `2px solid ${(_a = (theme.vars || theme).palette[color]) == null ? void 0 : _a.main}`
          }
        }
      };
    }), {
      props: {
        disableUnderline: false
      },
      style: {
        "&::after": {
          left: 0,
          bottom: 0,
          // Doing the other way around crash on IE11 "''" https://github.com/cssinjs/jss/issues/242
          content: '""',
          position: "absolute",
          right: 0,
          transform: "scaleX(0)",
          transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shorter,
            easing: theme.transitions.easing.easeOut
          }),
          pointerEvents: "none"
          // Transparent to the hover style.
        },
        [`&.${pickersFilledInputClasses.focused}:after`]: {
          // translateX(0) is a workaround for Safari transform scale bug
          // See https://github.com/mui/material-ui/issues/31766
          transform: "scaleX(1) translateX(0)"
        },
        [`&.${pickersFilledInputClasses.error}`]: {
          "&:before, &:after": {
            borderBottomColor: (theme.vars || theme).palette.error.main
          }
        },
        "&::before": {
          borderBottom: `1px solid ${theme.vars ? `rgba(${theme.vars.palette.common.onBackgroundChannel} / ${theme.vars.opacity.inputUnderline})` : bottomLineColor}`,
          left: 0,
          bottom: 0,
          // Doing the other way around crash on IE11 "''" https://github.com/cssinjs/jss/issues/242
          content: '"\\00a0"',
          position: "absolute",
          right: 0,
          transition: theme.transitions.create("border-bottom-color", {
            duration: theme.transitions.duration.shorter
          }),
          pointerEvents: "none"
          // Transparent to the hover style.
        },
        [`&:hover:not(.${pickersFilledInputClasses.disabled}, .${pickersFilledInputClasses.error}):before`]: {
          borderBottom: `1px solid ${(theme.vars || theme).palette.text.primary}`
        },
        [`&.${pickersFilledInputClasses.disabled}:before`]: {
          borderBottomStyle: "dotted"
        }
      }
    }, {
      props: {
        hasStartAdornment: true
      },
      style: {
        paddingLeft: 12
      }
    }, {
      props: {
        hasEndAdornment: true
      },
      style: {
        paddingRight: 12
      }
    }]
  };
});
var PickersFilledSectionsContainer = styled_default(PickersInputBaseSectionsContainer, {
  name: "MuiPickersFilledInput",
  slot: "sectionsContainer",
  shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== "hiddenLabel"
})({
  paddingTop: 25,
  paddingRight: 12,
  paddingBottom: 8,
  paddingLeft: 12,
  variants: [{
    props: {
      inputSize: "small"
    },
    style: {
      paddingTop: 21,
      paddingBottom: 4
    }
  }, {
    props: {
      hasStartAdornment: true
    },
    style: {
      paddingLeft: 0
    }
  }, {
    props: {
      hasEndAdornment: true
    },
    style: {
      paddingRight: 0
    }
  }, {
    props: {
      hiddenLabel: true
    },
    style: {
      paddingTop: 16,
      paddingBottom: 17
    }
  }, {
    props: {
      hiddenLabel: true,
      inputSize: "small"
    },
    style: {
      paddingTop: 8,
      paddingBottom: 9
    }
  }]
});
var useUtilityClasses9 = (classes, ownerState) => {
  const {
    inputHasUnderline
  } = ownerState;
  const slots = {
    root: ["root", inputHasUnderline && "underline"],
    input: ["input"]
  };
  const composedClasses = composeClasses(slots, getPickersFilledInputUtilityClass, classes);
  return _extends({}, classes, composedClasses);
};
var PickersFilledInput = React35.forwardRef(function PickersFilledInput2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiPickersFilledInput"
  });
  const {
    label,
    disableUnderline = false,
    hiddenLabel = false,
    classes: classesProp
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded14);
  const pickerTextFieldOwnerState = usePickerTextFieldOwnerState();
  const ownerState = _extends({}, pickerTextFieldOwnerState, {
    inputHasUnderline: !disableUnderline
  });
  const classes = useUtilityClasses9(classesProp, ownerState);
  return (0, import_jsx_runtime16.jsx)(PickersInputBase, _extends({
    slots: {
      root: PickersFilledInputRoot,
      input: PickersFilledSectionsContainer
    },
    slotProps: {
      root: {
        disableUnderline
      },
      input: {
        hiddenLabel
      }
    }
  }, other, {
    label,
    classes,
    ref,
    ownerState
  }));
});
true ? PickersFilledInput.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Is `true` if the current values equals the empty value.
   * For a single item value, it means that `value === null`
   * For a range value, it means that `value === [null, null]`
   */
  areAllSectionsEmpty: import_prop_types9.default.bool.isRequired,
  className: import_prop_types9.default.string,
  component: import_prop_types9.default.elementType,
  /**
   * If true, the whole element is editable.
   * Useful when all the sections are selected.
   */
  contentEditable: import_prop_types9.default.bool.isRequired,
  "data-multi-input": import_prop_types9.default.string,
  disableUnderline: import_prop_types9.default.bool,
  /**
   * The elements to render.
   * Each element contains the prop to edit a section of the value.
   */
  elements: import_prop_types9.default.arrayOf(import_prop_types9.default.shape({
    after: import_prop_types9.default.object.isRequired,
    before: import_prop_types9.default.object.isRequired,
    container: import_prop_types9.default.object.isRequired,
    content: import_prop_types9.default.object.isRequired
  })).isRequired,
  endAdornment: import_prop_types9.default.node,
  fullWidth: import_prop_types9.default.bool,
  hiddenLabel: import_prop_types9.default.bool,
  id: import_prop_types9.default.string,
  inputProps: import_prop_types9.default.object,
  inputRef: refType_default,
  label: import_prop_types9.default.node,
  margin: import_prop_types9.default.oneOf(["dense", "none", "normal"]),
  name: import_prop_types9.default.string,
  onChange: import_prop_types9.default.func.isRequired,
  onClick: import_prop_types9.default.func.isRequired,
  onInput: import_prop_types9.default.func.isRequired,
  onKeyDown: import_prop_types9.default.func.isRequired,
  onPaste: import_prop_types9.default.func.isRequired,
  ownerState: import_prop_types9.default.any,
  readOnly: import_prop_types9.default.bool,
  renderSuffix: import_prop_types9.default.func,
  sectionListRef: import_prop_types9.default.oneOfType([import_prop_types9.default.func, import_prop_types9.default.shape({
    current: import_prop_types9.default.shape({
      getRoot: import_prop_types9.default.func.isRequired,
      getSectionContainer: import_prop_types9.default.func.isRequired,
      getSectionContent: import_prop_types9.default.func.isRequired,
      getSectionIndexFromDOMElement: import_prop_types9.default.func.isRequired
    })
  })]),
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps: import_prop_types9.default.object,
  /**
   * The components used for each slot inside.
   *
   * @default {}
   */
  slots: import_prop_types9.default.object,
  startAdornment: import_prop_types9.default.node,
  style: import_prop_types9.default.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types9.default.oneOfType([import_prop_types9.default.arrayOf(import_prop_types9.default.oneOfType([import_prop_types9.default.func, import_prop_types9.default.object, import_prop_types9.default.bool])), import_prop_types9.default.func, import_prop_types9.default.object]),
  value: import_prop_types9.default.string.isRequired
} : void 0;
PickersFilledInput.muiName = "Input";

// node_modules/@mui/x-date-pickers/esm/PickersTextField/PickersInput/PickersInput.js
var React36 = __toESM(require_react(), 1);
var import_prop_types10 = __toESM(require_prop_types(), 1);

// node_modules/@mui/x-date-pickers/esm/PickersTextField/PickersInput/pickersInputClasses.js
function getPickersInputUtilityClass(slot) {
  return generateUtilityClass("MuiPickersFilledInput", slot);
}
var pickersInputClasses = _extends({}, pickersInputBaseClasses, generateUtilityClasses("MuiPickersInput", ["root", "underline", "input"]));

// node_modules/@mui/x-date-pickers/esm/PickersTextField/PickersInput/PickersInput.js
var import_jsx_runtime17 = __toESM(require_jsx_runtime(), 1);
var _excluded15 = ["label", "autoFocus", "disableUnderline", "ownerState", "classes"];
var PickersInputRoot = styled_default(PickersInputBaseRoot, {
  name: "MuiPickersInput",
  slot: "Root",
  shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== "disableUnderline"
})(({
  theme
}) => {
  const light = theme.palette.mode === "light";
  let bottomLineColor = light ? "rgba(0, 0, 0, 0.42)" : "rgba(255, 255, 255, 0.7)";
  if (theme.vars) {
    bottomLineColor = `rgba(${theme.vars.palette.common.onBackgroundChannel} / ${theme.vars.opacity.inputUnderline})`;
  }
  return {
    "label + &": {
      marginTop: 16
    },
    variants: [...Object.keys((theme.vars ?? theme).palette).filter((key) => (theme.vars ?? theme).palette[key].main).map((color) => ({
      props: {
        inputColor: color
      },
      style: {
        "&::after": {
          // @ts-ignore
          borderBottom: `2px solid ${(theme.vars || theme).palette[color].main}`
        }
      }
    })), {
      props: {
        disableUnderline: false
      },
      style: {
        "&::after": {
          background: "red",
          left: 0,
          bottom: 0,
          // Doing the other way around crash on IE11 "''" https://github.com/cssinjs/jss/issues/242
          content: '""',
          position: "absolute",
          right: 0,
          transform: "scaleX(0)",
          transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shorter,
            easing: theme.transitions.easing.easeOut
          }),
          pointerEvents: "none"
          // Transparent to the hover style.
        },
        [`&.${pickersInputClasses.focused}:after`]: {
          // translateX(0) is a workaround for Safari transform scale bug
          // See https://github.com/mui/material-ui/issues/31766
          transform: "scaleX(1) translateX(0)"
        },
        [`&.${pickersInputClasses.error}`]: {
          "&:before, &:after": {
            borderBottomColor: (theme.vars || theme).palette.error.main
          }
        },
        "&::before": {
          borderBottom: `1px solid ${bottomLineColor}`,
          left: 0,
          bottom: 0,
          // Doing the other way around crash on IE11 "''" https://github.com/cssinjs/jss/issues/242
          content: '"\\00a0"',
          position: "absolute",
          right: 0,
          transition: theme.transitions.create("border-bottom-color", {
            duration: theme.transitions.duration.shorter
          }),
          pointerEvents: "none"
          // Transparent to the hover style.
        },
        [`&:hover:not(.${pickersInputClasses.disabled}, .${pickersInputClasses.error}):before`]: {
          borderBottom: `2px solid ${(theme.vars || theme).palette.text.primary}`,
          // Reset on touch devices, it doesn't add specificity
          "@media (hover: none)": {
            borderBottom: `1px solid ${bottomLineColor}`
          }
        },
        [`&.${pickersInputClasses.disabled}:before`]: {
          borderBottomStyle: "dotted"
        }
      }
    }]
  };
});
var useUtilityClasses10 = (classes, ownerState) => {
  const {
    inputHasUnderline
  } = ownerState;
  const slots = {
    root: ["root", !inputHasUnderline && "underline"],
    input: ["input"]
  };
  const composedClasses = composeClasses(slots, getPickersInputUtilityClass, classes);
  return _extends({}, classes, composedClasses);
};
var PickersInput = React36.forwardRef(function PickersInput2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiPickersInput"
  });
  const {
    label,
    disableUnderline = false,
    classes: classesProp
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded15);
  const pickerTextFieldOwnerState = usePickerTextFieldOwnerState();
  const ownerState = _extends({}, pickerTextFieldOwnerState, {
    inputHasUnderline: !disableUnderline
  });
  const classes = useUtilityClasses10(classesProp, ownerState);
  return (0, import_jsx_runtime17.jsx)(PickersInputBase, _extends({
    slots: {
      root: PickersInputRoot
    },
    slotProps: {
      root: {
        disableUnderline
      }
    }
  }, other, {
    label,
    classes,
    ref
  }));
});
true ? PickersInput.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Is `true` if the current values equals the empty value.
   * For a single item value, it means that `value === null`
   * For a range value, it means that `value === [null, null]`
   */
  areAllSectionsEmpty: import_prop_types10.default.bool.isRequired,
  className: import_prop_types10.default.string,
  component: import_prop_types10.default.elementType,
  /**
   * If true, the whole element is editable.
   * Useful when all the sections are selected.
   */
  contentEditable: import_prop_types10.default.bool.isRequired,
  "data-multi-input": import_prop_types10.default.string,
  disableUnderline: import_prop_types10.default.bool,
  /**
   * The elements to render.
   * Each element contains the prop to edit a section of the value.
   */
  elements: import_prop_types10.default.arrayOf(import_prop_types10.default.shape({
    after: import_prop_types10.default.object.isRequired,
    before: import_prop_types10.default.object.isRequired,
    container: import_prop_types10.default.object.isRequired,
    content: import_prop_types10.default.object.isRequired
  })).isRequired,
  endAdornment: import_prop_types10.default.node,
  fullWidth: import_prop_types10.default.bool,
  id: import_prop_types10.default.string,
  inputProps: import_prop_types10.default.object,
  inputRef: refType_default,
  label: import_prop_types10.default.node,
  margin: import_prop_types10.default.oneOf(["dense", "none", "normal"]),
  name: import_prop_types10.default.string,
  onChange: import_prop_types10.default.func.isRequired,
  onClick: import_prop_types10.default.func.isRequired,
  onInput: import_prop_types10.default.func.isRequired,
  onKeyDown: import_prop_types10.default.func.isRequired,
  onPaste: import_prop_types10.default.func.isRequired,
  ownerState: import_prop_types10.default.any,
  readOnly: import_prop_types10.default.bool,
  renderSuffix: import_prop_types10.default.func,
  sectionListRef: import_prop_types10.default.oneOfType([import_prop_types10.default.func, import_prop_types10.default.shape({
    current: import_prop_types10.default.shape({
      getRoot: import_prop_types10.default.func.isRequired,
      getSectionContainer: import_prop_types10.default.func.isRequired,
      getSectionContent: import_prop_types10.default.func.isRequired,
      getSectionIndexFromDOMElement: import_prop_types10.default.func.isRequired
    })
  })]),
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps: import_prop_types10.default.object,
  /**
   * The components used for each slot inside.
   *
   * @default {}
   */
  slots: import_prop_types10.default.object,
  startAdornment: import_prop_types10.default.node,
  style: import_prop_types10.default.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types10.default.oneOfType([import_prop_types10.default.arrayOf(import_prop_types10.default.oneOfType([import_prop_types10.default.func, import_prop_types10.default.object, import_prop_types10.default.bool])), import_prop_types10.default.func, import_prop_types10.default.object]),
  value: import_prop_types10.default.string.isRequired
} : void 0;
PickersInput.muiName = "Input";

// node_modules/@mui/x-date-pickers/esm/PickersTextField/PickersTextField.js
var import_jsx_runtime18 = __toESM(require_jsx_runtime(), 1);
var _excluded16 = ["onFocus", "onBlur", "className", "classes", "color", "disabled", "error", "variant", "required", "InputProps", "inputProps", "inputRef", "sectionListRef", "elements", "areAllSectionsEmpty", "onClick", "onKeyDown", "onKeyUp", "onPaste", "onInput", "endAdornment", "startAdornment", "tabIndex", "contentEditable", "focused", "value", "onChange", "fullWidth", "id", "name", "helperText", "FormHelperTextProps", "label", "InputLabelProps", "data-active-range-position"];
var VARIANT_COMPONENT = {
  standard: PickersInput,
  filled: PickersFilledInput,
  outlined: PickersOutlinedInput
};
var PickersTextFieldRoot = styled_default(FormControl_default, {
  name: "MuiPickersTextField",
  slot: "Root"
})({});
var useUtilityClasses11 = (classes, ownerState) => {
  const {
    isFieldFocused: isFieldFocused3,
    isFieldDisabled,
    isFieldRequired
  } = ownerState;
  const slots = {
    root: ["root", isFieldFocused3 && !isFieldDisabled && "focused", isFieldDisabled && "disabled", isFieldRequired && "required"]
  };
  return composeClasses(slots, getPickersTextFieldUtilityClass, classes);
};
var PickersTextField = React37.forwardRef(function PickersTextField2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiPickersTextField"
  });
  const {
    // Props used by FormControl
    onFocus,
    onBlur,
    className,
    classes: classesProp,
    color = "primary",
    disabled = false,
    error = false,
    variant = "outlined",
    required = false,
    // Props used by PickersInput
    InputProps,
    inputProps,
    inputRef,
    sectionListRef,
    elements,
    areAllSectionsEmpty,
    onClick,
    onKeyDown,
    onKeyUp,
    onPaste,
    onInput,
    endAdornment,
    startAdornment,
    tabIndex,
    contentEditable,
    focused,
    value,
    onChange,
    fullWidth,
    id: idProp,
    name,
    // Props used by FormHelperText
    helperText,
    FormHelperTextProps,
    // Props used by InputLabel
    label,
    InputLabelProps,
    // @ts-ignore
    "data-active-range-position": dataActiveRangePosition
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded16);
  const rootRef = React37.useRef(null);
  const handleRootRef = useForkRef(ref, rootRef);
  const id = useId(idProp);
  const helperTextId = helperText && id ? `${id}-helper-text` : void 0;
  const inputLabelId = label && id ? `${id}-label` : void 0;
  const fieldOwnerState = useFieldOwnerState({
    disabled: props.disabled,
    required: props.required,
    readOnly: InputProps == null ? void 0 : InputProps.readOnly
  });
  const ownerState = React37.useMemo(() => _extends({}, fieldOwnerState, {
    isFieldValueEmpty: areAllSectionsEmpty,
    isFieldFocused: focused ?? false,
    hasFieldError: error ?? false,
    inputSize: props.size ?? "medium",
    inputColor: color ?? "primary",
    isInputInFullWidth: fullWidth ?? false,
    hasStartAdornment: Boolean(startAdornment ?? (InputProps == null ? void 0 : InputProps.startAdornment)),
    hasEndAdornment: Boolean(endAdornment ?? (InputProps == null ? void 0 : InputProps.endAdornment)),
    inputHasLabel: !!label
  }), [fieldOwnerState, areAllSectionsEmpty, focused, error, props.size, color, fullWidth, startAdornment, endAdornment, InputProps == null ? void 0 : InputProps.startAdornment, InputProps == null ? void 0 : InputProps.endAdornment, label]);
  const classes = useUtilityClasses11(classesProp, ownerState);
  const PickersInputComponent = VARIANT_COMPONENT[variant];
  const inputAdditionalProps = {};
  if (variant === "outlined") {
    if (InputLabelProps && typeof InputLabelProps.shrink !== "undefined") {
      inputAdditionalProps.notched = InputLabelProps.shrink;
    }
    inputAdditionalProps.label = label;
  }
  return (0, import_jsx_runtime18.jsx)(PickerTextFieldOwnerStateContext.Provider, {
    value: ownerState,
    children: (0, import_jsx_runtime18.jsxs)(PickersTextFieldRoot, _extends({
      className: clsx_default(classes.root, className),
      ref: handleRootRef,
      focused,
      disabled,
      variant,
      error,
      color,
      fullWidth,
      required,
      ownerState
    }, other, {
      children: [label != null && label !== "" && (0, import_jsx_runtime18.jsx)(InputLabel_default, _extends({
        htmlFor: id,
        id: inputLabelId
      }, InputLabelProps, {
        children: label
      })), (0, import_jsx_runtime18.jsx)(PickersInputComponent, _extends({
        elements,
        areAllSectionsEmpty,
        onClick,
        onKeyDown,
        onKeyUp,
        onInput,
        onPaste,
        onFocus,
        onBlur,
        endAdornment,
        startAdornment,
        tabIndex,
        contentEditable,
        value,
        onChange,
        id,
        fullWidth,
        inputProps,
        inputRef,
        sectionListRef,
        label,
        name,
        role: "group",
        "aria-labelledby": inputLabelId,
        "aria-describedby": helperTextId,
        "aria-live": helperTextId ? "polite" : void 0,
        "data-active-range-position": dataActiveRangePosition
      }, inputAdditionalProps, InputProps)), helperText && (0, import_jsx_runtime18.jsx)(FormHelperText_default, _extends({
        id: helperTextId
      }, FormHelperTextProps, {
        children: helperText
      }))]
    }))
  });
});
true ? PickersTextField.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Is `true` if the current values equals the empty value.
   * For a single item value, it means that `value === null`
   * For a range value, it means that `value === [null, null]`
   */
  areAllSectionsEmpty: import_prop_types11.default.bool.isRequired,
  className: import_prop_types11.default.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color: import_prop_types11.default.oneOf(["error", "info", "primary", "secondary", "success", "warning"]),
  component: import_prop_types11.default.elementType,
  /**
   * If true, the whole element is editable.
   * Useful when all the sections are selected.
   */
  contentEditable: import_prop_types11.default.bool.isRequired,
  disabled: import_prop_types11.default.bool.isRequired,
  /**
   * The elements to render.
   * Each element contains the prop to edit a section of the value.
   */
  elements: import_prop_types11.default.arrayOf(import_prop_types11.default.shape({
    after: import_prop_types11.default.object.isRequired,
    before: import_prop_types11.default.object.isRequired,
    container: import_prop_types11.default.object.isRequired,
    content: import_prop_types11.default.object.isRequired
  })).isRequired,
  endAdornment: import_prop_types11.default.node,
  error: import_prop_types11.default.bool.isRequired,
  /**
   * If `true`, the component is displayed in focused state.
   */
  focused: import_prop_types11.default.bool,
  FormHelperTextProps: import_prop_types11.default.object,
  fullWidth: import_prop_types11.default.bool,
  /**
   * The helper text content.
   */
  helperText: import_prop_types11.default.node,
  /**
   * If `true`, the label is hidden.
   * This is used to increase density for a `FilledInput`.
   * Be sure to add `aria-label` to the `input` element.
   * @default false
   */
  hiddenLabel: import_prop_types11.default.bool,
  id: import_prop_types11.default.string,
  InputLabelProps: import_prop_types11.default.object,
  inputProps: import_prop_types11.default.object,
  /**
   * Props applied to the Input element.
   * It will be a [`FilledInput`](/material-ui/api/filled-input/),
   * [`OutlinedInput`](/material-ui/api/outlined-input/) or [`Input`](/material-ui/api/input/)
   * component depending on the `variant` prop value.
   */
  InputProps: import_prop_types11.default.object,
  inputRef: refType_default,
  label: import_prop_types11.default.node,
  /**
   * If `dense` or `normal`, will adjust vertical spacing of this and contained components.
   * @default 'none'
   */
  margin: import_prop_types11.default.oneOf(["dense", "none", "normal"]),
  name: import_prop_types11.default.string,
  onBlur: import_prop_types11.default.func.isRequired,
  onChange: import_prop_types11.default.func.isRequired,
  onClick: import_prop_types11.default.func.isRequired,
  onFocus: import_prop_types11.default.func.isRequired,
  onInput: import_prop_types11.default.func.isRequired,
  onKeyDown: import_prop_types11.default.func.isRequired,
  onPaste: import_prop_types11.default.func.isRequired,
  readOnly: import_prop_types11.default.bool,
  /**
   * If `true`, the label will indicate that the `input` is required.
   * @default false
   */
  required: import_prop_types11.default.bool,
  sectionListRef: import_prop_types11.default.oneOfType([import_prop_types11.default.func, import_prop_types11.default.shape({
    current: import_prop_types11.default.shape({
      getRoot: import_prop_types11.default.func.isRequired,
      getSectionContainer: import_prop_types11.default.func.isRequired,
      getSectionContent: import_prop_types11.default.func.isRequired,
      getSectionIndexFromDOMElement: import_prop_types11.default.func.isRequired
    })
  })]),
  /**
   * The size of the component.
   * @default 'medium'
   */
  size: import_prop_types11.default.oneOf(["medium", "small"]),
  startAdornment: import_prop_types11.default.node,
  style: import_prop_types11.default.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types11.default.oneOfType([import_prop_types11.default.arrayOf(import_prop_types11.default.oneOfType([import_prop_types11.default.func, import_prop_types11.default.object, import_prop_types11.default.bool])), import_prop_types11.default.func, import_prop_types11.default.object]),
  value: import_prop_types11.default.string.isRequired,
  /**
   * The variant to use.
   * @default 'outlined'
   */
  variant: import_prop_types11.default.oneOf(["filled", "outlined", "standard"])
} : void 0;

// node_modules/@mui/x-date-pickers/esm/internals/components/PickerFieldUI.js
var import_jsx_runtime19 = __toESM(require_jsx_runtime(), 1);
var _excluded17 = ["enableAccessibleFieldDOMStructure"];
var _excluded23 = ["InputProps", "readOnly", "onClear", "clearable", "clearButtonPosition", "openPickerButtonPosition", "openPickerAriaLabel"];
var _excluded32 = ["onPaste", "onKeyDown", "inputMode", "readOnly", "InputProps", "inputProps", "inputRef", "onClear", "clearable", "clearButtonPosition", "openPickerButtonPosition", "openPickerAriaLabel"];
var _excluded42 = ["ownerState"];
var _excluded52 = ["ownerState"];
var _excluded62 = ["ownerState"];
var _excluded72 = ["ownerState"];
var _excluded82 = ["InputProps", "inputProps"];
var cleanFieldResponse = (_ref) => {
  let {
    enableAccessibleFieldDOMStructure
  } = _ref, fieldResponse = _objectWithoutPropertiesLoose(_ref, _excluded17);
  if (enableAccessibleFieldDOMStructure) {
    const {
      InputProps: InputProps2,
      readOnly: readOnly2,
      onClear: onClear2,
      clearable: clearable2,
      clearButtonPosition: clearButtonPosition2,
      openPickerButtonPosition: openPickerButtonPosition2,
      openPickerAriaLabel: openPickerAriaLabel2
    } = fieldResponse, other2 = _objectWithoutPropertiesLoose(fieldResponse, _excluded23);
    return {
      clearable: clearable2,
      onClear: onClear2,
      clearButtonPosition: clearButtonPosition2,
      openPickerButtonPosition: openPickerButtonPosition2,
      openPickerAriaLabel: openPickerAriaLabel2,
      textFieldProps: _extends({}, other2, {
        InputProps: _extends({}, InputProps2 ?? {}, {
          readOnly: readOnly2
        })
      })
    };
  }
  const {
    onPaste,
    onKeyDown,
    inputMode,
    readOnly,
    InputProps,
    inputProps,
    inputRef,
    onClear,
    clearable,
    clearButtonPosition,
    openPickerButtonPosition,
    openPickerAriaLabel
  } = fieldResponse, other = _objectWithoutPropertiesLoose(fieldResponse, _excluded32);
  return {
    clearable,
    onClear,
    clearButtonPosition,
    openPickerButtonPosition,
    openPickerAriaLabel,
    textFieldProps: _extends({}, other, {
      InputProps: _extends({}, InputProps ?? {}, {
        readOnly
      }),
      inputProps: _extends({}, inputProps ?? {}, {
        inputMode,
        onPaste,
        onKeyDown,
        ref: inputRef
      })
    })
  };
};
var PickerFieldUIContext = React38.createContext({
  slots: {},
  slotProps: {},
  inputRef: void 0
});
function PickerFieldUI(props) {
  var _a, _b;
  const {
    slots,
    slotProps,
    fieldResponse,
    defaultOpenPickerIcon
  } = props;
  const translations = usePickerTranslations();
  const pickerContext = useNullablePickerContext();
  const pickerFieldUIContext = React38.useContext(PickerFieldUIContext);
  const {
    textFieldProps,
    onClear,
    clearable,
    openPickerAriaLabel,
    clearButtonPosition: clearButtonPositionProp = "end",
    openPickerButtonPosition: openPickerButtonPositionProp = "end"
  } = cleanFieldResponse(fieldResponse);
  const ownerState = useFieldOwnerState(textFieldProps);
  const handleClickOpeningButton = useEventCallback_default((event) => {
    event.preventDefault();
    pickerContext == null ? void 0 : pickerContext.setOpen((prev) => !prev);
  });
  const triggerStatus = pickerContext ? pickerContext.triggerStatus : "hidden";
  const clearButtonPosition = clearable ? clearButtonPositionProp : null;
  const openPickerButtonPosition = triggerStatus !== "hidden" ? openPickerButtonPositionProp : null;
  const TextField = (slots == null ? void 0 : slots.textField) ?? pickerFieldUIContext.slots.textField ?? (fieldResponse.enableAccessibleFieldDOMStructure === false ? TextField_default : PickersTextField);
  const InputAdornment = (slots == null ? void 0 : slots.inputAdornment) ?? pickerFieldUIContext.slots.inputAdornment ?? InputAdornment_default;
  const _useSlotProps = useSlotProps_default({
    elementType: InputAdornment,
    externalSlotProps: mergeSlotProps(pickerFieldUIContext.slotProps.inputAdornment, slotProps == null ? void 0 : slotProps.inputAdornment),
    additionalProps: {
      position: "start"
    },
    ownerState: _extends({}, ownerState, {
      position: "start"
    })
  }), startInputAdornmentProps = _objectWithoutPropertiesLoose(_useSlotProps, _excluded42);
  const _useSlotProps2 = useSlotProps_default({
    elementType: InputAdornment,
    externalSlotProps: slotProps == null ? void 0 : slotProps.inputAdornment,
    additionalProps: {
      position: "end"
    },
    ownerState: _extends({}, ownerState, {
      position: "end"
    })
  }), endInputAdornmentProps = _objectWithoutPropertiesLoose(_useSlotProps2, _excluded52);
  const OpenPickerButton = pickerFieldUIContext.slots.openPickerButton ?? IconButton_default;
  const _useSlotProps3 = useSlotProps_default({
    elementType: OpenPickerButton,
    externalSlotProps: pickerFieldUIContext.slotProps.openPickerButton,
    additionalProps: {
      disabled: triggerStatus === "disabled",
      onClick: handleClickOpeningButton,
      "aria-label": openPickerAriaLabel,
      edge: (
        // open button is always rendered at the edge
        textFieldProps.variant !== "standard" ? openPickerButtonPosition : false
      )
    },
    ownerState
  }), openPickerButtonProps = _objectWithoutPropertiesLoose(_useSlotProps3, _excluded62);
  const OpenPickerIcon = pickerFieldUIContext.slots.openPickerIcon ?? defaultOpenPickerIcon;
  const openPickerIconProps = useSlotProps_default({
    elementType: OpenPickerIcon,
    externalSlotProps: pickerFieldUIContext.slotProps.openPickerIcon,
    ownerState
  });
  const ClearButton = (slots == null ? void 0 : slots.clearButton) ?? pickerFieldUIContext.slots.clearButton ?? IconButton_default;
  const _useSlotProps4 = useSlotProps_default({
    elementType: ClearButton,
    externalSlotProps: mergeSlotProps(pickerFieldUIContext.slotProps.clearButton, slotProps == null ? void 0 : slotProps.clearButton),
    className: "clearButton",
    additionalProps: {
      title: translations.fieldClearLabel,
      tabIndex: -1,
      onClick: onClear,
      disabled: fieldResponse.disabled || fieldResponse.readOnly,
      edge: (
        // clear button can only be at the edge if it's position differs from the open button
        textFieldProps.variant !== "standard" && clearButtonPosition !== openPickerButtonPosition ? clearButtonPosition : false
      )
    },
    ownerState
  }), clearButtonProps = _objectWithoutPropertiesLoose(_useSlotProps4, _excluded72);
  const ClearIcon2 = (slots == null ? void 0 : slots.clearIcon) ?? pickerFieldUIContext.slots.clearIcon ?? ClearIcon;
  const clearIconProps = useSlotProps_default({
    elementType: ClearIcon2,
    externalSlotProps: mergeSlotProps(pickerFieldUIContext.slotProps.clearIcon, slotProps == null ? void 0 : slotProps.clearIcon),
    additionalProps: {
      fontSize: "small"
    },
    ownerState
  });
  textFieldProps.ref = useForkRef(textFieldProps.ref, pickerContext == null ? void 0 : pickerContext.rootRef);
  if (!textFieldProps.InputProps) {
    textFieldProps.InputProps = {};
  }
  if (pickerContext) {
    textFieldProps.InputProps.ref = pickerContext.triggerRef;
  }
  if (!((_a = textFieldProps.InputProps) == null ? void 0 : _a.startAdornment) && (clearButtonPosition === "start" || openPickerButtonPosition === "start")) {
    textFieldProps.InputProps.startAdornment = (0, import_jsx_runtime19.jsxs)(InputAdornment, _extends({}, startInputAdornmentProps, {
      children: [openPickerButtonPosition === "start" && (0, import_jsx_runtime19.jsx)(OpenPickerButton, _extends({}, openPickerButtonProps, {
        children: (0, import_jsx_runtime19.jsx)(OpenPickerIcon, _extends({}, openPickerIconProps))
      })), clearButtonPosition === "start" && (0, import_jsx_runtime19.jsx)(ClearButton, _extends({}, clearButtonProps, {
        children: (0, import_jsx_runtime19.jsx)(ClearIcon2, _extends({}, clearIconProps))
      }))]
    }));
  }
  if (!((_b = textFieldProps.InputProps) == null ? void 0 : _b.endAdornment) && (clearButtonPosition === "end" || openPickerButtonPosition === "end")) {
    textFieldProps.InputProps.endAdornment = (0, import_jsx_runtime19.jsxs)(InputAdornment, _extends({}, endInputAdornmentProps, {
      children: [clearButtonPosition === "end" && (0, import_jsx_runtime19.jsx)(ClearButton, _extends({}, clearButtonProps, {
        children: (0, import_jsx_runtime19.jsx)(ClearIcon2, _extends({}, clearIconProps))
      })), openPickerButtonPosition === "end" && (0, import_jsx_runtime19.jsx)(OpenPickerButton, _extends({}, openPickerButtonProps, {
        children: (0, import_jsx_runtime19.jsx)(OpenPickerIcon, _extends({}, openPickerIconProps))
      }))]
    }));
  }
  if (clearButtonPosition != null) {
    textFieldProps.sx = [{
      "& .clearButton": {
        opacity: 1
      },
      "@media (pointer: fine)": {
        "& .clearButton": {
          opacity: 0
        },
        "&:hover, &:focus-within": {
          ".clearButton": {
            opacity: 1
          }
        }
      }
    }, ...Array.isArray(textFieldProps.sx) ? textFieldProps.sx : [textFieldProps.sx]];
  }
  return (0, import_jsx_runtime19.jsx)(TextField, _extends({}, textFieldProps));
}
function mergeSlotProps(slotPropsA, slotPropsB) {
  if (!slotPropsA) {
    return slotPropsB;
  }
  if (!slotPropsB) {
    return slotPropsA;
  }
  return (ownerState) => {
    return _extends({}, resolveComponentProps_default(slotPropsB, ownerState), resolveComponentProps_default(slotPropsA, ownerState));
  };
}
function useFieldTextFieldProps(parameters) {
  const {
    ref,
    externalForwardedProps,
    slotProps
  } = parameters;
  const pickerFieldUIContext = React38.useContext(PickerFieldUIContext);
  const pickerContext = useNullablePickerContext();
  const ownerState = useFieldOwnerState(externalForwardedProps);
  const {
    InputProps,
    inputProps
  } = externalForwardedProps, otherExternalForwardedProps = _objectWithoutPropertiesLoose(externalForwardedProps, _excluded82);
  const textFieldProps = useSlotProps_default({
    elementType: PickersTextField,
    externalSlotProps: mergeSlotProps(pickerFieldUIContext.slotProps.textField, slotProps == null ? void 0 : slotProps.textField),
    externalForwardedProps: otherExternalForwardedProps,
    additionalProps: {
      ref,
      sx: pickerContext == null ? void 0 : pickerContext.rootSx,
      label: pickerContext == null ? void 0 : pickerContext.label,
      name: pickerContext == null ? void 0 : pickerContext.name,
      className: pickerContext == null ? void 0 : pickerContext.rootClassName,
      inputRef: pickerFieldUIContext.inputRef
    },
    ownerState
  });
  textFieldProps.inputProps = _extends({}, inputProps, textFieldProps.inputProps);
  textFieldProps.InputProps = _extends({}, InputProps, textFieldProps.InputProps);
  return textFieldProps;
}
function PickerFieldUIContextProvider(props) {
  const {
    slots = {},
    slotProps = {},
    inputRef,
    children
  } = props;
  const contextValue = React38.useMemo(() => ({
    inputRef,
    slots: {
      openPickerButton: slots.openPickerButton,
      openPickerIcon: slots.openPickerIcon,
      textField: slots.textField,
      inputAdornment: slots.inputAdornment,
      clearIcon: slots.clearIcon,
      clearButton: slots.clearButton
    },
    slotProps: {
      openPickerButton: slotProps.openPickerButton,
      openPickerIcon: slotProps.openPickerIcon,
      textField: slotProps.textField,
      inputAdornment: slotProps.inputAdornment,
      clearIcon: slotProps.clearIcon,
      clearButton: slotProps.clearButton
    }
  }), [inputRef, slots.openPickerButton, slots.openPickerIcon, slots.textField, slots.inputAdornment, slots.clearIcon, slots.clearButton, slotProps.openPickerButton, slotProps.openPickerIcon, slotProps.textField, slotProps.inputAdornment, slotProps.clearIcon, slotProps.clearButton]);
  return (0, import_jsx_runtime19.jsx)(PickerFieldUIContext.Provider, {
    value: contextValue,
    children
  });
}

// node_modules/@mui/x-date-pickers/esm/internals/utils/createNonRangePickerStepNavigation.js
function createNonRangePickerStepNavigation(parameters) {
  const {
    steps
  } = parameters;
  return createStepNavigation({
    steps,
    isViewMatchingStep: (view, step) => {
      return step.views == null || step.views.includes(view);
    },
    onStepChange: ({
      step,
      defaultView,
      setView,
      view,
      views
    }) => {
      const targetView = step.views == null ? defaultView : step.views.find((viewBis) => views.includes(viewBis));
      if (targetView !== view) {
        setView(targetView);
      }
    }
  });
}

// node_modules/@mui/x-date-pickers/esm/internals/hooks/useDesktopPicker/useDesktopPicker.js
var import_jsx_runtime20 = __toESM(require_jsx_runtime(), 1);
var _excluded18 = ["props", "steps"];
var _excluded24 = ["ownerState"];
var useDesktopPicker = (_ref) => {
  var _a;
  let {
    props,
    steps
  } = _ref, pickerParams = _objectWithoutPropertiesLoose(_ref, _excluded18);
  const {
    slots,
    slotProps: innerSlotProps,
    label,
    inputRef,
    localeText
  } = props;
  const getStepNavigation = createNonRangePickerStepNavigation({
    steps
  });
  const {
    providerProps,
    renderCurrentView,
    ownerState
  } = usePicker(_extends({}, pickerParams, {
    props,
    localeText,
    autoFocusView: true,
    viewContainerRole: "dialog",
    variant: "desktop",
    getStepNavigation
  }));
  const labelId = providerProps.privateContextValue.labelId;
  const isToolbarHidden = ((_a = innerSlotProps == null ? void 0 : innerSlotProps.toolbar) == null ? void 0 : _a.hidden) ?? false;
  const Field = slots.field;
  const _useSlotProps = useSlotProps_default({
    elementType: Field,
    externalSlotProps: innerSlotProps == null ? void 0 : innerSlotProps.field,
    additionalProps: _extends({}, isToolbarHidden && {
      id: labelId
    }),
    ownerState
  }), fieldProps = _objectWithoutPropertiesLoose(_useSlotProps, _excluded24);
  const Layout = slots.layout ?? PickersLayout;
  let labelledById = labelId;
  if (isToolbarHidden) {
    if (label) {
      labelledById = `${labelId}-label`;
    } else {
      labelledById = void 0;
    }
  }
  const slotProps = _extends({}, innerSlotProps, {
    toolbar: _extends({}, innerSlotProps == null ? void 0 : innerSlotProps.toolbar, {
      titleId: labelId
    }),
    popper: _extends({
      "aria-labelledby": labelledById
    }, innerSlotProps == null ? void 0 : innerSlotProps.popper)
  });
  const renderPicker = () => (0, import_jsx_runtime20.jsx)(PickerProvider, _extends({}, providerProps, {
    children: (0, import_jsx_runtime20.jsxs)(PickerFieldUIContextProvider, {
      slots,
      slotProps,
      inputRef,
      children: [(0, import_jsx_runtime20.jsx)(Field, _extends({}, fieldProps)), (0, import_jsx_runtime20.jsx)(PickerPopper, {
        slots,
        slotProps,
        children: (0, import_jsx_runtime20.jsx)(Layout, _extends({}, slotProps == null ? void 0 : slotProps.layout, {
          slots,
          slotProps,
          children: renderCurrentView()
        }))
      })]
    })
  }));
  return {
    renderPicker
  };
};

// node_modules/@mui/x-date-pickers/esm/DateField/DateField.js
var React49 = __toESM(require_react(), 1);
var import_prop_types12 = __toESM(require_prop_types(), 1);

// node_modules/@mui/x-date-pickers/esm/internals/hooks/useField/useFieldV7TextField.js
var React45 = __toESM(require_react(), 1);

// node_modules/@mui/x-date-pickers/esm/internals/hooks/useField/useFieldCharacterEditing.js
var isQueryResponseWithoutValue = (response) => response.saveQuery != null;
var useFieldCharacterEditing = ({
  stateResponse: {
    // States and derived states
    localizedDigits,
    sectionsValueBoundaries,
    state,
    timezone,
    // Methods to update the states
    setCharacterQuery,
    setTempAndroidValueStr,
    updateSectionValue
  }
}) => {
  const utils = useUtils();
  const applyQuery = ({
    keyPressed,
    sectionIndex
  }, getFirstSectionValueMatchingWithQuery, isValidQueryValue) => {
    const cleanKeyPressed = keyPressed.toLowerCase();
    const activeSection = state.sections[sectionIndex];
    if (state.characterQuery != null && (!isValidQueryValue || isValidQueryValue(state.characterQuery.value)) && state.characterQuery.sectionIndex === sectionIndex) {
      const concatenatedQueryValue = `${state.characterQuery.value}${cleanKeyPressed}`;
      const queryResponse2 = getFirstSectionValueMatchingWithQuery(concatenatedQueryValue, activeSection);
      if (!isQueryResponseWithoutValue(queryResponse2)) {
        setCharacterQuery({
          sectionIndex,
          value: concatenatedQueryValue,
          sectionType: activeSection.type
        });
        return queryResponse2;
      }
    }
    const queryResponse = getFirstSectionValueMatchingWithQuery(cleanKeyPressed, activeSection);
    if (isQueryResponseWithoutValue(queryResponse) && !queryResponse.saveQuery) {
      setCharacterQuery(null);
      return null;
    }
    setCharacterQuery({
      sectionIndex,
      value: cleanKeyPressed,
      sectionType: activeSection.type
    });
    if (isQueryResponseWithoutValue(queryResponse)) {
      return null;
    }
    return queryResponse;
  };
  const applyLetterEditing = (params) => {
    const findMatchingOptions = (format, options, queryValue) => {
      const matchingValues = options.filter((option) => option.toLowerCase().startsWith(queryValue));
      if (matchingValues.length === 0) {
        return {
          saveQuery: false
        };
      }
      return {
        sectionValue: matchingValues[0],
        shouldGoToNextSection: matchingValues.length === 1
      };
    };
    const testQueryOnFormatAndFallbackFormat = (queryValue, activeSection, fallbackFormat, formatFallbackValue) => {
      const getOptions = (format) => getLetterEditingOptions(utils, timezone, activeSection.type, format);
      if (activeSection.contentType === "letter") {
        return findMatchingOptions(activeSection.format, getOptions(activeSection.format), queryValue);
      }
      if (fallbackFormat && formatFallbackValue != null && getDateSectionConfigFromFormatToken(utils, fallbackFormat).contentType === "letter") {
        const fallbackOptions = getOptions(fallbackFormat);
        const response = findMatchingOptions(fallbackFormat, fallbackOptions, queryValue);
        if (isQueryResponseWithoutValue(response)) {
          return {
            saveQuery: false
          };
        }
        return _extends({}, response, {
          sectionValue: formatFallbackValue(response.sectionValue, fallbackOptions)
        });
      }
      return {
        saveQuery: false
      };
    };
    const getFirstSectionValueMatchingWithQuery = (queryValue, activeSection) => {
      switch (activeSection.type) {
        case "month": {
          const formatFallbackValue = (fallbackValue) => changeSectionValueFormat(utils, fallbackValue, utils.formats.month, activeSection.format);
          return testQueryOnFormatAndFallbackFormat(queryValue, activeSection, utils.formats.month, formatFallbackValue);
        }
        case "weekDay": {
          const formatFallbackValue = (fallbackValue, fallbackOptions) => fallbackOptions.indexOf(fallbackValue).toString();
          return testQueryOnFormatAndFallbackFormat(queryValue, activeSection, utils.formats.weekday, formatFallbackValue);
        }
        case "meridiem": {
          return testQueryOnFormatAndFallbackFormat(queryValue, activeSection);
        }
        default: {
          return {
            saveQuery: false
          };
        }
      }
    };
    return applyQuery(params, getFirstSectionValueMatchingWithQuery);
  };
  const applyNumericEditing = (params) => {
    const getNewSectionValue = (queryValue, section) => {
      const cleanQueryValue = removeLocalizedDigits(queryValue, localizedDigits);
      const queryValueNumber = Number(cleanQueryValue);
      const sectionBoundaries = sectionsValueBoundaries[section.type]({
        currentDate: null,
        format: section.format,
        contentType: section.contentType
      });
      if (queryValueNumber > sectionBoundaries.maximum) {
        return {
          saveQuery: false
        };
      }
      if (queryValueNumber < sectionBoundaries.minimum) {
        return {
          saveQuery: true
        };
      }
      const shouldGoToNextSection = queryValueNumber * 10 > sectionBoundaries.maximum || cleanQueryValue.length === sectionBoundaries.maximum.toString().length;
      const newSectionValue = cleanDigitSectionValue(utils, queryValueNumber, sectionBoundaries, localizedDigits, section);
      return {
        sectionValue: newSectionValue,
        shouldGoToNextSection
      };
    };
    const getFirstSectionValueMatchingWithQuery = (queryValue, activeSection) => {
      if (activeSection.contentType === "digit" || activeSection.contentType === "digit-with-letter") {
        return getNewSectionValue(queryValue, activeSection);
      }
      if (activeSection.type === "month") {
        const hasLeadingZerosInFormat = doesSectionFormatHaveLeadingZeros(utils, "digit", "month", "MM");
        const response = getNewSectionValue(queryValue, {
          type: activeSection.type,
          format: "MM",
          hasLeadingZerosInFormat,
          hasLeadingZerosInInput: true,
          contentType: "digit",
          maxLength: 2
        });
        if (isQueryResponseWithoutValue(response)) {
          return response;
        }
        const formattedValue = changeSectionValueFormat(utils, response.sectionValue, "MM", activeSection.format);
        return _extends({}, response, {
          sectionValue: formattedValue
        });
      }
      if (activeSection.type === "weekDay") {
        const response = getNewSectionValue(queryValue, activeSection);
        if (isQueryResponseWithoutValue(response)) {
          return response;
        }
        const formattedValue = getDaysInWeekStr(utils, activeSection.format)[Number(response.sectionValue) - 1];
        return _extends({}, response, {
          sectionValue: formattedValue
        });
      }
      return {
        saveQuery: false
      };
    };
    return applyQuery(params, getFirstSectionValueMatchingWithQuery, (queryValue) => isStringNumber(queryValue, localizedDigits));
  };
  return useEventCallback_default((params) => {
    const section = state.sections[params.sectionIndex];
    const isNumericEditing = isStringNumber(params.keyPressed, localizedDigits);
    const response = isNumericEditing ? applyNumericEditing(_extends({}, params, {
      keyPressed: applyLocalizedDigits(params.keyPressed, localizedDigits)
    })) : applyLetterEditing(params);
    if (response == null) {
      setTempAndroidValueStr(null);
      return;
    }
    updateSectionValue({
      section,
      newSectionValue: response.sectionValue,
      shouldGoToNextSection: response.shouldGoToNextSection
    });
  });
};

// node_modules/@mui/x-date-pickers/esm/internals/hooks/useField/useFieldState.js
var React40 = __toESM(require_react(), 1);
var QUERY_LIFE_DURATION_MS = 5e3;
var useFieldState = (parameters) => {
  var _a;
  const utils = useUtils();
  const translations = usePickerTranslations();
  const adapter = useLocalizationContext();
  const isRtl = useRtl();
  const {
    manager: {
      validator,
      valueType,
      internal_valueManager: valueManager,
      internal_fieldValueManager: fieldValueManager
    },
    internalPropsWithDefaults,
    internalPropsWithDefaults: {
      value: valueProp,
      defaultValue,
      referenceDate: referenceDateProp,
      onChange,
      format,
      formatDensity = "dense",
      selectedSections: selectedSectionsProp,
      onSelectedSectionsChange,
      shouldRespectLeadingZeros = false,
      timezone: timezoneProp,
      enableAccessibleFieldDOMStructure = true
    },
    forwardedProps: {
      error: errorProp
    }
  } = parameters;
  const {
    value,
    handleValueChange,
    timezone
  } = useControlledValue({
    name: "a field component",
    timezone: timezoneProp,
    value: valueProp,
    defaultValue,
    referenceDate: referenceDateProp,
    onChange,
    valueManager
  });
  const valueRef = React40.useRef(value);
  React40.useEffect(() => {
    valueRef.current = value;
  }, [value]);
  const {
    hasValidationError
  } = useValidation({
    props: internalPropsWithDefaults,
    validator,
    timezone,
    value,
    onError: internalPropsWithDefaults.onError
  });
  const error = React40.useMemo(() => {
    if (errorProp !== void 0) {
      return errorProp;
    }
    return hasValidationError;
  }, [hasValidationError, errorProp]);
  const localizedDigits = React40.useMemo(() => getLocalizedDigits(utils), [utils]);
  const sectionsValueBoundaries = React40.useMemo(() => getSectionsBoundaries(utils, localizedDigits, timezone), [utils, localizedDigits, timezone]);
  const getSectionsFromValue = React40.useCallback((valueToAnalyze) => fieldValueManager.getSectionsFromValue(valueToAnalyze, (date) => buildSectionsFromFormat({
    utils,
    localeText: translations,
    localizedDigits,
    format,
    date,
    formatDensity,
    shouldRespectLeadingZeros,
    enableAccessibleFieldDOMStructure,
    isRtl
  })), [fieldValueManager, format, translations, localizedDigits, isRtl, shouldRespectLeadingZeros, utils, formatDensity, enableAccessibleFieldDOMStructure]);
  const [state, setState] = React40.useState(() => {
    const sections = getSectionsFromValue(value);
    validateSections(sections, valueType);
    const stateWithoutReferenceDate = {
      sections,
      lastExternalValue: value,
      lastSectionsDependencies: {
        format,
        isRtl,
        locale: utils.locale
      },
      tempValueStrAndroid: null,
      characterQuery: null
    };
    const granularity = getSectionTypeGranularity(sections);
    const referenceValue = valueManager.getInitialReferenceValue({
      referenceDate: referenceDateProp,
      value,
      utils,
      props: internalPropsWithDefaults,
      granularity,
      timezone
    });
    return _extends({}, stateWithoutReferenceDate, {
      referenceValue
    });
  });
  const [selectedSections, innerSetSelectedSections] = useControlled({
    controlled: selectedSectionsProp,
    default: null,
    name: "useField",
    state: "selectedSections"
  });
  const setSelectedSections = (newSelectedSections) => {
    innerSetSelectedSections(newSelectedSections);
    onSelectedSectionsChange == null ? void 0 : onSelectedSectionsChange(newSelectedSections);
  };
  const parsedSelectedSections = React40.useMemo(() => parseSelectedSections(selectedSections, state.sections), [selectedSections, state.sections]);
  const activeSectionIndex = parsedSelectedSections === "all" ? 0 : parsedSelectedSections;
  const sectionOrder = React40.useMemo(() => getSectionOrder(state.sections, isRtl && !enableAccessibleFieldDOMStructure), [state.sections, isRtl, enableAccessibleFieldDOMStructure]);
  const areAllSectionsEmpty = React40.useMemo(() => state.sections.every((section) => section.value === ""), [state.sections]);
  const publishValue = (newValue) => {
    const context = {
      validationError: validator({
        adapter,
        value: newValue,
        timezone,
        props: internalPropsWithDefaults
      })
    };
    handleValueChange(newValue, context);
  };
  const setSectionValue = (sectionIndex, newSectionValue) => {
    const newSections = [...state.sections];
    newSections[sectionIndex] = _extends({}, newSections[sectionIndex], {
      value: newSectionValue,
      modified: true
    });
    return newSections;
  };
  const sectionToUpdateOnNextInvalidDateRef = React40.useRef(null);
  const updateSectionValueOnNextInvalidDateTimeout = useTimeout();
  const setSectionUpdateToApplyOnNextInvalidDate = (newSectionValue) => {
    if (activeSectionIndex == null) {
      return;
    }
    sectionToUpdateOnNextInvalidDateRef.current = {
      sectionIndex: activeSectionIndex,
      value: newSectionValue
    };
    updateSectionValueOnNextInvalidDateTimeout.start(0, () => {
      sectionToUpdateOnNextInvalidDateRef.current = null;
    });
  };
  const clearValue = () => {
    if (valueManager.areValuesEqual(utils, value, valueManager.emptyValue)) {
      setState((prevState) => _extends({}, prevState, {
        sections: prevState.sections.map((section) => _extends({}, section, {
          value: ""
        })),
        tempValueStrAndroid: null,
        characterQuery: null
      }));
    } else {
      setState((prevState) => _extends({}, prevState, {
        characterQuery: null
      }));
      publishValue(valueManager.emptyValue);
    }
  };
  const clearActiveSection = () => {
    if (activeSectionIndex == null) {
      return;
    }
    const activeSection = state.sections[activeSectionIndex];
    if (activeSection.value === "") {
      return;
    }
    setSectionUpdateToApplyOnNextInvalidDate("");
    if (fieldValueManager.getDateFromSection(value, activeSection) === null) {
      setState((prevState) => _extends({}, prevState, {
        sections: setSectionValue(activeSectionIndex, ""),
        tempValueStrAndroid: null,
        characterQuery: null
      }));
    } else {
      setState((prevState) => _extends({}, prevState, {
        characterQuery: null
      }));
      publishValue(fieldValueManager.updateDateInValue(value, activeSection, null));
    }
  };
  const updateValueFromValueStr = (valueStr) => {
    const parseDateStr = (dateStr, referenceDate) => {
      const date = utils.parse(dateStr, format);
      if (!utils.isValid(date)) {
        return null;
      }
      const sections = buildSectionsFromFormat({
        utils,
        localeText: translations,
        localizedDigits,
        format,
        date,
        formatDensity,
        shouldRespectLeadingZeros,
        enableAccessibleFieldDOMStructure,
        isRtl
      });
      return mergeDateIntoReferenceDate(utils, date, sections, referenceDate, false);
    };
    const newValue = fieldValueManager.parseValueStr(valueStr, state.referenceValue, parseDateStr);
    publishValue(newValue);
  };
  const cleanActiveDateSectionsIfValueNullTimeout = useTimeout();
  const updateSectionValue = ({
    section,
    newSectionValue,
    shouldGoToNextSection
  }) => {
    updateSectionValueOnNextInvalidDateTimeout.clear();
    cleanActiveDateSectionsIfValueNullTimeout.clear();
    const activeDate = fieldValueManager.getDateFromSection(value, section);
    if (shouldGoToNextSection && activeSectionIndex < state.sections.length - 1) {
      setSelectedSections(activeSectionIndex + 1);
    }
    const newSections = setSectionValue(activeSectionIndex, newSectionValue);
    const newActiveDateSections = fieldValueManager.getDateSectionsFromValue(newSections, section);
    const newActiveDate = getDateFromDateSections(utils, newActiveDateSections, localizedDigits);
    if (utils.isValid(newActiveDate)) {
      const mergedDate = mergeDateIntoReferenceDate(utils, newActiveDate, newActiveDateSections, fieldValueManager.getDateFromSection(state.referenceValue, section), true);
      if (activeDate == null) {
        cleanActiveDateSectionsIfValueNullTimeout.start(0, () => {
          if (valueRef.current === value) {
            setState((prevState) => _extends({}, prevState, {
              sections: fieldValueManager.clearDateSections(state.sections, section),
              tempValueStrAndroid: null
            }));
          }
        });
      }
      return publishValue(fieldValueManager.updateDateInValue(value, section, mergedDate));
    }
    if (newActiveDateSections.every((sectionBis) => sectionBis.value !== "")) {
      setSectionUpdateToApplyOnNextInvalidDate(newSectionValue);
      return publishValue(fieldValueManager.updateDateInValue(value, section, newActiveDate));
    }
    if (activeDate != null) {
      setSectionUpdateToApplyOnNextInvalidDate(newSectionValue);
      return publishValue(fieldValueManager.updateDateInValue(value, section, null));
    }
    return setState((prevState) => _extends({}, prevState, {
      sections: newSections,
      tempValueStrAndroid: null
    }));
  };
  const setTempAndroidValueStr = (tempValueStrAndroid) => setState((prevState) => _extends({}, prevState, {
    tempValueStrAndroid
  }));
  const setCharacterQuery = useEventCallback_default((newCharacterQuery) => {
    setState((prevState) => _extends({}, prevState, {
      characterQuery: newCharacterQuery
    }));
  });
  if (value !== state.lastExternalValue) {
    let sections;
    if (sectionToUpdateOnNextInvalidDateRef.current != null && !utils.isValid(fieldValueManager.getDateFromSection(value, state.sections[sectionToUpdateOnNextInvalidDateRef.current.sectionIndex]))) {
      sections = setSectionValue(sectionToUpdateOnNextInvalidDateRef.current.sectionIndex, sectionToUpdateOnNextInvalidDateRef.current.value);
    } else {
      sections = getSectionsFromValue(value);
    }
    setState((prevState) => _extends({}, prevState, {
      lastExternalValue: value,
      sections,
      sectionsDependencies: {
        format,
        isRtl,
        locale: utils.locale
      },
      referenceValue: fieldValueManager.updateReferenceValue(utils, value, prevState.referenceValue),
      tempValueStrAndroid: null
    }));
  }
  if (isRtl !== state.lastSectionsDependencies.isRtl || format !== state.lastSectionsDependencies.format || utils.locale !== state.lastSectionsDependencies.locale) {
    const sections = getSectionsFromValue(value);
    validateSections(sections, valueType);
    setState((prevState) => _extends({}, prevState, {
      lastSectionsDependencies: {
        format,
        isRtl,
        locale: utils.locale
      },
      sections,
      tempValueStrAndroid: null,
      characterQuery: null
    }));
  }
  if (state.characterQuery != null && !error && activeSectionIndex == null) {
    setCharacterQuery(null);
  }
  if (state.characterQuery != null && ((_a = state.sections[state.characterQuery.sectionIndex]) == null ? void 0 : _a.type) !== state.characterQuery.sectionType) {
    setCharacterQuery(null);
  }
  React40.useEffect(() => {
    if (sectionToUpdateOnNextInvalidDateRef.current != null) {
      sectionToUpdateOnNextInvalidDateRef.current = null;
    }
  });
  const cleanCharacterQueryTimeout = useTimeout();
  React40.useEffect(() => {
    if (state.characterQuery != null) {
      cleanCharacterQueryTimeout.start(QUERY_LIFE_DURATION_MS, () => setCharacterQuery(null));
    }
    return () => {
    };
  }, [state.characterQuery, setCharacterQuery, cleanCharacterQueryTimeout]);
  React40.useEffect(() => {
    if (state.tempValueStrAndroid != null && activeSectionIndex != null) {
      clearActiveSection();
    }
  }, [state.sections]);
  return {
    // States and derived states
    activeSectionIndex,
    areAllSectionsEmpty,
    error,
    localizedDigits,
    parsedSelectedSections,
    sectionOrder,
    sectionsValueBoundaries,
    state,
    timezone,
    value,
    // Methods to update the states
    clearValue,
    clearActiveSection,
    setCharacterQuery,
    setSelectedSections,
    setTempAndroidValueStr,
    updateSectionValue,
    updateValueFromValueStr,
    // Utilities methods
    getSectionsFromValue
  };
};

// node_modules/@mui/x-date-pickers/esm/internals/hooks/useField/useFieldInternalPropsWithDefaults.js
var React41 = __toESM(require_react(), 1);
function useFieldInternalPropsWithDefaults(parameters) {
  const {
    manager: {
      internal_useApplyDefaultValuesToFieldInternalProps: useApplyDefaultValuesToFieldInternalProps
    },
    internalProps,
    skipContextFieldRefAssignment
  } = parameters;
  const pickerContext = useNullablePickerContext();
  const fieldPrivateContext = useNullableFieldPrivateContext();
  const handleFieldRef = useForkRef(internalProps.unstableFieldRef, skipContextFieldRefAssignment ? null : fieldPrivateContext == null ? void 0 : fieldPrivateContext.fieldRef);
  const setValue = pickerContext == null ? void 0 : pickerContext.setValue;
  const handleChangeFromPicker = React41.useCallback((newValue, ctx) => {
    return setValue == null ? void 0 : setValue(newValue, {
      validationError: ctx.validationError,
      shouldClose: false
    });
  }, [setValue]);
  const internalPropsWithDefaultsFromContext = React41.useMemo(() => {
    if (fieldPrivateContext != null && pickerContext != null) {
      return _extends({
        value: pickerContext.value,
        onChange: handleChangeFromPicker,
        timezone: pickerContext.timezone,
        disabled: pickerContext.disabled,
        readOnly: pickerContext.readOnly,
        autoFocus: pickerContext.autoFocus && !pickerContext.open,
        focused: pickerContext.open ? true : void 0,
        format: pickerContext.fieldFormat,
        formatDensity: fieldPrivateContext.formatDensity,
        enableAccessibleFieldDOMStructure: fieldPrivateContext.enableAccessibleFieldDOMStructure,
        selectedSections: fieldPrivateContext.selectedSections,
        onSelectedSectionsChange: fieldPrivateContext.onSelectedSectionsChange,
        unstableFieldRef: handleFieldRef
      }, internalProps);
    }
    return internalProps;
  }, [pickerContext, fieldPrivateContext, internalProps, handleChangeFromPicker, handleFieldRef]);
  return useApplyDefaultValuesToFieldInternalProps(internalPropsWithDefaultsFromContext);
}

// node_modules/@mui/x-date-pickers/esm/internals/hooks/useField/syncSelectionToDOM.js
function syncSelectionToDOM(parameters) {
  const {
    focused,
    domGetters,
    stateResponse: {
      // States and derived states
      parsedSelectedSections,
      state
    }
  } = parameters;
  if (!domGetters.isReady()) {
    return;
  }
  const selection = document.getSelection();
  if (!selection) {
    return;
  }
  if (parsedSelectedSections == null) {
    if (selection.rangeCount > 0 && domGetters.getRoot().contains(selection.getRangeAt(0).startContainer)) {
      selection.removeAllRanges();
    }
    if (focused) {
      domGetters.getRoot().blur();
    }
    return;
  }
  if (!domGetters.getRoot().contains(getActiveElement(document))) {
    return;
  }
  const range = new window.Range();
  let target;
  if (parsedSelectedSections === "all") {
    target = domGetters.getRoot();
  } else {
    const section = state.sections[parsedSelectedSections];
    if (section.type === "empty") {
      target = domGetters.getSectionContainer(parsedSelectedSections);
    } else {
      target = domGetters.getSectionContent(parsedSelectedSections);
    }
  }
  range.selectNodeContents(target);
  target.focus();
  selection.removeAllRanges();
  selection.addRange(range);
}

// node_modules/@mui/x-date-pickers/esm/internals/hooks/useField/useFieldRootHandleKeyDown.js
function useFieldRootHandleKeyDown(parameters) {
  const utils = useUtils();
  const {
    manager: {
      internal_fieldValueManager: fieldValueManager
    },
    internalPropsWithDefaults: {
      minutesStep,
      disabled,
      readOnly
    },
    stateResponse: {
      // States and derived states
      state,
      value,
      activeSectionIndex,
      parsedSelectedSections,
      sectionsValueBoundaries,
      localizedDigits,
      timezone,
      sectionOrder,
      // Methods to update the states
      clearValue,
      clearActiveSection,
      setSelectedSections,
      updateSectionValue
    }
  } = parameters;
  return useEventCallback_default((event) => {
    if (disabled) {
      return;
    }
    switch (true) {
      // Select all
      case ((event.ctrlKey || event.metaKey) && String.fromCharCode(event.keyCode) === "A" && !event.shiftKey && !event.altKey): {
        event.preventDefault();
        setSelectedSections("all");
        break;
      }
      // Move selection to next section
      case event.key === "ArrowRight": {
        event.preventDefault();
        if (parsedSelectedSections == null) {
          setSelectedSections(sectionOrder.startIndex);
        } else if (parsedSelectedSections === "all") {
          setSelectedSections(sectionOrder.endIndex);
        } else {
          const nextSectionIndex = sectionOrder.neighbors[parsedSelectedSections].rightIndex;
          if (nextSectionIndex !== null) {
            setSelectedSections(nextSectionIndex);
          }
        }
        break;
      }
      // Move selection to previous section
      case event.key === "ArrowLeft": {
        event.preventDefault();
        if (parsedSelectedSections == null) {
          setSelectedSections(sectionOrder.endIndex);
        } else if (parsedSelectedSections === "all") {
          setSelectedSections(sectionOrder.startIndex);
        } else {
          const nextSectionIndex = sectionOrder.neighbors[parsedSelectedSections].leftIndex;
          if (nextSectionIndex !== null) {
            setSelectedSections(nextSectionIndex);
          }
        }
        break;
      }
      // Reset the value of the selected section
      case event.key === "Delete": {
        event.preventDefault();
        if (readOnly) {
          break;
        }
        if (parsedSelectedSections == null || parsedSelectedSections === "all") {
          clearValue();
        } else {
          clearActiveSection();
        }
        break;
      }
      // Increment / decrement the selected section value
      case ["ArrowUp", "ArrowDown", "Home", "End", "PageUp", "PageDown"].includes(event.key): {
        event.preventDefault();
        if (readOnly || activeSectionIndex == null) {
          break;
        }
        if (parsedSelectedSections === "all") {
          setSelectedSections(activeSectionIndex);
        }
        const activeSection = state.sections[activeSectionIndex];
        const newSectionValue = adjustSectionValue(utils, timezone, activeSection, event.key, sectionsValueBoundaries, localizedDigits, fieldValueManager.getDateFromSection(value, activeSection), {
          minutesStep
        });
        updateSectionValue({
          section: activeSection,
          newSectionValue,
          shouldGoToNextSection: false
        });
        break;
      }
    }
  });
}
function getDeltaFromKeyCode(keyCode) {
  switch (keyCode) {
    case "ArrowUp":
      return 1;
    case "ArrowDown":
      return -1;
    case "PageUp":
      return 5;
    case "PageDown":
      return -5;
    default:
      return 0;
  }
}
function adjustSectionValue(utils, timezone, section, keyCode, sectionsValueBoundaries, localizedDigits, activeDate, stepsAttributes) {
  const delta = getDeltaFromKeyCode(keyCode);
  const isStart = keyCode === "Home";
  const isEnd = keyCode === "End";
  const shouldSetAbsolute = section.value === "" || isStart || isEnd;
  const adjustDigitSection = () => {
    const sectionBoundaries = sectionsValueBoundaries[section.type]({
      currentDate: activeDate,
      format: section.format,
      contentType: section.contentType
    });
    const getCleanValue = (value) => cleanDigitSectionValue(utils, value, sectionBoundaries, localizedDigits, section);
    const step = section.type === "minutes" && (stepsAttributes == null ? void 0 : stepsAttributes.minutesStep) ? stepsAttributes.minutesStep : 1;
    let newSectionValueNumber;
    if (shouldSetAbsolute) {
      if (section.type === "year" && !isEnd && !isStart) {
        return utils.formatByString(utils.date(void 0, timezone), section.format);
      }
      if (delta > 0 || isStart) {
        newSectionValueNumber = sectionBoundaries.minimum;
      } else {
        newSectionValueNumber = sectionBoundaries.maximum;
      }
    } else {
      const currentSectionValue = parseInt(removeLocalizedDigits(section.value, localizedDigits), 10);
      newSectionValueNumber = currentSectionValue + delta * step;
    }
    if (newSectionValueNumber % step !== 0) {
      if (delta < 0 || isStart) {
        newSectionValueNumber += step - (step + newSectionValueNumber) % step;
      }
      if (delta > 0 || isEnd) {
        newSectionValueNumber -= newSectionValueNumber % step;
      }
    }
    if (newSectionValueNumber > sectionBoundaries.maximum) {
      return getCleanValue(sectionBoundaries.minimum + (newSectionValueNumber - sectionBoundaries.maximum - 1) % (sectionBoundaries.maximum - sectionBoundaries.minimum + 1));
    }
    if (newSectionValueNumber < sectionBoundaries.minimum) {
      return getCleanValue(sectionBoundaries.maximum - (sectionBoundaries.minimum - newSectionValueNumber - 1) % (sectionBoundaries.maximum - sectionBoundaries.minimum + 1));
    }
    return getCleanValue(newSectionValueNumber);
  };
  const adjustLetterSection = () => {
    const options = getLetterEditingOptions(utils, timezone, section.type, section.format);
    if (options.length === 0) {
      return section.value;
    }
    if (shouldSetAbsolute) {
      if (delta > 0 || isStart) {
        return options[0];
      }
      return options[options.length - 1];
    }
    const currentOptionIndex = options.indexOf(section.value);
    const newOptionIndex = (currentOptionIndex + delta) % options.length;
    const clampedIndex = (newOptionIndex + options.length) % options.length;
    return options[clampedIndex];
  };
  if (section.contentType === "digit" || section.contentType === "digit-with-letter") {
    return adjustDigitSection();
  }
  return adjustLetterSection();
}

// node_modules/@mui/x-date-pickers/esm/internals/hooks/useField/useFieldRootProps.js
function useFieldRootProps(parameters) {
  const {
    manager,
    focused,
    setFocused,
    domGetters,
    stateResponse,
    applyCharacterEditing,
    internalPropsWithDefaults,
    stateResponse: {
      // States and derived states
      parsedSelectedSections,
      sectionOrder,
      state,
      // Methods to update the states
      clearValue,
      setCharacterQuery,
      setSelectedSections,
      updateValueFromValueStr
    },
    internalPropsWithDefaults: {
      disabled = false,
      readOnly = false
    }
  } = parameters;
  const handleKeyDown = useFieldRootHandleKeyDown({
    manager,
    internalPropsWithDefaults,
    stateResponse
  });
  const containerClickTimeout = useTimeout();
  const handleClick = useEventCallback_default((event) => {
    if (disabled || !domGetters.isReady()) {
      return;
    }
    setFocused(true);
    if (parsedSelectedSections === "all") {
      containerClickTimeout.start(0, () => {
        const cursorPosition = document.getSelection().getRangeAt(0).startOffset;
        if (cursorPosition === 0) {
          setSelectedSections(sectionOrder.startIndex);
          return;
        }
        let sectionIndex = 0;
        let cursorOnStartOfSection = 0;
        while (cursorOnStartOfSection < cursorPosition && sectionIndex < state.sections.length) {
          const section = state.sections[sectionIndex];
          sectionIndex += 1;
          cursorOnStartOfSection += `${section.startSeparator}${section.value || section.placeholder}${section.endSeparator}`.length;
        }
        setSelectedSections(sectionIndex - 1);
      });
    } else if (!focused) {
      setFocused(true);
      setSelectedSections(sectionOrder.startIndex);
    } else {
      const hasClickedOnASection = domGetters.getRoot().contains(event.target);
      if (!hasClickedOnASection) {
        setSelectedSections(sectionOrder.startIndex);
      }
    }
  });
  const handleInput = useEventCallback_default((event) => {
    if (!domGetters.isReady() || parsedSelectedSections !== "all") {
      return;
    }
    const target = event.target;
    const keyPressed = target.textContent ?? "";
    domGetters.getRoot().innerHTML = state.sections.map((section) => `${section.startSeparator}${section.value || section.placeholder}${section.endSeparator}`).join("");
    syncSelectionToDOM({
      focused,
      domGetters,
      stateResponse
    });
    if (keyPressed.length === 0 || keyPressed.charCodeAt(0) === 10) {
      clearValue();
      setSelectedSections("all");
    } else if (keyPressed.length > 1) {
      updateValueFromValueStr(keyPressed);
    } else {
      if (parsedSelectedSections === "all") {
        setSelectedSections(0);
      }
      applyCharacterEditing({
        keyPressed,
        sectionIndex: 0
      });
    }
  });
  const handlePaste = useEventCallback_default((event) => {
    if (readOnly || parsedSelectedSections !== "all") {
      event.preventDefault();
      return;
    }
    const pastedValue = event.clipboardData.getData("text");
    event.preventDefault();
    setCharacterQuery(null);
    updateValueFromValueStr(pastedValue);
  });
  const handleFocus = useEventCallback_default(() => {
    if (focused || disabled || !domGetters.isReady()) {
      return;
    }
    const activeElement = getActiveElement(document);
    setFocused(true);
    const isFocusInsideASection = domGetters.getSectionIndexFromDOMElement(activeElement) != null;
    if (!isFocusInsideASection) {
      setSelectedSections(sectionOrder.startIndex);
    }
  });
  const handleBlur = useEventCallback_default(() => {
    setTimeout(() => {
      if (!domGetters.isReady()) {
        return;
      }
      const activeElement = getActiveElement(document);
      const shouldBlur = !domGetters.getRoot().contains(activeElement);
      if (shouldBlur) {
        setFocused(false);
        setSelectedSections(null);
      }
    });
  });
  return {
    // Event handlers
    onKeyDown: handleKeyDown,
    onBlur: handleBlur,
    onFocus: handleFocus,
    onClick: handleClick,
    onPaste: handlePaste,
    onInput: handleInput,
    // Other
    contentEditable: parsedSelectedSections === "all",
    tabIndex: parsedSelectedSections === 0 ? -1 : 0
    // TODO: Try to set to undefined when there is a section selected.
  };
}

// node_modules/@mui/x-date-pickers/esm/internals/hooks/useField/useFieldHiddenInputProps.js
var React42 = __toESM(require_react(), 1);
function useFieldHiddenInputProps(parameters) {
  const {
    manager: {
      internal_fieldValueManager: fieldValueManager
    },
    stateResponse: {
      // States and derived states
      areAllSectionsEmpty,
      state,
      // Methods to update the states
      updateValueFromValueStr
    }
  } = parameters;
  const handleChange = useEventCallback_default((event) => {
    updateValueFromValueStr(event.target.value);
  });
  const valueStr = React42.useMemo(() => areAllSectionsEmpty ? "" : fieldValueManager.getV7HiddenInputValueFromSections(state.sections), [areAllSectionsEmpty, state.sections, fieldValueManager]);
  return {
    value: valueStr,
    onChange: handleChange
  };
}

// node_modules/@mui/x-date-pickers/esm/internals/hooks/useField/useFieldSectionContainerProps.js
var React43 = __toESM(require_react(), 1);
function useFieldSectionContainerProps(parameters) {
  const {
    stateResponse: {
      // Methods to update the states
      setSelectedSections
    },
    internalPropsWithDefaults: {
      disabled = false
    }
  } = parameters;
  const createHandleClick = useEventCallback_default((sectionIndex) => (event) => {
    if (disabled || event.isDefaultPrevented()) {
      return;
    }
    setSelectedSections(sectionIndex);
  });
  return React43.useCallback((sectionIndex) => ({
    "data-sectionindex": sectionIndex,
    onClick: createHandleClick(sectionIndex)
  }), [createHandleClick]);
}

// node_modules/@mui/x-date-pickers/esm/internals/hooks/useField/useFieldSectionContentProps.js
var React44 = __toESM(require_react(), 1);
function useFieldSectionContentProps(parameters) {
  const utils = useUtils();
  const translations = usePickerTranslations();
  const id = useId();
  const {
    focused,
    domGetters,
    stateResponse,
    applyCharacterEditing,
    manager: {
      internal_fieldValueManager: fieldValueManager
    },
    stateResponse: {
      // States and derived states
      parsedSelectedSections,
      sectionsValueBoundaries,
      state,
      value,
      // Methods to update the states
      clearActiveSection,
      setCharacterQuery,
      setSelectedSections,
      updateSectionValue,
      updateValueFromValueStr
    },
    internalPropsWithDefaults: {
      disabled = false,
      readOnly = false
    }
  } = parameters;
  const isContainerEditable = parsedSelectedSections === "all";
  const isEditable = !isContainerEditable && !disabled && !readOnly;
  const revertDOMSectionChange = useEventCallback_default((sectionIndex) => {
    if (!domGetters.isReady()) {
      return;
    }
    const section = state.sections[sectionIndex];
    domGetters.getSectionContent(sectionIndex).innerHTML = section.value || section.placeholder;
    syncSelectionToDOM({
      focused,
      domGetters,
      stateResponse
    });
  });
  const handleInput = useEventCallback_default((event) => {
    if (!domGetters.isReady()) {
      return;
    }
    const target = event.target;
    const keyPressed = target.textContent ?? "";
    const sectionIndex = domGetters.getSectionIndexFromDOMElement(target);
    const section = state.sections[sectionIndex];
    if (readOnly) {
      revertDOMSectionChange(sectionIndex);
      return;
    }
    if (keyPressed.length === 0) {
      if (section.value === "") {
        revertDOMSectionChange(sectionIndex);
        return;
      }
      const inputType = event.nativeEvent.inputType;
      if (inputType === "insertParagraph" || inputType === "insertLineBreak") {
        revertDOMSectionChange(sectionIndex);
        return;
      }
      revertDOMSectionChange(sectionIndex);
      clearActiveSection();
      return;
    }
    applyCharacterEditing({
      keyPressed,
      sectionIndex
    });
    revertDOMSectionChange(sectionIndex);
  });
  const handleMouseUp = useEventCallback_default((event) => {
    event.preventDefault();
  });
  const handlePaste = useEventCallback_default((event) => {
    event.preventDefault();
    if (readOnly || disabled || typeof parsedSelectedSections !== "number") {
      return;
    }
    const activeSection = state.sections[parsedSelectedSections];
    const pastedValue = event.clipboardData.getData("text");
    const lettersOnly = /^[a-zA-Z]+$/.test(pastedValue);
    const digitsOnly = /^[0-9]+$/.test(pastedValue);
    const digitsAndLetterOnly = /^(([a-zA-Z]+)|)([0-9]+)(([a-zA-Z]+)|)$/.test(pastedValue);
    const isValidPastedValue = activeSection.contentType === "letter" && lettersOnly || activeSection.contentType === "digit" && digitsOnly || activeSection.contentType === "digit-with-letter" && digitsAndLetterOnly;
    if (isValidPastedValue) {
      setCharacterQuery(null);
      updateSectionValue({
        section: activeSection,
        newSectionValue: pastedValue,
        shouldGoToNextSection: true
      });
    } else if (!lettersOnly && !digitsOnly) {
      setCharacterQuery(null);
      updateValueFromValueStr(pastedValue);
    }
  });
  const handleDragOver = useEventCallback_default((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "none";
  });
  const createFocusHandler = useEventCallback_default((sectionIndex) => () => {
    if (disabled) {
      return;
    }
    setSelectedSections(sectionIndex);
  });
  return React44.useCallback((section, sectionIndex) => {
    const sectionBoundaries = sectionsValueBoundaries[section.type]({
      currentDate: fieldValueManager.getDateFromSection(value, section),
      contentType: section.contentType,
      format: section.format
    });
    return {
      // Event handlers
      onInput: handleInput,
      onPaste: handlePaste,
      onMouseUp: handleMouseUp,
      onDragOver: handleDragOver,
      onFocus: createFocusHandler(sectionIndex),
      // Aria attributes
      "aria-labelledby": `${id}-${section.type}`,
      "aria-readonly": readOnly,
      "aria-valuenow": getSectionValueNow(section, utils),
      "aria-valuemin": sectionBoundaries.minimum,
      "aria-valuemax": sectionBoundaries.maximum,
      "aria-valuetext": section.value ? getSectionValueText(section, utils) : translations.empty,
      "aria-label": translations[section.type],
      "aria-disabled": disabled,
      // Other
      tabIndex: isContainerEditable || sectionIndex > 0 ? -1 : 0,
      contentEditable: !isContainerEditable && !disabled && !readOnly,
      role: "spinbutton",
      id: `${id}-${section.type}`,
      "data-range-position": section.dateName || void 0,
      spellCheck: isEditable ? false : void 0,
      autoCapitalize: isEditable ? "off" : void 0,
      autoCorrect: isEditable ? "off" : void 0,
      children: section.value || section.placeholder,
      inputMode: section.contentType === "letter" ? "text" : "numeric"
    };
  }, [sectionsValueBoundaries, id, isContainerEditable, disabled, readOnly, isEditable, translations, utils, handleInput, handlePaste, handleMouseUp, handleDragOver, createFocusHandler, fieldValueManager, value]);
}
function getSectionValueText(section, utils) {
  if (!section.value) {
    return void 0;
  }
  switch (section.type) {
    case "month": {
      if (section.contentType === "digit") {
        return utils.format(utils.setMonth(utils.date(), Number(section.value) - 1), "month");
      }
      const parsedDate = utils.parse(section.value, section.format);
      return parsedDate ? utils.format(parsedDate, "month") : void 0;
    }
    case "day":
      return section.contentType === "digit" ? utils.format(utils.setDate(utils.startOfYear(utils.date()), Number(section.value)), "dayOfMonthFull") : section.value;
    case "weekDay":
      return void 0;
    default:
      return void 0;
  }
}
function getSectionValueNow(section, utils) {
  if (!section.value) {
    return void 0;
  }
  switch (section.type) {
    case "weekDay": {
      if (section.contentType === "letter") {
        return void 0;
      }
      return Number(section.value);
    }
    case "meridiem": {
      const parsedDate = utils.parse(`01:00 ${section.value}`, `${utils.formats.hours12h}:${utils.formats.minutes} ${section.format}`);
      if (parsedDate) {
        return utils.getHours(parsedDate) >= 12 ? 1 : 0;
      }
      return void 0;
    }
    case "day":
      return section.contentType === "digit-with-letter" ? parseInt(section.value, 10) : Number(section.value);
    case "month": {
      if (section.contentType === "digit") {
        return Number(section.value);
      }
      const parsedDate = utils.parse(section.value, section.format);
      return parsedDate ? utils.getMonth(parsedDate) + 1 : void 0;
    }
    default:
      return section.contentType !== "letter" ? Number(section.value) : void 0;
  }
}

// node_modules/@mui/x-date-pickers/esm/internals/hooks/useField/useFieldV7TextField.js
var useFieldV7TextField = (parameters) => {
  const {
    props,
    manager,
    skipContextFieldRefAssignment,
    manager: {
      valueType,
      internal_useOpenPickerButtonAriaLabel: useOpenPickerButtonAriaLabel3
    }
  } = parameters;
  const {
    internalProps,
    forwardedProps
  } = useSplitFieldProps(props, valueType);
  const internalPropsWithDefaults = useFieldInternalPropsWithDefaults({
    manager,
    internalProps,
    skipContextFieldRefAssignment
  });
  const {
    sectionListRef: sectionListRefProp,
    onBlur,
    onClick,
    onFocus,
    onInput,
    onPaste,
    onKeyDown,
    onClear,
    clearable
  } = forwardedProps;
  const {
    disabled = false,
    readOnly = false,
    autoFocus = false,
    focused: focusedProp,
    unstableFieldRef
  } = internalPropsWithDefaults;
  const sectionListRef = React45.useRef(null);
  const handleSectionListRef = useForkRef(sectionListRefProp, sectionListRef);
  const domGetters = React45.useMemo(() => ({
    isReady: () => sectionListRef.current != null,
    getRoot: () => sectionListRef.current.getRoot(),
    getSectionContainer: (sectionIndex) => sectionListRef.current.getSectionContainer(sectionIndex),
    getSectionContent: (sectionIndex) => sectionListRef.current.getSectionContent(sectionIndex),
    getSectionIndexFromDOMElement: (element) => sectionListRef.current.getSectionIndexFromDOMElement(element)
  }), [sectionListRef]);
  const stateResponse = useFieldState({
    manager,
    internalPropsWithDefaults,
    forwardedProps
  });
  const {
    // States and derived states
    areAllSectionsEmpty,
    error,
    parsedSelectedSections,
    sectionOrder,
    state,
    value,
    // Methods to update the states
    clearValue,
    setSelectedSections
  } = stateResponse;
  const applyCharacterEditing = useFieldCharacterEditing({
    stateResponse
  });
  const openPickerAriaLabel = useOpenPickerButtonAriaLabel3(value);
  const [focused, setFocused] = React45.useState(false);
  function focusField(newSelectedSections = 0) {
    if (disabled || !sectionListRef.current || // if the field is already focused, we don't need to focus it again
    getActiveSectionIndex(sectionListRef) != null) {
      return;
    }
    const newParsedSelectedSections = parseSelectedSections(newSelectedSections, state.sections);
    setFocused(true);
    sectionListRef.current.getSectionContent(newParsedSelectedSections).focus();
  }
  const rootProps = useFieldRootProps({
    manager,
    internalPropsWithDefaults,
    stateResponse,
    applyCharacterEditing,
    focused,
    setFocused,
    domGetters
  });
  const hiddenInputProps = useFieldHiddenInputProps({
    manager,
    stateResponse
  });
  const createSectionContainerProps = useFieldSectionContainerProps({
    stateResponse,
    internalPropsWithDefaults
  });
  const createSectionContentProps = useFieldSectionContentProps({
    manager,
    stateResponse,
    applyCharacterEditing,
    internalPropsWithDefaults,
    domGetters,
    focused
  });
  const handleRootKeyDown = useEventCallback_default((event) => {
    onKeyDown == null ? void 0 : onKeyDown(event);
    rootProps.onKeyDown(event);
  });
  const handleRootBlur = useEventCallback_default((event) => {
    onBlur == null ? void 0 : onBlur(event);
    rootProps.onBlur(event);
  });
  const handleRootFocus = useEventCallback_default((event) => {
    onFocus == null ? void 0 : onFocus(event);
    rootProps.onFocus(event);
  });
  const handleRootClick = useEventCallback_default((event) => {
    if (event.isDefaultPrevented()) {
      return;
    }
    onClick == null ? void 0 : onClick(event);
    rootProps.onClick(event);
  });
  const handleRootPaste = useEventCallback_default((event) => {
    onPaste == null ? void 0 : onPaste(event);
    rootProps.onPaste(event);
  });
  const handleRootInput = useEventCallback_default((event) => {
    onInput == null ? void 0 : onInput(event);
    rootProps.onInput(event);
  });
  const handleClear = useEventCallback_default((event, ...args) => {
    event.preventDefault();
    onClear == null ? void 0 : onClear(event, ...args);
    clearValue();
    if (!isFieldFocused(sectionListRef)) {
      focusField(0);
    } else {
      setSelectedSections(sectionOrder.startIndex);
    }
  });
  const elements = React45.useMemo(() => {
    return state.sections.map((section, sectionIndex) => {
      const content = createSectionContentProps(section, sectionIndex);
      return {
        container: createSectionContainerProps(sectionIndex),
        content: createSectionContentProps(section, sectionIndex),
        before: {
          children: section.startSeparator
        },
        after: {
          children: section.endSeparator,
          "data-range-position": section.isEndFormatSeparator ? content["data-range-position"] : void 0
        }
      };
    });
  }, [state.sections, createSectionContainerProps, createSectionContentProps]);
  React45.useEffect(() => {
    if (sectionListRef.current == null) {
      throw new Error(["MUI X: The `sectionListRef` prop has not been initialized by `PickersSectionList`", "You probably tried to pass a component to the `textField` slot that contains an `<input />` element instead of a `PickersSectionList`.", "", "If you want to keep using an `<input />` HTML element for the editing, please add the `enableAccessibleFieldDOMStructure={false}` prop to your Picker or Field component:", "", "<DatePicker enableAccessibleFieldDOMStructure={false} slots={{ textField: MyCustomTextField }} />", "", "Learn more about the field accessible DOM structure on the MUI documentation: https://mui.com/x/react-date-pickers/fields/#fields-to-edit-a-single-element"].join("\n"));
    }
    if (autoFocus && !disabled && sectionListRef.current) {
      sectionListRef.current.getSectionContent(sectionOrder.startIndex).focus();
    }
  }, []);
  useEnhancedEffect_default(() => {
    if (!focused || !sectionListRef.current) {
      return;
    }
    if (parsedSelectedSections === "all") {
      sectionListRef.current.getRoot().focus();
    } else if (typeof parsedSelectedSections === "number") {
      const domElement = sectionListRef.current.getSectionContent(parsedSelectedSections);
      if (domElement) {
        domElement.focus();
      }
    }
  }, [parsedSelectedSections, focused]);
  useEnhancedEffect_default(() => {
    syncSelectionToDOM({
      focused,
      domGetters,
      stateResponse
    });
  });
  React45.useImperativeHandle(unstableFieldRef, () => ({
    getSections: () => state.sections,
    getActiveSectionIndex: () => getActiveSectionIndex(sectionListRef),
    setSelectedSections: (newSelectedSections) => {
      if (disabled || !sectionListRef.current) {
        return;
      }
      const newParsedSelectedSections = parseSelectedSections(newSelectedSections, state.sections);
      const newActiveSectionIndex = newParsedSelectedSections === "all" ? 0 : newParsedSelectedSections;
      setFocused(newActiveSectionIndex !== null);
      setSelectedSections(newSelectedSections);
    },
    focusField,
    isFieldFocused: () => isFieldFocused(sectionListRef)
  }));
  return _extends({}, forwardedProps, rootProps, {
    onBlur: handleRootBlur,
    onClick: handleRootClick,
    onFocus: handleRootFocus,
    onInput: handleRootInput,
    onPaste: handleRootPaste,
    onKeyDown: handleRootKeyDown,
    onClear: handleClear
  }, hiddenInputProps, {
    error,
    clearable: Boolean(clearable && !areAllSectionsEmpty && !readOnly && !disabled),
    focused: focusedProp ?? focused,
    sectionListRef: handleSectionListRef,
    // Additional
    enableAccessibleFieldDOMStructure: true,
    elements,
    areAllSectionsEmpty,
    disabled,
    readOnly,
    autoFocus,
    openPickerAriaLabel
  });
};
function getActiveSectionIndex(sectionListRef) {
  const activeElement = getActiveElement(document);
  if (!activeElement || !sectionListRef.current || !sectionListRef.current.getRoot().contains(activeElement)) {
    return null;
  }
  return sectionListRef.current.getSectionIndexFromDOMElement(activeElement);
}
function isFieldFocused(sectionListRef) {
  const activeElement = getActiveElement(document);
  return !!sectionListRef.current && sectionListRef.current.getRoot().contains(activeElement);
}

// node_modules/@mui/x-date-pickers/esm/internals/hooks/useField/useFieldV6TextField.js
var React46 = __toESM(require_react(), 1);
var cleanString = (dirtyString) => dirtyString.replace(/[\u2066\u2067\u2068\u2069]/g, "");
var addPositionPropertiesToSections = (sections, localizedDigits, isRtl) => {
  let position = 0;
  let positionInInput = isRtl ? 1 : 0;
  const newSections = [];
  for (let i = 0; i < sections.length; i += 1) {
    const section = sections[i];
    const renderedValue = getSectionVisibleValue(section, isRtl ? "input-rtl" : "input-ltr", localizedDigits);
    const sectionStr = `${section.startSeparator}${renderedValue}${section.endSeparator}`;
    const sectionLength = cleanString(sectionStr).length;
    const sectionLengthInInput = sectionStr.length;
    const cleanedValue = cleanString(renderedValue);
    const startInInput = positionInInput + (cleanedValue === "" ? 0 : renderedValue.indexOf(cleanedValue[0])) + section.startSeparator.length;
    const endInInput = startInInput + cleanedValue.length;
    newSections.push(_extends({}, section, {
      start: position,
      end: position + sectionLength,
      startInInput,
      endInInput
    }));
    position += sectionLength;
    positionInInput += sectionLengthInInput;
  }
  return newSections;
};
var useFieldV6TextField = (parameters) => {
  const isRtl = useRtl();
  const focusTimeout = useTimeout();
  const selectionSyncTimeout = useTimeout();
  const {
    props,
    manager,
    skipContextFieldRefAssignment,
    manager: {
      valueType,
      internal_valueManager: valueManager,
      internal_fieldValueManager: fieldValueManager,
      internal_useOpenPickerButtonAriaLabel: useOpenPickerButtonAriaLabel3
    }
  } = parameters;
  const {
    internalProps,
    forwardedProps
  } = useSplitFieldProps(props, valueType);
  const internalPropsWithDefaults = useFieldInternalPropsWithDefaults({
    manager,
    internalProps,
    skipContextFieldRefAssignment
  });
  const {
    onFocus,
    onClick,
    onPaste,
    onBlur,
    onKeyDown,
    onClear,
    clearable,
    inputRef: inputRefProp,
    placeholder: inPlaceholder
  } = forwardedProps;
  const {
    readOnly = false,
    disabled = false,
    autoFocus = false,
    focused,
    unstableFieldRef
  } = internalPropsWithDefaults;
  const inputRef = React46.useRef(null);
  const handleRef = useForkRef(inputRefProp, inputRef);
  const stateResponse = useFieldState({
    manager,
    internalPropsWithDefaults,
    forwardedProps
  });
  const {
    // States and derived states
    activeSectionIndex,
    areAllSectionsEmpty,
    error,
    localizedDigits,
    parsedSelectedSections,
    sectionOrder,
    state,
    value,
    // Methods to update the states
    clearValue,
    clearActiveSection,
    setCharacterQuery,
    setSelectedSections,
    setTempAndroidValueStr,
    updateSectionValue,
    updateValueFromValueStr,
    // Utilities methods
    getSectionsFromValue
  } = stateResponse;
  const applyCharacterEditing = useFieldCharacterEditing({
    stateResponse
  });
  const openPickerAriaLabel = useOpenPickerButtonAriaLabel3(value);
  const sections = React46.useMemo(() => addPositionPropertiesToSections(state.sections, localizedDigits, isRtl), [state.sections, localizedDigits, isRtl]);
  function syncSelectionFromDOM() {
    const browserStartIndex = inputRef.current.selectionStart ?? 0;
    let nextSectionIndex;
    if (browserStartIndex <= sections[0].startInInput) {
      nextSectionIndex = 1;
    } else if (browserStartIndex >= sections[sections.length - 1].endInInput) {
      nextSectionIndex = 1;
    } else {
      nextSectionIndex = sections.findIndex((section) => section.startInInput - section.startSeparator.length > browserStartIndex);
    }
    const sectionIndex = nextSectionIndex === -1 ? sections.length - 1 : nextSectionIndex - 1;
    setSelectedSections(sectionIndex);
  }
  function focusField(newSelectedSection = 0) {
    var _a;
    if (getActiveElement(document) === inputRef.current) {
      return;
    }
    (_a = inputRef.current) == null ? void 0 : _a.focus();
    setSelectedSections(newSelectedSection);
  }
  const handleInputFocus = useEventCallback_default((event) => {
    onFocus == null ? void 0 : onFocus(event);
    const input = inputRef.current;
    focusTimeout.start(0, () => {
      if (!input || input !== inputRef.current) {
        return;
      }
      if (activeSectionIndex != null) {
        return;
      }
      if (
        // avoid selecting all sections when focusing empty field without value
        input.value.length && Number(input.selectionEnd) - Number(input.selectionStart) === input.value.length
      ) {
        setSelectedSections("all");
      } else {
        syncSelectionFromDOM();
      }
    });
  });
  const handleInputClick = useEventCallback_default((event, ...args) => {
    if (event.isDefaultPrevented()) {
      return;
    }
    onClick == null ? void 0 : onClick(event, ...args);
    syncSelectionFromDOM();
  });
  const handleInputPaste = useEventCallback_default((event) => {
    onPaste == null ? void 0 : onPaste(event);
    event.preventDefault();
    if (readOnly || disabled) {
      return;
    }
    const pastedValue = event.clipboardData.getData("text");
    if (typeof parsedSelectedSections === "number") {
      const activeSection = state.sections[parsedSelectedSections];
      const lettersOnly = /^[a-zA-Z]+$/.test(pastedValue);
      const digitsOnly = /^[0-9]+$/.test(pastedValue);
      const digitsAndLetterOnly = /^(([a-zA-Z]+)|)([0-9]+)(([a-zA-Z]+)|)$/.test(pastedValue);
      const isValidPastedValue = activeSection.contentType === "letter" && lettersOnly || activeSection.contentType === "digit" && digitsOnly || activeSection.contentType === "digit-with-letter" && digitsAndLetterOnly;
      if (isValidPastedValue) {
        setCharacterQuery(null);
        updateSectionValue({
          section: activeSection,
          newSectionValue: pastedValue,
          shouldGoToNextSection: true
        });
        return;
      }
      if (lettersOnly || digitsOnly) {
        return;
      }
    }
    setCharacterQuery(null);
    updateValueFromValueStr(pastedValue);
  });
  const handleContainerBlur = useEventCallback_default((event) => {
    onBlur == null ? void 0 : onBlur(event);
    setSelectedSections(null);
  });
  const handleInputChange = useEventCallback_default((event) => {
    if (readOnly) {
      return;
    }
    const targetValue = event.target.value;
    if (targetValue === "") {
      clearValue();
      return;
    }
    const eventData = event.nativeEvent.data;
    const shouldUseEventData = eventData && eventData.length > 1;
    const valueStr2 = shouldUseEventData ? eventData : targetValue;
    const cleanValueStr = cleanString(valueStr2);
    if (parsedSelectedSections === "all") {
      setSelectedSections(activeSectionIndex);
    }
    if (activeSectionIndex == null || shouldUseEventData) {
      updateValueFromValueStr(shouldUseEventData ? eventData : cleanValueStr);
      return;
    }
    let keyPressed;
    if (parsedSelectedSections === "all" && cleanValueStr.length === 1) {
      keyPressed = cleanValueStr;
    } else {
      const prevValueStr = cleanString(fieldValueManager.getV6InputValueFromSections(sections, localizedDigits, isRtl));
      let startOfDiffIndex = -1;
      let endOfDiffIndex = -1;
      for (let i = 0; i < prevValueStr.length; i += 1) {
        if (startOfDiffIndex === -1 && prevValueStr[i] !== cleanValueStr[i]) {
          startOfDiffIndex = i;
        }
        if (endOfDiffIndex === -1 && prevValueStr[prevValueStr.length - i - 1] !== cleanValueStr[cleanValueStr.length - i - 1]) {
          endOfDiffIndex = i;
        }
      }
      const activeSection = sections[activeSectionIndex];
      const hasDiffOutsideOfActiveSection = startOfDiffIndex < activeSection.start || prevValueStr.length - endOfDiffIndex - 1 > activeSection.end;
      if (hasDiffOutsideOfActiveSection) {
        return;
      }
      const activeSectionEndRelativeToNewValue = cleanValueStr.length - prevValueStr.length + activeSection.end - cleanString(activeSection.endSeparator || "").length;
      keyPressed = cleanValueStr.slice(activeSection.start + cleanString(activeSection.startSeparator || "").length, activeSectionEndRelativeToNewValue);
    }
    if (keyPressed.length === 0) {
      if (isAndroid()) {
        setTempAndroidValueStr(valueStr2);
      }
      clearActiveSection();
      return;
    }
    applyCharacterEditing({
      keyPressed,
      sectionIndex: activeSectionIndex
    });
  });
  const handleClear = useEventCallback_default((event, ...args) => {
    event.preventDefault();
    onClear == null ? void 0 : onClear(event, ...args);
    clearValue();
    if (!isFieldFocused2(inputRef)) {
      focusField(0);
    } else {
      setSelectedSections(sectionOrder.startIndex);
    }
  });
  const handleContainerKeyDown = useFieldRootHandleKeyDown({
    manager,
    internalPropsWithDefaults,
    stateResponse
  });
  const wrappedHandleContainerKeyDown = useEventCallback_default((event) => {
    onKeyDown == null ? void 0 : onKeyDown(event);
    handleContainerKeyDown(event);
  });
  const placeholder = React46.useMemo(() => {
    if (inPlaceholder !== void 0) {
      return inPlaceholder;
    }
    return fieldValueManager.getV6InputValueFromSections(getSectionsFromValue(valueManager.emptyValue), localizedDigits, isRtl);
  }, [inPlaceholder, fieldValueManager, getSectionsFromValue, valueManager.emptyValue, localizedDigits, isRtl]);
  const valueStr = React46.useMemo(() => state.tempValueStrAndroid ?? fieldValueManager.getV6InputValueFromSections(state.sections, localizedDigits, isRtl), [state.sections, fieldValueManager, state.tempValueStrAndroid, localizedDigits, isRtl]);
  React46.useEffect(() => {
    if (inputRef.current && inputRef.current === getActiveElement(document)) {
      setSelectedSections("all");
    }
  }, []);
  useEnhancedEffect_default(() => {
    function syncSelectionToDOM2() {
      if (!inputRef.current) {
        return;
      }
      if (parsedSelectedSections == null) {
        if (inputRef.current.scrollLeft) {
          inputRef.current.scrollLeft = 0;
        }
        return;
      }
      if (inputRef.current !== getActiveElement(document)) {
        return;
      }
      const currentScrollTop = inputRef.current.scrollTop;
      if (parsedSelectedSections === "all") {
        inputRef.current.select();
      } else {
        const selectedSection = sections[parsedSelectedSections];
        const selectionStart = selectedSection.type === "empty" ? selectedSection.startInInput - selectedSection.startSeparator.length : selectedSection.startInInput;
        const selectionEnd = selectedSection.type === "empty" ? selectedSection.endInInput + selectedSection.endSeparator.length : selectedSection.endInInput;
        if (selectionStart !== inputRef.current.selectionStart || selectionEnd !== inputRef.current.selectionEnd) {
          if (inputRef.current === getActiveElement(document)) {
            inputRef.current.setSelectionRange(selectionStart, selectionEnd);
          }
        }
        selectionSyncTimeout.start(0, () => {
          if (inputRef.current && inputRef.current === getActiveElement(document) && // The section might loose all selection, where `selectionStart === selectionEnd`
          // https://github.com/mui/mui-x/pull/13652
          inputRef.current.selectionStart === inputRef.current.selectionEnd && (inputRef.current.selectionStart !== selectionStart || inputRef.current.selectionEnd !== selectionEnd)) {
            syncSelectionToDOM2();
          }
        });
      }
      inputRef.current.scrollTop = currentScrollTop;
    }
    syncSelectionToDOM2();
  });
  const inputMode = React46.useMemo(() => {
    if (activeSectionIndex == null) {
      return "text";
    }
    if (state.sections[activeSectionIndex].contentType === "letter") {
      return "text";
    }
    return "numeric";
  }, [activeSectionIndex, state.sections]);
  const inputHasFocus = inputRef.current && inputRef.current === getActiveElement(document);
  const shouldShowPlaceholder = !inputHasFocus && areAllSectionsEmpty;
  React46.useImperativeHandle(unstableFieldRef, () => ({
    getSections: () => state.sections,
    getActiveSectionIndex: () => {
      const browserStartIndex = inputRef.current.selectionStart ?? 0;
      const browserEndIndex = inputRef.current.selectionEnd ?? 0;
      if (browserStartIndex === 0 && browserEndIndex === 0) {
        return null;
      }
      const nextSectionIndex = browserStartIndex <= sections[0].startInInput ? 1 : sections.findIndex((section) => section.startInInput - section.startSeparator.length > browserStartIndex);
      return nextSectionIndex === -1 ? sections.length - 1 : nextSectionIndex - 1;
    },
    setSelectedSections: (newSelectedSections) => setSelectedSections(newSelectedSections),
    focusField,
    isFieldFocused: () => isFieldFocused2(inputRef)
  }));
  return _extends({}, forwardedProps, {
    error,
    clearable: Boolean(clearable && !areAllSectionsEmpty && !readOnly && !disabled),
    onBlur: handleContainerBlur,
    onClick: handleInputClick,
    onFocus: handleInputFocus,
    onPaste: handleInputPaste,
    onKeyDown: wrappedHandleContainerKeyDown,
    onClear: handleClear,
    inputRef: handleRef,
    // Additional
    enableAccessibleFieldDOMStructure: false,
    placeholder,
    inputMode,
    autoComplete: "off",
    value: shouldShowPlaceholder ? "" : valueStr,
    onChange: handleInputChange,
    focused,
    disabled,
    readOnly,
    autoFocus,
    openPickerAriaLabel
  });
};
function isFieldFocused2(inputRef) {
  return inputRef.current === getActiveElement(document);
}

// node_modules/@mui/x-date-pickers/esm/internals/hooks/useField/useField.js
var useField = (parameters) => {
  const fieldPrivateContext = useNullableFieldPrivateContext();
  const enableAccessibleFieldDOMStructure = parameters.props.enableAccessibleFieldDOMStructure ?? (fieldPrivateContext == null ? void 0 : fieldPrivateContext.enableAccessibleFieldDOMStructure) ?? true;
  const useFieldTextField = enableAccessibleFieldDOMStructure ? useFieldV7TextField : useFieldV6TextField;
  return useFieldTextField(parameters);
};

// node_modules/@mui/x-date-pickers/esm/managers/useTimeManager.js
var React47 = __toESM(require_react(), 1);
function useTimeManager(parameters = {}) {
  const {
    enableAccessibleFieldDOMStructure = true,
    ampm
  } = parameters;
  return React47.useMemo(() => ({
    valueType: "time",
    validator: validateTime,
    internal_valueManager: singleItemValueManager,
    internal_fieldValueManager: singleItemFieldValueManager,
    internal_enableAccessibleFieldDOMStructure: enableAccessibleFieldDOMStructure,
    internal_useApplyDefaultValuesToFieldInternalProps: useApplyDefaultValuesToTimeFieldInternalProps,
    internal_useOpenPickerButtonAriaLabel: createUseOpenPickerButtonAriaLabel(ampm)
  }), [ampm, enableAccessibleFieldDOMStructure]);
}
function createUseOpenPickerButtonAriaLabel(ampm) {
  return function useOpenPickerButtonAriaLabel3(value) {
    const utils = useUtils();
    const translations = usePickerTranslations();
    return React47.useMemo(() => {
      const formatKey = ampm ?? utils.is12HourCycleInCurrentLocale() ? "fullTime12h" : "fullTime24h";
      const formattedValue = utils.isValid(value) ? utils.format(value, formatKey) : null;
      return translations.openTimePickerDialogue(formattedValue);
    }, [value, translations, utils]);
  };
}
function useApplyDefaultValuesToTimeFieldInternalProps(internalProps) {
  const utils = useUtils();
  const validationProps = useApplyDefaultValuesToTimeValidationProps(internalProps);
  const ampm = React47.useMemo(() => internalProps.ampm ?? utils.is12HourCycleInCurrentLocale(), [internalProps.ampm, utils]);
  return React47.useMemo(() => _extends({}, internalProps, validationProps, {
    format: internalProps.format ?? (ampm ? utils.formats.fullTime12h : utils.formats.fullTime24h)
  }), [internalProps, validationProps, ampm, utils]);
}
function useApplyDefaultValuesToTimeValidationProps(props) {
  return React47.useMemo(() => ({
    disablePast: props.disablePast ?? false,
    disableFuture: props.disableFuture ?? false
  }), [props.disablePast, props.disableFuture]);
}

// node_modules/@mui/x-date-pickers/esm/managers/useDateTimeManager.js
var React48 = __toESM(require_react(), 1);
function useDateTimeManager(parameters = {}) {
  const {
    enableAccessibleFieldDOMStructure = true
  } = parameters;
  return React48.useMemo(() => ({
    valueType: "date-time",
    validator: validateDateTime,
    internal_valueManager: singleItemValueManager,
    internal_fieldValueManager: singleItemFieldValueManager,
    internal_enableAccessibleFieldDOMStructure: enableAccessibleFieldDOMStructure,
    internal_useApplyDefaultValuesToFieldInternalProps: useApplyDefaultValuesToDateTimeFieldInternalProps,
    internal_useOpenPickerButtonAriaLabel: useOpenPickerButtonAriaLabel2
  }), [enableAccessibleFieldDOMStructure]);
}
function useOpenPickerButtonAriaLabel2(value) {
  const utils = useUtils();
  const translations = usePickerTranslations();
  return React48.useMemo(() => {
    const formattedValue = utils.isValid(value) ? utils.format(value, "fullDate") : null;
    return translations.openDatePickerDialogue(formattedValue);
  }, [value, translations, utils]);
}
function useApplyDefaultValuesToDateTimeFieldInternalProps(internalProps) {
  const utils = useUtils();
  const validationProps = useApplyDefaultValuesToDateTimeValidationProps(internalProps);
  const ampm = React48.useMemo(() => internalProps.ampm ?? utils.is12HourCycleInCurrentLocale(), [internalProps.ampm, utils]);
  return React48.useMemo(() => _extends({}, internalProps, validationProps, {
    format: internalProps.format ?? (ampm ? utils.formats.keyboardDateTime12h : utils.formats.keyboardDateTime24h)
  }), [internalProps, validationProps, ampm, utils]);
}
function useApplyDefaultValuesToDateTimeValidationProps(props) {
  const utils = useUtils();
  const defaultDates = useDefaultDates();
  return React48.useMemo(() => ({
    disablePast: props.disablePast ?? false,
    disableFuture: props.disableFuture ?? false,
    // TODO: Explore if we can remove it from the public API
    disableIgnoringDatePartForTimeValidation: !!props.minDateTime || !!props.maxDateTime || !!props.disableFuture || !!props.disablePast,
    minDate: applyDefaultDate(utils, props.minDateTime ?? props.minDate, defaultDates.minDate),
    maxDate: applyDefaultDate(utils, props.maxDateTime ?? props.maxDate, defaultDates.maxDate),
    minTime: props.minDateTime ?? props.minTime,
    maxTime: props.maxDateTime ?? props.maxTime
  }), [props.minDateTime, props.maxDateTime, props.minTime, props.maxTime, props.minDate, props.maxDate, props.disableFuture, props.disablePast, utils, defaultDates]);
}

// node_modules/@mui/x-date-pickers/esm/DateField/useDateField.js
var useDateField = (props) => {
  const manager = useDateManager(props);
  return useField({
    manager,
    props
  });
};

// node_modules/@mui/x-date-pickers/esm/DateField/DateField.js
var import_jsx_runtime21 = __toESM(require_jsx_runtime(), 1);
var _excluded19 = ["slots", "slotProps"];
var DateField = React49.forwardRef(function DateField2(inProps, inRef) {
  const themeProps = useThemeProps({
    props: inProps,
    name: "MuiDateField"
  });
  const {
    slots,
    slotProps
  } = themeProps, other = _objectWithoutPropertiesLoose(themeProps, _excluded19);
  const textFieldProps = useFieldTextFieldProps({
    slotProps,
    ref: inRef,
    externalForwardedProps: other
  });
  const fieldResponse = useDateField(textFieldProps);
  return (0, import_jsx_runtime21.jsx)(PickerFieldUI, {
    slots,
    slotProps,
    fieldResponse,
    defaultOpenPickerIcon: CalendarIcon
  });
});
true ? DateField.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * If `true`, the `input` element is focused during the first mount.
   * @default false
   */
  autoFocus: import_prop_types12.default.bool,
  className: import_prop_types12.default.string,
  /**
   * If `true`, a clear button will be shown in the field allowing value clearing.
   * @default false
   */
  clearable: import_prop_types12.default.bool,
  /**
   * The position at which the clear button is placed.
   * If the field is not clearable, the button is not rendered.
   * @default 'end'
   */
  clearButtonPosition: import_prop_types12.default.oneOf(["end", "start"]),
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color: import_prop_types12.default.oneOf(["error", "info", "primary", "secondary", "success", "warning"]),
  component: import_prop_types12.default.elementType,
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: import_prop_types12.default.object,
  /**
   * If `true`, the component is disabled.
   * When disabled, the value cannot be changed and no interaction is possible.
   * @default false
   */
  disabled: import_prop_types12.default.bool,
  /**
   * If `true`, disable values after the current date for date components, time for time components and both for date time components.
   * @default false
   */
  disableFuture: import_prop_types12.default.bool,
  /**
   * If `true`, disable values before the current date for date components, time for time components and both for date time components.
   * @default false
   */
  disablePast: import_prop_types12.default.bool,
  /**
   * @default true
   */
  enableAccessibleFieldDOMStructure: import_prop_types12.default.bool,
  /**
   * If `true`, the component is displayed in focused state.
   */
  focused: import_prop_types12.default.bool,
  /**
   * Format of the date when rendered in the input(s).
   */
  format: import_prop_types12.default.string,
  /**
   * Density of the format when rendered in the input.
   * Setting `formatDensity` to `"spacious"` will add a space before and after each `/`, `-` and `.` character.
   * @default "dense"
   */
  formatDensity: import_prop_types12.default.oneOf(["dense", "spacious"]),
  /**
   * Props applied to the [`FormHelperText`](https://mui.com/material-ui/api/form-helper-text/) element.
   * @deprecated Use `slotProps.formHelperText` instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  FormHelperTextProps: import_prop_types12.default.object,
  /**
   * If `true`, the input will take up the full width of its container.
   * @default false
   */
  fullWidth: import_prop_types12.default.bool,
  /**
   * The helper text content.
   */
  helperText: import_prop_types12.default.node,
  /**
   * If `true`, the label is hidden.
   * This is used to increase density for a `FilledInput`.
   * Be sure to add `aria-label` to the `input` element.
   * @default false
   */
  hiddenLabel: import_prop_types12.default.bool,
  /**
   * The id of the `input` element.
   * Use this prop to make `label` and `helperText` accessible for screen readers.
   */
  id: import_prop_types12.default.string,
  /**
   * Props applied to the [`InputLabel`](https://mui.com/material-ui/api/input-label/) element.
   * Pointer events like `onClick` are enabled if and only if `shrink` is `true`.
   * @deprecated Use `slotProps.inputLabel` instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  InputLabelProps: import_prop_types12.default.object,
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
   * @deprecated Use `slotProps.htmlInput` instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  inputProps: import_prop_types12.default.object,
  /**
   * Props applied to the Input element.
   * It will be a [`FilledInput`](https://mui.com/material-ui/api/filled-input/),
   * [`OutlinedInput`](https://mui.com/material-ui/api/outlined-input/) or [`Input`](https://mui.com/material-ui/api/input/)
   * component depending on the `variant` prop value.
   * @deprecated Use `slotProps.input` instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  InputProps: import_prop_types12.default.object,
  /**
   * Pass a ref to the `input` element.
   */
  inputRef: refType_default,
  /**
   * The label content.
   */
  label: import_prop_types12.default.node,
  /**
   * If `dense` or `normal`, will adjust vertical spacing of this and contained components.
   * @default 'none'
   */
  margin: import_prop_types12.default.oneOf(["dense", "none", "normal"]),
  /**
   * Maximal selectable date.
   * @default 2099-12-31
   */
  maxDate: import_prop_types12.default.object,
  /**
   * Minimal selectable date.
   * @default 1900-01-01
   */
  minDate: import_prop_types12.default.object,
  /**
   * Name attribute of the `input` element.
   */
  name: import_prop_types12.default.string,
  onBlur: import_prop_types12.default.func,
  /**
   * Callback fired when the value changes.
   * @template TValue The value type. It will be the same type as `value` or `null`. It can be in `[start, end]` format in case of range value.
   * @template TError The validation error type. It will be either `string` or a `null`. It can be in `[start, end]` format in case of range value.
   * @param {TValue} value The new value.
   * @param {FieldChangeHandlerContext<TError>} context The context containing the validation result of the current value.
   */
  onChange: import_prop_types12.default.func,
  /**
   * Callback fired when the clear button is clicked.
   */
  onClear: import_prop_types12.default.func,
  /**
   * Callback fired when the error associated with the current value changes.
   * When a validation error is detected, the `error` parameter contains a non-null value.
   * This can be used to render an appropriate form error.
   * @template TError The validation error type. It will be either `string` or a `null`. It can be in `[start, end]` format in case of range value.
   * @template TValue The value type. It will be the same type as `value` or `null`. It can be in `[start, end]` format in case of range value.
   * @param {TError} error The reason why the current value is not valid.
   * @param {TValue} value The value associated with the error.
   */
  onError: import_prop_types12.default.func,
  onFocus: import_prop_types12.default.func,
  /**
   * Callback fired when the selected sections change.
   * @param {FieldSelectedSections} newValue The new selected sections.
   */
  onSelectedSectionsChange: import_prop_types12.default.func,
  /**
   * The position at which the opening button is placed.
   * If there is no Picker to open, the button is not rendered
   * @default 'end'
   */
  openPickerButtonPosition: import_prop_types12.default.oneOf(["end", "start"]),
  /**
   * If `true`, the component is read-only.
   * When read-only, the value cannot be changed but the user can interact with the interface.
   * @default false
   */
  readOnly: import_prop_types12.default.bool,
  /**
   * The date used to generate a part of the new value that is not present in the format when both `value` and `defaultValue` are empty.
   * For example, on time fields it will be used to determine the date to set.
   * @default The closest valid date using the validation props, except callbacks such as `shouldDisableDate`. Value is rounded to the most granular section used.
   */
  referenceDate: import_prop_types12.default.object,
  /**
   * If `true`, the label is displayed as required and the `input` element is required.
   * @default false
   */
  required: import_prop_types12.default.bool,
  /**
   * The currently selected sections.
   * This prop accepts four formats:
   * 1. If a number is provided, the section at this index will be selected.
   * 2. If a string of type `FieldSectionType` is provided, the first section with that name will be selected.
   * 3. If `"all"` is provided, all the sections will be selected.
   * 4. If `null` is provided, no section will be selected.
   * If not provided, the selected sections will be handled internally.
   */
  selectedSections: import_prop_types12.default.oneOfType([import_prop_types12.default.oneOf(["all", "day", "empty", "hours", "meridiem", "minutes", "month", "seconds", "weekDay", "year"]), import_prop_types12.default.number]),
  /**
   * Disable specific date.
   *
   * Warning: This function can be called multiple times (for example when rendering date calendar, checking if focus can be moved to a certain date, etc.). Expensive computations can impact performance.
   *
   * @param {PickerValidDate} day The date to test.
   * @returns {boolean} If `true` the date will be disabled.
   */
  shouldDisableDate: import_prop_types12.default.func,
  /**
   * Disable specific month.
   * @param {PickerValidDate} month The month to test.
   * @returns {boolean} If `true`, the month will be disabled.
   */
  shouldDisableMonth: import_prop_types12.default.func,
  /**
   * Disable specific year.
   * @param {PickerValidDate} year The year to test.
   * @returns {boolean} If `true`, the year will be disabled.
   */
  shouldDisableYear: import_prop_types12.default.func,
  /**
   * If `true`, the format will respect the leading zeroes (for example on dayjs, the format `M/D/YYYY` will render `8/16/2018`)
   * If `false`, the format will always add leading zeroes (for example on dayjs, the format `M/D/YYYY` will render `08/16/2018`)
   *
   * Warning n°1: Luxon is not able to respect the leading zeroes when using macro tokens (for example "DD"), so `shouldRespectLeadingZeros={true}` might lead to inconsistencies when using `AdapterLuxon`.
   *
   * Warning n°2: When `shouldRespectLeadingZeros={true}`, the field will add an invisible character on the sections containing a single digit to make sure `onChange` is fired.
   * If you need to get the clean value from the input, you can remove this character using `input.value.replace(/\u200e/g, '')`.
   *
   * Warning n°3: When used in strict mode, dayjs and moment require to respect the leading zeros.
   * This mean that when using `shouldRespectLeadingZeros={false}`, if you retrieve the value directly from the input (not listening to `onChange`) and your format contains tokens without leading zeros, the value will not be parsed by your library.
   *
   * @default false
   */
  shouldRespectLeadingZeros: import_prop_types12.default.bool,
  /**
   * The size of the component.
   * @default 'medium'
   */
  size: import_prop_types12.default.oneOf(["medium", "small"]),
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps: import_prop_types12.default.object,
  /**
   * Overridable component slots.
   * @default {}
   */
  slots: import_prop_types12.default.object,
  style: import_prop_types12.default.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types12.default.oneOfType([import_prop_types12.default.arrayOf(import_prop_types12.default.oneOfType([import_prop_types12.default.func, import_prop_types12.default.object, import_prop_types12.default.bool])), import_prop_types12.default.func, import_prop_types12.default.object]),
  /**
   * Choose which timezone to use for the value.
   * Example: "default", "system", "UTC", "America/New_York".
   * If you pass values from other timezones to some props, they will be converted to this timezone before being used.
   * @see See the {@link https://mui.com/x/react-date-pickers/timezone/ timezones documentation} for more details.
   * @default The timezone of the `value` or `defaultValue` prop is defined, 'default' otherwise.
   */
  timezone: import_prop_types12.default.string,
  /**
   * The ref object used to imperatively interact with the field.
   */
  unstableFieldRef: import_prop_types12.default.oneOfType([import_prop_types12.default.func, import_prop_types12.default.object]),
  /**
   * The selected value.
   * Used when the component is controlled.
   */
  value: import_prop_types12.default.object,
  /**
   * The variant to use.
   * @default 'outlined'
   */
  variant: import_prop_types12.default.oneOf(["filled", "outlined", "standard"])
} : void 0;

// node_modules/@mui/x-date-pickers/esm/dateViewRenderers/dateViewRenderers.js
var React65 = __toESM(require_react(), 1);

// node_modules/@mui/x-date-pickers/esm/DateCalendar/DateCalendar.js
var React64 = __toESM(require_react(), 1);
var import_prop_types17 = __toESM(require_prop_types(), 1);

// node_modules/@mui/x-date-pickers/esm/DateCalendar/useCalendarState.js
var React51 = __toESM(require_react(), 1);

// node_modules/@mui/x-date-pickers/esm/DateCalendar/useIsDateDisabled.js
var React50 = __toESM(require_react(), 1);
var useIsDateDisabled = ({
  shouldDisableDate,
  shouldDisableMonth,
  shouldDisableYear,
  minDate,
  maxDate,
  disableFuture,
  disablePast,
  timezone
}) => {
  const adapter = useLocalizationContext();
  return React50.useCallback((day) => validateDate({
    adapter,
    value: day,
    timezone,
    props: {
      shouldDisableDate,
      shouldDisableMonth,
      shouldDisableYear,
      minDate,
      maxDate,
      disableFuture,
      disablePast
    }
  }) !== null, [adapter, shouldDisableDate, shouldDisableMonth, shouldDisableYear, minDate, maxDate, disableFuture, disablePast, timezone]);
};

// node_modules/@mui/x-date-pickers/esm/DateCalendar/useCalendarState.js
var createCalendarStateReducer = (reduceAnimations, utils) => (state, action) => {
  switch (action.type) {
    case "setVisibleDate":
      return _extends({}, state, {
        slideDirection: action.direction,
        currentMonth: action.month,
        isMonthSwitchingAnimating: !utils.isSameMonth(action.month, state.currentMonth) && !reduceAnimations && !action.skipAnimation,
        focusedDay: action.focusedDay
      });
    case "changeMonthTimezone": {
      const newTimezone = action.newTimezone;
      if (utils.getTimezone(state.currentMonth) === newTimezone) {
        return state;
      }
      let newCurrentMonth = utils.setTimezone(state.currentMonth, newTimezone);
      if (utils.getMonth(newCurrentMonth) !== utils.getMonth(state.currentMonth)) {
        newCurrentMonth = utils.setMonth(newCurrentMonth, utils.getMonth(state.currentMonth));
      }
      return _extends({}, state, {
        currentMonth: newCurrentMonth
      });
    }
    case "finishMonthSwitchingAnimation":
      return _extends({}, state, {
        isMonthSwitchingAnimating: false
      });
    default:
      throw new Error("missing support");
  }
};
var useCalendarState = (params) => {
  const {
    value,
    referenceDate: referenceDateProp,
    disableFuture,
    disablePast,
    maxDate,
    minDate,
    onMonthChange,
    onYearChange,
    reduceAnimations,
    shouldDisableDate,
    timezone,
    getCurrentMonthFromVisibleDate
  } = params;
  const utils = useUtils();
  const reducerFn = React51.useRef(createCalendarStateReducer(Boolean(reduceAnimations), utils)).current;
  const referenceDate = React51.useMemo(
    () => {
      return singleItemValueManager.getInitialReferenceValue({
        value,
        utils,
        timezone,
        props: params,
        referenceDate: referenceDateProp,
        granularity: SECTION_TYPE_GRANULARITY.day
      });
    },
    // We want the `referenceDate` to update on prop and `timezone` change (https://github.com/mui/mui-x/issues/10804)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [referenceDateProp, timezone]
  );
  const [calendarState, dispatch] = React51.useReducer(reducerFn, {
    isMonthSwitchingAnimating: false,
    focusedDay: referenceDate,
    currentMonth: utils.startOfMonth(referenceDate),
    slideDirection: "left"
  });
  const isDateDisabled = useIsDateDisabled({
    shouldDisableDate,
    minDate,
    maxDate,
    disableFuture,
    disablePast,
    timezone
  });
  React51.useEffect(() => {
    dispatch({
      type: "changeMonthTimezone",
      newTimezone: utils.getTimezone(referenceDate)
    });
  }, [referenceDate, utils]);
  const setVisibleDate = useEventCallback_default(({
    target,
    reason
  }) => {
    if (reason === "cell-interaction" && calendarState.focusedDay != null && utils.isSameDay(target, calendarState.focusedDay)) {
      return;
    }
    const skipAnimation = reason === "cell-interaction";
    let month;
    let focusedDay;
    if (reason === "cell-interaction") {
      month = getCurrentMonthFromVisibleDate(target, calendarState.currentMonth);
      focusedDay = target;
    } else {
      month = utils.isSameMonth(target, calendarState.currentMonth) ? calendarState.currentMonth : utils.startOfMonth(target);
      focusedDay = target;
      if (isDateDisabled(focusedDay)) {
        const startOfMonth = utils.startOfMonth(target);
        const endOfMonth = utils.endOfMonth(target);
        focusedDay = findClosestEnabledDate({
          utils,
          date: focusedDay,
          minDate: utils.isBefore(minDate, startOfMonth) ? startOfMonth : minDate,
          maxDate: utils.isAfter(maxDate, endOfMonth) ? endOfMonth : maxDate,
          disablePast,
          disableFuture,
          isDateDisabled,
          timezone
        });
      }
    }
    const hasChangedMonth = !utils.isSameMonth(calendarState.currentMonth, month);
    const hasChangedYear = !utils.isSameYear(calendarState.currentMonth, month);
    if (hasChangedMonth) {
      onMonthChange == null ? void 0 : onMonthChange(month);
    }
    if (hasChangedYear) {
      onYearChange == null ? void 0 : onYearChange(utils.startOfYear(month));
    }
    dispatch({
      type: "setVisibleDate",
      month,
      direction: utils.isAfterDay(month, calendarState.currentMonth) ? "left" : "right",
      focusedDay: calendarState.focusedDay != null && focusedDay != null && utils.isSameDay(focusedDay, calendarState.focusedDay) ? calendarState.focusedDay : focusedDay,
      skipAnimation
    });
  });
  const onMonthSwitchingAnimationEnd = React51.useCallback(() => {
    dispatch({
      type: "finishMonthSwitchingAnimation"
    });
  }, []);
  return {
    referenceDate,
    calendarState,
    setVisibleDate,
    isDateDisabled,
    onMonthSwitchingAnimationEnd
  };
};

// node_modules/@mui/x-date-pickers/esm/DateCalendar/PickersFadeTransitionGroup.js
var React52 = __toESM(require_react(), 1);

// node_modules/@mui/x-date-pickers/esm/DateCalendar/pickersFadeTransitionGroupClasses.js
var getPickersFadeTransitionGroupUtilityClass = (slot) => generateUtilityClass("MuiPickersFadeTransitionGroup", slot);
var pickersFadeTransitionGroupClasses = generateUtilityClasses("MuiPickersFadeTransitionGroup", ["root"]);

// node_modules/@mui/x-date-pickers/esm/DateCalendar/PickersFadeTransitionGroup.js
var import_jsx_runtime22 = __toESM(require_jsx_runtime(), 1);
var _excluded20 = ["children"];
var useUtilityClasses12 = (classes) => {
  const slots = {
    root: ["root"]
  };
  return composeClasses(slots, getPickersFadeTransitionGroupUtilityClass, classes);
};
var PickersFadeTransitionGroupRoot = styled_default(TransitionGroup_default, {
  name: "MuiPickersFadeTransitionGroup",
  slot: "Root"
})({
  display: "block",
  position: "relative"
});
function PickersFadeTransitionGroup(inProps) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiPickersFadeTransitionGroup"
  });
  const {
    className,
    reduceAnimations,
    transKey,
    classes: classesProp
  } = props;
  const {
    children
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded20);
  const classes = useUtilityClasses12(classesProp);
  const theme = useTheme();
  if (reduceAnimations) {
    return children;
  }
  return (0, import_jsx_runtime22.jsx)(PickersFadeTransitionGroupRoot, {
    className: clsx_default(classes.root, className),
    ownerState: other,
    children: (0, import_jsx_runtime22.jsx)(Fade_default, {
      appear: false,
      mountOnEnter: true,
      unmountOnExit: true,
      timeout: {
        appear: theme.transitions.duration.enteringScreen,
        enter: theme.transitions.duration.enteringScreen,
        exit: 0
      },
      children
    }, transKey)
  });
}

// node_modules/@mui/x-date-pickers/esm/DateCalendar/DayCalendar.js
var React56 = __toESM(require_react(), 1);

// node_modules/@mui/x-date-pickers/esm/PickersDay/PickersDay.js
var React54 = __toESM(require_react(), 1);
var import_prop_types13 = __toESM(require_prop_types(), 1);

// node_modules/@mui/x-date-pickers/esm/PickersDay/pickersDayClasses.js
function getPickersDayUtilityClass(slot) {
  return generateUtilityClass("MuiPickersDay", slot);
}
var pickersDayClasses = generateUtilityClasses("MuiPickersDay", ["root", "dayWithMargin", "dayOutsideMonth", "hiddenDaySpacingFiller", "today", "selected", "disabled"]);

// node_modules/@mui/x-date-pickers/esm/PickersDay/usePickerDayOwnerState.js
var React53 = __toESM(require_react(), 1);
function usePickerDayOwnerState(parameters) {
  const {
    disabled,
    selected,
    today,
    outsideCurrentMonth,
    day,
    disableMargin,
    disableHighlightToday,
    showDaysOutsideCurrentMonth
  } = parameters;
  const utils = useUtils();
  const {
    ownerState: pickerOwnerState
  } = usePickerPrivateContext();
  return React53.useMemo(() => _extends({}, pickerOwnerState, {
    day,
    isDaySelected: selected ?? false,
    isDayDisabled: disabled ?? false,
    isDayCurrent: today ?? false,
    isDayOutsideMonth: outsideCurrentMonth ?? false,
    isDayStartOfWeek: utils.isSameDay(day, utils.startOfWeek(day)),
    isDayEndOfWeek: utils.isSameDay(day, utils.endOfWeek(day)),
    disableMargin: disableMargin ?? false,
    disableHighlightToday: disableHighlightToday ?? false,
    showDaysOutsideCurrentMonth: showDaysOutsideCurrentMonth ?? false
  }), [utils, pickerOwnerState, day, selected, disabled, today, outsideCurrentMonth, disableMargin, disableHighlightToday, showDaysOutsideCurrentMonth]);
}

// node_modules/@mui/x-date-pickers/esm/PickersDay/PickersDay.js
var import_jsx_runtime23 = __toESM(require_jsx_runtime(), 1);
var _excluded21 = ["autoFocus", "className", "classes", "hidden", "isAnimating", "onClick", "onDaySelect", "onFocus", "onBlur", "onKeyDown", "onMouseDown", "onMouseEnter", "children", "isFirstVisibleCell", "isLastVisibleCell", "day", "selected", "disabled", "today", "outsideCurrentMonth", "disableMargin", "disableHighlightToday", "showDaysOutsideCurrentMonth"];
var useUtilityClasses13 = (classes, ownerState) => {
  const {
    isDaySelected,
    isDayDisabled,
    isDayCurrent,
    isDayOutsideMonth,
    disableMargin,
    disableHighlightToday,
    showDaysOutsideCurrentMonth
  } = ownerState;
  const isHiddenDaySpacingFiller = isDayOutsideMonth && !showDaysOutsideCurrentMonth;
  const slots = {
    root: ["root", isDaySelected && !isHiddenDaySpacingFiller && "selected", isDayDisabled && "disabled", !disableMargin && "dayWithMargin", !disableHighlightToday && isDayCurrent && "today", isDayOutsideMonth && showDaysOutsideCurrentMonth && "dayOutsideMonth", isHiddenDaySpacingFiller && "hiddenDaySpacingFiller"],
    hiddenDaySpacingFiller: ["hiddenDaySpacingFiller"]
  };
  return composeClasses(slots, getPickersDayUtilityClass, classes);
};
var styleArg = ({
  theme
}) => _extends({}, theme.typography.caption, {
  width: DAY_SIZE,
  height: DAY_SIZE,
  borderRadius: "50%",
  padding: 0,
  // explicitly setting to `transparent` to avoid potentially getting impacted by change from the overridden component
  backgroundColor: "transparent",
  transition: theme.transitions.create("background-color", {
    duration: theme.transitions.duration.short
  }),
  color: (theme.vars || theme).palette.text.primary,
  "@media (pointer: fine)": {
    "&:hover": {
      backgroundColor: theme.vars ? `rgba(${theme.vars.palette.primary.mainChannel} / ${theme.vars.palette.action.hoverOpacity})` : alpha(theme.palette.primary.main, theme.palette.action.hoverOpacity)
    }
  },
  "&:focus": {
    backgroundColor: theme.vars ? `rgba(${theme.vars.palette.primary.mainChannel} / ${theme.vars.palette.action.focusOpacity})` : alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
    [`&.${pickersDayClasses.selected}`]: {
      willChange: "background-color",
      backgroundColor: (theme.vars || theme).palette.primary.dark
    }
  },
  [`&.${pickersDayClasses.selected}`]: {
    color: (theme.vars || theme).palette.primary.contrastText,
    backgroundColor: (theme.vars || theme).palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    "&:hover": {
      willChange: "background-color",
      backgroundColor: (theme.vars || theme).palette.primary.dark
    }
  },
  [`&.${pickersDayClasses.disabled}:not(.${pickersDayClasses.selected})`]: {
    color: (theme.vars || theme).palette.text.disabled
  },
  [`&.${pickersDayClasses.disabled}&.${pickersDayClasses.selected}`]: {
    opacity: 0.6
  },
  variants: [{
    props: {
      disableMargin: false
    },
    style: {
      margin: `0 ${DAY_MARGIN}px`
    }
  }, {
    props: {
      isDayOutsideMonth: true,
      showDaysOutsideCurrentMonth: true
    },
    style: {
      color: (theme.vars || theme).palette.text.secondary
    }
  }, {
    props: {
      disableHighlightToday: false,
      isDayCurrent: true
    },
    style: {
      [`&:not(.${pickersDayClasses.selected})`]: {
        border: `1px solid ${(theme.vars || theme).palette.text.secondary}`
      }
    }
  }]
});
var overridesResolver = (props, styles) => {
  const {
    ownerState
  } = props;
  return [styles.root, !ownerState.disableMargin && styles.dayWithMargin, !ownerState.disableHighlightToday && ownerState.isDayCurrent && styles.today, !ownerState.isDayOutsideMonth && ownerState.showDaysOutsideCurrentMonth && styles.dayOutsideMonth, ownerState.isDayOutsideMonth && !ownerState.showDaysOutsideCurrentMonth && styles.hiddenDaySpacingFiller];
};
var PickersDayRoot = styled_default(ButtonBase_default, {
  name: "MuiPickersDay",
  slot: "Root",
  overridesResolver
})(styleArg);
var PickersDayFiller = styled_default("div", {
  name: "MuiPickersDay",
  slot: "Root",
  overridesResolver
})(({
  theme
}) => _extends({}, styleArg({
  theme
}), {
  // visibility: 'hidden' does not work here as it hides the element from screen readers as well
  opacity: 0,
  pointerEvents: "none"
}));
var noop = () => {
};
var PickersDayRaw = React54.forwardRef(function PickersDay(inProps, forwardedRef) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiPickersDay"
  });
  const {
    autoFocus = false,
    className,
    classes: classesProp,
    isAnimating,
    onClick,
    onDaySelect,
    onFocus = noop,
    onBlur = noop,
    onKeyDown = noop,
    onMouseDown = noop,
    onMouseEnter = noop,
    children,
    day,
    selected,
    disabled,
    today,
    outsideCurrentMonth,
    disableMargin,
    disableHighlightToday,
    showDaysOutsideCurrentMonth
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded21);
  const ownerState = usePickerDayOwnerState({
    day,
    selected,
    disabled,
    today,
    outsideCurrentMonth,
    disableMargin,
    disableHighlightToday,
    showDaysOutsideCurrentMonth
  });
  const classes = useUtilityClasses13(classesProp, ownerState);
  const utils = useUtils();
  const ref = React54.useRef(null);
  const handleRef = useForkRef(ref, forwardedRef);
  useEnhancedEffect_default(() => {
    if (autoFocus && !disabled && !isAnimating && !outsideCurrentMonth) {
      ref.current.focus();
    }
  }, [autoFocus, disabled, isAnimating, outsideCurrentMonth]);
  const handleMouseDown = (event) => {
    onMouseDown(event);
    if (outsideCurrentMonth) {
      event.preventDefault();
    }
  };
  const handleClick = (event) => {
    if (!disabled) {
      onDaySelect(day);
    }
    if (outsideCurrentMonth) {
      event.currentTarget.focus();
    }
    if (onClick) {
      onClick(event);
    }
  };
  if (outsideCurrentMonth && !showDaysOutsideCurrentMonth) {
    return (0, import_jsx_runtime23.jsx)(PickersDayFiller, {
      className: clsx_default(classes.root, classes.hiddenDaySpacingFiller, className),
      ownerState,
      role: other.role
    });
  }
  return (0, import_jsx_runtime23.jsx)(PickersDayRoot, _extends({
    className: clsx_default(classes.root, className),
    ref: handleRef,
    centerRipple: true,
    disabled,
    tabIndex: selected ? 0 : -1,
    onKeyDown: (event) => onKeyDown(event, day),
    onFocus: (event) => onFocus(event, day),
    onBlur: (event) => onBlur(event, day),
    onMouseEnter: (event) => onMouseEnter(event, day),
    onClick: handleClick,
    onMouseDown: handleMouseDown
  }, other, {
    ownerState,
    children: !children ? utils.format(day, "dayOfMonth") : children
  }));
});
true ? PickersDayRaw.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * A ref for imperative actions.
   * It currently only supports `focusVisible()` action.
   */
  action: import_prop_types13.default.oneOfType([import_prop_types13.default.func, import_prop_types13.default.shape({
    current: import_prop_types13.default.shape({
      focusVisible: import_prop_types13.default.func.isRequired
    })
  })]),
  /**
   * If `true`, the ripples are centered.
   * They won't start at the cursor interaction position.
   * @default false
   */
  centerRipple: import_prop_types13.default.bool,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types13.default.object,
  className: import_prop_types13.default.string,
  component: import_prop_types13.default.elementType,
  /**
   * The date to show.
   */
  day: import_prop_types13.default.object.isRequired,
  /**
   * If `true`, renders as disabled.
   * @default false
   */
  disabled: import_prop_types13.default.bool,
  /**
   * If `true`, today's date is rendering without highlighting with circle.
   * @default false
   */
  disableHighlightToday: import_prop_types13.default.bool,
  /**
   * If `true`, days are rendering without margin. Useful for displaying linked range of days.
   * @default false
   */
  disableMargin: import_prop_types13.default.bool,
  /**
   * If `true`, the ripple effect is disabled.
   *
   * ⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure
   * to highlight the element by applying separate styles with the `.Mui-focusVisible` class.
   * @default false
   */
  disableRipple: import_prop_types13.default.bool,
  /**
   * If `true`, the touch ripple effect is disabled.
   * @default false
   */
  disableTouchRipple: import_prop_types13.default.bool,
  /**
   * If `true`, the base button will have a keyboard focus ripple.
   * @default false
   */
  focusRipple: import_prop_types13.default.bool,
  /**
   * This prop can help identify which element has keyboard focus.
   * The class name will be applied when the element gains the focus through keyboard interaction.
   * It's a polyfill for the [CSS :focus-visible selector](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo).
   * The rationale for using this feature [is explained here](https://github.com/WICG/focus-visible/blob/HEAD/explainer.md).
   * A [polyfill can be used](https://github.com/WICG/focus-visible) to apply a `focus-visible` class to other components
   * if needed.
   */
  focusVisibleClassName: import_prop_types13.default.string,
  isAnimating: import_prop_types13.default.bool,
  /**
   * If `true`, day is the first visible cell of the month.
   * Either the first day of the month or the first day of the week depending on `showDaysOutsideCurrentMonth`.
   */
  isFirstVisibleCell: import_prop_types13.default.bool.isRequired,
  /**
   * If `true`, day is the last visible cell of the month.
   * Either the last day of the month or the last day of the week depending on `showDaysOutsideCurrentMonth`.
   */
  isLastVisibleCell: import_prop_types13.default.bool.isRequired,
  onBlur: import_prop_types13.default.func,
  onDaySelect: import_prop_types13.default.func.isRequired,
  onFocus: import_prop_types13.default.func,
  /**
   * Callback fired when the component is focused with a keyboard.
   * We trigger a `onFocus` callback too.
   */
  onFocusVisible: import_prop_types13.default.func,
  onKeyDown: import_prop_types13.default.func,
  onMouseEnter: import_prop_types13.default.func,
  /**
   * If `true`, day is outside of month and will be hidden.
   */
  outsideCurrentMonth: import_prop_types13.default.bool.isRequired,
  /**
   * If `true`, renders as selected.
   * @default false
   */
  selected: import_prop_types13.default.bool,
  /**
   * If `true`, days outside the current month are rendered:
   *
   * - if `fixedWeekNumber` is defined, renders days to have the weeks requested.
   *
   * - if `fixedWeekNumber` is not defined, renders day to fill the first and last week of the current month.
   *
   * - ignored if `calendars` equals more than `1` on range pickers.
   * @default false
   */
  showDaysOutsideCurrentMonth: import_prop_types13.default.bool,
  style: import_prop_types13.default.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types13.default.oneOfType([import_prop_types13.default.arrayOf(import_prop_types13.default.oneOfType([import_prop_types13.default.func, import_prop_types13.default.object, import_prop_types13.default.bool])), import_prop_types13.default.func, import_prop_types13.default.object]),
  /**
   * @default 0
   */
  tabIndex: import_prop_types13.default.number,
  /**
   * If `true`, renders as today date.
   * @default false
   */
  today: import_prop_types13.default.bool,
  /**
   * Props applied to the `TouchRipple` element.
   */
  TouchRippleProps: import_prop_types13.default.object,
  /**
   * A ref that points to the `TouchRipple` element.
   */
  touchRippleRef: import_prop_types13.default.oneOfType([import_prop_types13.default.func, import_prop_types13.default.shape({
    current: import_prop_types13.default.shape({
      pulsate: import_prop_types13.default.func.isRequired,
      start: import_prop_types13.default.func.isRequired,
      stop: import_prop_types13.default.func.isRequired
    })
  })])
} : void 0;
var PickersDay2 = React54.memo(PickersDayRaw);

// node_modules/@mui/x-date-pickers/esm/DateCalendar/PickersSlideTransition.js
var React55 = __toESM(require_react(), 1);

// node_modules/@mui/x-date-pickers/esm/DateCalendar/pickersSlideTransitionClasses.js
var getPickersSlideTransitionUtilityClass = (slot) => generateUtilityClass("MuiPickersSlideTransition", slot);
var pickersSlideTransitionClasses = generateUtilityClasses("MuiPickersSlideTransition", ["root", "slideEnter-left", "slideEnter-right", "slideEnterActive", "slideExit", "slideExitActiveLeft-left", "slideExitActiveLeft-right"]);

// node_modules/@mui/x-date-pickers/esm/DateCalendar/PickersSlideTransition.js
var import_jsx_runtime24 = __toESM(require_jsx_runtime(), 1);
var _excluded25 = ["children", "className", "reduceAnimations", "slideDirection", "transKey", "classes"];
var useUtilityClasses14 = (classes, ownerState) => {
  const {
    slideDirection
  } = ownerState;
  const slots = {
    root: ["root"],
    exit: ["slideExit"],
    enterActive: ["slideEnterActive"],
    enter: [`slideEnter-${slideDirection}`],
    exitActive: [`slideExitActiveLeft-${slideDirection}`]
  };
  return composeClasses(slots, getPickersSlideTransitionUtilityClass, classes);
};
var PickersSlideTransitionRoot = styled_default(TransitionGroup_default, {
  name: "MuiPickersSlideTransition",
  slot: "Root",
  overridesResolver: (_, styles) => [styles.root, {
    [`.${pickersSlideTransitionClasses["slideEnter-left"]}`]: styles["slideEnter-left"]
  }, {
    [`.${pickersSlideTransitionClasses["slideEnter-right"]}`]: styles["slideEnter-right"]
  }, {
    [`.${pickersSlideTransitionClasses.slideEnterActive}`]: styles.slideEnterActive
  }, {
    [`.${pickersSlideTransitionClasses.slideExit}`]: styles.slideExit
  }, {
    [`.${pickersSlideTransitionClasses["slideExitActiveLeft-left"]}`]: styles["slideExitActiveLeft-left"]
  }, {
    [`.${pickersSlideTransitionClasses["slideExitActiveLeft-right"]}`]: styles["slideExitActiveLeft-right"]
  }]
})(({
  theme
}) => {
  const slideTransition = theme.transitions.create("transform", {
    duration: theme.transitions.duration.complex,
    easing: "cubic-bezier(0.35, 0.8, 0.4, 1)"
  });
  return {
    display: "block",
    position: "relative",
    overflowX: "hidden",
    "& > *": {
      position: "absolute",
      top: 0,
      right: 0,
      left: 0
    },
    [`& .${pickersSlideTransitionClasses["slideEnter-left"]}`]: {
      willChange: "transform",
      transform: "translate(100%)",
      zIndex: 1
    },
    [`& .${pickersSlideTransitionClasses["slideEnter-right"]}`]: {
      willChange: "transform",
      transform: "translate(-100%)",
      zIndex: 1
    },
    [`& .${pickersSlideTransitionClasses.slideEnterActive}`]: {
      transform: "translate(0%)",
      transition: slideTransition
    },
    [`& .${pickersSlideTransitionClasses.slideExit}`]: {
      transform: "translate(0%)"
    },
    [`& .${pickersSlideTransitionClasses["slideExitActiveLeft-left"]}`]: {
      willChange: "transform",
      transform: "translate(-100%)",
      transition: slideTransition,
      zIndex: 0
    },
    [`& .${pickersSlideTransitionClasses["slideExitActiveLeft-right"]}`]: {
      willChange: "transform",
      transform: "translate(100%)",
      transition: slideTransition,
      zIndex: 0
    }
  };
});
function PickersSlideTransition(inProps) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiPickersSlideTransition"
  });
  const {
    children,
    className,
    reduceAnimations,
    slideDirection,
    transKey,
    classes: classesProp
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded25);
  const {
    ownerState: pickerOwnerState
  } = usePickerPrivateContext();
  const ownerState = _extends({}, pickerOwnerState, {
    slideDirection
  });
  const classes = useUtilityClasses14(classesProp, ownerState);
  const theme = useTheme();
  if (reduceAnimations) {
    return (0, import_jsx_runtime24.jsx)("div", {
      className: clsx_default(classes.root, className),
      children
    });
  }
  const transitionClasses = {
    exit: classes.exit,
    enterActive: classes.enterActive,
    enter: classes.enter,
    exitActive: classes.exitActive
  };
  return (0, import_jsx_runtime24.jsx)(PickersSlideTransitionRoot, {
    className: clsx_default(classes.root, className),
    childFactory: (element) => React55.cloneElement(element, {
      classNames: transitionClasses
    }),
    role: "presentation",
    ownerState,
    children: (0, import_jsx_runtime24.jsx)(CSSTransition_default, _extends({
      mountOnEnter: true,
      unmountOnExit: true,
      timeout: theme.transitions.duration.complex,
      classNames: transitionClasses
    }, other, {
      children
    }), transKey)
  });
}

// node_modules/@mui/x-date-pickers/esm/DateCalendar/dayCalendarClasses.js
var getDayCalendarUtilityClass = (slot) => generateUtilityClass("MuiDayCalendar", slot);
var dayCalendarClasses = generateUtilityClasses("MuiDayCalendar", ["root", "header", "weekDayLabel", "loadingContainer", "slideTransition", "monthContainer", "weekContainer", "weekNumberLabel", "weekNumber"]);

// node_modules/@mui/x-date-pickers/esm/DateCalendar/DayCalendar.js
var import_jsx_runtime25 = __toESM(require_jsx_runtime(), 1);
var _excluded26 = ["parentProps", "day", "focusedDay", "selectedDays", "isDateDisabled", "currentMonthNumber", "isViewFocused"];
var _excluded27 = ["ownerState"];
var useUtilityClasses15 = (classes) => {
  const slots = {
    root: ["root"],
    header: ["header"],
    weekDayLabel: ["weekDayLabel"],
    loadingContainer: ["loadingContainer"],
    slideTransition: ["slideTransition"],
    monthContainer: ["monthContainer"],
    weekContainer: ["weekContainer"],
    weekNumberLabel: ["weekNumberLabel"],
    weekNumber: ["weekNumber"]
  };
  return composeClasses(slots, getDayCalendarUtilityClass, classes);
};
var weeksContainerHeight = (DAY_SIZE + DAY_MARGIN * 2) * 6;
var PickersCalendarDayRoot = styled_default("div", {
  name: "MuiDayCalendar",
  slot: "Root"
})({});
var PickersCalendarDayHeader = styled_default("div", {
  name: "MuiDayCalendar",
  slot: "Header"
})({
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
});
var PickersCalendarWeekDayLabel = styled_default(Typography_default, {
  name: "MuiDayCalendar",
  slot: "WeekDayLabel"
})(({
  theme
}) => ({
  width: 36,
  height: 40,
  margin: "0 2px",
  textAlign: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: (theme.vars || theme).palette.text.secondary
}));
var PickersCalendarWeekNumberLabel = styled_default(Typography_default, {
  name: "MuiDayCalendar",
  slot: "WeekNumberLabel"
})(({
  theme
}) => ({
  width: 36,
  height: 40,
  margin: "0 2px",
  textAlign: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: (theme.vars || theme).palette.text.disabled
}));
var PickersCalendarWeekNumber = styled_default(Typography_default, {
  name: "MuiDayCalendar",
  slot: "WeekNumber"
})(({
  theme
}) => _extends({}, theme.typography.caption, {
  width: DAY_SIZE,
  height: DAY_SIZE,
  padding: 0,
  margin: `0 ${DAY_MARGIN}px`,
  color: (theme.vars || theme).palette.text.disabled,
  fontSize: "0.75rem",
  alignItems: "center",
  justifyContent: "center",
  display: "inline-flex"
}));
var PickersCalendarLoadingContainer = styled_default("div", {
  name: "MuiDayCalendar",
  slot: "LoadingContainer"
})({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: weeksContainerHeight
});
var PickersCalendarSlideTransition = styled_default(PickersSlideTransition, {
  name: "MuiDayCalendar",
  slot: "SlideTransition"
})({
  minHeight: weeksContainerHeight
});
var PickersCalendarWeekContainer = styled_default("div", {
  name: "MuiDayCalendar",
  slot: "MonthContainer"
})({
  overflow: "hidden"
});
var PickersCalendarWeek = styled_default("div", {
  name: "MuiDayCalendar",
  slot: "WeekContainer"
})({
  margin: `${DAY_MARGIN}px 0`,
  display: "flex",
  justifyContent: "center"
});
function WrappedDay(_ref) {
  let {
    parentProps,
    day,
    focusedDay,
    selectedDays,
    isDateDisabled,
    currentMonthNumber,
    isViewFocused
  } = _ref, other = _objectWithoutPropertiesLoose(_ref, _excluded26);
  const {
    disabled,
    disableHighlightToday,
    isMonthSwitchingAnimating,
    showDaysOutsideCurrentMonth,
    slots,
    slotProps,
    timezone
  } = parentProps;
  const utils = useUtils();
  const now = useNow(timezone);
  const isFocusableDay = focusedDay != null && utils.isSameDay(day, focusedDay);
  const isFocusedDay = isViewFocused && isFocusableDay;
  const isSelected = selectedDays.some((selectedDay) => utils.isSameDay(selectedDay, day));
  const isToday = utils.isSameDay(day, now);
  const isDisabled = React56.useMemo(() => disabled || isDateDisabled(day), [disabled, isDateDisabled, day]);
  const isOutsideCurrentMonth = React56.useMemo(() => utils.getMonth(day) !== currentMonthNumber, [utils, day, currentMonthNumber]);
  const ownerState = usePickerDayOwnerState({
    day,
    selected: isSelected,
    disabled: isDisabled,
    today: isToday,
    outsideCurrentMonth: isOutsideCurrentMonth,
    disableMargin: void 0,
    // This prop can only be defined using slotProps.day so the ownerState for useSlotProps cannot have its value.
    disableHighlightToday,
    showDaysOutsideCurrentMonth
  });
  const Day = (slots == null ? void 0 : slots.day) ?? PickersDay2;
  const _useSlotProps = useSlotProps_default({
    elementType: Day,
    externalSlotProps: slotProps == null ? void 0 : slotProps.day,
    additionalProps: _extends({
      disableHighlightToday,
      showDaysOutsideCurrentMonth,
      role: "gridcell",
      isAnimating: isMonthSwitchingAnimating,
      // it is used in date range dragging logic by accessing `dataset.timestamp`
      "data-timestamp": utils.toJsDate(day).valueOf()
    }, other),
    ownerState: _extends({}, ownerState, {
      day,
      isDayDisabled: isDisabled,
      isDaySelected: isSelected
    })
  }), dayProps = _objectWithoutPropertiesLoose(_useSlotProps, _excluded27);
  const isFirstVisibleCell = React56.useMemo(() => {
    const startOfMonth = utils.startOfMonth(utils.setMonth(day, currentMonthNumber));
    if (!showDaysOutsideCurrentMonth) {
      return utils.isSameDay(day, startOfMonth);
    }
    return utils.isSameDay(day, utils.startOfWeek(startOfMonth));
  }, [currentMonthNumber, day, showDaysOutsideCurrentMonth, utils]);
  const isLastVisibleCell = React56.useMemo(() => {
    const endOfMonth = utils.endOfMonth(utils.setMonth(day, currentMonthNumber));
    if (!showDaysOutsideCurrentMonth) {
      return utils.isSameDay(day, endOfMonth);
    }
    return utils.isSameDay(day, utils.endOfWeek(endOfMonth));
  }, [currentMonthNumber, day, showDaysOutsideCurrentMonth, utils]);
  return (0, import_jsx_runtime25.jsx)(Day, _extends({}, dayProps, {
    day,
    disabled: isDisabled,
    autoFocus: !isOutsideCurrentMonth && isFocusedDay,
    today: isToday,
    outsideCurrentMonth: isOutsideCurrentMonth,
    isFirstVisibleCell,
    isLastVisibleCell,
    selected: isSelected,
    tabIndex: isFocusableDay ? 0 : -1,
    "aria-selected": isSelected,
    "aria-current": isToday ? "date" : void 0
  }));
}
function DayCalendar(inProps) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiDayCalendar"
  });
  const utils = useUtils();
  const {
    onFocusedDayChange,
    className,
    classes: classesProp,
    currentMonth,
    selectedDays,
    focusedDay,
    loading,
    onSelectedDaysChange,
    onMonthSwitchingAnimationEnd,
    readOnly,
    reduceAnimations,
    renderLoading = () => (0, import_jsx_runtime25.jsx)("span", {
      children: "..."
    }),
    slideDirection,
    TransitionProps,
    disablePast,
    disableFuture,
    minDate,
    maxDate,
    shouldDisableDate,
    shouldDisableMonth,
    shouldDisableYear,
    dayOfWeekFormatter = (date) => utils.format(date, "weekdayShort").charAt(0).toUpperCase(),
    hasFocus,
    onFocusedViewChange,
    gridLabelId,
    displayWeekNumber,
    fixedWeekNumber,
    timezone
  } = props;
  const now = useNow(timezone);
  const classes = useUtilityClasses15(classesProp);
  const isRtl = useRtl();
  const isDateDisabled = useIsDateDisabled({
    shouldDisableDate,
    shouldDisableMonth,
    shouldDisableYear,
    minDate,
    maxDate,
    disablePast,
    disableFuture,
    timezone
  });
  const translations = usePickerTranslations();
  const handleDaySelect = useEventCallback_default((day) => {
    if (readOnly) {
      return;
    }
    onSelectedDaysChange(day);
  });
  const focusDay = (day) => {
    if (!isDateDisabled(day)) {
      onFocusedDayChange(day);
      onFocusedViewChange == null ? void 0 : onFocusedViewChange(true);
    }
  };
  const handleKeyDown = useEventCallback_default((event, day) => {
    switch (event.key) {
      case "ArrowUp":
        focusDay(utils.addDays(day, -7));
        event.preventDefault();
        break;
      case "ArrowDown":
        focusDay(utils.addDays(day, 7));
        event.preventDefault();
        break;
      case "ArrowLeft": {
        const newFocusedDayDefault = utils.addDays(day, isRtl ? 1 : -1);
        const nextAvailableMonth = utils.addMonths(day, isRtl ? 1 : -1);
        const closestDayToFocus = findClosestEnabledDate({
          utils,
          date: newFocusedDayDefault,
          minDate: isRtl ? newFocusedDayDefault : utils.startOfMonth(nextAvailableMonth),
          maxDate: isRtl ? utils.endOfMonth(nextAvailableMonth) : newFocusedDayDefault,
          isDateDisabled,
          timezone
        });
        focusDay(closestDayToFocus || newFocusedDayDefault);
        event.preventDefault();
        break;
      }
      case "ArrowRight": {
        const newFocusedDayDefault = utils.addDays(day, isRtl ? -1 : 1);
        const nextAvailableMonth = utils.addMonths(day, isRtl ? -1 : 1);
        const closestDayToFocus = findClosestEnabledDate({
          utils,
          date: newFocusedDayDefault,
          minDate: isRtl ? utils.startOfMonth(nextAvailableMonth) : newFocusedDayDefault,
          maxDate: isRtl ? newFocusedDayDefault : utils.endOfMonth(nextAvailableMonth),
          isDateDisabled,
          timezone
        });
        focusDay(closestDayToFocus || newFocusedDayDefault);
        event.preventDefault();
        break;
      }
      case "Home":
        focusDay(utils.startOfWeek(day));
        event.preventDefault();
        break;
      case "End":
        focusDay(utils.endOfWeek(day));
        event.preventDefault();
        break;
      case "PageUp":
        focusDay(utils.addMonths(day, 1));
        event.preventDefault();
        break;
      case "PageDown":
        focusDay(utils.addMonths(day, -1));
        event.preventDefault();
        break;
      default:
        break;
    }
  });
  const handleFocus = useEventCallback_default((event, day) => focusDay(day));
  const handleBlur = useEventCallback_default((event, day) => {
    if (focusedDay != null && utils.isSameDay(focusedDay, day)) {
      onFocusedViewChange == null ? void 0 : onFocusedViewChange(false);
    }
  });
  const currentMonthNumber = utils.getMonth(currentMonth);
  const currentYearNumber = utils.getYear(currentMonth);
  const validSelectedDays = React56.useMemo(() => selectedDays.filter((day) => !!day).map((day) => utils.startOfDay(day)), [utils, selectedDays]);
  const transitionKey = `${currentYearNumber}-${currentMonthNumber}`;
  const slideNodeRef = React56.useMemo(() => React56.createRef(), [transitionKey]);
  const weeksToDisplay = React56.useMemo(() => {
    const toDisplay = utils.getWeekArray(currentMonth);
    let nextMonth = utils.addMonths(currentMonth, 1);
    while (fixedWeekNumber && toDisplay.length < fixedWeekNumber) {
      const additionalWeeks = utils.getWeekArray(nextMonth);
      const hasCommonWeek = utils.isSameDay(toDisplay[toDisplay.length - 1][0], additionalWeeks[0][0]);
      additionalWeeks.slice(hasCommonWeek ? 1 : 0).forEach((week) => {
        if (toDisplay.length < fixedWeekNumber) {
          toDisplay.push(week);
        }
      });
      nextMonth = utils.addMonths(nextMonth, 1);
    }
    return toDisplay;
  }, [currentMonth, fixedWeekNumber, utils]);
  return (0, import_jsx_runtime25.jsxs)(PickersCalendarDayRoot, {
    role: "grid",
    "aria-labelledby": gridLabelId,
    className: classes.root,
    children: [(0, import_jsx_runtime25.jsxs)(PickersCalendarDayHeader, {
      role: "row",
      className: classes.header,
      children: [displayWeekNumber && (0, import_jsx_runtime25.jsx)(PickersCalendarWeekNumberLabel, {
        variant: "caption",
        role: "columnheader",
        "aria-label": translations.calendarWeekNumberHeaderLabel,
        className: classes.weekNumberLabel,
        children: translations.calendarWeekNumberHeaderText
      }), getWeekdays(utils, now).map((weekday, i) => (0, import_jsx_runtime25.jsx)(PickersCalendarWeekDayLabel, {
        variant: "caption",
        role: "columnheader",
        "aria-label": utils.format(weekday, "weekday"),
        className: classes.weekDayLabel,
        children: dayOfWeekFormatter(weekday)
      }, i.toString()))]
    }), loading ? (0, import_jsx_runtime25.jsx)(PickersCalendarLoadingContainer, {
      className: classes.loadingContainer,
      children: renderLoading()
    }) : (0, import_jsx_runtime25.jsx)(PickersCalendarSlideTransition, _extends({
      transKey: transitionKey,
      onExited: onMonthSwitchingAnimationEnd,
      reduceAnimations,
      slideDirection,
      className: clsx_default(className, classes.slideTransition)
    }, TransitionProps, {
      nodeRef: slideNodeRef,
      children: (0, import_jsx_runtime25.jsx)(PickersCalendarWeekContainer, {
        ref: slideNodeRef,
        role: "rowgroup",
        className: classes.monthContainer,
        children: weeksToDisplay.map((week, index) => (0, import_jsx_runtime25.jsxs)(PickersCalendarWeek, {
          role: "row",
          className: classes.weekContainer,
          "aria-rowindex": index + 1,
          children: [displayWeekNumber && (0, import_jsx_runtime25.jsx)(PickersCalendarWeekNumber, {
            className: classes.weekNumber,
            role: "rowheader",
            "aria-label": translations.calendarWeekNumberAriaLabelText(utils.getWeekNumber(week[0])),
            children: translations.calendarWeekNumberText(utils.getWeekNumber(week[0]))
          }), week.map((day, dayIndex) => (0, import_jsx_runtime25.jsx)(WrappedDay, {
            parentProps: props,
            day,
            selectedDays: validSelectedDays,
            isViewFocused: hasFocus,
            focusedDay,
            onKeyDown: handleKeyDown,
            onFocus: handleFocus,
            onBlur: handleBlur,
            onDaySelect: handleDaySelect,
            isDateDisabled,
            currentMonthNumber,
            "aria-colindex": dayIndex + 1
          }, day.toString()))]
        }, `week-${week[0]}`))
      })
    }))]
  });
}

// node_modules/@mui/x-date-pickers/esm/MonthCalendar/MonthCalendar.js
var React58 = __toESM(require_react(), 1);
var import_prop_types14 = __toESM(require_prop_types(), 1);

// node_modules/@mui/x-date-pickers/esm/MonthCalendar/MonthCalendarButton.js
var React57 = __toESM(require_react(), 1);

// node_modules/@mui/x-date-pickers/esm/MonthCalendar/monthCalendarClasses.js
function getMonthCalendarUtilityClass(slot) {
  return generateUtilityClass("MuiMonthCalendar", slot);
}
var monthCalendarClasses = generateUtilityClasses("MuiMonthCalendar", ["root", "button", "disabled", "selected"]);

// node_modules/@mui/x-date-pickers/esm/MonthCalendar/MonthCalendarButton.js
var import_jsx_runtime26 = __toESM(require_jsx_runtime(), 1);
var _excluded28 = ["autoFocus", "classes", "disabled", "selected", "value", "onClick", "onKeyDown", "onFocus", "onBlur", "slots", "slotProps"];
var useUtilityClasses16 = (classes, ownerState) => {
  const slots = {
    button: ["button", ownerState.isMonthDisabled && "disabled", ownerState.isMonthSelected && "selected"]
  };
  return composeClasses(slots, getMonthCalendarUtilityClass, classes);
};
var DefaultMonthButton = styled_default("button", {
  name: "MuiMonthCalendar",
  slot: "Button",
  overridesResolver: (_, styles) => [styles.button, {
    [`&.${monthCalendarClasses.disabled}`]: styles.disabled
  }, {
    [`&.${monthCalendarClasses.selected}`]: styles.selected
  }]
})(({
  theme
}) => _extends({
  color: "unset",
  backgroundColor: "transparent",
  border: 0,
  outline: 0
}, theme.typography.subtitle1, {
  height: 36,
  width: 72,
  borderRadius: 18,
  cursor: "pointer",
  "&:focus": {
    backgroundColor: theme.vars ? `rgba(${theme.vars.palette.action.activeChannel} / ${theme.vars.palette.action.hoverOpacity})` : alpha(theme.palette.action.active, theme.palette.action.hoverOpacity)
  },
  "&:hover": {
    backgroundColor: theme.vars ? `rgba(${theme.vars.palette.action.activeChannel} / ${theme.vars.palette.action.hoverOpacity})` : alpha(theme.palette.action.active, theme.palette.action.hoverOpacity)
  },
  "&:disabled": {
    cursor: "auto",
    pointerEvents: "none"
  },
  [`&.${monthCalendarClasses.disabled}`]: {
    color: (theme.vars || theme).palette.text.secondary
  },
  [`&.${monthCalendarClasses.selected}`]: {
    color: (theme.vars || theme).palette.primary.contrastText,
    backgroundColor: (theme.vars || theme).palette.primary.main,
    "&:focus, &:hover": {
      backgroundColor: (theme.vars || theme).palette.primary.dark
    }
  }
}));
var MonthCalendarButton = React57.memo(function MonthCalendarButton2(props) {
  const {
    autoFocus,
    classes: classesProp,
    disabled,
    selected,
    value,
    onClick,
    onKeyDown,
    onFocus,
    onBlur,
    slots,
    slotProps
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded28);
  const ref = React57.useRef(null);
  const {
    ownerState: pickerOwnerState
  } = usePickerPrivateContext();
  const ownerState = _extends({}, pickerOwnerState, {
    isMonthDisabled: disabled,
    isMonthSelected: selected
  });
  const classes = useUtilityClasses16(classesProp, ownerState);
  useEnhancedEffect_default(() => {
    var _a;
    if (autoFocus) {
      (_a = ref.current) == null ? void 0 : _a.focus();
    }
  }, [autoFocus]);
  const MonthButton = (slots == null ? void 0 : slots.monthButton) ?? DefaultMonthButton;
  const monthButtonProps = useSlotProps_default({
    elementType: MonthButton,
    externalSlotProps: slotProps == null ? void 0 : slotProps.monthButton,
    externalForwardedProps: other,
    additionalProps: {
      disabled,
      ref,
      type: "button",
      role: "radio",
      "aria-checked": selected,
      onClick: (event) => onClick(event, value),
      onKeyDown: (event) => onKeyDown(event, value),
      onFocus: (event) => onFocus(event, value),
      onBlur: (event) => onBlur(event, value)
    },
    ownerState,
    className: classes.button
  });
  return (0, import_jsx_runtime26.jsx)(MonthButton, _extends({}, monthButtonProps));
});

// node_modules/@mui/x-date-pickers/esm/MonthCalendar/MonthCalendar.js
var import_jsx_runtime27 = __toESM(require_jsx_runtime(), 1);
var _excluded29 = ["autoFocus", "className", "classes", "value", "defaultValue", "referenceDate", "disabled", "disableFuture", "disablePast", "maxDate", "minDate", "onChange", "shouldDisableMonth", "readOnly", "disableHighlightToday", "onMonthFocus", "hasFocus", "onFocusedViewChange", "monthsPerRow", "timezone", "gridLabelId", "slots", "slotProps"];
var useUtilityClasses17 = (classes) => {
  const slots = {
    root: ["root"]
  };
  return composeClasses(slots, getMonthCalendarUtilityClass, classes);
};
function useMonthCalendarDefaultizedProps(props, name) {
  const themeProps = useThemeProps({
    props,
    name
  });
  const validationProps = useApplyDefaultValuesToDateValidationProps(themeProps);
  return _extends({}, themeProps, validationProps, {
    monthsPerRow: themeProps.monthsPerRow ?? 3
  });
}
var MonthCalendarRoot = styled_default("div", {
  name: "MuiMonthCalendar",
  slot: "Root",
  shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== "monthsPerRow"
})({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-evenly",
  rowGap: 16,
  padding: "8px 0",
  width: DIALOG_WIDTH,
  // avoid padding increasing width over defined
  boxSizing: "border-box",
  variants: [{
    props: {
      monthsPerRow: 3
    },
    style: {
      columnGap: 24
    }
  }, {
    props: {
      monthsPerRow: 4
    },
    style: {
      columnGap: 0
    }
  }]
});
var MonthCalendar = React58.forwardRef(function MonthCalendar2(inProps, ref) {
  const props = useMonthCalendarDefaultizedProps(inProps, "MuiMonthCalendar");
  const {
    autoFocus,
    className,
    classes: classesProp,
    value: valueProp,
    defaultValue,
    referenceDate: referenceDateProp,
    disabled,
    disableFuture,
    disablePast,
    maxDate,
    minDate,
    onChange,
    shouldDisableMonth,
    readOnly,
    onMonthFocus,
    hasFocus,
    onFocusedViewChange,
    monthsPerRow,
    timezone: timezoneProp,
    gridLabelId,
    slots,
    slotProps
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded29);
  const {
    value,
    handleValueChange,
    timezone
  } = useControlledValue({
    name: "MonthCalendar",
    timezone: timezoneProp,
    value: valueProp,
    defaultValue,
    referenceDate: referenceDateProp,
    onChange,
    valueManager: singleItemValueManager
  });
  const now = useNow(timezone);
  const isRtl = useRtl();
  const utils = useUtils();
  const {
    ownerState
  } = usePickerPrivateContext();
  const referenceDate = React58.useMemo(
    () => singleItemValueManager.getInitialReferenceValue({
      value,
      utils,
      props,
      timezone,
      referenceDate: referenceDateProp,
      granularity: SECTION_TYPE_GRANULARITY.month
    }),
    []
    // eslint-disable-line react-hooks/exhaustive-deps
  );
  const classes = useUtilityClasses17(classesProp);
  const todayMonth = React58.useMemo(() => utils.getMonth(now), [utils, now]);
  const selectedMonth = React58.useMemo(() => {
    if (value != null) {
      return utils.getMonth(value);
    }
    return null;
  }, [value, utils]);
  const [focusedMonth, setFocusedMonth] = React58.useState(() => selectedMonth || utils.getMonth(referenceDate));
  const [internalHasFocus, setInternalHasFocus] = useControlled({
    name: "MonthCalendar",
    state: "hasFocus",
    controlled: hasFocus,
    default: autoFocus ?? false
  });
  const changeHasFocus = useEventCallback_default((newHasFocus) => {
    setInternalHasFocus(newHasFocus);
    if (onFocusedViewChange) {
      onFocusedViewChange(newHasFocus);
    }
  });
  const isMonthDisabled = React58.useCallback((dateToValidate) => {
    const firstEnabledMonth = utils.startOfMonth(disablePast && utils.isAfter(now, minDate) ? now : minDate);
    const lastEnabledMonth = utils.startOfMonth(disableFuture && utils.isBefore(now, maxDate) ? now : maxDate);
    const monthToValidate = utils.startOfMonth(dateToValidate);
    if (utils.isBefore(monthToValidate, firstEnabledMonth)) {
      return true;
    }
    if (utils.isAfter(monthToValidate, lastEnabledMonth)) {
      return true;
    }
    if (!shouldDisableMonth) {
      return false;
    }
    return shouldDisableMonth(monthToValidate);
  }, [disableFuture, disablePast, maxDate, minDate, now, shouldDisableMonth, utils]);
  const handleMonthSelection = useEventCallback_default((event, month) => {
    if (readOnly) {
      return;
    }
    const newDate = utils.setMonth(value ?? referenceDate, month);
    handleValueChange(newDate);
  });
  const focusMonth = useEventCallback_default((month) => {
    if (!isMonthDisabled(utils.setMonth(value ?? referenceDate, month))) {
      setFocusedMonth(month);
      changeHasFocus(true);
      if (onMonthFocus) {
        onMonthFocus(month);
      }
    }
  });
  React58.useEffect(() => {
    setFocusedMonth((prevFocusedMonth) => selectedMonth !== null && prevFocusedMonth !== selectedMonth ? selectedMonth : prevFocusedMonth);
  }, [selectedMonth]);
  const handleKeyDown = useEventCallback_default((event, month) => {
    const monthsInYear = 12;
    const monthsInRow = 3;
    switch (event.key) {
      case "ArrowUp":
        focusMonth((monthsInYear + month - monthsInRow) % monthsInYear);
        event.preventDefault();
        break;
      case "ArrowDown":
        focusMonth((monthsInYear + month + monthsInRow) % monthsInYear);
        event.preventDefault();
        break;
      case "ArrowLeft":
        focusMonth((monthsInYear + month + (isRtl ? 1 : -1)) % monthsInYear);
        event.preventDefault();
        break;
      case "ArrowRight":
        focusMonth((monthsInYear + month + (isRtl ? -1 : 1)) % monthsInYear);
        event.preventDefault();
        break;
      default:
        break;
    }
  });
  const handleMonthFocus = useEventCallback_default((event, month) => {
    focusMonth(month);
  });
  const handleMonthBlur = useEventCallback_default((event, month) => {
    if (focusedMonth === month) {
      changeHasFocus(false);
    }
  });
  return (0, import_jsx_runtime27.jsx)(MonthCalendarRoot, _extends({
    ref,
    className: clsx_default(classes.root, className),
    ownerState,
    role: "radiogroup",
    "aria-labelledby": gridLabelId,
    monthsPerRow
  }, other, {
    children: getMonthsInYear(utils, value ?? referenceDate).map((month) => {
      const monthNumber = utils.getMonth(month);
      const monthText = utils.format(month, "monthShort");
      const monthLabel = utils.format(month, "month");
      const isSelected = monthNumber === selectedMonth;
      const isDisabled = disabled || isMonthDisabled(month);
      return (0, import_jsx_runtime27.jsx)(MonthCalendarButton, {
        selected: isSelected,
        value: monthNumber,
        onClick: handleMonthSelection,
        onKeyDown: handleKeyDown,
        autoFocus: internalHasFocus && monthNumber === focusedMonth,
        disabled: isDisabled,
        tabIndex: monthNumber === focusedMonth && !isDisabled ? 0 : -1,
        onFocus: handleMonthFocus,
        onBlur: handleMonthBlur,
        "aria-current": todayMonth === monthNumber ? "date" : void 0,
        "aria-label": monthLabel,
        slots,
        slotProps,
        classes: classesProp,
        children: monthText
      }, monthText);
    })
  }));
});
true ? MonthCalendar.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  autoFocus: import_prop_types14.default.bool,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types14.default.object,
  className: import_prop_types14.default.string,
  /**
   * The default selected value.
   * Used when the component is not controlled.
   */
  defaultValue: import_prop_types14.default.object,
  /**
   * If `true`, the component is disabled.
   * When disabled, the value cannot be changed and no interaction is possible.
   * @default false
   */
  disabled: import_prop_types14.default.bool,
  /**
   * If `true`, disable values after the current date for date components, time for time components and both for date time components.
   * @default false
   */
  disableFuture: import_prop_types14.default.bool,
  /**
   * If `true`, today's date is rendering without highlighting with circle.
   * @default false
   */
  disableHighlightToday: import_prop_types14.default.bool,
  /**
   * If `true`, disable values before the current date for date components, time for time components and both for date time components.
   * @default false
   */
  disablePast: import_prop_types14.default.bool,
  gridLabelId: import_prop_types14.default.string,
  hasFocus: import_prop_types14.default.bool,
  /**
   * Maximal selectable date.
   * @default 2099-12-31
   */
  maxDate: import_prop_types14.default.object,
  /**
   * Minimal selectable date.
   * @default 1900-01-01
   */
  minDate: import_prop_types14.default.object,
  /**
   * Months rendered per row.
   * @default 3
   */
  monthsPerRow: import_prop_types14.default.oneOf([3, 4]),
  /**
   * Callback fired when the value changes.
   * @param {PickerValidDate} value The new value.
   */
  onChange: import_prop_types14.default.func,
  onFocusedViewChange: import_prop_types14.default.func,
  onMonthFocus: import_prop_types14.default.func,
  /**
   * If `true`, the component is read-only.
   * When read-only, the value cannot be changed but the user can interact with the interface.
   * @default false
   */
  readOnly: import_prop_types14.default.bool,
  /**
   * The date used to generate the new value when both `value` and `defaultValue` are empty.
   * @default The closest valid month using the validation props, except callbacks such as `shouldDisableMonth`.
   */
  referenceDate: import_prop_types14.default.object,
  /**
   * Disable specific month.
   * @param {PickerValidDate} month The month to test.
   * @returns {boolean} If `true`, the month will be disabled.
   */
  shouldDisableMonth: import_prop_types14.default.func,
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps: import_prop_types14.default.object,
  /**
   * Overridable component slots.
   * @default {}
   */
  slots: import_prop_types14.default.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types14.default.oneOfType([import_prop_types14.default.arrayOf(import_prop_types14.default.oneOfType([import_prop_types14.default.func, import_prop_types14.default.object, import_prop_types14.default.bool])), import_prop_types14.default.func, import_prop_types14.default.object]),
  /**
   * Choose which timezone to use for the value.
   * Example: "default", "system", "UTC", "America/New_York".
   * If you pass values from other timezones to some props, they will be converted to this timezone before being used.
   * @see See the {@link https://mui.com/x/react-date-pickers/timezone/ timezones documentation} for more details.
   * @default The timezone of the `value` or `defaultValue` prop is defined, 'default' otherwise.
   */
  timezone: import_prop_types14.default.string,
  /**
   * The selected value.
   * Used when the component is controlled.
   */
  value: import_prop_types14.default.object
} : void 0;

// node_modules/@mui/x-date-pickers/esm/YearCalendar/YearCalendar.js
var React60 = __toESM(require_react(), 1);
var import_prop_types15 = __toESM(require_prop_types(), 1);

// node_modules/@mui/x-date-pickers/esm/YearCalendar/YearCalendarButton.js
var React59 = __toESM(require_react(), 1);

// node_modules/@mui/x-date-pickers/esm/YearCalendar/yearCalendarClasses.js
function getYearCalendarUtilityClass(slot) {
  return generateUtilityClass("MuiYearCalendar", slot);
}
var yearCalendarClasses = generateUtilityClasses("MuiYearCalendar", ["root", "button", "disabled", "selected"]);

// node_modules/@mui/x-date-pickers/esm/YearCalendar/YearCalendarButton.js
var import_jsx_runtime28 = __toESM(require_jsx_runtime(), 1);
var _excluded30 = ["autoFocus", "classes", "disabled", "selected", "value", "onClick", "onKeyDown", "onFocus", "onBlur", "slots", "slotProps"];
var useUtilityClasses18 = (classes, ownerState) => {
  const slots = {
    button: ["button", ownerState.isYearDisabled && "disabled", ownerState.isYearSelected && "selected"]
  };
  return composeClasses(slots, getYearCalendarUtilityClass, classes);
};
var DefaultYearButton = styled_default("button", {
  name: "MuiYearCalendar",
  slot: "Button",
  overridesResolver: (_, styles) => [styles.button, {
    [`&.${yearCalendarClasses.disabled}`]: styles.disabled
  }, {
    [`&.${yearCalendarClasses.selected}`]: styles.selected
  }]
})(({
  theme
}) => _extends({
  color: "unset",
  backgroundColor: "transparent",
  border: 0,
  outline: 0
}, theme.typography.subtitle1, {
  height: 36,
  width: 72,
  borderRadius: 18,
  cursor: "pointer",
  "&:focus": {
    backgroundColor: theme.vars ? `rgba(${theme.vars.palette.action.activeChannel} / ${theme.vars.palette.action.focusOpacity})` : alpha(theme.palette.action.active, theme.palette.action.focusOpacity)
  },
  "&:hover": {
    backgroundColor: theme.vars ? `rgba(${theme.vars.palette.action.activeChannel} / ${theme.vars.palette.action.hoverOpacity})` : alpha(theme.palette.action.active, theme.palette.action.hoverOpacity)
  },
  "&:disabled": {
    cursor: "auto",
    pointerEvents: "none"
  },
  [`&.${yearCalendarClasses.disabled}`]: {
    color: (theme.vars || theme).palette.text.secondary
  },
  [`&.${yearCalendarClasses.selected}`]: {
    color: (theme.vars || theme).palette.primary.contrastText,
    backgroundColor: (theme.vars || theme).palette.primary.main,
    "&:focus, &:hover": {
      backgroundColor: (theme.vars || theme).palette.primary.dark
    }
  }
}));
var YearCalendarButton = React59.memo(function YearCalendarButton2(props) {
  const {
    autoFocus,
    classes: classesProp,
    disabled,
    selected,
    value,
    onClick,
    onKeyDown,
    onFocus,
    onBlur,
    slots,
    slotProps
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded30);
  const ref = React59.useRef(null);
  const {
    ownerState: pickerOwnerState
  } = usePickerPrivateContext();
  const ownerState = _extends({}, pickerOwnerState, {
    isYearDisabled: disabled,
    isYearSelected: selected
  });
  const classes = useUtilityClasses18(classesProp, ownerState);
  useEnhancedEffect_default(() => {
    var _a;
    if (autoFocus) {
      (_a = ref.current) == null ? void 0 : _a.focus();
    }
  }, [autoFocus]);
  const YearButton = (slots == null ? void 0 : slots.yearButton) ?? DefaultYearButton;
  const yearButtonProps = useSlotProps_default({
    elementType: YearButton,
    externalSlotProps: slotProps == null ? void 0 : slotProps.yearButton,
    externalForwardedProps: other,
    additionalProps: {
      disabled,
      ref,
      type: "button",
      role: "radio",
      "aria-checked": selected,
      onClick: (event) => onClick(event, value),
      onKeyDown: (event) => onKeyDown(event, value),
      onFocus: (event) => onFocus(event, value),
      onBlur: (event) => onBlur(event, value)
    },
    ownerState,
    className: classes.button
  });
  return (0, import_jsx_runtime28.jsx)(YearButton, _extends({}, yearButtonProps));
});

// node_modules/@mui/x-date-pickers/esm/YearCalendar/YearCalendar.js
var import_jsx_runtime29 = __toESM(require_jsx_runtime(), 1);
var _excluded31 = ["autoFocus", "className", "classes", "value", "defaultValue", "referenceDate", "disabled", "disableFuture", "disablePast", "maxDate", "minDate", "onChange", "readOnly", "shouldDisableYear", "disableHighlightToday", "onYearFocus", "hasFocus", "onFocusedViewChange", "yearsOrder", "yearsPerRow", "timezone", "gridLabelId", "slots", "slotProps"];
var useUtilityClasses19 = (classes) => {
  const slots = {
    root: ["root"]
  };
  return composeClasses(slots, getYearCalendarUtilityClass, classes);
};
function useYearCalendarDefaultizedProps(props, name) {
  const themeProps = useThemeProps({
    props,
    name
  });
  const validationProps = useApplyDefaultValuesToDateValidationProps(themeProps);
  return _extends({}, themeProps, validationProps, {
    yearsPerRow: themeProps.yearsPerRow ?? 3,
    yearsOrder: themeProps.yearsOrder ?? "asc"
  });
}
var YearCalendarRoot = styled_default("div", {
  name: "MuiYearCalendar",
  slot: "Root",
  shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== "yearsPerRow"
})({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-evenly",
  rowGap: 12,
  padding: "6px 0",
  overflowY: "auto",
  height: "100%",
  width: DIALOG_WIDTH,
  maxHeight: MAX_CALENDAR_HEIGHT,
  // avoid padding increasing width over defined
  boxSizing: "border-box",
  position: "relative",
  variants: [{
    props: {
      yearsPerRow: 3
    },
    style: {
      columnGap: 24
    }
  }, {
    props: {
      yearsPerRow: 4
    },
    style: {
      columnGap: 0,
      padding: "0 2px"
    }
  }]
});
var YearCalendarButtonFiller = styled_default("div", {
  name: "MuiYearCalendar",
  slot: "ButtonFiller"
})({
  height: 36,
  width: 72
});
var YearCalendar = React60.forwardRef(function YearCalendar2(inProps, ref) {
  const props = useYearCalendarDefaultizedProps(inProps, "MuiYearCalendar");
  const {
    autoFocus,
    className,
    classes: classesProp,
    value: valueProp,
    defaultValue,
    referenceDate: referenceDateProp,
    disabled,
    disableFuture,
    disablePast,
    maxDate,
    minDate,
    onChange,
    readOnly,
    shouldDisableYear,
    onYearFocus,
    hasFocus,
    onFocusedViewChange,
    yearsOrder,
    yearsPerRow,
    timezone: timezoneProp,
    gridLabelId,
    slots,
    slotProps
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded31);
  const {
    value,
    handleValueChange,
    timezone
  } = useControlledValue({
    name: "YearCalendar",
    timezone: timezoneProp,
    value: valueProp,
    defaultValue,
    referenceDate: referenceDateProp,
    onChange,
    valueManager: singleItemValueManager
  });
  const now = useNow(timezone);
  const isRtl = useRtl();
  const utils = useUtils();
  const {
    ownerState
  } = usePickerPrivateContext();
  const referenceDate = React60.useMemo(
    () => singleItemValueManager.getInitialReferenceValue({
      value,
      utils,
      props,
      timezone,
      referenceDate: referenceDateProp,
      granularity: SECTION_TYPE_GRANULARITY.year
    }),
    []
    // eslint-disable-line react-hooks/exhaustive-deps
  );
  const classes = useUtilityClasses19(classesProp);
  const todayYear = React60.useMemo(() => utils.getYear(now), [utils, now]);
  const selectedYear = React60.useMemo(() => {
    if (value != null) {
      return utils.getYear(value);
    }
    return null;
  }, [value, utils]);
  const [focusedYear, setFocusedYear] = React60.useState(() => selectedYear || utils.getYear(referenceDate));
  const [internalHasFocus, setInternalHasFocus] = useControlled({
    name: "YearCalendar",
    state: "hasFocus",
    controlled: hasFocus,
    default: autoFocus ?? false
  });
  const changeHasFocus = useEventCallback_default((newHasFocus) => {
    setInternalHasFocus(newHasFocus);
    if (onFocusedViewChange) {
      onFocusedViewChange(newHasFocus);
    }
  });
  const isYearDisabled = React60.useCallback((dateToValidate) => {
    if (disablePast && utils.isBeforeYear(dateToValidate, now)) {
      return true;
    }
    if (disableFuture && utils.isAfterYear(dateToValidate, now)) {
      return true;
    }
    if (minDate && utils.isBeforeYear(dateToValidate, minDate)) {
      return true;
    }
    if (maxDate && utils.isAfterYear(dateToValidate, maxDate)) {
      return true;
    }
    if (!shouldDisableYear) {
      return false;
    }
    const yearToValidate = utils.startOfYear(dateToValidate);
    return shouldDisableYear(yearToValidate);
  }, [disableFuture, disablePast, maxDate, minDate, now, shouldDisableYear, utils]);
  const handleYearSelection = useEventCallback_default((event, year) => {
    if (readOnly) {
      return;
    }
    const newDate = utils.setYear(value ?? referenceDate, year);
    handleValueChange(newDate);
  });
  const focusYear = useEventCallback_default((year) => {
    if (!isYearDisabled(utils.setYear(value ?? referenceDate, year))) {
      setFocusedYear(year);
      changeHasFocus(true);
      onYearFocus == null ? void 0 : onYearFocus(year);
    }
  });
  React60.useEffect(() => {
    setFocusedYear((prevFocusedYear) => selectedYear !== null && prevFocusedYear !== selectedYear ? selectedYear : prevFocusedYear);
  }, [selectedYear]);
  const verticalDirection = yearsOrder !== "desc" ? yearsPerRow * 1 : yearsPerRow * -1;
  const horizontalDirection = isRtl && yearsOrder === "asc" || !isRtl && yearsOrder === "desc" ? -1 : 1;
  const handleKeyDown = useEventCallback_default((event, year) => {
    switch (event.key) {
      case "ArrowUp":
        focusYear(year - verticalDirection);
        event.preventDefault();
        break;
      case "ArrowDown":
        focusYear(year + verticalDirection);
        event.preventDefault();
        break;
      case "ArrowLeft":
        focusYear(year - horizontalDirection);
        event.preventDefault();
        break;
      case "ArrowRight":
        focusYear(year + horizontalDirection);
        event.preventDefault();
        break;
      default:
        break;
    }
  });
  const handleYearFocus = useEventCallback_default((event, year) => {
    focusYear(year);
  });
  const handleYearBlur = useEventCallback_default((event, year) => {
    if (focusedYear === year) {
      changeHasFocus(false);
    }
  });
  const scrollerRef = React60.useRef(null);
  const handleRef = useForkRef(ref, scrollerRef);
  React60.useEffect(() => {
    if (autoFocus || scrollerRef.current === null) {
      return;
    }
    const tabbableButton = scrollerRef.current.querySelector('[tabindex="0"]');
    if (!tabbableButton) {
      return;
    }
    const offsetHeight = tabbableButton.offsetHeight;
    const offsetTop = tabbableButton.offsetTop;
    const clientHeight = scrollerRef.current.clientHeight;
    const scrollTop = scrollerRef.current.scrollTop;
    const elementBottom = offsetTop + offsetHeight;
    if (offsetHeight > clientHeight || offsetTop < scrollTop) {
      return;
    }
    scrollerRef.current.scrollTop = elementBottom - clientHeight / 2 - offsetHeight / 2;
  }, [autoFocus]);
  const yearRange = utils.getYearRange([minDate, maxDate]);
  if (yearsOrder === "desc") {
    yearRange.reverse();
  }
  let fillerAmount = yearsPerRow - yearRange.length % yearsPerRow;
  if (fillerAmount === yearsPerRow) {
    fillerAmount = 0;
  }
  return (0, import_jsx_runtime29.jsxs)(YearCalendarRoot, _extends({
    ref: handleRef,
    className: clsx_default(classes.root, className),
    ownerState,
    role: "radiogroup",
    "aria-labelledby": gridLabelId,
    yearsPerRow
  }, other, {
    children: [yearRange.map((year) => {
      const yearNumber = utils.getYear(year);
      const isSelected = yearNumber === selectedYear;
      const isDisabled = disabled || isYearDisabled(year);
      return (0, import_jsx_runtime29.jsx)(YearCalendarButton, {
        selected: isSelected,
        value: yearNumber,
        onClick: handleYearSelection,
        onKeyDown: handleKeyDown,
        autoFocus: internalHasFocus && yearNumber === focusedYear,
        disabled: isDisabled,
        tabIndex: yearNumber === focusedYear && !isDisabled ? 0 : -1,
        onFocus: handleYearFocus,
        onBlur: handleYearBlur,
        "aria-current": todayYear === yearNumber ? "date" : void 0,
        slots,
        slotProps,
        classes: classesProp,
        children: utils.format(year, "year")
      }, utils.format(year, "year"));
    }), Array.from({
      length: fillerAmount
    }, (_, index) => (0, import_jsx_runtime29.jsx)(YearCalendarButtonFiller, {}, index))]
  }));
});
true ? YearCalendar.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  autoFocus: import_prop_types15.default.bool,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types15.default.object,
  className: import_prop_types15.default.string,
  /**
   * The default selected value.
   * Used when the component is not controlled.
   */
  defaultValue: import_prop_types15.default.object,
  /**
   * If `true`, the component is disabled.
   * When disabled, the value cannot be changed and no interaction is possible.
   * @default false
   */
  disabled: import_prop_types15.default.bool,
  /**
   * If `true`, disable values after the current date for date components, time for time components and both for date time components.
   * @default false
   */
  disableFuture: import_prop_types15.default.bool,
  /**
   * If `true`, today's date is rendering without highlighting with circle.
   * @default false
   */
  disableHighlightToday: import_prop_types15.default.bool,
  /**
   * If `true`, disable values before the current date for date components, time for time components and both for date time components.
   * @default false
   */
  disablePast: import_prop_types15.default.bool,
  gridLabelId: import_prop_types15.default.string,
  hasFocus: import_prop_types15.default.bool,
  /**
   * Maximal selectable date.
   * @default 2099-12-31
   */
  maxDate: import_prop_types15.default.object,
  /**
   * Minimal selectable date.
   * @default 1900-01-01
   */
  minDate: import_prop_types15.default.object,
  /**
   * Callback fired when the value changes.
   * @param {PickerValidDate} value The new value.
   */
  onChange: import_prop_types15.default.func,
  onFocusedViewChange: import_prop_types15.default.func,
  onYearFocus: import_prop_types15.default.func,
  /**
   * If `true`, the component is read-only.
   * When read-only, the value cannot be changed but the user can interact with the interface.
   * @default false
   */
  readOnly: import_prop_types15.default.bool,
  /**
   * The date used to generate the new value when both `value` and `defaultValue` are empty.
   * @default The closest valid year using the validation props, except callbacks such as `shouldDisableYear`.
   */
  referenceDate: import_prop_types15.default.object,
  /**
   * Disable specific year.
   * @param {PickerValidDate} year The year to test.
   * @returns {boolean} If `true`, the year will be disabled.
   */
  shouldDisableYear: import_prop_types15.default.func,
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps: import_prop_types15.default.object,
  /**
   * Overridable component slots.
   * @default {}
   */
  slots: import_prop_types15.default.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types15.default.oneOfType([import_prop_types15.default.arrayOf(import_prop_types15.default.oneOfType([import_prop_types15.default.func, import_prop_types15.default.object, import_prop_types15.default.bool])), import_prop_types15.default.func, import_prop_types15.default.object]),
  /**
   * Choose which timezone to use for the value.
   * Example: "default", "system", "UTC", "America/New_York".
   * If you pass values from other timezones to some props, they will be converted to this timezone before being used.
   * @see See the {@link https://mui.com/x/react-date-pickers/timezone/ timezones documentation} for more details.
   * @default The timezone of the `value` or `defaultValue` prop is defined, 'default' otherwise.
   */
  timezone: import_prop_types15.default.string,
  /**
   * The selected value.
   * Used when the component is controlled.
   */
  value: import_prop_types15.default.object,
  /**
   * Years are displayed in ascending (chronological) order by default.
   * If `desc`, years are displayed in descending order.
   * @default 'asc'
   */
  yearsOrder: import_prop_types15.default.oneOf(["asc", "desc"]),
  /**
   * Years rendered per row.
   * @default 3
   */
  yearsPerRow: import_prop_types15.default.oneOf([3, 4])
} : void 0;

// node_modules/@mui/x-date-pickers/esm/PickersCalendarHeader/pickersCalendarHeaderClasses.js
var getPickersCalendarHeaderUtilityClass = (slot) => generateUtilityClass("MuiPickersCalendarHeader", slot);
var pickersCalendarHeaderClasses = generateUtilityClasses("MuiPickersCalendarHeader", ["root", "labelContainer", "label", "switchViewButton", "switchViewIcon"]);

// node_modules/@mui/x-date-pickers/esm/PickersCalendarHeader/PickersCalendarHeader.js
var React63 = __toESM(require_react(), 1);
var import_prop_types16 = __toESM(require_prop_types(), 1);

// node_modules/@mui/x-date-pickers/esm/internals/components/PickersArrowSwitcher/PickersArrowSwitcher.js
var React61 = __toESM(require_react(), 1);

// node_modules/@mui/x-date-pickers/esm/internals/components/PickersArrowSwitcher/pickersArrowSwitcherClasses.js
function getPickersArrowSwitcherUtilityClass(slot) {
  return generateUtilityClass("MuiPickersArrowSwitcher", slot);
}
var pickersArrowSwitcherClasses = generateUtilityClasses("MuiPickersArrowSwitcher", ["root", "spacer", "button", "previousIconButton", "nextIconButton", "leftArrowIcon", "rightArrowIcon"]);

// node_modules/@mui/x-date-pickers/esm/internals/components/PickersArrowSwitcher/PickersArrowSwitcher.js
var import_jsx_runtime30 = __toESM(require_jsx_runtime(), 1);
var _excluded33 = ["children", "className", "slots", "slotProps", "isNextDisabled", "isNextHidden", "onGoToNext", "nextLabel", "isPreviousDisabled", "isPreviousHidden", "onGoToPrevious", "previousLabel", "labelId", "classes"];
var _excluded210 = ["ownerState"];
var _excluded34 = ["ownerState"];
var PickersArrowSwitcherRoot = styled_default("div", {
  name: "MuiPickersArrowSwitcher",
  slot: "Root"
})({
  display: "flex"
});
var PickersArrowSwitcherSpacer = styled_default("div", {
  name: "MuiPickersArrowSwitcher",
  slot: "Spacer"
})(({
  theme
}) => ({
  width: theme.spacing(3)
}));
var PickersArrowSwitcherButton = styled_default(IconButton_default, {
  name: "MuiPickersArrowSwitcher",
  slot: "Button"
})({
  variants: [{
    props: {
      isButtonHidden: true
    },
    style: {
      visibility: "hidden"
    }
  }]
});
var useUtilityClasses20 = (classes) => {
  const slots = {
    root: ["root"],
    spacer: ["spacer"],
    button: ["button"],
    previousIconButton: ["previousIconButton"],
    nextIconButton: ["nextIconButton"],
    leftArrowIcon: ["leftArrowIcon"],
    rightArrowIcon: ["rightArrowIcon"]
  };
  return composeClasses(slots, getPickersArrowSwitcherUtilityClass, classes);
};
var PickersArrowSwitcher = React61.forwardRef(function PickersArrowSwitcher2(inProps, ref) {
  const isRtl = useRtl();
  const props = useThemeProps({
    props: inProps,
    name: "MuiPickersArrowSwitcher"
  });
  const {
    children,
    className,
    slots,
    slotProps,
    isNextDisabled,
    isNextHidden,
    onGoToNext,
    nextLabel,
    isPreviousDisabled,
    isPreviousHidden,
    onGoToPrevious,
    previousLabel,
    labelId,
    classes: classesProp
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded33);
  const {
    ownerState
  } = usePickerPrivateContext();
  const classes = useUtilityClasses20(classesProp);
  const nextProps = {
    isDisabled: isNextDisabled,
    isHidden: isNextHidden,
    goTo: onGoToNext,
    label: nextLabel
  };
  const previousProps = {
    isDisabled: isPreviousDisabled,
    isHidden: isPreviousHidden,
    goTo: onGoToPrevious,
    label: previousLabel
  };
  const PreviousIconButton = (slots == null ? void 0 : slots.previousIconButton) ?? PickersArrowSwitcherButton;
  const previousIconButtonProps = useSlotProps_default({
    elementType: PreviousIconButton,
    externalSlotProps: slotProps == null ? void 0 : slotProps.previousIconButton,
    additionalProps: {
      size: "medium",
      title: previousProps.label,
      "aria-label": previousProps.label,
      disabled: previousProps.isDisabled,
      edge: "end",
      onClick: previousProps.goTo
    },
    ownerState: _extends({}, ownerState, {
      isButtonHidden: previousProps.isHidden ?? false
    }),
    className: clsx_default(classes.button, classes.previousIconButton)
  });
  const NextIconButton = (slots == null ? void 0 : slots.nextIconButton) ?? PickersArrowSwitcherButton;
  const nextIconButtonProps = useSlotProps_default({
    elementType: NextIconButton,
    externalSlotProps: slotProps == null ? void 0 : slotProps.nextIconButton,
    additionalProps: {
      size: "medium",
      title: nextProps.label,
      "aria-label": nextProps.label,
      disabled: nextProps.isDisabled,
      edge: "start",
      onClick: nextProps.goTo
    },
    ownerState: _extends({}, ownerState, {
      isButtonHidden: nextProps.isHidden ?? false
    }),
    className: clsx_default(classes.button, classes.nextIconButton)
  });
  const LeftArrowIcon = (slots == null ? void 0 : slots.leftArrowIcon) ?? ArrowLeftIcon;
  const _useSlotProps = useSlotProps_default({
    elementType: LeftArrowIcon,
    externalSlotProps: slotProps == null ? void 0 : slotProps.leftArrowIcon,
    additionalProps: {
      fontSize: "inherit"
    },
    ownerState,
    className: classes.leftArrowIcon
  }), leftArrowIconProps = _objectWithoutPropertiesLoose(_useSlotProps, _excluded210);
  const RightArrowIcon = (slots == null ? void 0 : slots.rightArrowIcon) ?? ArrowRightIcon;
  const _useSlotProps2 = useSlotProps_default({
    elementType: RightArrowIcon,
    externalSlotProps: slotProps == null ? void 0 : slotProps.rightArrowIcon,
    additionalProps: {
      fontSize: "inherit"
    },
    ownerState,
    className: classes.rightArrowIcon
  }), rightArrowIconProps = _objectWithoutPropertiesLoose(_useSlotProps2, _excluded34);
  return (0, import_jsx_runtime30.jsxs)(PickersArrowSwitcherRoot, _extends({
    ref,
    className: clsx_default(classes.root, className),
    ownerState
  }, other, {
    children: [(0, import_jsx_runtime30.jsx)(PreviousIconButton, _extends({}, previousIconButtonProps, {
      children: isRtl ? (0, import_jsx_runtime30.jsx)(RightArrowIcon, _extends({}, rightArrowIconProps)) : (0, import_jsx_runtime30.jsx)(LeftArrowIcon, _extends({}, leftArrowIconProps))
    })), children ? (0, import_jsx_runtime30.jsx)(Typography_default, {
      variant: "subtitle1",
      component: "span",
      id: labelId,
      children
    }) : (0, import_jsx_runtime30.jsx)(PickersArrowSwitcherSpacer, {
      className: classes.spacer,
      ownerState
    }), (0, import_jsx_runtime30.jsx)(NextIconButton, _extends({}, nextIconButtonProps, {
      children: isRtl ? (0, import_jsx_runtime30.jsx)(LeftArrowIcon, _extends({}, leftArrowIconProps)) : (0, import_jsx_runtime30.jsx)(RightArrowIcon, _extends({}, rightArrowIconProps))
    }))]
  }));
});

// node_modules/@mui/x-date-pickers/esm/internals/hooks/date-helpers-hooks.js
var React62 = __toESM(require_react(), 1);
function useNextMonthDisabled(month, {
  disableFuture,
  maxDate,
  timezone
}) {
  const utils = useUtils();
  return React62.useMemo(() => {
    const now = utils.date(void 0, timezone);
    const lastEnabledMonth = utils.startOfMonth(disableFuture && utils.isBefore(now, maxDate) ? now : maxDate);
    return !utils.isAfter(lastEnabledMonth, month);
  }, [disableFuture, maxDate, month, utils, timezone]);
}
function usePreviousMonthDisabled(month, {
  disablePast,
  minDate,
  timezone
}) {
  const utils = useUtils();
  return React62.useMemo(() => {
    const now = utils.date(void 0, timezone);
    const firstEnabledMonth = utils.startOfMonth(disablePast && utils.isAfter(now, minDate) ? now : minDate);
    return !utils.isBefore(firstEnabledMonth, month);
  }, [disablePast, minDate, month, utils, timezone]);
}
function useMeridiemMode(date, ampm, onChange, selectionState) {
  const utils = useUtils();
  const cleanDate = React62.useMemo(() => !utils.isValid(date) ? null : date, [utils, date]);
  const meridiemMode = getMeridiem(cleanDate, utils);
  const handleMeridiemChange = React62.useCallback((mode) => {
    const timeWithMeridiem = cleanDate == null ? null : convertToMeridiem(cleanDate, mode, Boolean(ampm), utils);
    onChange(timeWithMeridiem, selectionState ?? "partial");
  }, [ampm, cleanDate, onChange, selectionState, utils]);
  return {
    meridiemMode,
    handleMeridiemChange
  };
}

// node_modules/@mui/x-date-pickers/esm/PickersCalendarHeader/PickersCalendarHeader.js
var import_jsx_runtime31 = __toESM(require_jsx_runtime(), 1);
var _excluded35 = ["slots", "slotProps", "currentMonth", "disabled", "disableFuture", "disablePast", "maxDate", "minDate", "onMonthChange", "onViewChange", "view", "reduceAnimations", "views", "labelId", "className", "classes", "timezone", "format"];
var _excluded211 = ["ownerState"];
var useUtilityClasses21 = (classes) => {
  const slots = {
    root: ["root"],
    labelContainer: ["labelContainer"],
    label: ["label"],
    switchViewButton: ["switchViewButton"],
    switchViewIcon: ["switchViewIcon"]
  };
  return composeClasses(slots, getPickersCalendarHeaderUtilityClass, classes);
};
var PickersCalendarHeaderRoot = styled_default("div", {
  name: "MuiPickersCalendarHeader",
  slot: "Root"
})({
  display: "flex",
  alignItems: "center",
  marginTop: 12,
  marginBottom: 4,
  paddingLeft: 24,
  paddingRight: 12,
  // prevent jumping in safari
  maxHeight: 40,
  minHeight: 40
});
var PickersCalendarHeaderLabelContainer = styled_default("div", {
  name: "MuiPickersCalendarHeader",
  slot: "LabelContainer"
})(({
  theme
}) => _extends({
  display: "flex",
  overflow: "hidden",
  alignItems: "center",
  cursor: "pointer",
  marginRight: "auto"
}, theme.typography.body1, {
  fontWeight: theme.typography.fontWeightMedium
}));
var PickersCalendarHeaderLabel = styled_default("div", {
  name: "MuiPickersCalendarHeader",
  slot: "Label"
})({
  marginRight: 6
});
var PickersCalendarHeaderSwitchViewButton = styled_default(IconButton_default, {
  name: "MuiPickersCalendarHeader",
  slot: "SwitchViewButton"
})({
  marginRight: "auto",
  variants: [{
    props: {
      view: "year"
    },
    style: {
      [`.${pickersCalendarHeaderClasses.switchViewIcon}`]: {
        transform: "rotate(180deg)"
      }
    }
  }]
});
var PickersCalendarHeaderSwitchViewIcon = styled_default(ArrowDropDownIcon, {
  name: "MuiPickersCalendarHeader",
  slot: "SwitchViewIcon"
})(({
  theme
}) => ({
  willChange: "transform",
  transition: theme.transitions.create("transform"),
  transform: "rotate(0deg)"
}));
var PickersCalendarHeader = React63.forwardRef(function PickersCalendarHeader2(inProps, ref) {
  const translations = usePickerTranslations();
  const utils = useUtils();
  const props = useThemeProps({
    props: inProps,
    name: "MuiPickersCalendarHeader"
  });
  const {
    slots,
    slotProps,
    currentMonth: month,
    disabled,
    disableFuture,
    disablePast,
    maxDate,
    minDate,
    onMonthChange,
    onViewChange,
    view,
    reduceAnimations,
    views,
    labelId,
    className,
    classes: classesProp,
    timezone,
    format = `${utils.formats.month} ${utils.formats.year}`
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded35);
  const {
    ownerState
  } = usePickerPrivateContext();
  const classes = useUtilityClasses21(classesProp);
  const SwitchViewButton = (slots == null ? void 0 : slots.switchViewButton) ?? PickersCalendarHeaderSwitchViewButton;
  const switchViewButtonProps = useSlotProps_default({
    elementType: SwitchViewButton,
    externalSlotProps: slotProps == null ? void 0 : slotProps.switchViewButton,
    additionalProps: {
      size: "small",
      "aria-label": translations.calendarViewSwitchingButtonAriaLabel(view)
    },
    ownerState,
    className: classes.switchViewButton
  });
  const SwitchViewIcon = (slots == null ? void 0 : slots.switchViewIcon) ?? PickersCalendarHeaderSwitchViewIcon;
  const _useSlotProps = useSlotProps_default({
    elementType: SwitchViewIcon,
    externalSlotProps: slotProps == null ? void 0 : slotProps.switchViewIcon,
    ownerState,
    className: classes.switchViewIcon
  }), switchViewIconProps = _objectWithoutPropertiesLoose(_useSlotProps, _excluded211);
  const selectNextMonth = () => onMonthChange(utils.addMonths(month, 1));
  const selectPreviousMonth = () => onMonthChange(utils.addMonths(month, -1));
  const isNextMonthDisabled = useNextMonthDisabled(month, {
    disableFuture,
    maxDate,
    timezone
  });
  const isPreviousMonthDisabled = usePreviousMonthDisabled(month, {
    disablePast,
    minDate,
    timezone
  });
  const handleToggleView = () => {
    if (views.length === 1 || !onViewChange || disabled) {
      return;
    }
    if (views.length === 2) {
      onViewChange(views.find((el) => el !== view) || views[0]);
    } else {
      const nextIndexToOpen = views.indexOf(view) !== 0 ? 0 : 1;
      onViewChange(views[nextIndexToOpen]);
    }
  };
  if (views.length === 1 && views[0] === "year") {
    return null;
  }
  const label = utils.formatByString(month, format);
  return (0, import_jsx_runtime31.jsxs)(PickersCalendarHeaderRoot, _extends({}, other, {
    ownerState,
    className: clsx_default(classes.root, className),
    ref,
    children: [(0, import_jsx_runtime31.jsxs)(PickersCalendarHeaderLabelContainer, {
      role: "presentation",
      onClick: handleToggleView,
      ownerState,
      "aria-live": "polite",
      className: classes.labelContainer,
      children: [(0, import_jsx_runtime31.jsx)(PickersFadeTransitionGroup, {
        reduceAnimations,
        transKey: label,
        children: (0, import_jsx_runtime31.jsx)(PickersCalendarHeaderLabel, {
          id: labelId,
          ownerState,
          className: classes.label,
          children: label
        })
      }), views.length > 1 && !disabled && (0, import_jsx_runtime31.jsx)(SwitchViewButton, _extends({}, switchViewButtonProps, {
        children: (0, import_jsx_runtime31.jsx)(SwitchViewIcon, _extends({}, switchViewIconProps))
      }))]
    }), (0, import_jsx_runtime31.jsx)(Fade_default, {
      in: view === "day",
      appear: !reduceAnimations,
      enter: !reduceAnimations,
      children: (0, import_jsx_runtime31.jsx)(PickersArrowSwitcher, {
        slots,
        slotProps,
        onGoToPrevious: selectPreviousMonth,
        isPreviousDisabled: isPreviousMonthDisabled,
        previousLabel: translations.previousMonth,
        onGoToNext: selectNextMonth,
        isNextDisabled: isNextMonthDisabled,
        nextLabel: translations.nextMonth
      })
    })]
  }));
});
true ? PickersCalendarHeader.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types16.default.object,
  className: import_prop_types16.default.string,
  currentMonth: import_prop_types16.default.object.isRequired,
  disabled: import_prop_types16.default.bool,
  disableFuture: import_prop_types16.default.bool,
  disablePast: import_prop_types16.default.bool,
  /**
   * Format used to display the date.
   * @default `${adapter.formats.month} ${adapter.formats.year}`
   */
  format: import_prop_types16.default.string,
  /**
   * Id of the calendar text element.
   * It is used to establish an `aria-labelledby` relationship with the calendar `grid` element.
   */
  labelId: import_prop_types16.default.string,
  maxDate: import_prop_types16.default.object.isRequired,
  minDate: import_prop_types16.default.object.isRequired,
  onMonthChange: import_prop_types16.default.func.isRequired,
  onViewChange: import_prop_types16.default.func,
  reduceAnimations: import_prop_types16.default.bool.isRequired,
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps: import_prop_types16.default.object,
  /**
   * Overridable component slots.
   * @default {}
   */
  slots: import_prop_types16.default.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types16.default.oneOfType([import_prop_types16.default.arrayOf(import_prop_types16.default.oneOfType([import_prop_types16.default.func, import_prop_types16.default.object, import_prop_types16.default.bool])), import_prop_types16.default.func, import_prop_types16.default.object]),
  timezone: import_prop_types16.default.string.isRequired,
  view: import_prop_types16.default.oneOf(["day", "month", "year"]).isRequired,
  views: import_prop_types16.default.arrayOf(import_prop_types16.default.oneOf(["day", "month", "year"]).isRequired).isRequired
} : void 0;

// node_modules/@mui/x-date-pickers/esm/internals/components/PickerViewRoot/PickerViewRoot.js
var PickerViewRoot = styled_default("div")({
  overflow: "hidden",
  width: DIALOG_WIDTH,
  maxHeight: VIEW_HEIGHT,
  display: "flex",
  flexDirection: "column",
  margin: "0 auto"
});

// node_modules/@mui/x-date-pickers/esm/DateCalendar/dateCalendarClasses.js
var getDateCalendarUtilityClass = (slot) => generateUtilityClass("MuiDateCalendar", slot);
var dateCalendarClasses = generateUtilityClasses("MuiDateCalendar", ["root", "viewTransitionContainer"]);

// node_modules/@mui/x-date-pickers/esm/DateCalendar/DateCalendar.js
var import_jsx_runtime32 = __toESM(require_jsx_runtime(), 1);
var _excluded36 = ["autoFocus", "onViewChange", "value", "defaultValue", "referenceDate", "disableFuture", "disablePast", "onChange", "onYearChange", "onMonthChange", "reduceAnimations", "shouldDisableDate", "shouldDisableMonth", "shouldDisableYear", "view", "views", "openTo", "className", "classes", "disabled", "readOnly", "minDate", "maxDate", "disableHighlightToday", "focusedView", "onFocusedViewChange", "showDaysOutsideCurrentMonth", "fixedWeekNumber", "dayOfWeekFormatter", "slots", "slotProps", "loading", "renderLoading", "displayWeekNumber", "yearsOrder", "yearsPerRow", "monthsPerRow", "timezone"];
var useUtilityClasses22 = (classes) => {
  const slots = {
    root: ["root"],
    viewTransitionContainer: ["viewTransitionContainer"]
  };
  return composeClasses(slots, getDateCalendarUtilityClass, classes);
};
function useDateCalendarDefaultizedProps(props, name) {
  const themeProps = useThemeProps({
    props,
    name
  });
  const reduceAnimations = useReduceAnimations(themeProps.reduceAnimations);
  const validationProps = useApplyDefaultValuesToDateValidationProps(themeProps);
  return _extends({}, themeProps, validationProps, {
    loading: themeProps.loading ?? false,
    openTo: themeProps.openTo ?? "day",
    views: themeProps.views ?? ["year", "day"],
    reduceAnimations,
    renderLoading: themeProps.renderLoading ?? (() => (0, import_jsx_runtime32.jsx)("span", {
      children: "..."
    }))
  });
}
var DateCalendarRoot = styled_default(PickerViewRoot, {
  name: "MuiDateCalendar",
  slot: "Root"
})({
  display: "flex",
  flexDirection: "column",
  height: VIEW_HEIGHT
});
var DateCalendarViewTransitionContainer = styled_default(PickersFadeTransitionGroup, {
  name: "MuiDateCalendar",
  slot: "ViewTransitionContainer"
})({});
var DateCalendar = React64.forwardRef(function DateCalendar2(inProps, ref) {
  const utils = useUtils();
  const {
    ownerState
  } = usePickerPrivateContext();
  const id = useId();
  const props = useDateCalendarDefaultizedProps(inProps, "MuiDateCalendar");
  const {
    autoFocus,
    onViewChange,
    value: valueProp,
    defaultValue,
    referenceDate: referenceDateProp,
    disableFuture,
    disablePast,
    onChange,
    onMonthChange,
    reduceAnimations,
    shouldDisableDate,
    shouldDisableMonth,
    shouldDisableYear,
    view: inView,
    views,
    openTo,
    className,
    classes: classesProp,
    disabled,
    readOnly,
    minDate,
    maxDate,
    disableHighlightToday,
    focusedView: focusedViewProp,
    onFocusedViewChange,
    showDaysOutsideCurrentMonth,
    fixedWeekNumber,
    dayOfWeekFormatter,
    slots,
    slotProps,
    loading,
    renderLoading,
    displayWeekNumber,
    yearsOrder,
    yearsPerRow,
    monthsPerRow,
    timezone: timezoneProp
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded36);
  const {
    value,
    handleValueChange,
    timezone
  } = useControlledValue({
    name: "DateCalendar",
    timezone: timezoneProp,
    value: valueProp,
    defaultValue,
    referenceDate: referenceDateProp,
    onChange,
    valueManager: singleItemValueManager
  });
  const {
    view,
    setView,
    focusedView,
    setFocusedView,
    goToNextView,
    setValueAndGoToNextView
  } = useViews({
    view: inView,
    views,
    openTo,
    onChange: handleValueChange,
    onViewChange,
    autoFocus,
    focusedView: focusedViewProp,
    onFocusedViewChange
  });
  const {
    referenceDate,
    calendarState,
    setVisibleDate,
    isDateDisabled,
    onMonthSwitchingAnimationEnd
  } = useCalendarState({
    value,
    referenceDate: referenceDateProp,
    reduceAnimations,
    onMonthChange,
    minDate,
    maxDate,
    shouldDisableDate,
    disablePast,
    disableFuture,
    timezone,
    getCurrentMonthFromVisibleDate: (visibleDate, prevMonth) => {
      if (utils.isSameMonth(visibleDate, prevMonth)) {
        return prevMonth;
      }
      return utils.startOfMonth(visibleDate);
    }
  });
  const minDateWithDisabled = disabled && value || minDate;
  const maxDateWithDisabled = disabled && value || maxDate;
  const gridLabelId = `${id}-grid-label`;
  const hasFocus = focusedView !== null;
  const CalendarHeader = (slots == null ? void 0 : slots.calendarHeader) ?? PickersCalendarHeader;
  const calendarHeaderProps = useSlotProps_default({
    elementType: CalendarHeader,
    externalSlotProps: slotProps == null ? void 0 : slotProps.calendarHeader,
    additionalProps: {
      views,
      view,
      currentMonth: calendarState.currentMonth,
      onViewChange: setView,
      onMonthChange: (month) => setVisibleDate({
        target: month,
        reason: "header-navigation"
      }),
      minDate: minDateWithDisabled,
      maxDate: maxDateWithDisabled,
      disabled,
      disablePast,
      disableFuture,
      reduceAnimations,
      timezone,
      labelId: gridLabelId
    },
    ownerState
  });
  const handleDateMonthChange = useEventCallback_default((newDate) => {
    const startOfMonth = utils.startOfMonth(newDate);
    const endOfMonth = utils.endOfMonth(newDate);
    const closestEnabledDate = isDateDisabled(newDate) ? findClosestEnabledDate({
      utils,
      date: newDate,
      minDate: utils.isBefore(minDate, startOfMonth) ? startOfMonth : minDate,
      maxDate: utils.isAfter(maxDate, endOfMonth) ? endOfMonth : maxDate,
      disablePast,
      disableFuture,
      isDateDisabled,
      timezone
    }) : newDate;
    if (closestEnabledDate) {
      setValueAndGoToNextView(closestEnabledDate, "finish");
      setVisibleDate({
        target: closestEnabledDate,
        reason: "cell-interaction"
      });
    } else {
      goToNextView();
      setVisibleDate({
        target: startOfMonth,
        reason: "cell-interaction"
      });
    }
  });
  const handleDateYearChange = useEventCallback_default((newDate) => {
    const startOfYear = utils.startOfYear(newDate);
    const endOfYear = utils.endOfYear(newDate);
    const closestEnabledDate = isDateDisabled(newDate) ? findClosestEnabledDate({
      utils,
      date: newDate,
      minDate: utils.isBefore(minDate, startOfYear) ? startOfYear : minDate,
      maxDate: utils.isAfter(maxDate, endOfYear) ? endOfYear : maxDate,
      disablePast,
      disableFuture,
      isDateDisabled,
      timezone
    }) : newDate;
    if (closestEnabledDate) {
      setValueAndGoToNextView(closestEnabledDate, "finish");
      setVisibleDate({
        target: closestEnabledDate,
        reason: "cell-interaction"
      });
    } else {
      goToNextView();
      setVisibleDate({
        target: startOfYear,
        reason: "cell-interaction"
      });
    }
  });
  const handleSelectedDayChange = useEventCallback_default((day) => {
    if (day) {
      return handleValueChange(mergeDateAndTime(utils, day, value ?? referenceDate), "finish", view);
    }
    return handleValueChange(day, "finish", view);
  });
  React64.useEffect(() => {
    if (utils.isValid(value)) {
      setVisibleDate({
        target: value,
        reason: "controlled-value-change"
      });
    }
  }, [value]);
  const classes = useUtilityClasses22(classesProp);
  const baseDateValidationProps = {
    disablePast,
    disableFuture,
    maxDate,
    minDate
  };
  const commonViewProps = {
    disableHighlightToday,
    readOnly,
    disabled,
    timezone,
    gridLabelId,
    slots,
    slotProps
  };
  const prevOpenViewRef = React64.useRef(view);
  React64.useEffect(() => {
    if (prevOpenViewRef.current === view) {
      return;
    }
    if (focusedView === prevOpenViewRef.current) {
      setFocusedView(view, true);
    }
    prevOpenViewRef.current = view;
  }, [focusedView, setFocusedView, view]);
  const selectedDays = React64.useMemo(() => [value], [value]);
  return (0, import_jsx_runtime32.jsxs)(DateCalendarRoot, _extends({
    ref,
    className: clsx_default(classes.root, className),
    ownerState
  }, other, {
    children: [(0, import_jsx_runtime32.jsx)(CalendarHeader, _extends({}, calendarHeaderProps, {
      slots,
      slotProps
    })), (0, import_jsx_runtime32.jsx)(DateCalendarViewTransitionContainer, {
      reduceAnimations,
      className: classes.viewTransitionContainer,
      transKey: view,
      ownerState,
      children: (0, import_jsx_runtime32.jsxs)("div", {
        children: [view === "year" && (0, import_jsx_runtime32.jsx)(YearCalendar, _extends({}, baseDateValidationProps, commonViewProps, {
          value,
          onChange: handleDateYearChange,
          shouldDisableYear,
          hasFocus,
          onFocusedViewChange: (isViewFocused) => setFocusedView("year", isViewFocused),
          yearsOrder,
          yearsPerRow,
          referenceDate
        })), view === "month" && (0, import_jsx_runtime32.jsx)(MonthCalendar, _extends({}, baseDateValidationProps, commonViewProps, {
          hasFocus,
          className,
          value,
          onChange: handleDateMonthChange,
          shouldDisableMonth,
          onFocusedViewChange: (isViewFocused) => setFocusedView("month", isViewFocused),
          monthsPerRow,
          referenceDate
        })), view === "day" && (0, import_jsx_runtime32.jsx)(DayCalendar, _extends({}, calendarState, baseDateValidationProps, commonViewProps, {
          onMonthSwitchingAnimationEnd,
          hasFocus,
          onFocusedDayChange: (focusedDate) => setVisibleDate({
            target: focusedDate,
            reason: "cell-interaction"
          }),
          reduceAnimations,
          selectedDays,
          onSelectedDaysChange: handleSelectedDayChange,
          shouldDisableDate,
          shouldDisableMonth,
          shouldDisableYear,
          onFocusedViewChange: (isViewFocused) => setFocusedView("day", isViewFocused),
          showDaysOutsideCurrentMonth,
          fixedWeekNumber,
          dayOfWeekFormatter,
          displayWeekNumber,
          loading,
          renderLoading
        }))]
      })
    })]
  }));
});
true ? DateCalendar.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * If `true`, the main element is focused during the first mount.
   * This main element is:
   * - the element chosen by the visible view if any (i.e: the selected day on the `day` view).
   * - the `input` element if there is a field rendered.
   */
  autoFocus: import_prop_types17.default.bool,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types17.default.object,
  className: import_prop_types17.default.string,
  /**
   * Formats the day of week displayed in the calendar header.
   * @param {PickerValidDate} date The date of the day of week provided by the adapter.
   * @returns {string} The name to display.
   * @default (date: PickerValidDate) => adapter.format(date, 'weekdayShort').charAt(0).toUpperCase()
   */
  dayOfWeekFormatter: import_prop_types17.default.func,
  /**
   * The default selected value.
   * Used when the component is not controlled.
   */
  defaultValue: import_prop_types17.default.object,
  /**
   * If `true`, the component is disabled.
   * When disabled, the value cannot be changed and no interaction is possible.
   * @default false
   */
  disabled: import_prop_types17.default.bool,
  /**
   * If `true`, disable values after the current date for date components, time for time components and both for date time components.
   * @default false
   */
  disableFuture: import_prop_types17.default.bool,
  /**
   * If `true`, today's date is rendering without highlighting with circle.
   * @default false
   */
  disableHighlightToday: import_prop_types17.default.bool,
  /**
   * If `true`, disable values before the current date for date components, time for time components and both for date time components.
   * @default false
   */
  disablePast: import_prop_types17.default.bool,
  /**
   * If `true`, the week number will be display in the calendar.
   */
  displayWeekNumber: import_prop_types17.default.bool,
  /**
   * The day view will show as many weeks as needed after the end of the current month to match this value.
   * Put it to 6 to have a fixed number of weeks in Gregorian calendars
   */
  fixedWeekNumber: import_prop_types17.default.number,
  /**
   * Controlled focused view.
   */
  focusedView: import_prop_types17.default.oneOf(["day", "month", "year"]),
  /**
   * If `true`, calls `renderLoading` instead of rendering the day calendar.
   * Can be used to preload information and show it in calendar.
   * @default false
   */
  loading: import_prop_types17.default.bool,
  /**
   * Maximal selectable date.
   * @default 2099-12-31
   */
  maxDate: import_prop_types17.default.object,
  /**
   * Minimal selectable date.
   * @default 1900-01-01
   */
  minDate: import_prop_types17.default.object,
  /**
   * Months rendered per row.
   * @default 3
   */
  monthsPerRow: import_prop_types17.default.oneOf([3, 4]),
  /**
   * Callback fired when the value changes.
   * @template TValue The value type. It will be the same type as `value` or `null`. It can be in `[start, end]` format in case of range value.
   * @template TView The view type. Will be one of date or time views.
   * @param {TValue} value The new value.
   * @param {PickerSelectionState | undefined} selectionState Indicates if the date selection is complete.
   * @param {TView | undefined} selectedView Indicates the view in which the selection has been made.
   */
  onChange: import_prop_types17.default.func,
  /**
   * Callback fired on focused view change.
   * @template TView
   * @param {TView} view The new view to focus or not.
   * @param {boolean} hasFocus `true` if the view should be focused.
   */
  onFocusedViewChange: import_prop_types17.default.func,
  /**
   * Callback fired on month change.
   * @param {PickerValidDate} month The new month.
   */
  onMonthChange: import_prop_types17.default.func,
  /**
   * Callback fired on view change.
   * @template TView
   * @param {TView} view The new view.
   */
  onViewChange: import_prop_types17.default.func,
  /**
   * Callback fired on year change.
   * @param {PickerValidDate} year The new year.
   */
  onYearChange: import_prop_types17.default.func,
  /**
   * The default visible view.
   * Used when the component view is not controlled.
   * Must be a valid option from `views` list.
   */
  openTo: import_prop_types17.default.oneOf(["day", "month", "year"]),
  /**
   * If `true`, the component is read-only.
   * When read-only, the value cannot be changed but the user can interact with the interface.
   * @default false
   */
  readOnly: import_prop_types17.default.bool,
  /**
   * If `true`, disable heavy animations.
   * @default `@media(prefers-reduced-motion: reduce)` || `navigator.userAgent` matches Android <10 or iOS <13
   */
  reduceAnimations: import_prop_types17.default.bool,
  /**
   * The date used to generate the new value when both `value` and `defaultValue` are empty.
   * @default The closest valid date using the validation props, except callbacks such as `shouldDisableDate`.
   */
  referenceDate: import_prop_types17.default.object,
  /**
   * Component displaying when passed `loading` true.
   * @returns {React.ReactNode} The node to render when loading.
   * @default () => <span>...</span>
   */
  renderLoading: import_prop_types17.default.func,
  /**
   * Disable specific date.
   *
   * Warning: This function can be called multiple times (for example when rendering date calendar, checking if focus can be moved to a certain date, etc.). Expensive computations can impact performance.
   *
   * @param {PickerValidDate} day The date to test.
   * @returns {boolean} If `true` the date will be disabled.
   */
  shouldDisableDate: import_prop_types17.default.func,
  /**
   * Disable specific month.
   * @param {PickerValidDate} month The month to test.
   * @returns {boolean} If `true`, the month will be disabled.
   */
  shouldDisableMonth: import_prop_types17.default.func,
  /**
   * Disable specific year.
   * @param {PickerValidDate} year The year to test.
   * @returns {boolean} If `true`, the year will be disabled.
   */
  shouldDisableYear: import_prop_types17.default.func,
  /**
   * If `true`, days outside the current month are rendered:
   *
   * - if `fixedWeekNumber` is defined, renders days to have the weeks requested.
   *
   * - if `fixedWeekNumber` is not defined, renders day to fill the first and last week of the current month.
   *
   * - ignored if `calendars` equals more than `1` on range pickers.
   * @default false
   */
  showDaysOutsideCurrentMonth: import_prop_types17.default.bool,
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps: import_prop_types17.default.object,
  /**
   * Overridable component slots.
   * @default {}
   */
  slots: import_prop_types17.default.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types17.default.oneOfType([import_prop_types17.default.arrayOf(import_prop_types17.default.oneOfType([import_prop_types17.default.func, import_prop_types17.default.object, import_prop_types17.default.bool])), import_prop_types17.default.func, import_prop_types17.default.object]),
  /**
   * Choose which timezone to use for the value.
   * Example: "default", "system", "UTC", "America/New_York".
   * If you pass values from other timezones to some props, they will be converted to this timezone before being used.
   * @see See the {@link https://mui.com/x/react-date-pickers/timezone/ timezones documentation} for more details.
   * @default The timezone of the `value` or `defaultValue` prop is defined, 'default' otherwise.
   */
  timezone: import_prop_types17.default.string,
  /**
   * The selected value.
   * Used when the component is controlled.
   */
  value: import_prop_types17.default.object,
  /**
   * The visible view.
   * Used when the component view is controlled.
   * Must be a valid option from `views` list.
   */
  view: import_prop_types17.default.oneOf(["day", "month", "year"]),
  /**
   * Available views.
   */
  views: import_prop_types17.default.arrayOf(import_prop_types17.default.oneOf(["day", "month", "year"]).isRequired),
  /**
   * Years are displayed in ascending (chronological) order by default.
   * If `desc`, years are displayed in descending order.
   * @default 'asc'
   */
  yearsOrder: import_prop_types17.default.oneOf(["asc", "desc"]),
  /**
   * Years rendered per row.
   * @default 3
   */
  yearsPerRow: import_prop_types17.default.oneOf([3, 4])
} : void 0;

// node_modules/@mui/x-date-pickers/esm/dateViewRenderers/dateViewRenderers.js
var import_jsx_runtime33 = __toESM(require_jsx_runtime(), 1);
var renderDateViewCalendar = ({
  view,
  onViewChange,
  views,
  focusedView,
  onFocusedViewChange,
  value,
  defaultValue,
  referenceDate,
  onChange,
  className,
  classes,
  disableFuture,
  disablePast,
  minDate,
  maxDate,
  shouldDisableDate,
  shouldDisableMonth,
  shouldDisableYear,
  reduceAnimations,
  onMonthChange,
  monthsPerRow,
  onYearChange,
  yearsOrder,
  yearsPerRow,
  slots,
  slotProps,
  loading,
  renderLoading,
  disableHighlightToday,
  readOnly,
  disabled,
  showDaysOutsideCurrentMonth,
  dayOfWeekFormatter,
  sx,
  autoFocus,
  fixedWeekNumber,
  displayWeekNumber,
  timezone
}) => (0, import_jsx_runtime33.jsx)(DateCalendar, {
  view,
  onViewChange,
  views: views.filter(isDatePickerView),
  focusedView: focusedView && isDatePickerView(focusedView) ? focusedView : null,
  onFocusedViewChange,
  value,
  defaultValue,
  referenceDate,
  onChange,
  className,
  classes,
  disableFuture,
  disablePast,
  minDate,
  maxDate,
  shouldDisableDate,
  shouldDisableMonth,
  shouldDisableYear,
  reduceAnimations,
  onMonthChange,
  monthsPerRow,
  onYearChange,
  yearsOrder,
  yearsPerRow,
  slots,
  slotProps,
  loading,
  renderLoading,
  disableHighlightToday,
  readOnly,
  disabled,
  showDaysOutsideCurrentMonth,
  dayOfWeekFormatter,
  sx,
  autoFocus,
  fixedWeekNumber,
  displayWeekNumber,
  timezone
});

// node_modules/@mui/x-date-pickers/esm/DesktopDatePicker/DesktopDatePicker.js
var DesktopDatePicker = React66.forwardRef(function DesktopDatePicker2(inProps, ref) {
  var _a;
  const utils = useUtils();
  const defaultizedProps = useDatePickerDefaultizedProps(inProps, "MuiDesktopDatePicker");
  const viewRenderers = _extends({
    day: renderDateViewCalendar,
    month: renderDateViewCalendar,
    year: renderDateViewCalendar
  }, defaultizedProps.viewRenderers);
  const props = _extends({}, defaultizedProps, {
    closeOnSelect: defaultizedProps.closeOnSelect ?? true,
    viewRenderers,
    format: resolveDateFormat(utils, defaultizedProps, false),
    yearsPerRow: defaultizedProps.yearsPerRow ?? 4,
    slots: _extends({
      field: DateField
    }, defaultizedProps.slots),
    slotProps: _extends({}, defaultizedProps.slotProps, {
      field: (ownerState) => {
        var _a2;
        return _extends({}, resolveComponentProps_default((_a2 = defaultizedProps.slotProps) == null ? void 0 : _a2.field, ownerState), extractValidationProps(defaultizedProps));
      },
      toolbar: _extends({
        hidden: true
      }, (_a = defaultizedProps.slotProps) == null ? void 0 : _a.toolbar)
    })
  });
  const {
    renderPicker
  } = useDesktopPicker({
    ref,
    props,
    valueManager: singleItemValueManager,
    valueType: "date",
    validator: validateDate,
    steps: null
  });
  return renderPicker();
});
DesktopDatePicker.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * If `true`, the main element is focused during the first mount.
   * This main element is:
   * - the element chosen by the visible view if any (i.e: the selected day on the `day` view).
   * - the `input` element if there is a field rendered.
   */
  autoFocus: import_prop_types18.default.bool,
  className: import_prop_types18.default.string,
  /**
   * If `true`, the Picker will close after submitting the full date.
   * @default true
   */
  closeOnSelect: import_prop_types18.default.bool,
  /**
   * Formats the day of week displayed in the calendar header.
   * @param {PickerValidDate} date The date of the day of week provided by the adapter.
   * @returns {string} The name to display.
   * @default (date: PickerValidDate) => adapter.format(date, 'weekdayShort').charAt(0).toUpperCase()
   */
  dayOfWeekFormatter: import_prop_types18.default.func,
  /**
   * The default value.
   * Used when the component is not controlled.
   */
  defaultValue: import_prop_types18.default.object,
  /**
   * If `true`, the component is disabled.
   * When disabled, the value cannot be changed and no interaction is possible.
   * @default false
   */
  disabled: import_prop_types18.default.bool,
  /**
   * If `true`, disable values after the current date for date components, time for time components and both for date time components.
   * @default false
   */
  disableFuture: import_prop_types18.default.bool,
  /**
   * If `true`, today's date is rendering without highlighting with circle.
   * @default false
   */
  disableHighlightToday: import_prop_types18.default.bool,
  /**
   * If `true`, the button to open the Picker will not be rendered (it will only render the field).
   * @deprecated Use the [field component](https://mui.com/x/react-date-pickers/fields/) instead.
   * @default false
   */
  disableOpenPicker: import_prop_types18.default.bool,
  /**
   * If `true`, disable values before the current date for date components, time for time components and both for date time components.
   * @default false
   */
  disablePast: import_prop_types18.default.bool,
  /**
   * If `true`, the week number will be display in the calendar.
   */
  displayWeekNumber: import_prop_types18.default.bool,
  /**
   * @default true
   */
  enableAccessibleFieldDOMStructure: import_prop_types18.default.any,
  /**
   * The day view will show as many weeks as needed after the end of the current month to match this value.
   * Put it to 6 to have a fixed number of weeks in Gregorian calendars
   */
  fixedWeekNumber: import_prop_types18.default.number,
  /**
   * Format of the date when rendered in the input(s).
   * Defaults to localized format based on the used `views`.
   */
  format: import_prop_types18.default.string,
  /**
   * Density of the format when rendered in the input.
   * Setting `formatDensity` to `"spacious"` will add a space before and after each `/`, `-` and `.` character.
   * @default "dense"
   */
  formatDensity: import_prop_types18.default.oneOf(["dense", "spacious"]),
  /**
   * Pass a ref to the `input` element.
   */
  inputRef: refType_default,
  /**
   * The label content.
   */
  label: import_prop_types18.default.node,
  /**
   * If `true`, calls `renderLoading` instead of rendering the day calendar.
   * Can be used to preload information and show it in calendar.
   * @default false
   */
  loading: import_prop_types18.default.bool,
  /**
   * Locale for components texts.
   * Allows overriding texts coming from `LocalizationProvider` and `theme`.
   */
  localeText: import_prop_types18.default.object,
  /**
   * Maximal selectable date.
   * @default 2099-12-31
   */
  maxDate: import_prop_types18.default.object,
  /**
   * Minimal selectable date.
   * @default 1900-01-01
   */
  minDate: import_prop_types18.default.object,
  /**
   * Months rendered per row.
   * @default 3
   */
  monthsPerRow: import_prop_types18.default.oneOf([3, 4]),
  /**
   * Name attribute used by the `input` element in the Field.
   */
  name: import_prop_types18.default.string,
  /**
   * Callback fired when the value is accepted.
   * @template TValue The value type. It will be the same type as `value` or `null`. It can be in `[start, end]` format in case of range value.
   * @template TError The validation error type. It will be either `string` or a `null`. It can be in `[start, end]` format in case of range value.
   * @param {TValue} value The value that was just accepted.
   * @param {FieldChangeHandlerContext<TError>} context The context containing the validation result of the current value.
   */
  onAccept: import_prop_types18.default.func,
  /**
   * Callback fired when the value changes.
   * @template TValue The value type. It will be the same type as `value` or `null`. It can be in `[start, end]` format in case of range value.
   * @template TError The validation error type. It will be either `string` or a `null`. It can be in `[start, end]` format in case of range value.
   * @param {TValue} value The new value.
   * @param {FieldChangeHandlerContext<TError>} context The context containing the validation result of the current value.
   */
  onChange: import_prop_types18.default.func,
  /**
   * Callback fired when the popup requests to be closed.
   * Use in controlled mode (see `open`).
   */
  onClose: import_prop_types18.default.func,
  /**
   * Callback fired when the error associated with the current value changes.
   * When a validation error is detected, the `error` parameter contains a non-null value.
   * This can be used to render an appropriate form error.
   * @template TError The validation error type. It will be either `string` or a `null`. It can be in `[start, end]` format in case of range value.
   * @template TValue The value type. It will be the same type as `value` or `null`. It can be in `[start, end]` format in case of range value.
   * @param {TError} error The reason why the current value is not valid.
   * @param {TValue} value The value associated with the error.
   */
  onError: import_prop_types18.default.func,
  /**
   * Callback fired on month change.
   * @param {PickerValidDate} month The new month.
   */
  onMonthChange: import_prop_types18.default.func,
  /**
   * Callback fired when the popup requests to be opened.
   * Use in controlled mode (see `open`).
   */
  onOpen: import_prop_types18.default.func,
  /**
   * Callback fired when the selected sections change.
   * @param {FieldSelectedSections} newValue The new selected sections.
   */
  onSelectedSectionsChange: import_prop_types18.default.func,
  /**
   * Callback fired on view change.
   * @template TView
   * @param {TView} view The new view.
   */
  onViewChange: import_prop_types18.default.func,
  /**
   * Callback fired on year change.
   * @param {PickerValidDate} year The new year.
   */
  onYearChange: import_prop_types18.default.func,
  /**
   * Control the popup or dialog open state.
   * @default false
   */
  open: import_prop_types18.default.bool,
  /**
   * The default visible view.
   * Used when the component view is not controlled.
   * Must be a valid option from `views` list.
   */
  openTo: import_prop_types18.default.oneOf(["day", "month", "year"]),
  /**
   * Force rendering in particular orientation.
   */
  orientation: import_prop_types18.default.oneOf(["landscape", "portrait"]),
  /**
   * If `true`, the component is read-only.
   * When read-only, the value cannot be changed but the user can interact with the interface.
   * @default false
   */
  readOnly: import_prop_types18.default.bool,
  /**
   * If `true`, disable heavy animations.
   * @default `@media(prefers-reduced-motion: reduce)` || `navigator.userAgent` matches Android <10 or iOS <13
   */
  reduceAnimations: import_prop_types18.default.bool,
  /**
   * The date used to generate the new value when both `value` and `defaultValue` are empty.
   * @default The closest valid date-time using the validation props, except callbacks like `shouldDisable<...>`.
   */
  referenceDate: import_prop_types18.default.object,
  /**
   * Component displaying when passed `loading` true.
   * @returns {React.ReactNode} The node to render when loading.
   * @default () => <span>...</span>
   */
  renderLoading: import_prop_types18.default.func,
  /**
   * The currently selected sections.
   * This prop accepts four formats:
   * 1. If a number is provided, the section at this index will be selected.
   * 2. If a string of type `FieldSectionType` is provided, the first section with that name will be selected.
   * 3. If `"all"` is provided, all the sections will be selected.
   * 4. If `null` is provided, no section will be selected.
   * If not provided, the selected sections will be handled internally.
   */
  selectedSections: import_prop_types18.default.oneOfType([import_prop_types18.default.oneOf(["all", "day", "empty", "hours", "meridiem", "minutes", "month", "seconds", "weekDay", "year"]), import_prop_types18.default.number]),
  /**
   * Disable specific date.
   *
   * Warning: This function can be called multiple times (for example when rendering date calendar, checking if focus can be moved to a certain date, etc.). Expensive computations can impact performance.
   *
   * @param {PickerValidDate} day The date to test.
   * @returns {boolean} If `true` the date will be disabled.
   */
  shouldDisableDate: import_prop_types18.default.func,
  /**
   * Disable specific month.
   * @param {PickerValidDate} month The month to test.
   * @returns {boolean} If `true`, the month will be disabled.
   */
  shouldDisableMonth: import_prop_types18.default.func,
  /**
   * Disable specific year.
   * @param {PickerValidDate} year The year to test.
   * @returns {boolean} If `true`, the year will be disabled.
   */
  shouldDisableYear: import_prop_types18.default.func,
  /**
   * If `true`, days outside the current month are rendered:
   *
   * - if `fixedWeekNumber` is defined, renders days to have the weeks requested.
   *
   * - if `fixedWeekNumber` is not defined, renders day to fill the first and last week of the current month.
   *
   * - ignored if `calendars` equals more than `1` on range pickers.
   * @default false
   */
  showDaysOutsideCurrentMonth: import_prop_types18.default.bool,
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps: import_prop_types18.default.object,
  /**
   * Overridable component slots.
   * @default {}
   */
  slots: import_prop_types18.default.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types18.default.oneOfType([import_prop_types18.default.arrayOf(import_prop_types18.default.oneOfType([import_prop_types18.default.func, import_prop_types18.default.object, import_prop_types18.default.bool])), import_prop_types18.default.func, import_prop_types18.default.object]),
  /**
   * Choose which timezone to use for the value.
   * Example: "default", "system", "UTC", "America/New_York".
   * If you pass values from other timezones to some props, they will be converted to this timezone before being used.
   * @see See the {@link https://mui.com/x/react-date-pickers/timezone/ timezones documentation} for more details.
   * @default The timezone of the `value` or `defaultValue` prop is defined, 'default' otherwise.
   */
  timezone: import_prop_types18.default.string,
  /**
   * The selected value.
   * Used when the component is controlled.
   */
  value: import_prop_types18.default.object,
  /**
   * The visible view.
   * Used when the component view is controlled.
   * Must be a valid option from `views` list.
   */
  view: import_prop_types18.default.oneOf(["day", "month", "year"]),
  /**
   * Define custom view renderers for each section.
   * If `null`, the section will only have field editing.
   * If `undefined`, internally defined view will be used.
   */
  viewRenderers: import_prop_types18.default.shape({
    day: import_prop_types18.default.func,
    month: import_prop_types18.default.func,
    year: import_prop_types18.default.func
  }),
  /**
   * Available views.
   */
  views: import_prop_types18.default.arrayOf(import_prop_types18.default.oneOf(["day", "month", "year"]).isRequired),
  /**
   * Years are displayed in ascending (chronological) order by default.
   * If `desc`, years are displayed in descending order.
   * @default 'asc'
   */
  yearsOrder: import_prop_types18.default.oneOf(["asc", "desc"]),
  /**
   * Years rendered per row.
   * @default 4
   */
  yearsPerRow: import_prop_types18.default.oneOf([3, 4])
};

export {
  applyDefaultViewProps,
  getTodayDate,
  formatMeridiem,
  DATE_VIEWS,
  isDatePickerView,
  resolveDateFormat,
  EXPORTED_TIME_VIEWS,
  isTimeView,
  isInternalTimeView,
  convertValueToMeridiem,
  createIsAfterIgnoreDatePart,
  resolveTimeFormat,
  SECTION_TYPE_GRANULARITY,
  singleItemValueManager,
  getPickersToolbarUtilityClass,
  pickersToolbarClasses,
  MuiPickersAdapterContext,
  LocalizationProvider,
  useIsValidValue,
  usePickerContext,
  PickerProvider,
  usePickerPrivateContext,
  useToolbarOwnerState,
  PickersToolbar,
  useUtils,
  useNow,
  usePickerTranslations,
  datePickerToolbarClasses,
  extractValidationProps,
  useSplitFieldProps,
  useParsedFormat,
  usePickerActionsContext,
  DatePickerToolbar,
  validateDate,
  validateTime,
  validateDateTime,
  useValidation,
  useDateManager,
  useDatePickerDefaultizedProps,
  arrayIncludes,
  getFocusedListItemIndex,
  DEFAULT_DESKTOP_MODE_MEDIA_QUERY,
  mergeSx,
  useViews,
  useControlledValue,
  usePicker,
  pickersLayoutClasses,
  PickersActionBar,
  DAY_SIZE,
  DAY_MARGIN,
  DIALOG_WIDTH,
  VIEW_HEIGHT,
  DIGITAL_CLOCK_VIEW_HEIGHT,
  MULTI_SECTION_CLOCK_SECTION_WIDTH,
  PickersShortcuts,
  usePickerLayout_default,
  PickersLayoutRoot,
  PickersLayoutContentWrapper,
  PickersLayout,
  ArrowDropDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  CalendarIcon,
  ClockIcon,
  DateRangeIcon,
  TimeIcon,
  ClearIcon,
  getPickersTextFieldUtilityClass,
  pickersTextFieldClasses,
  getPickersInputBaseUtilityClass,
  pickersInputBaseClasses,
  getPickersSectionListUtilityClass,
  pickersSectionListClasses,
  PickersSectionListRoot,
  PickersSectionListSection,
  PickersSectionListSectionSeparator,
  PickersSectionListSectionContent,
  PickersSectionList,
  PickersInputBase,
  getPickersOutlinedInputUtilityClass,
  pickersOutlinedInputClasses,
  PickersOutlinedInput,
  getPickersFilledInputUtilityClass,
  pickersFilledInputClasses,
  PickersFilledInput,
  getPickersInputUtilityClass,
  pickersInputClasses,
  PickersInput,
  PickersTextField,
  PickerFieldUI,
  useFieldTextFieldProps,
  PickerFieldUIContextProvider,
  createNonRangePickerStepNavigation,
  useDesktopPicker,
  useField,
  useTimeManager,
  useApplyDefaultValuesToTimeValidationProps,
  useDateTimeManager,
  useApplyDefaultValuesToDateTimeValidationProps,
  useDateField,
  DateField,
  pickersFadeTransitionGroupClasses,
  getPickersDayUtilityClass,
  pickersDayClasses,
  PickersDay2 as PickersDay,
  pickersSlideTransitionClasses,
  dayCalendarClasses,
  getMonthCalendarUtilityClass,
  monthCalendarClasses,
  MonthCalendar,
  getYearCalendarUtilityClass,
  yearCalendarClasses,
  YearCalendar,
  pickersCalendarHeaderClasses,
  PickersArrowSwitcher,
  useMeridiemMode,
  PickersCalendarHeader,
  PickerViewRoot,
  getDateCalendarUtilityClass,
  dateCalendarClasses,
  DateCalendar,
  renderDateViewCalendar,
  DesktopDatePicker
};
//# sourceMappingURL=chunk-L2EUE5R3.js.map
