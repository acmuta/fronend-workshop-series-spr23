// Code shown during the workshop on 3/23/2

/***
 * Performs HTTP GET request from the dog.ceo API
 * Written as an async function for cleanliness
 */
async function getData() {
  let data = await fetch("https://dog.ceo/api/breeds/image/random");
  return data.json();
  
  /* Without async, this code could be written as:
  return fetch("https://dog.ceo/api/breeds/image/random")
    .then((response) => response.json());
  */
}

/***
 * Runs the getData() function and updates the image element
 * with the responsse from the API
 * This function must be async to use the `await` keyword
 */
async function getDog() {
  // Think of `await` as pausing to let the API response finish
  let dogData = await getData();
  let dogURL = dogData.message;
  let dogImg = document.querySelector("#dog");

  dogImg.setAttribute("src", dogURL);
  dogImg.setAttribute("alt", "a dog");
  /* Another (less preferred) way to write the above code:
  dogImg.src = dogURL;
  dogImg.alt = "a dog";
  */
}

/***
 * Retrieves the value of the provided input element,
 * creates a new <p> element, sets the element to the
 * form input value, and adds the element to the DOM
 * @param {string} input selector for a FormInputElement
 */
function showText(input) {
  let p = document.createElement("p");
  let textInput = document.querySelector(input);
  let text = textInput.value;

  p.innerHTML = text;

  document.body.appendChild(p);
}

let textBtn = document.querySelector("#textBtn");

/* The second parameter must be an anonymous function to allow for
   passing the argument to the showText() function */
textBtn.addEventListener("click", () => showText("#textInput"));

let dogBtn = document.querySelector("#dogBtn");
dogBtn.addEventListener("click", getDog);
