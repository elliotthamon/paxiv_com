const PageLeftIC = (props: any) => {
  return (
    <svg
      fill={props.color}
      width="25px"
      height="25px"
      viewBox="0 0 24 24"
      id="left-arrow"
      data-name="Flat Line"
      className="icon flat-line mt-0.5"
      {...props}
    >
      <line
        id="primary"
        x1="21"
        y1="12"
        x2="3"
        y2="12"
        style={{
          fill: "none",
          stroke: props.color,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: 2,
        }}
      ></line>
      <polyline
        id="primary-2"
        data-name="primary"
        points="6 9 3 12 6 15"
        style={{
          fill: "none",
          stroke: props.color,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: 2,
        }}
      ></polyline>
    </svg>
  );
};

export default PageLeftIC;
