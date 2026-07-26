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
    default: "AX Engineer Roadmap Korea",
    template: "%s · AX Engineer Roadmap Korea",
  },
  description:
    "역할과 조직 준비도에서 시작해 운영 증거까지 연결하는 한국형 AX Engineer 인터랙티브 로드맵.",
  openGraph: {
    title: "AX Engineer Roadmap Korea",
    description:
      "역할, 기술, 업무 전환, 조직 성숙도를 한 흐름으로 탐색하는 오픈 로드맵.",
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
    title: "AX Engineer Roadmap Korea",
    description:
      "역할과 조직 준비도에서 시작해 운영 증거까지 연결하는 인터랙티브 로드맵.",
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
