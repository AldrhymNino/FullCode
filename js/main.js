(function() {

	// Variables
	var btn = document.querySelector('#btn-coment'),
		inputComent = document.querySelector('#inputComent'),
		divComentarios = document.querySelector('#div-comentarios'),
		btnCerrar = document.querySelector('#btn-cerrar'),
		enlace = document.querySelector('#btn-r'),
		i;
	
	
	// Funciones
	/* Funcion De Error de input */
	var error = function(name, placeholder){
		name.style="border-color:red;color:red;"; d
		name.placeholder=placeholder;
		name.addEventListener('click', () => {
			name.style="border-color:#0074D9;color:inherit;";
			name.placeholder="Escribir Comentario";
		});
	};

	// Obtener contador del localStorage
	var getCounter = function() {
		if (localStorage.getItem('numeroComent') == null) {
			i = 0;
			localStorage.setItem('numeroComent', i);
			var obtenerDato = localStorage.getItem('numeroComent');
			document.querySelector('#countComent').innerHTML = ' (' + obtenerDato + ')';
		}else {
			i = localStorage.getItem('numeroComent');
			document.querySelector('#countComent').innerHTML = ' (' + i + ')';
		}
		return i;
	};

	// Contador de Comentarios
	var Contador = function() {
		if (inputComent.value != '') {
			i++;
			localStorage.setItem('numeroComent', i);
			document.querySelector('#countComent').innerHTML = ' (' + localStorage.getItem('numeroComent') + ')';
		}
	};

	var create = function() {
		/* Creando Elementos*/
		var ElementoPadre = document.createElement('div'),
		ElementoHijo = document.createElement('div'),
		ElementText = document.createTextNode(inputComent.value);

		/* Aplicando Atributos A Los Elementos */
		ElementoPadre.setAttribute('class', 'comentarios');
		ElementoHijo.setAttribute('class', 'comentarios__hijo');

		/* Introduciendo Texto Y Elementos A su Elemento Padre */
		ElementoHijo.appendChild(ElementText);
		ElementoPadre.innerHTML = '<img src="img/perfil.jpg">'
		ElementoPadre.appendChild(ElementoHijo);

		return ElementoPadre;
	};

/* Funcion De Agregar Comentario */
var Agregar = function() {
	/* EvaluandoComentario */
	if (inputComent.value === '') {
		// statement
		error(inputComent, 'Comentarios Vacio');
		return;
	}

	/* EvaluandoComentario */
	if (!divComentarios.hasChildNodes()) {
		/* Introduciendo Padre A divComentarios */
		divComentarios.appendChild(create());
		localStorage.setItem('comentarios', divComentarios.innerHTML);
	}else if (divComentarios.hasChildNodes()) {
		/* Introduciendo Padre A divComentarios */
		divComentarios.insertBefore(create(), divComentarios.firstElementChild);
	}

	// Guardando Contenido
	localStorage.setItem('comentarios', divComentarios.innerHTML);
};

divComentarios.innerHTML = localStorage.getItem('comentarios');

/* Jquery */
$(document).ready(function(){
/* Funcion de botón categorias */
	$('.btn-categoria').on('click', function(){
		if ($(this).hasClass('active')) {
			$('.submenu').fadeOut(300);
			$(this).removeClass('active');
		}else {
			$('.submenu').fadeIn(300);
			$(this).addClass('active');
		}
	});
});

// botón menu del header
var boton = document.querySelector('#btn-menu'),
	menu = document.querySelector('#header__menu');

var Deslizar = function() {
	if (menu.classList.contains('deslisado')) {
		menu.style = 'left:-250px;';
		menu.classList.remove('deslisado');
	}else {
		menu.style = 'left:0;';
		menu.classList.add('deslisado');
	}
};

// Evento De Deslizar 
boton.addEventListener('click', Deslizar);

/* Anuncio Al Cargar La Pagina */
	/* Funcion Ventana Modal Login */
	var enable = function(e){
		e.preventDefault();
		$('.divForm').addClass('active');
	};

	var disable = function(e){
		e.preventDefault();
		$('.divForm').removeClass('active');
	};

	/* Funcion De Evaluar Login Modal */
	var formulario = document.querySelector('#login'),
	correo = document.querySelector('#correo'),
	contraseña = document.querySelector('#contraseña'),
	error = function(element, text){
		element.style.borderColor = 'red';
		element.style.color = 'red';
		element.placeholder = 'Vacio';
		element.addEventListener('click', function(){
			element.style.borderColor = 'lightgray';
			element.style.color = 'inherit';
			element.placeholder = text;
		});
	};

	// Events
	formulario.addEventListener('submit', function(e){
		if (correo.value === '' || contraseña.value === '') {
			e.preventDefault();
			error(correo, 'Correo');
			error(contraseña, 'Contraseña');
		}
	});

	btn.addEventListener('click', function() {
		Contador();
		Agregar();
	});

	enlace.addEventListener('click', enable);
	btnCerrar.addEventListener('click', disable);

	document.addEventListener('DOMContentLoaded', function() {
		var SHigth =  scrollY / ((document.documentElement.scrollHeight - document.documentElement.clientHeight) / 100);
		document.documentElement.style.setProperty('--bar', Math.round(SHigth));
		getCounter();

		// Funcion de posicion de scroll al hacer scroll en pagina
		window.addEventListener('scroll', function() {
			var SHigth =  scrollY / ((document.documentElement.scrollHeight - document.documentElement.clientHeight) / 100);
			document.documentElement.style.setProperty('--bar', Math.round(SHigth));
		});
	});
}());