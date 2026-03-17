import { SVGICON } from '../../constant/theme';
import { useState } from 'react';

const MainContent = (props) => {
    const [show, setShow] = useState(true);
    return (
        <>
            <div className="alert alert-dismissible ai-header-alert fade show mb-4" style={{ display: show ? "block" : "none" }}>
                {props.detail}
                <button type="button" className="btn-close" onClick={() => setShow(false)}> {SVGICON.closeredcircle} </button>
            </div>
            {props.subtitle &&
                <p> {props.subtitle} </p>
            }
        </>
    );
};

export default MainContent;