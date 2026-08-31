import { expect, test } from "@playwright/test";

const baseUrl = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000";
const innerRoutes = [
  "/about",
  "/our-work",
  "/resources",
  "/workshops",
  "/seniorsafe",
  "/get-involved",
  "/get-help",
];
const targetViewports = [
  { width: 1440, height: 1000 },
  { width: 1024, height: 768 },
  { width: 768, height: 1024 },
  { width: 390, height: 844 },
];

const routeDesigns = [
  { route: "/about", layout: "about-reference", minimumPhotos: 1 },
  { route: "/our-work", layout: "work-triptych", minimumPhotos: 7 },
  { route: "/resources", layout: "resource-field-guide", minimumPhotos: 2 },
  { route: "/workshops", layout: "workshop-table", minimumPhotos: 2 },
  { route: "/seniorsafe", layout: "seniorsafe-panorama", minimumPhotos: 3 },
  { route: "/get-involved", layout: "involvement-collage", minimumPhotos: 3 },
  { route: "/get-help", layout: "help-action-board", minimumPhotos: 2 },
] as const;

const routesWithoutEyebrows = [
  "/resources",
  "/workshops",
  "/seniorsafe",
  "/get-involved",
  "/get-help",
] as const;

test("homepage has no horizontal overflow on mobile and tablet", async ({
  page,
}) => {
  for (const viewport of [
    { width: 390, height: 844 },
    { width: 768, height: 1024 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(300);

    const hasHorizontalOverflow = await page.evaluate(() => {
      return (
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth
      );
    });

    expect(hasHorizontalOverflow).toBeFalsy();
  }
});

test("homepage CTA keeps its teamwork photo and controls clear at every viewport", async ({
  page,
}) => {
  const runtimeErrors: string[] = [];

  page.on("console", (message) => {
    if (message.type() === "error") {
      runtimeErrors.push(message.text());
    }
  });
  page.on("pageerror", (error) => {
    runtimeErrors.push(error.message);
  });

  for (const viewport of targetViewports) {
    await page.setViewportSize(viewport);
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });

    const section = page
      .getByRole("heading", { name: "Together, we can stop scams." })
      .locator("xpath=ancestor::section");
    const photo = section.locator('[data-homepage-cta-photo="true"]');

    await section.scrollIntoViewIfNeeded();
    await expect(photo).toBeVisible();
    await expect(
      section.getByRole("link", { name: "Host a Workshop" }),
    ).toBeVisible();
    await expect(
      section.getByRole("link", { name: "Get Involved" }),
    ).toBeVisible();
    await expect
      .poll(() =>
        photo.evaluate((image) =>
          image instanceof HTMLImageElement ? image.naturalWidth : 0,
        ),
      )
      .toBeGreaterThan(0);

    const metrics = await section.evaluate((element) => ({
      height: element.getBoundingClientRect().height,
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      imageLoaded: [...element.querySelectorAll("img")].every(
        (image) => image.complete && image.naturalWidth > 0,
      ),
    }));

    const minimumHeight =
      viewport.width < 640 ? 352 : viewport.width < 1024 ? 304 : 288;

    expect(metrics.height).toBeGreaterThanOrEqual(minimumHeight);
    expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.clientWidth);
    expect(metrics.imageLoaded).toBeTruthy();
  }

  expect(runtimeErrors).toEqual([]);
});

test("inner pages use distinct photo-led layouts with readable copy", async ({
  page,
}) => {
  for (const viewport of targetViewports) {
    await page.setViewportSize(viewport);

    for (const design of routeDesigns) {
      await page.goto(`${baseUrl}${design.route}`);
      await page.waitForTimeout(250);

      const storyPhotos = page.locator("[data-story-photo]");

      expect(await storyPhotos.count()).toBeGreaterThanOrEqual(
        design.minimumPhotos,
      );
      await expect(page.locator("main")).toHaveAttribute(
        "data-page-layout",
        design.layout,
      );
      await expect(page.locator("[data-page-title]")).toHaveCount(0);
      await expect(page.locator("[data-section-kicker]")).toHaveCount(0);
      await expect(page.locator("[data-photo-frame]")).toHaveCount(0);
      await expect(page.locator("[data-page-art]")).toHaveCount(0);
      await expect(
        page.locator("[data-reveal-item] [data-reveal-item]"),
      ).toHaveCount(0);
      await expect(page.locator("h1")).toHaveCount(1);

      const emptyAltText = await storyPhotos.locator("img").evaluateAll(
        (images) =>
          images.filter(
            (image) => !(image as HTMLImageElement).alt.trim(),
          ).length,
      );

      expect(emptyAltText).toBe(0);

      const layout = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        brokenImages: [...document.images].filter(
          (image) => image.complete && image.naturalWidth === 0,
        ).length,
        unfinishedEagerImages: [...document.images].filter(
          (image) =>
            image.loading === "eager" &&
            (!image.complete || image.naturalWidth === 0),
        ).length,
      }));

      expect(layout.scrollWidth).toBeLessThanOrEqual(layout.clientWidth);
      expect(layout.brokenImages).toBe(0);
      expect(layout.unfinishedEagerImages).toBe(0);

      const visualMetrics = await page.locator("h1").evaluate((heading) => {
        const styles = getComputedStyle(heading);
        const box = heading.getBoundingClientRect();

        return {
          width: box.width,
          fontSize: Number.parseFloat(styles.fontSize),
          lineHeight: Number.parseFloat(styles.lineHeight),
        };
      });
      const copyMetrics = await page
        .locator("[data-readable-copy]")
        .first()
        .evaluate((copy) => {
          const styles = getComputedStyle(copy);
          return {
            fontSize: Number.parseFloat(styles.fontSize),
            lineHeight: Number.parseFloat(styles.lineHeight),
          };
        });
      const photoBox = await storyPhotos.first().boundingBox();

      expect(visualMetrics.width).toBeLessThanOrEqual(viewport.width - 32);
      expect(visualMetrics.lineHeight).toBeGreaterThanOrEqual(
        visualMetrics.fontSize,
      );
      expect(copyMetrics.fontSize).toBeGreaterThanOrEqual(17);
      expect(copyMetrics.lineHeight).toBeGreaterThanOrEqual(
        copyMetrics.fontSize * 1.45,
      );
      expect(photoBox?.width ?? 0).toBeGreaterThan(260);
      expect(photoBox?.height ?? 0).toBeGreaterThan(180);
    }
  }
});

