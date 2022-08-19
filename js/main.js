class Usuario {
    constructor(nombre) {
      this.nombre = nombre;
      
    }
}

let nombre = document.getElementById("nombre")
const form = document.getElementById("validarUsuario")
const texto = document.getElementById("faltaNombre")
let holaNombre = document.querySelector(".holaNombre")
let prestamosActuales = document.querySelector("#prestamosActuales")
let salir = document.querySelector(".btnCuadradoSalir")
let hastaLuego = document.querySelector(".hastaLuego") 

let usuario = []

//cargo el usuario en el localstorage y valido formulario
form.addEventListener("submit", e=> {
    e.preventDefault()
    let aviso = ""
    let entrar = false
    texto.innerHTML = ""
    if (nombre.value.length <4){
        aviso +="El nombre no es válido"
        entrar = true
    }
    //cambio los divs segun va navegando el usuario
    if(entrar){
        texto.innerHTML = aviso
    } else {
        nombre = document.querySelector("#nombre").value
        usuario.push(new Usuario(nombre))        
        localStorage.setItem("usuario", JSON.stringify(usuario))
        document.querySelector(".verForm").style.display = "none"
        document.querySelector(".verBotones").style.display = "block"
        document.querySelector(".holaNombre").innerHTML += `Hola ${nombre}, ¿Qué querés hacer?`
        
    }       

})

salir.addEventListener('click', () =>{
    
    document.querySelector(".hastaLuego").style.display = "block"
    document.querySelector(".hastaLuego").innerHTML += `¡Hasta luego!`
    document.querySelector(".contenedorBtn").style.display = "none"
    document.querySelector(".holaNombre").style.display = "none"


    }  


)












                      