export function TemporaryDesign() {
  return (
    <div className="flex justify-center bg-white min-h-screen">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/temporary/temporary.png"
        alt="BILINY 디자인 시안"
        loading="lazy"
        decoding="async"
        className="w-full max-w-full md:max-w-[80vw] lg:max-w-[60vw] h-auto"
      />
    </div>
  );
}
