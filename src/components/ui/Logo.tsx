import { LeafTopLeft, LeafBottomRight } from "@/components/ui/icons";

const DEFAULT_FRAME = 34;
const DEFAULT_LEAF = 29;

interface LogoProps {
  size?: number;
  className?: string;
}

export function Logo({ size = 1, className }: LogoProps) {
  const frame = DEFAULT_FRAME * size;
  const leaf = DEFAULT_LEAF * size;

  return (
    <div
      className={`relative ${className ?? ""}`}
      style={{ width: frame, height: frame }}
    >
      <div className="absolute top-0 left-0">
        <LeafTopLeft size={leaf} />
      </div>
      <div className="absolute bottom-0 right-0">
        <LeafBottomRight size={leaf} />
      </div>
    </div>
  );
}
