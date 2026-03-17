import { Link } from "react-router-dom";
import { IMAGES, SVGICON } from "../../constant/theme";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Dropdown, Nav, Tab } from "react-bootstrap";
import { countrylistprogressbar, hometabledata, swipershirtdata } from "../../constant/alldata";
import { useState } from "react";
import Contactdata from "../../element/contactdata";
import WeeklySalesBarChart from "../../components/dashboard/WeeklySalesBarChart";
import HandleOrderChart from "../../components/dashboard/handleordrchar";
import HandleMarketShare from "../../components/dashboard/handlemarketshare";
import ProgressBarChart from "../../components/dashboard/progressbarchart";
import BalanceChart from "../../components/dashboard/balancechart";
import ChartBarRunning from "../../components/dashboard/chartbarrunning";
import ChartBarRunning2 from "../../components/dashboard/chartbarrunning2";
import ChartBarRunning3 from "../../components/dashboard/chartbarrunning3";
import ChartBarRunning4 from "../../components/dashboard/chartbarrunning4";

const CommanSection = () =>{
    const chackboxFun = (type) => {
        setTimeout(() => {
            const motherChackBox = document.querySelector(".home-check");
            const chackbox = document.querySelectorAll(".home-check1");
            for (let i = 0; i < chackbox.length; i++) {
                const element = chackbox[i];
                if (type === "all") {
                    if (motherChackBox.checked) {
                        element.checked = true;
                    } else {
                        element.checked = false;
                    }
                } else {
                    if (!element.checked) {
                        motherChackBox.checked = false;
                        break;
                    } else {
                        motherChackBox.checked = true;
                    }
                }
            }
        }, 100);
    };
    const [data, setData] = useState([...hometabledata]);
    const [sortConfig, setSortConfig] = useState({ key: 'workstation', direction: 'ascending' });
    
    const sortData = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        const sortedData = [...data].sort((a, b) => {
            if (a[key] < b[key]) {
                return direction === 'ascending' ? -1 : 1;
            }
            if (a[key] > b[key]) {
                return direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });
        setData(sortedData);
        setSortConfig({ key, direction });
    };
    return(
        <>
            <div className="page-head">
				<div className="row">
					<div className="col-sm-6 mb-sm-4 mb-3">
						<h3 className="mb-0">Good Morning, Franklin Jr.</h3>
						<p className="mb-0">Here’s what’s happening with your store today</p>
					</div>
					<div className="col-sm-6 mb-4 text-sm-end">
						<Link to={"#"} className="btn btn-outline-secondary">Add Task</Link>
						<Link to={"#"} className="btn btn-primary ms-2">New Project</Link>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col-xl-9">
					<div className="row">
						<div className="col-xl-3 col-lg-6">
							<div className="card ic-chart-card">
								<div className="card-header d-block border-0 pb-0">
									<div className="d-flex justify-content-between">
										<h6 className="mb-0">Weekly Sales</h6>
										<span className="badge badge-sm badge-success light">+2.7%</span>
									</div>
									<span className="data-value">$92k</span>
								</div>
								<div className="card-body p-0">
									<div id="handleWeeklySales" className="chart-offset">
										<WeeklySalesBarChart />
									</div>
								</div>
							</div>
						</div>
						<div className="col-xl-3 col-lg-6">
							<div className="card ic-chart-card">
								<div className="card-header d-block border-0">
									<div className="d-flex justify-content-between">
										<h6 className="mb-0">Total Order</h6>
										<span className="badge badge-sm badge-info light">+7.2%</span>
									</div>
									<span className="data-value">$34.2k</span>
								</div>
								<div className="card-body p-0 pb-3">
									<div id="handleOrderChart">
										<HandleOrderChart />
									</div>
								</div>
							</div>
						</div>
						<div className="col-xl-3 col-lg-6">
							<div className="card ic-chart-card">
								<div className="card-header d-block border-0 pb-0">
									<div className="d-flex justify-content-between">
										<h6 className="mb-0">Market Share</h6>
										<span className="badge badge-sm badge-success light">80%</span>
									</div>
									<span className="data-value">20M</span>
								</div>
								<div className="card-body d-flex align-items-center justify-content-between py-2 pe-1">
									<div className="clearfix">
										<div className="d-flex align-items-center mb-2">
											{SVGICON.starblue}
											<span className="text-dark fs-13">Mobile</span>
										</div>
										<div className="d-flex align-items-center mb-2">
											{SVGICON.stargreen}
											<span className="text-dark fs-13">Laptop</span>
										</div>
										<div className="d-flex align-items-center mb-2">
											{SVGICON.stargrey}
											<span className="text-dark fs-13">Cloths</span>
										</div>
									</div>
									<div id="handleMarketShare">
										<HandleMarketShare />
									</div>
								</div>
							</div>
						</div>
						<div className="col-xl-3 col-lg-6">
							<div className="card ic-chart-card">
								<div className="card-header d-block border-0 pb-0">
									<div className="d-flex justify-content-between">
										<h6 className="mb-0">New Customer</h6>
										<span className="badge badge-sm badge-success light">15%</span>
									</div>
									<span className="data-value">1.2K</span>
								</div>
								<div className="card-footer border-0 mt-auto">
									<h6>Today Customer</h6>
									<ul className="avtar-list">
										<li><img className="avatar avatar-circle borderd" src={IMAGES.avtar1} /></li>
										<li><img className="avatar avatar-circle borderd" src={IMAGES.avtar2} /></li>
										<li><img className="avatar avatar-circle borderd" src={IMAGES.avtar3} /></li>
										<li><img className="avatar avatar-circle borderd" src={IMAGES.avtar4} /></li>
										<li><img className="avatar avatar-circle borderd" src={IMAGES.avtar5} /></li>
										<li><img className="avatar avatar-circle borderd" src={IMAGES.avtar6} /></li>
										<li> <div className="avatar-label avatar-light avatar-circle">+4K</div> </li>
									</ul>
								</div>
							</div>
						</div>
						<div className="col-xl-5">
							<div className="card">
								<div className="card-header border-0 pb-0">
									<h5>People Contact</h5>
									<form className="card-search">
										<div className="input-group search-area style-1 wow">
											<span className="input-group-text">
												<Link to={"#"} className="m-0">
													<i className="flaticon-search-interface-symbol" />
												</Link>
											</span>
											<input type="text" className="form-control" placeholder="Search" />
										</div>
										<button type="button" className="btn btn-primary btn-sm">
											<i className="fa-solid fa-plus" />
										</button>
									</form>
								</div>
								<Contactdata  gap="g-2"/>
							</div>
						</div>
						<div className="col-xl-3 col-md-6">
							<div className="card">
								<div className="card-body mb-0">
									<div id="redial">
										<ProgressBarChart />
									</div>
									<div className="redia-date text-center">
										<h4>My Progress</h4>
										<p className="mb-0">Lorem ipsum dolor sit amet, consectetur</p>
									</div>
								</div>
								<div className="card-footer text-center border-0 pt-0">
									<Link to={"#"} className="btn btn-primary">More Details</Link>
								</div>
							</div>
						</div>
						<div className="col-xl-4 col-md-6">
							<div className="card blance">
								<div className="card-header align-items-baseline border-0 pb-0">
									<div>
										<h5 className="mb-0">Your Balance</h5>
										<h4 className="mb-0">$25,217k</h4>
									</div>
									<p className="mb-0 fs-14 ms-auto"><span className="text-success">+2.7% </span>than last week </p>
								</div>
								<div className="card-body pt-0">
									<div id="blanceChart">
										<BalanceChart />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="col-xl-3">
					<div className="card saller">
						<div className="card-header border-0 d-block text-white pb-0">
							<h4 className="text-white mb-0">Top Sellers</h4>
							<span>Users from all channels</span>
						</div>
						<div className="card-body overflow-hidden">
							<div className="seller-slider">
								<Swiper className="swiper mySwiper swiper-lr"
									spaceBetween={15}
									slidesPerView={1.5}
									breakpoints={{
										360: {
											slidesPerView: 1.5,
											spaceBetween: 20
										},
										768: {
											slidesPerView: 2.5,
											spaceBetween: 40
										},
										1200: {
											slidesPerView: 1.5,
											spaceBetween: 20
										},
									}}
								>
									{swipershirtdata.slice(1, 5).map((data, i) => (
										<SwiperSlide key={i}>
											<div className="card">
												<div className="card-body product">
													<img src={data.image} alt="img" />
													<div className="product-imfo">
														<div className="d-flex justify-content-between">
															<span className="text-danger">up to 79% off</span>
															<h6 className="font-w600">$80</h6>
														</div>
														<div className="d-flex justify-content-between">
															<h6 className="font-w600">Block Tiered Dress.</h6>
															<span><del>$95</del></span>
														</div>
													</div>
												</div>
											</div>
										</SwiperSlide>
									))}
								</Swiper>
							</div>
							<div className="product-details">
								<h4>Your Finances, safe and Secure</h4>
								<p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. </p>
								<div className="d-flex align-items-center">
									<ul className="avtar-list">
										<li><img className="avatar avatar-circle borderd" src={IMAGES.avtar1} alt="" /></li>
										<li><img className="avatar avatar-circle borderd" src={IMAGES.avtar2} alt="" /></li>
										<li><img className="avatar avatar-circle borderd" src={IMAGES.avtar3} alt="" /></li>
										<li><img className="avatar avatar-circle borderd" src={IMAGES.avtar4} alt="" /></li>
										<li><img className="avatar avatar-circle borderd" src={IMAGES.avtar5} alt="" /></li>
										<li><img className="avatar avatar-circle borderd" src={IMAGES.avtar6} alt="" /></li>
										<li> <div className="avatar-label avatar-light avatar-circle">+4K</div> </li>
									</ul>
									<div className="ms-3">
										<h4 className="mb-0 ">15k+</h4>
										<span>Happy Clients</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="col-xl-6">
					<Tab.Container defaultActiveKey="week">
						<div className="card overflow-hidden">
							<div className="card-header border-0 pb-0 flex-wrap">
								<div className="blance-media">
									<h5 className="mb-0">Sales Revenues</h5>
									<h4 className="mb-0">$25,217k <span className="badge badge-sm badge-success light">+2.7%</span></h4>
								</div>
								<Nav className="nav nav-pills mix-chart-tab" defaultActiveKey="week" >
									<Nav.Item className="nav-item">
										<Nav.Link className="nav-link" eventKey="week" > Week</Nav.Link>
									</Nav.Item>
									<Nav.Item className="nav-item">
										<Nav.Link className="nav-link" eventKey="month"> Month</Nav.Link>
									</Nav.Item>
									<Nav.Item className="nav-item">
										<Nav.Link className="nav-link" eventKey="year"> Year</Nav.Link>
									</Nav.Item>
									<Nav.Item className="nav-item">
										<Nav.Link className="nav-link" eventKey="all"> All</Nav.Link>
									</Nav.Item>
								</Nav>
							</div>
							<div className="card-body p-0">
								<Tab.Content>
									<Tab.Pane eventKey="week">
										<div id="chartBarRunning" className="pt-0">
											<ChartBarRunning />
										</div>
									</Tab.Pane>
									<Tab.Pane eventKey="month">
										<div id="chartBarRunning" className="pt-0">
											<ChartBarRunning2 />
										</div>
									</Tab.Pane>
									<Tab.Pane eventKey="year">
										<div id="chartBarRunning" className="pt-0">
											<ChartBarRunning3 />
										</div>
									</Tab.Pane>
									<Tab.Pane eventKey="all">
										<div id="chartBarRunning" className="pt-0">
											<ChartBarRunning4 />
										</div>
									</Tab.Pane>
								</Tab.Content>
								<div className="ttl-project">
									<div className="pr-data">
										<h5>12,721</h5>
										<span>Number of Projects</span>
									</div>
									<div className="pr-data">
										<h5 className="text-primary">721</h5>
										<span>Active Projects</span>
									</div>
									<div className="pr-data">
										<h5>$2,50,523</h5>
										<span>Revenue</span>
									</div>
									<div className="pr-data">
										<h5 className="text-success">12,275h</h5>
										<span>Working Hours</span>
									</div>
								</div>
							</div>
						</div>
					</Tab.Container>
				</div>
				<div className="col-xl-6">
					<div className="card">
						<div className="card-header flex-wrap">
							<h5 className="mb-0">Transaction Details</h5>
							<div className="d-flex align-items-center justify-content-between transaction flex-wrap">
								<div className="input-group search-area style-1">
									<span className="input-group-text"><Link to={"#"} className="m-0"><i className="flaticon-search-interface-symbol" /></Link></span>
									<input type="text" className="form-control" placeholder="Search" />
								</div>
								<Link to={"#"} className="btn"> {SVGICON.tablesort} Sort By </Link>
								<Link to={"#"} className="btn"> {SVGICON.tablefilter} Filter </Link>
							</div>
						</div>
						<div className="card-body pb-2">
							<div className="table-responsive">
								<div className="dataTables_wrapper no-footer">
									<table id="transaction-tbl" className="table transaction-tbl ItemsCheckboxSec dataTable no-footer">
										<thead className="border-self">
											<tr>
												<th className="sorting c-pointer" onClick={() => sortData('id')}>
													<div className="form-check custom-checkbox">
														<input type="checkbox" className="form-check-input home-check" id="checkAll" onClick={() => chackboxFun("all")} />
														<label className="form-check-label" htmlFor="checkAll"></label>
													</div>
													{" "}<span>ID</span>
												</th>
												<th className="sorting c-pointer" onClick={() => sortData('date')}>Date</th>
												<th className="sorting c-pointer" onClick={() => sortData('client')}>Client</th>
												<th className="sorting c-pointer" onClick={() => sortData('payment')}>Payment</th>
												<th className="sorting c-pointer" onClick={() => sortData('status')}>Status</th>
												<th className="sorting c-pointer" onClick={() => sortData('action')}>Action</th>
											</tr>
										</thead>
										<tbody>
											{data.map((data, index) => (
												<tr key={index}>
													<td className="sorting_1">
														<div className="form-check custom-checkbox">
															<input type="checkbox" className="form-check-input home-check1" required onClick={() => chackboxFun()} />
															<label className="form-check-label" htmlFor="customCheckBox3"></label>
														</div>
														{" "}<span>{data.id}</span>
													</td>
													<td> <p className="mb-0 ms-2">18 Feb 2025</p> </td>
													<td> <span>{data.client}</span> </td>
													<td> {data.payment} </td>
													<td className="pe-0"> {data.status} </td>
													<td>
														<Dropdown className="dropdown c-pointer ms-2" align="end">
															<Dropdown.Toggle as="div" className="btn-link i-false custome-d">
																{SVGICON.tableaction}
															</Dropdown.Toggle>
															<Dropdown.Menu className="dropdown-menu dropdown-menu-end">
																<Dropdown.Item href="#" className="dropdown-item">Delete</Dropdown.Item>
																<Dropdown.Item href="#" className="dropdown-item">Edit</Dropdown.Item>
															</Dropdown.Menu>
														</Dropdown>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="col-xl-6">
					<div className="card">
						<div className="card-header border-dashed border-top-0 border-end-0 border-start-0 flex-wrap">
							<h5 className="mb-0">Best Selling Products</h5>
							<div className="d-flex align-items-center justify-content-between transaction">
								<Link to={"#"} className="btn"> {SVGICON.tablesort} Sort By </Link>
								<Link to={"#"} className="btn"> {SVGICON.tablefilter} Filter </Link>
							</div>
						</div>
						<div className="card-body overflow-hidden">
							<div className="best-selling-slider">
								<Swiper className="swiper mySwiper1 swiper-lr"
									spaceBetween={15}
									slidesPerView={3.5}
									breakpoints={{
										360: {
											slidesPerView: 1.5,
											spaceBetween: 20
										},
										768: {
											slidesPerView: 3.5,
											spaceBetween: 20
										},
									}}
								>
									{swipershirtdata.map((data, i) => (
										<SwiperSlide key={i}>
											<div className="card">
												<div className="card-body product">
													<img src={data.image} alt="img" />
													<div className="product-imfo">
														<div className="d-flex justify-content-between">
															<span className="text-danger">up to 79% off</span>
															<h6 className="font-w600">$80</h6>
														</div>
														<div className="d-flex justify-content-between">
															<h6 className="font-w600">Block Tiered Dress.</h6>
															<span><del>$95</del></span>
														</div>
													</div>
												</div>
											</div>
										</SwiperSlide>
									))}
								</Swiper>
							</div>
						</div>
					</div>
				</div>
				<div className="col-xl-6 flag">
					<div className="card overflow-hidden">
						<div className="card-header border-0">
							<h5 className="mb-0">Active users</h5>
						</div>
						<div className="card-body pe-0 ">
							<div className="row">
								<div className="col-xl-8 active-map-main">
									<div id="world-map" className="active-map mb-2">{SVGICON.worldmap}</div>
								</div>
								<div className="col-xl-4 active-country dz-scroll">
									<div>
										{countrylistprogressbar.map((data, index) => (
											<div className="country-list mt-1" key={index}>
												<img src={data.img} alt="" />
												<div className="progress-box mt-0">
													<div className="d-flex justify-content-between">
														<p className="mb-0 c-name">{data.name}</p>
														<p className="mb-0">{data.width}</p>
													</div>
													<div className="progress">
														<div className="progress-bar bg-primary" style={{ width: data.width, height: '5px', borderRadius: '4px' }} ></div>
													</div>
												</div>
											</div>
										))}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
        </>
    )
}
export default CommanSection;