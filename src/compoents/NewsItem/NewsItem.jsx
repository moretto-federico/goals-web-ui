import _ from "lodash";
import moment from "moment";
import React from "react";
import { BiTimer } from "react-icons/bi";
import { GiPathDistance } from "react-icons/gi";
import { TiArrowLoop } from "react-icons/ti";
import { SiSpeedtest } from "react-icons/si";
import "./NewsItem.css";
import { FaMountain } from "react-icons/fa";
import { activities } from "../utils";

const infoBuilder = {
  running: ({ duration, distance, kmPerHour, minPerKm }) => [
    {
      Icon: BiTimer,
      value: moment.duration(duration, "s").format("h:mm:ss"),
    },
    {
      Icon: GiPathDistance,
      value: `${_.round(distance / 1000, 1)} Km`,
    },
    {
      Icon: TiArrowLoop,
      value: `${minPerKm} min/Km`,
    },
    {
      Icon: SiSpeedtest,
      value: `${kmPerHour} Km/h`,
    },
  ],
  fitness: ({ duration }) => [
    {
      Icon: BiTimer,
      value: moment.duration(duration, "s").format("h:mm:ss"),
    },
  ],
  climbing: ({ duration }) => [
    {
      Icon: BiTimer,
      value: moment.duration(duration, "s").format("h:mm:ss"),
    },
  ],
  trekking: ({ duration, distance, elevationGain }) => [
    {
      Icon: FaMountain,
      value: `${elevationGain} m`,
    },
    {
      Icon: BiTimer,
      value: moment.duration(duration, "s").format("h:mm"),
    },
    {
      Icon: GiPathDistance,
      value: `${_.round(distance / 1000, 1)} Km`,
    },
  ],
};

export default function NewsItem({
  label,
  description,
  type,
  distance,
  date,
  duration,
  elevationGain,
  kmPerHour,
  minPerKm,
}) {
  const when = moment(date, "YYYY-MM-DDTHH:mm.Z").format("ll");
  const Icon = activities[type].Icon;
  const info = infoBuilder[type]({
    duration,
    distance,
    elevationGain,
    kmPerHour,
    minPerKm,
  });
  return (
    <li className="goals-news-item">
      <div className="goals-news-item__header">
        <div className="goals-news-item__header-type">
          <Icon />
          <p className="goals-news-item__header-label">{label}</p>
        </div>
        <div className="goals-news-item__header-content">
          <p className="goals-news-item__header-description">{description}</p>
          <p className="goals-news-item__header-date">{when}</p>
        </div>
      </div>
      <ol className="goals-news-item__content">
        {info.map(({ Icon: InfoIcon, value }, i) => (
          <li key={i} className="goals-news-item__content-item">
            <InfoIcon />
            <p className="goals-news-item__header-label">{value}</p>
          </li>
        ))}
      </ol>
    </li>
  );
}
