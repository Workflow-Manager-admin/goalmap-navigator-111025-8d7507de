import React, { useState } from "react";
import "./App.css";

// PUBLIC_INTERFACE
function App() {
  // State for modal dialogs
  const [modal, setModal] = useState(null);
  const [editingGoal, setEditingGoal] = useState(null);
  // State for goals (simple demo structure)
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

  // Modal openers
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
        {/* Prominent "My Goal Roadmap" section with visual progress bar */}
        <section className="roadmap-section" style={{paddingTop: 0}}>
          <MyGoalRoadmap goals={goals} />
          <RoadmapGoals
            goals={goals}
            onEdit={openEditModal}
            onDelete={handleDelete}
          />
        </section>
      </main>
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

// Sidebar navigation component
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
 * Prominent "My Goal Roadmap" section with a visual path/progress bar
 */
function MyGoalRoadmap({ goals }) {
  // Calculate total completions and steps
  // (Flatten all root goals and children into one level for linear progress)
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

// Roadmap goals visualization (simple tree)
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

// Modal for goal creation/editing
function GoalModal({ type, goal, onClose, onCreate, onEdit, onDelete }) {
  const isEdit = type === "edit";
  const [title, setTitle] = useState(goal ? goal.title : "");
  const [description, setDescription] = useState(goal ? goal.description : "");
  const [status, setStatus] = useState(goal ? goal.status : "Planned");
  const [progress, setProgress] = useState(goal ? goal.progress : 0);

  // PUBLIC_INTERFACE
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...(goal ? { id: goal.id, children: goal.children || [] } : {}),
      title: title.trim(),
      description: description.trim(),
      status,
      progress: Number(progress),
    };
    if (isEdit) {
      onEdit(data);
    } else {
      onCreate(data);
    }
  };

  // PUBLIC_INTERFACE
  const handleDeleteClick = () => {
    if (goal) {
      onDelete(goal.id);
    }
  };

  return (
    <div className="modal-overlay" tabIndex={-1} onClick={onClose} aria-modal="true" role="dialog">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{isEdit ? "Edit Goal" : "Create Goal"}</h2>
        <form className="modal-form" onSubmit={handleSubmit}>
          <label>
            Title
            <input
              autoFocus
              type="text"
              required
              value={title}
              maxLength={60}
              onChange={(e) => setTitle(e.target.value)}
              className="input"
              placeholder="Goal Title"
            />
          </label>
          <label>
            Description
            <textarea
              value={description}
              rows={3}
              maxLength={160}
              onChange={(e) => setDescription(e.target.value)}
              className="input"
              placeholder="Describe this goal…"
            />
          </label>
          <label>
            Status
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="input">
              <option>Planned</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </label>
          <label>
            Progress &nbsp;
            <input
              type="number"
              min={0}
              max={100}
              value={progress}
              onChange={(e) => setProgress(e.target.value)}
              className="input"
              style={{ width: 70, display: "inline-block" }}
            />
            <span style={{ marginLeft: 5, fontSize: 14, color: "#888" }}>%</span>
          </label>
          <div className="modal-actions">
            <button type="submit" className="btn-accent">
              {isEdit ? "Save" : "Create"}
            </button>
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            {isEdit && (
              <button
                type="button"
                className="btn-danger"
                onClick={handleDeleteClick}
                style={{ marginLeft: "auto" }}
              >
                Delete
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
