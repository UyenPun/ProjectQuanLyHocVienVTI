import React from "react";
import Chart from "react-apexcharts";

const PieChart = (props) => {

    const options = {
        dataLabels: {
            enabled: true
        },
        labels: [...props.labels]
    };

    return (
        <>
            <Chart options={options} series={props.data} type="pie" height="245" />
            <div className="text-center">
                <span className="mb-2">Total mentees: 1000</span>
            </div>
        </>
    )
};

export default PieChart;