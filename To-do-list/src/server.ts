import express from "express";
import todoRoutes from "./routes/productRoutes";

const app = express();
app.use(express.json());
app.use("/api/todos", todoRoutes); // explain this line of code

app.listen(3000, () => console.log("Server chạy tại port 3000"));