test("our work hero and path band stay balanced at every viewport", async ({
  page,
}) => {
  for (const viewport of targetViewports) {
    await page.setViewportSize(viewport);
    await page.goto(`${baseUrl}/our-work`);

    const hero = page.locator('[data-work-hero="true"]');
    const heroPhoto = hero.locator('[data-work-hero-photo="true"]');
    const heading = hero.getByRole("heading", {
      name: "Three paths into safer online habits.",
    });
    const pathBand = page.locator('[data-work-path-band="true"]');
    const pathLead = pathBand.locator('[data-work-path-lead="true"]');
    const paths = pathBand.locator('[data-work-path="true"]');
    const connection = page.locator('[data-work-connection="true"]');
    const nextStep = page.locator('[data-work-next-step="true"]');

    await expect(hero).toBeVisible();
    await expect(heroPhoto).toBeVisible();
    await expect(heading).toBeVisible();
    await expect(pathLead).toBeVisible();
    await expect(paths).toHaveCount(3);
    await expect(connection).toBeVisible();
    await expect(
      connection.locator('[data-work-connection-step="true"]'),
    ).toHaveCount(3);
    await expect(nextStep).toBeVisible();
    await expect(
      nextStep.locator('[data-work-next-choice="true"]'),
    ).toHaveCount(2);
    await expect(nextStep.locator("img")).toHaveCount(1);
    await expect(page.getByText("D4V / Our Work")).toHaveCount(0);

    const metrics = await page.evaluate(() => {
      const hero = document.querySelector<HTMLElement>('[data-work-hero="true"]');
      const heroPhoto = document.querySelector<HTMLElement>(
        '[data-work-hero-photo="true"]',
      );
      const heading = hero?.querySelector<HTMLElement>("h1");
      const band = document.querySelector<HTMLElement>(
        '[data-work-path-band="true"]',
      );
      const connectionGrid = document.querySelector<HTMLElement>(
        ".work-connection__grid",
      );
      const connectionPhotos = [
        ...document.querySelectorAll<HTMLImageElement>(
          '[data-work-connection="true"] img',
        ),
      ];
      const nextStepGrid = document.querySelector<HTMLElement>(
        ".work-next-step__grid",
      );
      const nextStepColumnCount = nextStepGrid
        ? getComputedStyle(nextStepGrid).gridTemplateColumns.trim().split(/\s+/).length
        : 0;
      const nextStepImages = [
        ...document.querySelectorAll<HTMLImageElement>(
          '[data-work-next-step="true"] img',
        ),
      ];
      const nextStepContent = document.querySelector<HTMLElement>(
        '[data-work-next-content="true"]',
      );
      const nextStepVisual = document.querySelector<HTMLElement>(
        '[data-work-next-visual="true"]',
      );
      const nextStepContentBox = nextStepContent?.getBoundingClientRect();
      const nextStepVisualBox = nextStepVisual?.getBoundingClientRect();
      const heroBox = hero?.getBoundingClientRect();
      const photoBox = heroPhoto?.getBoundingClientRect();
      const headingBox = heading?.getBoundingClientRect();

      return {
        heroHeight: heroBox?.height ?? 0,
        photoCoversHero:
          Boolean(heroBox && photoBox) &&
          Math.abs((photoBox?.top ?? 0) - (heroBox?.top ?? 0)) <= 2 &&
          Math.abs((photoBox?.bottom ?? 0) - (heroBox?.bottom ?? 0)) <= 2,
        headingInsidePhoto:
          Boolean(headingBox && photoBox) &&
          (headingBox?.left ?? 0) >= (photoBox?.left ?? 0) &&
          (headingBox?.right ?? 0) <= (photoBox?.right ?? 0) &&
          (headingBox?.top ?? 0) >= (photoBox?.top ?? 0) &&
          (headingBox?.bottom ?? 0) <= (photoBox?.bottom ?? 0),
        headingSize: heading
          ? Number.parseFloat(getComputedStyle(heading).fontSize)
          : 0,
        headingColor: heading ? getComputedStyle(heading).color : "",
        bandColumns: band
          ? getComputedStyle(band).gridTemplateColumns.trim().split(/\s+/).length
          : 0,
        connectionColumns: connectionGrid
          ? getComputedStyle(connectionGrid).gridTemplateColumns.trim().split(/\s+/).length
          : 0,
        connectionPhotos: connectionPhotos.length,
        brokenConnectionPhotos: connectionPhotos.filter(
          (image) => image.complete && image.naturalWidth === 0,
        ).length,
        nextStepColumns: nextStepColumnCount,
        nextStepPhotos: nextStepImages.length,
        brokenNextStepPhotos: nextStepImages.filter(
          (image) => image.complete && image.naturalWidth === 0,
        ).length,
        nextStepTextBeforePhoto:
          nextStepColumnCount === 2
            ? (nextStepContentBox?.right ?? 0) <=
              (nextStepVisualBox?.left ?? Number.POSITIVE_INFINITY) + 1
            : (nextStepContentBox?.bottom ?? 0) <=
              (nextStepVisualBox?.top ?? Number.POSITIVE_INFINITY) + 1,
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      };
    });

    const minimumHeadingSize =
      viewport.width < 480 ? 44 : viewport.width < 1024 ? 52 : 64;
    const expectedColumns =
      viewport.width >= 1152 ? 4 : viewport.width >= 640 ? 2 : 1;
    const expectedConnectionColumns = viewport.width >= 1024 ? 2 : 1;
    const expectedNextStepColumns = viewport.width >= 1152 ? 2 : 1;

    expect(metrics.heroHeight).toBeGreaterThanOrEqual(540);
    expect(metrics.photoCoversHero).toBeTruthy();
    expect(metrics.headingInsidePhoto).toBeTruthy();
    expect(metrics.headingSize).toBeGreaterThanOrEqual(minimumHeadingSize);
    expect(metrics.headingColor).toBe("rgb(255, 253, 249)");
    expect(metrics.bandColumns).toBe(expectedColumns);
    expect(metrics.connectionColumns).toBe(expectedConnectionColumns);
    expect(metrics.connectionPhotos).toBe(2);
    expect(metrics.brokenConnectionPhotos).toBe(0);
    expect(metrics.nextStepColumns).toBe(expectedNextStepColumns);
    expect(metrics.nextStepPhotos).toBe(1);
    expect(metrics.brokenNextStepPhotos).toBe(0);
    expect(metrics.nextStepTextBeforePhoto).toBeTruthy();
    expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.clientWidth);
  }
});

test("our work fourth-section hover does not inherit its reveal delay", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(`${baseUrl}/our-work`);

  const section = page.locator(".work-next-step");
  await section.evaluate((element) =>
    element.scrollIntoView({ block: "center" }),
  );

  const revealRoot = section.locator("xpath=ancestor::*[@data-reveal-root]");
  await expect(revealRoot).toHaveAttribute("data-reveal-state", "visible");
  await page.waitForTimeout(1800);

  const choice = section.locator(".work-next-step__choice").first();
  const transitionDelay = await choice.evaluate(
    (element) => getComputedStyle(element).transitionDelay,
  );

  expect(transitionDelay).toMatch(/^(0s)(, 0s)*$/);
});

test("remaining inner-page headings fit without eyebrow subtitles", async ({
  page,
}) => {
  for (const route of routesWithoutEyebrows) {
    for (const viewport of targetViewports) {
      await page.setViewportSize(viewport);
      await page.goto(`${baseUrl}${route}`, { waitUntil: "domcontentloaded" });

      const heading = page.locator("main h1");
      await expect(heading).toBeVisible();

      const headingBox = await heading.evaluate((element) => {
        const box = element.getBoundingClientRect();
        return {
          left: box.left,
          right: box.right,
          clientWidth: element.clientWidth,
          scrollWidth: element.scrollWidth,
        };
      });
      expect(headingBox.left).toBeGreaterThanOrEqual(0);
      expect(headingBox.right).toBeLessThanOrEqual(viewport.width);
      expect(headingBox.scrollWidth).toBeLessThanOrEqual(
        headingBox.clientWidth + 1,
      );

      const labels = await page.locator("main section p").allTextContents();
      expect(labels).not.toEqual(
        expect.arrayContaining([
          "D4V field guide",
          "Keep this close",
          "Community learning / Bay Area",
          "A possible session rhythm",
          "Make room for questions",
          "Practice without pressure",
          "D4V / Get involved",
          "Community starts small",
          "When something feels wrong",
          "After the pressure stops",
        ]),
      );
    }
  }
});

test("about section landing animations replay when sections are revisited", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1024, height: 768 });
  await page.goto(`${baseUrl}/about`);

  const sections = page.locator('main [data-reveal-root]');
  const offscreenSection = sections.nth(2);

  await expect(offscreenSection).toHaveAttribute("data-reveal-state", "ready");
  await offscreenSection.scrollIntoViewIfNeeded();
  await expect(offscreenSection).toHaveAttribute("data-reveal-state", "visible");
  expect(await offscreenSection.locator("[data-reveal-item]").count()).toBeGreaterThan(0);

  await sections.first().scrollIntoViewIfNeeded();
  await expect(offscreenSection).toHaveAttribute("data-reveal-state", "ready");
  await offscreenSection.scrollIntoViewIfNeeded();
  await expect(offscreenSection).toHaveAttribute("data-reveal-state", "visible");
});

test("section landing animations wait for entry and move at a slower pace", async ({
  page,
}) => {
  const viewportHeight = 768;

  await page.setViewportSize({ width: 1024, height: viewportHeight });
  await page.goto(`${baseUrl}/about`);

  const section = page.locator('main [data-reveal-root]').nth(2);
  await expect(section).toHaveAttribute("data-reveal-state", "ready");

  await section.evaluate((element, height) => {
    const targetTop = height + height * 0.09;
    window.scrollTo({
      top: window.scrollY + element.getBoundingClientRect().top - targetTop,
      behavior: "instant",
    });
  }, viewportHeight);

  await expect(section).toHaveAttribute("data-reveal-state", "ready");

  await section.evaluate((element, height) => {
    const targetTop = height * 0.55;
    window.scrollTo({
      top: window.scrollY + element.getBoundingClientRect().top - targetTop,
      behavior: "instant",
    });
  }, viewportHeight);

  await expect(section).toHaveAttribute("data-reveal-state", "visible");

  const timing = await section.locator("[data-reveal-item]").first().evaluate((item) => {
    const styles = getComputedStyle(item);
    const seconds = (value: string) =>
      Math.max(
        ...value.split(",").map((duration) => {
          const timingValue = Number.parseFloat(duration);
          return duration.trim().endsWith("ms") ? timingValue / 1000 : timingValue;
        }),
      );

    return Math.max(
      seconds(styles.animationDuration),
      seconds(styles.transitionDuration),
    );
  });

  expect(timing).toBeGreaterThanOrEqual(1.4);
});

test("section landing content stays visible until it fully leaves the viewport", async ({
  page,
}) => {
  const viewportHeight = 768;

  await page.setViewportSize({ width: 1024, height: viewportHeight });
  await page.goto(`${baseUrl}/about`);

  const section = page.locator('main [data-reveal-root]').nth(1);

  await section.evaluate((element, height) => {
    const targetTop = height * 0.45;
    window.scrollTo({
      top: window.scrollY + element.getBoundingClientRect().top - targetTop,
      behavior: "instant",
    });
  }, viewportHeight);
  await expect(section).toHaveAttribute("data-reveal-state", "visible");

  await section.evaluate((element) => {
    const visibleBottom = 40;
    window.scrollBy({
      top: element.getBoundingClientRect().bottom - visibleBottom,
      behavior: "instant",
    });
  });
  const edgeBottom = await section.evaluate(
    (element) => element.getBoundingClientRect().bottom,
  );
  expect(edgeBottom).toBeGreaterThan(0);
  expect(edgeBottom).toBeLessThanOrEqual(45);
  await expect(section).toHaveAttribute("data-reveal-state", "visible");

  await section.evaluate((element) => {
    const offscreenBottom = -20;
    window.scrollBy({
      top: element.getBoundingClientRect().bottom - offscreenBottom,
      behavior: "instant",
    });
  });
  await expect(section).toHaveAttribute("data-reveal-state", "ready");
});

