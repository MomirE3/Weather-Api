const cityInput = document.getElementById("inputValue");
const cityList = document.getElementById("cityList");

cityInput.addEventListener("input", () => {
  const query = cityInput.value;
  if (query.length > 2) {
    fetch(
      `https://api.weatherapi.com/v1/search.json?key=5afd5d58c8504bb4bc2224735231102&q=${query}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const cities = [];
        for (let i = 0; i < data.length; i++) {
          cities.push(data[i].name);
        }
        createCityList(cities);
      })
      .catch((error) => console.error(error));
  } else {
    clearCityList();
  }
});

function createCityList(cities) {
  cityList.innerHTML = "";
  cities.forEach((city) => {
    const option = document.createElement("div");
    option.textContent = city;
    option.classList.add("autocomplete-items");
    option.addEventListener("click", () => {
      cityInput.value = city;
      clearCityList();
    });
    cityList.appendChild(option);
  });
}

function clearCityList() {
  cityList.innerHTML = "";
}
