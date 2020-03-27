const restCountriesApi = axios.create({
  baseURL: "https://restcountries.eu/rest/v2/name/"
});

let errDiv;
const countryName = countryName
const countryCapital = countryCapital
const theButton =  document.getElementById("theButton")

function getCountryInfo(theName) {
  restCountriesApi
    .get(theName)
    .then(responseAPI => {
      removeErrDiv();
      const countryName = responseAPI.data[0].name;
      const countryCapital = responseAPI.data[0].capital;

      // shows data in the browser
      countryName.innerHTML = countryName;
      countryCapital.innerHTML =
        "Capital: " + countryCapital;
    })
    .catch(err => {
      if (err.response.status === 404) {
        removeCountryInfo();
        createDiv();
        const theErr = document.createTextNode(`What the heck is ${theName}? `);
        errDiv.appendChild(theErr);
      } else {
        console.log("err => ", err);
      }
    });
}

function createDiv() {
  errDiv = document.createElement("div");
  errDiv.setAttribute("id", "error");
  document.body.appendChild(errDiv);
}

function removeErrDiv() {
  if (document.getElementById("error")) {
    const error = document.getElementById("error");
    error.parentNode.removeChild(error);
  }
}

function removeCountryInfo() {
  countryName.innerHTML = "";
  countryCapital.innerHTML = "";
}

function checkInput() {
  removeErrDiv();
  if (document.getElementById("theInput").value === "") {
    theButton.disabled = true;
    removeCountryInfo();
    createDiv();
    const theErr = document.createTextNode(`Wanna input something? `);
    errDiv.appendChild(theErr);
  } else {
    document.getElementById("theButton").disabled = false;
  }
}

document.getElementById("theButton").onclick = function() {
  removeErrDiv();
  const country = document.getElementById("theInput").value;
  getCountryInfo(country);
};
