let xmlString = `
<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>
`

let parser = new DOMParser()
let xmlParse = parser.parseFromString(xmlString, "application/xml")
let students = xmlParse.querySelectorAll("student")
let result = {
	list: []
}

students.forEach(student => {
	let name = student.querySelector("name")
	let lang = name.getAttribute("lang")
	let firstName = name.querySelector("first").textContent
	let secondName = name.querySelector("second").textContent
	let age = student.querySelector("age").textContent
	let prof = student.querySelector("prof").textContent

	result.list.push({
		name: `${firstName} ${secondName}`,
		age: age,
		prof: prof,
		lang: lang,
	})
})

console.log(result)