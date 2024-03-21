# Date validator
Validate date string, on the basis date format variable value.

# Checks following date formats

1. "dd/mm/yyyy" or "DD/MM/YYYY"
2. "mm/dd/yyyy" or "MM/DD/YYYY"
3. "yyyy-mm-dd" or "YYYY-mm-dd"
4. "dd.mm.yyyy" or "yyyy.mm.dd"

# To call date-validator function

```
import isValidDate from 'date.js';

....

if (!isValidDate({dateFormat: 'mm/dd/yyyy', dateString: '12/12/2024'}) {
  // invalid date entered
}

```
