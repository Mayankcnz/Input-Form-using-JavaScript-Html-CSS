/**
 * Created by Owner on 2/03/2018.
 */

/** Assigns the on load event to whatever is returned from the init function
 * when it's executed. init will be executed immediately (like, now, not when the window is done loading)
 * and the result will be assigned to window.load.
 * @type {init}
 */
window.onload = init;


function init(){


    // Bind "on submit" event handler to the submit button
    document.getElementById("formTest").onsubmit = validateForm;

    // Bind "onClick" event handler to "reset" button
    document.getElementById("btnReset").onclick = clearForm;

    //set intial focus
    document.getElementById("txtName").focus();
}


/** To clear the form. Remove class "errorBox" from input elements **/
function clearForm() {

    var elms = document.querySelectorAll('.errorBox');  // class, Get all elements in the document with class= errorBox
    for(var i = 0; i < elms.length; i++){
        elms[i].innerHTML = "";
    }

}

/*
 * The "onSubmit" event handler to validate the input fields.
 *
 * Most of the input validation functions take 3 arguments:
 *   inputElm: Input element to be validated.
 *   errMsg: the error message to be displayed if validation fails.
 *   errElm: to place the error message
 *
 * @param theForm: the form to be validated
 */

/**
 * A lot of people define static typing and dynamic typing with respect to the point at which the variable types are checked.
 * Using this analogy, static typed languages are those in which type checking is done at compile-time,
 * whereas dynamic typed languages are those in which type checking is done at run-time
 */

function validateForm(form) { // JavaScript is not a statically typed language.

    with(form){//writing the code using with statement make you code more succinct.
        // return false would prevent default submission

        return (isNotEmpty(txtName, "Please enter your name!", elmNameError)
             && isNumeric(txtZipcode, "Please enter a 5-digit zip code!", elmZipcodeError)
             && isLengthMinMax(txtZipcode, 5, 5, "Please enter 5-digit zip code", elmZipcodeError)
             && isSelected(selCountry, "Please make a selection!", elmCountryError)
             && isChecked("gender", "Please check a gender!", elmGenderError)
             && isChecked("color", "Please check a color!", elmColorError)
             && isNumeric(txtPhone, "Please enter a valid phone number!", elmPhoneError)
             && isValidEmail(txtEmail, "Enter a valid email!", elmEmailError)
             && isValidPassword(txtPassword, "Password shall be 6-8 characters!", elmPasswordError)
             && verifyPassword(txtPassword, txtPWVerified, "Different from new password!",
            elmPWVerifiedError));
    }


}


function isNotEmpty(inputField, errorMessage, errorPlace) {

    var isValid = inputField.value.trim() !== "";
    postValidate(isValid, inputField, errorMessage, errorPlace);
    return isValid;


}

/**function postValidate(isValid, inputField, errorMessage, errorPlace){


    if(!isValid){ // if the user input is not valid
        if(errorMessage !== undefined &&  errorMessage !== null
           && errorPlace !== undefined && errorPlace !== null){
            errorPlace.innerHTML = errorMessage; //  show error Message for the place reserved for it
        }

        // now need to set the focus on the input field to notify the user to correct the error
        if(inputField !== undefined && inputField !== null){
            inputField.classList.add("errorBox");
            inputField.focus();
        }
    }else { // the input is valid, so no need to show the error


        if(errorMessage !== undefined && errorMessage !== null){
            errorMessage.innerHTML = "";
        }
        if(errorPlace !== undefined && errorPlace !== null){
            errorPlace.classList.remove("errorBox");
        }

    }

}


function isNumeric(inputField, errorMessage, errorPlace) {

    var isValid = (inputField.value.trim().match(/^d+$/) !== null);
    postValidate(isValid, inputField, errorMessage, errorPlace);
    return isValid;
}**/

