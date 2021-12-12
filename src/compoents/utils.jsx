import _ from "lodash";
import moment from "moment";
import { FaMountain, FaRunning } from "react-icons/fa";
import { GiMountainClimbing } from "react-icons/gi";
import { MdFitnessCenter } from "react-icons/md";

export const activities = {
  running: {
    type: "running",
    label: "Running",
    Icon: FaRunning,
  },
  trekking: {
    type: "trekking",
    label: "Trekking",
    Icon: FaMountain,
  },
  climbing: {
    type: "climbing",
    label: "Climbing",
    Icon: GiMountainClimbing,
  },
  fitness: {
    type: "fitness",
    label: "Fitness",
    Icon: MdFitnessCenter,
  },
};

function stringToCsv(s) {
  return s.replaceAll(",", "%%COMMA%%").replaceAll("\n", "%%NEW_LINE%%");
}

function csvToString(s) {
  return s.replaceAll("%%COMMA%%", ",").replaceAll("%%NEW_LINE%%", "\n");
}

export const types = {
  date: {
    toApiValue: (value) => moment(value).toISOString(),
    toCsvValue: _.identity,
    fromCsvValue: _.identity,
  },
  string: {
    toApiValue: _.identity,
    toCsvValue: stringToCsv,
    fromCsvValue: csvToString,
  },
  number: {
    toApiValue: _.toNumber,
    toCsvValue: _.identity,
    fromCsvValue: _.toNumber,
  },
  duration: {
    toApiValue: (value) => moment.duration(value).as("seconds"),
    toCsvValue: _.identity,
    fromCsvValue: _.toNumber,
  },
};

export const activityProps = {
  date: {
    label: "Date",
    inputPlaceholder: "YYYY-MM-DD",
    createInitValue: () => moment().format("YYYY-MM-DD"),
    type: types.date,
  },
  description: {
    label: "Description",
    inputPlaceholder: "describe the place or type of activity",
    createInitValue: () => "",
    type: types.string,
  },
  duration: {
    label: "Duration",
    inputPlaceholder: "HH:mm:ss",
    createInitValue: () => "",
    type: types.duration,
  },
  distance: {
    label: "Distance",
    inputPlaceholder: "18000",
    createInitValue: () => "",
    type: types.number,
  },
  elevationGain: {
    label: "Elevation gain",
    inputPlaceholder: "500",
    createInitValue: () => "",
    type: types.number,
  },
  kmPerHour: {
    label: "Km/h",
    inputPlaceholder: "Km per hour",
    createInitValue: () => "",
    type: types.number,
  },
  minPerKm: {
    label: "min/Km",
    inputPlaceholder: "minutes per Km",
    createInitValue: () => "",
    type: types.number,
  },
  id: {
    label: "Identify",
    inputPlaceholder: "Input an UUID",
    createInitValue: () => "",
    type: types.string,
  },
  type: {
    label: "Session type",
    inputPlaceholder: _.keys(activities).join("/"),
    createInitValue: () => "",
    type: types.string,
  },
};
