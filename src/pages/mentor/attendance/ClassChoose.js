import React, { useState, useEffect } from "react";

import classnames from "classnames";

import {
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane
} from "reactstrap";

import ScrollMenu from 'react-horizontal-scrolling-menu';

import ClassInfo from "./ClassInfo";

const ClassChoose = (props) => {

    const [activeClassId, setActiveClassId] = useState();
    const toggleActiveClass = (id) => {
        if (activeClassId !== id) {
            setActiveClassId(id);
        }
    }

    const classes = props.classes;

    // reset activeClassId when course changing
    useEffect(() => {
        setActiveClassId(null);
    }, [classes]);

    const ClassTab = (props) => {

        const clazz = classes[props.index];

        return (
            <NavItem>
                <NavLink
                    className={classnames({ active: activeClassId === clazz.id })}
                    onClick={() => { toggleActiveClass(clazz.id); }}
                >
                    {clazz.name}
                </NavLink>
            </NavItem>
        );
    };

    const renderClassTabs = () =>
        [...Array(classes.length).keys()].map(index => {
            return <ClassTab index={index} key={index} />
        });

    return (
        <>
            <h4 style={{ color: "black" }}>Classes</h4>
            {!classes || classes.length === 0
                ? "There are no classes in this course"
                : (
                    <div className={"tab"}>
                        {/* Class */}
                        <Nav tabs className={"scrollMenu-container"}>
                            <ScrollMenu
                                alignCenter={false}
                                clickWhenDrag={true}
                                dragging={true}
                                hideArrows={true}
                                hideSingleArrow={true}
                                wheel={false}
                                data={renderClassTabs()}
                            />
                        </Nav>

                        <hr />
                        {/* Detail Class */}
                        {activeClassId && (
                            <TabContent activeTab={activeClassId} className="mytab-primary" style={{ border: "none", padding: 0, boxShadow: "none" }}>
                                <TabPane tabId={activeClassId}>
                                    <div className={"reset-tab-primary"}>
                                        <ClassInfo classId={activeClassId} />
                                    </div>
                                </TabPane>
                            </TabContent>
                        )}
                    </div>
                )
            }

        </>
    );
};

export default ClassChoose;