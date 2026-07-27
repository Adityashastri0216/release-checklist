import { useState } from "react";
import api from "../services/api";

export default function ReleaseCard({ release, refresh }) {
  const [additional, setAdditional] = useState(release.additional);

  const updateStep = async (step) => {
    await api.patch(`/releases/${release.id}/steps`, {
  steps: {
    [step]: !release.steps[step],
  },
});

    refresh();
  };

  const saveAdditional = async () => {
   await api.patch(`/releases/${release.id}`, {
  additional,
});

    refresh();
  };

  const deleteRelease = async () => {
  if (!window.confirm("Delete this release?")) return;

  await api.delete(`/releases/${release.id}`);

  refresh();
};

const total = Object.keys(release.steps).length;
const completed = Object.values(release.steps).filter(Boolean).length;

  return (
    <div className="card">
      <h3>{release.name}</h3>

       <div className={`status ${release.status}`}>
            {release.status.toUpperCase()}
       </div>

      <p>
        <strong>Progress:</strong> {completed}/{total}
     </p>

      <p>Due: {new Date(release.dueDate).toLocaleDateString()}</p>

      {Object.keys(release.steps).map((step) => (
        <label key={step}>
          <input
            type="checkbox"
            checked={release.steps[step]}
            onChange={() => updateStep(step)}
            disabled={release.status === "done"}
        />

          {step}
        </label>
      ))}

      <textarea
        value={additional}
        onChange={(e) => setAdditional(e.target.value)}
        disabled={release.status === "done"}
      />

      <button
  onClick={saveAdditional}
  disabled={release.status === "done"}
>
  Save Additional Info
</button>

      <button className="delete" onClick={deleteRelease}>
    Delete Release
</button>

    </div>
  );
}