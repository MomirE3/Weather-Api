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
    `http://api.weatherapi.com/v1/forecast.json?key=5afd5d58c8504bb4bc2224735231102&q=${text}&days=7&aqi=no&alerts=no`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let locationAPI = data["location"];
      let currentAPI = data["current"];
      let forecastAPI = data["forecast"]["forecastday"];

      let date = locationAPI.localtime.slice(0, 10);

      mainDivLeft(locationAPI, currentAPI, date);
      mainDivRight(currentAPI, forecastAPI);
      secondMainDiv(forecastAPI, currentAPI);
    });
  document.querySelector("#inputValue").value = "";
  removeAutoComplete();
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

function mainDivLeft(locationAPI, currentAPI, date) {
  let mainDiv = document.querySelector("#main-div");
  mainDiv.parentElement.classList.add("background-style");
  while (mainDiv.firstChild) {
    mainDiv.firstChild.remove();
  }

  let div = document.createElement("div");
  mainDiv.appendChild(div);
  div.classList.add("col-6", "text-center");

  let h1 = document.createElement("h1");
  h1.append(locationAPI.name);
  h1.classList.add("display-1");
  mainDiv.firstChild.append(h1);

  let p = document.createElement("p");
  p.append(newFormatDate(date));
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

function mainDivRight(currentAPI, forecastAPI) {
  let mainDiv = document.querySelector("#main-div");

  let div = document.createElement("div");
  mainDiv.appendChild(div);
  div.classList.add("col-6", "text-center");
  div.setAttribute("id", "second-div");

  let h1 = document.createElement("h1");
  h1.append(currentAPI.temp_c + "??C");
  h1.setAttribute("id", "temp");

  h1.classList.add("display-1");
  mainDiv.lastChild.append(h1);

  fahrenheitOrCelsius(currentAPI, forecastAPI);
}

function fahrenheitOrCelsius(currentAPI, forecastAPI) {
  let div = document.querySelector("#second-div");
  let p = document.createElement("p");
  p.classList.add("display-6");

  let span = document.createElement("span");
  span.setAttribute("id", "celsius");
  let text = document.createTextNode("C ");
  span.appendChild(text);
  span.classList.add("text-warning", "fw-bold");
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
    fahrenheit.classList.remove("text-warning", "fw-bold");
    celsius.classList.add("text-warning", "fw-bold");

    temp = document.querySelector("#temp");
    temp.innerHTML = `${currentAPI.temp_c}??C`;
  });

  fahrenheit.addEventListener("click", () => {
    celsius.classList.remove("text-warning", "fw-bold");
    fahrenheit.classList.add("text-warning", "fw-bold");

    temp = document.querySelector("#temp");
    temp.innerHTML = `${currentAPI.temp_f}??F`;
  });
}

