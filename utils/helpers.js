module.exports = {
    format_date: (date) => {
        console.log('date', date);
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()
            }`;
    },
};