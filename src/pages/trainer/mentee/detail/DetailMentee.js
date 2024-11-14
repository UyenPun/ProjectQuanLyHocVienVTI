import React, { useState } from "react";
import { useParams } from "react-router";

import {
  Col,
  Container,
  Row
} from "reactstrap";

import Activities from "./Activities";
import BasicInformation from "./BasicInformation";
import DetailLearning from "./DetailLearning";
import Tuition from "./Tuition";
import UpdateBasicInformationForm from "./UpdateBasicInformationForm";

const DetailMentee = (props) => {

  const [isUpdateBasicInformation, setUpdateBasicInformation] = useState(false);

  // mentee id
  let { id } = useParams();
  console.log("Mentee ID: " + id);

  return (
    <Container fluid className="p-0">
      <Row>
        <Col xl={!isUpdateBasicInformation ? 4 : 8}>
          {!isUpdateBasicInformation ?
            <BasicInformation setUpdateBasicInformation={setUpdateBasicInformation} />
            : <UpdateBasicInformationForm setUpdateBasicInformation={setUpdateBasicInformation} />}
        </Col>
        <Col xl={!isUpdateBasicInformation ? 8 : 4}>
          <DetailLearning />
          <Tuition />
          <Activities />
        </Col>
      </Row>
    </Container >
  )
};

export default DetailMentee;
