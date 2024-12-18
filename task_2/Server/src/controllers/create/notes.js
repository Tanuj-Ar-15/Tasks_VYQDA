let { app, models } = require("../../app")
let { notes } = models



app.post("/create/note", async (req, res) => {
    let { cardHead, cardBody, time } = req.body


    try {
        let newNote = await notes.create({
            cardBody,
            cardHead,
            time
        })

        if (newNote) {
            res.json({
                created: true,
                note: newNote
            })
        }
    } catch (error) {
        console.log(error);

    }



})