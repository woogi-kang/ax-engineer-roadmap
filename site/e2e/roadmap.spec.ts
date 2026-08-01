import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("filters cases by industry, preserves the URL across language, and resets", async ({
  page,
}) => {
  await page.goto("/");

  await expect(page.getByText("46개 항목")).toBeVisible();
  const industryGroup = page.getByRole("group", { name: "사례 산업" });
  await industryGroup.getByRole("button", { name: "제조", exact: true }).click();

  await expect(page).toHaveURL(/industry=manufacturing/);
  await expect(page.getByText("32개 항목")).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: "설비 이상 신호에서 검토 가능한 정비 제안까지",
    }),
  ).toBeVisible();

  await page.getByRole("link", { name: "English" }).click();
  await expect(page).toHaveURL(/\/en\/?\?industry=manufacturing/);
  await expect(
    page.getByRole("group", { name: "Case industry" }).getByRole("button", {
      name: "Manufacturing",
      exact: true,
      pressed: true,
    }),
  ).toBeVisible();

  await page.getByRole("button", { name: "Reset selection" }).click();
  await expect(page).not.toHaveURL(/industry=/);
  await expect(page.getByText("46 items")).toBeVisible();
});

test("restores a shared filter URL and gives document links distinct names", async ({
  page,
}) => {
  await page.goto("/?industry=manufacturing&q=%EC%84%A4%EB%B9%84");

  await expect(
    page.getByRole("button", { name: "제조", exact: true, pressed: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", {
      name: "문서 보기: 설비 이상 신호에서 검토 가능한 정비 제안까지",
    }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { level: 3, name: "업무별 적용 사례" })).toBeVisible();
});

test("restores an industry-only URL with only the case group expanded", async ({
  page,
}) => {
  await page.goto("/?industry=manufacturing");

  await expect(
    page.getByRole("button", { name: /업무별 적용 사례/ }),
  ).toHaveAttribute("aria-expanded", "true");
  await expect(
    page.getByRole("button", { name: /시작점/ }),
  ).toHaveAttribute("aria-expanded", "false");
  await expect(
    page.getByRole("heading", {
      name: "설비 이상 신호에서 검토 가능한 정비 제안까지",
    }),
  ).toBeVisible();
});

test("supports skip navigation, a 320px viewport, and WCAG AA checks", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto("/");

  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "로드맵으로 바로가기" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#roadmap")).toBeFocused();

  const horizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );
  expect(horizontalOverflow).toBe(false);

  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  expect(results.violations).toEqual([]);
});
