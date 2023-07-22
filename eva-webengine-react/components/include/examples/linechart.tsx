import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import "chartjs-adapter-date-fns";
import { LineChart } from "@eva-ics/webengine-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  Title,
  Tooltip,
  Legend
);

const MyBlock = () => {
  const chart_oids = ["sensor:tests/temp", "sensor:tests/temp2"];
  return (
    <>
      <LineChart
        oid={chart_oids}
        timeframe="1T"
        fill="1S:2"
        title="int.temp"
        update={2}
        colors={["rgba(0,165,255, 0.5)", "rgba(255,165,0, 0.5)"]}
        labels={["sensor#1", "sensor#2"]}
        options={{
          responsive: true,
          animations: false
        }}
      />
      ;
    </>
  );
};
