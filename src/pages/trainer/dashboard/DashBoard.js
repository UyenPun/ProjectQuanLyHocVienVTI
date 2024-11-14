import React from "react";
import { connect } from "react-redux";

import {
  Col,
  Container,
  Row
} from "reactstrap";

import Statistics from "../dashboard/Statistics";

import Revenue from "./sale/Revenue";
import SaleActivity from "./sale/Activity";

import Class from "./class/Class";
import ClassActivity from "./class/Activity";

import { selectLastName } from "../../../redux/selectors/LoginSelector";

const Dashboard = (props) => (
  <Container fluid className="p-0">
    <h1 className="h3 mb-3">Welcome back, {props.lastName}!</h1>
    <Statistics />
    <Row>
      <Col md="7" lg="8" className="col-xxl-8 d-flex">
        <Revenue />
      </Col>
      <Col md="5" lg="4" className="col-xxl-4 d-flex">
        <SaleActivity />
      </Col>
    </Row>
    <Row>
      <Col lg="6" xl="8">
        <Class />
      </Col>
      <Col lg="6" xl="4" >
        <ClassActivity />
      </Col>
    </Row>
  </Container>
);

const mapGlobalStateToProps = state => {
  return {
    lastName: selectLastName(state)
  };
};

export default connect(mapGlobalStateToProps)(Dashboard);
