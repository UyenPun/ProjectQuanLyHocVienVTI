import React, { useState } from "react";

import {
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
    UncontrolledTooltip
} from "reactstrap";
import { Check, Home, CheckCircle, MinusCircle } from "react-feather";
import classnames from "classnames";

import ScrollMenu from 'react-horizontal-scrolling-menu';

import { AttendanceData, ScoreData } from "./data";

const DetailLearning = (props) => {

    const [activeTab, setActiveTab] = useState("1");
    const toggleActiveTab = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    }

    const tabHeaders = [
        {
            id: "1",
            name: "Sum up",
            isActive: true,
            isCheck: false
        },
        {
            id: "2",
            name: "SQL",
            isActive: true,
            isCheck: true
        },
        {
            id: "3",
            name: "Java Core",
            isActive: true,
            isCheck: false
        },
        {
            id: "4",
            name: "Frontend Basic",
            isActive: false,
            isCheck: false
        },
        {
            id: "5",
            name: "Advanced Java",
            isActive: false,
            isCheck: false
        },
        {
            id: "6",
            name: "ReactJS",
            isActive: false,
            isCheck: false
        },
        {
            id: "7",
            name: "Mock Project",
            isActive: false,
            isCheck: false
        }
    ];

    const TabHeader = (props) => {

        const header = tabHeaders[props.index];

        return <NavItem className={!header.isActive ? "nav-item-inactive" : ""}>
            <NavLink
                className={classnames(
                    { active: activeTab === header.id },
                    (!header.isActive ? "nav-link-inactive" : ""))}
                onClick={() => { toggleActiveTab(header.id); }}
                disabled={!header.isActive}>
                {header.name} {" "}
                {header.isCheck && <Check width={12} height={12} className="mr-1" />}
            </NavLink>
        </NavItem>
    };

    const renderTabHeaders = () =>
        [...Array(tabHeaders.length).keys()].map(index => {
            return <TabHeader index={index} key={index} />
        });

    const renderTab = () => {
        return <div className={"tab tab-primary"}>
            <Nav tabs className={"scrollMenu-container"}>
                <ScrollMenu
                    alignCenter={false}
                    clickWhenDrag={true}
                    dragging={true}
                    hideArrows={true}
                    hideSingleArrow={true}
                    wheel={false}
                    data={renderTabHeaders()}
                />
            </Nav>
            <TabContent activeTab={activeTab} className="mytab-primary">
                <TabPane tabId="1">
                    <Sumup />
                </TabPane>
                <TabPane tabId="2">
                    <Attendance />
                    <Score />
                    <MentorComment />
                </TabPane>
                <TabPane tabId="3">
                    <Attendance />
                    <Score />
                    <MentorComment />
                </TabPane>
                <TabPane tabId="4">
                    <h4 className="tab-title mytab-title">Good</h4>
                    4
                </TabPane>
                <TabPane tabId="5">
                    <h4 className="tab-title mytab-title">Very good</h4>
                    5
                </TabPane>
                <TabPane tabId="6">
                    <h4 className="tab-title mytab-title">Excellent</h4>
                    6
                </TabPane>
            </TabContent>
        </div>
    };

    return <Card>
        <CardHeader>
            <CardTitle tag="h5" className="mb-0">
                Learning Details
            </CardTitle>
        </CardHeader>
        <CardBody>
            {renderTab()}
        </CardBody>
    </Card>
}

const Sumup = () => {
    return <ul className="list-unstyled mb-0">
        <li className="mb-1">
            <Home width={14} height={14} className="mr-1" /> Class:{" "}
            <span className="text-right text-primary" to="#">Rocket 10</span>
        </li>

        <li className="mb-1">
            <Home width={14} height={14} className="mr-1" /> Total Absences:{" "}
            <span className="text-right text-primary" to="#">7/30</span>
        </li>

        <li className="mb-1">
            <Home width={14} height={14} className="mr-1" /> Average Score:{" "}
            <span className="text-right text-primary" to="#">7.5</span>
        </li>

        <li className="mb-1">
            <Home width={14} height={14} className="mr-1" /> Current lesson:{" "}
            <span className="text-right text-primary" to="#">Advanced Java - Lesson 8</span>
        </li>
    </ul>
}

const Attendance = () => {

    const Item = (props) => {
        return <>
            <div id={`attendance-${props.item.id}`} className="scrollview-header">
                {props.item.date}
            </div>
            <div
                className={classnames("scrollview-item ")}>
                {props.item.type === "P" ?
                    <CheckCircle className="text-right text-success" />
                    : <MinusCircle className="text-right text-danger" />
                }
            </div>
            {/* tooltip */}
            <UncontrolledTooltip
                placement={"bottom"}
                target={`attendance-${props.item.id}`}>
                {props.item.lesson}
            </UncontrolledTooltip>
        </>
    };

    const renderMenu = () => {
        return AttendanceData.map((item, index) => {
            return <div className="arrow-prev" key={index}>
                <Item item={item} />
            </div>
        });
    }

    return <>
        <CardBody>
            <CardTitle className="mytab-title" tag="h5" style={{ fontWeight: "bold" }}>Attendance</CardTitle>

            <ScrollMenu
                alignCenter={false}
                clickWhenDrag={true}
                wheel={false}
                dragging={true}
                hideArrows={true}
                hideSingleArrow={true}
                data={renderMenu()}
            />

            <br /><p>Number of Absences: 3/8</p>
        </CardBody>
    </>
}

const Score = () => {

    const Item = (props) => {
        return <>
            <div className="scrollview-header">
                {props.item.type}
            </div>
            <div
                className={classnames(
                    "scrollview-item ",
                    (props.item.score < 6 || props.item.score === "fail") ? "scrollview-highlight" : "")}>
                {props.item.score}
            </div>
        </>
    };

    const renderMenu = () =>
        ScoreData.map((item, index) => {
            return <div className="arrow-prev" key={index}>
                <Item item={item} />
            </div>
        });

    return <>
        <hr className="my-0" />
        <CardBody>
            <CardTitle className="mytab-title" tag="h5" style={{ fontWeight: "bold" }}>Score</CardTitle>

            <ScrollMenu
                alignCenter={false}
                clickWhenDrag={true}
                wheel={false}
                dragging={true}
                hideArrows={true}
                hideSingleArrow={true}

                data={renderMenu()}
            />
        </CardBody>
    </>
}

const MentorComment = () => {
    return <>
        <hr className="my-0" />
        <CardBody>
            <CardTitle className="mytab-title" tag="h5" style={{ fontWeight: "bold" }}>Mentor's Comment</CardTitle>
            <p>Nghỉ học nhiều</p>
        </CardBody>
    </>
}

export default DetailLearning;