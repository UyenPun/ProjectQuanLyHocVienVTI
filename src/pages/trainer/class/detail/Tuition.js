import React from "react";
import {
    Card,
    CardBody,
    CardHeader,
    CardTitle,
} from "reactstrap";

import {
    Home
} from "react-feather";
import ScrollMenu from 'react-horizontal-scrolling-menu';
import classnames from "classnames";
import { Link } from "react-router-dom";
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

    // const renderArrowRight = () => {
    //     return <div className="arrow-next">
    //         <ChevronRight width={36} height={36} />
    //     </div>
    // };

    // const renderArrowLeft = () => {
    //     return <ChevronLeft width={36} height={36} />
    // };

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
                    <Link to="#">4 times</Link>
                </li>

                <li className="mb-1">
                    <Home width={14} height={14} className="mr-1" /> Standard Tuition:{" "}
                    <Link to="#">32,000,000đ</Link>
                </li>

                <li className="mb-1">
                    <Home width={14} height={14} className="mr-1" /> Expected Tuition:{" "}
                    <Link to="#">25,600,000đ</Link>
                </li>

                <li className="mb-1">
                    <Home width={14} height={14} className="mr-1" /> Paied Tuition:{" "}
                    <Link to="#">18,000,000đ</Link>
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

                    // arrowLeft={renderArrowLeft()}
                    // arrowRight={renderArrowRight()}
                    data={renderMenu()}
                />
            </div>

        </CardBody>
    </Card>
}

export default Tuition;