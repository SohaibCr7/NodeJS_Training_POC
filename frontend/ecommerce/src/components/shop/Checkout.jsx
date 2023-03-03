import React from "react";
import Navigation from "../navigation/Navigation";

// import Scheduler, { Resource } from "devextreme-react/scheduler";

// import { data, resourcesData, priorityData, departmentData } from "./data.js";

// const currentDate = new Date(2021, 1, 2);
// const views = [
//   "timelineDay",
//   "timelineWeek",
//   "timelineWorkWeek",
//   "timelineMonth",
// ];
// const groups = ["priority", "department"];

export default function Checkout() {
  return (
    <div>
      <Navigation />
      Checkout
    </div>
    // <Scheduler
    //   timeZone="America/Los_Angeles"
    //   dataSource={data}
    //   // views={views}
    //   defaultCurrentView="timelineMonth"
    //   defaultCurrentDate={currentDate}
    //   height={580}
    //   groups={groups}
    //   cellDuration={60}
    //   firstDayOfWeek={0}
    //   startDayHour={8}
    //   endDayHour={20}
    // >
    //   <Resource
    //     fieldExpr="ownerId"
    //     allowMultiple={true}
    //     dataSource={resourcesData}
    //     label="Owner"
    //     useColorAsDefault={true}
    //   />
    //   <Resource
    //     fieldExpr="priority"
    //     allowMultiple={false}
    //     dataSource={priorityData}
    //     label="Priority"
    //   />
    // </Scheduler>
  );
}
