import { writable } from 'svelte/store';

const ProjectStore = writable([]);
const key = 'materials';

if (localStorage.getItem(key)) {
  ProjectStore.set(JSON.parse(localStorage.getItem(key)));
}

const add = (name, price) => {
 ProjectStore.update((items) => {
    const item = {
      name,
      price,
      id: new Date().getTime(),
    };

    return [item, ...items];
  });
};
const edit=(id,name,price)=>{
  ProjectStore.update((items)=>{
    const index= items.findIndex((i)=>i.id===id);
    items[index].name=name;
    items[index].price=price;
    return items;
  });
 
};

const deleteItem=(id)=>{
  ProjectStore.update((items)=>{
    const newItems= items.filter((item)=>item.id!==id);
    return newItems;
  })
}

ProjectStore.subscribe((items) => {
  console.log(items);
  const jsonString = JSON.stringify(items);
  localStorage.setItem(key, jsonString);
});

export default {
  subscribe: ProjectStore.subscribe,
  add,
  edit,
  deleteItem,
};