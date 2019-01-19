<template>
  <div id="app">
    <h2>{{ title }}</h2>
    <input type="text" v-model="newItem" @keyup.enter="addItem" placeholder="向前有路，未来可期">
    <ul>
      <li v-for="items in item">
        <input type="checkbox" v-model="items.isFinished">
        <span :class="{finishItem: items.isFinished}">{{ items.text }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import store from "./store";
export default {
  name: "app",
  data() {
    return {
      title: "toDoList",
      newItem: "",
      item: store.fetch()
    };
  },
  methods: {
    addItem() {
      this.item.push({
        text: this.newItem,
        isFinished: false
      });
      this.newItem = " ";
    }
  },
  watch: {
    item: {
      handler: function(item) {
        store.save(item);
      },
      deep: true
    }
  }
};
</script>

<style>
/* #app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
* {
  margin: 0;
  padding: 0;
}
h2 {
  text-align: center;
}
input[type="text"] {
  margin-top: 10px;
  width: 500px;
  height: 30px;
  border-radius: 5px;
  outline: none;
}
li {
  list-style: none;
  padding: 6px;
}
#app {
  position: absolute;
  left: 50%;
  top: 50px;
  transform: translate(-50%, 0);
}
.finishItem {
  text-decoration: line-through;
}
</style>
