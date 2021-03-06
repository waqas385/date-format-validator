// Validates that the input string is a valid date formatted as ("mm/dd/yyyy", "dd/mm/yyyy", "dd.mm.yyyy", "yyyy-mm-dd")
String.prototype.isValidDate = function () {
  var dateString = this, dateFormatReg, parts, month, day, year, separator;
  if (portal_dateformat == undefined || portal_dateformat == null) {
    portal_dateformat = "mm/dd/yyyy";
  }

  switch (portal_dateformat) {
	case "YYYY-MM-DD":
	case "yyyy-mm-dd":
		dateFormatReg = /^\d{4}\-\d{1,2}\-\d{1,2}$/;
		separator = "-";
		break;
	case "DD/MM/YYYY":
	case "dd/mm/yyyy":
		dateFormatReg = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
		separator = "/";
		break;
	case "DD.MM.YYYY":
	case "dd.mm.yyyy":
		dateFormatReg = /^\d{1,2}\.\d{1,2}\.\d{4}$/;
		separator = ".";
		break;
	default:
		// MM/DD/YYYY
		// mm/dd/yyyy
		dateFormatReg = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
		separator = "/";
		break;
  }
	
	// First check for the pattern
    if(!dateFormatReg.test(dateString))
        return false;
	
    // Parse the date parts to integers
	switch (separator) {
		case ".":
			parts = dateString.split(".");
			day = parseInt(parts[1], 10);
			month = parseInt(parts[0], 10);
			year = parseInt(parts[2], 10);
	
			break;
		case "-":
			parts = dateString.split("-");
			day = parseInt(parts[2], 10);
			month = parseInt(parts[1], 10);
			year = parseInt(parts[0], 10);
	
			break;
		default:
			parts = dateString.split("/");
			if (portal_dateformat === "DD/MM/YYYY"
                                || portal_dateformat === "dd/mm/yyyy") {
                            
				day = parseInt(parts[0], 10);
				month = parseInt(parts[1], 10);
				year = parseInt(parts[2], 10);
			} else {
				day = parseInt(parts[1], 10);
				month = parseInt(parts[0], 10);
				year = parseInt(parts[2], 10);
			}
	
			break;
	}
   

    // Check the ranges of month and year
    if(year < 1000 || year > 3000 || month == 0 || month > 12)
        return false;

    var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    // Adjust for leap years
    if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
        monthLength[1] = 29;

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
};
