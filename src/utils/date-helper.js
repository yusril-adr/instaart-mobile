import CONFIG from '../global/config';

const DateHelper = {
  parse(inputedDate) {
    const [parseDate, parseTime] = inputedDate.split(' ');
    const [year, month, date] = parseDate.split('-');
    const [hour, minute, second] = parseTime.split(':');

    const result = {
      year,
      month: CONFIG.MONTH[month-1],
      date,
      hour,
      minute,
      second,
    };

    return result;
  },
};

export default DateHelper;
