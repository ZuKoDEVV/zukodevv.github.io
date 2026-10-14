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