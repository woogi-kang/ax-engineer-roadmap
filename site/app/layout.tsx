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
    "AX 엔지니어가 업무를 고르고, AI를 기존 시스템에 연결하고, 운영까지 이어 가는 데 필요한 오픈 로드맵.",
  openGraph: {
    title: "AX Engineer Roadmap",
    description:
      "AX 엔지니어의 역할, 업무 전환 8단계, 기술 역량, 실습 프로젝트를 한곳에서 확인하는 오픈 로드맵.",
    type: "website",
    images: [
      {
        url: "/og-roadmap.png",
        width: 1672,
        height: 941,
        alt: "AX 엔지니어의 역할, 업무 전환 과정, 실습 프로젝트를 보여 주는 로드맵",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AX Engineer Roadmap",
    description:
      "AX 엔지니어가 업무를 고르고, AI를 기존 시스템에 연결하고, 운영까지 이어 가는 데 필요한 오픈 로드맵.",
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
