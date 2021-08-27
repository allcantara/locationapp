import {format} from 'date-fns';

const formatDateFromString = (date: Date, formatString: string) => {
  return format(date, formatString);
};

export default formatDateFromString;
