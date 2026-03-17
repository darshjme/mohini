import { Fragment } from "react";
import { IMAGES } from "../../constant/theme";

const ParticipantsData = [
    { image: <img src={IMAGES.avatar5} alt="logo" className="rounded-circle avatar avatar-sm" />, name: 'Karina Clark', number: '8' },
    { image: <img src={IMAGES.avatar6} alt="logo" className="rounded-circle avatar avatar-sm" />, name: 'Rober Doe', number: '6' },
    { image: <div className="avatar avatar-sm bg-info-light text-info rounded-circle d-flex align-items-center justify-content-center">N</div>, name: 'Neil Owen', number: '7' },
    { image: <img src={IMAGES.avatar6} alt="logo" className="rounded-circle avatar avatar-sm" />, name: 'Olivia Wild', number: '5' },
    { image: <img src={IMAGES.avatar6} alt="logo" className="rounded-circle avatar avatar-sm" />, name: 'Sean Bean', number: '3' },
    { image: <div className="avatar avatar-sm bg-info-light text-info rounded-circle d-flex align-items-center justify-content-center">S</div>, name: 'Rober Doe', number: '6' },
];


function NewContributorsCard() {
    return (
        <Fragment>
            {ParticipantsData.map((item, index) => (
                <div className="d-flex align-items-center py-2" key={index}>
                    <div className="d-inline-block position-relative">
                        {item.image}
                        {index === 2 ? null :
                            <span className="fa fa-circle text-success position-absolute bottom-0 end-0 fs-8"></span>
                        }
                    </div>
                    <div className="clearfix ms-3">
                        <h6 className="fs-13 mb-0 fw-semibold">{item.name}</h6>
                        <span className="fs-13">8 Pending & 97 Completed Tasks</span>
                    </div>
                    <div className="clearfix ms-auto">
                        <span className="badge badge-sm badge-light">{item.number}</span>
                    </div>
                </div>
            ))}
        </Fragment>
    )
}
export default NewContributorsCard;