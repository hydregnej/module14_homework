let btn = document.querySelector(".btn");
let newDiv = document.createElement("div");
newDiv.className = "new-div";
document.body.appendChild(newDiv);

btn.addEventListener("click", () => {
  let input = document.querySelector(".input").value;
  newDiv.innerHTML = "";
  if (input < 1 || input > 10) {
    let newText = document.createTextNode("Число вне диапазона от 1 до 10");
    newDiv.appendChild(newText);
    document.body.appendChild(newDiv);
  } else {
    let xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      `https://jsonplaceholder.typicode.com/photos?_limit=${input}`
    );
    xhr.onload = function () {
      if (xhr.status < 200 || xhr.status > 299) {
        let errorText = document.createTextNode(
          `Ошибка загрузки данных. Статус: ${xhr.status}`
        );
        newDiv.appendChild(errorText);
        document.body.appendChild(newDiv);
      } else {
        let parse = JSON.parse(xhr.responseText);

        parse.forEach((photo) => {
          let img = document.createElement("img");
          img.src = photo.thumbnailUrl;
          newDiv.appendChild(img);
        });
      }
    };

    xhr.onerror = function () {
      newDiv.textContent = "Произошла ошибка при выполнении запроса";
    };

    xhr.send();
  }
});
