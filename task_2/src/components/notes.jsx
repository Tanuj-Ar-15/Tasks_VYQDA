export default function Cards({ cardHead, cardBody, time, cardkey , handleDelete }) {
    return (
        <>
       
                    <div class="col-sm-6 mb-3 mb-sm-0  mt-3 note-card " key={cardkey} >
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title text-capitalize ">{cardHead}</h5>
                                <p class="card-text">
                                    {cardBody}
                                </p>
                                <div className="end-box d-flex justify-content-between ">
                                <span  >{time}</span>
                                <span onClick={()=> {handleDelete(cardkey)}} className="delete-btn"  ><i class="fa-solid fa-trash"></i></span>
                                </div>
                              
                            </div>
                        </div>
                    </div>

         
        </>
    )
}