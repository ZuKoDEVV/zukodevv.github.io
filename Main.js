function LoadSection(Section) {
	document.querySelectorAll("section").forEach((section) => {
		section.classList = "InactiveSection"
	})

	let SectionLoad = document.getElementById(Section)
	SectionLoad.classList = ""

	document.getElementsByTagName("header").item(0).querySelector(".selected").classList.remove("selected")

	let Button = document.getElementById(`${Section}_LI`)
	Button.parentElement.classList.add("selected")
}

function EnableCustomMouse() {
	//.add("UseCustomCursor")
	
}

LoadSection("HomeSection")