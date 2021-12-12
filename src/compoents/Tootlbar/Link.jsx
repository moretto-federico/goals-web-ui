import React from "react";
import "./Link.css";
import { Link as RLink } from "react-router-dom";

export default function Link({ Icon, text, url }) {
  return (
    <div className="goals-toolbar-link">
      <Icon title={text} />
      <RLink to={url}>{text}</RLink>
    </div>
  );
}
