import React from "react";

import {
  Table
} from "reactstrap";

import { tableData } from "./data";

const Learning = () => (
  <Table striped className="my-0">
    <thead>
      <tr>
        <th>Name</th>
        <th>Address</th>
        <th>Lesson</th>
        <th>Mentor</th>
        <th className="d-none d-xl-table-cell">Time</th>
      </tr>
    </thead>
    <tbody>
      {tableData.map((item) =>
        <tr key={item.id}>
          <td>{item.name}</td>
          <td>{item.address}</td>
          <td>{item.lesson}<br />{item.subject}</td>
          <td>{item.mentor}</td>
          <td className="d-none d-xl-table-cell">{item.time}</td>
        </tr>
      )}
    </tbody>
  </Table>
);

export default Learning;
