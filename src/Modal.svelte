<script>
    import { getObjectTextoModal } from './functions';
    import { onMount, createEventDispatcher } from 'svelte';

    export let datosMod;
    export let mostrar;

    let dispatch = createEventDispatcher();

    $: textos = getObjectTextoModal(datosMod && datosMod.meridiano);

    //    onMount(generateModal);
</script>

<div class="modal-back {mostrar ? 'vshow' : 'vhide'}" id="vModal">
    <div class="modal-content">
        <div
            class="modal-close"
            id="mclose"
            on:click={() => {
                dispatch('closeModal');
            }}
        >
            X
        </div>

        {#if datosMod}
            {textos.hora}: {datosMod.hora}
            {textos.evento}: {datosMod.evento}
            {textos.puesta_astro}: {datosMod.puesta_astro}
            {textos.med_astro}: {datosMod.med_astro}
            {textos.sal_astro}: {datosMod.sal_astro}
        {/if}
    </div>
</div>

<style>
    .modal-content {
        width: 700px;
        height: 500px;
        border-style: solid;
        border-color: cyan;
        z-index: 1;
        background-color: white;
    }
    .vhide {
        display: none;
    }
    .vshow {
        display: show;
    }
    .modal-back {
        width: 100%;
        height: 100%;
        background-color: grey;
        position: fixed;
        left: 0;
        top: 0;
        overflow: auto;
    }
</style>
