const prisma = require("../prisma/client");

const defaultSteps = {
  "Code Freeze": false,
  "QA Testing": false,
  "Security Review": false,
  "Documentation": false,
  "Deployment": false,
  "Monitoring": false,
  "Post Release Check": false,
};

const calculateStatus = (steps) => {
  const values = Object.values(steps);

  if (values.every((v) => v === false)) return "planned";
  if (values.every((v) => v === true)) return "done";
  return "ongoing";
};

exports.getAllReleases = async () => {
  const releases = await prisma.release.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return releases.map((release) => ({
    ...release,
    status: calculateStatus(release.steps),
  }));
};

exports.createRelease = async (data) => {
  const release = await prisma.release.create({
    data: {
      name: data.name,
      dueDate: new Date(data.dueDate),
      additional: data.additional || "",
      steps: defaultSteps,
    },
  });

  return {
    ...release,
    status: "planned",
  };
};

exports.updateSteps = async (id, updatedSteps) => {
  const existing = await prisma.release.findUnique({
    where: { id: Number(id) },
  });

  if (!existing) {
    throw new Error("Release not found");
  }

  const mergedSteps = {
    ...existing.steps,
    ...updatedSteps,
  };

  const release = await prisma.release.update({
    where: { id: Number(id) },
    data: {
      steps: mergedSteps,
    },
  });

  return {
    ...release,
    status: calculateStatus(mergedSteps),
  };
};

exports.updateAdditional = async (id, additional) => {
  const release = await prisma.release.update({
    where: {
      id: Number(id),
    },
    data: {
      additional,
    },
  });

  return {
    ...release,
    status: calculateStatus(release.steps),
  };
};

exports.deleteRelease = async (id) => {
  await prisma.release.delete({
    where: {
      id: Number(id),
    },
  });

  return {
    message: "Release deleted successfully",
  };
};