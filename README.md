# date-format-validator
Validate date string, on the basis date format variable value.

# how to use
//Set date format

var portal_dateformat = "dd/mm/yyyy";

//To call date-validator function

function validateDate (dateFieldId) {

  var dateField = document.getElementById('dateField1');
  
  if (!dateField.value.isValidDate()) {
  
    alert('Invalid date entered');
    
    return false;
    
  }
  
}
