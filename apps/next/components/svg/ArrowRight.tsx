const ArrowRight = ({ className }: { className?: string }): JSX.Element => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 41.75 25.02"
    >
      <g>
        <path d="M0,12.45c40.65,0,40.65,0,40.65,0" />
        <rect y="11.7" width="40.65" height="1.5" />
      </g>
      <g>
        <path d="M29.04,0.99c12.02,12.02,12.02,12.02,12.02,12.02" />
        <rect
          x="26.55"
          y="6.25"
          transform="matrix(0.7071 0.7071 -0.7071 0.7071 15.2142 -22.7365)"
          width="17"
          height="1.5"
        />
      </g>
      <g>
        <path d="M29.12,24.06c12.02-12.02,12.02-12.02,12.02-12.02" />
        <rect
          x="26.63"
          y="17.3"
          transform="matrix(0.7071 -0.7071 0.7071 0.7071 -2.4704 30.1299)"
          width="17"
          height="1.5"
        />
      </g>
    </svg>
  );
};

export default ArrowRight;
