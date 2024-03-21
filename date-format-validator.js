function getDateFormatRegex(dateFormat) {
  let dateRegex = '';
  let dateSeparator = '';

  switch (dateFormat) {
    case "YYYY-MM-DD":
    case "yyyy-mm-dd":
      dateRegex = /^\d{4}\-\d{1,2}\-\d{1,2}$/;
      dateSeparator = "-";
      break;
    case "DD/MM/YYYY":
    case "dd/mm/yyyy":
      dateRegex = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
      dateSeparator = "/";
      break;
    case "DD.MM.YYYY":
    case "dd.mm.yyyy":
      dateRegex = /^\d{1,2}\.\d{1,2}\.\d{4}$/;
      dateSeparator = ".";
      break;
    default:
      // MM/DD/YYYY
      // mm/dd/yyyy
      dateRegex = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
      dateSeparator = "/";
      break;
  }

  return {
    dateRegex,
    dateSeparator
  }
}

function parseDateString(dateString, dateSeparator, dateFormat) {
  let day = '';
  let month = '';
  let year = '';
  let dateArray = [];

  switch (dateSeparator) {
		case ".":
			dateArray = dateString.split(".");
			day = parseInt(dateArray[1], 10);
			month = parseInt(dateArray[0], 10);
			year = parseInt(dateArray[2], 10);
	
			break;
		case "-":
			dateArray = dateString.split("-");
			day = parseInt(dateArray[2], 10);
			month = parseInt(dateArray[1], 10);
			year = parseInt(dateArray[0], 10);
	
			break;
		default:
			dateArray = dateString.split("/");
			if (dateFormat === "DD/MM/YYYY" || dateFormat === "dd/mm/yyyy") {
				day = parseInt(dateArray[0], 10);
				month = parseInt(dateArray[1], 10);
				year = parseInt(dateArray[2], 10);
			} else {
				day = parseInt(dateArray[1], 10);
				month = parseInt(dateArray[0], 10);
				year = parseInt(dateArray[2], 10);
			}
	
			break;
	}

  return {
    day,
    month,
    year
  }
}

function monthDaysArray(year) {
  let monthsDays = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

  // Adjust for leap years
  if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
    monthsDays[1] = 29;
  }

  return monthsDays;
}
 
/**
 * 
 * @param options object containing dateString, dateFormat
 */
export default function isValidDate(options) {
  let dateFormat = '';
  if (!options.dateFormat) {
    dateFormat = 'mm/dd/yyyy';
  }

  const { dateRegex, dateSeparator } = getDateFormatRegex(dateFormat);

  if (!dateRegex.test(options.dateString)) {
    return false;
  }

  const { day, month, year} = parseDateString(options.dateString, dateSeparator, options.dateFormat);

  // month & days range
  if (year < 1000 || year > 3000 || month == 0 || month > 12) {
    return false;
  }

  let monthDays = monthDaysArray(year);

  return day > 0 && day <= monthDays[month - 1];
}