function secondMainDiv(forecastAPI, currentAPI) {
  let mainDiv2 = document.querySelector("#main-div-2");

  while (mainDiv2.firstChild) {
    mainDiv2.firstChild.remove();
  }

  let div = document.createElement("div");
  div.classList.add("col-12", "d-flex", "justify-content-center");

  let p = document.createElement("p");
  p.style.cursor = "pointer";
  let text = document.createTextNode("Hourly");
  p.appendChild(text);
  p.setAttribute("id", "hourly");
  p.classList.add("me-5", "display-6");
  div.appendChild(p);

  p = document.createElement("p");
  p.style.cursor = "pointer";
  text = document.createTextNode("Daily");
  p.appendChild(text);
  p.setAttribute("id", "daily");
  p.classList.add("ms-5", "display-6");
  div.appendChild(p);
  mainDiv2.appendChild(div);

  let hr = document.createElement("hr");
  hr.style.border = "3px solid #fff";
  mainDiv2.appendChild(hr);

  let hourly = document.querySelector("#hourly");
  let daily = document.querySelector("#daily");

  hourly.addEventListener("click", () => {
    let dailyDiv = document.querySelector("#div-group");
    if (dailyDiv) {
      dailyDiv.remove();
    }

    daily.classList.remove(
      "text-warning",
      "fw-bold",
      "text-decoration-underline",
      "pe-none"
    );
    hourly.classList.add(
      "text-warning",
      "fw-bold",
      "text-decoration-underline",
      "pe-none"
    );

    let currentTime = currentAPI.last_updated.slice(11, 13);
    let arrayOfHours = [...forecastAPI[0].hour];
    arrayOfHours = arrayOfHours.concat(arrayOfHours);

    var divGroup = document.createElement("div");
    divGroup.classList.add("row", "justify-content-center", "text-center");
    divGroup.setAttribute("id", "div-group");
    mainDiv2.appendChild(divGroup);

    for (let i = 0; i < arrayOfHours.length; i++) {
      if (currentTime == arrayOfHours[i].time.slice(11, 13)) {
        for (let j = i + 1; j < i + 7; j++) {
          var div = document.createElement("div");
          div.classList.add("col");
          var p = document.createElement("p");

          if (arrayOfHours[j].time.slice(11, 13)[0] == "0") {
            p.append(`${arrayOfHours[j].time.slice(12, 13)}:00`);
            p.classList.add("fs-3");
            var img = document.createElement("img");
            img.src = `${arrayOfHours[j]["condition"].icon}`;
            var p2 = document.createElement("p");
            p2.append(`${arrayOfHours[j].temp_c}??C`);
            p2.classList.add("fs-3");
            p2.style.borderBottom = "3px solid #fff";
            div.appendChild(p);
            div.appendChild(img);
            div.appendChild(p2);
            divGroup.appendChild(div);
          } else {
            p.append(`${arrayOfHours[j].time.slice(11, 13)}:00`);
            p.classList.add("fs-3");
            var img = document.createElement("img");
            img.src = `${arrayOfHours[j]["condition"].icon}`;
            var p2 = document.createElement("p");
            p2.append(`${arrayOfHours[j].temp_c}??C`);
            p2.classList.add("fs-3");
            p2.style.borderBottom = "3px solid #fff";
            div.appendChild(p);
            div.appendChild(img);
            div.appendChild(p2);
            divGroup.appendChild(div);
          }
        }
        break;
      }
    }
  });

  daily.addEventListener("click", () => {
    let hourlyDiv = document.querySelector("#div-group");
    if (hourlyDiv) {
      hourlyDiv.remove();
    }
    hourly.classList.remove(
      "text-warning",
      "fw-bold",
      "text-decoration-underline",
      "pe-none"
    );
    daily.classList.add(
      "text-warning",
      "fw-bold",
      "text-decoration-underline",
      "pe-none"
    );

    var divGroup = document.createElement("div");
    divGroup.classList.add("row", "justify-content-center", "text-center");
    divGroup.setAttribute("id", "div-group");
    mainDiv2.appendChild(divGroup);

    for (let i = 1; i < forecastAPI.length; i++) {
      let date = forecastAPI[i].date;
      finalDate = newFormatDate(date).slice(0, 11);

      var div = document.createElement("div");
      div.classList.add("col");

      var p = document.createElement("p");
      p.append(finalDate);
      p.classList.add("fs-3");

      var img = document.createElement("img");
      img.src = `${forecastAPI[i].day["condition"].icon}`;

      var p2 = document.createElement("p");
      p2.append(`${forecastAPI[i].day.avgtemp_c}??C`);
      p2.classList.add("fs-3");
      p2.style.borderBottom = "3px solid #fff";

      div.appendChild(p);
      div.appendChild(img);
      div.appendChild(p2);
      divGroup.appendChild(div);
    }
  });
}

function removeAutoComplete() {
  const divs = document.querySelectorAll(".autocomplete-items");
  divs.forEach((element) => {
    element.remove();
  });
}
