
let plote = (data) => {
    const ctx = document.getElementById('myChart');
    const dataset = {
      labels: data.hourly.time, //ETIQUETA DE DATOS 
      datasets: [{
        label: 'Temperatura semanal', // ETIQUETA DEL GRÁFICO 
        data: data.hourly.temperature_2m, // ARREGLO DE DATOS 
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    };
    const config = {
      type: 'line',
      data: dataset,
    };
    const chart = new Chart(ctx, config);
};
let loadData = (data) => {
    let timezone = data['timezone'];
    let timezoneHTML = document.getElementById("timezone");
    timezoneHTML.textContent = timezone;
    plote(data);
    console.log(data);
};
  
let cargarInocar = () => {
    let URL_proxy = ' https://cors-anywhere.herokuapp.com/'; // Coloque el URL de acuerdo con la opción de proxy
    let URL = URL_proxy + 'https://www.inocar.mil.ec/mareas/consultan.php';
  
    fetch(URL)
      .then(response => response.text())
      .then(data => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(data, "text/html");
        let contenedorMareas = xml.getElementsByClassName('container-fluid')[0];
        let contenedorHTML = document.getElementById('table-container');
        contenedorHTML.innerHTML = contenedorMareas.innerHTML;
        console.log(xml);
      })
      .catch(console.error);
  };
  
  (
    function () {
      let meteo = localStorage.getItem('meteo');
      if (meteo == null) {
        let URL = 'https://api.open-meteo.com/v1/forecast?latitude=-2.20&longitude=-79.89&hourly=temperature_2m&daily=uv_index_max&timezone=auto';
        fetch(URL)
          .then(response => response.json())
          .then(data => {
            loadData(data);
            /*Guardar datos e memoria */
            localStorage.setItem("meteo", JSON.stringify(data));
          })
          .catch(console.error);
      } else {
        /* CARGAR DATA EN MEMORIA */
        loadData(JSON.parse(meteo));
      }
        cargarInocar();
    }
  )();