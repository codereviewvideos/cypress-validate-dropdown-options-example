import sortByOptions, { initialOptions, SortByOption } from "./sort-by-options";

describe("service/sort-by-options", () => {
  it("should return all the initial options if no selection is given", () => {
    expect(sortByOptions()).toEqual(initialOptions);
  });

  it("should return an empty array if allOptions is explicitly empty", () => {
    expect(sortByOptions({ allOptions: [] })).toEqual([]);
  });

  it("should return the expected array if allOptions and selectedOptions are explicitly empty", () => {
    expect(sortByOptions({ allOptions: [], selectedOptions: [] })).toEqual([]);
  });

  it("should return all the given initial options if selectedOptions is explicitly empty", () => {
    const given = [initialOptions[0], initialOptions[2]];
    expect(
      sortByOptions({
        allOptions: given,
      }),
    ).toEqual(given);
  });

  it("should return filtered options when selectedOptions is provided", () => {
    const selectedOptions: SortByOption["value"][] = ["published", "updated"];

    const expectedOptions: SortByOption[] = [
      {
        value: "views",
        text: "Most views",
      },
      {
        value: "comments",
        text: "Most comments",
      },
    ];

    expect(sortByOptions({ selectedOptions })).toEqual(expectedOptions);
  });
});
