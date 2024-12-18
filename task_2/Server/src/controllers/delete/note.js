const { where } = require("sequelize")
let { app, models } = require("../../app")
let { notes } = models




app.get("/destroy/note", async (req, res) => {
    try {
        let { noteId } = req.query

        let destroyNote = await notes.destroy({
            where: {
                id: noteId
            }
        })
        
        if (destroyNote) {
            res.json({
                deleted: true,
                destroyNote
            })
        }
    } catch (error) {

    }

})