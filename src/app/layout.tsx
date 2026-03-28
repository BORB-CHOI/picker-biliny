import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BILINY(빌리니) - 공유형 자율주행 시니어 모빌리티 | Picker Project",
  description:
    "중소도시의 이동권을 다시 설계합니다. BILINY는 인구감소 중소도시 고령자의 이동권 문제를 해결하는 공유형 자율주행 퍼스널 모빌리티 솔루션입니다.",
  keywords: ["빌리니", "BILINY", "시니어 모빌리티", "자율주행", "퍼스널 모빌리티", "피커 프로젝트"],
  openGraph: {
    title: "BILINY(빌리니) - 공유형 자율주행 시니어 모빌리티",
    description: "중소도시의 이동권을 다시 설계합니다.",
    url: "https://ai.kr",
    siteName: "Picker Project",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
