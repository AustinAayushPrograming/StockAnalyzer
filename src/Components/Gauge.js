import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
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
import TopContainer from "./TopContainer";
import MainContainer from "./MainContainer";
import IndexContainer from "./IndexContainer";
import { useTransition, animated } from "react-spring";
import { maxHeight } from "@mui/system";

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
const AnimatedIndexContainer = animated(IndexContainer);

function Gauge() {
  const [labels, setLabels] = useState();
  const [values, setValues] = useState();
  const [indexSP500, setIndexSP500] = useState();
  const [indexDOW, setIndexDOW] = useState();
  const [indexNASDAQ, setIndexNASDAQ] = useState();
  const [loading, setLoading] = useState(false);
  // 0 -> SandP, 1 -> DOW, 2 -> NASDAQ
  const [changeData, setChangeData] = useState({});
  const ticker = useRef("");
  const showIndex = indexSP500 && indexDOW && indexNASDAQ ? true : false;
  const showContent = labels && values ? true : false;
  const transitionGraph = useTransition(showIndex, {
    from: { x: -800, y: 0, opacity: 0 },
    enter: { x: 0, y: 0, opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 1000 },
  });
  const transitionContent = useTransition(showContent, {
    from: { x: -800, y: 0, opacity: 0 },
    enter: { x: 0, y: 0, opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 1000 },
    delay: 1000,
  });

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
            data: response.data["data"],
            borderColor: "rgb(255, 255, 255)",
          },
        ],
      };

      let result = [response.data["data"][0], response.data["data"].at(-1)];
      let temp = changeData;
      temp[name] = result;
      setChangeData(temp);

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
      <div id="card_container" className="cardContainer">
        <TopContainer
          ticker={ticker}
          loading={loading}
          handleSubmit={handleSubmit}
        />
        {transitionContent((style, item) =>
          item ? (
            <MainContainer labels={labels} values={values} style={style} />
          ) : null
        )}
        {transitionGraph((style, item) =>
          item ? (
            <AnimatedIndexContainer
              indexSP500={indexSP500}
              indexDOW={indexDOW}
              indexNASDAQ={indexNASDAQ}
              result={changeData}
              style={style}
            />
          ) : null
        )}
      </div>
    </div>
  );
}

export default Gauge;
