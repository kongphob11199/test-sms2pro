<template>
  <div class="todo-list-container">
    <TodoListLayout />
  </div>
</template>

<script lang="ts">
import TodoListLayout from "../layouts/TodoListLayout.vue";

export default {
  components: {
    TodoListLayout,
  },
};
</script>

<style lang="css">
.todo-list-container {
  width: 100vw;
  height: 100vh;
  background-color: rgb(212, 214, 245);
  align-content: center;
}
</style>
