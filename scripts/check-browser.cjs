const { chromium } = require('@playwright/test');
const assert = require('node:assert/strict');
const fs = require('node:fs');

(async () => {
  const browser = await chromium.launch({ headless: true, channel: 'msedge' });
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    const errors = [];
    fs.mkdirSync('.reference/preview', { recursive: true });
    page.on('pageerror', error => errors.push(error.message));
    const origin = 'http://127.0.0.1:3001';
    for (const route of ['/', '/catalogue', '/catalogue/zrk', '/catalogue/kmi', '/catalogue/mecata', '/about', '/contact']) {
      const response = await page.goto(origin + route);
      assert.equal(response.status(), 200, route);
      assert.equal(await page.locator('h1').count(), 1, `${route}: h1`);
      assert(await page.locator('link[rel="canonical"]').getAttribute('href'), `${route}: canonical`);
      assert.equal(await page.locator('img:not([alt])').count(), 0, `${route}: missing alt`);
    }
    await page.goto(origin + '/catalogue');
    await page.getByRole('button', { name: 'KMI', exact: true }).click();
    assert((await page.locator('.design-brand').allTextContents()).every(brand => brand === 'KMI'));
    await page.getByRole('searchbox').fill('no-such-design-987654');
    await page.getByRole('heading', { name: 'No designs found' }).waitFor();
    await page.getByRole('button', { name: 'Reset filters', exact: true }).last().click();
    await page.getByRole('searchbox').fill('5077');
    await page.waitForFunction(() => document.querySelector('.design-title')?.textContent.includes('5077'));
    assert.equal(await page.locator('.design-card').count(), 1);
    assert.match(await page.locator('.design-title').textContent(), /5077/);
    await page.getByRole('searchbox').fill('m03');
    await page.waitForFunction(() => document.querySelector('.design-title')?.textContent.includes('M-03'));
    assert.equal(await page.locator('.design-card').count(), 1);
    await page.reload();
    await page.waitForFunction(() => document.querySelector('.design-title')?.textContent.includes('M-03'));
    await page.getByRole('searchbox').fill('ZRK 5077');
    await page.waitForFunction(() => document.querySelector('.design-title')?.textContent.includes('5077'));
    assert.equal(await page.locator('.design-card').count(), 1);
    await page.locator('.design-card').first().click();
    await page.locator('dialog[open]').waitFor();
    await page.getByRole('button', { name: 'Zoom in', exact: true }).click();
    assert.equal(await page.locator('output').textContent(), '150%');
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('dialog[open]').count(), 0);
    await page.goto(origin);
    assert.match(await page.locator('.business-story').textContent(), /Hafiz Rizwan Akram/);
    assert.match(await page.locator('.business-story').textContent(), /August 2020/);
    const business = await page.locator('script[type="application/ld+json"]').evaluateAll(nodes => nodes.map(node => JSON.parse(node.textContent)).find(data => data['@graph'])['@graph'].find(item => item['@type'].includes('LocalBusiness')));
    assert.equal(business.telephone, '+923328302554');
    assert.equal(business.foundingDate, '2020-08');
    assert.equal(business.founder.name, 'Hafiz Rizwan Akram');
    assert.equal(business.legalName, 'Master Hardware & Plywood');
    const address = 'Mohallah Haji Pura, Opposite High Class Bakers, Sialkot Road, Gujranwala Wazirabad';
    assert.equal(business.address.streetAddress, address);
    assert.equal(business.address.addressLocality, 'Wazirabad');
    assert.equal(await page.locator('.footer-address').textContent(), address);
    assert.equal(await page.locator('.map-heading address').textContent(), address);
    await page.locator('.owner-portrait').scrollIntoViewIfNeeded();
    await page.locator('.owner-portrait').evaluate(image => image.decode());
    assert.equal(await page.locator('.owner-portrait').getAttribute('alt'), 'Hafiz Rizwan Akram, owner of Master Plywood, inside the shop');
    await page.locator('.business-story').screenshot({ path: '.reference/preview/business-desktop.png' });
    assert.equal(await page.locator('.contact-dock .dock-phone').getAttribute('href'), 'tel:+923328302554');
    assert.equal(await page.locator('.contact-dock .dock-whatsapp').getAttribute('href'), 'https://wa.me/923328302554');
    assert.match(await page.locator('.map-frame iframe').getAttribute('src'), /4851245079993976709/);
    await page.getByRole('searchbox').fill('7001');
    await page.getByRole('button', { name: 'Find design', exact: true }).click();
    await page.waitForURL('**/catalogue?q=7001');
    await page.waitForFunction(() => [...document.querySelectorAll('.design-title')].some(node => node.textContent.includes('7001')));
    fs.mkdirSync('.reference/preview', { recursive: true });
    await page.goto(origin);
    await page.screenshot({ path: '.reference/preview/home-desktop.png', fullPage: true });
    await page.setViewportSize({ width: 390, height: 844 });
    for (const route of ['/', '/catalogue', '/contact', '/about']) {
      await page.goto(origin + route);
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${route}: mobile overflow`);
      const dock = await page.locator('.contact-dock').boundingBox();
      assert(dock && dock.y + dock.height <= 845 && dock.height >= 65, `${route}: sticky contact controls`);
    }
    for (const width of [320, 360, 580, 768]) {
      await page.setViewportSize({ width, height: 844 });
      for (const route of ['/', '/catalogue', '/contact', '/about']) {
        await page.goto(origin + route);
        assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${route}: overflow at ${width}px`);
      }
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(origin + '/catalogue?q=5077');
    await page.waitForFunction(() => document.querySelector('.design-title')?.textContent.includes('5077'));
    assert(await page.locator('.design-title').evaluate(node => parseFloat(getComputedStyle(node).fontSize) >= 16), 'Readable mobile article titles');
    assert(await page.getByRole('searchbox').evaluate(node => parseFloat(getComputedStyle(node).fontSize) >= 16), 'Readable mobile search input');
    await page.goto(origin + '/about');
    await page.locator('.business-story').scrollIntoViewIfNeeded();
    await page.locator('.shop-photo img').evaluate(image => image.decode());
    await page.locator('.owner-portrait').evaluate(image => image.decode());
    await page.locator('.business-visuals').screenshot({ path: '.reference/preview/business-mobile.png' });
    await page.screenshot({ path: '.reference/preview/about-mobile.png' });
    await page.locator('.business-story-copy').scrollIntoViewIfNeeded();
    await page.screenshot({ path: '.reference/preview/owner-mobile.png' });
    await page.goto(origin + '/contact');
    assert.equal(await page.locator('.contact-details address').textContent(), address);
    assert.match(await page.locator('.contact-details').textContent(), /Master Hardware & Plywood/);
    await page.locator('.contact-details').scrollIntoViewIfNeeded();
    await page.screenshot({ path: '.reference/preview/contact-mobile.png' });
    await page.goto(origin);
    await page.getByRole('button', { name: 'Open navigation' }).click();
    await page.getByRole('link', { name: 'Visit the shop', exact: true }).click();
    await page.waitForURL('**/contact');
    await page.goto(origin);
    await page.screenshot({ path: '.reference/preview/home-mobile.png', fullPage: true });
    assert.equal((await page.goto(origin + '/missing-page')).status(), 404);
    for (const asset of ['/opengraph-image', '/apple-icon', '/robots.txt', '/sitemap.xml']) assert.equal((await page.request.get(origin + asset)).status(), 200, asset);
    assert.deepEqual(errors, []);
    console.log('Passed: seven routes, article-code search including punctuation and reload, home search, owner details and schema, shop photo, map, call/WhatsApp links, mobile readability and layouts at 320/360/390/580/768px, viewer controls, navigation, 404 and SEO endpoints.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
