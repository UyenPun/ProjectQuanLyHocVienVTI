
import React from "react";

import {
    Button,
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Media
} from "reactstrap";

import avatar2 from "../../../../assets/img/avatars/avatar-2.jpg";

const Activities = (props) => {
    return <Card>
        <CardHeader>
            <div className="card-actions float-right">
                <Button color="primary">All</Button> {""}
                <Button color="primary">Attendance</Button> {""}
                <Button color="primary">Exam</Button> {""}
                <Button color="primary">deferred</Button> {""}
                <Button color="primary">Tuition</Button> {""}
                <Button color="primary">Job</Button>
            </div>
            <CardTitle tag="h5" className="mb-0">
                Activities
            </CardTitle>
        </CardHeader>
        <CardBody>
            <Media>
                <img
                    src={avatar2}
                    width="36"
                    height="36"
                    className="rounded-circle mr-2"
                    alt="Ashley Briggs"
                />
                <Media body>
                    <small className="float-right text-navy">5m ago</small>
                    <strong>Duy Nguyen</strong> started teaching{" "}
                    <strong>Java Core - Lesson 02</strong>
                    <br />
                    <small className="text-muted">Today 7:51 pm</small>
                    <br />
                </Media>
            </Media>

            <hr />
            <Media>
                <img
                    src={avatar2}
                    width="36"
                    height="36"
                    className="rounded-circle mr-2"
                    alt="Ashley Briggs"
                />
                <Media body>
                    <small className="float-right text-navy">1 day ago</small>
                    <strong>Duy Nguyen</strong> marked the test{" "}
                    <strong>Java Core </strong>
                    <br />
                    <small className="text-muted">Yesterday 7:02 pm</small>
                    <br />
                </Media>
            </Media>

            <hr />
            <Media>
                <img
                    src={avatar2}
                    width="36"
                    height="36"
                    className="rounded-circle mr-2"
                    alt="Ashley Briggs"
                />
                <Media body>
                    <small className="float-right text-navy">2 days ago</small>
                    <strong>Duy Nguyen</strong> has finished teaching{" "}
                    <strong>SQL Exam</strong>
                    <br />
                    <small className="text-muted">At 9:50 pm</small>
                    <br />
                </Media>
            </Media>

            <hr />
            <Media>
                <img
                    src={avatar2}
                    width="36"
                    height="36"
                    className="rounded-circle mr-2"
                    alt="Ashley Briggs"
                />
                <Media body>
                    <small className="float-right text-navy">2 days ago</small>
                    <strong>Duy Nguyen</strong> has started taking{" "}
                    <strong>SQL Exam</strong>
                    <br />
                    <small className="text-muted">At 7:03 pm</small>
                    <br />
                </Media>
            </Media>

            <hr />
            <Media>
                <img
                    src={avatar2}
                    width="36"
                    height="36"
                    className="rounded-circle mr-2"
                    alt="Ashley Briggs"
                />
                <Media body>
                    <small className="float-right text-navy">3 days ago</small>
                    <strong>Duy Nguyen</strong> started teaching{" "}
                    <strong>SQL - Lesson 07</strong>
                    <br />
                    <small className="text-muted">At 7:03 pm</small>
                    <br />
                </Media>
            </Media>

            <hr />
            <Media>
                <img
                    src={avatar2}
                    width="36"
                    height="36"
                    className="rounded-circle mr-2"
                    alt="Ashley Briggs"
                />
                <Media body>
                    <small className="float-right text-navy">9 days ago</small>
                    <strong>Duy Nguyen</strong> teached instead{" "}
                    <strong>SQL - Lesson 01</strong>
                    <br />
                    <small className="text-muted">At 7:03 pm</small>
                    <br />
                </Media>
            </Media>

            <hr />
            <Media>
                <img
                    src={avatar2}
                    width="36"
                    height="36"
                    className="rounded-circle mr-2"
                    alt="Ashley Briggs"
                />
                <Media body>
                    <small className="float-right text-navy">22 days ago</small>
                    <strong>Duy Nguyen</strong> be paided  {" "}
                    <br />
                    <small className="text-muted">At 3:04 pm</small>
                    <br />
                </Media>
            </Media>

            <hr />

            <hr />
            <Media>
                <img
                    src={avatar2}
                    width="36"
                    height="36"
                    className="rounded-circle mr-2"
                    alt="Ashley Briggs"
                />
                <Media body>
                    <small className="float-right text-navy">1 month ago</small>
                    <strong>Duy Nguyen</strong> has been registered{" "}
                    <strong>AWS Class</strong>
                    <br />
                    <small className="text-muted">At 7:02 pm</small>
                    <br />
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