import { Link } from 'react-router-dom';
import { Tab, Nav } from 'react-bootstrap';
import MainContent from '../../components/aikit/MainContent';
import TopMenus from '../../components/aikit/TopMenus';
import FineTuneJob from '../../components/aikit/FineTuneJob';
import Prompts from '../../components/aikit/Prompts';
import { SVGICON } from '../../constant/theme';
import { schedulerTable } from '../../constant/alldata';

const numb = [3, 7, 12, 16, 19, 22, 25];

function FineTuneModels() { 
    const sort = 10; 
    return (
        <> 
            <div className="row">
                <div className="col-xl-12">
                    <MainContent
                        detail="This is a demo of AIKit plugin made for you to test the experience of using the plugin. Text & images generated in this demo are dummy. In real life, AIKit will call OpenAI API and generate relevant text and images based on your prompts."
                    />
                    <TopMenus id={6} />
                    <Tab.Container defaultActiveKey={'Job'}>
                        <div className="card h-auto">
                            <div className="card-body ai-tabs-1 py-2">
                                <Nav as="ul" className="nav nav-tabs align-items-end">
                                    <Nav.Item as="li" >
                                        <Nav.Link className="nav-link" eventKey="Create" type="button">Create Fine-tune Job</Nav.Link >
                                    </Nav.Item>
                                    <Nav.Item as="li" >
                                        <Nav.Link eventKey="Job" type="button" >Jobs<span className="badge badge-circle badge-light light ms-2">5</span></Nav.Link >
                                    </Nav.Item>
                                </Nav>
                            </div>
                        </div>
                        <Tab.Content>
                            <Tab.Pane eventKey={'Create'}>
                                <div className="row">
                                    <div className="col-xl-4">
                                        <FineTuneJob />
                                    </div>
                                    <div className="col-xl-8">
                                        <Prompts />
                                    </div>
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey={'Job'}>
                                <div className="card">
                                    <div className="card-body p-0">
                                        <div id="fine-tbl_wrapper" className="table-responsive dataTables_wrapper active-projects style-1">
                                            <table id="empoloyees-tblwrapper" className="table dataTable dataTables_wrapper no-footer mb-0">
                                                <thead>
                                                    <tr>
                                                        <th>Model Name Suffix</th>
                                                        <th>Model Name</th>
                                                        <th>Base Model</th>
                                                        <th>Date created</th>
                                                        <th>Status</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {schedulerTable.map((item, ind) => (
                                                        <tr key={ind}>
                                                            <td className="text-black">Write a rat story</td>
                                                            <td> {item.keyword} </td>
                                                            <td>hourly</td>
                                                            <td>4:50 AM Nov 11, 2025</td>
                                                            <td>
                                                                {numb.includes(ind) ?
                                                                    <span className="badge badge-success">Success</span>
                                                                    :
                                                                    <span className="badge badge-light">Pending training data</span>
                                                                }
                                                            </td>
                                                            <td>
                                                                <Link to={"#"} className="btn btn-primary light btn-sharp">
                                                                    {SVGICON.blueeyebox}
                                                                </Link>{" "}
                                                                <Link to={"#"} className="btn btn-danger light btn-sharp">
                                                                    {SVGICON.reddelete}
                                                                </Link>

                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                </div>
            </div>
        </>
    );
};

export default FineTuneModels;