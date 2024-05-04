document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector(".js-btn")
  const resultRequest = document.querySelector(".result-request")

  btn.addEventListener("click", handleClick)

  async function handleClick() {
    const firstInput = parseInt(document.querySelector(".js-first-input").value)
    const secondInput = parseInt(document.querySelector(".js-second-input").value)

    if ((firstInput < 1 || firstInput > 10 || isNaN(firstInput)) && (secondInput < 1 || secondInput > 10 || isNaN(secondInput))) {
      showError("Номер страницы и лимит вне диапазона от 1 до 10")
      return
    }

    if (firstInput < 1 || firstInput > 10 || isNaN(firstInput)) {
      showError(resultRequest.innerHTML = "Номер страницы вне диапазона от 1 до 10")
      return
    }

    if (secondInput < 1 || secondInput > 10 || isNaN(secondInput)) {
      showError(resultRequest.innerHTML = "Лимит вне диапазона от 1 до 10")
      return
    }

    try {
      const json = await fetchData(firstInput, secondInput)
      displayData(json)
      saveToLocalStorage(firstInput, secondInput)
    } catch (error) {
      showError(`Ошибка: ${error.message}`)
    }
  }

  async function fetchData(page, limit) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=${limit}`)
    if (!response.ok) {
      throw new Error("Не удалось сделать запрос")
    }
    return response.json()
  }

  function displayData(data) {
    resultRequest.innerHTML = ""
    data.forEach(item => {
      const image = document.createElement("img")
      image.classList.add("img")
      image.src = item.thumbnailUrl
      resultRequest.appendChild(image)
    })
  }

  function saveToLocalStorage(page, limit) {
    localStorage.setItem('lastRequest', JSON.stringify({ page, limit }))
  }

  function showError(message) {
    resultRequest.innerHTML = message
  }

  const lastRequest = JSON.parse(localStorage.getItem('lastRequest'))
  if (lastRequest) {
    fetchData(lastRequest.page, lastRequest.limit)
      .then(displayData)
      .catch(error => showError(`Ошибка: ${error.message}`))
  }
})