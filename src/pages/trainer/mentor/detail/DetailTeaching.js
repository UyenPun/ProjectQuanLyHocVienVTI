import React, { useState } from "react";
import classnames from "classnames";

import {
    Button,
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
    Check,
    Home
} from "react-feather";


const DetailTeaching = (props) => {

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
            name: "2019",
            isActive: true,
            isCheck: true
        },
        {
            id: "3",
            name: "2020",
            isActive: true,
            isCheck: true
        },
        {
            id: "4",
            name: "2021",
            isActive: true,
            isCheck: true
        },
        
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
                    <Comment />
                </TabPane>
                <TabPane tabId="3">
                    <Attendance />
                    <Comment />
                </TabPane>
                <TabPane tabId="4">
                    <Attendance />
                    <Comment />
                </TabPane>
            </TabContent>
        </div>
    };

    return <Card>
        <CardHeader>
            <CardTitle tag="h5" className="mb-0">
                Teaching Details
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
            <span className="text-right text-primary" to="#">Rocket 10, Railway 09</span>
        </li>

        <li className="mb-1">
            <Home width={14} height={14} className="mr-1" /> Total Mentee:{" "}
            <span className="text-right text-primary" to="#">36</span>
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
                className={classnames(
                    "scrollview-item ",
                    props.item.class === "A" ? "scrollview-highlight" : "")}>
                {props.item.class}
            </div>
            {/* tooltip */}
            <UncontrolledTooltip
                placement={"bottom"}
                target={`attendance-${props.item.id}`}>
                {props.item.time}
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

    // const renderArrowRight = () => {
    //     return <div className="arrow-next">
    //         <ChevronRight width={36} height={36} />
    //     </div>
    // };

    // const renderArrowLeft = () => {
    //     return <ChevronLeft width={36} height={36} />
    // };

    return <>
        <CardBody>
        <CardTitle className="mytab-title" tag="h5" style={{ fontWeight: "bold" }}>Month</CardTitle>
            <Button color="primary" className="mr-1 my-1" >
                Tháng 1
            </Button>
            <Button color="primary" className="mr-1 my-1">
                Tháng 2
            </Button>
            <Button color="primary" className="mr-1 my-1">
                Tháng 3
            </Button>
            <Button color="primary" className="mr-1 my-1">
                Tháng 4
            </Button>
            <Button color="primary" className="mr-1 my-1">
                Tháng 5
            </Button>
            <Button color="primary" className="mr-1 my-1">
                Tháng 6
            </Button>
            <Button color="primary" className="mr-1 my-1">
                Tháng 7
            </Button>
            <Button color="primary" className="mr-1 my-1">
                Tháng 8
            </Button>
            <Button color="primary" className="mr-1 my-1">
                Tháng 9
            </Button>
            <Button color="primary" className="mr-1 my-1">
                Tháng 10
            </Button>
            <Button color="primary" className="mr-1 my-1">
                Tháng 11
            </Button>
            <Button color="primary" className="mr-1 my-1">
                Tháng 12
            </Button>
            <CardTitle className="mytab-title" tag="h5" style={{ fontWeight: "bold" }}>Schedule</CardTitle>
            <ScrollMenu
                alignCenter={false}
                clickWhenDrag={true}
                wheel={false}
                dragging={true}
                hideArrows={true}
                hideSingleArrow={true}

                // arrowLeft={renderArrowLeft()}
                // arrowRight={renderArrowRight()}
                data={renderMenu()}
            />

            <br /><p>Comment...</p>
        </CardBody>
    </>
}


const Comment = () => {
    return <>
        <hr className="my-0" />
        <CardBody>
            <CardTitle className="mytab-title" tag="h5" style={{ fontWeight: "bold" }}>Mentor's Comment</CardTitle>
            <p>Đang thiết kế</p>
        </CardBody>
    </>
}

export default DetailTeaching;