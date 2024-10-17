
// 2. Currency Converter

// Write a program that converts between currencies and returns the value and the long form of each currency. 
// The program should have a set of exchange rates, the base of those conversions will be USD. 
// That may not be the base input of the user.
// The user provides the amount to convert, three digit currency codes of the base currency and the converted currency.
// Handle situations with invalid inputs.

// Example:
//  program("EUR", "AUD", 1000) -> 1484.32 AUD

// Write a second program that helps a user lookup the currency code for currency and visa-versa. 
// Given a user input partial string, return a suggested list of currency codes.
// Handle situations with invalid inputs.

// Examples: 
// program("Dollar") -> {"AUD": "Australian Dollar", "CAD": "Canadian Dollar", "USD": "United States Dollar"}
// program("British") -> {"GBP": "British Pound Sterling"}
// program("AUD") -> {"AUD": "Australian Dollar"}

var country1ID = 0;
var country2ID = 0;

//////////////////////////////////////// Auto Complete //////////////////////////////////
function autocomplete(inp, currencyObject) {
  var currentFocus;

  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      closeAllLists();
      if (!val) { return false; }
      currentFocus = -1;

      // Create a DIV element that will contain the items (values)
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");

      this.parentNode.appendChild(a);

      
      // Loop through the items in the currencyObject
      for (let i = 0; i < currencyObject.items.length; i++) {
          // Check if the name of the currency starts with the same letters as the input
          if (currencyObject.items[i].currency.substr(0, val.length).toUpperCase() == val.toUpperCase()) {
              // Create a DIV element for each matching element
              b = document.createElement("DIV");

              // Make the matching letters bold
              b.innerHTML = "<strong>" + currencyObject.items[i].currency.substr(0, val.length) + "</strong>";
              b.innerHTML += currencyObject.items[i].currency.substr(val.length);

              // Insert an input field that will hold the current array item's value
              b.innerHTML += "<input type='hidden' value='" + currencyObject.items[i].currency + "'>";

              // Execute a function when someone clicks on the item (DIV element)
              b.addEventListener("click", function(e) {
                  inp.value = this.getElementsByTagName("input")[0].value;
                  
                  
                  populateData(inp.id, currencyObject)
                  closeAllLists();
                });
                
                if (this.id.includes("1")) {
                  country1ID = i;
                  console.log(country1ID);
                } else if (this.id.includes("2")){
                  country2ID = i;
                  console.log(country2ID);
                }
              a.appendChild(b);
              
          }
      }
  });

    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
  }
  
  
  //////////////////////////////////////// calculate amount //////////////////////////////////
  function calculateAmount(inputElement, currencyObject) {
    inputElement.addEventListener("input", function(e) {
      var inputValue = parseFloat(this.value);  // Get the numeric value entered
      
      if (!inputValue || isNaN(inputValue)) {
        return false; // Ensure the input is valid
      }
      
      // Determine which amount field is being updated
      if (inputElement.id.includes("1")) {
        populateData("amount1", currencyObject);  // Calculate and populate for Currency 1
      } else if (inputElement.id.includes("2")) {
        populateData("amount2", currencyObject);  // Calculate and populate for Currency 2
      }
    });
  }
  
  

  ///////////////////////////// populate data /////////////////////////////
  function populateData(id, currencyObject) {
    var exchangeRateHTML, otherExchangeRateHTML, currencyAmountHTML, otherCurrencyAmountHTML;
    var countryID, otherCountryID;
  
    console.log(country1ID);
    console.log(country2ID);
    // Determine which fields to update based on the input field ID
    if (id.includes("1")) {
      exchangeRateHTML = document.getElementById("exchangeRate1");
      otherExchangeRateHTML = document.getElementById("exchangeRate2");
      currencyAmountHTML = document.getElementById("amount1");
      otherCurrencyAmountHTML = document.getElementById("amount2");
      countryID = country1ID;
      otherCountryID = country2ID;
    } else if (id.includes("2")) {
      exchangeRateHTML = document.getElementById("exchangeRate2");
      otherExchangeRateHTML = document.getElementById("exchangeRate1");
      currencyAmountHTML = document.getElementById("amount2");
      otherCurrencyAmountHTML = document.getElementById("amount1");
      countryID = country2ID;
      otherCountryID = country1ID;
    }
  
    // Check if the currency selections are valid
    if (currencyObject.items[countryID] && currencyObject.items[otherCountryID]) {
      var baseCurrencyRate = currencyObject.items[countryID].exchangeRate;  // Base currency rate
      var targetCurrencyRate = currencyObject.items[otherCountryID].exchangeRate;  // Target currency rate
      
      // Update the exchange rates in the HTML
      exchangeRateHTML.textContent = baseCurrencyRate.toFixed(6);
      otherExchangeRateHTML.textContent = targetCurrencyRate.toFixed(6);
      
      // Calculate the converted value if an amount is entered
      var amount = parseFloat(currencyAmountHTML.value) || 0;
      
      var usdAmount = baseCurrencyRate === 1 ? amount : amount / baseCurrencyRate;  // Convert to USD if not already USD
      var convertedAmount = usdAmount * targetCurrencyRate;  // Convert from USD to target currency
      
      // Update the other amount field
      otherCurrencyAmountHTML.value = convertedAmount.toFixed(2);
    } else {
      exchangeRateHTML.textContent = "Invalid currency";
    }
  }
  

  ////////////////////////////// currency data: //////////////////////////////
const currencyObj = {
  "items": [
      {"id": 0, "symbol": "", "currency": "", "exchangeRate": 0.00},
      {"id": 1, "symbol": "CAD", "currency": "Canadian Dollar", "exchangeRate": 1.36029},
      {"id": 2, "symbol": "CLP", "currency": "Chilean Peso", "exchangeRate": 950.662057},
      {"id": 3, "symbol": "CNY", "currency": "Chinese Yuan", "exchangeRate": 7.128404},
      {"id": 4, "symbol": "EUR", "currency": "Euro", "exchangeRate": 1.03203},
      {"id": 5, "symbol": "GBP", "currency": "British Pound Sterling", "exchangeRate": 0.920938},
      {"id": 6, "symbol": "INR", "currency": "Indian Rupee", "exchangeRate": 81.255504},
      {"id": 7, "symbol": "JPY", "currency": "Japanese Yen", "exchangeRate": 143.376504},
      {"id": 8, "symbol": "RUB", "currency": "Russian Ruble", "exchangeRate": 57.875038},
      {"id": 9, "symbol": "USD", "currency": "United States Dollar", "exchangeRate": 1},
      {"id": 10, "symbol": "ZAR", "currency": "South African Rand", "exchangeRate": 17.92624},
      {"id": 11, "symbol": "AUD", "currency": "Australian Dollar", "exchangeRate": 1.531863}
  ]
  }
  /*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
  autocomplete(document.getElementById("currencyName1"), currencyObj);
  autocomplete(document.getElementById("currencyName2"), currencyObj);
  
  calculateAmount(document.getElementById("amount1"), currencyObj);
  calculateAmount(document.getElementById("amount2"), currencyObj);
