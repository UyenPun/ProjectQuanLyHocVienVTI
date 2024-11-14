import React from "react";
import { Link } from "react-router-dom";

import {
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    UncontrolledTooltip,
    Badge,
    Button,
    Progress,
} from "reactstrap";

import {
    MapPin,
    Star,
    Clock,
} from "react-feather";

const BasicInformation = (props) => {
    return <Card>
        <CardHeader>
            <div className="card-actions float-right">
                <Button color="primary"
                    onClick={() => props.setUpdateBasicInformation(true)}>
                    Update
                </Button>
            </div>
            <CardTitle tag="h5" className="mb-0">
                Rocket 09 Information
            </CardTitle>
        </CardHeader>

        <hr className="my-0" />
        <CardBody>
            <CardTitle tag="h5">About</CardTitle>
            <ul className="list-unstyled mb-0">
                <li className="mb-1">
                    <Star width={14} height={14} className="mr-1" /> Course code:{" "}
                    <span className="text-right text-primary" to="#">Rocket EPD_HN_20_09</span>
                </li>

                <li className="mb-1">
                    <Star width={14} height={14} className="mr-1" /> Level:{" "}
                    <span className="text-right text-primary" to="#">IT</span>
                </li>

                <li className="mb-1">
                    <Star width={14} height={14} className="mr-1" /> Type:{" "}
                    <span className="text-right text-primary" to="#">Developer</span>
                </li>

                <li className="mb-1">
                    <Star width={14} height={14} className="mr-1" /> Link:{" "}
                    <Link to={{ pathname: "https://www.facebook.com" }} target="_blank">Facebook</Link>

                </li>

                <li className="mb-1">
                    <Clock width={14} height={14} className="mr-1" /> Schedule:{" "}
                    <div>
                        <span className="text-right text-primary" style={{ margin: 26 }} to="#">Monday (7:00 p.m - 9:00 p.m)</span>
                    </div>
                    <div>
                        <span className="text-right text-primary" style={{ margin: 26 }} to="#">Wednesday (7:00 p.m - 9:00 p.m)</span>
                    </div>
                    <div>
                        <span className="text-right text-primary" style={{ margin: 26 }} to="#">Friday (7:00 p.m - 9:00 p.m)</span>
                    </div>
                </li>

                <li className="mb-1">
                    <MapPin width={14} height={14} className="mr-1" /> Address:{" "}
                    <div >
                        <Link style={{ padding: 26 }} to={{ pathname: " https://www.google.com/maps/place/To%C3%A0+nh%C3%A0+AC+Building/@21.0324463,105.7808574,17z/data=!3m1!4b1!4m5!3m4!1s0x3135ab4b44cd1fa1:0x128bd46360fd9b79!8m2!3d21.0324413!4d105.7830461" }} target="_blank">6th floor, AC Building, Duy Tan str., HN</Link>
                    </div>
                </li>

            </ul>
        </CardBody>


        <hr className="my-0" />
        <CardBody>
            <CardTitle tag="h5">Learning </CardTitle>
            <ul className="list-unstyled mb-0">
                <li className="mb-1">
                    <Star width={14} height={14} className="mr-1" /> Start date:{" "}
                    <span id="tooltip_start_date" className="text-right text-primary" to="#">20/01/2021</span>
                    <UncontrolledTooltip
                        placement={"bottom"}
                        target={"tooltip_start_date"}>
                        5 months ago!
                    </UncontrolledTooltip>
                </li>

                <li className="mb-1">
                    <Star width={14} height={14} className="mr-1" /> Expect end date:{" "}
                    <span id="tooltip_expect_end_date" className="text-right text-primary" to="#">20/06/2021</span>
                    <UncontrolledTooltip
                        placement={"bottom"}
                        target={"tooltip_expect_end_date"}>
                        this month!
                    </UncontrolledTooltip>
                </li>

                <li className="mb-1">
                    <Star width={14} height={14} className="mr-1" /> End date:{" "}
                    <span id="tooltip_end_date" className="text-right text-primary" to="#">Not yet</span>
                    <UncontrolledTooltip
                        placement={"bottom"}
                        target={"tooltip_end_date"}>
                        now!
                    </UncontrolledTooltip>
                </li>

                <li className="mb-1">
                    <Star width={14} height={14} className="mr-1" /> Lesson:{" "}
                    <span className="text-right text-primary" to="#">Java Advance - lesson 06</span>
                </li>

                <li className="mb-1">
                    <Star width={14} height={14} className="mr-1" /> Status:{" "}
                    <span className="text-right text-primary" to="#">Active</span>
                </li>
            </ul>
        </CardBody>

        <hr className="my-0" />
        <CardBody>
            <CardTitle tag="h5">Amout</CardTitle>
            <ul className="list-unstyled mb-0">

                <Star width={14} height={14} className="mr-1" /> Completed lesson{" "}
                <Progress striped value="70" className="mb-3">
                    70%
                </Progress>

                <Star width={14} height={14} className="mr-1" /> Mentee amout{" "}
                <Progress striped value="90" className="mb-3">
                    90%
                </Progress>

            </ul>
        </CardBody>

        <hr className="my-0" />
        <CardBody>
            <CardTitle tag="h5">Tuition</CardTitle>
            <ul className="list-unstyled mb-0">
                <li className="mb-1">
                    <Star width={14} height={14} className="mr-1" /> Standard tuition total:{" "}
                    <span className="text-right text-primary" to="#">200.000.000</span>
                </li>

                <li className="mb-1">
                    <Star width={14} height={14} className="mr-1" /> Actual tuition total:{" "}
                    <span className="text-right text-primary" to="#">135.000.000</span>
                </li>
            </ul>
        </CardBody>

        <hr className="my-0" />
        <CardBody>
            <CardTitle tag="h5">Finished Subject</CardTitle>
            <Badge color="primary" className="mr-1 my-1">
                SQL
            </Badge>
            <Badge color="primary" className="mr-1 my-1">
                Java Core
            </Badge>
            <Badge color="primary" className="mr-1 my-1">
                Basic Frontend
            </Badge>
        </CardBody>

        <hr className="my-0" />
        <CardBody>
            <CardTitle tag="h5">Note</CardTitle>
            <div>...</div>

        </CardBody>
    </Card>
}

export default BasicInformation;