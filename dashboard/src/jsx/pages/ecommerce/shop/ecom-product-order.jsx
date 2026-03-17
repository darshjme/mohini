import { Fragment } from "react";
import PageTitle from "../../../layouts/PageTitle";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { productordertabeldata } from "../../../constant/alldata";

function ProductOrder() {
    const chackboxFun = (type) => {
        setTimeout(() => {
            const motherChackBox = document.querySelector(".product_order_single");
            const chackbox = document.querySelectorAll(".product_order");
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
    return (
        <Fragment>
            <PageTitle activeMenu="Product Order" motherMenu="Shop" />
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body " style={{ padding: "1.25rem" }}>
                            <div className="table-responsive">
                                <table className="table table-sm mb-0 table-responsive-lg ">
                                    <thead>
                                        <tr>
                                            <th className="align-middle">
                                                <div className="form-check custom-checkbox">
                                                    <input type="checkbox" onClick={() => chackboxFun("all")} className="form-check-input  product_order_single" id="checkAll" />
                                                    <label className="form-check-label" htmlFor="checkAll" />
                                                </div>
                                            </th>
                                            <th className="align-middle">Order</th>
                                            <th className="align-middle pr-7">Date</th>
                                            <th className="align-middle minw200">Ship To</th>
                                            <th className="align-middle text-end">Status</th>
                                            <th className="align-middle text-end">Amount</th>
                                            <th className="text-end">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody id="orders">
                                        {productordertabeldata.map((data, i) => (
                                            <tr className="btn-reveal-trigger" key={i}>
                                                <td className="py-2">
                                                    <div className={`form-check custom-checkbox ${data.checkbox}`}>
                                                        <input type="checkbox" onClick={() => chackboxFun()} className="form-check-input product_order" id="checkbox" />
                                                        <label className="form-check-label" htmlFor="checkbox" />
                                                    </div>
                                                </td>
                                                <td className="py-2">
                                                    <Link to="/ecom-product-order"> <strong>{data.order}</strong> </Link> {" "} by{" "}
                                                    <strong>{data.name}</strong>
                                                    <br />
                                                    <Link to={`mailto:${data.mail}`}>{data.mail}</Link>
                                                </td>
                                                <td className="py-2">{data.date}</td>
                                                <td className="py-2"> {data.address}
                                                    <p className="mb-0 text-500">{data.address2}</p>
                                                </td>
                                                <td className="py-2 text-end">
                                                    {data.status}
                                                </td>
                                                <td className="py-2 text-end">{data.amount}</td>
                                                <td className="py-2 text-end">
                                                    <Dropdown className="dropdown text-sans-serif">
                                                        <Dropdown.Toggle variant="" className="btn btn-primary i-false tp-btn-light sharp" type="button" id="order-dropdown-0" data-toggle="dropdown" data-boundary="viewport" aria-haspopup="true" aria-expanded="false">
                                                            <span>
                                                                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="18px" height="18px" viewBox="0 0 24 24" version="1.1">
                                                                    <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                                                                        <rect x={0} y={0} width={24} height={24} />
                                                                        <circle fill="#000000" cx={5} cy={12} r={2} />
                                                                        <circle fill="#000000" cx={12} cy={12} r={2} />
                                                                        <circle fill="#000000" cx={19} cy={12} r={2} />
                                                                    </g>
                                                                </svg>
                                                            </span>
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu className="dropdown-menu dropdown-menu-right border py-0" aria-labelledby="order-dropdown-0">
                                                            <div className="py-2">
                                                                <Link className="dropdown-item" to="/ecom-product-order"> Completed </Link>
                                                                <Link className="dropdown-item" to="/ecom-product-order"> Processing </Link>
                                                                <Link className="dropdown-item" to="/ecom-product-order"> On Hold </Link>
                                                                <Link className="dropdown-item" to="/ecom-product-order"> Pending </Link>
                                                                <div className="dropdown-divider" />
                                                                <Link className="dropdown-item text-danger" to="/ecom-product-order"> Delete </Link>
                                                            </div>
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
        </Fragment>
    )
}
export default ProductOrder;
