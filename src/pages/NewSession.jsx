import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../compoents/Input/Input";
import useGoals from "../compoents/useGoals";
import { activities, activityProps } from "../compoents/utils";
import "./NewSession.css";

function Tracking({ type }) {
  const Icon = activities[type].Icon;
  return (
    <div className="goals-tracking">
      {<Icon />}
      <button>Start Tracking</button>
    </div>
  );
}

function CreateNewSession({ type, props }) {
  const navigate = useNavigate();
  const [execution, setExecution] = useState();
  const [state, setState] = useState(
    _.reduce(
      props,
      (obj, p) => ({
        ...obj,
        [p]: activityProps[p].createInitValue(),
      }),
      {}
    )
  );
  const { api } = useGoals();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = _.reduce(
      props,
      (obj, p) => ({
        ...obj,
        [p]: activityProps[p].type.toApiValue(state[p]),
      }),
      {}
    );
    const result = await api("/api/" + type + "/session", "POST", payload);
    if (result.code >= 200 && result.code < 300) {
      navigate("/");
    } else {
      setExecution({ status: false, message: result.payload });
    }
  };

  useEffect(() => {
    let cleanTimeout = undefined;
    if (execution) {
      const timeoutId = setTimeout(() => setExecution(undefined), 5000);
      cleanTimeout = () => clearTimeout(timeoutId);
    }
    return cleanTimeout;
  }, [execution]);

  return (
    <form className="goals-create-new-session" onSubmit={handleSubmit}>
      {props.map((p) => {
        const { label, inputPlaceholder } = activityProps[p];
        return (
          <Input
            key={p}
            id={p}
            label={label}
            value={state[p]}
            onChange={(evt) =>
              setState((s) => ({ ...s, [p]: evt.target.value }))
            }
            placeholder={inputPlaceholder}
          />
        );
      })}
      <div className="form-footer">
        <input type="submit" value="Conferma" />
      </div>
      {execution && execution.status && <div>Created!</div>}
      {execution && !execution.status && <div>{execution.message}</div>}
    </form>
  );
}

export default function NewSession({ type, props }) {
  return (
    <div className={"goals-page goals-page--new-session"}>
      <Tracking type={type} />
      <CreateNewSession type={type} props={props} />
    </div>
  );
}
