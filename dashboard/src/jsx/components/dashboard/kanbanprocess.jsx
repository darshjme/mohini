import { Link } from "react-router-dom";
import { kanbandata } from "../../constant/alldata";
import { Dropdown } from "react-bootstrap";
import { IMAGES, SVGICON } from "../../constant/theme";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const KanbanProcess = () => {
    const [show, setShow] = useState(false);
    const [columns, setColumns] = useState(kanbandata);

    const onDragEnd = (result) => {
        if (!result.destination) return;
        
        const { source, destination } = result;
        const sourceColIndex = parseInt(source.droppableId);
        const destColIndex = parseInt(destination.droppableId);
        
        const sourceCol = columns[sourceColIndex];
        const destCol = columns[destColIndex];
        
        const sourceItems = [...sourceCol.content];
        const destItems = [...destCol.content];
        const [removed] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, removed);
        
        const newColumns = [...columns];
        newColumns[sourceColIndex] = {
            ...sourceCol,
            content: sourceItems,
            titledata: sourceItems.length
        };
        newColumns[destColIndex] = {
            ...destCol,
            content: destItems,
            titledata: destItems.length
        };
        
        setColumns(newColumns);
    };

    return (
        <>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="row kanban-bx px-3">
                    {columns.map((column, columnIndex) => (
                        <div className="col-xl-3 col-md-6 px-0" key={columnIndex}>
                            <div className="kanbanPreview-bx">
                                <Droppable droppableId={`${columnIndex}`}>
                                    {(provided) => (
                                        <div 
                                            className="draggable-zone dropzoneContainer"
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                        >
                                            <div className="sub-card align-items-center d-flex justify-content-between mb-4">
                                                <div>
                                                    <h4 className="mb-0">{column.maintitle} (<span className="totalCount">{column.titledata}</span>)</h4>
                                                </div>
                                                <div className="plus-bx">
                                                    <Link to={"#"} onClick={() => setShow(true)}><i className="fas fa-plus" /></Link>
                                                </div>
                                            </div>
                                            {column.content.map((item, index) => (
                                                <Draggable key={index} draggableId={`${columnIndex}-${index}`} index={index}>
                                                    {(provided) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            className="card draggable-handle draggable"
                                                        >
                                                            <div className="card-body">
                                                                <div className="d-flex justify-content-between mb-2">
                                                                    {item.span}
                                                                    <Dropdown className="c-pointer">
                                                                        <Dropdown.Toggle as="div" className="btn-link i-false dropdown-toggle" >
                                                                            {SVGICON.threedothorizontal}
                                                                        </Dropdown.Toggle>
                                                                        <Dropdown.Menu className="dropdown-menu dropdown-menu-end" align="end">
                                                                            <Dropdown.Item>Delete</Dropdown.Item>
                                                                            <Dropdown.Item>Edit</Dropdown.Item>
                                                                        </Dropdown.Menu>
                                                                    </Dropdown>
                                                                </div>
                                                                <h5 className="mb-0"><Link to={"#"} className="text-black">{item.title}</Link></h5>
                                                                <div className="progress default-progress my-4">
                                                                    <div className={`progress-bar ${item.progessbar} progress-animated`} style={{ width: "45%", height: "7px", }} >
                                                                        <span className="sr-only">45% Complete</span>
                                                                    </div>
                                                                </div>
                                                                <div className="row justify-content-between align-items-center kanban-user">
                                                                    <ul className="users col-6">
                                                                        <li><img src={IMAGES.contactspic11} alt="" /></li>
                                                                        <li><img src={IMAGES.contactspic22} alt="" /></li>
                                                                        <li><img src={IMAGES.contactspic33} alt="" /></li>
                                                                    </ul>
                                                                    <div className="col-6 d-flex justify-content-end">
                                                                        <span className="fs-14"><i className="far fa-clock me-2" /> Due in 4 days</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </div>
                        </div>
                    ))}
                </div>
            </DragDropContext>
            {/* Modal */}
            <Modal show={show} className="fade" centered>
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">People Title</h1>
                    <button type="button" className="btn-close" onClick={() => setShow(false)} aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="mb-3">
                                <label for="exampleFormControlInput1" className="form-label required">People Name</label>
                                <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="WorldNIC" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-danger light" onClick={() => setShow(false)}>Close</button>
                    <button type="button" className="btn btn-primary">Save changes</button>
                </div>
            </Modal>
        </>
    );
};

export default KanbanProcess;