import express from "express";
import bodyParser from "body-parser";
import todosRoutes from './v1/routes/todos.js';

const app = express();
const PORT = process.env.PORT || 3005;
app.use(bodyParser.json());

app.use('/todos', todosRoutes)
app.get("/", (req, res) => res.send("Welcome to the Users API!"));
app.all("*", (req, res) => res.send("You've tried reaching a route that doesn't exist."));

app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`);
});