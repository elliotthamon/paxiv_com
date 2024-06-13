const CameraIC = (props: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="34"
      height="34"
      viewBox="0 0 34 34"
      fill="none"
      {...props}
      className="cursor-pointer"
    >
      <g clipPath="url(#clip0_194_2077)">
        <path
          d="M17.0001 28.0769H7.30774C6.5733 28.0769 5.86893 27.7852 5.3496 27.2659C4.83027 26.7465 4.53851 26.0422 4.53851 25.3077V12.8462C4.53851 12.1117 4.83027 11.4074 5.3496 10.888C5.86893 10.3687 6.5733 10.0769 7.30774 10.0769H8.69236C9.42681 10.0769 10.1312 9.78518 10.6505 9.26585C11.1698 8.74652 11.4616 8.04216 11.4616 7.30771C11.4616 6.94049 11.6075 6.58831 11.8671 6.32864C12.1268 6.06897 12.479 5.9231 12.8462 5.9231H21.1539C21.5211 5.9231 21.8733 6.06897 22.133 6.32864C22.3926 6.58831 22.5385 6.94049 22.5385 7.30771C22.5385 8.04216 22.8303 8.74652 23.3496 9.26585C23.8689 9.78518 24.5733 10.0769 25.3077 10.0769H26.6924C27.4268 10.0769 28.1312 10.3687 28.6505 10.888C29.1698 11.4074 29.4616 12.1117 29.4616 12.8462V17.6923"
          stroke={props.color ?? "white"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22.5385 26.6921H30.8462"
          stroke={props.color ?? "white"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M26.6923 22.5383V30.846"
          stroke={props.color ?? "white"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.8462 18.3846C12.8462 19.4862 13.2838 20.5428 14.0628 21.3218C14.8418 22.1008 15.8984 22.5384 17 22.5384C18.1017 22.5384 19.1583 22.1008 19.9373 21.3218C20.7162 20.5428 21.1539 19.4862 21.1539 18.3846C21.1539 17.2829 20.7162 16.2263 19.9373 15.4473C19.1583 14.6683 18.1017 14.2307 17 14.2307C15.8984 14.2307 14.8418 14.6683 14.0628 15.4473C13.2838 16.2263 12.8462 17.2829 12.8462 18.3846Z"
          stroke={props.color ?? "white"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_194_2077">
          <rect
            width="33.2308"
            height="33.2308"
            fill={props.color ?? "white"}
            transform="translate(0.384644 0.384521)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default CameraIC;
