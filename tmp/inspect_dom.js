const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(2000);
  
  // Test selector on home page
  const sel = 'div#root:nth-of-type(1) > div:nth-of-type(1) > main:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1)';
  const el = await page.$(sel);
  console.log('On home page match:', el ? await el.evaluate(e => e.outerHTML.substring(0, 300)) : 'NULL');

  // Let's check all direct children of main
  const mainChildren = await page.evaluate(() => {
    const main = document.querySelector('main');
    if (!main) return [];
    return Array.from(main.children).map((c, i) => ({
      index: i,
      tagName: c.tagName,
      id: c.id,
      className: c.className.substring(0, 50),
      text: c.innerText ? c.innerText.substring(0, 60).replace(/\n/g, ' ') : ''
    }));
  });
  console.log('Main children:', JSON.stringify(mainChildren, null, 2));

  // Now let's test other views:
  // 1. Click "Read our latest blog posts"
  // Let's test if any view matches sel
  const views = ['blogs', 'agencies', 'routes', 'vehicles', 'how-it-works'];
  for (const v of views) {
    await page.goto('http://localhost:3000/?view=' + v);
    await page.waitForTimeout(1000);
    const matched = await page.$(sel);
    if (matched) {
      const info = await matched.evaluate(e => ({
        tagName: e.tagName,
        className: e.className,
        text: e.innerText ? e.innerText.substring(0, 100).replace(/\n/g, ' ') : ''
      }));
      console.log(`View ${v} matches sel:`, info);
    }
  }

  await browser.close();
})();
