const app = require("./app");
require("dotenv").config();
const port = process.env.PORT;
require("../config/DBConnection");

app.listen(port, () => {
    console.log(`app is runnit http://localhost:${port}`);
})