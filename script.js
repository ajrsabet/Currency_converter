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
let apiCallLimit = 20;
let currencyObj = {}

// API connection
async function APICall(currency1, currency2) {
  const apiKey = "3c5cac55b8d753b024fe3326"; // Replace with your actual API key

  if (currency1 && currency2) {
    // return conversion rate between two currencies
    url = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${currency1}/${currency2}`;
  } else {
    // return currency list
    url = `https://v6.exchangerate-api.com/v6/${apiKey}/codes`;
  }

  // limit api calls to 10 per session for testing to preserve API request quota and  
  // prevent run-away api calls
  if (apiCallLimit > 0) {
    apiCallLimit--;
    console.log(`Api call limit remaining: ${apiCallLimit}`);

    await fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {

        if (currency1 && currency2) { // return conversion rate between two currencies
          let rate = data.conversion_rate;
          let rateRev = 1 / data.conversion_rate;
          let calcAmount = (inputValue * rate).toFixed(2);
          populateData(rate, rateRev, calcAmount);

        } else { // compile currency list
          currencyObj = { "items": [] };
          for (let i = 0; i < data.supported_codes.length; i++) {
            currencyObj.items[i] = { "symbol": data.supported_codes[i][0], "name": `${data.supported_codes[i][1]} (${data.supported_codes[i][0]})` }
          }
          autocomplete(document.getElementById("currencyName1"), currencyObj);
          autocomplete(document.getElementById("currencyName2"), currencyObj);
        }
        return data.result;
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  } else {
    alert("You have exceeded the API call limit, refresh the page and try again")
  }
}

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
function convertBtn(inputElement) {
  inputElement.addEventListener("click", function (e) {
    // get amount input by user
    inputValue = Number($("#amount-input").val());  // Get the numeric value entered
    submitHndl();
  });
}

///////////////////////////////////// Submit handle function //////////////////////////////
function submitHndl() {
  if (isNaN(inputValue)) {
    console.log("input value was NaN " + inputValue);
    console.log("input value was NaN " + typeof inputValue);
    inputValue = 1;
  } else if (inputValue == 0) {
    inputValue = 1;
    console.log("input value cannot be 0, default to 1");
  }

  if (countryObj1.name && countryObj2.name && !isNaN(inputValue)) {
    try {
      APICall(countryObj1.symbol, countryObj2.symbol)
    } catch (error) {
      console.log(error);
      alert("Error, Try again")
    }
  } else {
    alert("You must enter both currencies")
  }
}

/////////////////////////////////////// swap countries ////////////////////////////////////
function switchCurrencies(inputElement) {
  inputElement.addEventListener("click", function (e) {
    // alert("reverse button was clicked!")
    if (countryObj1 && countryObj2) {
      let tempCountry = countryObj1;
      countryObj1 = countryObj2;
      countryObj2 = tempCountry;

      // I can't figure out why this isn't changing the text in the input fields.
      $("currencyName1").val(countryObj1.name);
      $("currencyName2").val(countryObj2.name);

      submitHndl();
    } else {
      alert("You need two countries entered before using this button")
    }
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

// initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:
document.addEventListener("DOMContentLoaded", function () {
  APICall() // moved autocomplete list even listener

  convertBtn(document.getElementById("convert"));
  switchCurrencies(document.getElementById("swap-btn"));
})
