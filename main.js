// Función para mostrar la imagen de carga y ocultarla cuando los datos estén listos
function mostrarCarga() {
  document.getElementById('loading').style.display = 'block';
  document.getElementById('dollar').textContent = '';
  document.getElementById('euro').textContent = '';
  document.getElementById('peso').textContent = '';
  document.getElementById('bitcoin').textContent = '';
}

// Función para cargar los valores del título y el logo
function cargarTituloYLogo() {
  document.getElementById('titulo').textContent = 'Cotizaciones en Línea';
}

// Función para cargar las cotizaciones del USD
async function cargarCotizacionUSD() {
  try {
      const response = await fetch('https://open.er-api.com/v6/latest/USD');
      const data = await response.json();

      // Acceder a los datos de cotización en el JSON
      const euroRate = data.rates.EUR;
      const pesoRate = data.rates.ARS;

      // Actualizar las etiquetas <div> con las cotizaciones
      document.getElementById('dollar').textContent = `Dólar: 1`;
      document.getElementById('euro').textContent = `Euro: ${euroRate}`;
      document.getElementById('peso').textContent = `Peso Argentino: ${pesoRate}`;
  } catch (error) {
      console.error('Error al cargar datos de USD:', error);
  }
}

// Función para cargar la cotización del Bitcoin
async function cargarCotizacionBitcoin() {
  try {
      const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
      const data = await response.json();

      const bitcoinRate = data.bpi.USD.rate;

      // Actualizar la etiqueta <div> con la cotización del Bitcoin
      document.getElementById('bitcoin').textContent = `Bitcoin: ${bitcoinRate}`;
  } catch (error) {
      console.error('Error al cargar datos de Bitcoin:', error);
  } finally {
      // Ocultar la imagen de carga una vez que los datos estén listos
      document.getElementById('loading').style.display = 'none';
  }
}

// Función para cargar todas las cotizaciones
async function cargarCotizaciones() {
  mostrarCarga();
  cargarCotizacionUSD();
  cargarCotizacionBitcoin();
}

// Función para iniciar el sitio
async function iniciarSitio() {
  cargarTituloYLogo();
  cargarCotizaciones();
}

// Llama a iniciarSitio cuando se carga la página
window.onload = iniciarSitio;