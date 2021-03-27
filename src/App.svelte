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
    let on = false;
    let value = '';
    let tipo = 'inicial';
    let valores;
    let texto;

    function getCurrent() {
        value = localStorage.getItem('valueText');
        valores = JSON.parse(value);
        texto = valores.texto;
        console.log('VAL ', valores);
        if (value != null && value != '') {
            tipo = valores.tipo;
            superFetch(
                `https://api.ipgeolocation.io/astronomy?apiKey=${API_KEY}&location=${texto}`
            ).then(getDatos);
        } else {
            superFetch(
                `https://api.ipgeolocation.io/astronomy?apiKey=${API_KEY}`
            ).then(getDatos);
        }
    }

    function getDatos(data) {
        datosWeather = { ...data, tipo, on, texto };
    }

    function handleData(event) {
        datosWeather = { ...event.detail, on };
    }

    $: if (datosWeather) {
        meridiano = getMeridiano(datosWeather.date, datosWeather.current_time);
        datosModal = getModalData(meridiano, datosWeather);
    }

    onMount(getCurrent);
</script>

<div class="main mview{meridiano}">
    <Search on:searchMode={handleData} {valores} />
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

    <div class="toggle-switch">
        <p>24 hrs</p>
        <label class="switch">
            <input
                class="toggle-input"
                type="checkbox"
                bind:checked={on}
                on:change={() => {
                    datosWeather = { ...datosWeather, on };
                }}
            />
            <span class="slider round" />
        </label>
        <p>12 hrs</p>
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
    .main {
        height: 100%;
        display: flex;
        justify-content: space-around;
        font-family: Arial, Helvetica, sans-serif;
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
        display: flex;
        margin: 20px;
        font-size: 20px;
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

    .circle-button img {
        height: 60px;
    }

    .switch {
        position: relative;
        display: inline-block;
        width: 60px;
        height: 34px;
    }

    .switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        -webkit-transition: 0.4s;
        transition: 0.4s;
    }

    .slider:before {
        position: absolute;
        content: '';
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        -webkit-transition: 0.4s;
        transition: 0.4s;
    }

    input:checked + .slider {
        background-color: #2196f3;
    }

    input:focus + .slider {
        box-shadow: 0 0 1px #2196f3;
    }

    input:checked + .slider:before {
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
    }

    /* Rounded sliders */
    .slider.round {
        border-radius: 34px;
    }

    .slider.round:before {
        border-radius: 50%;
    }
</style>
