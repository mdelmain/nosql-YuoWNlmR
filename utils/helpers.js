const dayjs = require("dayjs");

const formatDate = (date) => {
    return dayjs(date).format("MMM Do, YYYY [at] hh:mm a");
};

module.exports = { formatDate };
