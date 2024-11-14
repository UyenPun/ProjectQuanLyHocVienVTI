import React from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  Table,
  CardBody
} from "reactstrap";
import { tableData } from "./data";

const Class = () => {
  return (
    <Card className="flex-fill w-100">
      <CardHeader>
        <CardTitle tag="h5" className="mb-0">
          Latest Lessons
        </CardTitle>
      </CardHeader>
      <CardBody>
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
      </CardBody>
    </Card>
  )
};

export default Class;
