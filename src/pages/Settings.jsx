import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import useGoals from "../compoents/useGoals";
import { activityProps } from "../compoents/utils";
import "./Settings.css";

const keys = [
  "type",
  "date",
  "description",
  "distance",
  "duration",
  "elevationGain",
  "id",
];

function ExportPanel() {
  const [exportToCsv, setExportToCsv] = useState({});
  const { api } = useGoals();
  const exportRef = useRef();

  const handleExport = () => {
    api("/api/sessions/year/" + moment().year(), "GET").then((response) => {
      const sessions = response.payload;
      if (sessions.length === 0) return;
      const header = keys.join(",") + "\n";
      let content =
        "data:text/csv;charset=utf-8," +
        header +
        sessions
          .map((s) =>
            keys.map((k) => activityProps[k].type.toCsvValue(s[k])).join(",")
          )
          .join("\n");
      const fileName =
        "goals-sessions- " + moment().format("YYYY-MM-DD") + ".csv";

      setExportToCsv({ content, fileName });
    });
  };
  useEffect(() => {
    if (exportToCsv.content) {
      exportRef.current.click();
      setExportToCsv({});
    }
  }, [exportToCsv.content]);

  return (
    <>
      <button onClick={handleExport}>Export Data</button>
      <a
        ref={exportRef}
        className="goals-export-csv"
        href={exportToCsv.content}
        download={exportToCsv.fileName}
      >
        Donwload Sessions
      </a>
    </>
  );
}

function getSessionsByCsv(text) {
  const lines = text.split("\n");
  const header = lines.shift().split(",");
  return lines.map((line) => {
    const result = {};
    const values = line.split(",");
    for (let i = 0; i < header.length; i++) {
      result[header[i]] = activityProps[header[i]].type.fromCsvValue(values[i]);
    }
    return result;
  });
}

function Import() {
  const [toImport, setToImport] = useState(true);
  const [text, setText] = useState("");
  const [errors, setErrors] = useState([]);
  const { api } = useGoals();

  const handlePrimaryClick = async () => {
    if (!toImport) {
      const sessions = getSessionsByCsv(text);
      for (const session of sessions) {
        try {
          await api(
            "/api/" + session.type + "/session",
            session.id ? "PUT" : "POST",
            session
          );
        } catch (err) {
          setErrors((e) => [...e, err]);
        }
      }
      setToImport(true);
    } else {
      setToImport(false);
      setErrors([]);
    }
  };

  return (
    <div className="goals-settings__import">
      <div className="goals-settings__import-header">
        <button onClick={handlePrimaryClick}>
          {toImport ? "Import Data" : "Confirm Import"}
        </button>
        {!toImport && (
          <button
            onClick={() => {
              setToImport(true);
              setErrors([]);
            }}
          >
            Cancel Import
          </button>
        )}
      </div>
      {!toImport && (
        <textarea
          value={text}
          onChange={(evt) => setText(evt.target.value)}
          placeholder="write CSV data here"
        />
      )}
      {errors.length > 0 && (
        <div className="goals-settings__import-erros">
          {errors.map((err, i) => (
            <p key={i}>{JSON.stringify(err)}</p>
          ))}
        </div>
      )}
    </div>
  );
}

function Settings() {
  return (
    <div className="goals-page goals-page--settings">
      <Import />
      <ExportPanel />
    </div>
  );
}

export default Settings;
