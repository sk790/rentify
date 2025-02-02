export const useFormateDate = (date?: string) => {
  if (date) {
    return new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      // year: "numeric",
    });
  }
};
export const useFormateDateWithYear = (date?: string) => {
  if (date) {
    return new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }
};
export const useFormateTime = (date?: string) => {
  if (date) {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
    });
  }
};
