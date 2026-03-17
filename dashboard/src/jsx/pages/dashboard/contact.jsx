import { useState } from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { SVGICON } from "../../constant/theme";
import { contactcarddata } from "../../constant/alldata";

function Contact() {
	const [show, setShow] = useState(false);
	const [id, setId] = useState(null);
	const handleClick = (id) => {
		setId(id);
	};
	return (
		<>
			<div className="d-flex justify-content-between align-items-center flex-wrap">
				<div className="input-group contacts-search mb-4">
					<input type="text" className="form-control" placeholder="Search here..." />
					<span className="input-group-text"><Link to={"#"}><i className="flaticon-search-interface-symbol" /></Link></span>
				</div>
				<div className="mb-4">
					<Link to={"#"} className="btn btn-primary btn-sm" onClick={() => setShow(true)}>+ New Contact</Link>
				</div>
			</div> 
			<div className="row">
				<div className="col-xl-12">
					<div className="row">
						{contactcarddata.map((data, i) => (
							<div className="col-xl-3 col-xxl-4 col-md-6 col-sm-6 items" key={i}>
								<div className="card contact-bx item-content">
									<div className="card-body user-profile">
										<div className="d-flex align-items-center">
											<div className="image-bx">
												<img src={data.image} alt="" />
												<span className="active"></span>
											</div>
											<div className="ms-3 text-start">
												<h4 className="fs-16 font-w600 mb-0"><Link to="/app-profile">{data.name}</Link></h4>
												<p className="mb-2">@lincolndonin</p>
												<div className={`contact-footer ${id === data.id ? 'show' : ''}`} onClick={() => handleClick(data.id)}>
													<Link to={"#"}>View Profile</Link>
													<ul>
														<li><Link to={"#"}> {SVGICON.call} </Link></li>
														<li><Link to={"#"}> {SVGICON.videocall} </Link></li>
														<li><Link to={"#"}> {SVGICON.massage} </Link></li>
													</ul>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
					<div className="d-flex align-items-center justify-content-sm-between justify-content-center flex-wrap mb-2">
						<div className="mb-sm-0 mb-3">
							<p className="mb-0 text-black">Showing 5 of 102 Data</p>
						</div>
						<nav>
							<ul className="pagination pagination-circle mb-0">
								<li className="page-item page-indicator"><Link className="page-link" to={"#"}> <i className="la la-angle-left" /></Link></li>
								<li className="page-item active"><Link className="page-link" to={"#"}>1</Link> </li>
								<li className="page-item"><Link className="page-link" to={"#"}>2</Link></li>
								<li className="page-item"><Link className="page-link" to={"#"}>3</Link></li>
								<li className="page-item"><Link className="page-link" to={"#"}>4</Link></li>
								<li className="page-item page-indicator"><Link className="page-link" to={"#"}> <i className="la la-angle-right" /></Link></li>
							</ul>
						</nav>
					</div>
				</div>
			</div>
			{/* Modal */}
			<Modal show={show} className="fade" centered>
				<div className="modal-header">
					<h1 className="modal-title fs-5">Project title</h1>
					<button type="button" className="btn-close" onClick={() => setShow(false)}></button>
				</div>
				<div className="modal-body">
					<form>
						<div className="row">
							<div className="col-xl-12">
								<div className="mb-3">
									<label htmlFor="exampleFormControlInput1" className="form-label">Project Id</label>
									<input type="text" className="form-control" id="exampleFormControlInput1" placeholder="#P-000441425" />
								</div>
							</div>
							<div className="col-xl-12">
								<div className="mb-3">
									<label htmlFor="exampleFormControlInput2" className="form-label">Client Name</label>
									<input type="text" className="form-control" id="exampleFormControlInput2" placeholder="James Jr." />
								</div>
							</div>
						</div>
					</form>
				</div>
				<div className="modal-footer">
					<button type="button" className="btn btn-danger light" onClick={() => setShow(false)}>Close</button>
					<button type="button" className="btn btn-primary">Save changes</button>
				</div>
			</Modal>
		</>
	)
}
export default Contact;