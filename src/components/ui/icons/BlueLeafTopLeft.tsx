interface LeafTopLeftProps {
  size?: number;
  className?: string;
  fill?: string;
}

export function LeafTopLeft({ size = 29, className, fill = "#3B3B3B" }: LeafTopLeftProps) {
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
        d="M0 13.2929C0 5.95145 5.83674 0 13.0367 0H150.452C153.823 0 154.181 4.78738 150.847 5.29589C146.869 5.90258 142.931 6.49258 139.042 7.06578C72.0328 16.9417 17.582 69.2283 7.43525 137.485L5.45815 150.784C4.9495 154.206 0 153.826 0 150.365V13.2929Z"
        fill={fill}
      />
    </svg>
  );
}

