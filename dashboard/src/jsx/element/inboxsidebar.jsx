import { Link } from "react-router-dom"

function InboxSidebar() {
    return (
        <>

            <div className=" ps-4 pe-3 py-4 ic-scroll height800">
                <div className="mb-3 mt-4 mt-sm-0 email-left-box">
                    <div className="p-0">
                        <Link to="/email-compose" className="btn btn-primary btn-sm btn-block">Compose</Link>
                    </div>
                    <div className="mail-list">
                        <p className="text-primary font-w500 mb-2"> MAILBOXES </p>
                        <Link to="/email-inbox" className="list-group-item active"><i className="fa-regular fa-envelope align-middle" />Inbox
                            <span className="badge badge-purple badge-sm float-end">2</span>
                        </Link>
                        <Link to={"#"} className="list-group-item"><i className="fa-regular fa-paper-plane align-middle" />Sent</Link>
                        <Link to={"#"} className="list-group-item"><i className="fa-regular fa-star align-middle" />Favorite </Link>
                        <Link to={"#"} className="list-group-item"><i className="fa-regular fa-file align-middle" />Draft</Link>
                        <Link to={"#"} className="list-group-item ">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.4425 10.0575L10.065 15.435C9.92569 15.5745 9.76026 15.6851 9.57816 15.7606C9.39606 15.8361 9.20087 15.8749 9.00375 15.8749C8.80663 15.8749 8.61144 15.8361 8.42934 15.7606C8.24724 15.6851 8.08181 15.5745 7.9425 15.435L1.5 9V1.5H9L15.4425 7.9425C15.7219 8.22354 15.8787 8.60372 15.8787 9C15.8787 9.39628 15.7219 9.77646 15.4425 10.0575Z" stroke="#666666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                <path d="M5.25 5.25H5.268" stroke="#666666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>Important</Link>
                        <Link to={"#"} className="list-group-item"><i className="fa-regular fa-clock align-middle" /> Scheduled</Link>
                        <Link to={"#"} className="list-group-item">
                            <svg width="15" height="15" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.5 8.25L11 13.75L16.5 8.25" stroke="#666666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg> Move
                        </Link>
                    </div>
                    <div className="mail-list">
                        <p className="text-dark mb-2 font-w500"> Filter </p>
                        <Link to="/email-inbox" className="list-group-item"><i className="fa-regular fa-star" /> Starred </Link>
                        <Link to={"#"} className="list-group-item ">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.4425 10.0575L10.065 15.435C9.92569 15.5745 9.76026 15.6851 9.57816 15.7606C9.39606 15.8361 9.20087 15.8749 9.00375 15.8749C8.80663 15.8749 8.61144 15.8361 8.42934 15.7606C8.24724 15.6851 8.08181 15.5745 7.9425 15.435L1.5 9V1.5H9L15.4425 7.9425C15.7219 8.22354 15.8787 8.60372 15.8787 9C15.8787 9.39628 15.7219 9.77646 15.4425 10.0575Z" stroke="#666666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                <path d="M5.25 5.25H5.268" stroke="#666666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>Important</Link>
                    </div>
                    <div className="mail-list">
                        <p className="text-success mb-2 font-w500"> LABELS </p>
                        <Link to={"#"} className="list-group-item ">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.4425 10.0575L10.065 15.435C9.92569 15.5745 9.76026 15.6851 9.57816 15.7606C9.39606 15.8361 9.20087 15.8749 9.00375 15.8749C8.80663 15.8749 8.61144 15.8361 8.42934 15.7606C8.24724 15.6851 8.08181 15.5745 7.9425 15.435L1.5 9V1.5H9L15.4425 7.9425C15.7219 8.22354 15.8787 8.60372 15.8787 9C15.8787 9.39628 15.7219 9.77646 15.4425 10.0575Z" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> </path>
                                <path d="M5.25 5.25H5.268" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg> Personal </Link>
                        <Link to={"#"} className="list-group-item ">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.4425 10.0575L10.065 15.435C9.92569 15.5745 9.76026 15.6851 9.57816 15.7606C9.39606 15.8361 9.20087 15.8749 9.00375 15.8749C8.80663 15.8749 8.61144 15.8361 8.42934 15.7606C8.24724 15.6851 8.08181 15.5745 7.9425 15.435L1.5 9V1.5H9L15.4425 7.9425C15.7219 8.22354 15.8787 8.60372 15.8787 9C15.8787 9.39628 15.7219 9.77646 15.4425 10.0575Z" stroke="var(--secondary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> </path>
                                <path d="M5.25 5.25H5.268" stroke="var(--secondary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg> Work </Link>

                        <Link to={"#"} className="list-group-item ">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.4425 10.0575L10.065 15.435C9.92569 15.5745 9.76026 15.6851 9.57816 15.7606C9.39606 15.8361 9.20087 15.8749 9.00375 15.8749C8.80663 15.8749 8.61144 15.8361 8.42934 15.7606C8.24724 15.6851 8.08181 15.5745 7.9425 15.435L1.5 9V1.5H9L15.4425 7.9425C15.7219 8.22354 15.8787 8.60372 15.8787 9C15.8787 9.39628 15.7219 9.77646 15.4425 10.0575Z" stroke="#09BD3C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> </path>
                                <path d="M5.25 5.25H5.268" stroke="#09BD3C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg> Accounts </Link>
                    </div>
                </div>
            </div>

        </>
    )
}
export default InboxSidebar
