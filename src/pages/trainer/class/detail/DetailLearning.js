import React, { useState } from "react";
import classnames from "classnames";

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
import ScrollMenu from 'react-horizontal-scrolling-menu';
import { AttendanceData } from "./data";
import {
    Check
} from "react-feather";

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
            name: "Sumup",
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
                    Sumup
                </TabPane>
                <TabPane tabId="2">
                    <Attendance />

                </TabPane>
                <TabPane tabId="3">
                    <h4 className="tab-title mytab-title">Average</h4>
                    <Attendance />

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

const Attendance = (props) => {

    // for (let index = 0; index < props.item.attendance.length; index++) {

    //   const date = props.item.attendance.date

    // }

    const Item = (props) => {

        const item = props.item;

        return <>

            <div id={`attendance-${item.id}`} className="scrollview-header">
                {item.date}
            </div>

            <div className={classnames(
                "scrollview-item")}>{item.attendance.type}</div>

            <div
                className={classnames(
                    "scrollview-item")}>
                {item.attendance.date}
            </div>

            {/* tooltip */}
            <UncontrolledTooltip
                placement={"bottom"}
                target={`attendance-${props.item.id}`}>
                {props.item.attendance.lesson}
            </UncontrolledTooltip>
        </>
    };

    const renderMenu = () => {

        const header = "TODO";
        const items = AttendanceData.map((item, index) => {
            return <div className="arrow-prev" key={index}>
                <Item item={item} />
            </div>
        });

        return (
            <>
                {header}
                {items}
            </>
        );
    }


    return <>
        <CardBody>
            <CardTitle className="mytab-title" tag="h5" style={{ fontWeight: "bold" }}>Schedule</CardTitle>

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

export default DetailLearning;