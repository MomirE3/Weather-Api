let button = document.querySelector("#searchButton");

let text = document.querySelector("#inputValue");
text.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    button.click();
  }
});

button.addEventListener("click", () => {
  let text = document.querySelector("#inputValue").value;
  fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=5afd5d58c8504bb4bc2224735231102&q=${text}&days=1&aqi=no&alerts=no`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let locationAPI = data["location"];
      let currentAPI = data["current"];

      let nameOfCity = document.querySelector("#name");
      nameOfCity.append(locationAPI.name);

      let date = locationAPI.localtime.slice(0, 10);

      let dateOfCity = document.querySelector("#date");
      dateOfCity.append(newFormatDate(date));
    });
  document.querySelector("#inputValue").value = "";
});

function newFormatDate(date) {
  let newDate = new Date(date);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return newDate.toLocaleString("en-US", options);
}