test("about uses the approved scam photo deck and officer structure", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(`${baseUrl}/about`);

  const scamDeck = page.locator('[data-scam-photo-deck="true"]');
  await expect(scamDeck).toBeVisible();
  await expect(page.locator('[data-scam-photo-slide]')).toHaveCount(4);
  await expect(page.locator('[data-scam-photo-selector]')).toHaveCount(4);
  await expect(page.locator('[data-scam-signal="true"]')).toHaveCount(0);
  await expect(page.locator('.scam-signal-map')).toHaveCount(0);
  await expect(page.locator('.scam-photo-deck__number')).toHaveCount(0);
  await expect(
    scamDeck.getByRole("button", { name: /(?:Pause|Resume) photo rotation/ }),
  ).toHaveCount(1);
  await scamDeck.locator('[data-scam-photo-selector="2"]').click();
  await expect(page.locator('[data-scam-photo-slide="active"]')).toContainText(
    "Package message",
  );

  const photoFrame = await scamDeck.evaluate((deck) => {
    const editorialFrame = deck.querySelector<HTMLElement>(
      '[data-scam-photo-frame="editorial"]',
    );
    const stage = deck.querySelector<HTMLElement>(".scam-photo-deck__stage");
    const slide = deck.querySelector<HTMLElement>(
      '[data-scam-photo-slide="active"]',
    );
    const caption = deck.querySelector<HTMLElement>(
      ".scam-photo-deck__caption",
    );
    const title = caption?.querySelector<HTMLElement>("strong");
    const description = caption?.querySelector<HTMLElement>("strong + span");
    const slideStyle = slide ? getComputedStyle(slide) : null;
    const frameStyle = editorialFrame ? getComputedStyle(editorialFrame) : null;
    const frameInsetStyle = editorialFrame
      ? getComputedStyle(editorialFrame, "::before")
      : null;
    const frameAccentStyle = editorialFrame
      ? getComputedStyle(editorialFrame, "::after")
      : null;

    return {
      framePadding: frameStyle
        ? Number.parseFloat(frameStyle.paddingTop)
        : 0,
      frameBorderStyle: frameStyle?.borderTopStyle ?? "none",
      frameBorderWidth: frameStyle
        ? Number.parseFloat(frameStyle.borderTopWidth)
        : 0,
      frameRadius: frameStyle
        ? Number.parseFloat(frameStyle.borderTopLeftRadius)
        : 0,
      frameInsetContent: frameInsetStyle?.content ?? "none",
      frameAccentContent: frameAccentStyle?.content ?? "none",
      frameAccentBackground: frameAccentStyle?.backgroundImage ?? "none",
      frameShadow: frameStyle?.boxShadow ?? "none",
      radii: slideStyle
        ? [
            slideStyle.borderTopLeftRadius,
            slideStyle.borderTopRightRadius,
            slideStyle.borderBottomRightRadius,
            slideStyle.borderBottomLeftRadius,
          ]
        : [],
      backingContent: stage ? getComputedStyle(stage, "::before").content : "",
      backingTransform: stage
        ? getComputedStyle(stage, "::before").transform
        : "",
      captionColumns: caption
        ? getComputedStyle(caption).gridTemplateColumns
        : "",
      titleSize: title ? Number.parseFloat(getComputedStyle(title).fontSize) : 0,
      descriptionSize: description
        ? Number.parseFloat(getComputedStyle(description).fontSize)
        : 0,
    };
  });

  expect(photoFrame.framePadding).toBeGreaterThanOrEqual(6);
  expect(photoFrame.framePadding).toBeLessThanOrEqual(16);
  expect(photoFrame.frameBorderStyle).toBe("solid");
  expect(photoFrame.frameBorderWidth).toBeGreaterThanOrEqual(1);
  expect(photoFrame.frameRadius).toBeGreaterThanOrEqual(20);
  expect(photoFrame.frameInsetContent).toBe("none");
  expect(photoFrame.frameAccentContent).toBe("none");
  expect(photoFrame.frameAccentBackground).toBe("none");
  expect(photoFrame.frameShadow).not.toBe("none");
  expect(new Set(photoFrame.radii).size).toBe(1);
  expect(photoFrame.backingContent).toBe("none");
  expect(photoFrame.backingTransform).toBe("none");
  expect(photoFrame.captionColumns.trim().split(/\s+/)).toHaveLength(1);
  expect(photoFrame.titleSize).toBeGreaterThanOrEqual(20);
  expect(photoFrame.descriptionSize).toBeGreaterThanOrEqual(16);
  await expect(page.locator('[data-officer-card="true"]')).toHaveCount(0);
  await expect(page.locator('[data-officer-stage="empty"]')).toBeVisible();
  await expect(page.locator('[data-officer-slot="empty"]')).toHaveCount(0);
  await expect(page.locator('[data-officer-carousel="true"]')).toBeVisible();
  await expect(page.locator('[data-officer-control="previous"]')).toBeVisible();
  await expect(page.locator('[data-officer-control="next"]')).toBeVisible();
  await expect(page.locator('[data-officer-control="previous"]')).toBeDisabled();
  await expect(page.locator('[data-officer-control="next"]')).toBeDisabled();
  await expect(page.locator('[data-about-color-morph="true"]')).toHaveCount(2);
  await expect(page.locator('[data-about-wave]')).toHaveCount(0);
  await expect(page.locator('.about-section-wave')).toHaveCount(0);
  await expect(page.locator('[data-about-color-morph="true"] svg')).toHaveCount(0);
  await expect(page.locator('[data-about-transition-cloud]')).toHaveCount(0);
  await expect(page.locator('.about-section-wave__clouds')).toHaveCount(0);
  await expect(page.locator('.about-section-wave__soft-edge')).toHaveCount(0);
  await expect(page.getByText("Officer profiles will appear here.")).toHaveCount(0);
  await expect(page.getByText("00 / 00")).toHaveCount(0);
  await expect(page.locator('.about-officer-carousel__empty-media')).toHaveCount(0);
  await expect(page.locator('.about-officer-carousel__empty-copy')).toHaveCount(0);
  await expect(page.locator('[data-photo-story-carousel]')).toHaveCount(0);
  await expect(page.locator('[data-about-student-invitation="true"]')).toBeVisible();
  await expect(page.getByRole("heading", { name: "The people behind D4V Bay Area." })).toBeVisible();
  await expect(page.getByText("Hank Yang", { exact: true })).toHaveCount(0);
  await expect(page.getByText("Nathan Yin", { exact: true })).toHaveCount(0);
  await expect(page.getByText("Jun Rui Yin", { exact: true })).toHaveCount(0);
  await expect(page.getByText("Zachary Labit", { exact: true })).toHaveCount(0);
  await expect(page.locator('[data-footer-tone="light"][data-footer-variant="about"]')).toBeVisible();

  const composition = await page.evaluate(() => {
    const heroGrid = document.querySelector<HTMLElement>(".about-reference-hero__grid");
    const missionGrid = document.querySelector<HTMLElement>(".about-reference-mission__grid");
    const invitation = document.querySelector<HTMLElement>(".about-reference-invitation__panel");
    const invitationArt = document.querySelector<HTMLElement>(".about-reference-invitation__art");
    const invitationImage = document.querySelector<HTMLImageElement>(
      ".about-reference-invitation__art img",
    );
    const invitationCopy = document.querySelector<HTMLElement>(
      ".about-reference-invitation__copy [data-readable-copy]",
    );
    const invitationHeading = document.querySelector<HTMLElement>(
      ".about-reference-invitation__copy h2",
    );
    const invitationAction = document.querySelector<HTMLElement>(
      ".about-reference-invitation__action",
    );
    const sections = [
      ".about-reference-hero",
      ".about-reference-mission",
      ".about-reference-officers",
      ".about-reference-invitation",
    ].map((selector) =>
      document.querySelector<HTMLElement>(selector)?.getBoundingClientRect().height ?? 0,
    );
    const missionCopy = document.querySelector<HTMLElement>(
      ".about-reference-mission__copy [data-readable-copy]",
    );
    const missionClosing = document.querySelector<HTMLElement>(
      ".about-reference-mission__emphasis",
    );
    const missionWash = document.querySelector<HTMLElement>(
      ".about-reference-mission__wash",
    );
    const organizationMark = document.querySelector<HTMLElement>(
      ".about-reference-org-mark",
    );
    const officerStage = document.querySelector<HTMLElement>("[data-officer-stage]");
    const officerSection = document.querySelector<HTMLElement>(".about-reference-officers");
    const invitationSection = document.querySelector<HTMLElement>(".about-reference-invitation");
    const officerHeading = document.querySelector<HTMLElement>(
      ".about-reference-officers__heading h2",
    );
    const officerCarousel = document.querySelector<HTMLElement>(
      '[data-officer-carousel="true"]',
    );
    const previousControl = document.querySelector<HTMLElement>(
      '[data-officer-control="previous"]',
    );
    const nextControl = document.querySelector<HTMLElement>(
      '[data-officer-control="next"]',
    );
    const invitationPanel = document.querySelector<HTMLElement>(
      '[data-about-student-layout="open"]',
    );
    const transitions = [
      ...document.querySelectorAll<HTMLElement>('[data-about-color-morph="true"]'),
    ];

    return {
      heroDisplay: heroGrid ? getComputedStyle(heroGrid).display : "",
      missionDisplay: missionGrid ? getComputedStyle(missionGrid).display : "",
      invitationDisplay: invitation ? getComputedStyle(invitation).display : "",
      invitationArtHeight: invitationArt?.getBoundingClientRect().height ?? 0,
      invitationArtWidth: invitationArt?.getBoundingClientRect().width ?? 0,
      invitationImageSource: invitationImage?.currentSrc ?? "",
      invitationImageMask: invitationImage
        ? getComputedStyle(invitationImage).maskImage
        : "",
      invitationImageTransform: invitationImage
        ? getComputedStyle(invitationImage).transform
        : "",
      invitationCopyFontSize: invitationCopy
        ? Number.parseFloat(getComputedStyle(invitationCopy).fontSize)
        : 0,
      invitationCopyLineHeight: invitationCopy
        ? Number.parseFloat(getComputedStyle(invitationCopy).lineHeight)
        : 0,
      invitationHeadingFontSize: invitationHeading
        ? Number.parseFloat(getComputedStyle(invitationHeading).fontSize)
        : 0,
      invitationActionFontSize: invitationAction
        ? Number.parseFloat(getComputedStyle(invitationAction).fontSize)
        : 0,
      invitationActionHeight:
        invitationAction?.getBoundingClientRect().height ?? 0,
      sectionHeights: sections,
      missionCopyColor: missionCopy ? getComputedStyle(missionCopy).color : "",
      missionClosingColor: missionClosing ? getComputedStyle(missionClosing).color : "",
      missionClosingWeight: missionClosing
        ? Number.parseInt(getComputedStyle(missionClosing).fontWeight, 10)
        : 0,
      missionWashMask: missionWash
        ? getComputedStyle(missionWash).maskImage
        : "",
      organizationNumerals: organizationMark
        ? getComputedStyle(organizationMark).fontVariantNumeric
        : "",
      officerStageHeight: officerStage?.getBoundingClientRect().height ?? 0,
      officerSectionBackground: officerSection
        ? getComputedStyle(officerSection).backgroundColor
        : "",
      officerOverlayBackground: officerSection
        ? getComputedStyle(officerSection, "::before").backgroundImage
        : "",
      officerHeadingColor: officerHeading ? getComputedStyle(officerHeading).color : "",
      officerHeadingAlignment: officerHeading
        ? getComputedStyle(officerHeading).textAlign
        : "",
      officerControlBackground: previousControl
        ? getComputedStyle(previousControl).backgroundColor
        : "",
      officerControlColor: previousControl
        ? getComputedStyle(previousControl).color
        : "",
      officerControlOpacity: previousControl
        ? Number.parseFloat(getComputedStyle(previousControl).opacity)
        : 0,
      officerCanvasText: officerCarousel?.textContent?.trim() ?? "",
      officerCanvasRadii: officerCarousel
        ? [
            getComputedStyle(officerCarousel).borderTopLeftRadius,
            getComputedStyle(officerCarousel).borderTopRightRadius,
            getComputedStyle(officerCarousel).borderBottomRightRadius,
            getComputedStyle(officerCarousel).borderBottomLeftRadius,
          ]
        : [],
      previousControlRight: previousControl?.getBoundingClientRect().right ?? 0,
      officerCanvasLeft: officerCarousel?.getBoundingClientRect().left ?? 0,
      officerCanvasRight: officerCarousel?.getBoundingClientRect().right ?? 0,
      nextControlLeft: nextControl?.getBoundingClientRect().left ?? 0,
      invitationBorderStyle: invitationPanel
        ? getComputedStyle(invitationPanel).borderStyle
        : "",
      invitationBackground: invitationPanel
        ? getComputedStyle(invitationPanel).backgroundColor
        : "",
      invitationRadius: invitationPanel
        ? getComputedStyle(invitationPanel).borderRadius
        : "",
      sectionGap:
        (invitationSection?.getBoundingClientRect().top ?? 0) -
        (officerSection?.getBoundingClientRect().bottom ?? 0),
      transitionHeights: transitions.map(
        (transition) => transition.getBoundingClientRect().height,
      ),
      transitionWidths: transitions.map(
        (transition) => transition.getBoundingClientRect().width,
      ),
      transitionBackgroundImages: transitions.map(
        (transition) => getComputedStyle(transition).backgroundImage,
      ),
      transitionPathCounts: transitions.map(
        (transition) => transition.querySelectorAll("path").length,
      ),
    };
  });

  expect(composition.heroDisplay).toBe("grid");
  expect(composition.missionDisplay).toBe("grid");
  expect(composition.invitationDisplay).toBe("grid");
  expect(composition.invitationArtHeight).toBeGreaterThan(300);
  expect(
    composition.invitationArtWidth / composition.invitationArtHeight,
  ).toBeGreaterThanOrEqual(1.45);
  expect(composition.invitationImageSource).toContain(
    "about-students-cutout.png",
  );
  expect(composition.invitationImageMask).toBe("none");
  expect(composition.invitationImageTransform).toBe("none");
  expect(composition.invitationCopyFontSize).toBeGreaterThanOrEqual(18);
  expect(composition.invitationCopyLineHeight).toBeGreaterThanOrEqual(
    composition.invitationCopyFontSize * 1.65,
  );
  expect(composition.invitationHeadingFontSize).toBeGreaterThanOrEqual(58);
  expect(composition.invitationActionFontSize).toBeGreaterThanOrEqual(16);
  expect(composition.invitationActionHeight).toBeGreaterThanOrEqual(47.9);
  expect(composition.sectionHeights[0]).toBeGreaterThanOrEqual(560);
  expect(composition.sectionHeights[1]).toBeGreaterThanOrEqual(420);
  expect(composition.sectionHeights[2]).toBeGreaterThanOrEqual(620);
  expect(composition.sectionHeights[3]).toBeGreaterThanOrEqual(320);
  expect(composition.missionClosingColor).toBe(composition.missionCopyColor);
  expect(composition.missionClosingWeight).toBeLessThanOrEqual(500);
  expect(composition.missionWashMask).toContain("linear-gradient");
  expect(composition.organizationNumerals).toContain("lining-nums");
  expect(composition.officerStageHeight).toBeGreaterThanOrEqual(480);
  expect(composition.officerSectionBackground).toBe("rgb(237, 245, 255)");
  expect(composition.officerOverlayBackground).not.toBe("none");
  expect(composition.officerHeadingColor).toBe("rgb(11, 45, 74)");
  expect(composition.officerHeadingAlignment).toBe("center");
  expect(composition.officerControlBackground).toBe(
    "rgba(255, 255, 255, 0.82)",
  );
  expect(composition.officerControlColor).toBe("rgb(11, 45, 74)");
  expect(composition.officerControlOpacity).toBeGreaterThanOrEqual(0.6);
  expect(composition.officerCanvasText).toBe("");
  expect(new Set(composition.officerCanvasRadii).size).toBe(1);
  expect(composition.previousControlRight).toBeLessThanOrEqual(
    composition.officerCanvasLeft,
  );
  expect(composition.nextControlLeft).toBeGreaterThanOrEqual(
    composition.officerCanvasRight,
  );
  expect(composition.invitationBorderStyle).toBe("none");
  expect(composition.invitationBackground).toBe("rgba(0, 0, 0, 0)");
  expect(composition.invitationRadius).toBe("0px");
  expect(composition.sectionGap).toBeLessThanOrEqual(2);
  expect(composition.sectionHeights[3]).toBeLessThanOrEqual(640);
  expect(
    composition.transitionHeights.every((height) => height >= 48),
  ).toBeTruthy();
  expect(
    composition.transitionWidths.every((width) => width === 1440),
  ).toBeTruthy();
  expect(
    composition.transitionBackgroundImages.every((image) =>
      image.includes("linear-gradient"),
    ),
  ).toBeTruthy();
  expect(composition.transitionPathCounts).toEqual([0, 0]);

  await page.setViewportSize({ width: 1024, height: 768 });
  const laptopInvitationHeadingFits = await page
    .locator(".about-reference-invitation__copy h2")
    .evaluate((heading) => heading.scrollWidth <= heading.clientWidth);
  expect(laptopInvitationHeadingFits).toBeTruthy();

  await page.setViewportSize({ width: 390, height: 844 });
  const mobileInvitationHeight = await page
    .locator(".about-reference-invitation")
    .evaluate((section) => section.getBoundingClientRect().height);
  const mobileHeadingMetrics = await page.locator(
    ".about-reference-hero h1, .about-reference-invitation__copy h2",
  ).evaluateAll((headings) =>
    headings.map((heading) => ({
      hasInternalOverflow: heading.scrollWidth > heading.clientWidth,
      right: heading.getBoundingClientRect().right,
    })),
  );
  expect(mobileHeadingMetrics).toEqual([
    { hasInternalOverflow: false, right: expect.any(Number) },
    { hasInternalOverflow: false, right: expect.any(Number) },
  ]);
  expect(mobileHeadingMetrics.every(({ right }) => right <= 390)).toBeTruthy();
  expect(mobileInvitationHeight).toBeLessThanOrEqual(815);
});

