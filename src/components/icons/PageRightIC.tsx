const PageRightIC = (props: any) => {
  return (
    <svg
      fill={props.color}
      width="25px"
      height="25px"
      viewBox="0 0 24 24"
      id="right-arrow"
      data-name="Flat Line"
      xmlns="http://www.w3.org/2000/svg"
      className="icon flat-line mt-0.5"
      {...props}
    >
      <line
        id="primary"
        x1="3"
        y1="12"
        x2="21"
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
        points="18 15 21 12 18 9"
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

export default PageRightIC;
