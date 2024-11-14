import React from "react";

import {
    Button,
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Media,
    UncontrolledDropdown
} from "reactstrap";

import {
    MoreHorizontal
} from "react-feather";

import avatar1 from "../../../../assets/img/avatars/avatar.jpg";
import avatar4 from "../../../../assets/img/avatars/avatar-4.jpg";
import avatar5 from "../../../../assets/img/avatars/avatar-5.jpg";
import class1 from "../../../../assets/img/avatars/class-1.jpg";

const Activities = (props) => {
    return <Card>
        <CardHeader>
            <div className="card-actions float-right">
                <UncontrolledDropdown>
                    <DropdownToggle tag="a">
                        <MoreHorizontal />
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem>Action</DropdownItem>
                        <DropdownItem>Another Action</DropdownItem>
                        <DropdownItem>Something else here</DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </div>
            <CardTitle tag="h5" className="mb-0">
                Activities
      </CardTitle>
        </CardHeader>
        <CardBody>
            <Media>
                <img
                    src={avatar5}
                    width="36"
                    height="36"
                    className="rounded-circle mr-2"
                    alt="Ashley Briggs"
                />
                <Media body>
                    <small className="float-right text-navy">5m ago</small>
                    <strong>Nguyen Ngoc Duy </strong> has teached {" "}
                    <strong>Java core - lesson 04</strong>
                    <br />
                    <small className="text-muted">Today 7:02 pm</small>
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
                    alt="Chris Wood"
                />
                <Media body>
                    <small className="float-right text-navy">1 day ago</small>
                    <strong>Tran Anh Tu, Nguyen Thi Hoa</strong> absent in {" "}
                    <strong>Java core - lesson 04</strong>
                    <br />
                    <small className="text-muted">Yesterday 7:02 pm</small>
                </Media>
            </Media>

            <hr />
            <Media>
                <img
                    src={avatar4}
                    width="36"
                    height="36"
                    className="rounded-circle mr-2"
                    alt="Stacie Hall"
                />
                <Media body>
                    <small className="float-right text-navy">1 day ago</small>
                    <strong>Nguyen Thi Ngoc</strong> has deferred study
          <br />
                    <small className="text-muted">Yesterday 9:35 am</small>
                    <Media body className="pl-3">
                        <div className="border text-sm text-muted p-2 mt-1">
                            Because She sick
              </div>
                    </Media>
                </Media>
            </Media>

            <hr />
            <Media>
                <img
                    src={class1}
                    width="36"
                    height="36"
                    className="rounded-circle mr-2"
                    alt="Stacie Hall"
                />
                <Media body>
                    <small className="float-right text-navy">2 days ago</small>
                    Final exam SQL
          <br />
                    <small className="text-muted">At 2:00 pm</small>
                </Media>
            </Media>

            <hr />
            <Media>
                <img
                    src={avatar1}
                    width="36"
                    height="36"
                    className="rounded-circle mr-2"
                    alt="Chris Wood"
                />
                <Media body>
                    <small className="float-right text-navy">5d ago</small>
                    <strong>Nong Thanh Cong</strong> has teached{" "}
                    <strong>SQL - lesson 08</strong>
                    <br />
                    <small className="text-muted">At 7:30 pm</small>
                </Media>
            </Media>

            <hr />
            <Button color="primary" block>
                Load more
      </Button>
        </CardBody>
    </Card>
}

export default Activities;