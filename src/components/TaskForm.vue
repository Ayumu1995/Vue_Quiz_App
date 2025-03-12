<template>
  <div>
    <input v-model="taskTitle" placeholder="add a new task" />
    <button @click="createTask">add task</button> 
  </div>
</template>

<script>
export default {
  name: 'TaskForm',
  data() {
    return {
      taskTitle: '',  
    };
  },
  methods: {
    createTask() {  
      if (this.taskTitle) {  // checking if empty
        this.$store.dispatch('addTask', this.taskTitle);  // changed to vuex instead of emit
        this.taskTitle = '';  // clear the input after adding new.
      }
    }
  }
};
</script>
