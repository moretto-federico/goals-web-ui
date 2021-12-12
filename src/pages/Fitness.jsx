import React from "react";
import NewSession from "./NewSession";

export default function Fitness() {
  return (
    <NewSession type="fitness" props={["date", "description", "duration"]} />
  );
}
