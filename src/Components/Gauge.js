import axios from "axios";
import  GaugeChart from 'react-gauge-chart';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';


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
    }, []);

    return (
        <div style={{ width: '700px', margin: "auto" }}>
        <FormControl sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Ticker</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            value = {ticker}
            onChange={(e) => setTicker(e.target.value)}
            label="Ticker"
          />
        </FormControl>
            <Card sx={{ maxWidth: 500 }}>
            <GaugeChart id="gauge-chart3" 
                nrOfLevels={4} 
                colors={["#FF5F6D", "#FFC371", "#7FF782", "#00FF06"]} 
                arcWidth={0.25} 
                percent={0.9}
                needleColor = {"#000000"}
                hideText
            />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    Trend Points
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    Trend points are calculated by testing the stock's underlying metrics against some basic financial standards such as EMA, SMA, ROC, and more.
                    </Typography>
                </CardContent>
            </Card>
            {trendPoint ? (
                <p>{trendPoint["data"]}</p>
            ):(null)}
        </div>
    )
}

export default Gauge
