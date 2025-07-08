import React from "react";

/**
 * Minimal GoalModal for build error fixing. Displays only the required basic modal layout.
 * PUBLIC_INTERFACE
 */
function GoalModal({ type, goal, onClose, onCreate, onEdit, onDelete }) {
  return (
    <div className="modal-overlay" tabIndex={-1} aria-modal="true" role="dialog" style={{ zIndex: 2500 }}>
      <div className="modal-content" style={{ maxWidth: 400 }}>
        <h2 style={{ marginTop: 0 }}>{type === "edit" ? "Edit Goal" : "New Goal"}</h2>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontWeight: 500 }}>{goal ? goal.title : "Goal Title"}</div>
          <div style={{ color: "#787a8b" }}>{goal ? goal.description : "Goal Description"}</div>
        </div>
        <div className="modal-actions" style={{ marginTop: 24, gap: 12 }}>
          <button type="button" className="btn-secondary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default GoalModal;
