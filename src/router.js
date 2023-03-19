const registerRoute = (app) => {
  app.get("/api/safe", async (req, res) => {
    return res.json({ msg: "safe" });
  });

  app.use("/api/pokemon/backend", require("./modules/pokemon"))
};

module.exports = {
  registerRoute,
};
