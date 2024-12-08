import * as React from "react";
import { SVGProps } from "react";

const ExploreIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    height="28"
    viewBox="0 0 48 48"
    width="28"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m24 6a18 18 0 1 1 -18 18 18.1 18.1 0 0 1 18-18
           "
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="m33.3 13.3-13.3 6.7-6.7 13.3a1.1 1.1 0 0 0 1.4 1.4
           l13.3-6.7 6.7-13.3a1.1 1.1 0 0 0 -1.4-1.4
           zm-9.3 12.7a2 2 0 1 1 2-2 2 2 0 0 1 -2 2z"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

export default ExploreIcon;
