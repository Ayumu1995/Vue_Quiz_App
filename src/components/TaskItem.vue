<template>
  <li class="task-item">
    <input v-if="isEditing" v-model="editedTitle" @keyup.enter="saveEdit" />
    <span v-else @click="$emit('toggle-done', task.id)" :class="{ done: task.completed }">
      {{ task.title }}
    </span>
    <button @click="$emit('remove-task', task.id)">delete</button>
    <button @click="startEdit">edit</button>
    <span>{{ task.completed ? 'yes' : 'no' }}</span>
  </li>
</template>

<script>
export default {
  name: 'TaskItem',
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isEditing: false,
      editedTitle: ''
    };
  },
  methods: {
    startEdit() {
      this.isEditing = true;
      this.editedTitle = this.task.title;
    },
    saveEdit() {
      if (this.editedTitle) {
        this.$emit('edit-task', { id: this.task.id, title: this.editedTitle });
      }
      this.isEditing = false;
    }
  }
};
</script>
