import React from 'react';

const iconClass = 'shrink-0';

export const ArrowUpRightIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className ?? iconClass}
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M7.71429 5.14285V12.2481C7.71429 13.905 9.05744 15.2481 10.7143 15.2481H16.2857M16.2857 15.2481L12.7143 11.6391M16.2857 15.2481L12.7143 18.8571"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);
