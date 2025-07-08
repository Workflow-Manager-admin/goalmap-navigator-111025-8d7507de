import React, { useEffect, useRef, useState } from "react";

/**
 * Animated Progress Tracker for Roadmap Milestones.
 * PUBLIC_INTERFACE
 * @param {Array} milestones - Array of milestone objects with at least a 'status' property ('Completed' means done).
 */
function ProgressTracker({ milestones = [] }) {
  // Calculate percent complete (with safety checks)
  const total = milestones.length;
  const completed = milestones.filter(
    (m) => (m.status || "").toLowerCase() === "completed"
  ).length;
  const target = total === 0 ? 0 : Math.round((completed / total) * 100);

  // Animated progress state with color bump effect for transitions
  const [displayPercent, setDisplayPercent] = useState(target);
  const [displayCount, setDisplayCount] = useState(completed);
  const [bump, setBump] = useState(false);
  const animationRef = useRef();

  // Animate value change (percent and number) with smooth increments
  useEffect(() => {
    let start = displayPercent;
    let end = target;
    let startCount = displayCount;
    let endCount = completed;
    let duration = 650; // ms (slightly longer for smoothness)
    let startTime = null;

    // Animate: if % bar changes, accentuate fill with bump effect
    if (start !== end) setBump(true);

    // Cancel any running animation
    if (animationRef.current) cancelAnimationFrame(animationRef.current);

    function animate(ts) {
      if (!startTime) startTime = ts;
      const elapsed = ts - startTime;
      const ease = (t) =>
        t < 0.5
          ? 2 * t * t
          : -1 + (4 - 2 * t) * t; // Ease-in-out quadratic
      const t = Math.min(1, elapsed / duration);
      const eased = ease(t);

      setDisplayPercent(Math.round(start + (end - start) * eased));
      // Count animates as an integer (no overshoot)
      setDisplayCount(
        Math.round(startCount + (endCount - startCount) * eased)
      );

      if (t < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayPercent(end);
        setDisplayCount(endCount);
        setTimeout(() => setBump(false), 480);
      }
    }

    animationRef.current = requestAnimationFrame(animate);
    // Cleanup
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
    // eslint-disable-next-line
  }, [target, completed]);

  // Visual styles: modern, minimal, soft shadow, rounded bar, responsive
  return (
    <div
      className="progress-tracker-root"
      style={{
        width: "100%",
        maxWidth: 650,
        margin: "0 auto 17px auto",
        padding: "18px 22px 14px 22px",
        background: "var(--bg-main)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
        boxShadow: "var(--shadow-md)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          fontWeight: 700,
          fontSize: "1.15em",
          letterSpacing: ".01em",
          color: "var(--primary)",
          marginBottom: 2,
        }}
      >
        Roadmap Progress
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 14,
          marginTop: 2,
        }}
      >
        {/* Progress Bar with animated width */}
        <div
          style={{
            flex: 1,
            height: 18,
            background: "#f3f6fa",
            borderRadius: 11,
            overflow: "hidden",
            boxShadow: "0 1.5px 8px 0 rgba(23,43,99,.09)",
            position: "relative",
            transition: "background .19s",
            minWidth: 74,
          }}
        >
          <div
            className={
              "goal-progress-fill goal-progress-fill-animated" +
              (bump ? " progress-bump-anim" : "")
            }
            style={{
              width: `${displayPercent}%`,
              height: "100%",
              background:
                "linear-gradient(90deg, var(--primary) 55%, var(--accent) 100%)",
              borderRadius: 11,
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              transition: "width 0.56s cubic-bezier(0.4,0,0.2,1), box-shadow 0.22s cubic-bezier(.38,.6,.37,1.08)",
              minWidth: displayPercent < 8 ? 24 : 38,
              boxShadow: bump
                ? "0 2px 12px 0 rgba(33,85,230,0.13)"
                : displayPercent === 100
                ? "0 2px 10px 0 rgba(52,209,118,.09)"
                : undefined,
            }}
            aria-valuenow={displayPercent}
            aria-valuemax={100}
            aria-valuemin={0}
            role="progressbar"
          >
            {/* Animated percent label inside bar */}
            <span
              style={{
                fontWeight: 700,
                fontSize: "1.01em",
                color: "#fff",
                paddingRight: 13,
                textShadow: "0px 1.5px 8px rgba(21,118,240,0.10)",
                userSelect: "none",
                letterSpacing: ".02em",
              }}
            >
              {displayPercent}%
            </span>
          </div>
        </div>
        {/* Completion text, visible on large screens */}
        <span
          style={{
            fontSize: "0.97em",
            fontWeight: 500,
            color: "var(--primary)",
            minWidth: 90,
            textAlign: "right",
            userSelect: "none",
            letterSpacing: "0.01em",
            marginLeft: 2,
          }}
        >
          {displayCount} of {total} done
        </span>
      </div>
      {/* Responsive: On small screens, show count under the bar */}
      <div
        style={{
          display: "none",
          marginTop: 7,
          fontSize: "0.94em",
          color: "var(--primary)",
          fontWeight: 500,
        }}
        className="progress-tracker-completion-mobile"
      >
        {displayCount} of {total} milestones complete
      </div>
    </div>
  );
}

export default ProgressTracker;
