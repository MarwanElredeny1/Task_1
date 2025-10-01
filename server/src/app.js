import express from "express";
import morgan from "morgan";
import perkRoutes from "./routes/perks.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

// Root route
/*app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Perks API",
    endpoints: {
      health: "/api/health",
      perks: {
        getAllPerks: "GET /api/perks/all",
        filterPerks: "GET /api/perks?title=example",
        getPerk: "GET /api/perks/:id",
        createPerk: "POST /api/perks",
        updatePerk: "PATCH /api/perks/:id",
        deletePerk: "DELETE /api/perks/:id",
      },
    },
  });
});*/

app.get("/api/health", (req, res) => res.json({ ok: true }));
app.use("/api/perks", perkRoutes);

// Not found
app.use((req, res, next) => {
  res.status(404).json({ message: "Not Found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res
    .status(err.status || 500)
    .json({ message: err.message || "Server Error" });
});

export default app;
