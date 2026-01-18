import express from "express";
import router from "./routes/productRoutes.js";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/todos", router); 

app.listen(3000, () => console.log("Server chạy tại port 3000"));
