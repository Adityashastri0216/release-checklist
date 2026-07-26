const service = require("../services/releaseService");

exports.getAll = async (req, res) => {
  try {
    const releases = await service.getAllReleases();
    res.json(releases);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    if (!req.body.name) {
  return res.status(400).json({
    message: "Release name is required",
  });
}

if (!req.body.dueDate) {
  return res.status(400).json({
    message: "Due date is required",
  });
}
    const release = await service.createRelease(req.body);
    res.status(201).json(release);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateSteps = async (req, res) => {
  try {
    const release = await service.updateSteps(
      req.params.id,
      req.body.steps
    );

    res.json(release);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateAdditional = async (req, res) => {
  try {
    const release = await service.updateAdditional(
      req.params.id,
      req.body.additional
    );

    res.json(release);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const response = await service.deleteRelease(req.params.id);
    res.json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};