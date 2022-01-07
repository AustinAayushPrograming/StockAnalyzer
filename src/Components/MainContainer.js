import React from "react";
import { Col, Row, Table } from "react-bootstrap";
import Chart from "react-apexcharts";

function MainContainer({ labels, values }) {
    return (
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
                            <td>
                                $
                                {values[1]
                                    ? String(values[1]).replace(
                                          /(.)(?=(\d{3})+$)/g,
                                          "$1,"
                                      )
                                    : "-"}
                            </td>
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
                            <td>
                                {values[10]
                                    ? String(values[10]).replace(
                                          /(.)(?=(\d{3})+$)/g,
                                          "$1,"
                                      )
                                    : "-"}
                            </td>
                        </tr>
                        <tr>
                            <td>Volume</td>
                            <td>
                                {values[11]
                                    ? String(values[11]).replace(
                                          /(.)(?=(\d{3})+$)/g,
                                          "$1,"
                                      )
                                    : "-"}
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </Col>
        </Row>
    );
}

export default MainContainer;
