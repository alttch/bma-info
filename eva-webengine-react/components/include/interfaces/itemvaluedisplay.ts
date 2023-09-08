interface ItemValueDisplay {
  oid?: string;
  state?: ItemState,
  label?: string;
  units?: string;
  format_with?: (value: any) => any;
  digits?: number;
  threshold?: Array<ItemValueThreshold>;
  position?: CanvasPosition; // used by Canvas only
  css_class?: string; // ignored in ItemValueTable
}
