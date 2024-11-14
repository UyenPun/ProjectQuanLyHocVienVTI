import React from "react";
import { useState } from "react";
import { useParams } from "react-router";
import {
  Col,
  Container,
  Row
} from "reactstrap";
import Activities from "./Activities";
import BasicInformation from "./BasicInformation";
import DetailLearning from "./DetailLearning";
import UpdateBasicInformationClass from "./UpdateBasicInformationClass";

const DetailClass = (props) => {

  const [isUpdateBasicInformation, setUpdateBasicInformation] = useState(false);

  // mentee id
  let { id } = useParams();
  console.log("Mentee ID: " + id);

  return (
    <Container fluid className="p-0">
      <Row>
        <Col xl={!isUpdateBasicInformation ? 4 : 8}>
          {!isUpdateBasicInformation ?
            <BasicInformation setUpdateBasicInformation={setUpdateBasicInformation} /> :
            <UpdateBasicInformationClass setUpdateBasicInformation={setUpdateBasicInformation} />
          }

        </Col>
        <Col xl={!isUpdateBasicInformation ? 8 : 4}>
          <DetailLearning />

          <Activities />
        </Col>
      </Row>
    </Container>
  )
};

export default DetailClass;
