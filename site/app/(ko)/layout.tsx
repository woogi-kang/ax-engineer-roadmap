import "../globals.css";
import { createSiteMetadata } from "../site-metadata";

export const metadata = createSiteMetadata("ko");

export default function KoreanRootLayout({
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
