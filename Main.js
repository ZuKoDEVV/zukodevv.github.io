function LoadSection(Section) {
	document.querySelectorAll("section").forEach((section) => {
		section.classList.add("InactiveSection")
	})

	let SectionLoad = document.getElementById(Section)
	SectionLoad.classList.remove("InactiveSection")

	document.getElementById("MainHeader").querySelector(".selected").classList.remove("selected")

	let Button = document.getElementById(`${Section}_LI`)
	Button.parentElement.classList.add("selected")
}

function LoadGallery(SectionName, Items = 10) {
	const append = document.querySelector(`[data-past_container='${SectionName}']`).querySelector("[data-section_name='Gallery']")

	const AlredyExist = append.querySelector("#GalleryItems")

	if (AlredyExist) {return}

	const div = document.createElement("div")
	div.classList.add("image-container")
	div.id = "GalleryItems"

	for (let i = 1; i < Items; i++){
		const img = document.createElement("img")
		img.setAttribute("src", `./Media/PastProyects/${SectionName}/${i}.png`)
		div.appendChild(img)
	}

	append.appendChild(div)
}

function ChangeCustomMouseIcon(IconRoot="ZuKoCursor/Default.png") {
	document.getElementsByClassName("CustomCursor").item(0).querySelector("img").setAttribute("src", `./Media/Art/Cursor/${IconRoot}`)
}

function ToggleCustomMouse() {
	ChangeCustomMouseIcon("ZuKoCursor/Default.png")

	const AlredyExist = document.getElementById("CustomMouseStyle")

	if (AlredyExist) {
		AlredyExist.remove()
		return
	}

	const CustomMouseStyle = document.createElement("link")
	CustomMouseStyle.id = "CustomMouseStyle"
	CustomMouseStyle.setAttribute("rel", "stylesheet")
	CustomMouseStyle.setAttribute("href", "./Cursors/ZuKoCursor.css")

	document.head.appendChild(CustomMouseStyle)

	console.log(CustomMouseStyle)
}

function ChangeCustomMouse(){
	const AlredyExist = document.getElementById("CustomMouseStyle")

	if (AlredyExist) {
		const ActualActive = AlredyExist.getAttribute("data-active_cursor_css")

		if (ActualActive === "ZuKoCursor") {
			AlredyExist.setAttribute("href", "./Cursors/NymiCursor.css")
			ChangeCustomMouseIcon("ZuKoCursor/Default.png")

		} else {
			AlredyExist.setAttribute("href", "./Cursors/ZuKoCursor.css")
			ChangeCustomMouseIcon("NymiraCursor/Default.png")
		}

		AlredyExist.setAttribute("data-active_cursor_css", (ActualActive === "ZuKoCursor" && "NymiraCursor") || "ZuKoCursor")

		return
	}
}

function InitTags() {
	document.querySelectorAll(".Tags").forEach((tagContainer) => {
		tagContainer.querySelectorAll(".baseContainerDIV").forEach((p) => {
			p.textContent = `● ${p.id.replaceAll("_", " ")}`
		})
	})
}

function InitPastWorkSections(){
	document.querySelectorAll("[data-past_container]").forEach((container) => {
		const header = container.querySelector("header")
		const ul = container.querySelector("ul")

		let sections = []
		let lis = []

		function Toggle(Show) {
			sections.forEach((section) => {
				if (section.getAttribute("data-section_name") === Show) {
					section.classList.remove("InactiveSection")
				} else {
					section.classList.add("InactiveSection")
				}
			})

			lis.forEach((li) => {
				if (li.id === Show) {
					li.classList.add("selected")
				} else {
					li.classList.remove("selected")
				}
			})
		}

		container.querySelectorAll("[data-section_name]").forEach((sectionDiv) => {
			const SectionName = sectionDiv.getAttribute("data-section_name")

			sections.push(sectionDiv)

			const li = document.createElement("li")
			li.id = SectionName

			const a = document.createElement("a")
			a.text = SectionName

			li.appendChild(a)
			ul.appendChild(li)

			li.addEventListener("click", function () {
				Toggle(SectionName)

				if (SectionName === "Gallery") {
					LoadGallery(container.getAttribute("data-past_container"), sectionDiv.getAttribute("data-images"))
				}
			})

			lis.push(li)
		})

		Toggle("DevHistory")
	})
}