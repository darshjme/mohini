import { Fragment, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { SVGICON } from "../../constant/theme";

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

const DraggableBlog = () => {
    const [items, setItems] = useState([
        { id: "input1", title: 'Complete this project Monday', styleChange: 'text-warning', icon: SVGICON.Stopboard },
        { id: "input2", title: 'Complete this project Sunday', styleChange: 'text-success', icon: SVGICON.RightClick },
        { id: "input3", title: 'Complete this project Tuesday', styleChange: 'text-warning', icon: SVGICON.Stopboard },
        { id: "input4", title: 'Complete this project Monday', styleChange: 'text-success', icon: SVGICON.RightClick },
        { id: "input5", title: 'Complete this project Friday', styleChange: 'text-warning', icon: SVGICON.Stopboard }
    ]);

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        const reorderedItems = reorder(
            items,
            result.source.index,
            result.destination.index
        );

        setItems(reorderedItems);
    };


    return (
        <Fragment>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {items.map((item, index) => (
                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className="sub-card draggable-handle draggable"
                                        >
                                            <div className="d-items">
                                                <span className={`dang d-block mb-2 ${item.styleChange}`}>
                                                    {item.icon}
                                                    {" "}Latest to do's
                                                </span>
                                                <div className="d-flex justify-content-between flex-wrap">
                                                    <div className="d-items-2">
                                                        <div>
                                                            {SVGICON.Dotes}
                                                        </div>
                                                        <div>
                                                            <div className="form-check custom-checkbox">
                                                                <input type="checkbox" className="form-check-input" id={`customCheckBox ${item.id}`} required />
                                                                <label className="form-check-label" htmlFor={`customCheckBox ${item.id}`}>{item.title}</label>
                                                            </div>
                                                            <span>2025-12-26 07:15:00</span>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="icon-box icon-box-md icon-danger me-1">
                                                            {SVGICON.DeleteDanger}
                                                        </div>
                                                        <div className="icon-box icon-box-md bg-primary-light">
                                                            {SVGICON.EditPrimary}
                                                        </div>
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
            </DragDropContext>
        </Fragment>
    );
};

export default DraggableBlog;
