var inputArray = [];
var inputStorageArray = [];
var buttonClick = null;
var operatorClick = null;
var equateClick = null;
var decimalClick = null;
var operand = '';
var number = '';
var x = 3;

//function to grab number
function digit_input_one (value) {
    //conditional to allow number click
    if (buttonClick === null) {
        //get number value from html element
        var numberRetriever = $(value).children('h3').html();
        //differentiate between a decimal. If decimal has been clicked during forst operand then no other decimals will be allowed
        if(numberRetriever === '.' && decimalClick === null) {
            number = numberRetriever;
            //sets decimal conditional to be false
            decimalClick = false;
        }
        //conditional to allow all  html elements besides decimals top be logged
        else if (numberRetriever != '.') {
        number = numberRetriever;
        }
        console.log('Subsequent Number is: ' + number);
        //Once the first number has been enetered the operators may be clicked
        operatorClick = true;
    }
    //empty operand value set to add on the the number value for every click
    operand += number;
    //reset the number value
    number = '';
    //show the operand value on the screen
    $('.output').html(operand);
    console.log(operand);
    //allow operator buttons to be clicked
    equateClick = true;
}

function operate (value) {
    //conditional to allow operators to be clicked
    if (operatorClick === true) {
        //set variable for grabbing value from the screen
        var screenOutput = $('.output').html();
        //variable for grab the operator value form the html element
        var getOperator = $(value).children('h3');
        var operator = $(getOperator).html();
        //push the value from teh screen to the inputArray & storage Array
        inputArray.push(screenOutput,operator);
        inputStorageArray.push(screenOutput,operator);
        //Reste operator & number variables
        operand = '';
        number = '';
        //Allow decimals to be clicked again
        decimalClick = null;
        console.log(inputArray);
    }
}

function equate () {
    //variable for grabbing value from the screen
    var screenOutput = $('.output').html();
    //push the input value to the inputArray & storageArray
    inputArray.push(screenOutput);
    inputStorageArray.push(screenOutput);
    console.log(inputArray);
    //declare variable for the result
    var result;
    //declare variiable for the for loops
    var i;
    //clear operand and operators
    operand = '';
    number = '';
//conditional for getting rid of multiple successive operators
    if (inputArray[1] == '+' | '*' | '/' | '-' && inputArray[2] == '+' | '*' | '/' | '-') {
        inputArray.splice(1, inputArray.length-3);
        console.log(inputArray);
    }
    //conditional for the result of dividing by 0

    if (inputArray[1]=='/' && inputArray[2]=='0') {
        result = "Error";
        $('.output').html(result);
    }
//conditional for showing Ready on the screen if no inputs have been added
    else if (equateClick === null) {
        result = 'Ready!';
    }
        //conditional for logging the previous input if there is only one input

    else if (inputArray.length <= 1) {
        result = $('.output').html();
    }
//conditional for allowing shorthand functions i.e 3*= 9
    else if (inputArray <= 2) {
        //push the first index so it can be the second operand
        inputArray.push(inputArray[0]);
        //for loop for moving through the array
        for (i = 0; i < inputArray.length;) {
            console.log(i);
            var x = parseFloat(inputArray[i]);
            console.log('x= ' + x);
            var y = parseFloat(inputArray[i += 2]);
            console.log('y= ' + y);
            console.log('loop: ', inputArray);
            console.log(inputArray[1]);
            i--;

            switch (String(inputArray[i])) {
                case '+':
                    result = x + y;
                    //splice the first three indexes in the array to allow the values to deleted once they have been worked through and replacing them with the result so successive operation can take place
                    inputArray.splice(0, 3, result);
                    //var decimalSum = String(result);
                    console.log('sum: ' + result);
                    console.log('Array: ' + inputArray);
                    i = 0;
                    break;

                case '-':
                    result = x - y;
                    inputArray.splice(0, 3, result);
                    //var decimalSub = String(result);
                    console.log('sub: ' + result);
                    console.log('Array: ' + inputArray);
                    i = 0;
                    break;

                case '*':
                    result = x * y;
                    inputArray.splice(0, 3, result);
                    //var decimalMult = String(result);
                    console.log('mult: ' + result);
                    console.log('Array: ' + inputArray);
                    i = 0;
                    break;

                case '/':
                    result = x / y;
                    inputArray.splice(0, 3, result);
                    //var decimalDiv = String(result);
                    console.log('division: ' + result);
                    console.log('Array: ' + inputArray);
                    i = 0;
                    break;
            }

        }

    }
//conditional for allowing general mathematical operations
    else {
    //for loop for moving through the array
        for (i = 0; i < inputArray.length;) {
            console.log(i);
            var z = parseFloat(inputArray[i]);
            console.log('x= ' + z);
            var w = parseFloat(inputArray[i += 2]);
            console.log('y= ' + w);
            console.log('loop: ', inputArray);
            console.log(inputArray[1]);
            i--;

            switch (String(inputArray[i])) {
                case '+':
                    result = z + w;
                    //splice the first three indexes in the array to allow the values to deleted once they have been worked through and replacing them with the result so successive operation can take place
                    inputArray.splice(0, 3, result);
                    //var decimalSum = String(result);
                    console.log('sum: ' + result);
                    console.log('Array: ' + inputArray);
                    i = 0;
                    break;

                case '-':
                    result = z - w;
                    inputArray.splice(0, 3, result);
                    //var decimalSub = String(result);
                    console.log('sub: ' + result);
                    console.log('Array: ' + inputArray);
                    i = 0;
                    break;

                case '*':
                    result = z * w;
                    inputArray.splice(0, 3, result);
                    //var decimalMult = String(result);
                    console.log('mult: ' + result);
                    console.log('Array: ' + inputArray);
                    i = 0;
                    break;

                case '/':
                    result = z / w;
                    inputArray.splice(0, 3, result);
                    //var decimalDiv = String(result);
                    console.log('division: ' + result);
                    console.log('Array: ' + inputArray);
                    i = 0;
                    break;
            }

        }


    }
    //print the result to the screen
    $('.output').html(result);
    //clear the input array
    inputArray = [];

}

