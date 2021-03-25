<script>

    import { onMount } from 'svelte';
    import API_KEY from './key';
    import {getModalData,superFetch,getMeridiano} from './functions';
    import Modal from './Modal.svelte';
    import Weather from './Weather.svelte';
    import Search from './Search.svelte';

    let datosWeather;
    let meridiano;
    let datosModal;
    let mostrar = false;
    let datos;

    /*function getIP(){
        //let ip = getIP();
        superFetch('https://api.ipgeolocation.io/getip').then(getCurrent);
    }*/

    function getCurrent(){
        superFetch(`https://api.ipgeolocation.io/astronomy?apiKey=${API_KEY}`).then(getDatos);
    }

    function getDatos(data){
        console.log("DAToS",data);
        datosWeather = data;

    }


    function handleData(event){
        datosWeather = event.detail;
    }

    $:if(datosWeather){
        meridiano = getMeridiano(datosWeather.date,datosWeather.current_time);
        datosModal = getModalData(meridiano,datosWeather);
    }

    onMount(getCurrent);

</script>

<Search on:searchMode={handleData}/>
<Weather datosWe = {datosWeather}/>

<div class="circle-button" on:click={()=>{mostrar=!mostrar}}> + </div>
<Modal datosMod={datosModal} {mostrar} on:closeModal={()=>{mostrar=false}}/>

