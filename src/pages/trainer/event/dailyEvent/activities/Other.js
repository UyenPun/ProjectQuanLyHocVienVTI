import React from "react";

import Timeline from "../../../../../components/Timeline";
import TimelineItem from "../../../../../components/TimelineItem";

const Other = () => {
  return (
    <Timeline>
      <TimelineItem>
        <strong>Closing Ceremony</strong>
        <span className="float-right text-muted text-sm">19:30</span>
        <p>
          Closing class Rocket 05,Railway 07, Rocket 08
        </p>
      </TimelineItem>

      <br />
      <TimelineItem>
        <strong>Deferred</strong>
        <span className="float-right text-muted text-sm">8:00</span>
        <p>
          Nam Nguyen has Deferred
        </p>
      </TimelineItem>
    </Timeline>
  )
};

export default Other;
