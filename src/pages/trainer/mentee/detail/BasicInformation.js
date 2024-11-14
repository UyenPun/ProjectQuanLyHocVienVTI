import React from "react";
import { Link } from "react-router-dom";

import {
    Badge,
    Button,
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    UncontrolledTooltip
} from "reactstrap";

import {
    Briefcase,
    Mail,
    Home,
    MapPin,
    MessageSquare,
    Phone
} from "react-feather";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFacebook
} from "@fortawesome/free-brands-svg-icons";

import avatar2 from "../../../../assets/img/avatars/avatar-2.jpg";

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
                Profile Details
            </CardTitle>
        </CardHeader>
        <CardBody className="text-center">
            <img
                src={avatar2}
                alt="Nguyen Ngoc Duy"
                className="img-fluid rounded-circle mb-2"
                width="128"
                height="128"
            />
            <CardTitle tag="h5" className="mb-0">
                Nguyen Ngoc Duy
            </CardTitle>
            <div className="text-muted mb-2">duy.nguyenngoc1 - VA13020073</div>
            <div className="text-muted mb-1">Mentee</div>
            <div>
                <Button size="sm" color="primary">
                    <MessageSquare width={16} height={16} /> Message
                </Button>
            </div>
        </CardBody>

        <hr className="my-0" />
        <CardBody>
            <CardTitle tag="h5">About</CardTitle>
            <ul className="list-unstyled mb-0">
                <li className="mb-1">
                    <Home width={14} height={14} className="mr-1" /> Male
                </li>

                <li className="mb-1">
                    <Home width={14} height={14} className="mr-1" /> Was born on{" "}
                    <span className="text-right text-primary" to="#">December 20th, 1996</span>
                </li>

                <li className="mb-1">
                    <Home width={14} height={14} className="mr-1" /> Lives in{" "}
                    <span className="text-right text-primary" to="#">Duong Noi, Ha Dong, Ha Noi</span>
                </li>

                <li className="mb-1">
                    <MapPin width={14} height={14} className="mr-1" /> Studied in{" "}
                    <Link to={{ pathname: "https://www.google.com/maps/place/%C4%90%E1%BA%A1i+h%E1%BB%8Dc+Qu%E1%BB%91c+gia+H%C3%A0+N%E1%BB%99i/@21.0376763,105.7794414,17z/data=!3m1!4b1!4m5!3m4!1s0x313454b55b011e49:0x9406c12dc4604160!8m2!3d21.0376713!4d105.7816301" }} target="_blank">UET University</Link>

                </li>

                <li className="mb-1">
                    <MapPin width={14} height={14} className="mr-1" /> From{" "}
                    <span className="text-right text-primary" to="#">Nam Dinh</span>

                </li>

                <li className="mb-1">
                    <Briefcase width={14} height={14} className="mr-1" /> Works at{" "}
                    <Link to={{ pathname: "https://www.google.com/maps/place/19+L%C3%AA+Thanh+Ngh%E1%BB%8B,+B%C3%A1ch+Khoa,+Hai+B%C3%A0+Tr%C6%B0ng,+H%C3%A0+N%E1%BB%99i,+Vi%E1%BB%87t+Nam/@21.0031141,105.8479528,17z/data=!3m1!4b1!4m5!3m4!1s0x3135ac748cd9d447:0xaf1371c17f07550c!8m2!3d21.0031091!4d105.8501415" }} target="_blank">VTI Academy</Link>
                </li>
            </ul>
        </CardBody>

        <hr className="my-0" />
        <CardBody>
            <CardTitle tag="h5">Contacts</CardTitle>
            <ul className="list-unstyled mb-0">
                <li className="mb-1">
                    <Phone width={14} height={14} className="mr-1" /> Phone:{" "}
                    <span className="text-right text-primary" to="#">033.278.2798</span>
                </li>

                <li className="mb-1">
                    <Mail width={14} height={14} className="mr-1" /> Email:{" "}
                    <span className="text-right text-primary" to="#">duy.nguyenngoc1@vti.com.vn</span>
                </li>

                <li className="mb-1">
                    <FontAwesomeIcon icon={faFacebook} fixedWidth className="mr-1" />
                    <Link to={{ pathname: "https://www.facebook.com/duynn2012" }} target="_blank">Facebook</Link>
                </li>
            </ul>
        </CardBody>

        <hr className="my-0" />
        <CardBody>
            <CardTitle tag="h5">Learning</CardTitle>
            <ul className="list-unstyled mb-0">
                <li className="mb-1">
                    <Phone width={14} height={14} className="mr-1" /> Joined on:{" "}
                    <span id="tooltip_joined_on" className="text-right text-primary" to="#">December 20th, 2020</span>
                    <UncontrolledTooltip
                        placement={"bottom"}
                        target={"tooltip_joined_on"}>
                        3 months ago!
                    </UncontrolledTooltip>
                </li>

                <li className="mb-1">
                    <Mail width={14} height={14} className="mr-1" /> Status:{" "}
                    <span className="text-right text-primary" to="#">Active</span>
                </li>

                <li className="mb-1">
                    <Mail width={14} height={14} className="mr-1" /> Level:{" "}
                    <span className="text-right text-primary" to="#">IT</span>
                </li>

                <li className="mb-1">
                    <Mail width={14} height={14} className="mr-1" /> Class:{" "}
                    <span className="text-right text-primary" to="#">Rocket 10</span>
                </li>

                <li className="mb-1">
                    <Mail width={14} height={14} className="mr-1" /> Lesson:{" "}
                    <span className="text-right text-primary" to="#">Advanced Java - Lesson 8</span>
                </li>

                <li className="mb-1">
                    <Mail width={14} height={14} className="mr-1" /> Employment Status:{" "}
                    <span className="text-right text-primary" to="#">Not Yet</span>
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
            <Badge color="primary" className="mr-1 my-1">
                Advanced Java
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