import { Link } from "react-router-dom";

function PageTitle({ motherMenu, activeMenu }) {
    return (
        <>
            <div className="row page-titles">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to={"#"}>{motherMenu}</Link></li>
                    <li className="breadcrumb-item active"><Link to={"#"}>{activeMenu}</Link></li>
                </ol>
            </div>
        </>
    );
};

export default PageTitle;
