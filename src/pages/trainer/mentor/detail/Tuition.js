import React from "react";
import {
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    UncontrolledTooltip
} from "reactstrap";

import {
    Home
} from "react-feather";
import ScrollMenu from 'react-horizontal-scrolling-menu';
import classnames from "classnames";
import { TuitionData } from "./data";

const Tuition = () => {

    const Item = (props) => {
        return <>
            <div id={`salary-${props.item.id}`}className="scrollview-header">
                {props.item.month}
                <UncontrolledTooltip
                        placement={"bottom"}
                        target={`salary-${props.item.id}`}>
                        {props.item.date}
                    </UncontrolledTooltip>
            </div>
            <div
                className={classnames(
                    "scrollview-item ", props.item.date === "Unpaid" ? "scrollview-highlight" : "")}>
                {props.item.amount}
            </div>
        </>
    };

    const renderMenu = () =>
        TuitionData.map((item, index) => {
            return <div className="arrow-prev" key={index}>
                <Item item={item}/>
            </div>
        });

    return <Card>
        <CardHeader>
            <CardTitle tag="h5" className="mb-0">
                Tuition Details
            </CardTitle>
        </CardHeader>
        <CardBody>
            <ul className="list-unstyled mb-0">
                <li className="mb-1">
                    <Home width={14} height={14} className="mr-1" /> Payment Type:{" "}
                    <span className="text-right text-primary" to="#">Monthly</span>
                </li>

                <li className="mb-1">
                    <Home width={14} height={14} className="mr-1" /> Hourly salary:{" "}
                    <span className="text-right text-primary" to="#">170,000</span>
                </li>

            </ul>

            <br />
            <div>
                <ScrollMenu
                    alignCenter={true}
                    clickWhenDrag={true}
                    wheel={false}
                    dragging={true}
                    hideArrows={true}
                    hideSingleArrow={true}
                    data={renderMenu()}
                />
            </div>

        </CardBody>
    </Card>
}

export default Tuition;