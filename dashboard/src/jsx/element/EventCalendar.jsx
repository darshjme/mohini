import React, { Component } from "react";
import { Col, Row, Card } from "react-bootstrap";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list"; 
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import Alert from "sweetalert2";
import { Link } from "react-router-dom";

class EventCalendar extends Component {
   state = {
      calendarEvents: [
         {
            title: "Atlanta Monster",
            start: new Date("2025-05-07 00:00"),
            id: "99999998",
         },
         {
            title: "My Favorite Murder",
            start: new Date("2025-05-09 00:00"),
            id: "99999999",
         },
         {
            title: "Atlanta Monster",
            start: new Date("2025-06-04 00:00"),
            id: "99999998",
         },
         {
            title: "My Favorite Murder",
            start: new Date("2025-06-07 00:00"),
            id: "99999999",
         },
         {
            title: "Atlanta Monster",
            start: new Date("2025-06-24 00:00"),
            id: "99999998",
         },
         {
            title: "My Favorite Murder",
            start: new Date("2025-07-15 00:00"),
            id: "99999999",
         },
      ],
      events: [
         { title: "New Theme Release", id: "1", class: "btn-primary", dataclass: 'bg-primary', },
         { title: "My Event", id: "2", class: "btn-warning", dataclass: 'bg-warning', },
         { title: "Meet manager", id: "3", class: "btn-danger", dataclass: 'bg-danger', },
         { title: "Create New theme", id: "4", class: "btn-info", dataclass: 'bg-info', },
         { title: "Project Launch", id: "5", class: "btn-dark", dataclass: 'bg-dark', },
         { title: "Meeting", id: "6", class: "btn-secondary", dataclass: 'bg-secondary', },
      ],
   };

   componentDidMount() {
      let draggableEl = document.getElementById("external-events");
      new Draggable(draggableEl, {
         itemSelector: ".fc-event",
         eventData: function (eventEl) {
            let title = eventEl.getAttribute("title");
            let id = eventEl.getAttribute("data");
            return {
               title: title,
               id: id,
            };
         },
      });
   }

   /**
    * when we click on event we are displaying event details
    */
   eventClick = (eventClick) => {
      Alert.fire({
         title: eventClick.event.title,
         html:
            `<div className="table-responsive">
      <table className="table">
      <tbody>
      <tr >
      <td>Title</td>
      <td><strong>` +
            eventClick.event.title +
            `</strong></td>
      </tr>
      <tr >
      <td>Start Time</td>
      <td><strong>
      ` +
            eventClick.event.start +
            `
      </strong></td>
      </tr>
      </tbody>
      </table>
      </div>`,

         showCancelButton: true,
         confirmButtonColor: "#d33",
         cancelButtonColor: "#3085d6",
         confirmButtonText: "Remove Event",
         cancelButtonText: "Close",
      }).then((result) => {
         if (result.value) {
            eventClick.event.remove(); // It will remove event from the calendar
            Alert.fire("Deleted!", "Your Event has been deleted.", "success");
         }
      });
   };

   render() {
      return (
         <div className="animated fadeIn demo-app">
            <Row>
               <Col lg={3}>
                  <Card>
                     <Card.Body>
                        <h4 className="card-intro-title">Calendar</h4>
                        <div className=""> 
                           <div id="external-events" className="my-3">
                              <p>Drag and drop your event or click in the calendar</p>
                              {this.state.events.map((event) => (
                                 <div
                                    className={`external-event light fc-event ${event.class}`}
                                    data-class={event.dataclass}
                                    title={event.title}
                                    data={event.id}
                                    key={event.id}
                                 >
                                    <i className="fa fa-move" /> {event.title}
                                 </div>
                              ))}
                           </div>
                           <div className="checkbox form-check checkbox-event custom-checkbox pt-3 pb-5">
                              <input type="checkbox" className="form-check-input" id="drop-remove" />
                              <label className="form-check-label" htmlFor="drop-remove">Remove After Drop</label>
                           </div>
                           <Link to={"#"} className="btn btn-primary btn-event w-100">
                              <span className="align-middle"><i className="ti-plus me-1" /></span> Create New
                           </Link>
                        </div>
                     </Card.Body>
                  </Card>
               </Col>

               <Col lg={9}>
                  <Card>
                     <Card.Body>
                        <div className="app-fullcalendar fc fc-media-screen fc-direction-ltr fc-theme-standard" id="mycalendartest">
                           <FullCalendar
                              defaultView="dayGridMonth"
                              headerToolbar={{
                                 center: "title",
                                 left: "prev,next today",
                                 right:
                                    "dayGridMonth,timeGridWeek,timeGridDay",
                              }}
                              rerenderDelay={10}
                              eventDurationEditable={false}
                              editable={true}
                              droppable={true}
                              plugins={[
                                 dayGridPlugin,
                                 listPlugin,
                                 timeGridPlugin,
                                 interactionPlugin,
                              ]}
                              ref={this.calendarComponentRef}
                              weekends={this.state.calendarEvents}
                              events={this.state.calendarEvents}
                              eventDrop={this.drop}
                              // drop={this.drop}
                              eventReceive={this.eventReceive}
                              eventClick={this.eventClick}
                           // selectable={true}
                           />
                        </div>
                     </Card.Body>
                  </Card>
               </Col>
            </Row>
         </div>
      );
   }
}

export default EventCalendar;
