let { app } = require("./app")
let requireDir = require("require-dir")
requireDir("controllers", { recurse: true })
require("./routes/webRoutes")
app.listen(2400, () => {
    console.log("server is running on port 2400");
})