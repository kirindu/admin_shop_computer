export default function useFormatNumber() {
  const formattingNumber = (value) => {
    return new Intl.NumberFormat("en-US").format(value);
  };
  return {
    formattingNumber,
  };
}