test("about officer stage uses one consistent corner radius", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(`${baseUrl}/about`);

  const radii = await page
    .locator('[data-officer-carousel="true"]')
    .evaluate((carousel) => {
      const style = getComputedStyle(carousel);
      return [
        style.borderTopLeftRadius,
        style.borderTopRightRadius,
        style.borderBottomRightRadius,
        style.borderBottomLeftRadius,
      ];
    });

  expect(new Set(radii).size).toBe(1);
});

test("about mission photos and copy stay balanced at every viewport", async ({
  page,
}) => {
  for (const viewport of targetViewports) {
    await page.setViewportSize(viewport);
    await page.goto(`${baseUrl}/about`);

    const metrics = await page.evaluate(() => {
      const typography = (element: Element) => {
        const styles = getComputedStyle(element);

        return {
          fontSize: Number.parseFloat(styles.fontSize),
          lineHeight: Number.parseFloat(styles.lineHeight),
        };
      };
      const headings = [
        ...document.querySelectorAll<HTMLElement>(
          ".about-reference-hero h1, .about-reference-mission h2, .about-reference-officers__heading h2, .about-reference-invitation__copy h2",
        ),
      ];
      const bodyCopy = [
        ...document.querySelectorAll<HTMLElement>(
          ".about-reference-hero__copy [data-readable-copy], .about-reference-mission__copy [data-readable-copy], .about-reference-mission__emphasis, .about-reference-invitation__copy [data-readable-copy]",
        ),
      ];
      const deck = document.querySelector<HTMLElement>(
        '[data-scam-photo-deck="true"]',
      );
      const missionCopy = document.querySelector<HTMLElement>(
        ".about-reference-mission__copy",
      );
      const slides = [
        ...document.querySelectorAll<HTMLElement>("[data-scam-photo-slide]"),
      ];
      const captions = [
        ...document.querySelectorAll<HTMLElement>(".scam-photo-deck__caption"),
      ];
      const deckRect = deck?.getBoundingClientRect();
      const copyRect = missionCopy?.getBoundingClientRect();

      return {
        bodyCopy: bodyCopy.map(typography),
        headings: headings.map(typography),
        captionTypography: captions.map(typography),
        slideCount: slides.length,
        activeSlideCount: slides.filter(
          (slide) => slide.getAttribute("data-scam-photo-slide") === "active",
        ).length,
        deckBox: deckRect
          ? { top: deckRect.top, right: deckRect.right, bottom: deckRect.bottom, left: deckRect.left, width: deckRect.width }
          : null,
        copyBox: copyRect
          ? { top: copyRect.top, right: copyRect.right, bottom: copyRect.bottom, left: copyRect.left, width: copyRect.width }
          : null,
        brokenDeckImages: [...document.querySelectorAll<HTMLImageElement>(
          "[data-scam-photo-slide] img",
        )].filter((image) => image.complete && image.naturalWidth === 0).length,
        documentOverflows:
          document.documentElement.scrollWidth >
          document.documentElement.clientWidth,
      };
    });

    expect(metrics.bodyCopy).toHaveLength(4);
    expect(
      metrics.bodyCopy.every(
        ({ fontSize, lineHeight }) =>
          fontSize >= 18 && lineHeight >= fontSize * 1.6,
      ),
    ).toBeTruthy();
    expect(
      metrics.headings.every(
        ({ fontSize, lineHeight }) => lineHeight >= fontSize * 1.045,
      ),
    ).toBeTruthy();

    expect(metrics.slideCount).toBe(4);
    expect(metrics.activeSlideCount).toBe(1);
    expect(metrics.brokenDeckImages).toBe(0);
    expect(
      metrics.captionTypography.every(
        ({ fontSize, lineHeight }) =>
          fontSize >= 15 && lineHeight >= fontSize * 1.35,
      ),
    ).toBeTruthy();
    expect(metrics.deckBox?.width ?? 0).toBeGreaterThan(280);

    if (viewport.width >= 1024) {
      expect(metrics.deckBox?.right ?? 0).toBeLessThan(
        metrics.copyBox?.left ?? 0,
      );
    } else {
      expect(metrics.deckBox?.bottom ?? 0).toBeLessThan(
        metrics.copyBox?.top ?? 0,
      );
    }

    expect(metrics.documentOverflows).toBeFalsy();
  }
});

