import "../globals.css";
import { createSiteMetadata } from "../site-metadata";

export const metadata = createSiteMetadata("en");

export default function EnglishRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
