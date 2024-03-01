 
let datos;
let tabla = [];
let pokemons= [];
let pokemonss= [];
let municipios= [];
let meteoritoss= [];
let peliculas= [];
let tipos = [];
let numPokePorTipo = [];
let isAscendingID = false;
let isAscendingName = false;
let isAscendingWeight = false;


// Obtener el contenedor donde se agregará la tabla

/*
-------------------------------------------------------------------------------------------
    								TABLA POR CONSOLA
-------------------------------------------------------------------------------------------  
*/

// POKEMONS
fetch("js/data/pokemon.json")
.then((response) => response.json())
.then((data_poke) => {
	pokemons = data_poke.pokemon;		
	// MUNICIPIS
	fetch("js/data/municipis.json")
	.then((response) => response.json())
	.then((data_muni) => {
		municipios = data_muni.elements;		
		// METEORITS
		fetch("js/data/earthMeteorites.json")
		.then((response) => response.json())
		.then((data_mete) => {
			meteoritoss = data_mete;		
			// MOVIES
			fetch("js/data/movies.json")
			.then((response) => response.json())
			.then((data_movie) => {
				peliculas = data_movie.movies;		
				let longitudeds = [pokemons.length, municipios.length, meteoritoss.length, peliculas.length];
				longitudeds.sort((a,b)=>a-b);
				//console.log(longitudeds);
				let valorGrande= longitudeds.pop();
				//console.log(valorGrande);
				for (let i = 0; i < valorGrande; i++) {
					let poke = (i<pokemons.length?pokemons[i].name:"-");
					let muni = (i<municipios.length?municipios[i].municipi_nom:"-");
					let mete = (i<meteoritoss.length?meteoritoss[i].name:"-");
					let peli = (i<peliculas.length?peliculas[i].title:"-");
					let fila = {"pokemon": poke,"municipios": muni,"meteoritos": mete,"peliculas": peli}
					tabla.push(fila);
				}
				console.log(tabla);
				console.table(tabla);

				
			});
		});
	});
});


console.log(tabla);
//console.table(tabla);
/*
-------------------------------------------------------------------------------------------
    					TABLA FISICA CON BOTONES CON ACCIONES
-------------------------------------------------------------------------------------------
*/
function createPokemonTable(pokemonss) {
	// Crear la tabla
	console.log(pokemonss)
	// Cogemos las filas y las columnas
	row = pokemonss.length;
	col = pokemonss[0].length;
	let tabla = `<table>`;
	tabla += `<tr> <td><h3 onclick="orderListId()">Id</h3></td> <td><h3>Pokemon</h3></td> <td><h3 onclick="orderListName()">Name</h3></td> <td><h3 onclick="orderList(orderListPeso())">Peso</h3></td> </tr>`
	for (let i = 0; i < row; i++) {
		tabla += `<tr>`;
		for (let j = 0; j < col; j++) {
			tabla += `<td>`;
			if (pokemonss[i][j].startsWith("http")) {
				tabla += `<img src="${pokemonss[i][j]}"> `;
			} else{
				tabla += `${pokemonss[i][j]} `;
			}
			tabla += `</td>`;
		}
		tabla += `</tr> \n`;

	}
	tabla += `</table>`;
	// console.log(tabla)
	return tabla;
}

function orderList(valor) {
	let tableContainer = document.getElementById("resultat");
	if (valor === "asc") {
		pokemonss.sort((a, b) => {return a[0] - b[0]});
		tableContainer.innerHTML = createPokemonTable(pokemonss);
	  } else if (valor === "desc") {
		pokemonss.sort((a, b) => {return b[0] - a[0]});
		tableContainer.innerHTML = createPokemonTable(pokemonss);
	  }
}

function orderListId() {
	let tableContainer = document.getElementById("resultat");
	if (isAscendingID) {
		pokemonss.sort((a, b) => {return a[0] - b[0]});
		tableContainer.innerHTML = createPokemonTable(pokemonss);
	} else {
		pokemonss.sort((a, b) => {return b[0] - a[0]});
		tableContainer.innerHTML = createPokemonTable(pokemonss);
    }
	// Cambia el estado para la próxima vez
	isAscendingID = !isAscendingID
	console.log("ID");
}

function orderListName() {
	let tableContainer = document.getElementById("resultat");

    if (isAscendingName) {
        pokemonss.sort((a, b) => a[2].localeCompare(b[2]));
		tableContainer.innerHTML = createPokemonTable(pokemonss);
    } else {
        pokemonss.sort((a, b) => b[2].localeCompare(a[2]));
		tableContainer.innerHTML = createPokemonTable(pokemonss);
    }

    // Cambia el estado para la próxima vez
    isAscendingName = !isAscendingName;
	console.log("NAME")
}
function orderListPeso() {
	let tableContainer = document.getElementById("resultat");

	if (isAscendingWeight) {
		pokemonss.sort((a, b) => {return a[3] - b[3]});
		tableContainer.innerHTML = createPokemonTable(pokemonss);
	} else {
		pokemonss.sort((a, b) => {return b[3] - a[3]});
		tableContainer.innerHTML = createPokemonTable(pokemonss);
    }
	// Cambia el estado para la próxima vez
	isAscendingWeight = !isAscendingWeight
	console.log("PESO");
}

