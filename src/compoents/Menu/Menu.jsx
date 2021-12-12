import React, { useState } from "react";
import { BsList } from "react-icons/bs";
import "./Menu.css";

export default function Menu({ children }) {
  const [show, setShow] = useState(false);
  return (
    <div className="goals-menu">
      <BsList onClick={() => setShow((s) => !s)} />
      {show && <div className="goals-menu__list">{children}</div>}
    </div>
  );
}
