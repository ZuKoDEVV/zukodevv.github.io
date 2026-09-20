const OwnProyects = [
    {
        Title : "OUTSTEP",
        Desc : 
`OUTSTEP es curiosamente el primer proyecto que hize cuando entre a Roblox Studio solo que antes se llamaba "Ezquivar"

El primer Ezquivar se habia comenzado una tarde cuando instale Roblox Studio el 01/04/2023 como una broma del dia de los inocentes (asi este en latam) pero me termino gustando, lastimosamente unos meses despues lo abandone pq literal no tenia experiencia y el proyecto era muy avaro.

2 años despues decidi retomar el proyecto renombrandolo "Ezquivar Rewritted" el cual prometia dejar las mecanicas base de Ezquivar pero con sistemas de parkour, personajes y mas rondas especiales pero oh sorpresa, me rendi a medio camino

En la actualidad (2026) decidi retomarlo devuelta y dejarlo en su propio camino como "OUTSTEP" el cual promete mecanicas poco comunes en roblox como los portales con "Geometría no euclidiana", cambios de gravedad más frecuentes, rondas especiales, espejos de otro mundo, un antagonista y hasta incluso con su propia historia en donde nada es lo que parece >:3

<a href = "https://roblox.com/es/games/12965892928/" target="_blank">Ezquivar Original</a>
(Las primeras 2 imagenes son del Ezquivar Original)

<span style="color: red;">
[A.U.R.O.R.A]

Estas atrapado aqui
No podras escapar
De tu nuevo hogar...
E l  I N F I E R N O
</span>
`,

        ImagesNames : [
            "one.webp",
            "tu.webp",
            "tri.webp",
            "ezr.webp",
            "ezrMirrors.png",
            "GravityChangers.png",
            "OneMirror2Worlds.png",
            "RatBossEz.webp",
            "ez1SandMap.webp"
        ]
    },

        {
        Title : "The Odd Forest",
        Desc : "[REDACTADO]",

        ImagesNames : []
    }
]

const CollabProyects = [
    {
        Title : "A.Terminales Medellin",
        Desc : 

`A.Terminales fue uno de mis primeros proyectos en Roblox, es el proyecto en el que he colaborado el cual le tengo más aprecio ya que es uno de los proyectos en donde todo comenzo :3
             
A.Terminales fue desarrollado por:
        
    - Isimo como Owner y builder del juego
    - 200FI como Importer de buses
    - ZuKomaDEV: Como scripter principal y diseñador de algunas UI's`,

        ImagesNames : [
            "img1.webp",
            "img2.webp",
            "img3.webp",
            "img4.webp",
            "img5.webp",
            "img6.webp"
        ]
    },

    {
        Title : "DeadHill",
        Desc :
`DeadHill es uno de los ultimos proyectos en los que he estado (2026) y en este he aportado en bastantes sistemas como el Dealer de Armas y Motos, sistemas de promocodes, Sistemas adaptados al ACS, mejoras de sistemas que ya estaban entre muchos otros


La verdad me encanta este proyecto porque es de los primeros en los que estoy trabajando de manera profecional y con un equipo mucho mas grande
        
DeadHill fue desarrollado por:
[NO RECUERDO]`,

        ImagesNames : [
            "image.webp",
            "image.png",
            "image2.png",
            "image3.png"
        ]
    }
]

document.getElementById('RandomCat').addEventListener('click', () => {
    window.open("https://cataas.com/cat/orange", "_blank", 'noopener,noreferrer')
});

document.getElementById("CloseBigImage").addEventListener("click", () =>{
    document.getElementById("FullImage").classList.add("hide")
})

function OpenFullImage(src){
    const Container = document.getElementById("FullImage")
    Container.classList.remove("hide")
    Container.querySelector("img").src = src
}

function LoadDivProyect(Index, IsOwnProyect, element){
    const alredyClonned = document.getElementById("clonned")

    document.querySelectorAll("#ProyectButtonClonned").forEach(button =>{
        button.classList.remove("selected")
    })

    if (alredyClonned){
        alredyClonned.remove()
    }

    element.classList.add("selected")

    const original = document.getElementById("divProyects")

    const clone = original.cloneNode(true)
    clone.id = "clonned"
    clone.classList.remove("hide")

    let InfoTable

    if (IsOwnProyect){
        InfoTable = OwnProyects[Index]
    }else{
        InfoTable = CollabProyects[Index]
    }

    clone.querySelector("#Desc").innerHTML = InfoTable.Desc
    clone.querySelector("#Title").textContent = InfoTable.Title

    for (let i = 0; i < InfoTable.ImagesNames.length; i++){
        const src = `GamesImages/${InfoTable.Title}/${InfoTable.ImagesNames[i]}`

        const cloneImage = clone.querySelector("#PreviewGameImage").cloneNode(true)
        const img = cloneImage.querySelector("img")
        cloneImage.id = ""
        cloneImage.classList.remove("hide")
        img.src = src

        img.addEventListener("click", () =>{
            OpenFullImage(src)
        })

        clone.querySelector("#ContainerPreviews").appendChild(cloneImage)
    }

    clone.querySelector("#PreviewGameImage").remove()

    if (IsOwnProyect){
        document.getElementById("ContainerProyects").appendChild(clone)
    }else{
        document.getElementById("ContainerCollabProyects").appendChild(clone)
    }
}

for (let i = 0; i < OwnProyects.length; i++){
    const clone = document.getElementById("ProyectButton").cloneNode(true)
    clone.id = "ProyectButtonClonned"
    clone.classList.remove("hide")
    clone.textContent = OwnProyects[i].Title

    clone.addEventListener("click", () => {
        LoadDivProyect(i, true, clone)
    })

    document.getElementById("ProyectsButtonContainer").appendChild(clone)
}

for (let i = 0; i < CollabProyects.length; i++){
    const clone = document.getElementById("CollabProyectsButtonContainer").querySelector("button").cloneNode(true)
    clone.id = "ProyectButtonClonned"
    clone.classList.remove("hide")
    clone.textContent = CollabProyects[i].Title

    clone.addEventListener("click", () => {
        LoadDivProyect(i, false, clone)
    })

    document.getElementById("CollabProyectsButtonContainer").appendChild(clone)
}