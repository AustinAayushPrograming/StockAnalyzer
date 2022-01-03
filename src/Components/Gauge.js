import axios from "axios";
import GaugeChart from "react-gauge-chart";
import React, { useState, useRef } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
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
import { Button } from "@mui/material";

const baseURL = "http://stock-analyzer-api-aap.herokuapp.com/data/";

function Gauge() {
    const [labels, setLabels] = useState();
    const [trendPts, setTrendPts] = useState();
    const [prices, setPrices] = useState();
    const ticker = useRef("");

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );

    const data = {
        labels,
        datasets: [
            {
                label: "Price",
                data: prices,
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
            title: {
                display: true,
                text: "Stock Name",
            },
        },
    };

    const handleSubmit = (event) => {
        setLabels([]);
        setPrices([]);
        let reqURL = baseURL + ticker.current.value;

        axios.get(reqURL).then((response) => {
            setLabels(response.data["datePrice"][0]);
            setPrices(response.data["datePrice"][1]);
            setTrendPts(response.data["trendPoints"]);
        });
    };

    return (
        <div className="flex-col m-auto w-[500px] flex justify-center items-center h-screen">
            <p className="font-bold text-5xl drop-shadow-md">Stock Analyzer</p>
            <FormControl sx={{ flexDirection: "row", width: 1, marginY: 5 }}>
                <InputLabel htmlFor="outlined-adornment-amount">
                    Ticker
                </InputLabel>
                <OutlinedInput
                    sx={{ width: 0.5 }}
                    inputRef={ticker}
                    id="outlined-adornment-amount"
                    startAdornment={
                        <InputAdornment position="start">$</InputAdornment>
                    }
                    onChange={(e) => {
                        ticker.current.value = e.target.value;
                    }}
                    label="Ticker"
                />
                <Button
                    sx={{ width: 0.5 }}
                    variant="outlined"
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
            </FormControl>
            {trendPts && (
                <Line className="mb-7" data={data} options={options} />
            )}
            <GaugeChart
                className=""
                id="gauge-chart3"
                nrOfLevels={4}
                colors={["#FF5F6D", "#FFC371", "#7FF782", "#00FF06"]}
                arcWidth={0.25}
                percent={trendPts ? Math.abs(trendPts) / 3 : 0.5}
                needleColor={"#000000"}
                hideText
            />
        </div>
    );
}

export default Gauge;
