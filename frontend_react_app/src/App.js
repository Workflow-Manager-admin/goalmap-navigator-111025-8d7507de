import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import MilestoneModal from "./MilestoneModal";
import GoalModal from "./GoalModal";
import ProgressTracker from "./ProgressTracker";

/** Simple AddMilestoneModal for new milestone input (title + description)
 * PUBLIC_INTERFACE
 */
function AddMilestoneModal({ onAdd, onClose }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [error, setError] = useState("");
  const titleRef = useRef(null);

  // Focus input on open
  useEffect(() => {
    if (titleRef.current) titleRef.current.focus();
  }, []);

  // Handle Add
  const handleAdd = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required.");
      return;
    }
    onAdd({
      title: title.trim(),
      description: desc.trim(),
    });
    setTitle("");
    setDesc("");
    setError("");
  };

  return (
    <div className="modal-overlay" aria-modal="true" role="dialog" tabIndex={-1} style={{zIndex: 3500}}>
      <div className="modal-content" style={{ maxWidth: 410 }} onClick={e => e.stopPropagation()}>
        <h2 style={{marginTop:0, marginBottom: 18, color: "var(--primary)"}}>Add New Milestone</h2>
        <form onSubmit={handleAdd} className="modal-form" aria-label="Add milestone form">
          <label htmlFor="milestone-title">Title</label>
          <input
            id="milestone-title"
            className="input"
            type="text"
            maxLength={48}
            ref={titleRef}
            autoFocus
            value={title}
            spellCheck={true}
            autoCapitalize="sentences"
            autoComplete="off"
            required
            placeholder="Milestone title"
            onChange={e => { setError(""); setTitle(e.target.value); }}
          />
          <label htmlFor="milestone-desc">Description</label>
          <textarea
            id="milestone-desc"
            className="input"
            maxLength={160}
            value={desc}
            placeholder="Milestone description (optional)"
            onChange={e => setDesc(e.target.value)}
            spellCheck={true}
            style={{minHeight:54}}
          />
          {error && (<div style={{ color: "#d94b48", marginTop: 6, fontWeight: 500 }}>{error}</div>)}
          <div className="modal-actions" style={{marginTop: 26, justifyContent: "flex-end", gap: 11}}>
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-accent" style={{minWidth:97, fontWeight:600}}>
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
/** Milestone icons for demo (SVG inline, modern/minimal) */
const milestoneIcons = {
  javascript: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{display: "block"}} xmlns="http://www.w3.org/2000/svg">
      <rect width="20" height="20" rx="6" fill="#F7DF1E"/>
      <text x="10" y="15.5" fill="#222" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">JS</text>
    </svg>
  ),
  project: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{display: "block"}} xmlns="http://www.w3.org/2000/svg">
      <rect width="20" height="20" rx="6" fill="#1976D2"/>
      <path d="M14.7 16H5.3c-.63 0-1.14-.5-1.14-1.13V6.89c0-.63.51-1.13 1.14-1.13h1.19l.47-1.04A1.13 1.13 0 0 1 7.95 4.5h4.1c.45 0 .86.27 1.06.7l.48 1.06h1.19c.63 0 1.14.5 1.14 1.13v8.02c0 .63-.51 1.13-1.14 1.13zM14 7.4V6.67l-.1-.21-.47-1.03h-4.85l-.47 1.03-.09.21V7.4H14zm-7.5.69v6.65c0 .33.27.6.61.6h9.78a.6.6 0 0 0 .61-.6V8.09a.6.6 0 0 0-.61-.6H7.11a.6.6 0 0 0-.61.6z" fill="#fff"/>
    </svg>
  ),
  internship: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{display: "block"}} xmlns="http://www.w3.org/2000/svg">
      <rect width="20" height="20" rx="6" fill="#FF6F00"/>
      <path d="M10 5c-2.76 0-5 1.12-5 2.5v.88c0 .8.49 1.45 1.4 2.08C7.05 11.17 8.37 11.88 10 11.88s2.95-.71 3.6-1.42c.91-.63 1.4-1.28 1.4-2.08V7.5C15 6.12 12.76 5 10 5zm0 6.13c-1.06 0-2.48-.44-3.19-1.2C6.99 10.93 8.35 12 10 12c1.64 0 3-1.07 3.19-2.07-.71.76-2.13 1.2-3.19 1.2z" fill="#fff"/>
      <circle cx="15.5" cy="15.5" r="2.5" fill="#fff" fillOpacity="0.7"/>
      <circle cx="15.5" cy="15.5" r="1.05" fill="#222"/>
    </svg>
  ),
  default: (
    <svg width="20" height="20" viewBox="0 0 20 20" style={{display: "block"}} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="20" height="20" rx="6" fill="#edeef2"/>
      <circle cx="10" cy="10" r="5" fill="#1976D2" fillOpacity="0.16"/>
    </svg>
  ),
};

