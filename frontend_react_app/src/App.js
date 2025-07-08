import React, { useState } from "react";
import "./App.css";
import MilestoneModal from "./MilestoneModal";
import GoalModal from "./GoalModal";
import ProgressTracker from "./ProgressTracker";

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

/**
 * The main application, includes dashboard and roadmap/milestone modal logic.
 * PUBLIC_INTERFACE
 */
function App() {
  // Milestones for roadmap are now stored in root state
  const [milestones, setMilestones] = useState([
    {
      id: 1001,
      iconKey: "javascript",
      title: "Learn JavaScript",
      description: "Master JavaScript fundamentals.",
      status: "Completed",
    },
    {
      id: 1002,
      iconKey: "project",
      title: "Build My First Project",
      description: "Create and launch your first web project.",
      status: "In Progress",
    },
    {
      id: 1003,
      iconKey: "internship",
      title: "Get Internship",
      description: "Apply and interview for tech internships.",
      status: "Pending",
    },
  ]);
  const [hoveredMilestone, setHoveredMilestone] = useState(null);
  const [selectedMilestone, setSelectedMilestone] = useState(null);

  // Modal state for milestone (independent of popover)
  const [milestoneModal, setMilestoneModal] = useState(null);

  // PUBLIC_INTERFACE
  const handleMarkMilestoneComplete = (milestoneId) => {
    setMilestones((prev) =>
      prev.map((m) =>
        m.id === milestoneId
          ? { ...m, status: "Completed" }
          : m
      )
    );
    // If this is the open modal, also update modal to show completed instantly
    if (milestoneModal && milestoneModal.id === milestoneId) {
      setMilestoneModal((modal) => ({ ...modal, status: "Completed" }));
    }
  };

  // Goal roadmap state is unchanged (for MyGoalRoadmap)
  const [modal, setModal] = useState(null);
  const [editingGoal, setEditingGoal] = useState(null);
  const [goals, setGoals] = useState([
    {
      id: 1,
      title: "Launch MVP",
      description: "Start by launching the minimum viable product.",
      status: "In Progress",
      progress: 60,
      children: [
        {
          id: 2,
          title: "Prototype UI",
          description: "Create main screens and interactive flows.",
          status: "Completed",
          progress: 100,
        },
        {
          id: 3,
          title: "Backend API",
          description: "Develop backend endpoints and DB schema.",
          status: "In Progress",
          progress: 75,
        },
      ],
    },
    {
      id: 4,
      title: "Team Onboarding",
      description: "Bring team up to speed with project tools.",
      status: "Planned",
      progress: 0,
      children: [],
    },
  ]);

  // Modal openers (existing)
  // PUBLIC_INTERFACE
  const openCreateModal = () => {
    setModal("create");
    setEditingGoal(null);
  };
  // PUBLIC_INTERFACE
  const openEditModal = (goal) => {
    setModal("edit");
    setEditingGoal(goal);
  };
  // PUBLIC_INTERFACE
  const closeModal = () => {
    setModal(null);
    setEditingGoal(null);
  };

  // PUBLIC_INTERFACE
  const handleCreate = (goal) => {
    setGoals([...goals, { ...goal, id: Date.now(), children: [] }]);
    closeModal();
  };

  // PUBLIC_INTERFACE
  const handleEdit = (goal) => {
    setGoals((prev) =>
      prev.map((g) => (g.id === goal.id ? { ...goal } : g))
    );
    closeModal();
  };

  // PUBLIC_INTERFACE
  const handleDelete = (goalId) => {
    setGoals((prev) => prev.filter((g) => g.id !== goalId));
    closeModal();
  };

  return (
    <div className="dashboard-root">
      <Sidebar onCreate={openCreateModal} />
      <main className="dashboard-main">
        <Header />
        {/* My Goal Roadmap -- add interactive milestone roadmap at the top */}
        <section className="roadmap-section" style={{ paddingTop: 0 }}>
          {/* Progress tracker above roadmap bar */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              margin: "28px 0 6px 0",
              width: "100%",
              maxWidth: 870,
              boxSizing: "border-box",
            }}
          >
            <ProgressTracker milestones={milestones} />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              margin: "0px 0 20px 0",
              width: "100%",
              maxWidth: 870,
              boxSizing: "border-box",
            }}
          >
            <MilestoneRoadmapBar
              milestones={milestones}
              hoveredMilestone={hoveredMilestone}
              setHoveredMilestone={setHoveredMilestone}
              selectedMilestone={selectedMilestone}
              setSelectedMilestone={setSelectedMilestone}
              onMilestoneClick={(m) => setMilestoneModal(m)}
            />
          </div>
          <div style={{ width: "100%", maxWidth: 900 }}>
            <MyGoalRoadmap goals={goals} />
          </div>
          <div style={{ width: "100%", maxWidth: 900 }}>
            <RoadmapGoals
              goals={goals}
              onEdit={openEditModal}
              onDelete={handleDelete}
            />
          </div>
        </section>
      </main>
      {milestoneModal && (
        <MilestoneModal
          milestone={
            milestones.find((m) => m.id === milestoneModal.id) || milestoneModal
          }
          onClose={() => setMilestoneModal(null)}
          onMarkComplete={handleMarkMilestoneComplete}
        />
      )}
      {modal && (
        <GoalModal
          type={modal}
          goal={editingGoal}
          onClose={closeModal}
          onCreate={handleCreate}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

// Sidebar navigation component (unchanged)
function Sidebar({ onCreate }) {
  return (
    <aside className="dashboard-sidebar">
      <div className="sidebar-header">
        <span className="logo-circle">G</span>
        <h2 className="sidebar-title">Goalmap</h2>
      </div>
      <nav className="sidebar-nav">
        <button className="sidebar-link active">Roadmap</button>
        <button className="sidebar-link" disabled>
          Progress
        </button>
        <button className="sidebar-link" disabled>
          Teams
        </button>
        <button className="sidebar-link" disabled>
          Settings
        </button>
      </nav>
      <div className="sidebar-footer">
        <button className="btn-accent" onClick={onCreate}>
          + New Goal
        </button>
      </div>
    </aside>
  );
}

/**
 * Interactive Roadmap Bar with Milestones (modern, minimal, responsive)
 * PUBLIC_INTERFACE
 */
function MilestoneRoadmapBar({
  milestones,
  hoveredMilestone,
  setHoveredMilestone,
  selectedMilestone,
  setSelectedMilestone,
  onMilestoneClick,
}) {
  // Helper: get color by status (lowercase)
  function getMilestoneColors(status) {
    switch ((status || "").toLowerCase()) {
      case "completed":
        return {
          bg: "#e3fcec",
          border: "#09b36a",
          iconBg: "#09b36a",
          circleBg: "#09b36a",
          text: "#09b36a",
          gradient: "linear-gradient(135deg,#22bb7f 65%,#a3f7c4 100%)",
        };
      case "in progress":
        return {
          bg: "#fff5e0",
          border: "#ffc632",
          iconBg: "#ffc632",
          circleBg: "#ffc632",
          text: "#FFB400",
          gradient: "linear-gradient(135deg,#ffe073 55%,#ffc632 100%)",
        };
      case "pending":
        return {
          bg: "#ececf3",
          border: "#b8bec5",
          iconBg: "#b8bec5",
          circleBg: "#b8bec5",
          text: "#888b94",
          gradient: "linear-gradient(135deg,#c4c8d5 70%,#e3e4ef 100%)",
        };
      default:
        return {
          bg: "#ececf3",
          border: "#b8bec5",
          iconBg: "#b8bec5",
          circleBg: "#b8bec5",
          text: "#888b94",
          gradient: "linear-gradient(135deg,#c4c8d5 70%,#e3e4ef 100%)",
        };
    }
  }

  return (
    <div
      className="milestone-roadmap-bar"
      style={{
        width: "100%",
        background: "var(--bg-main)",
        borderRadius: "var(--radius)",
        boxShadow: "var(--shadow-sm)",
        border: "1px solid var(--border)",
        padding: "24px 18px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 18,
        transition: "box-shadow .18s",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 620,
          minHeight: 55,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "98%",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
            minHeight: 0,
          }}
        >
          {/* Horizontal progress line */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 34,
              left: 0,
              right: 0,
              height: 5,
              borderRadius: 4,
              background: "var(--border)",
              opacity: 0.18,
              zIndex: 0,
            }}
          />
          {milestones.map((m, idx) => {
            const statusLc = (m.status || "").toLowerCase();
            const isCompleted = statusLc === "completed";
            const isInProgress = statusLc === "in progress";
            const isPending = statusLc === "pending";
            const colors = getMilestoneColors(m.status);
            const isCurrent =
              (hoveredMilestone && hoveredMilestone.id === m.id) ||
              (selectedMilestone && selectedMilestone.id === m.id);
            return (
              <div
                key={m.id}
                tabIndex={0}
                className="milestone-dot"
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  flex: 1,
                  minWidth: 0,
                  zIndex: 2,
                  cursor: "pointer",
                  outline: isCurrent ? `2.1px solid var(--primary)` : "none",
                  background: "none",
                }}
                onMouseEnter={() => setHoveredMilestone(m)}
                onMouseLeave={() => setHoveredMilestone(null)}
                onFocus={() => setHoveredMilestone(m)}
                onBlur={() => setHoveredMilestone(null)}
                onClick={(e) => {
                  if (onMilestoneClick) onMilestoneClick(m);
                }}
                aria-label={m.title}
                title={m.title}
              >
                {/* Milestone colored circle */}
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background: colors.bg,
                    border: isCurrent
                      ? "2.7px solid var(--primary)"
                      : `2px solid ${colors.border}`,
                    boxShadow: isCurrent
                      ? "var(--shadow-md)"
                      : "0 1.5px 4px 0 rgba(21,28,55,.11)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 3,
                    transition: "border .18s, box-shadow .23s, background .23s",
                    position: "relative",
                  }}
                >
                  <span style={{display: "block"}}>
                    {milestoneIcons[m.iconKey] || milestoneIcons.default}
                  </span>
                  {isCompleted && (
                    <span
                      style={{
                        position: "absolute",
                        bottom: 5,
                        right: 5,
                        width: 15,
                        height: 15,
                        borderRadius: "50%",
                        background: "#fff",
                        border: "none",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 1px 6px 0 rgba(122,214,163,0.14)",
                      }}
                    >
                      <svg width="12" height="12" fill="none" viewBox="0 0 16 16">
                        <circle cx="8" cy="8" r="7" fill="#09b36a" />
                        <path d="M5.05 8.55l1.53 1.6 3.1-3.4" stroke="#fff" strokeWidth="1.1" strokeLinecap="round" />
                      </svg>
                    </span>
                  )}
                </div>
                <div
                  className={`milestone-title${isCurrent ? " milestone-title-active" : ""}`}
                  style={{
                    fontSize: 14.7,
                    fontWeight: 600,
                    color: isCurrent
                      ? "var(--primary)"
                      : colors.text,
                    marginTop: 2,
                    textAlign: "center",
                    maxWidth: 101,
                    transition: "color .18s",
                    cursor: "pointer",
                    padding: 0,
                    userSelect: "none",
                  }}
                >
                  {m.title}
                </div>
                {/* Inline milestone popover */}
                {isCurrent && (
                  <div
                    className="milestone-popover"
                    style={{
                      position: "absolute",
                      left: "50%",
                      top: -70,
                      transform: "translateX(-50%)",
                      minWidth: 180,
                      maxWidth: 240,
                      background: "#fff",
                      color: "#1a1a1a",
                      boxShadow: "var(--shadow-md)",
                      borderRadius: 12,
                      padding: "14px 18px 12px 18px",
                      zIndex: 5,
                      fontWeight: 500,
                      fontSize: 14.2,
                      textAlign: "center",
                      pointerEvents: "none",
                      opacity: 1,
                      filter: "drop-shadow(0 2px 12px rgba(40,64,179,0.11))",
                    }}
                  >
                    <div style={{ fontWeight: 700, fontSize: 15.6, marginBottom: 3 }}>
                      {m.title}
                    </div>
                    <div style={{ color: "#555", fontWeight: 400 }}>{m.description}</div>
                    <div style={{
                      marginTop: 9,
                      display: "flex",
                      justifyContent: "center",
                      gap: 7,
                    }}>
                      <span className="status-badge"
                        style={{
                          background: colors.bg,
                          color: colors.text,
                          border: `1px solid ${colors.border}`,
                          fontSize: "0.93em",
                          fontWeight: 700,
                        }}>
                        {m.status}
                      </span>
                    </div>
                  </div>
                )}
                {/* Connector line between milestones */}
                {idx < milestones.length - 1 && (
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      top: 24,
                      left: "48px",
                      height: 5,
                      width: "calc(100% - 48px)",
                      borderRadius: 4,
                      background:
                        isCompleted
                          ? "#e3fcec"
                          : isInProgress
                          ? "#fff5e0"
                          : "#ececf3",
                      opacity: 1,
                      zIndex: 1,
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/**
 * Prominent "My Goal Roadmap" section with a visual path/progress bar
 */
function MyGoalRoadmap({ goals }) {
  // Calculate total completions and steps
  const allGoals = goals.flatMap(g => [g, ...(g.children || [])]);
  const total = allGoals.length;
  const completed = allGoals.filter(g => g.status && g.status.toLowerCase() === "completed").length;
  const percent = total > 0 ? Math.round(allGoals.reduce((acc, g) => acc + (g.progress || 0), 0) / total) : 0;

  return (
    <div className="my-goal-roadmap" style={{
      background: "var(--bg-main)",
      borderRadius: "var(--radius)",
      boxShadow: "var(--shadow-md)",
      border: "1px solid var(--border)",
      padding: "32px 38px 28px 38px",
      margin: "30px auto 44px auto",
      maxWidth: 870,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      position: "relative"
    }}>
      <div style={{
        fontSize: "1.3em",
        fontWeight: 700,
        color: "var(--primary)",
        margin: "0 0 13px 0",
        letterSpacing: "0.01em"
      }}>
        My Goal Roadmap
      </div>
      <div style={{
        color: "var(--text-secondary)",
        fontSize: "1.04em",
        marginBottom: "18px",
        textAlign: "center"
      }}>
        Track your overall progress at a glance. Complete steps to achieve your goals!
      </div>
      <RoadmapPathBar total={total} completed={completed} percent={percent} allGoals={allGoals} />
    </div>
  );
}

// Minimal visual linear roadmap progress bar (existing)
function RoadmapPathBar({ total, completed, percent, allGoals }) {
  // Show up to 8 steps, use dots for more
  const showGoals = total <= 8 ? allGoals : allGoals.slice(0, 7);
  const hasEllipsis = total > 8;

  return (
    <div className="roadmap-path-bar" style={{
      width: "100%",
      maxWidth: 720,
      minHeight: 76,
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      {/* Progress path */}
      <div style={{
        width: "100%",
        padding: "18px 6px 0 6px",
        display: "flex",
        alignItems: "center",
        position: "relative",
        gap: 0
      }}>
        {showGoals.map((g, i) => (
          <div key={g.id} style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            minWidth: 0
          }}>
            <div style={{
              background: g.status && g.status.toLowerCase() === "completed"
                ? "linear-gradient(90deg,var(--primary),var(--accent))"
                : "var(--border)",
              width: 22,
              height: 22,
              borderRadius: "50%",
              boxShadow: g.status && g.status.toLowerCase() === "completed"
                ? "0 2px 4px 0 rgba(45,90,210,.14)" : "0 1px 2px 0 rgba(21,28,55,.09)",
              border: g.status && g.status.toLowerCase() === "completed"
                ? "2px solid var(--primary)" : "1.5px solid var(--border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 600,
              fontSize: 13,
              color: g.status && g.status.toLowerCase() === "completed"
                ? "#fff"
                : "var(--text-secondary)",
              transition: "background .2s"
            }}>
              {g.status && g.status.toLowerCase() === "completed" ? <span>✓</span> : i + 1}
            </div>
            {i < showGoals.length - 1 && (
              <div style={{
                flex: 1,
                height: 5,
                margin: "0 0.4vw",
                borderRadius: 3,
                background: showGoals[i].status && showGoals[i].status.toLowerCase() === "completed"
                  ? "linear-gradient(90deg,var(--primary) 50%,var(--accent) 90%)"
                  : "var(--border)",
                opacity: 0.93,
                boxShadow: "0 0px 2px 0 rgba(20,32,65,0.04)"
              }}/>
            )}
            {/* Ellipsis for extra steps */}
            {hasEllipsis && i === showGoals.length - 1 &&
              <span style={{
                margin: "0 9px", color: "var(--secondary)", fontWeight: 700, fontSize: 21, lineHeight: "32px"
              }}>…</span>
            }
          </div>
        ))}
      </div>
      {/* Progress/Count bar & label */}
      <div style={{
        marginTop: 16, width: "96%"
      }}>
        <div className="goal-progress-bar" style={{margin: 0, height: 20}}>
          <div
            className="goal-progress-fill"
            style={{
              width: `${percent}%`,
              minWidth: percent === 0 ? 20 : 32,
              background: "linear-gradient(90deg,var(--primary),var(--accent))",
              fontSize: "1.02em"
            }}>
            <span className="goal-progress-label">{percent}%</span>
          </div>
        </div>
        <div style={{
          textAlign: "right",
          marginTop: 4,
          fontSize: ".99em",
          fontWeight: 500,
          color: "var(--primary)"
        }}>
          {completed} of {total} steps complete
        </div>
      </div>
    </div>
  );
}

// Dashboard header
function Header() {
  return (
    <header className="dashboard-header">
      <h1 className="dashboard-title">
        <span role="img" aria-label="flag">
          🚩
        </span>{" "}
        My Goals Roadmap
      </h1>
    </header>
  );
}

// Roadmap goals visualization (tree)
function RoadmapGoals({ goals, onEdit, onDelete }) {
  return (
    <div className="roadmap-tree">
      {goals.length === 0 ? (
        <div className="empty-state">
          <p>No goals yet. Click "New Goal" to get started.</p>
        </div>
      ) : (
        goals.map((goal) => (
          <GoalCard
            key={goal.id}
            goal={goal}
            isRoot
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
}

// Goal card (can be root or child)
function GoalCard({ goal, onEdit, onDelete, isRoot = false }) {
  return (
    <div className={`goal-card ${isRoot ? "root-goal" : ""}`}>
      <div className="goal-card-header">
        <h3>{goal.title}</h3>
        <div className="goal-actions">
          <button
            className="goal-action goal-edit"
            title="Edit"
            onClick={() => onEdit(goal)}
          >
            ✏️
          </button>
          <button
            className="goal-action goal-delete"
            title="Delete"
            onClick={() => onDelete(goal.id)}
          >
            🗑️
          </button>
        </div>
      </div>
      <div className="goal-card-body">
        <p>{goal.description}</p>
        <div className="goal-progress-bar">
          <div
            className="goal-progress-fill"
            style={{
              width: `${goal.progress || 0}%`,
            }}
          >
            <span className="goal-progress-label">
              {goal.progress || 0}%
            </span>
          </div>
        </div>
        <div className="goal-status">
          <span className={`status-badge status-${(goal.status || "").toLowerCase().replace(/\s/g, "")}`}>
            {goal.status || "Planned"}
          </span>
        </div>
      </div>
      {goal.children && goal.children.length > 0 && (
        <div className="goal-children">
          {goal.children.map((child) => (
            <GoalCard
              key={child.id}
              goal={child}
              onEdit={onEdit}
              onDelete={onDelete}
              isRoot={false}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
