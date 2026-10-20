const TagsIDs = [
	"Abandoned",
	"Public",
	"Reworked",
	"ZKGames",
	"Unfinished",
	"Game",
	"Plugin"
]

const Tags = {
	Abandoned: "This proyect is TOTALLY abandoned, but in some cases it get a Rework",
	Public: "You <span class='statTextPrimary'>can find this proyect everywhere</span>",
	Reworked: "This proyect was remade by 0 see <span class='statTextPrimary'>current proyects</span> or the other version can also be find here",
	ZKGames: "This proyect was published in <span class='statTextPrimary'>ZKGames</span>",
	Unfinished: "This proyect <span class='statTextPrimary'>isnt finished yet</span>",
	Game: "This is self explanatory",
	Plugin: "Also self explanatory",
	"Betatest_Only": "This proyect is <span class='statTextPrimary'>only avaiable </span> to ZKGames <span class='statTextPrimary'>betatesters</span>"
}

function LoadSection(Section) {
	document.querySelectorAll("section").forEach((section) => {
		section.classList.add("InactiveSection")
	})

	let SectionLoad = document.getElementById(Section)
	SectionLoad.classList.remove("InactiveSection")

	document.getElementById("MainHeader").querySelector(".selected").classList.remove("selected")

	let Button = document.getElementById(`${Section}_LI`)
	Button.parentElement.classList.add("selected")

	let url = new URL(window.location.href)
	url.searchParams.delete("section")
	url.searchParams.append('section', Section)

	// No c si alguien llegue a leer esto pero el try es pq al estar en file:// esta cosa no sirve
	try {
		window.history.pushState({}, '', url)
	} catch { }
}

document.addEventListener("DOMContentLoaded", function () {
	const pharams = new URLSearchParams(window.location.search)
	const actualPageType = document.body.getAttribute("data-page")

	LoadSection(pharams.get("section") || (actualPageType == "portfolio" && "HomeSection") || "WhoIm")
})

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
	document.getElementById("CustomMouseIcon").querySelector("img").setAttribute("src", `./Media/Art/Cursor/${IconRoot}`)
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

let ActiveFilters = []
let FilterButtons = []

function UpdateTagsFilter() {
	FilterButtons.forEach((li) => {
		if (ActiveFilters.find((str) => str == li.getAttribute("data-filter"))) {
			li.classList.add("selected")
		} else {
			li.classList.remove("selected")
		}
	})

	document.getElementById("DisableFilters").classList.value = (ActiveFilters.length == 0 && ["selected"]) || []
}

function ClearTagsFilter() {
	ActiveFilters = []
	UpdateTagsFilter()
}

function InitTags() {
	const tagFilterNav = document.getElementById("TagsFilterNav")
	const NavLinks = tagFilterNav.querySelector(".navLinks")

	const p = document.createElement("p")
	p.classList.add("ExtraInfo")

	document.querySelectorAll(".Tags").forEach((tagContainer) => {
		tagContainer.querySelectorAll(".BaseContainerDIV").forEach((a) => {
			a.textContent = `● ${a.id.replaceAll("_", " ")}`

			if (Tags[a.id]) {
				a.setAttribute("data-description", Tags[a.id])
			}
		})
	})

	UpdateTagsFilter()

	p.addEventListener("mouseover", function () {
		p.classList.add("InactiveSection")
		document.body.appendChild(p)
	})

	document.querySelectorAll("[data-description]").forEach((wa) => {
		wa.addEventListener("mouseover", function () {
			wa.appendChild(p)
			p.innerHTML = wa.getAttribute("data-description")
			p.classList.remove("InactiveSection")
		})

		wa.addEventListener("mouseout", function () {
			p.classList.add("InactiveSection")
		})
	})

	TagsIDs.forEach((str) => {
		const li = document.createElement("li")
		const a = document.createElement("a")

		li.setAttribute("data-filter", str)
		a.textContent = str

		NavLinks.appendChild(li)
		li.appendChild(a)

		FilterButtons.push(li)
	})

	tagFilterNav.querySelectorAll("li").forEach((li) => {
		li.querySelector("a").addEventListener("click", function () {
			const filter = li.getAttribute("data-filter")

			if (!ActiveFilters.find((str) => str == filter)) {
				ActiveFilters.push(filter)
			} else {
				ActiveFilters.forEach((str, TagIndex) => {
					if (str == filter) {
						ActiveFilters.splice(TagIndex, 1)
					}
				})
			}

			UpdateTagsFilter()
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
			a.text = SectionName.replaceAll("_", " ")

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