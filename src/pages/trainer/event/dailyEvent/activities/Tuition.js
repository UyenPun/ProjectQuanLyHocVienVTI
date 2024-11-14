import React from "react";

import Timeline from "../../../../../components/Timeline";
import TimelineItem from "../../../../../components/TimelineItem";

const Tuition = () => (
  <Timeline>
    <TimelineItem>
      <strong>Enrollment</strong>
      <span className="float-right text-muted text-sm">7:30</span>
      <p>
        Tran Van enrolled in Rocket 13 with 5 million
      </p>
    </TimelineItem>

    <br />
    <TimelineItem>
      <strong>Tuition 3rd time</strong>
      <span className="float-right text-muted text-sm">8:00</span>
      <p>
        Nam Nguyen paid tuition 3rd time with 5 million
      </p>
    </TimelineItem>

    <br />
    <TimelineItem>
      <strong>Enrollment</strong>
      <span className="float-right text-muted text-sm">10:00</span>
      <p className="mb-0">
        Tran Nam enrolled in Rocket 13 with 25 million
      </p>
    </TimelineItem>

    <br />
    <TimelineItem>
      <strong>Enrollment</strong>
      <span className="float-right text-muted text-sm">14:00</span>
      <p className="mb-0">
        Tran Huy enrolled in Rocket 14 with 12 million
      </p>
    </TimelineItem>

    <br />
    <TimelineItem>
      <strong>Enrollment</strong>
      <span className="float-right text-muted text-sm">17:00</span>
      <p className="mb-0">
        Tran Huy enrolled in Rocket 14 with 2 million
      </p>
    </TimelineItem>
  </Timeline>

);

export default Tuition;
