interface EvaLivePlayerParams {
  oid: string;
  streamName?: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  style?: React.CSSProperties;
  autoSize?: EvaPlayerAutoSize;
  engine?: Eva;
  onError?: (error: EvaError) => void;
  onFrame?: () => void;
  onEOS?: () => void;
  onChange?: (info: EvaVideoStreamInfo) => void;
  onInit?: (canvas: HTMLCanvasElement) => void;
  setPlayer?: (player: EvaLivePlayerC) => void;
  decoderHardwareAcceleration?: boolean;
  decoderFallbackToSoftware?: boolean;
}
