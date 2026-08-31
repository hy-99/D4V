# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui-qa.spec.ts >> resources, get involved, and get help section titles use their horizontal space
- Location: tests/ui-qa.spec.ts:1296:5

# Error details

```
Error: /resources .resource-response__copy h2

expect(received).toBeGreaterThanOrEqual(expected)

Expected: >= 500
Received:    442.34375
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - link "Skip to content" [ref=e2] [cursor=pointer]:
    - /url: "#main-content"
  - banner [ref=e3]:
    - generic [ref=e4]:
      - link "D4V Bay Area logo D4V Bay Area" [ref=e5] [cursor=pointer]:
        - /url: /
        - img "D4V Bay Area logo" [ref=e7]
        - generic [ref=e8]:
          - generic [ref=e9]: D4V
          - generic [ref=e10]: Bay Area
      - navigation "Primary" [ref=e11]:
        - link "About" [ref=e12] [cursor=pointer]:
          - /url: /about
        - link "Our Work" [ref=e13] [cursor=pointer]:
          - /url: /our-work
        - link "Resources" [ref=e14] [cursor=pointer]:
          - /url: /resources
        - link "Get Involved" [ref=e15] [cursor=pointer]:
          - /url: /get-involved
        - link "Get Help" [ref=e16] [cursor=pointer]:
          - /url: /get-help
  - main [ref=e17]:
    - generic [ref=e19]:
      - figure [ref=e20]:
        - img "An older adult reading useful information on a tablet." [ref=e22]
      - generic [ref=e24]:
        - heading "Find the next safe step." [level=1] [ref=e25]
        - paragraph [ref=e26]: Online-safety advice is easier to use when it follows one calm, repeatable order. Give yourself room, verify through a separate route, and protect only what may be exposed.
        - paragraph [ref=e27]: Pause. Check. Protect.
    - region [ref=e29]:
      - generic [ref=e30]:
        - generic [ref=e31]:
          - figure [ref=e32]:
            - img "An older adult using a tablet comfortably at home." [ref=e34]
          - paragraph [ref=e35]: Slow the moment down before deciding what belongs next.
        - generic [ref=e36]:
          - heading "A safer response starts with room to think." [level=2] [ref=e38]
          - paragraph [ref=e39]: You do not need to decide everything at once. Each move creates more distance from the pressure and a clearer next choice.
          - list [ref=e40]:
            - listitem [ref=e41]:
              - generic [ref=e42]: "01"
              - generic [ref=e43]:
                - generic [ref=e44]:
                  - heading "Pause" [level=3] [ref=e45]
                  - paragraph [ref=e46]: When a message feels urgent
                - paragraph [ref=e47]: Do not click, reply, or send money while someone is rushing you. Step away from the request and give yourself room to think.
                - strong [ref=e48]: Urgency is a reason to slow down.
            - listitem [ref=e49]:
              - generic [ref=e50]: "02"
              - generic [ref=e51]:
                - generic [ref=e52]:
                  - heading "Check" [level=3] [ref=e53]
                  - paragraph [ref=e54]: Before you trust the request
                - paragraph [ref=e55]: Use a phone number, app, or website you already know. Verify who is contacting you through a separate, familiar route.
                - strong [ref=e56]: A separate channel breaks the pressure.
            - listitem [ref=e57]:
              - generic [ref=e58]: "03"
              - generic [ref=e59]:
                - generic [ref=e60]:
                  - heading "Protect" [level=3] [ref=e61]
                  - paragraph [ref=e62]: When information may be exposed
                - paragraph [ref=e63]: Change affected passwords from a trusted device, turn on multi-factor authentication, and contact the relevant provider directly.
                - strong [ref=e64]: Protect the account before returning to the message.
    - region [ref=e66]:
      - generic [ref=e67]:
        - generic [ref=e68]:
          - heading "Trusted places to continue." [level=2] [ref=e69]
          - paragraph [ref=e70]: These public services provide the detailed reporting and recovery steps that a short guide cannot replace.
        - generic [ref=e71]:
          - link "Federal Trade Commission What to do if you were scammed A practical response guide for payments, accounts, personal information, and other scam situations." [ref=e72] [cursor=pointer]:
            - /url: https://consumer.ftc.gov/articles/what-do-if-you-were-scammed
            - generic [ref=e73]: Federal Trade Commission
            - heading "What to do if you were scammed" [level=3] [ref=e74]
            - paragraph [ref=e75]: A practical response guide for payments, accounts, personal information, and other scam situations.
          - link "IdentityTheft.gov Make an identity-theft recovery plan A guided federal service for reporting identity theft and creating situation-specific recovery steps." [ref=e80] [cursor=pointer]:
            - /url: https://www.identitytheft.gov/
            - generic [ref=e81]: IdentityTheft.gov
            - heading "Make an identity-theft recovery plan" [level=3] [ref=e82]
            - paragraph [ref=e83]: A guided federal service for reporting identity theft and creating situation-specific recovery steps.
          - link "Cybersecurity and Infrastructure Security Agency Build safer account habits Clear guidance on strong passwords, multi-factor authentication, phishing, and software updates." [ref=e88] [cursor=pointer]:
            - /url: https://www.cisa.gov/secure-our-world
            - generic [ref=e89]: Cybersecurity and Infrastructure Security Agency
            - heading "Build safer account habits" [level=3] [ref=e90]
            - paragraph [ref=e91]: Clear guidance on strong passwords, multi-factor authentication, phishing, and software updates.
    - region [ref=e97]:
      - generic [ref=e98]:
        - generic [ref=e99]:
          - heading "Unsure what belongs next?" [level=2] [ref=e100]
          - paragraph [ref=e101]: Step away from the message and use a separate, trusted channel before taking another action.
        - link "Help with a current concern" [ref=e102] [cursor=pointer]:
          - /url: /get-help
  - contentinfo [ref=e106]:
    - generic [ref=e107]:
      - link "D4V Bay Area logo D4V Bay Area Empowering our community. Protecting what matters." [ref=e109] [cursor=pointer]:
        - /url: /
        - img "D4V Bay Area logo" [ref=e111]
        - generic [ref=e112]:
          - generic [ref=e113]: D4V Bay Area
          - generic [ref=e114]: Empowering our community.Protecting what matters.
      - navigation "Footer quick links" [ref=e115]:
        - heading "Quick Links" [level=2] [ref=e116]
        - list [ref=e117]:
          - listitem [ref=e118]:
            - link "About" [ref=e119] [cursor=pointer]:
              - /url: /about
          - listitem [ref=e120]:
            - link "Our Work" [ref=e121] [cursor=pointer]:
              - /url: /our-work
          - listitem [ref=e122]:
            - link "Resources" [ref=e123] [cursor=pointer]:
              - /url: /resources
          - listitem [ref=e124]:
            - link "Get Involved" [ref=e125] [cursor=pointer]:
              - /url: /get-involved
      - navigation "Footer help links" [ref=e126]:
        - heading "Get Help" [level=2] [ref=e127]
        - list [ref=e128]:
          - listitem [ref=e129]:
            - link "Report a Scam" [ref=e130] [cursor=pointer]:
              - /url: https://reportfraud.ftc.gov/
          - listitem [ref=e131]:
            - link "Find Resources" [ref=e132] [cursor=pointer]:
              - /url: /resources
      - generic [ref=e133]:
        - heading "Stay Connected" [level=2] [ref=e134]
        - link "Contact D4V Bay Area through Get Help" [ref=e135] [cursor=pointer]:
          - /url: /get-help
    - generic [ref=e139]: © 2026 D4V Bay Area.
  - button "Open Next.js Dev Tools" [ref=e146] [cursor=pointer]
  - alert [ref=e150]
```

