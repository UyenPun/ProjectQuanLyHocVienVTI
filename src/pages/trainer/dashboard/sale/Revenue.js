import React from "react";
import { connect } from "react-redux";

import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown
} from "reactstrap";

import { MoreHorizontal } from "react-feather";
import { Line } from "react-chartjs-2";

const Revenue = ({ theme }) => {

  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun"
    ],
    datasets: [
      {
        label: "Sale",
        fill: true,
        backgroundColor: "transparent",
        borderColor: theme.primary,
        data: [
          200,
          300,
          500,
          400,
          435,
          780
        ]
      },
      {
        label: "Monthly Tuition",
        fill: true,
        backgroundColor: "transparent",
        borderColor: theme.tertiary,
        borderDash: [4, 4],
        data: [
          100,
          200,
          150,
          120,
          250,
          350
        ]
      }
    ]
  };

  const options = {
    maintainAspectRatio: false,
    legend: {
      display: false
    },
    tooltips: {
      intersect: false
    },
    hover: {
      intersect: true
    },
    plugins: {
      filler: {
        propagate: false
      }
    },
    scales: {
      xAxes: [
        {
          reverse: true,
          gridLines: {
            color: "rgba(0,0,0,0.05)"
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            stepSize: 200
          },
          display: true,
          borderDash: [5, 5],
          gridLines: {
            color: "rgba(0,0,0,0)",
            fontColor: "#fff"
          }
        }
      ]
    }
  };

  return (
    <Card className="flex-fill w-100">
      <CardHeader>
        <div className="card-actions float-right">
          <UncontrolledDropdown>
            <DropdownToggle tag="a">
              <MoreHorizontal />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>Weekly</DropdownItem>
              <DropdownItem>Monthly</DropdownItem>
              <DropdownItem>Yearly</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
        <CardTitle tag="h5" className="mb-0">
          Total Revenue
        </CardTitle>
      </CardHeader>
      <CardBody>
        <div className="chart">
          <Line data={data} options={options} />
        </div>
      </CardBody>
    </Card>
  );
};

export default connect(store => ({
  theme: store.theme.currentTheme
}))(Revenue);