test("about mission copy fills its column with readable editorial scale", async ({
  page,
}) => {
  for (const viewport of [
    { width: 1440, height: 1000 },
    { width: 390, height: 844 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto(`${baseUrl}/about`);

    const metrics = await page.evaluate(() => {
      const copy = document.querySelector<HTMLElement>(
        ".about-reference-mission__copy",
      );
      const heading = copy?.querySelector<HTMLElement>("h2");
      const body = copy?.querySelector<HTMLElement>("[data-readable-copy]");
      const emphasis = copy?.querySelector<HTMLElement>(
        ".about-reference-mission__emphasis",
      );
      const copyRect = copy?.getBoundingClientRect();

      return {
        copyWidth: copyRect?.width ?? 0,
        copyRight: copyRect?.right ?? 0,
        headingSize: heading
          ? Number.parseFloat(getComputedStyle(heading).fontSize)
          : 0,
        headingOverflows: heading
          ? heading.scrollWidth > heading.clientWidth
          : false,
        bodySize: body
          ? Number.parseFloat(getComputedStyle(body).fontSize)
          : 0,
        emphasisSize: emphasis
          ? Number.parseFloat(getComputedStyle(emphasis).fontSize)
          : 0,
        overflows:
          document.documentElement.scrollWidth >
          document.documentElement.clientWidth,
      };
    });

    expect(metrics.overflows).toBeFalsy();
    expect(metrics.headingOverflows).toBeFalsy();
    expect(metrics.copyRight).toBeLessThanOrEqual(viewport.width);

    if (viewport.width >= 1024) {
      expect(metrics.copyWidth).toBeGreaterThanOrEqual(420);
      expect(metrics.headingSize).toBeGreaterThanOrEqual(56);
      expect(metrics.bodySize).toBeGreaterThanOrEqual(20);
      expect(metrics.emphasisSize).toBeGreaterThanOrEqual(20);
    } else {
      expect(metrics.headingSize).toBeGreaterThanOrEqual(48);
      expect(metrics.bodySize).toBeGreaterThanOrEqual(19);
      expect(metrics.emphasisSize).toBeGreaterThanOrEqual(19);
    }
  }
});

test("about scam photos can be paused and resumed", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(`${baseUrl}/about`);

  const deck = page.locator('[data-scam-photo-deck="true"]');
  await deck.scrollIntoViewIfNeeded();
  const activeSelector = () =>
    deck.locator('[data-scam-photo-selector][aria-current="true"]');

  const pauseButton = deck.getByRole("button", { name: "Pause photo rotation" });
  await pauseButton.click();
  await expect(deck).toHaveAttribute("data-scam-photo-rotation", "paused");
  const pausedIndex = await activeSelector().getAttribute("data-scam-photo-selector");
  await page.waitForTimeout(4400);
  await expect(activeSelector()).toHaveAttribute(
    "data-scam-photo-selector",
    pausedIndex ?? "0",
  );

  await deck.getByRole("button", { name: "Resume photo rotation" }).click();
  await expect(deck).toHaveAttribute("data-scam-photo-rotation", "running");
  await expect
    .poll(async () => activeSelector().getAttribute("data-scam-photo-selector"), {
      timeout: 5000,
    })
    .not.toBe(pausedIndex);
});

test("about scam photos keep rotating during hover and keyboard focus", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(`${baseUrl}/about`, { waitUntil: "domcontentloaded" });

  const deck = page.locator('[data-scam-photo-deck="true"]');
  const activeSelector = () =>
    deck.locator('[data-scam-photo-selector][aria-current="true"]');

  await deck.scrollIntoViewIfNeeded();
  await deck.hover();
  await expect(deck).toHaveAttribute("data-scam-photo-rotation", "running");
  const hoveredIndex = await activeSelector().getAttribute(
    "data-scam-photo-selector",
  );
  await expect
    .poll(async () => activeSelector().getAttribute("data-scam-photo-selector"), {
      timeout: 5000,
    })
    .not.toBe(hoveredIndex);

  await deck.locator('[data-scam-photo-selector="0"]').focus();
  await expect(deck).toHaveAttribute("data-scam-photo-rotation", "running");
  const focusedIndex = await activeSelector().getAttribute(
    "data-scam-photo-selector",
  );
  await expect
    .poll(async () => activeSelector().getAttribute("data-scam-photo-selector"), {
      timeout: 5000,
    })
    .not.toBe(focusedIndex);
});

test("about scam photo transition uses the longer timing", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(`${baseUrl}/about`, { waitUntil: "domcontentloaded" });

  const durations = await page
    .locator('[data-scam-photo-slide="active"]')
    .evaluate((slide) => getComputedStyle(slide).transitionDuration);

  expect(durations.split(", ")).toEqual(["0.95s", "0.95s"]);
});

test("about scam photos stay still for reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${baseUrl}/about`);

  const deck = page.locator('[data-scam-photo-deck="true"]');
  await deck.scrollIntoViewIfNeeded();
  await page.waitForTimeout(5800);
  await expect(
    deck.locator('[data-scam-photo-selector][aria-current="true"]'),
  ).toHaveAttribute("data-scam-photo-selector", "0");
  await expect(
    deck.getByRole("button", { name: /(?:Pause|Resume) photo rotation/ }),
  ).toHaveCount(1);
  await expect(deck).toHaveAttribute("data-scam-photo-rotation", "paused");
});

test("resources use a readable split sequence without redundant jump controls", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(`${baseUrl}/resources`);

  await expect(page.locator(".resource-tabs")).toHaveCount(0);
  await expect(page.locator('[data-resource-response-step="true"]')).toHaveCount(3);
  await expect(page.locator(".resource-step")).toHaveCount(0);
  await expect(page.getByText("A guide should be easy to return to.")).toHaveCount(0);
});

