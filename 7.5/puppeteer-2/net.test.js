const {
  selectDateTime,
  orderTickets,
  checkSeatIsTaken,
} = require("./lib/util.js");
const { getText } = require("./lib/commands");

let page;
let tomorrow = "nav.page-nav > a:nth-child(2)"; // Билеты на завтра
let oneWeek = "nav.page-nav > a:nth-child(7)"; // Билеты через неделю
let movieTime = "[data-seance-id='94']"; // 14:00, Hercules
let ticketHint = "p.ticket__hint";
let confirmingText =
  "Покажите QR-код нашему контроллеру для подтверждения бронирования.";

describe("Заказ билетов в кино", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("http://qamid.tmweb.ru/client/index.php");
    await page.setDefaultNavigationTimeout(0);
  });

  afterEach(() => {
    page.close();
  });

  test("Заказ одиного билета на фильм, на завтра", async () => {
    await selectDateTime(page, tomorrow, movieTime);
    await orderTickets(page, 1, 2);
    const actual = await getText(page, ticketHint);
    expect(actual).toContain(confirmingText);
  });

  test("Заказ на три билета на фильм, на неделю", async () => {
    await selectDateTime(page, oneWeek, movieTime);
    await orderTickets(page, 1, 8, 9, 10);
    const actual = await getText(page, ticketHint);
    expect(actual).toContain(confirmingText);
  });

  test("Заказ билета на фильм, если место уже занято", async () => {
    await expect(async () => {
      await selectDateTime(page, tomorrow, movieTime);
      await orderTickets(page, 1, 2);
    }).rejects.toThrowError("Seat(s) is taken");
  });

  test("Проверка, занято ли место после оформления заказа ", async () => {
    let row = 3;
    let seat = 10;
    await selectDateTime(page, oneWeek, movieTime);
    await orderTickets(page, row, seat);
    await page.goto("http://qamid.tmweb.ru/client/index.php");
    await selectDateTime(page, oneWeek, movieTime);
    await checkSeatIsTaken(page, row, seat);
    const classExist = await page.$eval(
      `div.buying-scheme__wrapper > div:nth-child(${row}) > span:nth-child(${seat})`,
      (el) => el.classList.contains("buying-scheme__chair_taken")
    );
    expect(classExist).toEqual(true);
  });
});
















/* const { clickElement, putText, getText } = require("./lib/commands.js");
const { generateName } = require("./lib/util.js");

let page;

beforeEach(async () => {
page = await browser.newPage();
await page.setDefaultNavigationTimeout(0);
});

afterEach(() => {
page.close();
});

describe("Netology.ru tests", () => {
beforeEach(async () => {
page = await browser.newPage();
await page.goto("https://netology.ru");
});

test("The first test'", async () => {
const title = await page.title();
console.log("Page title: " + title);
await clickElement(page, "header a + a");
const title2 = await page.title();
console.log("Page title: " + title2);
const pageList = await browser.newPage();
await pageList.goto("https://netology.ru/navigation");
await pageList.waitForSelector("h1");
});

test("The first link text 'Медиа Нетологии'", async () => {
const actual = await getText(page, "header a + a");
expect(actual).toContain("Медиа Нетологии");
});

test("The first link leads on 'Медиа' page", async () => {
await clickElement(page, "header a + a");
const actual = await getText(page, ".logo__media");
await expect(actual).toContain("Медиа");
});
});

test("Should look for a course", async () => {
await page.goto("https://netology.ru/navigation");
await putText(page, "input", "тестировщик");
const actual = await page.$eval("a[data-name]", (link) => link.textContent);
const expected = "Тестировщик ПО";
expect(actual).toContain(expected);
});

test("Should show warning if login is not email", async () => {
await page.goto("https://netology.ru/?modal=sign_in");
await putText(page, 'input[type="email"]', generateName(5));
});
 */