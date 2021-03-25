<script>

    import API_KEY from './key';
    import {getModalData,superFetch,getMeridiano} from './functions';
    import { onMount, createEventDispatcher } from 'svelte';

    let texto='';

    let dispatch = createEventDispatcher();

    function getCurrent(tipo){
        console.log("GCSearch",`https://api.ipgeolocation.io/astronomy?apiKey=${API_KEY}&${tipo}=${texto}`);
        superFetch(`https://api.ipgeolocation.io/astronomy?apiKey=${API_KEY}&location=${texto}`).then(getDatos);
    }

    function getDatos(data){
        console.log("DAToS",data);
        dispatch('searchMode',data);
    }

</script>

<div class="search">
    <div class="ingreso">
        <input type="Text" bind:value={texto}>
    </div>

<button on:click={()=>{getCurrent("country")}} class="btn-search btnpais">País</button>
<button on:click={()=>{getCurrent("city")}} class="btn-search btncity">Ciudad</button>

</div>
