import { Accordion } from 'react-bootstrap';
import Nestable from 'react-nestable';
import 'react-nestable/dist/styles/index.css';

import { MenuAccordBlog1, MenuAccordBlog2 } from './MenuAccord';

const AccordBlog1 = () => {
    return (
        <Accordion className="accordion menu-accord leftpadaccordion" defaultActiveKey="-1">
            <Accordion.Item >
                <Accordion.Header className="accordion-header rounded-lg ">
                    <div className="move-media dd-handle">
                        <i className="fas fa-arrows-alt" />
                    </div>
                    <span> Contact Us</span>
                </Accordion.Header>
                <Accordion.Collapse>
                    <div className="accordion-body">
                        <MenuAccordBlog1 />
                    </div>
                </Accordion.Collapse>
            </Accordion.Item>
        </Accordion>
    )
}
const AccordBlog2 = ({ title }) => {
    return (
        <Accordion className="accordion menu-accord leftpadaccordion" defaultActiveKey="-1">
            <Accordion.Item>
                <Accordion.Header className="accordion-header rounded-lg">
                    <div className="move-media dd-handle">
                        <i className="fas fa-arrows-alt" />
                    </div>
                    <span>{title}</span>
                </Accordion.Header>
                <Accordion.Collapse>
                    <div className="accordion-body">
                        <MenuAccordBlog2 />
                    </div>
                </Accordion.Collapse>
            </Accordion.Item>
        </Accordion>
    )
}

const ItemList = [
    { id: 0, text: <AccordBlog1 /> },
    { id: 1, text: <AccordBlog2 title="Privacy Policy" /> },
    { id: 2, text: <AccordBlog2 title="Terms and Conditions" /> },
    { id: 3, text: <AccordBlog2 title="About Us" /> },
    { id: 4, text: <AccordBlog2 title="Important Information" /> },
];
const renderItem = ({ item }) => item.text;

const MenusBlog2 = () => {
    return (
        <>
            <div className="filter cm-content-box box-primary">
                <div className="content-title d-sm-flex d-block flex-wrap">
                    <div className="cpa d-flex align-items-center flex-wrap">
                        <span className="pe-3 pb-sm-0 pb-3">Menu Name</span>
                        <input type="text" className="form-control w-auto mb-sm-0 mb-3" placeholder="information" />
                    </div>
                    <button type="button" className="btn btn-secondary btn-sm ms-sm-auto mb-2 mb-sm-0">Save Menu</button>
                </div>
                <div className="cm-content-body form excerpt rounded-0">
                    <div className="card-body">
                        <h6 className="mb-1">Menu Structure</h6>
                        <p className="fs-13 mb-4">Add menu items from the column on the left.</p>
                        <div className="col-xl-7">
                            <div className="dd">
                                <Nestable
                                    items={ItemList}
                                    renderItem={renderItem}
                                    className='dd-list accordion ps-0 menuaccord'
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="filter cm-content-box box-primary style-1 mb-0 border-0">
                    <div className="content-title border-bot">
                        <div className="cpa"> Delete Menu </div>
                        <button type="button" className="btn btn-secondary btn-sm">Save Menu</button>
                    </div>
                </div>
            </div>
        </>
    );
};
export default MenusBlog2;