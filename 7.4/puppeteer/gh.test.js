let page;

beforeEach(async () => {
  page = await browser.newPage();
  //await page.goto("https://github.com/team");
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/team");
  });
  
  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual('GitHub: Where the world builds software · GitHub');
  }, 10000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", link => link.getAttribute('href'));
    expect(actual).toEqual("#start-of-content");
  }, 10000);
});
describe("Additional Github page tests", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/additional");
  });

  test("The h1 header content", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector("h1");
    const title2 = await page.title();
    expect(title2).toEqual("GitHub for teams · Build like the best teams on the planet · GitHub");
  }, 10000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", (link) => link.getAttribute("href"));
    expect(actual).toEqual("#start-of-content");
  }, 10000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, (link) =>
      link.textContent.trim()
    );
    expect(actual).toContain("Get started with Team");
  }, 10000);
});

describe("Second task - add 3 new tests", () => {
  afterEach(() => {
    page.close();
  });

  test("Blog", async () => {
    await page.goto("https://github.blog");
    const title = await page.title();
    expect(title).toContain(
      "The GitHub Blog | Updates, ideas, and inspiration from GitHub to help developers build and design software."
    );
  });

  test("h4Span Text under h1", async () => {
    await page.goto("https://github.com/features/security");
    const h4Span = await "h4 span.color-fg-default";
    const h4SpanText = await page.$eval(h4Span, (el) => el.textContent);
    expect(h4SpanText).toEqual(
      "Ship secure applications within the GitHub flow"
    );
  });

  test("Check Pricing page", async () => {
    await page.goto("https://github.com/pricing");
    const title = await page.title();
    expect(title).toContain("Pricing · Plans for every developer · GitHub");
  });
});
