// wikipedia URL
const url =
  "https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch=";

//   selecting elements that will take in action and effect
const form = document.querySelector(".form");
const input = document.querySelector(".form-input");
const result = document.querySelector(".results");

// listening for a submit event on the form
form.addEventListener("submit", (e) => {
  // prevent the form default behavior of submitting
  e.preventDefault();
  //   getting the value entered in the input tab of the form and giving it an identifier
  const inputValue = input.value;
  //   checking to see if the value of the input is empty i.e no value inside of the input tab
  if (!inputValue) {
    //   dynamically display an error msg
    result.innerHTML = `<div class="error">Please Enter a Valid Search Term</div>`;
    // add the return keyword so JS can stop reading here
    return;
  }
  //   fetching back pages via the value of the input tab
  fetchPage(inputValue);
});

// added the functionality that fetches data from the wiki server and display it in the app
const fetchPage = async (searchValue) => {
  //   dynamically display a loading msg when data is been fetched
  result.innerHTML = `<div class="loading"></div>`;
  // a try and catch block
  try {
    // fetches data from the server via the provided url and searched inputted value
    const response = await fetch(`${url}${searchValue}`);
    // converted the fetched data into a json format
    const data = await response.json();
    // destructured the fetched promise so as to get the arrays os inputted searched value
    const result = data.query.search;
    // checking to see if the length of the result array returned was less than 1
    if (result.length < 1) {
      //   dynamically displaying an error msg
      result.innerHTML = `<div class="error">No Matching Result. Please Try Again</div>`;
      return;
    }
    // invoking the func that displays the fetched data
    renderResult(result);
  } catch (error) {
    //   dynamically display an error msg
    result.innerHTML = `<div class="error">There was an Error</div>`;
  }
};

const renderResult = (list) => {
  // iterating over the list of data tha will display from the server
  const wikiList = list
    .map((item) => {
      // destructuring the needed properties needed for thr app display
      const { pageid, title, snippet } = item;
      // dynamically returning a link and insert the destructured properties into it
      return `
          <a href="http://en.wikipedia.org/?curid=${pageid}" target="_blank">
            <h4>${title}</h4>
            <p>
              ${snippet}
            </p>
          </a>
        `;
    })
    .join("");

  // dynamically inserting the iterated list of data from the sever into the HTML
  result.innerHTML = `<div class="articles">${wikiList}</div>`;
};
