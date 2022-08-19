let form = document.querySelector("#prestamoNuevo")
let todosPrestamos = document.querySelector("#todosPrestamos")
let infoPrestamo = document.querySelector("#infoPrestamo")
let infoBorrar = document.querySelector("#infoBorrar")
let prestamosActuales = document.querySelector("#prestamosActuales")
let completarCampos = document.querySelector("#completarCampos")
let capitalActualizadoUSD = 158416
let capitalActualizado = 20000000

let prestamos = []

//formulario para cargar en el localstorage
form.addEventListener("submit", (event) => {
	event.preventDefault()
	let nombre = document.querySelector("#nya").value
	let taza = document.querySelector("#taza").value
	let cuota = document.querySelector("#cuota").value
	let moneda = document.querySelector("#moneda").value
	let limite = document.querySelector("#limite").value
	let limiteUSD = document.querySelector("#limiteUSD").value
	let tipodeprestamo = document.querySelector("#tipo").value

  //Validación del formulario

	let entrar = false
	if (nombre <= 4 || nombre === '' || !isNaN(nombre)) {
		document.querySelector("#Inombre").style.color = "#FF00A4"
		entrar = true
	}
	if (taza === '' || taza > 99) {
		document.querySelector("#Itaza").style.color = "#FF00A4"
		entrar = true
	}


	if (cuota === '' || cuota <= 0) {
		document.querySelector("#Icuota").style.color = "#FF00A4"
		entrar = true
	}

  if (moneda === "pesos"){
    if(limite <= 50000 || limite >=9000000){
      document.querySelector("#Ilimite").style.color = "#FF00A4"
      entrar =true
    } 
  } else if (moneda === "dolares"){
    if(limiteUSD <= 1000 || limiteUSD >=10000){
      document.querySelector("#Ilimite").style.color = "#FF00A4"
      entrar =true
    } 
  }


	if (entrar) {
		document.querySelector("#completarCampos").style.display = "block"
		completarCampos.innerHTML = "Tenés q completar todos los campos"

	} else {
		document.querySelector("#completarCampos").style.display = "none"
		document.querySelector("#Inombre").style.color = "#000000"
		document.querySelector("#Itaza").style.color = "#000000"
		document.querySelector("#Icuota").style.color = "#000000"
		document.querySelector("#Ilimite").style.color = "#000000"

    //alerta para confirmar

		Swal.fire({
			title: 'Revisá los datos',
			html: `<p style="font-size:14px">Nombre: <b>${nombre}</b> Taza: <b>${taza}%</b> Cuotas: <b>${cuota}</b> Límite ARS: <b>${limite}</b>  Límite USD: <b>${limiteUSD}</b> Tipo: <b>${tipodeprestamo}</b></p>`,
			icon: 'question',
			showCancelButton: true,
			confirmButtonColor: '#54728C',
			cancelButtonColor: '#8A548C',
			cancelButtonText: 'Corregir',
			confirmButtonText: 'Guardar'
		}).then((result) => {
			if (result.isConfirmed) {
				prestamos.push(new Prestamo(nombre, taza, cuota, limite, limiteUSD, tipodeprestamo, moneda))
				localStorage.setItem("prestamos", JSON.stringify(prestamos))
				calcular()
				form.reset()
				document.querySelector("#divSweet").style.display = "none"
				document.querySelector("#limite").style.display = "block"
				document.querySelector("#limiteUSD").style.display = "none"
				mostrarI()


				Swal.fire({
					title: '¡Listo!',
					html: `<p style="font-size:18px;">Los datos fueron cargados</p>`,
					icon: 'success'
				})
			}

		})

	}

})


//api para mostrar valor del dolar que aparece si cargo USD
setInterval(() => {
	fetch("https://criptoya.com/api/dolar")
		.then(response => response.json())
		.then(({
			oficial
		}) => {

			document.querySelector("#divSweet").innerHTML = `Estás cambiando la moneda, el valor oficial del dólar hoy es de: $${oficial}`

		})
		.catch(error => console.error(error))


}, 5000)

//funcion para mostrar un input diferente segun la moneda elegida
function cambiarInput() {
	let moneda = document.querySelector("#moneda")
	let eleccion = moneda.value

	if (eleccion == "dolares") {
		document.querySelector("#divSweet").style.display = "block"
		document.querySelector('input[name="limites"]').style.display = "none"
		document.querySelector('input[name="limitesUSD"]').style.display = "block"

	} else if (eleccion == "pesos") {
		document.querySelector("#divSweet").style.display = "none"
		document.querySelector('input[name="limitesUSD"]').style.display = "none"
		document.querySelector('input[name="limites"]').style.display = "block"

	}

}

