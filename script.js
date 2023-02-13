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

  if (mainDiv.firstChild) {
    mainDiv.firstChild.remove();
  }

  let div = document.createElement("div");
  mainDiv.append(div);

  let h1 = document.createElement("h1");
  h1.append(locationAPI.name);
  mainDiv.firstChild.append(h1);

  let p = document.createElement("p");
  p.append(newFormatDate(locationAPI));
  mainDiv.firstChild.append(p);

  let img = document.createElement("img");
  img.src = currentAPI["condition"].icon;
  img.style.width = "100px";
  mainDiv.firstChild.appendChild(img);

  p = document.createElement("p");
  p.append(currentAPI["condition"].text);
  mainDiv.firstChild.appendChild(p);
}
