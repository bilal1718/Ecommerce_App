import express from "express";
import cors from "cors"

const app = express();
app.use(cors())
app.use(express.json());

// Mount authentication routes
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  testDbConnection(); // Test database connection on server start
});
