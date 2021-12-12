import React from "react";
import NewSession from "./NewSession";

export default function Running() {
  return (
    <NewSession
      type="running"
      props={["date", "description", "duration", "distance"]}
    />
  );
}
