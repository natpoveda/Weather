<script>
    import { onMount } from 'svelte';
    import API_KEY from './key';
    import {
        getMeridiano,
        getHora,
        getFecha,
        getEvento,
        superFetch,
    } from './functions';

    export let datosWe;
    let meridiano;
    let hora;
    let fecha;
    let locate;
    let evento;

    console.log('DATOS WE', datosWe);

    $: if (datosWe && datosWe.date) {
        meridiano = getMeridiano(datosWe.date, datosWe.current_time);
        hora = getHora(datosWe.date, datosWe.current_time);
        fecha = getFecha(datosWe.date, datosWe.current_time)
            .reverse()
            .join(' - ');
        locate = datosWe.location.city + ', ' + datosWe.location.country_name;
        evento = getEvento(meridiano, datosWe);

    }
</script>

{#if datosWe}
    <div class="card view{meridiano}">
        <img src="images/icon{meridiano}.png" alt={meridiano} />
        <div class="info-hora">
            <h2>{hora}</h2>
        </div>
        <div class="info-zona">
            <div class="info-fecha">{fecha}</div>
            <div class="info-location">{locate}</div>
        </div>
        <div class="info-evento">
            <span>{evento.texto}</span> {evento.hora};
        </div>
    </div>
{/if}
