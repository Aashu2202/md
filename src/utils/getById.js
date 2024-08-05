async function getDetailbyId(req, res, model) {
    try {
        const allDbUsers = await model.findById(req.params.id);
        return res.json(allDbUsers);
    } catch (error) {
        console.error("Error getting details:", error);
        return res.status(500).json({ error: "Error getting details" });
    }
}

module.exports = { getDetailbyId };