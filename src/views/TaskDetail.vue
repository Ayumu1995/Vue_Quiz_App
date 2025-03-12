<template>
  <div class="container my-4">
    <h2 class="mb-4 text-center">Task Details</h2>

    <!-- div form for the tasks -->
    <div class="mb-4">
      <div class="input-group mb-3">
        <input v-model="newTaskTitle" class="form-control" placeholder="Add a new task" />
        <button @click="addTask" class="btn btn-success">add task</button>
      </div>
    </div>
    <div v-if="tasks.length > 0" class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      <div v-for="task in tasks" :key="task.id" class="col">
        <div class="card h-100 shadow-sm">
          <div class="card-body">
            <h5 class="card-title">{{ task.title }}</h5>
            <p class="card-text">
              status: <span :class="task.completed ? 'text-success' : 'text-warning'">
                {{ task.completed ? 'completed' : 'pending' }}
              </span>
            </p>
            <button @click="toggleTaskStatus(task)" class="btn btn-outline-primary btn-sm me-2">
              toggle status
            </button>
            <button @click="editTask(task)" class="btn btn-outline-secondary btn-sm me-2">
              edit
            </button>
            <button @click="deleteTask(task.id)" class="btn btn-outline-danger btn-sm">
              delete
            </button>
          </div>
        </div>
      </div>
    </div> 
    <div v-else class="text-center">  <!-- else condition for before finishing fetch state -->
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">loading...</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/todos';

export default {
  name: 'TaskDetail',
  data() {
    return {
      tasks: [],            // array for storing tasks
      newTaskTitle: '',     // empty input for new task
    };
  },
  created() {    // fetch tasks when the compo is created
    axios.get(`${API_URL}?_limit=5`)
      .then(response => {
        this.tasks = response.data;
      })
      .catch(error => {
        console.error('Failed to fetch tasks:', error);
      });
  },
  methods: {
    // Add New Task
    addTask() {
      if (this.newTaskTitle) {
        const newTask = {
          id: Math.floor(Math.random() * 10000),  // random ID attributed to task
          title: this.newTaskTitle,
          completed: false
        };
        this.tasks.push(newTask);  // add task to array
        this.newTaskTitle = '';     // clear the inputs
      }
    },
    // Delete Task
    deleteTask(id) {
      axios.delete(`${API_URL}/${id}`)
        .then(() => {
          this.tasks = this.tasks.filter(task => task.id !== id);  // remove task 
        })
        .catch(error => {
          console.error('Failed to delete task:', error);
        });
    },
    // Edit Task
    editTask(task) {
      const newTitle = prompt('Edit task title:', task.title);
      if (newTitle && newTitle !== task.title) {
        task.title = newTitle;  // update task title
      }
    },
    // Toggle Task Status
    toggleTaskStatus(task) {
      task.completed = !task.completed;  // change status locally
    }
  }
};
</script>
