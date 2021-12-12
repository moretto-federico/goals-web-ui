import moment from "moment";
import React, { useEffect, useState } from "react";
import NewsItem from "../NewsItem/NewsItem";
import useGoals from "../useGoals";
import "./News.css";

export default function News() {
  const { api } = useGoals();
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    api("/api/sessions/year/" + moment().year(), "GET").then((response) =>
      setSessions(response.payload)
    );
  }, [api]);

  return (
    <ol className="goals-news">
      {sessions.map((n, i) => (
        <NewsItem key={i} {...n} />
      ))}
    </ol>
  );
}
