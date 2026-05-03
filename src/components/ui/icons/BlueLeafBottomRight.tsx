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
      viewBox="0 0 154 154"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M153.172 139.871C153.172 147.213 147.335 153.164 140.135 153.164H2.72015C-0.651199 153.164 -1.00926 148.377 2.325 147.868C6.3031 147.261 10.241 146.671 14.1303 146.098C81.1391 136.222 135.59 83.9358 145.737 15.6795L147.714 2.37978C148.222 -1.04189 153.172 -0.66156 153.172 2.79918V139.871Z"
        fill={fill}
      />
    </svg>
  );
}

