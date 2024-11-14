import React from "react";

import {
    Card,
    CardBody,
    CardHeader,
    CardTitle,
} from "reactstrap";

import { Home } from "react-feather";
import classnames from "classnames";
import ScrollMenu from 'react-horizontal-scrolling-menu';

import { TuitionData } from "./data";

const Tuition = () => {

    const Item = (props) => {
        return <>
            <div className="scrollview-header">
                {props.item.date}
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
                <Item item={item} />
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
                    <span className="text-right text-primary" to="#">4 times</span>
                </li>

                <li className="mb-1">
                    <Home width={14} height={14} className="mr-1" /> Standard Tuition:{" "}
                    <span className="text-right text-primary" to="#">32,000,000đ</span>
                </li>

                <li className="mb-1">
                    <Home width={14} height={14} className="mr-1" /> Payable Tuition:{" "}
                    <span className="text-right text-primary" to="#">25,600,000đ</span>
                </li>

                <li className="mb-1">
                    <Home width={14} height={14} className="mr-1" /> Paied Tuition:{" "}
                    <span className="text-right text-primary" to="#">18,000,000đ</span>
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