function postValidate(isValid, errMsg, errElm, inputElm) {
    if (!isValid) {
        // Show errMsg on errElm, if provided.
        if (errElm !== undefined && errElm !== null //  undefined property indicates that the variable has not been assigned a value
            && errMsg !== undefined && errMsg !== null) {
            errElm.innerHTML = errMsg; // get the inner property of the html element and assign it a error message
        }
        // Set focus on Input Element for correcting error, if provided.
        if (inputElm !== undefined && inputElm !== null) {
            inputElm.classList.add("errorBox");
            /** The classList property returns the class name(s) of an element, as a DOMTokenList
             * object. The property is useful to add, remove and toggle CSS classes on an element
             *
             */
            inputElm.focus();
        }
    } else {
        // Clear previous error message on errElm, if provided.
        if (errElm !== undefined && errElm !== null) {
            errElm.innerHTML = "";
        }
        if (inputElm !== undefined && inputElm !== null) {
            inputElm.classList.remove("errorBox");
        }
    }
}

/*
 * Validate that input value is not empty.
 *
 * @param inputElm (object): input element
 * @param errMsg (string): error message
 * @param errElm (object): element to place error message
 */
function isNotEmpty(inputElm, errMsg, errElm) {
    var isValid = (inputElm.value.trim() !== "");
    postValidate(isValid, errMsg, errElm, inputElm);
    return isValid;
}

/* Validate that input value contains one or more digits */
function isNumeric(inputElm, errMsg, errElm) {
    var isValid = (inputElm.value.trim().match(/^\d+$/) !== null);
    postValidate(isValid, errMsg, errElm, inputElm);
    return isValid;

}

function isLengthMinMax(inputField, min, max, errMsg, errElm){

    var inputValue = inputField.value.trim();
    var isValid = (inputValue.length >= min) && (inputValue.length <= max)
    postValidate(isValid, inputField, errMsg, errElm);
    return isValid;
}

function isSelected(inputField, errMsg , errElm) {

    var isValid = (inputField.value !== null);
    postValidate(isValid , inputField, errMsg, errElm);
    return isValid;
}

function isChecked(inputField, errMsg, errElm){

    var elms = document.getElementsByName("gender");
    var isChecked = false;
    for(var i = 0; i < elms.length; i++){
        if(elms[i].checked){
            isChecked = true;
            break;
        }
    }

    return isChecked;
}

/**The two forward-slashes /.../ contains a regexe.

 The leading ^ and trailing $ match the beginning and the ending of the input string, respectively. That is, the entire input string shall match with this regexe, instead of a part of the input string.

 \w+ matches 1 or more word characters (a-z, A-Z, 0-9 and underscore).

 [.-] matches character . or -. We need to use . to represent . as . has special meaning in regexe. The \ is known as the escape code, which restore the original literal meaning of the following character.

 [.-]? matches 0 or 1 occurrence of [.-].

 Again, \w+ matches 1 or more word characters.

 ([.-]?\w+)* matches 0 or more occurrences of [.-]?\w+.

 The sub-expression \w+([.-]?\w+)* is used to match the username in the email, before the @ sign. It begins with at least one word character (a-z, A-Z, 0-9 and underscore), followed by more word characters or . or -. However, a . or - must follow by a word character (a-z, A-Z, 0-9 and underscore). That is, the string cannot contain "..", "--", ".-" or "-.". Example of valid string are "a.1-2-3".

 The @ matches itself.

 Again, the sub-expression \w+([.-]?\w+)* is used to match the email domain name, with the same pattern as the username described above.

 The sub-expression .\w{2,3} matches a . followed by two or three word characters, e.g., ".com", ".edu", ".us", ".uk", ".co".

 (.\w{2,3})+ specifies that the above sub-expression shall occur one or more times, e.g., ".com", ".co.uk", ".edu.sg" etc.

 **/
function isValidEmail(inputElm, errMsg, errElm) {
    var isValid = (inputElm.value.trim().match(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) !== null);
    postValidate(isValid, errMsg, errElm, inputElm);
    return isValid;
}



/** Valid password 6-8 characters long **/
function isValidPassword(inputElm, errMsg, errPlace) {

    var isValid = inputElm.value.trim().match(/^\w{6-8}$/);
    postValidate(isValid,inputElm, errMsg, errPlace);
    return isValid;

}

/** Check if the password and verify password matches **/
function verifyPassword(password, verifiedPassword, errMsg, errPlace){

    var isValidPassword = password.value === verifiedPassword.value;
    postValidate(isValid,errMsg, errPlace,verifiedPassword);
    return isValidPassword;

}
