import React from "react";
import { FaRunning } from "react-icons/fa";

export default function RunningSession({ data }) {
  return (
    <div className="goals-running-session goals-session">
      <div className="goals-session-icon">
        <FaRunning />
      </div>
      <div className="goals-session-section">
        <div className="goals-session-daa">{data}</div>
      </div>
    </div>
  );
}
