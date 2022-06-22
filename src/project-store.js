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

ProjectStore.subscribe((items) => {
  console.log(items);
  const jsonString = JSON.stringify(items);
  localStorage.setItem(key, jsonString);
});

export default {
  subscribe: ProjectStore.subscribe,
  add,
};