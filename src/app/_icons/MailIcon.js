import * as React from "react";

const MailIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      stroke="#FAFAFA"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.667 4.667A1.333 1.333 0 0 1 4 3.333h8a1.333 1.333 0 0 1 1.333 1.334v6.666A1.333 1.333 0 0 1 12 12.667H4a1.333 1.333 0 0 1-1.333-1.334V4.667Z"
    />
    <path
      stroke="#FAFAFA"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m2.667 5.333 4.646 3.334a1.167 1.167 0 0 0 1.374 0l4.646-3.334"
    />
  </svg>
);

export default MailIcon;
