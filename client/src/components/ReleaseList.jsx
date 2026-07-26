import ReleaseCard from "./ReleaseCard";

export default function ReleaseList({ releases, refresh }) {

  if (releases.length === 0) {
    return (
      <div className="card">
        <h3>No Releases Yet</h3>
        <p>Create your first release.</p>
      </div>
    );
  }

  return (
    <>
      {releases.map((release) => (
        <ReleaseCard
          key={release.id}
          release={release}
          refresh={refresh}
        />
      ))}
    </>
  );
}