test("resources, get involved, and get help use desktop width before adding height", async ({
  page,
}) => {
  const layouts = [
    {
      route: "/resources",
      section: ".resource-response",
      grid: ".resource-response__grid",
      visual: ".resource-response__visual",
      maxHeight: { desktop: 1120, laptop: 1300 },
    },
    {
      route: "/get-involved",
      section: ".involve-paths",
      grid: ".involve-paths__grid",
      visual: ".involve-paths__visual",
      maxHeight: { desktop: 1050, laptop: 1050 },
    },
  ] as const;

  for (const viewport of [
    { width: 1440, height: 1000, size: "desktop" as const },
    { width: 1024, height: 768, size: "laptop" as const },
  ]) {
    await page.setViewportSize(viewport);

    for (const layout of layouts) {
      await page.goto(`${baseUrl}${layout.route}`);

      const metrics = await page.locator(layout.section).evaluate(
        (section, selectors) => {
          const grid = section.querySelector(selectors.grid);
          const visual = section.querySelector(selectors.visual);

          if (!grid || !visual) {
            return null;
          }

          return {
            sectionHeight: section.getBoundingClientRect().height,
            gridHeight: grid.getBoundingClientRect().height,
            visualHeight: visual.getBoundingClientRect().height,
          };
        },
        { grid: layout.grid, visual: layout.visual },
      );

      expect(metrics).not.toBeNull();
      expect(metrics?.sectionHeight ?? Number.POSITIVE_INFINITY).toBeLessThanOrEqual(
        layout.maxHeight[viewport.size],
      );
      expect((metrics?.visualHeight ?? 0) / (metrics?.gridHeight ?? 1)).toBeGreaterThanOrEqual(
        0.78,
      );
    }
  }

  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(`${baseUrl}/get-help`);

  const helpHeights = await page.locator("main").evaluate((main) => ({
    response: main.querySelector(".help-response")?.getBoundingClientRect().height ?? 0,
    actions: main.querySelector(".help-actions")?.getBoundingClientRect().height ?? 0,
  }));

  expect(helpHeights.response).toBeLessThanOrEqual(740);
  expect(helpHeights.actions).toBeLessThanOrEqual(740);

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${baseUrl}/get-help`);

  const mobileHelpActions = await page.locator(".help-actions").evaluate((section) => {
    const grid = section.querySelector(".help-actions__grid");

    return {
      height: section.getBoundingClientRect().height,
      columns: grid ? getComputedStyle(grid).gridTemplateColumns.split(" ").length : 0,
    };
  });

  expect(mobileHelpActions.height).toBeLessThanOrEqual(1250);
  expect(mobileHelpActions.columns).toBe(1);
});

test("resources, get involved, and get help hero titles use their horizontal space", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });

  for (const route of ["/resources", "/get-involved", "/get-help"]) {
    await page.goto(`${baseUrl}${route}`);

    const title = await page.locator("h1").evaluate((heading) => {
      const box = heading.getBoundingClientRect();
      const styles = getComputedStyle(heading);
      const range = document.createRange();
      range.selectNodeContents(heading);

      return {
        lines: box.height / Number.parseFloat(styles.lineHeight),
        right: box.right,
        inkWidth: range.getBoundingClientRect().width,
      };
    });

    expect(title.lines).toBeLessThanOrEqual(route === "/get-help" ? 1.1 : 2.1);
    expect(title.right).toBeLessThanOrEqual(1408);

    if (route === "/get-help") {
      expect(title.inkWidth).toBeGreaterThanOrEqual(510);
    }
  }
});

test("resources, get involved, and get help section titles use their horizontal space", async ({
  page,
}) => {
  const routes = [
    {
      route: "/resources",
      selectors: [
        ".resource-response__copy h2",
        ".resource-trusted__intro h2",
        ".resource-ready h2",
      ],
    },
    {
      route: "/get-involved",
      selectors: [
        ".involve-paths__content > header h2",
        ".involve-close h2",
      ],
    },
    {
      route: "/get-help",
      selectors: [
        ".help-response header h2",
        ".help-actions header h2",
        ".help-after h2",
      ],
    },
  ] as const;

  await page.setViewportSize({ width: 1440, height: 1000 });

  for (const route of routes) {
    await page.goto(`${baseUrl}${route.route}`);

    for (const selector of route.selectors) {
      const title = await page.locator(selector).evaluate((heading) => {
        const box = heading.getBoundingClientRect();
        const styles = getComputedStyle(heading);

        return {
          lines: box.height / Number.parseFloat(styles.lineHeight),
          width: box.width,
        };
      });

      expect(title.width, `${route.route} ${selector}`).toBeGreaterThanOrEqual(500);
      expect(title.lines, `${route.route} ${selector}`).toBeLessThanOrEqual(2.1);
    }
  }
});

test("paired inner-page compositions reveal as one synchronized unit", async ({
  page,
}) => {
  const sections = [
    { route: "/get-involved", marker: "involve-paths" },
    { route: "/resources", marker: "resources-response" },
    { route: "/get-help", marker: "help-response" },
    { route: "/get-help", marker: "help-actions" },
  ] as const;

  await page.setViewportSize({ width: 1440, height: 1000 });

  for (const section of sections) {
    await page.goto(`${baseUrl}${section.route}`);
    const composition = page.locator(
      `[data-synchronized-section="${section.marker}"]`,
    );

    await expect(composition).toHaveCount(1);
    await expect(composition).toHaveAttribute("data-reveal-item", "true");
    await expect(composition.locator("[data-reveal-item]")).toHaveCount(0);
  }

  await page.goto(`${baseUrl}/get-involved`);
  await expect(page.getByText("Ways your skills can help.")).toHaveCount(0);
  expect(
    await page
      .locator(".involve-paths__visual")
      .evaluate((element) => getComputedStyle(element).position),
  ).not.toBe("sticky");
});

test("redesigned route reveals stay legible while their landing motion runs", async ({
  page,
}) => {
  const routes = [
    { route: "/get-involved", marker: "involve-paths" },
    { route: "/resources", marker: "resources-response" },
    { route: "/get-help", marker: "help-response" },
  ] as const;

  for (const viewport of [
    { width: 1440, height: 1000 },
    { width: 390, height: 844 },
  ]) {
    await page.setViewportSize(viewport);

    for (const route of routes) {
      await page.goto(`${baseUrl}${route.route}`);

      const heroItem = page.locator(
        "main[data-page-layout] > .page-section:first-child [data-reveal-item]",
      );
      const heroAnimationNames = await heroItem.evaluate((element) =>
        element
          .getAnimations()
          .map((animation) =>
            animation instanceof CSSAnimation ? animation.animationName : "",
          ),
      );

      expect(
        heroAnimationNames.some((name) => name.startsWith("inner-")),
      ).toBeFalsy();

      const composition = page.locator(
        `[data-synchronized-section="${route.marker}"]`,
      );
      await composition.scrollIntoViewIfNeeded();
      const revealRoot = composition.locator("xpath=ancestor::*[@data-reveal-root]");
      await expect(revealRoot).toHaveAttribute("data-reveal-state", "visible");
      await page.waitForTimeout(120);

      const enteringOpacity = await composition.evaluate((element) =>
        Number.parseFloat(getComputedStyle(element).opacity),
      );
      expect(enteringOpacity).toBeGreaterThanOrEqual(0.55);

      await page.waitForTimeout(1450);
      const settledOpacity = await composition.evaluate((element) =>
        Number.parseFloat(getComputedStyle(element).opacity),
      );
      expect(settledOpacity).toBeGreaterThanOrEqual(0.99);

      const footer = page.locator("[data-site-footer]");
      await footer.scrollIntoViewIfNeeded();
      const footerRevealRoot = footer.locator(
        "xpath=ancestor::*[@data-reveal-root]",
      );
      await expect(footerRevealRoot).toHaveAttribute(
        "data-reveal-state",
        "visible",
      );
      await page.waitForTimeout(120);

      const enteringFooterOpacities = await footer
        .locator("[data-reveal-item]")
        .evaluateAll((elements) =>
          elements.map((element) =>
            Number.parseFloat(getComputedStyle(element).opacity),
          ),
        );
      expect(Math.min(...enteringFooterOpacities)).toBeGreaterThanOrEqual(0.55);
    }
  }
});

test("redesigned routes do not animate or shift content on pointer hover", async ({
  page,
}) => {
  const targets = [
    { route: "/get-involved", selector: ".involve-path-list a" },
    { route: "/resources", selector: ".resource-trusted__links a" },
    { route: "/get-help", selector: ".help-actions__links a" },
  ] as const;

  await page.setViewportSize({ width: 1440, height: 1000 });

  for (const target of targets) {
    await page.goto(`${baseUrl}${target.route}`);
    const link = page.locator(target.selector).first();
    await link.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1500);

    const before = await link.evaluate((element) => {
      const box = element.getBoundingClientRect();
      const styles = getComputedStyle(element);
      const arrow = element.querySelector("svg");
      const heading = element.querySelector("h3");

      return {
        left: box.left,
        width: box.width,
        headingLeft: heading?.getBoundingClientRect().left ?? box.left,
        transform: styles.transform,
        transitionDuration: styles.transitionDuration,
        arrowTransform: arrow ? getComputedStyle(arrow).transform : "none",
      };
    });

    await link.hover();
    await page.waitForTimeout(400);

    const after = await link.evaluate((element) => {
      const box = element.getBoundingClientRect();
      const styles = getComputedStyle(element);
      const arrow = element.querySelector("svg");
      const heading = element.querySelector("h3");

      return {
        left: box.left,
        width: box.width,
        headingLeft: heading?.getBoundingClientRect().left ?? box.left,
        transform: styles.transform,
        transitionDuration: styles.transitionDuration,
        arrowTransform: arrow ? getComputedStyle(arrow).transform : "none",
      };
    });

    expect(after.transitionDuration).toMatch(/^(0s)(, 0s)*$/);
    expect(Math.abs(after.left - before.left)).toBeLessThan(1);
    expect(Math.abs(after.width - before.width)).toBeLessThan(1);
    expect(Math.abs(after.headingLeft - before.headingLeft)).toBeLessThan(1);
    expect(after.transform).toBe(before.transform);
    expect(after.arrowTransform).toBe(before.arrowTransform);
  }
});

test("inner-page footer links provide mobile-sized touch targets", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${baseUrl}/resources`);

  const targets = await page.locator("[data-site-footer] nav a").evaluateAll((links) =>
    links.map((link) => {
      const box = link.getBoundingClientRect();
      return { width: box.width, height: box.height };
    }),
  );

  expect(targets.length).toBeGreaterThan(0);
  for (const target of targets) {
    expect(target.width).toBeGreaterThanOrEqual(44);
    expect(target.height).toBeGreaterThanOrEqual(44);
  }
});

