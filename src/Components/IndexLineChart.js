import { useEffect } from "react";
import { Line } from "react-chartjs-2";

function IndexLineChart({ data, text, changeData }) {
    console.log(data, text, changeData);
    return (
        <div
            style={{
                backgroundColor:
                    changeData[1] - changeData[0] > 0 ? "#73D13D" : "#FF4D4F",
            }}
        >
            <span
                style={{
                    margin: 0,
                    fontWeight: "bold",
                    color: "white",
                    fontSize: "1.5em",
                }}
            >
                {text}
            </span>
            <p style={{ margin: 0, fontWeight: "bold", color: "white" }}>
                $
                {String(changeData[1].toFixed(2)).replace(
                    /(.)(?=(\d{3})+$)/g,
                    "$1,"
                )}
                <span> </span>(
                {((changeData[1] - changeData[0]) / 100).toFixed(2)}%)
            </p>

            <Line
                options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false,
                        },
                        title: {
                            display: false,
                        },
                        tooltip: {
                            enabled: false,
                        },
                    },
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            display: false,
                        },
                        y: {
                            display: false,
                        },
                    },
                    elements: {
                        point: {
                            pointRadius: 0,
                        },
                        line: {
                            borderColor: "#FFF",
                        },
                    },
                }}
                data={data}
            />
        </div>
    );
}

export default IndexLineChart;
