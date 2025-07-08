import React from "react";

/**
 * Minimal, modern modal for displaying milestone details.
 * PUBLIC_INTERFACE
 */
function MilestoneModal({ milestone, onClose }) {
  if (!milestone) return null;

  // Demo: we could add more properties in the future (e.g. target date)
  // Here we fake a target date based on status for demo.
  let targetDate = null;
  if (milestone.status === "Completed") targetDate = "2023-05-10";
  else if (milestone.status === "In Progress") targetDate = "2023-12-15";
  else if (milestone.status === "Planned") targetDate = "2024-06-30";

  return (
    <div
      className="modal-overlay"
      tabIndex={-1}
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      style={{ zIndex: 3000 }}
    >
      <div
        className="modal-content"
        onClick={e => e.stopPropagation()}
        style={{ maxWidth: 420, width: "92vw", minWidth: 0, paddingTop: 28, paddingBottom: 22 }}
      >
        <h2 style={{ marginTop: 0, marginBottom: 18, color: "var(--primary)" }}>
          Milestone Details
        </h2>
        <div style={{ marginBottom: 19 }}>
          <div style={{ fontSize: "1.08em", fontWeight: 600, color: "#222" }}>
            {milestone.title}
          </div>
        </div>
        <div style={{ marginBottom: 12 }}>
          <span style={{ color: "#787a8b", fontSize: ".98em", fontWeight: 500 }}>Description:</span>
          <div style={{ color: "#40465b", marginTop: 2 }}>
            {milestone.description}
          </div>
        </div>
        <div style={{ marginBottom: 12 }}>
          <span style={{ color: "#787a8b", fontSize: ".98em", fontWeight: 500 }}>Target Date:</span>
          <div style={{ color: "#222", marginTop: 2 }}>
            {targetDate ? targetDate : <span style={{color:"#b8b8bb"}}>—</span>}
          </div>
        </div>
        <div style={{marginBottom: 22}}>
          <span style={{ color: "#787a8b", fontSize: ".98em", fontWeight: 500 }}>Status:</span>
          <span className={`status-badge status-${(milestone.status || "").toLowerCase().replace(/\s/g, "")}`} style={{ marginLeft: 13 }}>
            {milestone.status}
          </span>
        </div>
        <div className="modal-actions" style={{marginTop: 26, justifyContent: "flex-end"}}>
          <button type="button" className="btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default MilestoneModal;
