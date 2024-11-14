import React from "react";
import { Col, Card, CardBody, Media, Row, UncontrolledTooltip } from "reactstrap";

import { ShoppingCart, Activity, DollarSign, ShoppingBag } from "react-feather";

const Statistics = () => (
  <Row>
    <Col md="6" xl>
      <Card className="flex-fill">
        <CardBody className="py-4">
          <Media>
            <div className="d-inline-block mt-2 mr-3">
              <ShoppingCart className="feather-lg text-primary" />
            </div>
            <Media body>
              <h3 className="mb-2" id="sale">$ 500.800</h3>
              <div className="mb-0">Sale Revenue</div>
              <UncontrolledTooltip
                placement={"bottom"}
                target={"sale"}>
                500,8 million in this month!
              </UncontrolledTooltip>
            </Media>
          </Media>
        </CardBody>
      </Card>
    </Col>
    <Col md="6" xl>
      <Card className="flex-fill">
        <CardBody className="py-4">
          <Media>
            <div className="d-inline-block mt-2 mr-3">
              <Activity className="feather-lg text-warning" />
            </div>
            <Media body>
              <h3 className="mb-2" id="mentee">40</h3>
              <div className="mb-0">New Mentees</div>
              <UncontrolledTooltip
                placement={"bottom"}
                target={"mentee"}>
                40 new mentees in this month!
              </UncontrolledTooltip>
            </Media>
          </Media>
        </CardBody>
      </Card>
    </Col>
    <Col md="6" xl>
      <Card className="flex-fill">
        <CardBody className="py-4">
          <Media>
            <div className="d-inline-block mt-2 mr-3">
              <DollarSign className="feather-lg text-success" />
            </div>
            <Media body>
              <h3 className="mb-2" id="monthly_tuition">$ 200.300</h3>
              <div className="mb-0">Monthly Tuition</div>
              <UncontrolledTooltip
                placement={"bottom"}
                target={"monthly_tuition"}>
                200,3 million in this month!
              </UncontrolledTooltip>
            </Media>
          </Media>
        </CardBody>
      </Card>
    </Col>
    <Col md="6" xl>
      <Card className="flex-fill">
        <CardBody className="py-4">
          <Media>
            <div className="d-inline-block mt-2 mr-3">
              <ShoppingBag className="feather-lg text-danger" />
            </div>
            <Media body>
              <h3 className="mb-2" id="deferred_mentees">5</h3>
              <div className="mb-0">Deferred Mentees</div>
              <UncontrolledTooltip
                placement={"bottom"}
                target={"deferred_mentees"}>
                5 mentees has deferred in this month!
              </UncontrolledTooltip>
            </Media>
          </Media>
        </CardBody>
      </Card>
    </Col>
    <Col md="6" xl className="d-none d-xxl-flex">
      <Card className="flex-fill">
        <CardBody className="py-4">
          <Media>
            <div className="d-inline-block mt-2 mr-3">
              <DollarSign className="feather-lg text-info" />
            </div>
            <Media body>
              <h3 className="mb-2">$ 18.700</h3>
              <div className="mb-0">Total Revenue</div>
            </Media>
          </Media>
        </CardBody>
      </Card>
    </Col>
  </Row>
);

export default Statistics;
