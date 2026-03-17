import { Fragment } from "react";
import EventCalendar from "../element/EventCalendar";
import PageTitle from "../layouts/PageTitle"; 

function Calendar() {
    return (
        <Fragment>
           <PageTitle activeMenu="Calendar" motherMenu="App" />
            <EventCalendar /> 
        </Fragment>

    );
};

export default Calendar;
