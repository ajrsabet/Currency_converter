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
// function autocomplete(inp, currencyObject) {
//   var currentFocus;

//   inp.addEventListener("input", function (e) {
//     var a, b, i, val = this.value;
//     closeAllLists();
//     if (!val) { return false; }
//     currentFocus = -1;

//     // Create a DIV element that will contain the items (values)
//     a = document.createElement("DIV");
//     a.setAttribute("id", this.id + "autocomplete-list");
//     a.setAttribute("class", "autocomplete-items");

//     this.parentNode.appendChild(a);

//     // Loop through the items in the currencyObject
//     for (let i = 0; i < currencyObject.items.length; i++) {
//       // Check if the name of the currency contains the input string
//       if (currencyObject.items[i].currency.toUpperCase().includes(val.toUpperCase())) {
//         // Create a DIV element for each matching element
//         b = document.createElement("DIV");

//         // Highlight the matching part
//         let startIndex = currencyObject.items[i].currency.toUpperCase().indexOf(val.toUpperCase());
//         b.innerHTML = currencyObject.items[i].currency.substring(0, startIndex) +
//           "<strong>" +
//           currencyObject.items[i].currency.substring(startIndex, startIndex + val.length) +
//           "</strong>" +
//           currencyObject.items[i].currency.substring(startIndex + val.length);

//         // Insert an input field that will hold the current array item's value
//         b.innerHTML += "<input type='hidden' value='" + currencyObject.items[i].currency + "'>";

//         // Execute a function when someone clicks on the item (DIV element)
//         b.addEventListener("click", function (e) {
//           inp.value = this.getElementsByTagName("input")[0].value;

//           populateData(inp.id, currencyObject);
//           closeAllLists();
//         });

//         if (this.id.includes("1")) {
//           country1ID = i;
//           console.log(country1ID);
//         } else if (this.id.includes("2")) {
//           country2ID = i;
//           console.log(country2ID);
//         }

//         a.appendChild(b);
//       }
//     }
//   });

//   // execute a function presses a key on the keyboard:
//   inp.addEventListener("keydown", function (e) {
//     var x = document.getElementById(this.id + "autocomplete-list");
//     if (x) x = x.getElementsByTagName("div");
//     if (e.keyCode == 40) {
//       // If the arrow DOWN key is pressed, increase the currentFocus variable:
//       currentFocus++;
//       // and make the current item more visible:
//       addActive(x);
//     } else if (e.keyCode == 38) { //up
//       // If the arrow UP key is pressed, decrease the currentFocus variable:
//       currentFocus--;
//       // and make the current item more visible:
//       addActive(x);
//     } else if (e.keyCode == 13) {
//       // If the ENTER key is pressed, prevent the form from being submitted:
//       e.preventDefault();
//       if (currentFocus > -1) {
//         // Simulate a click on the "active" item:
//         if (x) x[currentFocus].click();
//       }
//     }
//   });

//   function addActive(x) {
//     // a function to classify an item as "active":
//     if (!x) return false;
//     // start by removing the "active" class on all items:
//     removeActive(x);
//     if (currentFocus >= x.length) currentFocus = 0;
//     if (currentFocus < 0) currentFocus = (x.length - 1);
//     // add class "autocomplete-active":
//     x[currentFocus].classList.add("autocomplete-active");
//   }

//   function removeActive(x) {
//     // a function to remove the "active" class from all autocomplete items:
//     for (var i = 0; i < x.length; i++) {
//       x[i].classList.remove("autocomplete-active");
//     }
//   }

//   function closeAllLists(elmnt) {
//     // close all autocomplete lists in the document, except the one passed as an argument:
//     var x = document.getElementsByClassName("autocomplete-items");
//     for (var i = 0; i < x.length; i++) {
//       if (elmnt != x[i] && elmnt != inp) {
//         x[i].parentNode.removeChild(x[i]);
//       }
//     }
//   }

//   // execute a function when someone clicks in the document:
//   document.addEventListener("click", function (e) {
//     closeAllLists(e.target);
//   });
// }

// function autocomplete(inp, currencyObject) {
//   var currentFocus;

//   // Use jQuery to bind the input event
//   $(inp).on("input", function () {
//     var val = $(this).val();
//     closeAllLists();
//     if (!val) return false;
//     currentFocus = -1;

//     // Create the list container and append it to the parent
//     var $list = $("<div>")
//       .attr("id", this.id + "autocomplete-list")
//       .addClass("autocomplete-items")
//       .appendTo($(this).parent());

//     // Loop through the items in the currencyObject
//     $.each(currencyObject.items, function (i, item) {
//       if (item.currency.toUpperCase().includes(val.toUpperCase())) {
//         var startIndex = item.currency.toUpperCase().indexOf(val.toUpperCase());
//         var beforeMatch = item.currency.substring(0, startIndex);
//         var match = item.currency.substring(startIndex, startIndex + val.length);
//         var afterMatch = item.currency.substring(startIndex + val.length);

