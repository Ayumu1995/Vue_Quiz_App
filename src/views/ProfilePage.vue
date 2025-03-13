<template>
  <div class="profile-background mt-0">
    <div class="container profile-container">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <!-- User Profile Card -->
          <div class="card shadow-lg">
            <div class="card-header bg-primary text-white text-center">
              <h3 class="mb-0">Your Profile</h3>
            </div>
            <div class="card-body text-center">
              <h4 class="text-uppercase">{{ user.name }}</h4>
              <p class="text-muted">@{{ user.username }}</p>
              <p class="fw-bold">{{ user.email }}</p>
              <button class="btn btn-danger mt-3 px-4 py-2" @click="logout">
                <i class="bi bi-box-arrow-right"></i> Logout
              </button>
            </div>
          </div>

          <!-- Quiz Scores Section -->
          <div class="mt-5">
            <h4 class="text-center fw-bold">Your Quiz Scores</h4>
            <table v-if="user.scores && user.scores.length > 0" class="table table-hover table-striped mt-3 shadow-sm">
              <thead class="table-dark">
                <tr>
                  <th>Date</th>
                  <th>Category</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(score, index) in user.scores" :key="index">
                  <td>{{ score.date }}</td>
                  <td>{{ score.category }}</td>
                  <td class="fw-bold text-primary">{{ score.score }}/{{ score.total }} ({{ score.percentage }}%)</td>
                </tr>
              </tbody>
            </table>
            <p v-else class="text-center text-muted">No quiz scores available.</p>
          </div>
        </div>
      </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'ProfilePage',
  data() {
    return {
      user: null,
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

<style scoped>
.profile-background {
  background-color: #f8f9fa; 
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>