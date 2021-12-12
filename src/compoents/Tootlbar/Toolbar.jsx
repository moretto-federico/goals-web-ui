import React from "react";
import _ from "lodash";
import { BsBullseye } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import Menu from "../Menu/Menu";
import { activities } from "../utils";
import Link from "./Link";
import "./Toolbar.css";

function Links() {
  return (
    <>
      {_.map(activities, (act, id) => (
        <Link key={id} Icon={act.Icon} url={`/${id}`} text={act.label} />
      ))}
    </>
  );
}

export default function Toolbar() {
  return (
    <div className="goals-toolbar">
      <div className="goals-toolbar__logo">
        <BsBullseye />
      </div>
      <div className="goals-toolbar__links">
        <Links />
      </div>
      <div className="goals-toolbar__menu">
        <Menu>
          <div className="goals-toolbar__menu-links">
            <Links />
          </div>
          <br />
          <Link Icon={FiSettings} url={`/settings`} text="Settings" />
        </Menu>
      </div>
    </div>
  );
}
