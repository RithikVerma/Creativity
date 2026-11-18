import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowUpRight,
  Atom,
  ChevronRight,
  Grid2X2,
  Hash,
  LayoutGrid,
  List,
  Maximize2,
  MousePointer2,
  Search,
  Waves,
  X,
} from "lucide-react";
import { studies } from "./catalog";
import Specimen from "./Specimen";
import "./style.css";

const groups = ["All components", "Inputs", "Navigation", "Feedback"];
const refs = [
  {
    author: "Rauno Freiberg",
    title: "Invisible Details of Interaction Design",
    url: "https://rauno.me/craft/interaction-design",
    note: "Keeping a drag active after the pointer leaves a small target informed the precision dial.",
  },
  {
    author: "Emil Kowalski",
    title: "Building a Toast Component",
    url: "https://emilkowal.ski/ui/building-a-toast-component",
    note: "Sonner’s interruptible stacking transitions informed how notifications settle during repeated clicks.",
  },
];
function Mark() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 36 36"
      fill="currentColor"
      aria-hidden="true"
    >
      {Array.from({ length: 8 }, (_, i) => (
        <rect
          key={i}
          x="15"
          y="2"
          width="6"
          height="16"
          rx=".5"
          transform={"rotate(" + i * 45 + " 18 18)"}
        />
      ))}
    </svg>
  );
}
function Dialog({ title, onClose, children }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    el.showModal();
    const prior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      el.close();
      document.body.style.overflow = prior;
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className="lab-dialog"
      aria-label={title}
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === ref.current) {
          const r = ref.current.getBoundingClientRect();
          if (
            e.clientX < r.left ||
            e.clientX > r.right ||
            e.clientY < r.top ||
            e.clientY > r.bottom
          )
            onClose();
        }
      }}
    >
      <div className="dialog-head">
        <h2>{title}</h2>
        <button
          className="icon-btn"
          aria-label="Close dialog"
          onClick={onClose}
        >
          <X size={18} />
        </button>
      </div>
      {children}
    </dialog>
  );
}
function Preview({ study, index, onExpand, big = false }) {
  const { Component } = study;
  return (
    <div className={"stage " + study.color + (big ? " big" : "")}>
      <span className="stage-number">
        CL — {String(index + 1).padStart(3, "0")}
      </span>
      {!big && (
        <button
          className="expand"
          onClick={onExpand}
          aria-label={"Expand " + study.title}
        >
          <Maximize2 size={13} />
        </button>
      )}
      <Component />
      <div className="stage-hint">
        <MousePointer2 size={11} />
        {study.hint}
      </div>
    </div>
  );
}
function App() {
  const [filter, setFilter] = useState(groups[0]),
    [layout, setLayout] = useState("grid"),
    [modal, setModal] = useState(null),
    [query, setQuery] = useState("");
  const [bookmark, setBookmark] = useState(null);
  const close = () => setModal(null);
  function openSearch() {
    setQuery("");
    setModal("search");
  }
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setQuery("");
        setModal((v) => (v === "search" ? null : "search"));
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);
  const visible = studies.filter(
    (s) => filter === groups[0] || s.group === filter,
  );
  const searchResults = studies.filter((s) =>
    (s.title + " " + s.group + " " + s.desc)
      .toLowerCase()
      .includes(query.toLowerCase().trim()),
  );
  function openStudy(s) {
    setBookmark(s);
    setModal("study");
  }
  return (
    <div className="page-shell">
      <header className="topbar">
        <div className="wrap topbar-inner">
          <a
            className="brand"
            href="#"
            aria-label="Craft Lab home"
            onClick={() => {
              setFilter(groups[0]);
              close();
            }}
          >
            <Mark />
            Craft Lab<span className="brand-period">.</span>
          </a>
          <nav aria-label="Main navigation">
            <a
              className="nav-current"
              href="#collection"
              onClick={() => setFilter(groups[0])}
            >
              <span />
              Collection
            </a>
            <button onClick={() => setModal("notes")}>
              Field notes <ArrowUpRight size={12} />
            </button>
          </nav>
          <button
            className="search-trigger"
            onClick={openSearch}
            aria-label="Search components"
          >
            <Search size={15} />
            <span>Quick find</span>
            <kbd>
              {/Mac|iPhone|iPad/.test(navigator.platform) ? "⌘" : "Ctrl"} K
            </kbd>
          </button>
        </div>
      </header>
      <main className="wrap">
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow">
              <i /> INTERACTION PLAYGROUND
            </div>
            <h1>
              Interface Craft<span>.</span>
            </h1>
            <p>
              A collection of tactile components and small interactions.
              <br className="desktop-break" /> Built to explore how interfaces
              feel.
            </p>
            <div className="tech flex flex-wrap items-center gap-2">
              <span>
                <Atom />
                React
              </span>
              <span>
                <Hash />
                CSS
              </span>
              <span>
                <Waves />
                Tailwind CSS
              </span>
            </div>
          </div>
          <Specimen />
        </section>
        <section id="collection" aria-labelledby="collection-title">
          <div className="collection-heading">
            <div className="flex items-center gap-3">
              <LayoutGrid size={19} strokeWidth={1.8} />
              <h2 id="collection-title">Component collection</h2>
              <span className="count">
                {String(visible.length).padStart(2, "0")}
              </span>
            </div>
            <div
              className="view-toggle"
              role="group"
              aria-label="Collection layout"
            >
              {[
                ["grid", Grid2X2],
                ["list", List],
              ].map(([name, Icon]) => (
                <button
                  key={name}
                  onClick={() => setLayout(name)}
                  aria-label={name + " layout"}
                  aria-pressed={layout === name}
                >
                  <Icon size={15} />
                </button>
              ))}
            </div>
          </div>
          <div className="filters" role="group" aria-label="Filter components">
            {groups.map((g) => (
              <button
                key={g}
                aria-pressed={filter === g}
                onClick={() => setFilter(g)}
              >
                {g}
              </button>
            ))}
          </div>
          <div
            className={
              "collection-grid " + (layout === "list" ? "list-layout" : "")
            }
          >
            {visible.map((s) => (
              <article className="study-card" key={s.title}>
                <Preview
                  study={s}
                  index={studies.indexOf(s)}
                  onExpand={() => openStudy(s)}
                />
                <div className="card-info">
                  <div className="category">
                    <i className={s.color} />
                    {s.group}
                  </div>
                  <h3>
                    <button onClick={() => openStudy(s)} className="title-link">
                      {s.title}
                      <ArrowUpRight size={17} />
                    </button>
                  </h3>
                  <p>{s.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <footer className="wrap">
        <span className="mini-brand">
          <Mark />
          Craft Lab
        </span>
        <button onClick={() => setModal("notes")}>
          Field notes <ArrowUpRight size={13} />
        </button>
      </footer>
      {modal === "notes" && (
        <Dialog title="Field notes" onClose={close}>
          <div className="notes-content">
            <p className="dialog-intro">
              Two references behind this collection of interaction studies.
            </p>
            {refs.map((r) => (
              <a
                className="ref-link"
                key={r.url}
                href={r.url}
                target="_blank"
                rel="noreferrer"
              >
                <span className="category">{r.author}</span>
                <strong>
                  {r.title} <ArrowUpRight size={16} />
                </strong>
                <p>{r.note}</p>
              </a>
            ))}
          </div>
        </Dialog>
      )}
      {modal === "search" && (
        <Dialog title="Find a component" onClose={close}>
          <div className="search-input">
            <Search size={18} />
            <input
              autoFocus
              placeholder="Search by name or category…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && searchResults.length)
                  openStudy(searchResults[0]);
              }}
              aria-label="Search by name or category"
            />
          </div>
          <div className="results">
            {searchResults.map((s) => (
              <button key={s.title} onClick={() => openStudy(s)}>
                <span className={"result-dot " + s.color} />
                {s.title}
                <small>{s.group}</small>
                <ChevronRight size={14} />
              </button>
            ))}
            {!searchResults.length && <p>No matching components.</p>}
          </div>
        </Dialog>
      )}
      {modal === "study" && bookmark && (
        <Dialog title={bookmark.title} onClose={close}>
          <Preview study={bookmark} index={studies.indexOf(bookmark)} big />
          <div className="study-notes">
            <div className="category">
              <i className={bookmark.color} />
              {bookmark.group}
            </div>
            <p>{bookmark.notes}</p>
          </div>
        </Dialog>
      )}
    </div>
  );
}
createRoot(document.getElementById("root")).render(<App />);
