interface ItemValueDisplay {
  oid?: string;
  state?: ItemState,
  label?: string;
  units?: string;
  formula?: string;
  className?: string;
  format_with?: (value: any) => any;
  set_color_with?: (value: any) => string | undefined;
  set_class_name_with?: (value: any) => string | undefined;
  digits?: number;
  threshold?: Array<ItemValueThreshold>;
  position?: CanvasPosition; // used by Canvas only
  css_class?: string; // ignored in ItemValueTable
}
