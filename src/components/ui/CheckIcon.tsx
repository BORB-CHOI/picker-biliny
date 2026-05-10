import Image from "next/image";

export function CheckIcon() {
  return (
    <Image
      src="/images/story/dot.png"
      alt=""
      width={31}
      height={32}
      className="product-check-icon shrink-0"
      aria-hidden="true"
    />
  );
}
