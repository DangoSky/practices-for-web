<template>
  <div id="app">
    <h4>{{ title }}</h4>
    <h2>{{ time }}</h2>
    <input type="text" v-model="newItem" @keyup.enter="addItem" placeholder="向前有路，未来可期">
    <ul>
      <li v-for="items in item" :key="items.text">
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
      title: "明明什么都还没有做就已经",
      time: " ",
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
    },
    timer() {
      let date = new Date();
      let hour = this.formatting(date.getHours()),
        minutes = this.formatting(date.getMinutes()),
        seconds = this.formatting(date.getSeconds());
      this.time = `${hour}:${minutes}:${seconds}`;
    },
    formatting(time) {
      if (time < 10) {
        return "0" + time;
      }
      else return time;
    }
  },
  watch: {
    item: {
      handler: function(item) {
        store.save(item);
      },
      deep: true
    }
  },
  created() {
    // localStorage.clear();
    setInterval(this.timer, 1000);
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
h2 {
  text-align: center;
  color: red;
}
input[type="text"] {
  margin-top: 10px;
  width: 500px;
  height: 30px;
  border-radius: 5px;
  outline: none;
  margin-bottom: 15px;
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
