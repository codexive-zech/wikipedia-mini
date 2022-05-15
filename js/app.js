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
  console.log(searchValue);
};
