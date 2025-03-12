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
      this.user = JSON.parse(loggedInUser);
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