# Test source

```ts
  1241 | 
  1242 |   const helpHeights = await page.locator("main").evaluate((main) => ({
  1243 |     response: main.querySelector(".help-response")?.getBoundingClientRect().height ?? 0,
  1244 |     actions: main.querySelector(".help-actions")?.getBoundingClientRect().height ?? 0,
  1245 |   }));
  1246 | 
  1247 |   expect(helpHeights.response).toBeLessThanOrEqual(740);
  1248 |   expect(helpHeights.actions).toBeLessThanOrEqual(740);
  1249 | 
  1250 |   await page.setViewportSize({ width: 390, height: 844 });
  1251 |   await page.goto(`${baseUrl}/get-help`);
  1252 | 
  1253 |   const mobileHelpActions = await page.locator(".help-actions").evaluate((section) => {
  1254 |     const grid = section.querySelector(".help-actions__grid");
  1255 | 
  1256 |     return {
  1257 |       height: section.getBoundingClientRect().height,
  1258 |       columns: grid ? getComputedStyle(grid).gridTemplateColumns.split(" ").length : 0,
  1259 |     };
  1260 |   });
  1261 | 
  1262 |   expect(mobileHelpActions.height).toBeLessThanOrEqual(1250);
  1263 |   expect(mobileHelpActions.columns).toBe(1);
  1264 | });
  1265 | 
  1266 | test("resources, get involved, and get help hero titles use their horizontal space", async ({
  1267 |   page,
  1268 | }) => {
  1269 |   await page.setViewportSize({ width: 1440, height: 1000 });
  1270 | 
  1271 |   for (const route of ["/resources", "/get-involved", "/get-help"]) {
  1272 |     await page.goto(`${baseUrl}${route}`);
  1273 | 
  1274 |     const title = await page.locator("h1").evaluate((heading) => {
  1275 |       const box = heading.getBoundingClientRect();
  1276 |       const styles = getComputedStyle(heading);
  1277 |       const range = document.createRange();
  1278 |       range.selectNodeContents(heading);
  1279 | 
  1280 |       return {
  1281 |         lines: box.height / Number.parseFloat(styles.lineHeight),
  1282 |         right: box.right,
  1283 |         inkWidth: range.getBoundingClientRect().width,
  1284 |       };
  1285 |     });
  1286 | 
  1287 |     expect(title.lines).toBeLessThanOrEqual(route === "/get-help" ? 1.1 : 2.1);
  1288 |     expect(title.right).toBeLessThanOrEqual(1408);
  1289 | 
  1290 |     if (route === "/get-help") {
  1291 |       expect(title.inkWidth).toBeGreaterThanOrEqual(510);
  1292 |     }
  1293 |   }
  1294 | });
  1295 | 
  1296 | test("resources, get involved, and get help section titles use their horizontal space", async ({
  1297 |   page,
  1298 | }) => {
  1299 |   const routes = [
  1300 |     {
  1301 |       route: "/resources",
  1302 |       selectors: [
  1303 |         ".resource-response__copy h2",
  1304 |         ".resource-trusted__intro h2",
  1305 |         ".resource-ready h2",
  1306 |       ],
  1307 |     },
  1308 |     {
  1309 |       route: "/get-involved",
  1310 |       selectors: [
  1311 |         ".involve-paths__content > header h2",
  1312 |         ".involve-close h2",
  1313 |       ],
  1314 |     },
  1315 |     {
  1316 |       route: "/get-help",
  1317 |       selectors: [
  1318 |         ".help-response header h2",
  1319 |         ".help-actions header h2",
  1320 |         ".help-after h2",
  1321 |       ],
  1322 |     },
  1323 |   ] as const;
  1324 | 
  1325 |   await page.setViewportSize({ width: 1440, height: 1000 });
  1326 | 
  1327 |   for (const route of routes) {
  1328 |     await page.goto(`${baseUrl}${route.route}`);
  1329 | 
  1330 |     for (const selector of route.selectors) {
  1331 |       const title = await page.locator(selector).evaluate((heading) => {
  1332 |         const box = heading.getBoundingClientRect();
  1333 |         const styles = getComputedStyle(heading);
  1334 | 
  1335 |         return {
  1336 |           lines: box.height / Number.parseFloat(styles.lineHeight),
  1337 |           width: box.width,
  1338 |         };
  1339 |       });
  1340 | 
> 1341 |       expect(title.width, `${route.route} ${selector}`).toBeGreaterThanOrEqual(500);
       |                                                         ^ Error: /resources .resource-response__copy h2
  1342 |       expect(title.lines, `${route.route} ${selector}`).toBeLessThanOrEqual(2.1);
  1343 |     }
  1344 |   }
  1345 | });
  1346 | 
  1347 | test("paired inner-page compositions reveal as one synchronized unit", async ({
  1348 |   page,
  1349 | }) => {
  1350 |   const sections = [
  1351 |     { route: "/get-involved", marker: "involve-paths" },
  1352 |     { route: "/resources", marker: "resources-response" },
  1353 |     { route: "/get-help", marker: "help-response" },
  1354 |     { route: "/get-help", marker: "help-actions" },
  1355 |   ] as const;
  1356 | 
  1357 |   await page.setViewportSize({ width: 1440, height: 1000 });
  1358 | 
  1359 |   for (const section of sections) {
  1360 |     await page.goto(`${baseUrl}${section.route}`);
  1361 |     const composition = page.locator(
  1362 |       `[data-synchronized-section="${section.marker}"]`,
  1363 |     );
  1364 | 
  1365 |     await expect(composition).toHaveCount(1);
  1366 |     await expect(composition).toHaveAttribute("data-reveal-item", "true");
  1367 |     await expect(composition.locator("[data-reveal-item]")).toHaveCount(0);
  1368 |   }
  1369 | 
  1370 |   await page.goto(`${baseUrl}/get-involved`);
  1371 |   await expect(page.getByText("Ways your skills can help.")).toHaveCount(0);
  1372 |   expect(
  1373 |     await page
  1374 |       .locator(".involve-paths__visual")
  1375 |       .evaluate((element) => getComputedStyle(element).position),
  1376 |   ).not.toBe("sticky");
  1377 | });
  1378 | 
  1379 | test("redesigned route reveals stay legible while their landing motion runs", async ({
  1380 |   page,
  1381 | }) => {
  1382 |   const routes = [
  1383 |     { route: "/get-involved", marker: "involve-paths" },
  1384 |     { route: "/resources", marker: "resources-response" },
  1385 |     { route: "/get-help", marker: "help-response" },
  1386 |   ] as const;
  1387 | 
  1388 |   for (const viewport of [
  1389 |     { width: 1440, height: 1000 },
  1390 |     { width: 390, height: 844 },
  1391 |   ]) {
  1392 |     await page.setViewportSize(viewport);
  1393 | 
  1394 |     for (const route of routes) {
  1395 |       await page.goto(`${baseUrl}${route.route}`);
  1396 | 
  1397 |       const heroItem = page.locator(
  1398 |         "main[data-page-layout] > .page-section:first-child [data-reveal-item]",
  1399 |       );
  1400 |       const heroAnimationNames = await heroItem.evaluate((element) =>
  1401 |         element
  1402 |           .getAnimations()
  1403 |           .map((animation) =>
  1404 |             animation instanceof CSSAnimation ? animation.animationName : "",
  1405 |           ),
  1406 |       );
  1407 | 
  1408 |       expect(
  1409 |         heroAnimationNames.some((name) => name.startsWith("inner-")),
  1410 |       ).toBeFalsy();
  1411 | 
  1412 |       const composition = page.locator(
  1413 |         `[data-synchronized-section="${route.marker}"]`,
  1414 |       );
  1415 |       await composition.scrollIntoViewIfNeeded();
  1416 |       const revealRoot = composition.locator("xpath=ancestor::*[@data-reveal-root]");
  1417 |       await expect(revealRoot).toHaveAttribute("data-reveal-state", "visible");
  1418 |       await page.waitForTimeout(120);
  1419 | 
  1420 |       const enteringOpacity = await composition.evaluate((element) =>
  1421 |         Number.parseFloat(getComputedStyle(element).opacity),
  1422 |       );
  1423 |       expect(enteringOpacity).toBeGreaterThanOrEqual(0.55);
  1424 | 
  1425 |       await page.waitForTimeout(1450);
  1426 |       const settledOpacity = await composition.evaluate((element) =>
  1427 |         Number.parseFloat(getComputedStyle(element).opacity),
  1428 |       );
  1429 |       expect(settledOpacity).toBeGreaterThanOrEqual(0.99);
  1430 | 
  1431 |       const footer = page.locator("[data-site-footer]");
  1432 |       await footer.scrollIntoViewIfNeeded();
  1433 |       const footerRevealRoot = footer.locator(
  1434 |         "xpath=ancestor::*[@data-reveal-root]",
  1435 |       );
  1436 |       await expect(footerRevealRoot).toHaveAttribute(
  1437 |         "data-reveal-state",
  1438 |         "visible",
  1439 |       );
  1440 |       await page.waitForTimeout(120);
  1441 | 
```