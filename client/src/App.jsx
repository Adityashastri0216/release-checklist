import { useEffect, useState } from "react";
import "./App.css";
import api from "./services/api";
import ReleaseForm from "./components/ReleaseForm";
import ReleaseList from "./components/ReleaseList";

function App() {
const [releases, setReleases] = useState([]);
const [loading, setLoading] = useState(true);

  const loadReleases = async () => {
  try {
    setLoading(true);

    const res = await api.get("/releases");

    setReleases(res.data);
  } catch (error) {
    console.error("Failed to load releases:", error);
  } finally {
    setLoading(false);
  }
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