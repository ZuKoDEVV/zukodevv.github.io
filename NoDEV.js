let Selecting
let UrlPreview

function LoadFursonaSection(Section) {
	const ul = document.getElementById("ulFursonasButtons")

	document.querySelectorAll("#FursonasContainer > div").forEach((section) => {
		section.classList.add("InactiveSection")
	})

	let SectionLoad = document.querySelector(`#FursonasContainer > #${Section}`)
	SectionLoad.classList.remove("InactiveSection")

	ul.querySelector(".selected").classList.remove("selected")

	let Button = ul.querySelector(`#${Section}`)
	Button.classList.add("selected")
}

function UpdateSelectingSocial() {
	UrlPreview.textContent = ". . ."

	if (Selecting) {
		const domain = (new URL(Selecting)).hostname.replace('www.', '')
		const SelectingWithoutHttps = Selecting.replace("https://", "")

		UrlPreview.innerHTML = `https://<span class="statTextPrimary">${domain}</span>${SelectingWithoutHttps.replace(domain, "")}`
	}
}

function InitSocialsAnim() {
	UrlPreview = document.getElementById("SocialUrlPreview")
	UpdateSelectingSocial()

	document.getElementsByClassName("SocialPreDiv").item(0).querySelectorAll("a").forEach((a) => {
		a.addEventListener("mouseenter", function () {
			Selecting = a.getAttribute("href")
			UpdateSelectingSocial()
		})

		a.addEventListener("mouseleave", function () {
			Selecting = null
			UpdateSelectingSocial()
		})
	})
}

document.addEventListener("DOMContentLoaded", function(){
	let selected = false

	document.querySelectorAll("#FursonasContainer > div").forEach(function(section) {
		const li = document.createElement("li")
		const a = document.createElement("a")
		
		li.id = section.id
		li.appendChild(a)
		a.textContent = section.id

		a.addEventListener("click", function(){
			LoadFursonaSection(section.id)
		})

		document.getElementById("ulFursonasButtons").appendChild(li)

		if (!selected){
			selected = true
			li.classList.add("selected")
			LoadFursonaSection(section.id)
		}

		section.classList.add("BaseContainerDIV", "ContainerFursonasWiki")
	})

	selected = false

	document.querySelectorAll("#openDiv").forEach(function(a){
		const targetStr = a.getAttribute("data-Div")
		const targetDiv = document.querySelector(`#${a.parentElement.id} > #${targetStr}`)

		a.textContent = `${targetStr.replaceAll("_", " ")} ↓`
		
		a.addEventListener("click", function(){
			targetDiv.classList.toggle("InactiveSection")
		})

		if (!selected){
			selected = true
			targetDiv.classList.toggle("InactiveSection")
		}
	})
})