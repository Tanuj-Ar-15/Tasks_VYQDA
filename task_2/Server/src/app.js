let express = require("express")
let app = express()
let os = require("os")
let fileUpload = require("express-fileupload")
let cors = require("cors")

let models= require("./models")

app.use((req, res, next) => {

    req.body = {
        ...req.body
    };
    +next()

})

app.use(cors({
    origin: "*",
}))

app.use(fileUpload({
    preserveExtension: true,
    parseNested: true,
    tempFileDir: os.tmpdir(),
    preservePath: true
}))

module.exports ={app , models}

