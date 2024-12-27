import dayjs from "dayjs";

export default function useFormatDate() {
  const formattingDate = (date, OptionsFormat) => {
    const FormattedDate = dayjs(date);
    return FormattedDate.format(OptionsFormat);
  };
  return {
    formattingDate,
  };
}
