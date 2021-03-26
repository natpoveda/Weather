<script>
    import { onMount } from 'svelte';
    import API_KEY from './key';
    import { getModalData, superFetch, getMeridiano } from './functions';
    import Modal from './Modal.svelte';
    import Weather from './Weather.svelte';
    import Search from './Search.svelte';

    let datosWeather;
    let meridiano;
    let datosModal;
    let mostrar = false;
    let on = true;
    let clase = 'toggle-btn toggle-btn-on';

    /*function getIP(){
        //let ip = getIP();
        superFetch('https://api.ipgeolocation.io/getip').then(getCurrent);
    }*/

    function getCurrent() {
        superFetch(
            `https://api.ipgeolocation.io/astronomy?apiKey=${API_KEY}`
        ).then(getDatos);
    }

    function getDatos(data) {
        datosWeather = { ...data, tipo: 'inicial', on };
        console.log('DAToS', datosWeather);
    }

    function handleData(event) {
        datosWeather = { ...event.detail, on };
        console.log('DW', datosWeather);
    }

    function handleChange() {
        on = !on;
        console.log('cHoursSecond', on);
        datosWeather = { ...datosWeather, on };
    }

    $: if (datosWeather) {
        meridiano = getMeridiano(datosWeather.date, datosWeather.current_time);
        datosModal = getModalData(meridiano, datosWeather);
        console.log('datModal', datosModal);
    }

    $: clase = on ? 'toggle-btn toggle-btn-on' : 'toggle-btn toggle-btn-off';

    onMount(getCurrent);
</script>

<div class="main mview{meridiano}">
    <Search on:searchMode={handleData} />
    <div class="card-weather">
        <Weather datosWe={datosWeather} />

        <div
            class="circle-button"
            on:click={() => {
                mostrar = !mostrar;
            }}
        >
            <img src="images/mas{meridiano}.svg" alt={meridiano} />
        </div>
    </div>
    <div class="toggle-switch" tabindex="0">
        <input
            class="toggle-input"
            type="checkbox"
            checked={on}
            on:change={handleChange}
        />
        <span class={clase} />
    </div>
    <Modal
        datosMod={datosModal}
        {mostrar}
        on:closeModal={() => {
            mostrar = false;
        }}
    />
</div>

<style>
    body {
        font-family: HelveticaNeue;
    }

    .main {
        height: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    .mviewAM {
        background-color: #fff;
        color: #aaa;
    }

    .mviewPM {
        background-color: rgb(70, 69, 69);
        color: #fff;
    }
    .card-weather {
        width: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .toggle-switch {
        width: 20%;
    }

    .mviewPM .info-evento span {
        color: #afafaf;
        font-weight: bold;
    }

    .mviewAM .info-evento span {
        color: #585858;
        font-weight: bold;
    }

    .circle-button {
       margin-top: 10px;
    }

    .circle-button img{
       height: 60px;
    }
    /*
        span {
  box-sizing: initial;
  display: inline-block;
  outline: 0;
  width: 8em;
  height: 4em;
  position: relative;
  cursor: pointer;
  user-select: none;
  background: #fbfbfb;
  border-radius: 4em;
  padding: 4px;
  transition: all 0.4s ease;
  border: 2px solid #e8eae9;
}
.toggle-input:focus + .toggle-btn::after,
.toggle-btn:active::after {
  box-sizing: initial;
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1), 0 4px 0 rgba(0, 0, 0, 0.08),
    inset 0px 0px 0px 3px #9c9c9c;
}
.toggle-btn::after {
  left: 0;
  position: relative;
  display: block;
  content: "";
  width: 50%;
  height: 100%;
  border-radius: 4em;
  background: #fbfbfb;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275),
    padding 0.3s ease, margin 0.3s ease;
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1), 0 4px 0 rgba(0, 0, 0, 0.08);
}
.toggle-btn.toggle-btn-on::after {
  left: 50%;
}
.toggle-btn.toggle-btn-on {
  background: #86d993;
}
.toggle-btn.toggle-btn-on:active {
  box-shadow: none;
}
.toggle-btn.toggle-btn-on:active::after {
  margin-left: -1.6em;
}
.toggle-btn:active::after {
  padding-right: 1.6em;
}
.toggle-input {

  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
  white-space: nowrap;
}*/
</style>
