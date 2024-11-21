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

let countryObj1 = [];
let countryObj2 = [];
let inputValue = 1;
//////////////////////////////////////// Auto Complete //////////////////////////////////
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
      if (currencyObject.items[i].name.toUpperCase().includes(val.toUpperCase())) {
        // Create a DIV element for each matching element
        b = document.createElement("DIV");

        // Highlight the matching letters
        var startIndex = currencyObject.items[i].name.toUpperCase().indexOf(val.toUpperCase());
        b.innerHTML = currencyObject.items[i].name.slice(0, startIndex) +
          "<strong>" +
          currencyObject.items[i].name.slice(startIndex, startIndex + val.length) +
          "</strong>" +
          currencyObject.items[i].name.slice(startIndex + val.length);

        // Insert an input field that will hold the current array item's value
        b.innerHTML += "<input type='hidden' value='" + currencyObject.items[i].name + "'>";

        // Add click event
        b.addEventListener("click", function (e) {
          inp.value = this.getElementsByTagName("input")[0].value;

          // Update currency
          if (inp.id.includes("1")) {
            countryObj1 = currencyObject.items[i];
          } else if (inp.id.includes("2")) {
            countryObj2 = currencyObject.items[i];
          }
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
  inputElement.addEventListener("click", function (e) {
    // get amount input by user
    inputValue = $("#amount-input").val();  // Get the numeric value entered
    console.log(countryObj1.name);
    console.log(countryObj2.name);

    if (!isNaN(inputValue)) {
      inputValue = 1;
      console.log("was NaN " + inputValue);
    }
    let rate, rateRev, calcAmount;

    if (countryObj1.name && countryObj2.name && !isNaN(inputValue)) {
      console.log("why is this happening???");

      try {
        rate = countryObj2.exchangeRate / countryObj1.exchangeRate;
        rateRev = countryObj1.exchangeRate / countryObj2.exchangeRate;
        calcAmount = (inputValue * rate).toFixed(2);

        populateData(rate, rateRev, calcAmount);  // Calculate and populate for Currency 1

      } catch (error) {
        console.log(error);
        alert("Error, Try again")
      }
    } else {
      alert("You must enter both currencies")
    }
  });
}

/////////////////////////////////////// swap countries ////////////////////////////////////
function switchCurrencies(inputElement, currencyObject) {
  inputElement.addEventListener("click", function (e) {
    alert("reverse button was clicked!")
  })
}

/////////////////////////////////////// populate data ///////////////////////////////////
function populateData(rate, rateRev, calcAmount) {

  try {
    const $conversionResult = $("#conversion-result");
    $conversionResult.empty();
    const $conversionText = $('<div>').html(`
      <p><strong>${inputValue} ${countryObj1.name} = </strong>${calcAmount} ${countryObj2.name}</p>
      <p>1 ${countryObj2.symbol} = ${rateRev.toFixed(2)} ${countryObj1.symbol}</p>`);
    // Create both conversion directions
    createTable(countryObj1, countryObj2, rate, false);
    createTable(countryObj2, countryObj1, rate, true);

    $conversionResult.append($conversionText);

  } catch (error) {
    console.log(error);

    $exchangeRateHTML.text("Invalid currency");
  }
}

/////////////////////// Generate both conversion tables /////////////////////////////
const createTable = (fromCurrency, toCurrency, rate, isReversed) => {

  const conversionValues = [1, 5, 10, 25, 50, 100, 500, 1000, 5000, 10000];
  const $conversionTables = $('.conversion-tables');
  if (!isReversed) {
    $conversionTables.empty();
  }
  const $tableBox = $('<div>').addClass('table-box');
  const $tableTitle = $('<h3>').text(`Convert ${fromCurrency.name} to ${toCurrency.name}`);
  const $table = $('<table>');
  const $thead = $('<thead>').html(`
                        <tr>
                            <th>${fromCurrency.name}</th>
                            <th>${toCurrency.name}</th>
                        </tr>
                    `);
  const $tbody = $('<tbody>');

  conversionValues.forEach(value => {
    const convertedValue = isReversed
      ? (value / rate).toFixed(2)
      : (value * rate).toFixed(2);

    const $row = $('<tr>').html(`
                            <td>${value} ${fromCurrency.symbol}</td>
                            <td>${convertedValue} ${toCurrency.symbol}</td>
                        `);
    $tbody.append($row);
  });

  $table.append($thead).append($tbody);
  $tableBox.append($tableTitle).append($table);
  $conversionTables.append($tableBox);
};



////////////////////////////// currency data: //////////////////////////////
const currencyObj = {
  "items": [
    { "id": 0, "symbol": "", "name": "", "exchangeRate": 0.00 },
    { "id": 1, "symbol": "CAD", "name": "Canadian Dollar (CAD)", "exchangeRate": 1.36029 },
    { "id": 2, "symbol": "CLP", "name": "Chilean Peso (CLP)", "exchangeRate": 950.662057 },
    { "id": 3, "symbol": "CNY", "name": "Chinese Yuan (CNY)", "exchangeRate": 7.128404 },
    { "id": 4, "symbol": "EUR", "name": "Euro (EUR)", "exchangeRate": 1.03203 },
    { "id": 5, "symbol": "GBP", "name": "British Pound Sterling (GBP)", "exchangeRate": 0.920938 },
    { "id": 6, "symbol": "INR", "name": "Indian Rupee (INR)", "exchangeRate": 81.255504 },
    { "id": 7, "symbol": "JPY", "name": "Japanese Yen (JPY)", "exchangeRate": 143.376504 },
    { "id": 8, "symbol": "RUB", "name": "Russian Ruble (RUB)", "exchangeRate": 57.875038 },
    { "id": 9, "symbol": "USD", "name": "US Dollar (USD)", "exchangeRate": 1 },
    { "id": 10, "symbol": "ZAR", "name": "South African Rand (ZAR)", "exchangeRate": 17.92624 },
    { "id": 11, "symbol": "AUD", "name": "Australian Dollar (AUD)", "exchangeRate": 1.531863 }
  ]
}


// initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:
document.addEventListener("DOMContentLoaded", function () {
  autocomplete(document.getElementById("currencyName1"), currencyObj);
  autocomplete(document.getElementById("currencyName2"), currencyObj);
  calculateAmount(document.getElementById("convert"), currencyObj);
  switchCurrencies(document.getElementById("swap-btn"), currencyObj);
})
