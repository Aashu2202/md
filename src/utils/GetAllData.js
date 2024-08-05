async function getAllDetails(req, res, model) {
  try {
    const allDbUsers = await model.find({});
    return res.json(allDbUsers);
  } catch (error) {
    console.error("Error getting details:", error);
    return res.status(500).json({ error: "Error getting details" });
  }
}

module.exports = { getAllDetails };
