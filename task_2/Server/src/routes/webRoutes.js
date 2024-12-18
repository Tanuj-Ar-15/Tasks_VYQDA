let { app, models } = require("../app")
let { notes } = models



app.get("/retrieve/notes", async (req, res) => {

    try {
        let allNotes = await notes.findAll({
            order: [
                ['createdAt', 'DESC'] 
              ]
        })

        if (allNotes) {
            res.json({
                retrieve: true,
                allNotes
            })
        }

    } catch (error) {

    }

})