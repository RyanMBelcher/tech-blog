module.exports = {
    format_time: (date) => {
        return date.toLocaleTimeString();
    },
    format_date: (date) => {
        const month = date.getMonth()
        const day = date.getDate()
        const year = date.getFullYear()

        const formattedDate = `${month}/${day}/${year}`

        return formattedDate;
    }
};