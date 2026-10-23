let Selecting
let UrlPreview

function LoadFursonaSection(Section) {
	document.querySelectorAll("#sectionFursona").forEach((section) => {
		section.classList.add("InactiveSection")
	})

	let SectionLoad = document.getElementById(Section)
	SectionLoad.classList.remove("InactiveSection")

	document.getElementById("headerFursonas").querySelector(".selected").classList.remove("selected")

	let Button = document.getElementById(`${Section}_LI`)
	Button.parentElement.classList.add("selected")
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