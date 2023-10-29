// In src/index.js
const express = require("express");
// *** ADD ***
const v1Router = require("./v1/routes");

const app = express();
const PORT = process.env.PORT || 3005;

// *** REMOVE ***
app.get("/", (req, res) => {
    res.send("<h2>It's Working!</h2>");
});

// *** ADD ***
app.use("/api/v1", v1Router);

app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`);
});