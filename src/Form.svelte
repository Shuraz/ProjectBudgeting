<script>
    import projectStore from "./project-store"
    export let id;
    export let name="";
    export let price=5;
    $:mode = id?"Edit":"Add"
    $:canSubmit= price>0 && name!=="";
    console.log(Boolean(canSubmit))
    const handleSubmit=()=>{
        if(!canSubmit){
            return ;
        }
        if(mode==='Add'){
            projectStore.add(name,price)
        }
        if(mode==='Edit'){
           projectStore.edit(id,name,price)
        }
        price="";
        name="";
        id=undefined;
    }
    const handleCancel=()=>{
        price="";
        name="";
        id=undefined;
    }
</script>
<style>
    button{
        margin-left: 20px;
    }
    button:disabled{
        cursor: not-allowed;
    }
</style>
<form on:submit|preventDefault={handleSubmit}>
  <fieldset>
    <label for="nameField">Materials</label>
    <input bind:value={name} type="text" placeholder="Wood, Glue, etc." id="nameField" />
    <label for="nameField">Price</label>
    <input
    bind:value={price}
      min="0"
      step="any"
      type="number"
      placeholder="Price"
      id="priceField"
    />
  </fieldset>

  <button disabled={!canSubmit} class="float-right" type="submit">{mode}</button>
 
  {#if mode==="Edit" }
  <button on:click={handleCancel} class="float-right" type="button">Cancel</button>  
  {/if}
</form>
