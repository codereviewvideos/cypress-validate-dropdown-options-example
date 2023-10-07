export type SortByOption =
  | {
      value: "published";
      text: "Recently published";
    }
  | {
      value: "updated";
      text: "Recently updated";
    }
  | {
      value: "views";
      text: "Most views";
    }
  | {
      value: "comments";
      text: "Most comments";
    };

export const initialOptions: SortByOption[] = [
  {
    value: "published",
    text: "Recently published",
  },
  {
    value: "updated",
    text: "Recently updated",
  },
  {
    value: "views",
    text: "Most views",
  },
  {
    value: "comments",
    text: "Most comments",
  },
];

type SortByOptions = {
  allOptions?: SortByOption[];
  selectedOptions?: SortByOption["value"][];
};

const sortByOptions = ({
  allOptions = initialOptions,
  selectedOptions = [],
}: SortByOptions = {}): SortByOption[] => {
  if (selectedOptions.length === 0) {
    return allOptions;
  }

  return allOptions.filter(
    (option) =>
      !selectedOptions.some(
        (selectedOption) => selectedOption === option.value,
      ),
  );
};
export default sortByOptions;
