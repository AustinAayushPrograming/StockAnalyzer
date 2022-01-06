import React from "react";
import { Col, Row } from "react-bootstrap";
import { Line } from "react-chartjs-2";

function IndexContainer({ indexDOW, indexNASDAQ, indexSP500 }) {
  return (
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
  );
}

export default IndexContainer;
