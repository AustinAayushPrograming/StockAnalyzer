import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import FilledInput from "@mui/material/FilledInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import { Button, CircularProgress } from "@mui/material";
import Chart from "react-apexcharts";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
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
import { Table } from "react-bootstrap";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const indexes = { SP500: "^GSPC", DowJones: "^DJI", Nasdaq: "^IXIC" };
const table = {
  0: "previousClose",
  1: "marketCap",
  2: "open",
  3: "beta",
  4: "bidSize",
  5: "pegRatio",
  6: "askSize",
  7: "trailingEps",
  8: "SandP52WeekChange",
  9: "dividendYield",
  10: "averageVolume",
  11: "volume",
};

const baseURL = "http://stock-analyzer-api-aap.herokuapp.com/";

function Gauge() {
  const [labels, setLabels] = useState();
  const [values, setValues] = useState();
  const [indexSP500, setIndexSP500] = useState();
  const [indexDOW, setIndexDOW] = useState();
  const [indexNASDAQ, setIndexNASDAQ] = useState();
  const [loading, setLoading] = useState(false);
  const ticker = useRef("");

  const handleSubmit = (event) => {
    if (ticker.current.value) {
      setLoading(true);
      setLabels([]);
      let reqURL = baseURL + "data/" + ticker.current.value;

      let result = [];

      axios.get(reqURL).then((response) => {
        let data = response.data["data"];
        data.map((test) => {
          var utcSeconds = test[0];
          var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
          d.setUTCSeconds(utcSeconds);
          result.push({
            x: new Date(d),
            y: [test[1], test[2], test[3], test[4]],
          });
        });
        setLabels(result);
      });

      let newReqURL = baseURL + "info/" + ticker.current.value;
      axios.get(newReqURL).then((response) => {
        let result = [];
        let i = 0;
        while (i < 12) {
          console.log(table[i]);
          console.log(response.data["name"]);
          result.push(response.data["name"][table[i]]);
          i++;
        }
        setValues(result);
        setLoading(false);
      });
    }
  };

  const getData = (name) => {
    let reqURL = baseURL + "index/" + indexes[name];

    axios.get(reqURL).then((response) => {
      let data = {
        labels: response.data["labels"],
        datasets: [
          {
            label: "Price",
            data: response.data["data"],
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
        ],
      };

      if (name == "SP500") {
        setIndexSP500(data);
      } else if (name == "DowJones") {
        setIndexDOW(data);
      } else if (name == "Nasdaq") {
        setIndexNASDAQ(data);
      }
    });
  };

  useEffect(() => {
    getData("SP500");
    getData("DowJones");
    getData("Nasdaq");
  }, []);

  return (
    <div className="bodyContainer">
      <div className="cardContainer">
        <Row className="divContainer">
          <Col md={6}>
            <span>Stock Analyzer</span>
          </Col>
          <Col md={6}>
            <div className="inputSide">
              <FormControl
                sx={{ flexDirection: "row", height: "60px" }}
                variant="filled"
              >
                <InputLabel htmlFor="filled-adornment-amount">
                  Ticker
                </InputLabel>
                <FilledInput
                  sx={{
                    width: "200px",
                    borderTopRightRadius: "0px",
                    borderBottomRightRadius: "0px",
                    outline: "none",
                  }}
                  inputRef={ticker}
                  id="outlined-adornment-amount"
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                  onChange={(e) => {
                    ticker.current.value = e.target.value;
                  }}
                />
                <Button
                  sx={{
                    width: "100px",
                    height: "60px",
                    borderTopLeftRadius: "0px",
                    borderBottomLeftRadius: "0px",
                  }}
                  variant="outlined"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </FormControl>
            </div>
            {loading ? <CircularProgress /> : null}
          </Col>
        </Row>
        {labels && values ? (
          <Row className="contentContainer">
            <Col xl={8}>
              <div className="chartContainer">
                <Chart
                  options={{
                    chart: {
                      type: "candlestick",
                      height: 650,
                    },
                    title: {
                      text: "CandleStick Chart",
                      align: "left",
                    },
                    xaxis: {
                      type: "datetime",
                    },
                    yaxis: {
                      tooltip: {
                        enabled: true,
                      },
                    },
                  }}
                  series={[
                    {
                      data: labels,
                    },
                  ]}
                  type="candlestick"
                  height={"600px"}
                  width={"100%"}
                />
              </div>
            </Col>
            <Col xl={4}>
              <Table striped bordered hover size="lg">
                <tbody>
                  <tr>
                    <td>Previous Close</td>
                    <td>${values[0] ? values[0] : "-"}</td>
                  </tr>
                  <tr>
                    <td>Market Cap</td>
                    <td>${values[1] ? values[1] : "-"}</td>
                  </tr>
                  <tr>
                    <td>Open</td>
                    <td>${values[2] ? values[2] : "-"}</td>
                  </tr>
                  <tr>
                    <td>Beta</td>
                    <td>{values[3] ? values[3] : "-"}</td>
                  </tr>
                  <tr>
                    <td>Bid Size</td>
                    <td>{values[4] ? values[4] : "-"}</td>
                  </tr>
                  <tr>
                    <td>PEG Ratio</td>
                    <td>{values[5] ? values[5] : "-"}</td>
                  </tr>
                  <tr>
                    <td>Ask Size</td>
                    <td>{values[6] ? values[6] : "-"}</td>
                  </tr>
                  <tr>
                    <td>Trailing EPS</td>
                    <td>{values[7] ? values[7] : "-"}</td>
                  </tr>
                  <tr>
                    <td>52 Week Change</td>
                    <td>{values[8] ? values[8] : "-"}</td>
                  </tr>
                  <tr>
                    <td>Dividend Yield</td>
                    <td>{values[9] ? values[9] : "-"}</td>
                  </tr>
                  <tr>
                    <td>Average Volume</td>
                    <td>{values[10] ? values[10] : "-"}</td>
                  </tr>
                  <tr>
                    <td>Volume</td>
                    <td>{values[11] ? values[11] : "-"}</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        ) : null}
        {indexSP500 && indexDOW && indexNASDAQ ? (
          <>
            <Row>
              <Col
                xl={12}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "2.5em",
                  fontWeight: "bolder",
                }}
              >
                Indexes
              </Col>
            </Row>
            <Row className="indexContainer">
              <Col xl={4}>
                <div>
                  <Line
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          display: false,
                        },
                        title: {
                          display: true,
                          text: "S&P500 Index",
                        },
                      },
                      maintainAspectRatio: false,
                    }}
                    data={indexSP500}
                  />
                </div>
              </Col>
              <Col xl={4}>
                <div>
                  <Line
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          display: false,
                        },
                        title: {
                          display: true,
                          text: "Dow Jones",
                        },
                      },
                      maintainAspectRatio: false,
                    }}
                    data={indexDOW}
                  />
                </div>
              </Col>
              <Col xl={4}>
                <div>
                  <Line
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          display: false,
                        },
                        title: {
                          display: true,
                          text: "NASDAQ Composite",
                        },
                      },
                      maintainAspectRatio: false,
                      scaleShowLabels: false,
                    }}
                    data={indexNASDAQ}
                  />
                </div>
              </Col>
            </Row>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default Gauge;
