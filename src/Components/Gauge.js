import axios from "axios";
import GaugeChart from "react-gauge-chart";
import React, { useState, useEffect, useCallback, useRef } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import faker from "faker";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

const baseURL = "http://stock-analyzer-api-aap.herokuapp.com/data/";

function Gauge() {
    const [trendPoint, setTrendPoint] = useState();
    const [ticker, setTicker] = useState("");
    const [minValue, maxValue] = [-3, 3];

    useEffect(() => {
        let reqURL = baseURL + ticker;

        axios.get(reqURL).then((response) => {
            setTrendPoint(response.data);
        });
    }, [ticker]);

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );

    const labels = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
    ];

    const data = {
        labels,
        datasets: [
            {
                label: "Price",
                data: labels.map(() =>
                    faker.datatype.number({ min: -1000, max: 1000 })
                ),
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
        },
    };

    return (
        <div className="flex-col m-auto w-[500px] flex justify-center items-center h-screen">
            <p className="font-bold text-5xl drop-shadow-md">Stock Analyzer</p>
            <FormControl sx={{ width: 1, marginY: 5 }}>
                <InputLabel htmlFor="outlined-adornment-amount">
                    Ticker
                </InputLabel>
                <OutlinedInput
                    id="outlined-adornment-amount"
                    startAdornment={
                        <InputAdornment position="start">$</InputAdornment>
                    }
                    value={ticker}
                    onChange={(e) => setTicker(e.target.value)}
                    label="Ticker"
                />
            </FormControl>
            <Line className="mb-7" data={data} options={options} />
            <GaugeChart
                className=""
                id="gauge-chart3"
                nrOfLevels={4}
                colors={["#FF5F6D", "#FFC371", "#7FF782", "#00FF06"]}
                arcWidth={0.25}
                percent={0.5}
                needleColor={"#000000"}
                hideText
            />
            {trendPoint ? <p>{trendPoint["data"]}</p> : null}
        </div>
    );
}

export default Gauge;
