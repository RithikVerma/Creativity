import React, { useState } from "react";
import { Link2, Unlink } from "lucide-react";
import github from "./providers/github.svg";
import gitlab from "./providers/gitlab.svg";
import bitbucket from "./providers/bitbucket.svg";
import "./git-providers.css";

const providers = [
  { name: "GitHub", icon: github },
  { name: "GitLab", icon: gitlab },
  { name: "Bitbucket", icon: bitbucket },
];

export default function GitProviders() {
  const [connection, setConnection] = useState({ name: "GitHub", since: "Aug 28, 2026" });
  const [open, setOpen] = useState("GitHub");
  const [message, setMessage] = useState("");

  function toggle(name) {
    if (connection?.name === name) {
      setConnection(null);
      setMessage(name + " disconnected");
    } else {
      const since = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
      setConnection({ name, since });
      setMessage(name + " connected");
    }
    setOpen(name);
  }

  return (
    <div className="git-providers" role="group" aria-label="Workspace Git provider">
      <div className="gp-row" onMouseLeave={() => connection && setOpen(connection.name)}>
        {providers.map(({ name, icon }) => {
          const expanded = open === name;
          const active = connection?.name === name;
          return (
            <div key={name} className="gp-card" data-brand={name} data-open={expanded} onMouseEnter={() => setOpen(name)}>
              <img className="gp-watermark" src={icon} alt="" />
              <button type="button" className="gp-selector" aria-label={name + (active ? ", connected" : ", disconnected")} aria-expanded={expanded}
                onFocus={() => setOpen(name)} onClick={() => setOpen(name)}>
                <img src={icon} alt="" />
              </button>
              {expanded && <div className="gp-info"><strong>{name}</strong><span>{active ? "Enabled " + connection.since : "Disconnected"}</span></div>}
              {expanded && <button type="button" className="gp-action" onClick={() => toggle(name)}>
                {active ? <Unlink size={14} /> : <Link2 size={14} />}{active ? "Disconnect" : "Connect"}
              </button>}
            </div>
          );
        })}
      </div>
      <span className="gp-status" role="status">{message}</span>
    </div>
  );
}
