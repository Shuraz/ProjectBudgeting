<script>
    import Form from "./Form.svelte"
    import Table from "./Table.svelte"
    let id;
    let name="";
    let price=5;
    const editTable=(e)=>{
        // console.log(e.detail);
        ({id,name,price} = e.detail)
      
    }
    </script>
<style>
    main{
    flex: 1;
     align-content: center;
     justify-content: center;
     widows: 80%;
     margin: 0 auto;

    }
</style>
<main>
    <h1>Project Budgeting</h1>
    <Form bind:id bind:name bind:price/>
    <Table on:edit={editTable}/>

</main>