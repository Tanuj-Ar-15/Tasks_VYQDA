import { useEffect, useState } from "react"
import Cards from "./notes"
import Swal from "sweetalert2"

export default function Inputbox() {



    let [cardsData, setcardsData] = useState([])
    let [inpData, setinpData] = useState({
        cardHead: "",
        cardBody: ""
    })




    const fetchNotes = async () => {
        try {
            let fetchNotes = await fetch("http://localhost:2400/retrieve/notes")
            let result = await fetchNotes.json()

            setcardsData(result.allNotes)
        

        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        fetchNotes()
    }, [])

    function handleInput(e) {
        setinpData(prevdata => {
            return {
                ...prevdata,
                [e.target.name]: e.target.value
            }
        })
    }
    const handleKey = async (e) => {
        if (e.key === "Enter") {
            let err = [];
            for (let i in inpData) {
                if (!inpData[i]) {

                    if (i == "cardHead") {
                        err.push("Enter Note Head")
                    }
                    if (i == "cardBody") {
                        err.push("Enter Note")
                    }
                }
            }

            if (err.length) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    html: err.join("</br>"),

                });

            } else {

                const formData = new FormData();
                for (const key in inpData) {
                    formData.append(key, inpData[key]);

                }

                const currentTime = new Date().toLocaleString()

                formData.append("time", currentTime)

                let data = await fetch("http://localhost:2400/create/note", {
                    method: "post",
                    body: formData
                })

                let result = await data.json()

                if (result.created) {
                    setcardsData(prevCards => [result.note, ...prevCards,]);
                    setinpData({
                        cardHead: "",
                        cardBody: ""
                    });
                }

            }
        }
    };




const handleDelete = async(noteId)=> {
try {
    let deleteNote = await fetch("http://localhost:2400/destroy/note?noteId=" + noteId)

    let result = await deleteNote.json()
    if(result.deleted){


        setcardsData((prevData) => prevData.filter((note) => note.id !== noteId));
    }
} catch (error) {
    console.log(error);
    
}

}



    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 mt-3 d-flex justify-content-center align-item-center ">
                        <div className="box">
                            <input type="text" name="cardHead" value={inpData.cardHead} onChange={handleInput} onKeyUp={handleKey} placeholder="Enter Note Head..." className="note-input" />
                            <input type="text" name="cardBody" value={inpData.cardBody} onChange={handleInput} onKeyUp={handleKey} placeholder="Take a Note..." className="note-input mt-4 " />
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row">
                    {

                        cardsData.map((card) => {
                            return (


                                <Cards cardkey={card.id} cardHead={card.cardHead} cardBody={card.cardBody} time={card.time} handleDelete={handleDelete} />



                            )
                        })
                    }

                </div>
            </div>
        </>
    )
}