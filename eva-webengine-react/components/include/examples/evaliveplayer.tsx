import { EvaLivePlayer } from "@eva-ics/webengine-react";
import { useState } from "react";
import { type EvaVideoStreamInfo } from "@eva-ics/webengine-multimedia";
import {
  EvaLivePlayer as EvaLivePlayerC,
  EvaPlayerAutoSize
} from "@eva-ics/webengine-multimedia";

const CustomVideoPlayer = () => {
  const [streamInfo, setStreamInfo] = useState(null);
  const [player, setPlayer] = useState(null);
  const [playing, setPlaying] = useState(true);

  let info = null;

  if (streamInfo) {
    info = (
      <>
        {streamInfo.width}x{streamInfo.height} {streamInfo.codec}{" "}
        {streamInfo.hardwareAcceleration ? "HW" : "SW"}
      </>
    );
  }

  return (
    <>
      <div
        style={{ position: "relative" }}
        onClick={() => {
          if (player) {
            player.togglePause();
            setPlaying(player.isPlaying());
          }
        }}
      >
        <div
          style={{
            position: "absolute",
            right: 40,
            fontWeight: "bold",
            fontSize: playing ? 24 : 50,
            textShadow: "0 0 2px #000;",
            color: "orange",
            top: playing? 10 : 0,
            textAlign: "right",
            display: "inline-block"
          }}
        >
          {player && (playing ? "" : "⏸")}
        </div>
        <EvaLivePlayer
          width="640"
          height="480"
          oid="sensor:streams/s0"
          style={{ backgroundColor: "black" }}
          setPlayer={setPlayer}
          autoSize={EvaPlayerAutoSize.None}
          onChange={(info: EvaVideoStreamInfo) => {
            console.log("Stream changed:", info);
            setStreamInfo(info);
          }}
        />
        <div>{info}</div>
      </div>
    </>
  );
}
