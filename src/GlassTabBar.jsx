import React, { useEffect, useId, useRef, useState } from "react";
import {
  BatteryFull, Bell, Bookmark, Copy, Crop, House, Inbox, Layers, Moon, Music2, Plus, Signal, Wifi,
  Rabbit, Scissors, Share, Sun, Trash2, Type, Undo2, WandSparkles,
} from "lucide-react";
import "./glass-tab-bar.css";

const tabs = [
  { name: "Home", icon: House },
  { name: "Inbox", icon: Inbox },
  { name: "Notifications", icon: Bell },
  { name: "Apps", icon: Layers },
];

const actions = [
  ["Trim", Scissors], ["Crop", Crop], ["Enhance", WandSparkles], ["Text", Type],
  ["Audio", Music2], ["Speed", Rabbit], ["Duplicate", Copy], ["Undo", Undo2],
  ["Share", Share], ["Save", Bookmark], ["Delete", Trash2],
];

export default function GlassTabBar() {
  const id = useId();
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [dark, setDark] = useState(false);
  const [pressed, setPressed] = useState(null);
  const tabButtons = useRef([]);
  const firstAction = useRef(null);
  const toggle = useRef(null);

  useEffect(() => {
    if (expanded) firstAction.current?.focus({ preventScroll: true });
  }, [expanded]);

  useEffect(() => {
    if (!pressed) return;
    const timer = window.setTimeout(() => setPressed(null), 650);
    return () => window.clearTimeout(timer);
  }, [pressed]);

  function close() {
    setExpanded(false);
    setPressed(null);
    toggle.current.focus({ preventScroll: true });
  }

  function navigate(event) {
    const next = {
      ArrowRight: (index + 1) % tabs.length,
      ArrowLeft: (index + tabs.length - 1) % tabs.length,
      Home: 0,
      End: tabs.length - 1,
    }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    setIndex(next);
    tabButtons.current[next].focus();
  }

  return (
    <section className="glass-study" data-dark={dark} aria-label="Expandable glass tab bar">
      <div className="glass-phone" onKeyDown={event => {
        if (event.key === "Escape" && expanded) {
          event.preventDefault();
          event.stopPropagation();
          close();
        }
      }}>
        <div className="glass-status" aria-hidden="true">
          <span>9:41</span>
          <span className="glass-island" />
          <span className="glass-indicators"><Signal size={12} /><Wifi size={12} /><BatteryFull size={16} /></span>
        </div>
        <span className="glass-side-keys" aria-hidden="true" />
        <button className="glass-theme" type="button" aria-label="Dark mode" aria-pressed={dark} onClick={() => setDark(!dark)}>
          {dark ? <Moon size={16} /> : <Sun size={16} />}
        </button>
        <div id={id + "-page"} className="glass-page" role="tabpanel" aria-labelledby={id + "-tab-" + index}>
          {tabs[index].name}
        </div>
        <div className="glass-dock" data-expanded={expanded} style={{ "--glass-index": index }}>
          <div className="glass-surface">
            <div className="glass-tabs" role="tablist" aria-label="Navigation" onKeyDown={navigate}
              ref={node => { if (node) node.inert = expanded; }}>
              {tabs.map(({ name, icon: Icon }, position) => (
                <button key={name} id={id + "-tab-" + position} type="button" role="tab" aria-label={name} title={name}
                  aria-controls={id + "-page"} aria-selected={position === index} tabIndex={position === index ? 0 : -1}
                  ref={node => { tabButtons.current[position] = node; }} onClick={() => setIndex(position)}>
                  <Icon size={20} aria-hidden="true" />
                </button>
              ))}
            </div>
            <div id={id + "-actions"} className="glass-actions" role="group" aria-label="Quick actions"
              ref={node => { if (node) node.inert = !expanded; }}>
              {actions.map(([label, Icon], position) => (
                <button key={label} type="button" data-pressed={pressed?.label === label}
                  ref={position === 0 ? firstAction : undefined} onClick={() => setPressed({ label })}>
                  <span className="glass-tile"><Icon size={20} aria-hidden="true" /></span>
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>
          <button type="button" ref={toggle} className="glass-toggle" aria-label={expanded ? "Close actions" : "Open actions"}
            aria-controls={id + "-actions"} aria-expanded={expanded} onClick={() => expanded ? close() : setExpanded(true)}>
            <Plus size={22} aria-hidden="true" />
          </button>
        </div>
        <span role="status" className="glass-announcement">{pressed && pressed.label + " selected"}</span>
      </div>
    </section>
  );
}
