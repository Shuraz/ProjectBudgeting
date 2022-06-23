<script>
    import {createEventDispatcher} from "svelte"
    import projectStore from "./project-store"
    const dispatch = createEventDispatcher();
    let materials=[];
    $: total= materials.reduce((prev,next)=>{
        prev +=next.price;
        return prev
    },0)

    projectStore.subscribe((items)=>{
        materials=items;
    })
//    $: console.log(materials);
const formatter=new Intl.NumberFormat('en-AU',{style:'currency',currency:'AUD'})
const editHandle=(id,name,price)=>{
    console.log(id,name,price)
    dispatch('edit',{id,name,price})

}
const handleDelete=(id)=>{
    // e.stopPropogation();
    projectStore.deleteItem(id)
    // console.log(e, "remove")
}
</script>
<style>
    table{
        width: 100%;
    }
    tr{
        cursor: pointer;
    }
    tr:last-of-type{
        cursor: inherit;
    }
</style>
<table>
    <thead>
        <tr>
            <th>Material</th>
            <th>Price</th>
            <th></th>
        </tr>
    </thead>
    <tbody>
        {#each materials as material(material.id) }
            
        <tr on:click={editHandle(material.id,material.name,material.price)}>
            <td>{material.name}</td>
            <td>{formatter.format(material.price)}</td>
            <td><button on:click|stopPropagation={handleDelete(material.id)}>Del</button></td>
        </tr>
        {/each}
        <tr>
            <td>Total</td>
            <td colspan="2">{formatter.format(total)}</td>
        </tr>
    </tbody>
</table>