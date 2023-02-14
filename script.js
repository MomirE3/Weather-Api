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

      mainDivLeft(locationAPI, currentAPI);
      mainDivRight(currentAPI);
    });
  document.querySelector("#inputValue").value = "";
});

function newFormatDate(locationAPI) {
  let date = locationAPI.localtime.slice(0, 10);

  let newDate = new Date(date);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return newDate.toLocaleString("en-US", options);
}

function mainDivLeft(locationAPI, currentAPI) {
  let mainDiv = document.querySelector("#main-div");

  while (mainDiv.firstChild) {
    mainDiv.firstChild.remove();
  }

  let div = document.createElement("div");
  mainDiv.appendChild(div);
  div.classList.add("col-6");
  div.classList.add("text-center");

  let h1 = document.createElement("h1");
  h1.append(locationAPI.name);
  h1.classList.add("display-1");
  mainDiv.firstChild.append(h1);

  let p = document.createElement("p");
  p.append(newFormatDate(locationAPI));
  p.classList.add("display-6");
  mainDiv.firstChild.append(p);

  let img = document.createElement("img");
  img.src = currentAPI["condition"].icon;
  img.style.width = "100px";
  mainDiv.firstChild.appendChild(img);

  p = document.createElement("p");
  p.append(currentAPI["condition"].text);
  mainDiv.firstChild.appendChild(p);
}

function mainDivRight(currentAPI) {
  let mainDiv = document.querySelector("#main-div");

  let div = document.createElement("div");
  mainDiv.appendChild(div);
  div.classList.add("col-6");
  div.classList.add("text-center");
  div.setAttribute("id", "second-div");

  let h1 = document.createElement("h1");
  h1.append(currentAPI.temp_c + "°C");
  h1.setAttribute("id", "temp");

  h1.classList.add("display-1");
  mainDiv.lastChild.append(h1);

  fahrenheitOrCelsius(currentAPI);
}

function fahrenheitOrCelsius(currentAPI) {
  let div = document.querySelector("#second-div");
  let p = document.createElement("p");
  p.classList.add("display-6");

  let span = document.createElement("span");
  span.setAttribute("id", "celsius");
  let text = document.createTextNode("C ");
  span.appendChild(text);
  span.classList.add("text-warning");
  span.classList.add("fw-bold");
  p.appendChild(span);

  span = document.createElement("span");
  text = document.createTextNode(" | ");
  span.appendChild(text);
  p.appendChild(span);
  div.appendChild(p);

  span = document.createElement("span");
  span.setAttribute("id", "fahrenheit");
  text = document.createTextNode(" F");
  span.appendChild(text);
  p.appendChild(span);
  p.classList.add("mt-5");
  p.style.cursor = "pointer";
  div.appendChild(p);

  celsius = document.querySelector("#celsius");
  fahrenheit = document.querySelector("#fahrenheit");

  celsius.addEventListener("click", () => {
    fahrenheit.classList.remove("text-warning");
    fahrenheit.classList.remove("fw-bold");
    celsius.classList.add("text-warning");
    celsius.classList.add("fw-bold");

    temp = document.querySelector("#temp");
    temp.innerHTML = `${currentAPI.temp_c}°C`;
  });

  fahrenheit.addEventListener("click", () => {
    celsius.classList.remove("text-warning");
    celsius.classList.remove("fw-bold");
    fahrenheit.classList.add("text-warning");
    fahrenheit.classList.add("fw-bold");

    temp = document.querySelector("#temp");
    temp.innerHTML = `${currentAPI.temp_f}°F`;
  });
}
