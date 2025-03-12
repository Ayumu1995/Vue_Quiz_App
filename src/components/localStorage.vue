<template>
    <div>
        <h1>Local Storage</h1>
    <p v-if="user">Name: {{ user.name }}</p>
    <p v-if="user">Username: {{ user.username }}</p>
    <p v-if="user">Password: {{ user.password }}</p>
    <p v-else>You are not logged in.</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: null
    };
  },
  created() {
    this.loadUserData();
  },
  methods: {
    loadUserData() {
      // Check if user data is stored in local storage
      const userData = localStorage.getItem('user');
      if (userData) {
        this.user = JSON.parse(userData);
      }
    },
    loginUser() { // Login user
      const user = {
        name: 'John Doe',
        username: 'johndoe',
        password: 'password123'
      };
      this.saveUserData(user); // Save user data to local storage
    },
    saveUserData(userData) {
    localStorage.setItem('user', JSON.stringify(userData));
  },
  logOutUser() {
    localStorage.removeItem('user');
    localStorage.removeItem('quizResults');
    this.user = null;
  },
  saveQuizResults(score, correctAnswers, incorrectAnswers) {
    const quizResults = {
      score,
      correctAnswers,
      incorrectAnswers
    };
    // Check if quiz results are stored in local storage
    localStorage.setItem('quizResults', JSON.stringify(quizResults));
  }
},
getQuizResults() {
    const quizResults = localStorage.getItem('quizResults');
    return quizResults ? JSON.parse(quizResults) : null;
  }
}


</script>

   