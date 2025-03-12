import { createStore } from 'vuex';
import axios from 'axios';

const API_URL = 'https://the-trivia-api.com/v2/questions';

export default createStore({
  state: {
    tasks: []
  },
  mutations: {
    setTaskList(state, tasks) {  
      state.tasks = tasks;
    },
    addNewTask(state, task) {  // push new task
      state.tasks.push(task);
    },
    deleteTask(state, id) {  // deleting task by filtering ID
      state.tasks = state.tasks.filter(task => task.id !== id);
    },
    updateTask(state, editedTask) {  // update task with the edits
      const task = state.tasks.find(task => task.id === editedTask.id);
      if (task) task.title = editedTask.title;
    },
    toggleTaskStatus(state, id) {  // to toggle completed status
      const task = state.tasks.find(task => task.id === id);
      if (task) task.completed = !task.completed;
    }
  },
  actions: {
    async loadTasks({ commit }) {  // API call for tasks
      try {
        const response = await axios.get(`${API_URL}`);
        const tasks = response.data.map(task => ({
          ...task,
          completed: task.completed || false
        }));
        commit('setTaskList', tasks);
      } catch (error) {
        console.error('error when loading tasks:', error);
      }
    },
    async addTask({ commit }, taskTitle) {  
      try {
        const response = await axios.post(API_URL, {
          title: taskTitle,
          completed: false
        });
        const newTask = { ...response.data, id: Date.now() };  // for local data use
        commit('addNewTask', newTask);
      } catch (error) {
        console.error('could not create task:', error);
      }
    },
    async deleteTask({ commit }, id) {  // parameters
      try {
        await axios.delete(`${API_URL}/${id}`);
        commit('removeTask', id);
      } catch (error) {
        console.error('could not delete the task:', error);
      }
    }
  }
});