// filtrar en la array, esperar a que se acorte y cuando se acorte por el filtro ejecutar crearTabla(nueva array corta) y crea la tablaw
function searchList(){
	let tableContainer = document.getElementById("resultat");

	let cosaBuscar = document.getElementById("campoTexto");

	// Agrega un 'event listener' para el evento 'input'
	cosaBuscar.addEventListener('input', function(event) {
		// Imprime el valor actual del input en la consola
		let valorTiempoReal = event.target.value;
		let pokemons2 = pokemonss.filter(poke => 
			poke[2].toLowerCase().includes(valorTiempoReal.toLowerCase())
		);
		
		console.log(valorTiempoReal.toLowerCase());
		tableContainer.innerHTML = createPokemonTable(pokemons2);
		//console.log(valorTiempoReal);
	});
}

function calcMitjana(){
	let sumaPesos= 0;
	for (let i = 0; i < pokemonss.length; i++) {
		let numeros = parseFloat(pokemonss[i][3]);
		sumaPesos += numeros;
	}
	alert("Esta es la media de todos los pesos "+(sumaPesos/pokemonss.length).toFixed(2));
}

fetch("js/data/pokemon.json")
.then((response) => response.json())
.then((data_poke) => {
	datos = data_poke.pokemon;

	for (let i = 0; i < datos.length; i++) {
		let fila = [];
		fila.push(datos[i].num);
		fila.push(datos[i].img);
		fila.push(datos[i].name);
		let weightSinKg = datos[i].weight.split(" ")
		fila.push(weightSinKg[0]);
		pokemonss.push(fila);
	}
	// console.log(pokemons)
	let tableContainer = document.getElementById("resultat");
	tableContainer.innerHTML = createPokemonTable(pokemonss);
	searchList();
	});

/*
-------------------------------------------------------------------------------------------
    								GRAFICA DE POKEMONS
-------------------------------------------------------------------------------------------
*/
//import Chart from 'https://cdn.jsdelivr.net/npm/chart.js';

function colorAlearorio(longitud) {
	let colorsBordes = [];
    let colorsFondos = [];

    for (let i = 0; i < longitud; i++) {
        // Generar números aleatoris per a cada component del color RGB
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);

        // Crear el color per al border (sense opacitat)
        let colorBorde = `rgba(${r},${g},${b})`;
        colorsBordes.push(colorBorde);

        // Crear el color per al background (amb opacitat)
        let colorFondo = `rgba(${r},${g},${b},0.5)`; // Opacitat del 50%
        colorsFondos.push(colorFondo);
    }
    return { colorsBordes, colorsFondos };
}

let { colorsBordes, colorsFondos } = colorAlearorio(tipos.length);

const data = {
	labels: [
		tipos
	],
	datasets: [{
	label: 'Grafico de Tipos Pokemons',
	data: [11, 16, 7, 3, 14],
	backgroundColor: [
		colorsFondos,
	],
	borderColor: [
		colorsBordes,
	]
	}]
};

/*
const data = {
	labels: [
	  'Red',
	  'Green',
	  'Yellow',
	  'Grey',
	  'Blue'
	],
	datasets: [{
	  label: 'My First Dataset',
	  data: [11, 16, 7, 3, 14],
	  backgroundColor: [
		'rgb(255, 99, 132)',
		'rgb(75, 192, 192)',
		'rgb(255, 205, 86)',
		'rgb(201, 203, 207)',
		'rgb(54, 162, 235)'
	  ]
	}]
  };
*/
const config = {
	type: 'polarArea',
	data: data,
	options: {}
};

const myChart = new Chart(
	document.getElementById('myChart'),
	config
);

fetch("js/data/pokemon.json")
.then((response) => response.json())
.then((data_poke) => {
	datos = data_poke.pokemon;	
	let contador = 0;
	for (let i = 0; i < datos.length; i++) {
		for (let j = 0; j < datos[i].type.length; j++) {
			if (!tipos.includes(datos[i].type[j])) {
				//console.log(datos[i].type[j]);
				tipos.push(datos[i].type[j]);
				contador += 1;
				numPokePorTipo.push(0);
			} else {
				
			}
		}
	}
	console.log(tipos);
	console.log(numPokePorTipo);
	});


