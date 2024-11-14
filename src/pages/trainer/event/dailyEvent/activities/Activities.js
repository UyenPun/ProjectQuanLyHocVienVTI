import React, { useState } from "react";


import {
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import classnames from "classnames";

import Learning from "./Learning";
import Tuition from "./Tuition";
import Other from "./Other";

const Activities = () => {

  const [activeTab, setActiveTab] = useState("1");
  const toggleActiveTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  }

  return (
    <div className={"tab tab-primary"}>
      <Nav tabs >
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "1" })}
            onClick={() => toggleActiveTab("1")}>
            Tuition
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "2" })}
            onClick={() => toggleActiveTab("2")}>
            Learning
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "3" })}
            onClick={() => toggleActiveTab("3")}>
            Other
          </NavLink>
        </NavItem>
      </Nav>

      <TabContent activeTab={activeTab} className="mytab-primary">
        <TabPane tabId="1">
          <Tuition />
        </TabPane>

        <TabPane tabId="2">
          <Learning />
        </TabPane>

        <TabPane tabId="3">
          <Other />
        </TabPane>

      </TabContent>
    </div>
  )
};

export default Activities;
