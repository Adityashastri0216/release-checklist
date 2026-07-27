import { useState } from "react";
import api from "../services/api";

export default function ReleaseForm({ onCreated }) {
  const [form, setForm] = useState({
    name: "",
    dueDate: "",
    additional: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.name.trim() === "") {
  alert("Release name is required");
  return;
}

if (form.dueDate === "") {
  alert("Due date is required");
  return;
}

    await api.post("/releases", form);

setForm({
  name: "",
  dueDate: "",
  additional: "",
});

onCreated();

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Create Release</h2>

      <input
        type="text"
        placeholder="Release Name"
        name="name"
        value={form.name}
        onChange={handleChange}
        required
      />

      <input
        type="datetime-local"
        name="dueDate"
        value={form.dueDate}
        onChange={handleChange}
        required
      />

      <textarea
        placeholder="Additional Info"
        name="additional"
        value={form.additional}
        onChange={handleChange}
      />

      <button>Create</button>
    </form>
  );
}