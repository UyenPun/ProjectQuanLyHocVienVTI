import React from "react";

import {
  Container,
  CardBody,
  Card,
  Row,
  Col
} from "reactstrap";
import DateTime from "react-datetime";

import Activities from "./activities/Activities";

const DailyEvent = () => (
  <Container fluid className="p-0">
    <h1 className="h3 mb-3">Daily Event</h1>
    <Card>
      <CardBody>
        <Row>
          <Col lg="4">
            <DateTime
              input={false}
              defaultValue={DateTime.moment()}
              dateFormat="L"
              timeFormat={false}
            />
          </Col>
          <Col lg="8">
            <Activities />
          </Col>
        </Row>
      </CardBody>
    </Card>

  </Container>
);

export default DailyEvent;
