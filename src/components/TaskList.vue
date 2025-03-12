<template>
    <div>
      <h2>your tasks</h2>
      <TaskForm @add-task="createTask" />
      <ul class="task-list">
        <TaskItem
          v-for="task in tasks"
          :key="task.id"
          :task="task"
          @toggle-done="toggleTaskStatus"
          @remove-task="removeTask"
          @edit-task="updateTask"
        />
      </ul>
    </div>
  </template>
  
  <script>
  import TaskForm from './TaskForm.vue';
  import TaskItem from './TaskItem.vue';
  
  export default {
    name: 'TaskList',
    components: { TaskForm, TaskItem },
    computed: {
      tasks() {
        return this.$store.state.tasks;  // getting tasks from the store
      }
    },
    methods: {
    createTask(task) {  // add new task
      this.$store.dispatch('addTask', task.title);  
    },
    removeTask(id) {  // delete task by ID
      this.$store.dispatch('deleteTask', id);
    },
    toggleTaskStatus(id) {  // toggle completed status
      this.$store.commit('toggleTaskStatus', id);  
    },
    updateTask(editedTask) {  // update the changes to task
      this.$store.commit('updateTask', editedTask);  
    }
  },
  mounted() {
    this.$store.dispatch('loadTasks');  // to load tasks with call
  }
};
  </script>
  