const sorting = require("../../app");

describe("Books names test suit", () => {
  it("Books names should be sorted in ascending order", () => {
    expect(
      sorting.sortByName([
        "Гарри Поттер",
        "Властелин Колец",
        "Волшебник изумрудного города",
        "А",
      ])
    ).toEqual([
      "А",
      "Властелин Колец",
      "Волшебник изумрудного города",
      "Гарри Поттер",
    ]);
  });
});
it("Letters should be sorted in ascending order", () => {
  expect(sorting.sortByName(["В", "Г", "А", "В", "Б", "А"])).toEqual([
    "А",
    "А",
    "Б",
    "В",
    "В",
    "Г",
  ]);
});
