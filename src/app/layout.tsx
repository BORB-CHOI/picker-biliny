import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const SITE_URL = "https://picker.ai.kr";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "피커프로젝트 | 모빌리티 통합 솔루션 MaaS 기업",
    template: "%s | 피커프로젝트",
  },
  description:
    "피커프로젝트는 중소도시 모빌리티 통합 솔루션을 제공하는 MaaS(Mobility as a Service) 기업입니다. 시니어 공유 모빌리티 'BILINY(빌리니)'와 도시 운반·관리용 다목적 플랫폼 'TRINY(트리니)'로 인구감소 중소도시의 이동권을 다시 설계합니다.",
  keywords: [
    "피커프로젝트",
    "Picker Project",
    "MaaS",
    "Mobility as a Service",
    "모빌리티 통합 솔루션",
    "모빌리티 플랫폼",
    "스마트 모빌리티",
    "빌리니",
    "BILINY",
    "트리니",
    "TRINY",
    "시니어 모빌리티",
    "고령자 이동권",
    "자율주행",
    "퍼스널 모빌리티",
    "공유 모빌리티",
    "다목적 플랫폼",
    "도시 운반 로봇",
    "중소도시",
    "스마트 시티",
  ],
  authors: [{ name: "피커프로젝트" }],
  creator: "피커프로젝트",
  publisher: "피커프로젝트",
  applicationName: "피커프로젝트",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "피커프로젝트 | 모빌리티 통합 솔루션 MaaS 기업",
    description:
      "중소도시 모빌리티 통합 솔루션. 시니어 공유 모빌리티 BILINY(빌리니)와 도시 다목적 플랫폼 TRINY(트리니).",
    url: SITE_URL,
    siteName: "피커프로젝트",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/images/hero/title-desktop.png",
        width: 1200,
        height: 630,
        alt: "피커프로젝트 - 모빌리티 통합 솔루션 MaaS 기업 | BILINY & TRINY",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "피커프로젝트 | 모빌리티 통합 솔루션 MaaS 기업",
    description: "시니어 공유 모빌리티 BILINY와 도시 다목적 플랫폼 TRINY.",
    images: ["/images/hero/title-desktop.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: "N8j0dIL-auvVeoMCk5ViWrucchOlh5rboTT6dCu_wgg",
    other: {
      "naver-site-verification": "4227d6f04f9d07b760d93dc6163c69c8eaf50104",
    },
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0060EF",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "피커프로젝트",
      alternateName: ["Picker Project", "피커 프로젝트"],
      url: SITE_URL,
      logo: `${SITE_URL}/android-chrome-512x512.png`,
      description:
        "중소도시 모빌리티 통합 솔루션을 제공하는 MaaS(Mobility as a Service) 기업. 시니어 공유 모빌리티 'BILINY(빌리니)'와 도시 다목적 플랫폼 'TRINY(트리니)'를 운영합니다.",
      slogan: "중소도시의 이동권을 다시 설계합니다",
      knowsAbout: [
        "MaaS",
        "Mobility as a Service",
        "공유 모빌리티",
        "자율주행 퍼스널 모빌리티",
        "고령자 이동권",
        "스마트 시티 인프라",
      ],
      areaServed: { "@type": "Country", name: "South Korea" },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "kms@picker.ai.kr",
        availableLanguage: ["Korean", "English"],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "피커프로젝트",
      alternateName: "Picker Project",
      inLanguage: "ko-KR",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "Vehicle",
      "@id": `${SITE_URL}/#biliny`,
      name: "BILINY",
      alternateName: "빌리니",
      brand: { "@id": `${SITE_URL}/#organization` },
      manufacturer: { "@id": `${SITE_URL}/#organization` },
      description:
        "공유형 자율주행 시니어 모빌리티. 인구감소 중소도시 고령자의 이동권 문제를 해결합니다. 1회 충전 140km 주행, 안전한 시속 13~25km, 가로등 무선충전 인프라 연동.",
      vehicleConfiguration: "Personal Mobility (PM)",
      bodyType: "Personal Mobility",
      image: [
        `${SITE_URL}/images/biliny/1_lineup-hero.png`,
        `${SITE_URL}/images/biliny/2_360-orbit.png`,
      ],
      additionalProperty: [
        { "@type": "PropertyValue", name: "최대 주행거리", value: "140km" },
        { "@type": "PropertyValue", name: "착석 시 속도", value: "13km/h" },
        { "@type": "PropertyValue", name: "기립 시 속도", value: "25km/h" },
        { "@type": "PropertyValue", name: "충전 방식", value: "가로등 무선충전" },
      ],
    },
    {
      "@type": "Vehicle",
      "@id": `${SITE_URL}/#triny`,
      name: "TRINY",
      alternateName: "트리니",
      brand: { "@id": `${SITE_URL}/#organization` },
      manufacturer: { "@id": `${SITE_URL}/#organization` },
      description:
        "초소형 다용성 모빌리티 플랫폼. 승객용 캐빈 결합과 로봇암 장착 등을 통해 도시 운반 및 관리 등 도시 내 이동수요에 대응하는 다목적 플랫폼.",
      vehicleConfiguration: "Multi-purpose Urban Mobility Platform",
      bodyType: "Modular Platform",
      image: [
        `${SITE_URL}/images/triny/1_lineup-hero.png`,
        `${SITE_URL}/images/triny/4_symmetry.png`,
        `${SITE_URL}/images/triny/5_modular.png`,
      ],
      additionalProperty: [
        { "@type": "PropertyValue", name: "용도", value: "도시 운반 / 관리 / 다인 수송" },
        { "@type": "PropertyValue", name: "구성", value: "승객용 캐빈 + 로봇암 모듈" },
        { "@type": "PropertyValue", name: "탑승 인원", value: "1~4인" },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${inter.variable} h-full antialiased`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.history.scrollRestoration = "manual"; window.scrollTo(0, 0);`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col overflow-x-clip">{children}</body>
    </html>
  );
}
