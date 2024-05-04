function takeWidthAndHeight() {
	let inputWidth = document.querySelector(".inp-width").value
	let inputHeight = document.querySelector(".inp-height").value
	let text = document.querySelector(".text")

	if (inputWidth < 100 || inputWidth > 300 || inputHeight < 100 || inputHeight > 300) {
		return text.innerHTML = "<p class=\"text\">Одно из чисел вне диапазона от 100 до 300</p>"
	} else {
		text.innerHTML = ""
	  return fetch(`https://dummyimage.com/${inputWidth}x${inputHeight}/`)
		  .then(response => {
				if(!response.ok) {
					throw Error("Ошибка загрузки изображения")
				}
				return response.blob()
		  })
		  .then(blob => {
				let imgUrl = URL.createObjectURL(blob)
			  let image = document.createElement("img")
			  image.src = imgUrl
			  return text.appendChild(image)
		  })
	}
}

document.querySelector(".btn").addEventListener("click", takeWidthAndHeight)