test("about pale-blue sections remain visually continuous", async ({
  page,
}) => {
  for (const viewport of [
    { width: 1440, height: 1000 },
    { width: 390, height: 844 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto(`${baseUrl}/about`);

    const sections = await page.evaluate(() => {
      const sectionBox = (selector: string) => {
        const element = document.querySelector<HTMLElement>(selector);
        if (!element) {
          return null;
        }

        const rect = element.getBoundingClientRect();

        return {
          backgroundColor: getComputedStyle(element).backgroundColor,
          backgroundImage: getComputedStyle(element).backgroundImage,
          top: rect.top + window.scrollY,
          bottom: rect.bottom + window.scrollY,
        };
      };

      return {
        hasSpacerTransition: Boolean(
          document.querySelector(".about-section-transition--blue-to-warm"),
        ),
        mission: sectionBox(".about-reference-mission"),
        officers: sectionBox(".about-reference-officers"),
        invitation: sectionBox(".about-reference-invitation"),
      };
    });

    expect(sections.hasSpacerTransition).toBeFalsy();
    expect(sections.mission?.backgroundColor).toBe(
      sections.officers?.backgroundColor,
    );
    expect(
      Math.abs(
        (sections.mission?.bottom ?? 0) - (sections.officers?.top ?? 0),
      ),
    ).toBeLessThanOrEqual(2);
    expect(
      Math.abs(
        (sections.officers?.bottom ?? 0) -
          (sections.invitation?.top ?? 0),
      ),
    ).toBeLessThanOrEqual(2);
    expect(sections.invitation?.backgroundImage).toContain("linear-gradient");
  }
});

test("about middle sections use distinct restrained background atmosphere", async ({
  page,
}) => {
  for (const viewport of [
    { width: 1440, height: 1000 },
    { width: 390, height: 844 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto(`${baseUrl}/about`);

    const atmosphere = await page.evaluate(() => {
      const mission = document.querySelector<HTMLElement>(
        ".about-reference-mission",
      );
      const officers = document.querySelector<HTMLElement>(
        ".about-reference-officers",
      );
      const missionWash = document.querySelector<HTMLElement>(
        ".about-reference-mission__wash",
      );

      const pseudo = (
        element: HTMLElement | null,
        name: "::before" | "::after",
      ) => {
        const styles = element ? getComputedStyle(element, name) : null;

        return {
          backgroundImage: styles?.backgroundImage ?? "none",
          content: styles?.content ?? "none",
          opacity: styles?.opacity ?? "0",
          pointerEvents: styles?.pointerEvents ?? "auto",
        };
      };

      return {
        missionBackground: mission
          ? getComputedStyle(mission).backgroundImage
          : "none",
        officerBackground: officers
          ? getComputedStyle(officers).backgroundImage
          : "none",
        missionWashBackground: missionWash
          ? getComputedStyle(missionWash).backgroundImage
          : "none",
        missionBefore: pseudo(mission, "::before"),
        missionAfter: pseudo(mission, "::after"),
        officerBefore: pseudo(officers, "::before"),
        documentOverflows:
          document.documentElement.scrollWidth >
          document.documentElement.clientWidth,
      };
    });

    expect(atmosphere.documentOverflows).toBeFalsy();
    expect(atmosphere.missionBackground).not.toBe("none");
    expect(atmosphere.officerBackground).not.toBe("none");
    expect(atmosphere.missionBackground).not.toBe(
      atmosphere.officerBackground,
    );
    expect(atmosphere.missionWashBackground).toContain("radial-gradient");
    expect(atmosphere.missionBefore.content).not.toBe("none");
    expect(atmosphere.missionAfter.content).not.toBe("none");
    expect(atmosphere.officerBefore.content).not.toBe("none");
    expect(atmosphere.missionBefore.pointerEvents).toBe("none");
    expect(atmosphere.missionAfter.pointerEvents).toBe("none");
    expect(atmosphere.officerBefore.pointerEvents).toBe("none");

    if (viewport.width < 768) {
      expect(
        Number.parseFloat(atmosphere.missionAfter.opacity),
      ).toBeLessThanOrEqual(0.45);
      expect(
        Number.parseFloat(atmosphere.officerBefore.opacity),
      ).toBeLessThanOrEqual(0.7);
    }
  }
});

test("about reuses the homepage header and footer branding", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });

  const readBrandMetrics = async (route: string) => {
    await page.goto(`${baseUrl}${route}`, { waitUntil: "domcontentloaded" });
    await page.evaluate(() =>
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "instant" }),
    );

    const footer = page.locator("[data-site-footer]");
    await expect(footer).toBeVisible();
    await expect(footer.locator('a[href="/"]').first()).toBeVisible();

    return page.evaluate(() => {
      const styleSnapshot = (element: Element | null) => {
        if (!element) return null;
        const style = getComputedStyle(element);
        return {
          fontFamily: style.fontFamily,
          fontSize: style.fontSize,
          fontStyle: style.fontStyle,
          fontWeight: style.fontWeight,
          letterSpacing: style.letterSpacing,
          textTransform: style.textTransform,
        };
      };
      const box = (selector: string) => {
        const rect = document.querySelector<HTMLElement>(selector)?.getBoundingClientRect();
        return rect
          ? { left: rect.left, top: rect.top, width: rect.width, height: rect.height }
          : null;
      };

      return {
        headerLogo: box("[data-header-brand-logo]"),
        headerD4vStyle: styleSnapshot(document.querySelector("[data-header-brand-d4v]")),
        headerPlaceStyle: styleSnapshot(document.querySelector("[data-header-brand-place]")),
        footerLogo: box("[data-footer-brand-logo]"),
        footerName: box("[data-footer-brand-name]"),
        footerNameStyle: styleSnapshot(document.querySelector("[data-footer-brand-name]")),
      };
    });
  };

  const home = await readBrandMetrics("");
  const about = await readBrandMetrics("/about");

  expect(about.headerLogo).not.toBeNull();
  expect(home.headerLogo).not.toBeNull();
  expect(Math.abs((about.headerLogo?.left ?? 0) - (home.headerLogo?.left ?? 0))).toBeLessThanOrEqual(1);
  expect(about.headerLogo?.width).toBe(home.headerLogo?.width);
  expect(about.headerD4vStyle).toEqual(home.headerD4vStyle);
  expect(about.headerPlaceStyle).toEqual(home.headerPlaceStyle);

  expect((about.footerLogo?.width ?? 0) - (home.footerLogo?.width ?? 0)).toBeGreaterThanOrEqual(15);
  expect((home.footerLogo?.left ?? 0) - (about.footerLogo?.left ?? 0)).toBeGreaterThanOrEqual(7);
  expect(Math.abs((about.footerName?.left ?? 0) - (home.footerName?.left ?? 0))).toBeLessThanOrEqual(1);
  expect(about.footerNameStyle).toEqual(home.footerNameStyle);
  await expect(page.locator('[data-footer-tone="light"][data-footer-variant="about"]')).toBeVisible();
  await expect(page.locator(".about-reference-footer")).toHaveCount(0);
});

