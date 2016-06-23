app.controller("calculatorController", ["getCurrency", function(getCurrency) {
    var self = this;
    self.basecurrencies = ["Base Currency", "USD", "AUD", "BGN", "BRL", "CAD", "CHF", "CNY", "CZK", "DKK", "GBP", "HKD", "HRK", "HUF", "IDR", "ILS", "INR", "JPY", "KRW", "MXN", "MYR", "NOK", "NZD", "PHP", "PLN", "RON", "RUB", "SEK", "SGD", "THB", "TRY", "ZAR", "EUR"];
    self.selectcurrencies = ["Converted Currency", "EUR", "USD", "AUD", "BGN", "BRL", "CAD", "CHF", "CNY", "CZK", "DKK", "GBP", "HKD", "HRK", "HUF", "IDR", "ILS", "INR", "JPY", "KRW", "MXN", "MYR", "NOK", "NZD", "PHP", "PLN", "RON", "RUB", "SEK", "SGD", "THB", "TRY", "ZAR"];
    self.imperialArray = ["Imperial Unit", "inch", "feet", "mile", "yard", "pint", "quart", "gallon", "cup", "teaspoon", "tablespoon", "Farenheit"];
    self.metricWholeArray = ["Metric Unit", "milimeter", "centimeter", "decimeter", "meter", "decameter", "hectometer", "kilometer", "mililiter", "centiliter", "deciliter", "liter", "decaliter", "hectoliter", "kiloliter", "Celcius"];
    self.metricConversionArray = [{
        unit: "Metric Unit"
    }, {
        unit: "meter",
        inch: 39.3701,
        feet: 3.280841666667,
        yard: 1.0936138888889999077,
        mile: 0.000621371
    }, {
        unit: "liter",
        gallon: 0.264172,
        pint: 2.11338,
        cup: 4.22675,
        teaspoon: 202.884,
        tablespoon: 67.628,
        quart: 1.05669
    }, {
        unit: "Celcius",
        farenheit: 32
    }];
    self.metricArray = [{
        unit: "Metric Unit"
    }];
    self.prefixes = [{
        prefix: "mili",
        val: 0.001
    }, {
        prefix: "centi",
        val: 0.01
    }, {
        prefix: 'deci',
        val: 0.1
    }, {
        prefix: '',
        val: 1
    }, {
        prefix: 'deca',
        val: 10
    }, {
        prefix: 'hecto',
        val: 100
    }, {
        prefix: 'kilo',
        val: 1000
    }];
    self.selectedBase = self.basecurrencies[0];
    self.selectedConvert = self.selectcurrencies[0];
    self.exchangeRate = '';
    self.output = '';
    self.digit = '';
    self.equalClick = false;
    self.equation = [];
    self.displayCurrency = '';
    self.imperial = self.imperialArray[0];
    self.metric = self.metricArray[0].unit;
    self.convertChoice = "Choose a converter";
    self.alternates = false;
    self.metricButton = false;
    self.currencyButton = false;
    self.baseMetricUnit = '';
    self.metricSwitch = false;

    self.getRate = function(currency) {
        var base = self.selectedBase;
        var convert = self.selectedConvert;
        var exchangeRates = getCurrency.getExchangeRate(base, convert).success(function(data) {
            var rates = data.rates;
            for (var key in rates) {
                if (convert == key) {
                    self.exchangeRate = rates[key];
                }
            }
        });
        self.displayCurrency = convert;
    };

    self.changeMetric = function(boolean) {
        if(self.metric == "Celcius" || self.imperial == "Farenheit"){
          if(boolean === 1){
            self.imperialArray = ["Imperial Unit","Farenheit"];
          }else if (boolean === 0) {
            self.metricArray = [{unit: "Metric Unit"},{unit:"Celcius"}];
          }
          return;
        }
        var suffix;
        if (boolean === 1 && self.metric == "milimeter" || self.metric == "centimeter" || self.metric == "decimeter" || self.metric == "meter" || self.metric == "decameter" || self.metric == "hectometer" || self.metric == "kilometer") {
            self.imperialArray = ["Imperial Unit", "inch", "feet", "mile", "yard"];
            self.baseMetricUnit = "meter";
            suffix = "meter";
        } else if (boolean === 1 && self.metric == "mililiter" || self.metric == "centiliter" || self.metric == "deciliter" || self.metric == "liter" || self.metric == "decaliter" || self.metric == "hectoliter" || self.metric == "kiloliter") {
            self.imperialArray = ["Imperial Unit", "pint", "quart", "gallon", "cup", "teaspoon", "tablespoon"];
            self.baseMetricUnit = "liter";
            suffix = "liter";
        }
        if (boolean === 0 && self.imperial == 'inch' || self.imperial == 'feet' || self.imperial == 'yard' || self.imperial == 'mile') {
            suffix = 'meter';
            self.baseMetricUnit = 'meter';
        } else if (boolean === 0 && self.imperial == 'pint' || self.imperial == 'quart' || self.imperial == 'gallon' || self.imperial == 'teaspoon' || self.imperial == 'tablespoon' || self.imperial == 'cup') {
            suffix = 'liter';
            self.baseMetricUnit = 'liter';
        }
        var array = ["Metric Unit"];
        for (var i = 0; i < self.prefixes.length; i++) {
            var obj = {};
            var prefix = self.prefixes[i].prefix;
            var metric = '' + prefix + suffix;
            obj.unit = metric;
            obj.val = self.prefixes[i].val;
            array.push(obj);
        }
        self.metricArray = array;
    };

    self.updateDigit = function(number) {
        if (self.output == '0' && number != '.' || self.output == "Ready when you are!" || self.equalClick === true) {
            self.output = '';
            self.equalClick = false;
        }
        self.digit += String(number);
        self.output += String(number);
    };

    self.operand = function(operand) {
        if (self.digit === '') {
            self.equation.push(self.output, String(operand));
            self.output += (' ' + String(operand) + ' ');
            console.log(self.equation);
        } else {
            self.equation.push(self.digit, String(operand));
            self.digit = '';
            self.output += (' ' + String(operand) + ' ');
        }
        self.equalClick = false;
    };

    self.equate = function() {
        self.equation.push(self.digit);
        self.digit = '';
        var x;
        var y;
        var result;
        if (self.equation[0] === '') {
            result = "Ready when you are!";
        } else {
            for (var i = 0; i < self.equation.length; i++) {
                x = parseFloat(self.equation[0]);
                y = parseFloat(self.equation[2]);
                switch (self.equation[1]) {
                    case '+':
                        result = x + y;
                        break;
                    case '-':
                        result = x - y;
                        break;
                    case '×':
                        result = x * y;
                        break;
                    case '÷':
                        result = x / y;
                        break;
                }
                self.equation.splice(0, 3, result);
            }
        }
        self.equalClick = true;
        self.equation = [];
        self.output = result;
        return result;
    };

    self.calculate = function() {
        self.output = (self.digit * self.exchangeRate).toFixed(2) + ' ' + self.displayCurrency;
        self.digit = '';
        self.equalClick = true;
    };

    self.calculateMetric = function() {
        if(self.metric == "Celcius" && self.metricSwitch === false){
          self.output = ((self.digit - 32) * (5/9)).toFixed(2) + " °C";
        }else if (self.imperial == "Farenheit" && self.metricSwitch === true) {
          self.output = ((self.digit * (9/5)) + 32).toFixed(2) + " °F";
        } else{
        var metricUnit = self.baseMetricUnit;
        var imperialUnit = self.imperial;
        var digit = self.digit;
        var result;
        for (var i = 0; i < self.metricConversionArray.length; i++) {
            if (metricUnit == self.metricConversionArray[i].unit) {
                for (var index in self.metricConversionArray[i]) {
                    if (imperialUnit == index) {
                        if (self.metricSwitch === false) {
                            result = digit / self.metricConversionArray[i][index];
                        } else if (self.metricSwitch === true) {
                            result = digit * self.metricConversionArray[i][index];
                        }
                    }
                }
                for (var x = 0; x < self.metricArray.length; x++) {
                    for (var val in self.metricArray[x]) {
                        if (self.metric == self.metricArray[x][val]) {
                            if (self.metricSwitch === false) {
                                result = result / self.metricArray[x].val;
                            } else if (self.metricSwitch === true) {
                                result = result * self.metricArray[x].val;
                            }
                        }
                    }
                }
            }
        }
        if (self.metricSwitch === false) {
            self.output = result.toFixed(4) + " " + self.metric;
        } else if (self.metricSwitch === true) {
            self.output = result.toFixed(4) + " " + imperialUnit;
        }
      }
        self.equalClick = true;
        self.digit = '';


    };

    self.clearAll = function() {
        self.equation = [];
        self.output = '';
        self.digit = '';
    };

    self.clearEntry = function() {
        self.digit = '';
        self.output = '';
        self.equation.splice(self.equation.length - 1, 1);
    };

    self.expandOptions = function(boolean) {
        self.alternates = true;
        var target;
        if (parseInt(boolean) === 0) {
            self.alternates = false;
            self.convertChoice = "Choose a converter";
            target = $("#selectConverter");
            if (target.height() === 0) {
                $("#currency , #metric").animate({
                    height: '0'
                }, 500, function() {
                    $("#currency , #metric").css('display', 'none');
                });
                target.css('display', 'block').animate({
                    height: '10%'
                }, 500);
            } else {
                target.css('display', 'block').animate({
                    height: '0'
                }, 500);
            }
        } else if (self.convertChoice == "Currency Converter") {
            target = $("#currency");
            self.alternates = true;
            if (self.currencyButton === true) {
                self.currencyButton = false;
                self.metricButton = false;
            } else {
                self.currencyButton = true;
                self.metricButton = false;
            }
            $("#selectConverter").animate({
                height: '0'
            }, 500, function() {
                if (target.height() === 0) {
                    target.css('display', 'block').animate({
                        height: '10%'
                    }, 500);
                } else {
                    target.css('display', 'block').animate({
                        height: '0'
                    }, 500, function() {
                        $("#selectConverter").css('display', 'none');
                    });
                }
            });

        } else if (self.convertChoice == "Metric Converter") {
            target = $("#metric");
            self.alternates = true;
            if (self.metricButton === true) {
                self.metricButton = false;
                self.currencyButton = false;
            } else {
                self.metricButton = true;
                self.currencyButton = false;
            }
            $("#selectConverter").animate({
                height: '0'
            }, 500, function() {
                if (target.height() === 0) {
                    target.css('display', 'block').animate({
                        height: '10%'
                    }, 500);
                } else {
                    target.css('display', 'block').animate({
                        height: '0'
                    }, 500, function() {
                        $("#selectConverter").css('display', 'none');
                    });
                }
            });
        }
    };
}]);
