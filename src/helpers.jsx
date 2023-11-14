export const formatDate = (dateStr) => {
    const date = new Date(dateStr);

    return date.getDate() + '/' + (date.getMonth()+1);
};
