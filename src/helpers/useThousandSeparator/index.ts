const useThousandSeparator = (value, separator = ".", currency = "") => {
  if (value === null) {
    return "N/A";
  }
  if (value === undefined) {
    return "N/A";
  }
  return `${currency}${`${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, separator)}`;
};

export default useThousandSeparator;