//Tip Calc test//
function tipCalculator () {
    $('.calculatorContainer').css('width','45vw');
    $('.numericalContainer').removeClass('col-sm-9').addClass('col-sm-8');
    $('.operatorContainer').removeClass('col-sm-3').addClass('col-sm-2');
    var newColumn = $('<div>').addClass('tipColumn col-sm-2').css('height','100%');
    var cheapDiv = $('<div>').addClass('col-sm-12 cheapTip').css('height','33%').attr('onclick','tipCalc()');
    var normalDiv = $('<div>').addClass('col-sm-12 regularTip').css('height','33%').attr('onclick','tipCalc()');
    var generousDiv = $('<div>').addClass('col-sm-12 generousTip').css('height','33%').attr('onclick','tipCalc()');
    var cheapText = $('<h3>').text('Cheap');
    var normalText = $('<h3>').text('Meh');
    var generousText = $('<h3>').text('Wow!');
    $(cheapDiv).append(cheapText);
    $(normalDiv).append(normalText);
    $(generousDiv).append(generousText);
    $(newColumn).append(cheapDiv, normalDiv, generousDiv);
    $('.calcBody').append(newColumn);
}


//Tip Calc Test//
function tipCalc (value) {
    //variable set to retrieve the value of the tip button clicked Cheap/Meh/Wow!
    var tipRetriever = $(value).children('h3');
    //Grab the number on the DOM (output/screen). Would be more effective to grab from global variable for logging in numbers
    var mealCost = $('.output').html();
    //declare a variable to store the result
    var result;
    //declare conditional statement to determine what the tip percentage should be
    //Cheap conditional
    if (tipRetriever == 'Cheap') {
        //previously declared variable equated to the meal times percentage of a "cheap" tip
        result = 0.05*mealCost;
    }
    //Average conditional
    else if (tipRetriever == 'Meh') {
        //previously declared variable equated to the meal times percentage of an "average" tip
        result = 0.08*mealCost;
    }
    //Generous conditional
    else if (tipRetriever == 'Wow!') {
        //previously declared variable equated to the meal times percentage of a "generous" tip
        result = 0.15*mealCost;
    }
    //declared variable to have the decimal places fixed to 2 for monetary reasons
    var tip = result.toFixed(2);
    //Display the tip amount with a dollar sign to the DOM (screen)
    $('.output').html('$' + tip);
}

//function to clear the screen and reset all variables
function clearScreen () {
    $('.output').html('');
    inputArray = [];
    buttonClick = null;
    operatorClick = null;
    equateClick = null;
    decimalClick = null;
    operand = '';
    console.log('clear');
}

//function to erase the last entry/operand in the array
function clearLastEntry () {
    inputArray.splice(inputArray.length-1,1);
    console.log('Entry Cleared: ' + inputArray);
    operand = '';
    number = '';
}
