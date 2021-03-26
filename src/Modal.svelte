<script>
    import { getObjectTextoModal, getHora } from './functions';
    import { createEventDispatcher } from 'svelte';

    export let datosMod;
    export let mostrar;
    let meridiano = '';

    let dispatch = createEventDispatcher();

    $: textos = getObjectTextoModal(datosMod && datosMod.meridiano);

    $: if (datosMod && datosMod.meridiano) {
        meridiano = datosMod.meridiano;
    }
    //    onMount(generateModal);
</script>

<div class="modal-back {mostrar ? 'vshow' : 'vhide'}" id="vModal">
    <div class="modal-content">
        <div class="icon-modal">
            <img src="images/modalico{meridiano}.svg" alt={meridiano} />
        </div>
        {#if datosMod}
            <div class="group-texto">
                <div class="texto-mod">
                    <span>{textos.hora}</span>: {datosMod.hora}
                </div>
                <div class="texto-mod">
                    <span>{textos.evento}</span>: {datosMod.evento}
                </div>
                <div class="texto-mod">
                    <span>{textos.puesta_astro}</span>: {datosMod.puesta_astro}
                </div>
                <div class="texto-mod">
                    <span>{textos.med_astro}</span>: {datosMod.med_astro}
                </div>
                <div class="texto-mod">
                    <span>{textos.sal_astro}</span>: {datosMod.sal_astro}
                </div>
            </div>
        {/if}
        <div
            class="modal-close"
            id="mclose"
            on:click={() => {
                dispatch('closeModal');
            }}
        >
            X
        </div>
    </div>
</div>

<style>

.modal-back {
        width: 100%;
        height: 100%;
        background-color: #363636;
        position: fixed;
        left: 0;
        top: 0;
        overflow: auto;
    }
    .modal-content {
        width: 50%;
        height: 620px;
        border-style: solid;
        border-color: cyan;
        z-index: 1;
        margin: 0 auto;
        padding: 6px 6.8px 0 0;
        border-radius: 35px;
        box-shadow: 8px 8px 15px 0 rgba(209, 209, 209, 0.29);
        background-color: #ffffff;
        color: #626262;
        font-size: 25px;
        display: flex;
        justify-content: space-between;
    }

    .icon-modal {
        width: 30%;
        height: 598px;
        margin: 3px 30px 0 0;
        object-fit: contain;
    }

    .group-texto{
        width: 60%;
        align-self: center;
        margin-left: 30px;
    }

    .modal-close{
        width: 10%;
        align-self:flex-start;
        text-align: center;
    }
    .modal-content span {
        font-weight: 500;
        font-stretch: normal;
        font-style: normal;
        line-height: 2.86;
        letter-spacing: normal;
        text-align: right;
        color: #626262;
    }
    .vhide {
        display: none;
    }
    .vshow {
        display: show;
    }

</style>