test("about uses the standard inner-page header and upright place wordmark", async ({
  page,
}) => {
  const readHeader = async (route: string) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(`${baseUrl}${route}`);

    return page.locator("[data-site-header]").evaluate((header) => {
      const navLinks = [...header.querySelectorAll<HTMLElement>("nav a")];
      const getHelp = navLinks.at(-1);
      const firstLink = navLinks[0];
      const place = header.querySelector<HTMLElement>(
        "[data-header-brand-place]",
      );
      const d4v = header.querySelector<HTMLElement>(
        "[data-header-brand-d4v]",
      );
      const style = (element: HTMLElement | undefined | null) =>
        element ? getComputedStyle(element) : null;

      return {
        labels: navLinks.map((link) => link.textContent?.trim() ?? ""),
        firstLinkFontSize: style(firstLink)?.fontSize ?? "",
        firstLinkPadding: style(firstLink)?.paddingInline ?? "",
        getHelpBackground: style(getHelp)?.backgroundColor ?? "",
        getHelpRadius: style(getHelp)?.borderRadius ?? "",
        getHelpFontSize: style(getHelp)?.fontSize ?? "",
        d4vFontFamily: style(d4v)?.fontFamily ?? "",
        d4vFontSize: style(d4v)?.fontSize ?? "",
        placeFontFamily: style(place)?.fontFamily ?? "",
        placeFontSize: style(place)?.fontSize ?? "",
        placeFontStyle: style(place)?.fontStyle ?? "",
      };
    });
  };

  const aboutHeader = await readHeader("/about");
  const standardHeader = await readHeader("/our-work");

  expect(aboutHeader.labels).toEqual(standardHeader.labels);
  expect(aboutHeader.firstLinkFontSize).toBe(
    standardHeader.firstLinkFontSize,
  );
  expect(aboutHeader.firstLinkPadding).toBe(standardHeader.firstLinkPadding);
  expect(aboutHeader.getHelpBackground).toBe(
    standardHeader.getHelpBackground,
  );
  expect(aboutHeader.getHelpRadius).toBe(standardHeader.getHelpRadius);
  expect(aboutHeader.getHelpFontSize).toBe(standardHeader.getHelpFontSize);
  expect(aboutHeader.placeFontFamily).toBe(aboutHeader.d4vFontFamily);
  expect(aboutHeader.placeFontSize).toBe(aboutHeader.d4vFontSize);
  expect(standardHeader.placeFontFamily).toBe(
    standardHeader.d4vFontFamily,
  );
  expect(standardHeader.placeFontSize).toBe(standardHeader.d4vFontSize);
  expect(aboutHeader.placeFontStyle).toBe("normal");
  expect(standardHeader.placeFontStyle).toBe("normal");
});

test("inner-page content remains visible without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();

  for (const route of innerRoutes) {
    await page.goto(`${baseUrl}${route}`);
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("[data-readable-copy]").first()).toBeVisible();
  }

  await context.close();
});

test("homepage keeps natural scrolling between planned sections", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(baseUrl, { waitUntil: "domcontentloaded" });

  const scrollState = await page.evaluate(() => ({
    scrollSnapType: getComputedStyle(document.documentElement).scrollSnapType,
    sections: document.querySelectorAll(".page-section").length,
  }));

  expect(scrollState.scrollSnapType).not.toContain("mandatory");
  expect(scrollState.sections).toBe(6);
});

test("confidence section mirrors the awareness layout on desktop", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(baseUrl, { waitUntil: "domcontentloaded" });

  const section = page.locator("[data-confidence-section]");
  const headingBox = await section.getByRole("heading").boundingBox();
  const imageBox = await section.locator("img").boundingBox();

  expect(headingBox).not.toBeNull();
  expect(imageBox).not.toBeNull();
  expect(imageBox?.x).toBeGreaterThan(headingBox?.x ?? 0);
});

test("section landing animation replays when revisiting a section", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(baseUrl, { waitUntil: "domcontentloaded" });

  const sections = page.locator(".page-section");
  const replaySection = page.locator("[data-reveal-root]").nth(1);

  await replaySection.evaluate((element) => {
    element.scrollIntoView({ block: "start", behavior: "instant" });
  });
  await page.waitForTimeout(500);
  await expect(replaySection).toHaveAttribute("data-reveal-state", "visible");

  await sections.first().evaluate((element) => {
    element.scrollIntoView({ block: "start", behavior: "instant" });
  });
  await page.waitForTimeout(500);
  await expect(replaySection).toHaveAttribute("data-reveal-state", "ready");

  await replaySection.evaluate((element) => {
    element.scrollIntoView({ block: "start", behavior: "instant" });
  });
  await page.waitForTimeout(500);
  await expect(replaySection).toHaveAttribute("data-reveal-state", "visible");
});

test("homepage section backgrounds remain contiguous during landing reveals", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(baseUrl, { waitUntil: "domcontentloaded" });

  await expect(page.locator("[data-reveal-root]").first()).not.toHaveAttribute(
    "data-reveal-state",
    "pending",
  );
  await page.waitForTimeout(1000);

  const initialLayout = await page.evaluate(() => {
    const hero = document.querySelector<HTMLElement>("main > .page-section");
    const revealRoots = [
      ...document.querySelectorAll<HTMLElement>("[data-reveal-root]"),
    ];
    const heroRect = hero?.getBoundingClientRect();
    const firstRevealRect = revealRoots[0]?.getBoundingClientRect();

    return {
      firstBoundaryGap:
        heroRect && firstRevealRect ? firstRevealRect.top - heroRect.bottom : 0,
      transforms: revealRoots.map((root) => getComputedStyle(root).transform),
    };
  });

  expect(Math.abs(initialLayout.firstBoundaryGap)).toBeLessThanOrEqual(1);
  expect(
    initialLayout.transforms.every(
      (transform) =>
        transform === "none" || transform === "matrix(1, 0, 0, 1, 0, 0)",
    ),
  ).toBeTruthy();

  const sections = page.locator(".page-section");
  for (let index = 1; index < (await sections.count()); index += 1) {
    await sections.nth(index).evaluate((element) => {
      element.scrollIntoView({ block: "start", behavior: "instant" });
    });
    await page.waitForTimeout(80);

    const boundary = await sections.nth(index).evaluate((element) => {
      const previous = element.previousElementSibling as HTMLElement | null;
      const currentRect = element.getBoundingClientRect();
      const previousRect = previous?.getBoundingClientRect();

      return {
        gap: previousRect ? currentRect.top - previousRect.bottom : 0,
        transform: getComputedStyle(element).transform,
      };
    });

    expect(Math.abs(boundary.gap)).toBeLessThanOrEqual(1);
    expect(["none", "matrix(1, 0, 0, 1, 0, 0)"]).toContain(
      boundary.transform,
    );
  }
});

test("site header scrolls away with the hero", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 800 });
  await page.goto(baseUrl, { waitUntil: "domcontentloaded" });

  const header = page.locator("[data-site-header]");
  await expect(header).toBeVisible();
  const initialTop = (await header.boundingBox())?.y ?? 0;

  await page.locator(".page-section").nth(1).evaluate((element) => {
    element.scrollIntoView({ block: "start", behavior: "instant" });
  });
  await page.waitForTimeout(500);

  const headerState = await header.evaluate((element) => ({
    position: getComputedStyle(element).position,
    top: element.getBoundingClientRect().top,
  }));

  expect(headerState.position).toBe("absolute");
  expect(headerState.top).toBeLessThan(initialTop);
});

test("mobile menu closes on escape and restores focus", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(400);

  const menuButton = page.getByRole("button", {
    name: "Open navigation menu",
  });

  await menuButton.click();

  const dialog = page.getByRole("dialog", { name: "Mobile navigation" });
  await expect(dialog).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(menuButton).toBeFocused();
});

test("mobile menu link closes the panel", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(400);

  await page.getByRole("button", { name: "Open navigation menu" }).click();
  await page
    .getByRole("dialog", { name: "Mobile navigation" })
    .getByRole("link", { name: "Resources" })
    .click();

  await expect(page).toHaveURL(/\/resources$/);
});

test("mobile menu remains usable across the full non-desktop breakpoint", async ({
  page,
}) => {
  for (const viewport of [
    { width: 768, height: 1024 },
    { width: 900, height: 900 },
    { width: 1023, height: 768 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto(`${baseUrl}/resources`, { waitUntil: "domcontentloaded" });

    await page.getByRole("button", { name: "Open navigation menu" }).click();

    const dialog = page.getByRole("dialog", { name: "Mobile navigation" });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("link", { name: "Resources" })).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
  }
});

test("mobile menu traps keyboard focus and makes page content inert", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${baseUrl}/resources`, { waitUntil: "domcontentloaded" });

  await page.getByRole("button", { name: "Open navigation menu" }).click();

  const dialog = page.getByRole("dialog", { name: "Mobile navigation" });
  await expect(dialog).toBeVisible();
  await expect(page.locator("main")).toHaveAttribute("inert", "");
  await expect(page.locator("footer")).toHaveAttribute("inert", "");

  for (let index = 0; index < 8; index += 1) {
    await page.keyboard.press("Tab");
    const focusIsInsideDialog = await page.evaluate(() =>
      Boolean(document.activeElement?.closest("#mobile-navigation")),
    );
    expect(focusIsInsideDialog).toBeTruthy();
  }
});

test("reduced motion still renders the homepage content", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(baseUrl, { waitUntil: "domcontentloaded" });

  await expect(
    page.getByRole("heading", { name: "Join Us in Preventing Online Fraud." }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: "Making Online Safety Easier to Understand",
    }),
  ).toBeVisible();
});

test("reduced motion removes inner-page photo movement", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${baseUrl}/about`);

  const primaryPhoto = page.locator("[data-story-photo]").first();
  const image = primaryPhoto.locator("img");

  await expect(primaryPhoto).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

  const motion = await image.evaluate((element) => {
    const styles = getComputedStyle(element);
    return {
      animationName: styles.animationName,
      transitionDuration: styles.transitionDuration,
      transform: styles.transform,
    };
  });

  expect(motion.animationName).toBe("none");
  expect(motion.transitionDuration).toBe("0s");
  expect(motion.transform).toBe("none");
});
