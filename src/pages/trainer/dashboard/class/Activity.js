import React from "react";

import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Media,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown
} from "reactstrap";

import { MoreHorizontal } from "react-feather";

import avatar1 from "../../../../assets/img/avatars/avatar.jpg";
import avatar5 from "../../../../assets/img/avatars/avatar-5.jpg";

const Activity = () => (
  <Card className="flex-fill w-100">
    <CardHeader>
      <div className="card-actions float-right">
        <UncontrolledDropdown>
          <DropdownToggle tag="a">
            <MoreHorizontal />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem>Class</DropdownItem>
            <DropdownItem>Mentee</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
      <CardTitle tag="h5" className="mb-0">
        Activity
      </CardTitle>
    </CardHeader>
    <CardBody>
      <Media>
        <img
          src={avatar5}
          width="36"
          height="36"
          className="rounded-circle mr-2"
          alt="Nam Nguyen"
        />
        <Media body>
          <small className="float-right text-navy">5m ago</small>
          <strong>Nam Nguyen</strong>{" "} absent {" "}
          <strong>Java Core - Lesson 01</strong>
          <br />
          <small className="text-muted">Today 7:51 pm</small>
          <br />
        </Media>
      </Media>

      <hr />
      <Media>
        <img
          src={avatar1}
          width="36"
          height="36"
          className="rounded-circle mr-2"
          alt="Tran Van"
        />
        <Media body>
          <small className="float-right text-navy">1 day ago</small>
          <strong>Tran Van</strong> joined in{" "}
          <strong>Rocket 13</strong> from {" "}
          <strong>Lesson 13 - Java Core</strong>
          <br />
          <small className="text-muted">Today 7:51 pm</small>
          <br />
        </Media>
      </Media>

      <hr />
      <Media>
        <Media body>
          <small className="float-right text-navy">2 days ago</small>
          <strong>Rocket 13</strong> has took {" "}
          <strong>the SQL exam</strong>{" "}
          <br />
          <small className="text-muted">Today 7:51 pm</small>
          <br />
        </Media>
      </Media>

      <hr />
      <Media>
        <img
          src={avatar1}
          width="36"
          height="36"
          className="rounded-circle mr-2"
          alt="Tran Van"
        />
        <Media body>
          <small className="float-right text-navy">3 day ago</small>
          <strong>Tran Van</strong> joined in{" "}
          <strong>Rocket 13</strong> from {" "}
          <strong>Lesson 13 - Java Core</strong>
          <br />
          <small className="text-muted">Today 7:51 pm</small>
          <br />
        </Media>
      </Media>
    </CardBody>
  </Card>
);

export default Activity;
