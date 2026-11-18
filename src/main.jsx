import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { ArrowUpRight, X } from "lucide-react";
import { studies } from "./catalog";
import "./style.css";

const groups = ["All", "Inputs", "Navigation", "Feedback"];

function Dialog({ study, index, onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    ref.current?.showModal();
    return () => ref.current?.close();
  }, []);

  const Component = study.Component;

  return (
    <dialog ref={ref} className="study-dialog" onCancel={onClose}>
      <button className="dialog-close" onClick={onClose} aria-label="Close">
        <X size={18} />
      </button>
      <div className="dialog-preview"><Component /></div>
      <div className="dialog-copy">
        <span>{String(index + 1).padStart(2, "0")} / {study.group}</span>
        <h2>{study.title}</h2>
        <p>{study.notes}</p>
      </div>
    </dialog>
  );
}

function App() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const visible = studies.filter((study) => filter === "All" || study.group === filter);

  return (
    <div className="site">
      <header>
        <a href="#top" className="wordmark">Craft Lab</a>
        <span>Interaction studies</span>
      </header>

      <main id="top">
        <section className="intro">
          <p>Digital craft, in small doses.</p>
          <h1>Interfaces should<br />feel considered.</h1>
        </section>

        <section className="collection" aria-labelledby="collection-title">
          <div className="collection-head">
            <h2 id="collection-title">Studies</h2>
            <div className="filters" aria-label="Filter studies">
              {groups.map((group) => (
                <button key={group} aria-pressed={filter === group} onClick={() => setFilter(group)}>
                  {group}
                </button>
              ))}
            </div>
          </div>

          <div className="grid">
            {visible.map((study) => {
              const index = studies.indexOf(study);
              const Component = study.Component;
              return (
                <article key={study.title}>
                  <div className="preview">
                    <span className="index">{String(index + 1).padStart(2, "0")}</span>
                    <Component />
                  </div>
                  <button className="study-link" onClick={() => setSelected(study)}>
                    <span>
                      <strong>{study.title}</strong>
                      <small>{study.desc}</small>
                    </span>
                    <ArrowUpRight size={18} />
                  </button>
                </article>
              );
            })}
          </div>
        </section>
      </main>

      <footer>
        <span>Craft Lab</span>
        <span>React / CSS / 2026</span>
      </footer>

      {selected && <Dialog study={selected} index={studies.indexOf(selected)} onClose={() => setSelected(null)} />}
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
