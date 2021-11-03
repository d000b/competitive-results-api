const express = require("express");
const app = express();
const PORT = 8080;

app.use(express.json());

require("./routes/routes")(app);

app.listen(PORT, () => {
    console.log("Listen at port 8080");
})