//traigo datos para el historial desde un json
fetch('json/dataPrestamos.json')
	.then(response => response.json())
	.then(dataPrestamos => {

		dataPrestamos.forEach((dataPrestamos) => {
			let {id, nombre, taza, cuotas, limite, tipodeprestamo, moneda
      } = dataPrestamos
			prestamosActuales.innerHTML += ` <div class="card border-secondary mb-4" style="max-width: 18rem; margin: 10px;" id="#historial">
        <div class="card-header" style="max-width: 18rem; background-color:#95B7B7; color:white;">Prestamo<b> ${tipodeprestamo}</b><b style="color:#95B7B7";>${id}</b></div>
        <div class="card-body">
          <p class="card-text">Nombre:<b> ${nombre}</b></p>
          <p class="card-text">Taza: ${taza}%</p>
          <p class="card-text">Cuotas: ${cuotas}</p>
          <p class="card-text">Moneda: ${moneda}</p>
          <p class="card-text">Limite: <b>${limite}</b></p>             
  
        </div>  
        </div>
        `
		})
	})

document.querySelector("#capitalActualizado").innerHTML = `$${capitalActualizado}`
document.querySelector("#capitalActualizadoUSD").innerHTML = `$${capitalActualizadoUSD}`
//funcion para actualizar el capital a medida que cargo prestamos
function calcular() {
	let moneda = document.querySelector("#moneda").value
	let limite = document.querySelector("#limite").value
	let limiteUSD = document.querySelector("#limiteUSD").value
	capitalActualizado = capitalActualizado - limite
	capitalActualizadoUSD = capitalActualizadoUSD - limiteUSD


	if (moneda === "pesos") {
		document.querySelector("#capitalActualizado").innerHTML = `$${capitalActualizado} `
		console.log(capitalActualizado)
	} else if (moneda === "dolares") {
		document.querySelector("#capitalActualizadoUSD").innerHTML = `$${capitalActualizadoUSD} `
		console.log(capitalActualizadoUSD)
	}

}

//muestro mi localstorage
const mostrarI = () => {
	todosPrestamos.innerHTML = ''
	prestamos = JSON.parse(localStorage.getItem('prestamos'))
	if (prestamos === null) {
		prestamos = []
	} else {
		prestamos.reverse().forEach(prestamos => {
			todosPrestamos.innerHTML += `   
      <div class="card border-secondary mb-4" style="max-width: 18rem; margin: 10px;">
      <div class="card-header" style="background-color: white; color:#009AAF;">Prestamo<b> ${prestamos.tipodeprestamo}</b>
      <div class="iconoDelete">d</div>
      </div>
      <div class="card-body">
        <p class="card-text">Nombre:<b> ${prestamos.nombre}</b></p>
        <p class="card-text">Taza: ${prestamos.taza}%</p>
        <p class="card-text">Cuotas: ${prestamos.cuotas}</p>
        <p class="card-text">Moneda: ${prestamos.moneda}</p>
        <p class="card-text">Limite ARS: <b id="limiteSumar">${prestamos.limite}</b></p>
		<p class="card-text">Limite USD: <b id="limiteSumar">${prestamos.limiteUSD}</b></p>             

      </div>  
    
      </div>
      `
		});

	}
}


document.addEventListener("DOMContentLoaded", mostrarI)
//elimino prestamos de mi localstorage
todosPrestamos.addEventListener('click', (e) => {
	e.preventDefault()
	let ruta = e.path[2].childNodes[3].childNodes[1].childNodes[1].innerHTML
	if (e.target.innerHTML === "d") {
		Swal.fire({
			title: '¿Eliminar Prestamo?',
			icon: 'question',
			showCancelButton: true,
			confirmButtonColor: '#54728C',
			cancelButtonColor: '#8A548C',
			cancelButtonText: 'Cancelar',
			confirmButtonText: 'Eliminar'
		}).then((result) => {
			if (result.isConfirmed) {
				eliminarLS(ruta)
			


			}

		})

	}

})

const eliminarLS = (nombre) => {
	console.log(nombre)

	prestamos.forEach((elemento, index) => {
		if (elemento.nombre === nombre)
			indexPrestamos = index
		})

	prestamos.splice(prestamos, 1)
	localStorage.setItem("prestamos", JSON.stringify(prestamos))

	mostrarI()


}

//alerta para el boton borrar del formulario

infoBorrar.addEventListener('click', () => {
	Toastify({
		text: "Se borraron los datos",
		gravity: "top",
		position: "center",
		offset: {
			x: 50,
			y: 10
		},
		style: {
			background: "#C97171",
		},
	}).showToast();
})


