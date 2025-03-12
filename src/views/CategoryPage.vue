<template>
   <div class="container my-4">
      <h2 class="mb-4 text-center">Categories</h2>
      <div v-if="categories.length > 0" class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
         <div v-for="category in categories" :key="category.id" class="col">
            <router-link :to="`/categories/${category.id}`" class="text-decoration-none">
               <div class="card h-100 shadow-sm">
                  <div class="card-body">
                     <h5 class="card-title">{{ category.name }}</h5>
                  </div>
               </div>
            </router-link>
         </div>
      </div>
      <div v-else class="text-center">
         <!-- else condition for before finishing fetch state -->
         <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">loading...</span>
         </div>
      </div>
   </div>
</template>

<script>
import axios from "axios";

const API_URL = "https://opentdb.com/api_category.php";

export default {
   name: "CategoryPage",
   data() {
      return {
         categories: [], // array for storing quizzes
      };
   },
   created() {
      // fetch quizzes when the compo is created
      this.fetchCategoriesWithDelay();
   },
   methods: {
      async fetchCategoriesWithDelay(retryCount = 3, delay = 1000) {
         try {
            const response = await axios.get(`${API_URL}`);
            this.categories = response.data.trivia_categories;
         } catch (error) {
            if (error.response && error.response.status === 429 && retryCount > 0) {
               console.warn(`Rate limit exceeded. Retrying in ${delay / 1000} seconds...`);
               setTimeout(() => this.fetchQuizzesWithDelay(retryCount - 1, delay * 2), delay);
            } else {
               console.error("Failed to fetch quizzes:", error);
            }
         }
      },
   },
};
</script>
