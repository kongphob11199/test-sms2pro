<template>
  <ModalCustom>
    <CardCustom>
      <div class="modal-add-task-container">
        <div class="modal-add-task-title">
          <h2>Add Task</h2>
        </div>
        <div class="modal-add-task-body">
          <InputCustom
            :required="true"
            :textHelper="error.title"
            :label="'Title'"
            :value="tasks.title"
            :onChange="handleChangeTitle"
          />
        </div>
        <div class="modal-add-task-footer">
          <ButtonCustom :onClick="handleCloseModalAddTask">Cancel</ButtonCustom>
          <ButtonCustom :onClick="handleSaveModalAddTask">Save</ButtonCustom>
        </div>
      </div>
    </CardCustom>
  </ModalCustom>
</template>

<script lang="ts">
import Vue from "vue";

import ButtonCustom from "@/components/button/ButtonCustom.vue";
import CardCustom from "@/components/card/CardCustom.vue";
import ModalCustom from "@/components/modal/ModalCustom.vue";
import InputCustom from "@/components/input/InputCustom.vue";

import TodoListAddModalState from "@/stores/task-modal-store";
import {initTasks,TasksProps} from "@/stores/task-store";

export default Vue.extend({
  name: "TodoListAddModal",
  components: {
    ButtonCustom,
    CardCustom,
    ModalCustom,
    InputCustom,
  },
  data() {
    return TodoListAddModalState;
  },
  props: {
    isOpenAddTask: {
      type: Boolean,
      required: true,
    },
    taskEdit: {
      type: Object as () => TasksProps,
      required: false,
    },
  },
  watch: {
    taskEdit: {
      immediate: true,
      handler(newValue) {
        if (newValue) {
          this.tasks = { ...newValue };
        } else {
          this.tasks = initTasks;
        }
      },
    },
  },
  methods: {
    handleChangeTitle(e: Event) {
      const target = e.target as HTMLInputElement;
      if (target) {
        this.tasks.title = target.value;
        this.error.title = "";
      }
    },
    handleCloseModalAddTask() {
      this.$emit("onCloseModal:isOpenAddTask", false);
      this.onClearTask();
    },
    handleSaveModalAddTask() {
      if (this.tasks.title === "") {
        this.error.title = "Title is required";
        return;
      } else {
        if (this.taskEdit.title !== '') {
          this.$emit("onSaveModal:tasks", this.tasks);
        }else{
          this.$emit("onSaveModal:tasks", this.tasks);
        }
        this.$emit("onCloseModal:isOpenAddTask", false);
        this.onClearTask();
      }
    },
    onClearTask() {
      this.tasks = initTasks;
      this.error.title = "";
    },
  },
});
</script>

<style lang="css">
.card-custom {
  padding: 16px;
}
.modal-custom-content {
  width: 100%;
  max-width: 350px;
}
.modal-add-task-container {
  width: 100%;
}
.modal-add-task-title {
  margin-bottom: 16px;
}
.modal-add-task-title h2 {
  text-align: center;
  margin: 0;
}
.modal-add-task-footer {
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
}
</style>
