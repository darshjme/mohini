import { contactdataa } from "../constant/alldata"  
function contactdata({gap}) {
    return (
        <>
            <div className="card-body">
                <div className={`row ${gap}`}>
                    {contactdataa.map((data, i) => (
                        <div className="col-xl-4 col-sm-4 col-6" key={i}>
                            <div className={`avatar-card text-center border-dashed rounded px-2 py-3 ${data.class}`}>
                                {data.image}
                                <h6 className="mb-0">{data.name}</h6>
                                <span className="fs-12">{data.email}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
export default contactdata