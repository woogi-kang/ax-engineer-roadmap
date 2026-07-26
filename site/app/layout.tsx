import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    "https://ax-engineer-roadmap-korea.woogi-dev.chatgpt.site",
  ),
  icons: {
    icon: "/favicon.svg",
  },
  title: {
    default: "AX Engineer Roadmap",
    template: "%s · AX Engineer Roadmap",
  },
  description:
    "한국 조직의 운영 현실에 기반해 다른 환경에서도 재사용할 수 있도록 설계한 AX Engineer 인터랙티브 로드맵.",
  openGraph: {
    title: "AX Engineer Roadmap",
    description:
      "범용 AX 원칙과 한국 조직의 결재·권한·규제·디지털 기반을 함께 탐색하는 오픈 로드맵.",
    type: "website",
    images: [
      {
        url: "/og-roadmap.png",
        width: 1672,
        height: 941,
        alt: "AX Engineer Roadmap 역할, 업무 흐름, 운영 증거 도해",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AX Engineer Roadmap",
    description:
      "한국 조직의 운영 현실에 기반해 다른 환경에서도 재사용할 수 있도록 설계한 AX Engineer 인터랙티브 로드맵.",
    images: ["/og-roadmap.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
