<script>
    import API_KEY from './key';
    import { superFetch } from './functions';
    import { createEventDispatcher } from 'svelte';

    let texto = '';
    let tipo = '';
    let dispatch = createEventDispatcher();
    export let valores;

    function getCurrent(place) {
        tipo = place;
        superFetch(
            `https://api.ipgeolocation.io/astronomy?apiKey=${API_KEY}&location=${texto}`
        ).then(getDatos);
    }

    function getDatos(data) {
        localStorage.setItem('valueText',JSON.stringify({texto,tipo}));
        dispatch('searchMode', { ...data, tipo, texto });
    }
</script>

<div class="search">

    <div class="ingreso">
        <input
            type="Text"
            bind:value={texto}
            class="iText"
            placeholder="Search"
        />
    </div>
    {#if valores}
        <div class="cvalores">
            <p>Anteriormente buscaste el texto {valores.texto}</p>
        </div>
    {/if}

    <button
        on:click={() => {
            getCurrent('country');
        }}
        class="btn-search">
        <img src="images/iconPais.svg" alt="Country Button"/>
        País</button
    >
    <button
        on:click={() => {
            getCurrent('city');
        }}
        class="btn-search">
        <img src="images/iconCiudad.svg" alt="City Button"/>
        Ciudad</button
    >
</div>

<style>
    .search {
        width: 30%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        margin: 20px;
    }
    .ingreso input {
        width: 100%;
        height: 73px;
        margin: 27.5px 354px 54px 0;
        padding: 17px 22px 17px 56px;
        border-radius: 37px;
        box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
        border: solid 1px #707070;
        background-color: #ffffff;
    }
    .btn-search {
        width: 100%;
        border-radius: 37px;
        box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
        border: solid 1px #707070;
        background-color: #afafaf;
        display:flex;
        flex-direction: column;
        align-items: center;
        color: white;
        font-size: 25px;

    }



</style>
