import moment from "moment";

export default class DateFormatter {
    static displayWeekDay(date) {
        return moment.unix(date).format('ddd').toUpperCase();
    }

    static displayMonthDate(date) {
        const monthDate = moment.unix(date).format('D');
        return (monthDate.toString().length < 2) ? `0${monthDate}` : monthDate;
    }
};
