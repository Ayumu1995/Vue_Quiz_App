<template>
   <div class="container my-4">
      <h2 class="mb-4 text-center">Quizzes for {{ categoryName }}</h2>

      <div v-if="quizzes.length > 0">
         <div v-if="currentQuizIndex < quizzes.length" class="card h-100 shadow-sm p-5 text-center">
            <h5 class="text-center mb-3 text-secondary">
               Question {{ currentQuizIndex + 1 }} of {{ quizzes.length }}
            </h5>
            <div class="progress mb-3">
               <div
                  class="progress-bar bg-success"
                  role="progressbar"
                  :style="{ width: progressPercentage + '%' }"
                  style="border-radius: 100px"
               ></div>
            </div>
            <h5 class="card-title my-3">{{ currentQuiz.question }}</h5>

            <div class="my-4">
               <button
                  v-for="(option, index) in shuffledAnswers"
                  :key="index"
                  class="btn option-border d-block my-2 w-100"
                  :class="{
                     'selected hover:bg-gray-50': selectedAnswer[currentQuizIndex] === option,
                  }"
                  @click="selectAnswer(option)"
               >
                  {{ option }}
               </button>
            </div>

            <div class="d-flex justify-content-between mt-4">
               <button class="btn btn-secondary" @click="previousQuiz">Previous</button>
               <button class="btn btn-primary" @click="nextQuiz">Next</button>
            </div>
         </div>

         <div v-else class="text-center">
            <h4>All questions completed! 🎉</h4>
         </div>
      </div>

      <div v-else class="text-center">
         <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
         </div>
      </div>
   </div>
</template>

<script>
import axios from "axios";

const API_URL = "https://opentdb.com/api.php";
const CATEGORY_API_URL = "https://opentdb.com/api_category.php";
const quizAmount = 5;
const quizType = "multiple";

export default {
   name: "QuizPage",
   data() {
      return {
         quizzes: [],
         categoryId: this.$route.params.id,
         categoryName: "",
         currentQuizIndex: 0,
         selectedAnswer: [],
      };
   },
   computed: {
      currentQuiz() {
         return this.quizzes[this.currentQuizIndex];
      },
      shuffledAnswers() {
         if (!this.currentQuiz) return [];
         return this.shuffleArray([
            this.currentQuiz.correct_answer,
            ...this.currentQuiz.incorrect_answers,
         ]);
      },
      progressPercentage() {
         return ((this.currentQuizIndex + 1) / this.quizzes.length) * 100;
      },
   },
   created() {
      this.fetchCategoryName();
      this.fetchQuizzesWithDelay();
   },
   methods: {
      async fetchCategoryName() {
         try {
            const response = await axios.get(CATEGORY_API_URL);
            const category = response.data.trivia_categories.find(
               (c) => c.id.toString() === this.categoryId
            );
            if (category) {
               this.categoryName = category.name;
            } else {
               this.categoryName = "Unknown Category";
            }
         } catch (error) {
            console.error("Failed to fetch category name:", error);
         }
      },
      async fetchQuizzesWithDelay(retryCount = 3, delay = 1000) {
         try {
            const response = await axios.get(
               `${API_URL}?amount=${quizAmount}&type=${quizType}&category=${this.categoryId}`
            );
            this.quizzes = response.data.results;
         } catch (error) {
            if (error.response && error.response.status === 429 && retryCount > 0) {
               console.warn(`Rate limit exceeded. Retrying in ${delay / 1000} seconds...`);
               setTimeout(() => this.fetchQuizzesWithDelay(retryCount - 1, delay * 2), delay);
            } else {
               console.error("Failed to fetch quizzes:", error);
            }
         }
      },
      nextQuiz() {
         if (this.currentQuizIndex < this.quizzes.length - 1) {
            this.currentQuizIndex++;
         } else {
            console.log("All questions completed!", this.selectedAnswer);
            this.$router.push({
               path: "/result",
               query: {
                  quizzes: JSON.stringify(this.quizzes),
                  selectedAnswer: JSON.stringify(this.selectedAnswer),
                  quizAmount: this.quizzes.length,
                  quizCategory: this.categoryName,
               },
            });
         }
      },
      previousQuiz() {
         if (this.currentQuizIndex > 0) {
            this.currentQuizIndex--;
         }
      },
      selectAnswer(answer) {
         this.selectedAnswer[this.currentQuizIndex] = answer;
      },
      shuffleArray(array) {
         return array
            .map((value) => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);
      },
   },
};
</script>

<style>
.option-border {
   border-color: darkgray;
}

.selected {
   border-color: #00c434;
   background-color: #effff3;
}
</style>
