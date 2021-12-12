import React from "react";
import NewSession from "./NewSession";

export default function Climbing() {
  return (
    <NewSession type="climbing" props={["date", "description", "duration"]} />
  );
}
