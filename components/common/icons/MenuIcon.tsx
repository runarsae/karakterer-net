import * as React from 'react';
import { SVGProps } from 'react';

const SvgMenuIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        width={24}
        height={24}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        {...props}
    >
        <path
            d="M6 7h15M11 12h10M6 17h15"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
        />
    </svg>
);

export default SvgMenuIcon;
