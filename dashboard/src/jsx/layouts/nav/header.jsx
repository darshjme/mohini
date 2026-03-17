import { useContext } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { IMAGES, SVGICON } from "../../constant/theme";
import { ThemeContext } from "../../../context/ThemeContext";
import fscreen from "fscreen";

function Header({ onNote }) {
	const { background, changeBackground } = useContext(ThemeContext);
	const handleThemeMode = () => {
		if (background.value === 'dark') {
			changeBackground({ value: "light", label: "Light" });
		} else {
			changeBackground({ value: "dark", label: "Dark" });
		}
	}
	const handleFullscreenToggle = () => {
		if (!fscreen.fullscreenElement) {
			fscreen.requestFullscreen(document.documentElement).catch(err => {
				console.error(`Error attempting to enable full-screen mode: ${err.message}`);
			});
		} else {
			fscreen.exitFullscreen();
		}
	};
	return (
		<>
			<div className="header">
				<div className="header-content">
					<nav className="navbar navbar-expand">
						<div className="collapse navbar-collapse justify-content-between">
							<div className="header-left">
								<ul className="navbar-nav header-left">
									<li className="nav-item d-flex align-items-center">
										<div className="input-group search-area">
											<span className="input-group-text pe-2"><Link to={"#"}><i className="flaticon-search-interface-symbol" /></Link></span>
											<input type="text" className="form-control ps-0" placeholder="Search anything" />
										</div>
									</li>
									<li className="nav-item dropdown notification_dropdown">
										<button className={`ic-theme-mode ${background.value === "dark" ? "active" : ""}`} onClick={() => handleThemeMode()} type="button">
											<span className="light">Light</span>
											<span className="dark">Dark</span>
										</button>
									</li>
								</ul>
							</div>
							<ul className="navbar-nav header-right">
								<Dropdown as="li" className="nav-item dropdown notification_dropdown me-3 c-pointer">
									<Dropdown.Toggle
										variant=""
										as="a"
										className="nav-link-2 text-black i-false"
										data-toggle="dropdown" aria-expanded="false"
									>
										{SVGICON.notification} Notification
									</Dropdown.Toggle>
									<Dropdown.Menu align="end" className="dropdown-menu dropdown-menu-end">
										<div id="DZ_W_Notification1" className="widget-media ic-scroll p-3"
											style={{ height: "380px" }}
										>
											<ul className="timeline">
												<li>
													<div class="timeline-panel">
														<div class="media me-2">
															<img alt="image" width="50" src={IMAGES.avatar1} />
														</div>
														<div class="media-body">
															<h6 class="mb-1">Dr sultads Send you Photo</h6>
															<small class="d-block">29 July 2020 - 02:26 PM</small>
														</div>
													</div>
												</li>
												<li>
													<div class="timeline-panel">
														<div class="media me-2 media-info">
															KG
														</div>
														<div class="media-body">
															<h6 class="mb-1">Resport created successfully</h6>
															<small class="d-block">29 July 2020 - 02:26 PM</small>
														</div>
													</div>
												</li>
												<li>
													<div class="timeline-panel">
														<div class="media me-2 media-success">
															<i class="fa fa-home"></i>
														</div>
														<div class="media-body">
															<h6 class="mb-1">Reminder : Treatment Time!</h6>
															<small class="d-block">29 July 2020 - 02:26 PM</small>
														</div>
													</div>
												</li>
												<li>
													<div class="timeline-panel">
														<div class="media me-2">
															<img alt="image" width="50" src={IMAGES.avatar1} />
														</div>
														<div class="media-body">
															<h6 class="mb-1">Dr sultads Send you Photo</h6>
															<small class="d-block">29 July 2020 - 02:26 PM</small>
														</div>
													</div>
												</li>
												<li>
													<div class="timeline-panel">
														<div class="media me-2 media-danger">
															KG
														</div>
														<div class="media-body">
															<h6 class="mb-1">Resport created successfully</h6>
															<small class="d-block">29 July 2020 - 02:26 PM</small>
														</div>
													</div>
												</li>
												<li>
													<div class="timeline-panel">
														<div class="media me-2 media-primary">
															<i class="fa fa-home"></i>
														</div>
														<div class="media-body">
															<h6 class="mb-1">Reminder : Treatment Time!</h6>
															<small class="d-block">29 July 2020 - 02:26 PM</small>
														</div>
													</div>
												</li>
											</ul>
										</div>
										<Link class="all-notification" to={"#"}>See all notifications <i
											class="ti-arrow-end"></i></Link>
									</Dropdown.Menu>
								</Dropdown>
								<li className="nav-item dropdown notification_dropdown">
									<Link className="nav-link dz-fullscreen" to={"#"} onClick={handleFullscreenToggle}> {SVGICON.fullscreen} </Link>
								</li>
								<Dropdown
									as="li"
									className="nav-item dropdown notification_dropdown"
								>
									<Dropdown.Toggle
										variant=""
										as="a"
										className="nav-link i-false"
										to={"#"}
										role="button"
										data-toggle="dropdown"
									>
										{SVGICON.settingbox}
										<span className="badge badge-success text-white">23</span>
									</Dropdown.Toggle>
									<Dropdown.Menu align="end" className="dropdown-menu dropdown-menu-end">
										<div id="DZ_W_TimeLine02" className="widget-timeline ic-scroll style-1  p-3 height370">
											<ul className="timeline">
												<li>
													<div className="timeline-badge primary"></div>
													<Link className="timeline-panel text-muted" to={"#"}>
														<span>10 minutes ago</span>
														<h6 className="mb-0">Youtube, a video-sharing website, goes live <strong
															className="text-primary">$500</strong>.</h6>
													</Link>
												</li>
												<li>
													<div className="timeline-badge info">
													</div>
													<Link className="timeline-panel text-muted" to={"#"}>
														<span>20 minutes ago</span>
														<h6 className="mb-0">New order placed <strong
															className="text-info">#XF-2356.</strong></h6>
														<p className="mb-0">Quisque a consequat ante Sit amet magna at
															volutapt...</p>
													</Link>
												</li>
												<li>
													<div className="timeline-badge danger">
													</div>
													<Link className="timeline-panel text-muted" to={"#"}>
														<span>30 minutes ago</span>
														<h6 className="mb-0">john just buy your product <strong
															className="text-warning">Sell $250</strong></h6>
													</Link>
												</li>
												<li>
													<div className="timeline-badge success">
													</div>
													<Link className="timeline-panel text-muted" to={"#"}>
														<span>15 minutes ago</span>
														<h6 className="mb-0">StumbleUpon is acquired by eBay. </h6>
													</Link>
												</li>
												<li>
													<div className="timeline-badge warning">
													</div>
													<Link className="timeline-panel text-muted" to={"#"}>
														<span>20 minutes ago</span>
														<h6 className="mb-0">Mashable, a news website and blog, goes live.</h6>
													</Link>
												</li>
												<li>
													<div className="timeline-badge dark">
													</div>
													<Link className="timeline-panel text-muted" to={"#"}>
														<span>20 minutes ago</span>
														<h6 className="mb-0">Mashable, a news website and blog, goes live.</h6>
													</Link>
												</li>
											</ul>
										</div>
									</Dropdown.Menu>
								</Dropdown>
								<Dropdown
									as="li"
									className="nav-item dropdown notification_dropdown "
								>
									<Dropdown.Toggle
										variant=""
										as="a"
										className="nav-link bell bell-link i-false c-pointer"
										onClick={() => onNote()}
									>
										{SVGICON.msgbox}
										<span className="badge text-white bg-secondary">27</span>
									</Dropdown.Toggle>
								</Dropdown>
								<li className="nav-item dropdown header-profile">
									<Link className="nav-link" to={"#"} role="button" data-bs-toggle="dropdown">
										<img src={IMAGES.user} width="20" alt="user" />
										<div className="header-info ms-3">
											<span className="fs-14 font-w600 mb-0">Franklin Jr.</span>
										</div>{SVGICON.threeline}
									</Link>
									<div className="profile-detail card">
										<div className="card-body p-0">
											<div className="d-flex profile-media justify-content-between align-items-center">
												<div className="d-flex align-items-center">
													<img src={IMAGES.kprofile} alt="img" />
													<div className="ms-3">
														<h4 className="mb-0">Franklin Jr. </h4>
														<p className="mb-0">demo@mail.com</p>
													</div>
												</div>
												<Link to="/edit-profile">
													<div className="icon-box"> {SVGICON.edit} </div>
												</Link>
											</div>
											<div className="media-box">
												<ul className="d-flex flex-colunm gap-2 flex-wrap">
													<li>
														<Link to="/app-profile">
															<div className="icon-box-lg"> {SVGICON.profile} <p> Profile </p> </div>
														</Link>
													</li>
													<li>
														<Link to="/message">
															<div className="icon-box-lg"> {SVGICON.msg} <p>Message</p> </div>
														</Link>
													</li>
													<li>
														<Link to="/note">
															<div className="icon-box-lg"> {SVGICON.taskboard} <p>Taskboard</p> </div>
														</Link>
													</li>
													<li>
														<Link to={"#"}>
															<div className="icon-box-lg"> {SVGICON.help} <p>Help</p> </div>
														</Link>
													</li>
													<li>
														<div className="icon-box-lg"> {SVGICON.setting} <p>Settings</p> </div>
													</li>
													<li>
														<div className="icon-box-lg">
															<Link to={"#"}>
																{SVGICON.security} <p>Security</p>
															</Link>
														</div>
													</li>
													<li>
														<div className="icon-box-lg"> {SVGICON.plan} <p>Plans</p> </div>
													</li>
													<li>
														<div className="icon-box-lg">
															<Link to={"#"}>
																{SVGICON.feedback} <p> Feedback </p>
															</Link>
														</div>
													</li>
													<li>
														<Link to="/page-login">
															<div className="icon-box-lg"> {SVGICON.logout} <p> Logout </p> </div>
														</Link>
													</li>
												</ul>
											</div>
										</div>
									</div>
								</li>
							</ul>
						</div>
					</nav>
				</div>
			</div>
		</>
	);
};
export default Header;
