<template>
  <div class="todo-list-layout">
    <div class="todo-list-title">
      <h1>Todo List</h1>
    </div>
    <div class="todo-list-content">
      <div class="todo-list-header">
        <div>
          <ButtonCustom :onClick="handleOpenModalAddTask">
            Add Task
          </ButtonCustom>
        </div>
        <div>
          <SelectCustom
            :value="taskStatus"
            :options="taskStatusOptions"
            :onChange="handleTaskStatusChange"
          />
        </div>
      </div>
      <div class="todo-list-body">
        <CardCustom>
          <div>
            <div v-if="filteredTasks.length === 0" style="text-align: center">
              Data not found
            </div>
            <div v-else class="task-container">
              <div
                v-for="(task, index) in filteredTasks"
                :key="index"
                class="task-item"
              >
                <div class="task-item-info">
                  <input
                    @input="handleChangeCompleted(index)"
                    class="task-item-checkbox"
                    type="checkbox"
                    :checked="task.status === 'Completed'"
                  />
                  <div>
                    <div
                      :style="`text-decoration: ${
                        task.status === 'Completed' ? 'line-through' : 'none'
                      }`"
                    >
                      {{ task.title }}
                    </div>
                    <div>{{ task.date }}</div>
                  </div>
                </div>
                <div class="task-item-action">
                  <ButtonCustom
                    class="task-btn-action"
                    :onClick="() => handleDeleteTask(index)"
                  >
                    <img :src="IconDel" />
                  </ButtonCustom>
                  <ButtonCustom
                    class="task-btn-action"
                    :onClick="() => handleEditTask(index)"
                  >
                    <img :src="IconEdit" />
                  </ButtonCustom>
                </div>
              </div>
            </div>
          </div>
        </CardCustom>
      </div>
    </div>

    <div v-if="isOpenAddTask">
      <TodoListAddModal
        :isOpenAddTask="isOpenAddTask"
        :taskEdit="taskEdit"
        @onCloseModal:isOpenAddTask="handleCloseModalAddTask"
        @onSaveModal:tasks="handleSaveModalAddTask"
      />
    </div>

    <div v-if="isOpenAlert">
      <ModalAlertCustom :responseAlert="handleResponseAlert" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import ButtonCustom from "@/components/button/ButtonCustom.vue";
import SelectCustom from "@/components/select/SelectCustom.vue";
import CardCustom from "@/components/card/CardCustom.vue";
import ModalCustom from "@/components/modal/ModalCustom.vue";
import InputCustom from "@/components/input/InputCustom.vue";
import ModalAlertCustom from "@/components/modal/ModalAlert.vue";

import TodoListAddModal from "@/layouts/modal/TodoListAddModal.vue";

import TodoListState, {
  TodoListStateProps,
  TasksProps,
  initTasks,
} from "@/stores/task-store";

export default Vue.extend({
  name: "TodoListLayout",
  components: {
    ButtonCustom,
    SelectCustom,
    CardCustom,
    ModalCustom,
    InputCustom,
    TodoListAddModal,
    ModalAlertCustom,
  },
  data(): TodoListStateProps {
    return { ...TodoListState };
  },
  computed: {
    filteredTasks() {
      if (this.taskStatus === "All") {
        return this.tasks;
      }
      return this.tasks.filter((task) => task.status === this.taskStatus)
    },
  },
  methods: {
    handleTaskStatusChange(e: string) {
      this.taskStatus = e;
    },
    handleOpenModalAddTask() {
      this.isOpenAddTask = true;
    },
    handleCloseModalAddTask(newValue: boolean) {
      this.isOpenAddTask = newValue;
      this.taskEditIndex = -1;
      this.taskEdit = initTasks;
    },
    handleSaveModalAddTask(newTask: TasksProps) {
      if (this.taskEditIndex !== -1) {
        this.tasks[this.taskEditIndex] = newTask;
        this.taskEditIndex = -1;
        this.taskEdit = initTasks;
        return;
      }
      const dateTime = new Date().toLocaleString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      newTask.date = `${dateTime}, ${new Date().toLocaleString("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })}`;
      this.tasks.push(newTask);
    },
    handleChangeCompleted(index: number) {
      this.tasks[index].status =
        this.tasks[index].status === "Completed" ? "Incomplete" : "Completed";
    },
    handleEditTask(index: number) {
      const newEdit = { ...this.tasks[index] };
      this.taskEditIndex = index;
      this.taskEdit = newEdit;
      this.isOpenAddTask = true;
    },
    handleDeleteTask(index: number) {
      this.isOpenAlert = true;
      this.taskEditIndex = index;
    },
    handleResponseAlert(status: boolean) {
      if (status) {
        this.tasks = this.tasks.filter((_, i) => i !== this.taskEditIndex);
      }
      this.taskEditIndex = -1;
      this.isOpenAlert = false;
    },
  },
});
</script>

<style lang="css">
.todo-list-layout {
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.todo-list-title h1 {
  text-transform: uppercase;
  margin: 0;
}

.todo-list-content {
  width: 100%;
  max-width: 700px;
  height: fit-content;
  padding: 16px;
}
.todo-list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 16px;
}
.todo-list-body {
  height: fit-content;
  width: 100%;
  max-height: 500px;
  overflow: auto;
}

.todo-list-body .card-custom {
  padding: 16px;
}

.task-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border-radius: 4px;
  padding: 8px;
}

.task-item .task-item-info {
  display: flex;
  align-items: center;
  gap: 4px;
}

.task-item .task-item-action {
  display: flex;
  align-items: center;
  gap: 8px;
}

.task-item .task-btn-action {
  height: 48px;
  background-color: #9e9e9e;
}

.task-item .task-btn-action:hover {
  height: 48px;
  background-color: #818181;
}

.task-item .task-btn-action img {
  height: 100%;
}

.task-item-checkbox {
  width: 30px;
  height: 30px;
}

</style>
