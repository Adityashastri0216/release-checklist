import { useEffect, useState } from "react";
import "./App.css";

import ReleaseForm from "./components/ReleaseForm";
import ReleaseList from "./components/ReleaseList";

function App() {
const [releases, setReleases] = useState([]);
const [loading, setLoading] = useState(true);

  const loadReleases = async () => {
  setLoading(true);

  const res = await fetch("http://localhost:5000/api/releases");
  const data = await res.json();

  setReleases(data);

  setLoading(false);
};

  useEffect(() => {
    loadReleases();
  }, []);

  if (loading) {
  return <h2>Loading...</h2>;
}

  return (
    <div className="container">
      <h1>Release Checklist</h1>

      <ReleaseForm onCreated={loadReleases} />

      <ReleaseList
        releases={releases}
        refresh={loadReleases}
      />
    </div>
  );
}

export default App;