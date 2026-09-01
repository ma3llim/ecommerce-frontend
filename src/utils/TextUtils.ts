export const capitalizeWords = (str: string) => {
    return str
        ?.trim()
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
};

export const formatNumberWithCommas = (number: number) => {
    return new Intl.NumberFormat().format(number);
};
