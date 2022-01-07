import React from "react";
import { Col, Row } from "react-bootstrap";
import IndexLineChart from "./IndexLineChart";
import { animated } from "react-spring";

function IndexContainer({ indexDOW, indexNASDAQ, indexSP500, result, style }) {
  return (
    <animated.div style={style}>
      <hr></hr>
      <Row className="indexContainer">
        <Col xl={4}>
          <IndexLineChart
            data={indexSP500}
            text={"S&P 500"}
            changeData={result["SP500"]}
          />
        </Col>
        <Col xl={4}>
          <IndexLineChart
            data={indexDOW}
            text={"DOW JONES"}
            changeData={result["DowJones"]}
          />
        </Col>
        <Col xl={4}>
          <IndexLineChart
            data={indexNASDAQ}
            text={"NASDAQ"}
            changeData={result["Nasdaq"]}
          />
        </Col>
      </Row>
    </animated.div>
  );
}

export default IndexContainer;