/* --- Minimal DEMO milestones and helpers for illustration --- */
const DEMO_MILESTONES = [
  {
    id: 1,
    title: "Learn JavaScript",
    description: "Get comfortable with JS fundamentals.",
    status: "Completed",
    icon: "javascript",
    term: "short"
  },
  {
    id: 2,
    title: "Build Personal Project",
    description: "Create a portfolio project using JS.",
    status: "In Progress",
    icon: "project",
    term: "medium"
  },
  {
    id: 3,
    title: "Apply for Internships",
    description: "Prepare resume. Start applications.",
    status: "Planned",
    icon: "internship",
    term: "long"
  }
];

/** Helper to animate minimal appearance for new/last milestone (using the same fade/slide as CSS class .milestone-dot). */
function MilestoneRoadmapBar({ milestones, onMilestoneClick }) {
  // Slightly improved roadmap bar: minimal dot/line/label with animation, click interactivity.
  // Responsive: shrinks for < 700px screens, font-size adjustments handled by CSS.
  return (
    <div
      className="milestone-roadmap-bar"
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: 0,
        justifyContent: "center",
        margin: "28px 0 30px 0",
        width: "100%",
        maxWidth: 790,
        minHeight: 80
      }}
    >
      {milestones.length === 0 && (
        <div className="empty-state" style={{minHeight:100}}>No milestones yet!</div>
      )}
      {milestones.map((m, idx) => (
        <React.Fragment key={m.id}>
          <div
            className="milestone-dot"
            tabIndex={0}
            title={m.title}
            role="button"
            aria-label={`View details of milestone ${m.title}`}
            onClick={() => onMilestoneClick(m)}
            onKeyDown={e => { if(e.key==="Enter")onMilestoneClick(m);}}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              margin: "0 18px",
              cursor: "pointer",
              outline: "none"
            }}
          >
            <div
              style={{
                width: 39,
                height: 39,
                borderRadius: "50%",
                background: m.status==="Completed" ? "#e3fcec" : m.status==="In Progress" ? "#fff9ed" : "#ececf3",
                border: m.status==="Completed"
                  ? "2.2px solid #09b36a"
                  : m.status==="In Progress"
                  ? "2.3px solid #FFC632"
                  : "2px solid #b8bec5",
                boxShadow: "0 1.5px 8px 0 rgba(23,43,99,.09)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "7px",
                transition: "border 0.2s, box-shadow .16s",
                zIndex: 2,
                position: "relative"
              }}
            >
              {milestoneIcons[m.icon] || milestoneIcons.default}
            </div>
            <div
              className={
                "milestone-title" +
                (m.status === "In Progress" || m.status === "InProgress" ? " milestone-title-active" : "")
              }
              style={{
                fontSize: 14,
                textAlign: "center",
                color: "#353651",
                fontWeight: 600,
                maxWidth: 98,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis"
              }}
            >
              {m.title}
            </div>
          </div>
          {idx !== milestones.length - 1 && (
            <div
              className="roadmap-path-bar"
              style={{
                flex: "0 0 35px",
                height: 3.7,
                margin: "0 0.5vw",
                minWidth: 20,
                background:
                  milestones[idx].status === "Completed"
                    ? "linear-gradient(90deg,#09b36a 40%,#FFC632 100%)"
                    : "#e3e5ec",
                borderRadius: 7,
                alignSelf: "center",
                marginBottom: 12
              }}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

/** 
 * TimelineFilter segmented control UI for filtering milestones by term.
 * PUBLIC_INTERFACE
 * Props:
 * - value: current selected term ("short", "medium", "long", or "all")
 * - onChange: callback to update filter value
 */
function TimelineFilter({ value, onChange }) {
  const terms = [
    { label: "Short-term", value: "short" },
    { label: "Medium-term", value: "medium" },
    { label: "Long-term", value: "long" },
    { label: "All", value: "all" }
  ];
  return (
    <div style={{
      display: "flex", gap: 3, alignItems: "center", background: "#f3f5fa", padding: "5px 14px",
      borderRadius: 13, margin: "0 0 10px 0", border: "1px solid #e0e5ee", boxShadow: "var(--shadow-sm)"
    }}>
      {terms.map(t => (
        <button
          key={t.value}
          type="button"
          className="btn-secondary"
          onClick={() => onChange(t.value)}
          style={{
            background: value === t.value ? "var(--primary)" : "transparent",
            color: value === t.value ? "#fff" : "var(--secondary)",
            border: value === t.value ? "1.5px solid var(--primary)" : "1px solid transparent",
            fontWeight: value === t.value ? 700 : 500,
            borderRadius: 9,
            fontSize: 16,
            padding: "7px 19px",
            transition: "all 0.12s",
            cursor: value === t.value ? "default" : "pointer",
            outline: value === t.value ? "none" : undefined,
            boxShadow: value === t.value ? "0 2px 10px #1976d22e" : undefined
          }}
          disabled={value === t.value}
          aria-pressed={value === t.value}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

/** Main App component */
function App() {
  // Existing demo state: milestone array, modal state, etc.
  const [milestones, setMilestones] = useState(DEMO_MILESTONES);
  const [showMilestoneModal, setShowMilestoneModal] = useState(false);
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  // AddMilestone modal UI state
  const [showAddModal, setShowAddModal] = useState(false);
  // Timeline filter state
  const [timelineFilter, setTimelineFilter] = useState("all");

  // Provide a clean "Add Milestone" handler
  function handleAddMilestone(data) {
    // Default status is "Pending", icon is default
    // Default term to "short" if not provided (optional: could add selection UI in modal later)
    const customMilestone = {
      id: Date.now() + Math.floor(Math.random() * 99999),
      title: data.title,
      description: data.description || "",
      status: "Pending",
      icon: "default",
      term: "short"
    };
    setMilestones((prev) => [...prev, customMilestone]);
    setShowAddModal(false);
  }

  // When a milestone is clicked, open MilestoneModal
  function handleMilestoneClick(milestone) {
    setSelectedMilestone(milestone);
    setShowMilestoneModal(true);
  }

  // Mark milestone as completed (demo)
  function handleMarkComplete(milestoneId) {
    setMilestones(ms =>
      ms.map(m => m.id === milestoneId ? { ...m, status: "Completed" } : m)
    );
    setShowMilestoneModal(false);
  }

  // Filtering function for milestones
  const filteredMilestones = React.useMemo(() =>
    timelineFilter === "all"
      ? milestones
      : milestones.filter((m) => (m.term || "short") === timelineFilter),
    [milestones, timelineFilter]
  );

  // Main UI: dashboard style, roadmap section, progress, add-milestone button, modals.
  return (
    <div className="dashboard-root">
      <aside className="dashboard-sidebar" aria-label="Sidebar Navigation">
        <div className="sidebar-header">
          <div className="logo-circle">G</div>
          <div className="sidebar-title">GoalMap</div>
        </div>
        <nav className="sidebar-nav" aria-label="Primary">
          <button className="sidebar-link active" disabled>
            <span role="img" aria-label="roadmap" style={{marginRight:7}}>🗺️</span>
            <span>Roadmap</span>
          </button>
        </nav>
        <div className="sidebar-footer"></div>
      </aside>
      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1 className="dashboard-title" style={{margin:0}}>My Goal Roadmap</h1>
        </header>
        <section className="roadmap-section" style={{justifyContent: "flex-start"}}>
          <div style={{
            display: "flex",
            alignItems: "center",
            maxWidth: 900,
            width: "100%",
            margin: "0 auto 16px auto",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 10
          }}>
            <TimelineFilter value={timelineFilter} onChange={setTimelineFilter} />
            <button
              type="button"
              className="btn-accent"
              style={{
                fontSize:"1.06em", fontWeight:600,
                display:"inline-flex",alignItems:"center",gap:8,padding:"11px 19px",borderRadius:13
              }}
              aria-label="Add a new milestone"
              onClick={() => setShowAddModal(true)}
            >
              <span style={{fontSize:"1.21em",lineHeight:"0",marginRight:2,fontWeight:700}}>+</span> Add Milestone
            </button>
          </div>
          {/* Progress bar */}
          <ProgressTracker milestones={filteredMilestones} />
          {/* Roadmap horizontal bar */}
          <MilestoneRoadmapBar milestones={filteredMilestones} onMilestoneClick={handleMilestoneClick} />
        </section>
        {/* Milestone detail modal */}
        {showMilestoneModal && selectedMilestone && (
          <MilestoneModal
            milestone={selectedMilestone}
            onClose={() => setShowMilestoneModal(false)}
            onMarkComplete={handleMarkComplete}
          />
        )}
        {/* Add milestone modal */}
        {showAddModal && (
          <AddMilestoneModal
            onAdd={handleAddMilestone}
            onClose={() => setShowAddModal(false)}
          />
        )}
      </main>
    </div>
  );
}

export default App;