//         // Create the list item
//         var $item = $("<div>")
//           .html(beforeMatch + "<strong>" + match + "</strong>" + afterMatch)
//           .append($("<input>").attr("type", "hidden").val(item.currency))
//           .on("click", function () {
//             $(inp).val($(this).find("input").val());
//             populateData(inp.id, currencyObject);
//             closeAllLists();
//           });

//         // Handle the country ID assignment
//         if ($(inp).attr("id").includes("1")) {
//           country1ID = i;
//           console.log(country1ID);
//         } else if ($(inp).attr("id").includes("2")) {
//           country2ID = i;
//           console.log(country2ID);
//         }

//         $list.append($item);
//       }
//     });
//   });

//   // Use jQuery to handle keydown events
//   $(inp).on("keydown", function (e) {
//     var $x = $("#" + this.id + "autocomplete-list div");
//     if (e.keyCode == 40) { // DOWN arrow
//       currentFocus++;
//       addActive($x);
//     } else if (e.keyCode == 38) { // UP arrow
//       currentFocus--;
//       addActive($x);
//     } else if (e.keyCode == 13) { // ENTER key
//       e.preventDefault();
//       if (currentFocus > -1 && $x.length) {
//         $x.eq(currentFocus).trigger("click");
//       }
//     }
//   });

//   function addActive($x) {
//     if (!$x.length) return false;
//     removeActive($x);
//     currentFocus = (currentFocus + $x.length) % $x.length;
//     $x.eq(currentFocus).addClass("autocomplete-active");
//   }

//   function removeActive($x) {
//     $x.removeClass("autocomplete-active");
//   }

//   function closeAllLists(elmnt) {
//     $(".autocomplete-items").not(elmnt).remove();
//   }

//   // Use jQuery for the document click event
//   $(document).on("click", function (e) {
//     closeAllLists(e.target);
//   });
// }

function autocomplete(inp, currencyObject) {
  var currentFocus;

  inp.addEventListener("input", function (e) {
    var a, b, i, val = this.value;
    closeAllLists();
    if (!val) { return false; }
    currentFocus = -1;

    // Create a DIV element that will contain the items (values)
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");

    // Position the list absolutely below the input field
    a.style.position = "absolute";
    a.style.zIndex = "1000"; // Ensure it's above other elements
    a.style.width = this.offsetWidth + "px"; // Match the input field's width

    this.parentNode.appendChild(a);

    // Loop through the items in the currencyObject
    for (let i = 0; i < currencyObject.items.length; i++) {
      // Check if the name of the currency contains the input value
      if (currencyObject.items[i].currency.toUpperCase().includes(val.toUpperCase())) {
        // Create a DIV element for each matching element
        b = document.createElement("DIV");

        // Highlight the matching letters
        var startIndex = currencyObject.items[i].currency.toUpperCase().indexOf(val.toUpperCase());
        b.innerHTML = currencyObject.items[i].currency.slice(0, startIndex) +
          "<strong>" +
          currencyObject.items[i].currency.slice(startIndex, startIndex + val.length) +
          "</strong>" +
          currencyObject.items[i].currency.slice(startIndex + val.length);

        // Insert an input field that will hold the current array item's value
        b.innerHTML += "<input type='hidden' value='" + currencyObject.items[i].currency + "'>";

        // Add click event
        b.addEventListener("click", function (e) {
          inp.value = this.getElementsByTagName("input")[0].value;
          populateData(inp.id, currencyObject);
          closeAllLists();
        });

        a.appendChild(b);
      }
    }
  });

  inp.addEventListener("keydown", function (e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      currentFocus++;
      addActive(x);
    } else if (e.keyCode == 38) {
      currentFocus--;
      addActive(x);
    } else if (e.keyCode == 13) {
      e.preventDefault();
      if (currentFocus > -1 && x) {
        x[currentFocus].click();
      }
    }
  });

  function addActive(x) {
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;
    x[currentFocus].classList.add("autocomplete-active");
  }

  function removeActive(x) {
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }

  function closeAllLists(elmnt) {
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }

  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}


