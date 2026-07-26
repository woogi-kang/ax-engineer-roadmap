import type { Metadata } from "next";
import type { Language } from "./roadmap-data";

const isPagesBuild = process.env.GITHUB_PAGES === "true";
const pagesBasePath = isPagesBuild
  ? (process.env.PAGES_BASE_PATH ?? "/ax-engineer-roadmap")
  : "";
const siteOrigin = isPagesBuild
  ? (process.env.PAGES_ORIGIN ?? "https://woogi-kang.github.io")
  : "https://ax-engineer-roadmap-korea.woogi-dev.chatgpt.site";

const metadataCopy = {
  ko: {
    description:
      "AX 엔지니어가 업무를 고르고, AI를 기존 시스템에 연결해 운영하며, 현업 조합 사례로 적용 방식을 살피는 오픈 로드맵.",
    openGraphDescription:
      "AX 엔지니어의 역할, 업무 전환 8단계, 기술 역량, 실습 프로젝트, 현업 조합 사례를 한곳에서 확인하는 오픈 로드맵.",
    imageAlt:
      "AX 엔지니어의 역할, 업무 전환 과정, 실습 프로젝트와 현업 조합 사례를 보여 주는 로드맵",
    locale: "ko_KR",
  },
  en: {
    description:
      "An open roadmap for AX Engineers to choose workflows, connect AI to existing systems, carry the work into operations, and explore applied AX cases.",
    openGraphDescription:
      "Explore the AX Engineer role, eight workflow transformation stages, technical capabilities, practice projects, and applied AX cases.",
    imageAlt:
      "A roadmap of the AX Engineer role, workflow transformation stages, practice projects, and applied AX cases",
    locale: "en_US",
  },
} as const;

function assetPath(path: string) {
  return `${pagesBasePath}${path}`;
}

export function createSiteMetadata(language: Language): Metadata {
  const copy = metadataCopy[language];
  const pagePath = language === "en" ? "/en/" : "/";
  const canonicalPath = assetPath(pagePath);

  return {
    metadataBase: new URL(siteOrigin),
    alternates: {
      canonical: canonicalPath,
      languages: {
        "ko-KR": assetPath("/"),
        "en-US": assetPath("/en/"),
      },
    },
    icons: {
      icon: assetPath("/favicon.svg"),
    },
    title: {
      default: "AX Engineer Roadmap",
      template: "%s · AX Engineer Roadmap",
    },
    description: copy.description,
    openGraph: {
      title: "AX Engineer Roadmap",
      description: copy.openGraphDescription,
      type: "website",
      locale: copy.locale,
      url: canonicalPath,
      images: [
        {
          url: assetPath("/og-roadmap.png"),
          width: 1672,
          height: 941,
          alt: copy.imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "AX Engineer Roadmap",
      description: copy.description,
      images: [assetPath("/og-roadmap.png")],
    },
  };
}
