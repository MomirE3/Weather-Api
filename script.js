button = document.querySelector("#searchButton");
button.addEventListener("click", () => {
  text = document.querySelector("#inputValue").value;
  console.log(text);

  fetch(
    `http://api.weatherapi.com/v1/current.json?key=5afd5d58c8504bb4bc2224735231102&q=${text}&aqi=yes`
  )
    .then((response) => response.json())
    .then((data) => {
      locationAPI = data["location"];
      tempAPI = data["current"];
      nameOfCity = document.querySelector("#name");
      nameOfCity.innerHTML = locationAPI.name;
      tempOfCity = document.querySelector("#temp");
      tempOfCity.innerHTML = tempAPI.temp_c;
    });
  document.querySelector("#inputValue").value = "";
});