//////////////////////////////////////// calculate amount //////////////////////////////////
function calculateAmount(inputElement, currencyObject) {
  inputElement.addEventListener("input", function (e) {
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
// function populateData(id, currencyObject) {
//   var exchangeRateHTML, otherExchangeRateHTML, currencyAmountHTML, otherCurrencyAmountHTML;
//   var countryID, otherCountryID;

//   console.log(country1ID);
//   console.log(country2ID);
//   // Determine which fields to update based on the input field ID
//   if (id.includes("1")) {
//     exchangeRateHTML = document.getElementById("exchangeRate1");
//     otherExchangeRateHTML = document.getElementById("exchangeRate2");
//     currencyAmountHTML = document.getElementById("amount1");
//     otherCurrencyAmountHTML = document.getElementById("amount2");
//     countryID = country1ID;
//     otherCountryID = country2ID;
//   } else if (id.includes("2")) {
//     exchangeRateHTML = document.getElementById("exchangeRate2");
//     otherExchangeRateHTML = document.getElementById("exchangeRate1");
//     currencyAmountHTML = document.getElementById("amount2");
//     otherCurrencyAmountHTML = document.getElementById("amount1");
//     countryID = country2ID;
//     otherCountryID = country1ID;
//   }

//   // Check if the currency selections are valid
//   if (currencyObject.items[countryID] && currencyObject.items[otherCountryID]) {
//     var baseCurrencyRate = currencyObject.items[countryID].exchangeRate;  // Base currency rate
//     var targetCurrencyRate = currencyObject.items[otherCountryID].exchangeRate;  // Target currency rate

//     // Update the exchange rates in the HTML
//     exchangeRateHTML.textContent = baseCurrencyRate.toFixed(6);
//     otherExchangeRateHTML.textContent = targetCurrencyRate.toFixed(6);

//     // Calculate the converted value if an amount is entered
//     var amount = parseFloat(currencyAmountHTML.value) || 0;

//     var usdAmount = baseCurrencyRate === 1 ? amount : amount / baseCurrencyRate;  // Convert to USD if not already USD
//     var convertedAmount = usdAmount * targetCurrencyRate;  // Convert from USD to target currency

//     // Update the other amount field
//     otherCurrencyAmountHTML.value = convertedAmount.toFixed(2);
//   } else {
//     exchangeRateHTML.textContent = "Invalid currency";
//   }
// }
function populateData(id, currencyObject) {
  var $exchangeRateHTML, $otherExchangeRateHTML, $currencyAmountHTML, $otherCurrencyAmountHTML;
  var countryID, otherCountryID;

  console.log(country1ID);
  console.log(country2ID);

  // Determine which fields to update based on the input field ID
  if (id.includes("1")) {
    $exchangeRateHTML = $("#exchangeRate1");
    $otherExchangeRateHTML = $("#exchangeRate2");
    $currencyAmountHTML = $("#amount1");
    $otherCurrencyAmountHTML = $("#amount2");
    countryID = country1ID;
    otherCountryID = country2ID;
  } else if (id.includes("2")) {
    $exchangeRateHTML = $("#exchangeRate2");
    $otherExchangeRateHTML = $("#exchangeRate1");
    $currencyAmountHTML = $("#amount2");
    $otherCurrencyAmountHTML = $("#amount1");
    countryID = country2ID;
    otherCountryID = country1ID;
  }

  // Check if the currency selections are valid
  if (currencyObject.items[countryID] && currencyObject.items[otherCountryID]) {
    var baseCurrencyRate = currencyObject.items[countryID].exchangeRate; // Base currency rate
    var targetCurrencyRate = currencyObject.items[otherCountryID].exchangeRate; // Target currency rate

    // Update the exchange rates in the HTML
    $exchangeRateHTML.text(baseCurrencyRate.toFixed(6));
    $otherExchangeRateHTML.text(targetCurrencyRate.toFixed(6));

    // Calculate the converted value if an amount is entered
    var amount = parseFloat($currencyAmountHTML.val()) || 0;

    var usdAmount = baseCurrencyRate === 1 ? amount : amount / baseCurrencyRate; // Convert to USD if not already USD
    var convertedAmount = usdAmount * targetCurrencyRate; // Convert from USD to target currency

    // Update the other amount field
    $otherCurrencyAmountHTML.val(convertedAmount.toFixed(2));
  } else {
    $exchangeRateHTML.text("Invalid currency");
  }
}


////////////////////////////// currency data: //////////////////////////////
const currencyObj = {
  "items": [
    { "id": 0, "symbol": "", "currency": "", "exchangeRate": 0.00 },
    { "id": 1, "symbol": "CAD", "currency": "Canadian Dollar (CAD)", "exchangeRate": 1.36029 },
    { "id": 2, "symbol": "CLP", "currency": "Chilean Peso (CLP)", "exchangeRate": 950.662057 },
    { "id": 3, "symbol": "CNY", "currency": "Chinese Yuan (CNY)", "exchangeRate": 7.128404 },
    { "id": 4, "symbol": "EUR", "currency": "Euro (EUR)", "exchangeRate": 1.03203 },
    { "id": 5, "symbol": "GBP", "currency": "British Pound Sterling (GBP)", "exchangeRate": 0.920938 },
    { "id": 6, "symbol": "INR", "currency": "Indian Rupee (INR)", "exchangeRate": 81.255504 },
    { "id": 7, "symbol": "JPY", "currency": "Japanese Yen (JPY)", "exchangeRate": 143.376504 },
    { "id": 8, "symbol": "RUB", "currency": "Russian Ruble (RUB)", "exchangeRate": 57.875038 },
    { "id": 9, "symbol": "USD", "currency": "US Dollar (USD)", "exchangeRate": 1 },
    { "id": 10, "symbol": "ZAR", "currency": "South African Rand (ZAR)", "exchangeRate": 17.92624 },
    { "id": 11, "symbol": "AUD", "currency": "Australian Dollar (AUD)", "exchangeRate": 1.531863 }
  ]
}

// initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:
autocomplete(document.getElementById("currencyName1"), currencyObj);
autocomplete(document.getElementById("currencyName2"), currencyObj);

calculateAmount(document.getElementById("amount1"), currencyObj);
calculateAmount(document.getElementById("amount2"), currencyObj);
