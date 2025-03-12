<template>
  <div class="container my-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card shadow-sm">
          <div class="card-header bg-primary text-white text-center">
            <h4>Your User Profile</h4>
          </div>
          <div class="card-body">
            <div v-if="user">
              <p><strong>Name:</strong> {{ user.name }}</p>
              <p><strong>Username:</strong> {{ user.username }}</p>
              <p><strong>Email:</strong> {{ user.email }}</p>
              <button class="btn btn-danger w-100" @click="logout">Logout</button>
            </div>
            <div v-else>
              <p>Please log in to view your profile.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <h5 class="mt-4">Quiz Scores:</h5>
<ul v-if="user.scores && user.scores.length > 0" class="list-group">
  <li v-for="(score, index) in user.scores" :key="index" class="list-group-item">
    <strong>{{ score.date }}</strong> - 
    <span class="text-secondary">{{ score.category }}</span>: 
    <span class="text-primary">{{ score.score }}/{{ score.total }} ({{ score.percentage }}%)</span>
  </li>
</ul>
<p v-else>No quiz scores available.</p>
</template>

<script>
export default {
  name: 'ProfilePage',
  data() {
    return {
      user: null
    };
  },
  created() {
    const loggedInUser = localStorage.getItem('loggedInUser');  
    if (loggedInUser) {
      this.user = JSON.parse(loggedInUser);   // tulio
    } else {
      this.$router.push('/');
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('loggedInUser');
      this.$router.push('/');
    }
  }
};
</script>
