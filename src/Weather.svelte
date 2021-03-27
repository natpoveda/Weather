<script>
    import {
        getMeridiano,
        getHora,
        getFecha,
        getEvento,
        generateLocate,
    } from './functions';

    export let datosWe;
    let meridiano;
    let hora;
    let fecha;
    let locate;
    let evento;
    let horaEvento;

    console.log('DATOS WE', datosWe);

    $: if (datosWe && datosWe.date) {
        meridiano = getMeridiano(datosWe.date, datosWe.current_time);
        console.log('MERIDIANO -->', meridiano);
        hora = getHora(datosWe.date, datosWe.current_time, datosWe.on);
        fecha = getFecha(datosWe.date, datosWe.current_time)
            .reverse()
            .join(' - ');
        locate = generateLocate(datosWe);
        evento = getEvento(meridiano, datosWe);
        horaEvento = getHora(datosWe.date, evento.hora, datosWe.on);
    }
</script>

{#if datosWe}
    <div class="card view{meridiano}">
        <img src="images/icon{meridiano}.png" alt={meridiano} />
        <div class="info-hora">
            <h2>{hora}</h2>
        </div>
        <div class="info-zona">
            <div class="info-fecha{meridiano}">{fecha}</div>
            <div class="info-location">{locate}</div>
        </div>
        <div class="info-evento info{meridiano}">
            <span>{evento.texto}</span>
            {horaEvento}
        </div>
    </div>
{/if}

<style>
    .card {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .card img {
        width: 50%;
        height: 50%;
        margin-top: 20px;
    }

    .info-hora {
        font-size: 50px;
        height: 180px;
    }

    .info-zona {
        color: #afafaf;
        font-size: 20px;
        text-align: center;
    }
    .info-fechaPM {
        border-bottom: #afafaf solid 1px;
        width: 100%;
    }

    .info-fechaAM {
        border-bottom: #585858 solid 1px;
        width: 100%;
    }
    .info-evento {
        font-size: 30px;
    }
    .infoPM  span {
        color: #afafaf;
        font-weight: bold;
    }

    .infoAM span {
        color: #585858;
        font-weight: bold;
    }
</style>
