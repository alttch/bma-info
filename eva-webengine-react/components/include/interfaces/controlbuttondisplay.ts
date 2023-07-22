interface ControlButtonDisplay {
  oid: string;
  params?: object; // used by ControlButtonRun only
  busy?: string; // used by ControlButtonRun only
  label?: string;
  kind?: ControlButtonKind;
  input_size?: number; // used by ControlButtonValue only
  position?: CanvasPosition; // used by Canvas only
  css_class?: string;
}
