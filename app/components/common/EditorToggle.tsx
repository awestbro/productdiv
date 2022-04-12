import * as React from "react";

export function EditorToggle({ onClick }: { onClick: () => any }) {
  return (
    <div style={{ position: "fixed", bottom: 10, left: 10 }}>
      <button
        type="button"
        style={{
          color: "#f8f9fa",
          backgroundColor: "#6976ce",
          border: "1px solid white",
          padding: "0.375rem 0.75rem",
          fontSize: "1rem",
          borderRadius: "0.25rem",
        }}
        onClick={onClick}
      >
        PD
      </button>
    </div>
  );
}
