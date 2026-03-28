interface LeafBottomRightProps {
  size?: number;
  className?: string;
  fill?: string;
}

export function LeafBottomRight({ size = 29, className, fill = "#3B3B3B" }: LeafBottomRightProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 29 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M29 26.4831C29 27.8732 27.8949 29 26.5318 29H0.514996C-0.123301 29 -0.191093 28.0936 0.44018 27.9973C1.19335 27.8824 1.93892 27.7707 2.67527 27.6622C15.362 25.7923 25.6712 15.8924 27.5923 2.96877L27.9666 0.450607C28.0629 -0.197247 29 -0.125237 29 0.530018V26.4831Z"
        fill={fill}
      />
    </svg>
  );
}
