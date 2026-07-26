require("dotenv").config();

const express = require("express");
const cors = require("cors");

const releaseRoutes = require("./routes/releaseRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Release Checklist API Running 🚀");
});

app.use("/api/releases", releaseRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});