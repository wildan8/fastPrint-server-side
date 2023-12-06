// Import required libraries
import express from "express";
import cors from 'cors';
import indexRoute from "./routes/indexRoute.js";


const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());
app.use(indexRoute);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
