<template>
   <div class="container my-4">
     <h2 class="mb-4 text-center">Welcome to Quiz App</h2>
 
  <!-- Bootstrap Grid for Side-by-Side Forms -->
  <div class="row justify-content-center">
      <!-- Registration Form -->
      <div class="col-md-5 mb-5">
        <div class="card shadow-sm">
          <div class="card-header bg-primary text-white">
            <h4 class="mb-0 text-center">Not a user? Register now!</h4>
          </div>
          <div class="card-body">
            <form @submit.prevent="register">
              <div class="mb-3 input-group">
                <span class="input-group-text"><i class="bi bi-person"></i></span>
                <input v-model="registerForm.name" type="text" class="form-control" placeholder="Name" required />
              </div>
              <div class="mb-3 input-group">
                <span class="input-group-text"><i class="bi bi-person-badge"></i></span>
                <input v-model="registerForm.username" type="text" class="form-control" placeholder="Username" required />
              </div>
              <div class="mb-3 input-group">
                <span class="input-group-text"><i class="bi bi-envelope"></i></span>
                <input v-model="registerForm.email" type="email" class="form-control" placeholder="Email" required />
              </div>
              <div class="mb-3 input-group">
                <span class="input-group-text"><i class="bi bi-lock"></i></span>
                <input v-model="registerForm.password" type="password" class="form-control" placeholder="Password" required />
              </div>
              <button type="submit" class="btn btn-primary w-100">Register</button>
            </form>
          </div>
        </div>
      </div>

      <!-- Login Form -->
      <div class="col-md-5 mb-5">
        <div class="card shadow-sm">
          <div class="card-header bg-success text-white">
            <h4 class="mb-0 text-center">Already a user? Log-in</h4>
          </div>
          <div class="card-body">
            <form @submit.prevent="login">
              <div class="mb-3 input-group">
                <span class="input-group-text"><i class="bi bi-person"></i></span>
                <input v-model="loginForm.username" type="text" class="form-control" placeholder="Username" required />
              </div>
              <div class="mb-3 input-group">
                <span class="input-group-text"><i class="bi bi-lock"></i></span>
                <input v-model="loginForm.password" type="password" class="form-control" placeholder="Password" required />
              </div>
              <button type="submit" class="btn btn-success w-100">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
 </template>
 
 <script>
 export default {
   name: 'HomePage',
   data() {
     return {
       registerForm: {
         name: '',
         username: '',
         email: '',
         password: ''
       },
       loginForm: {
         username: '',
         password: ''
       },
       users: []  // Local storage for users
     };
   },
   methods: {
     register() {
       const user = { ...this.registerForm }; // referral to the form user
       const users = JSON.parse(localStorage.getItem('users') || '[]');
       users.push(user); // push user into storage
       localStorage.setItem('users', JSON.stringify(users));
       alert('You completed your registration. Please log in.');
       this.registerForm = { name: '', username: '', email: '', password: '' };
     },
     login() {
       const users = JSON.parse(localStorage.getItem('users') || '[]'); // will get user from storage
       const user = users.find(u => u.username === this.loginForm.username && u.password === this.loginForm.password);
       if (user) { // if user was found
         localStorage.setItem('loggedInUser', JSON.stringify(user));
         this.$router.push('/profile');
       } else { // if user auth fails
         alert('Invalid username or password');
       }
     }
   }
 };
 </script>
 