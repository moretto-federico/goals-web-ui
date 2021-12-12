import React from "react";
import NewSession from "./NewSession";

export default function Trekking() {
  return (
    <NewSession
      type="trekking"
      props={["date", "description", "elevationGain", "duration", "distance"]}
    />
  );
}
