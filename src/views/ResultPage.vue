<template>
   <div class="text-center">
      <h3>Quiz Completed!</h3>
      <h1 class="display-1 fw-bold font-monospace">{{ score }}/{{ quizAmount }}</h1>
      <h4>{{ evaluateScore.percentage }}% - {{ evaluateScore.message }}</h4>
      <button @click="backCategory" class="btn btn-primary btn-size">Take Other Quizzes</button>
   </div>
</template>

<script>
export default {
   name: "ResultPage",
   methods: {
      backCategory() {
         this.$router.push({
            path: "/categories",
         });
      },
   },
   computed: {
      score() {
         return this.$route.query.score ? Number(this.$route.query.score) : 0;
      },
      quizAmount() {
         return this.$route.query.quizAmount ? Number(this.$route.query.quizAmount) : 0;
      },
      evaluateScore() {
         const percentage = (this.score * 100) / this.quizAmount;
         if (percentage >= 90) return { percentage: percentage, message: "Excellent!" };
         if (percentage >= 70) return { percentage: percentage, message: " Good job!" };
         if (percentage >= 50) return { percentage: percentage, message: "Not bad!" };
         return { percentage: percentage, message: "Keep studying!" };
      },
   },
};
</script>

<style>
.btn-size {
   margin-top: 30px;
   width: 200px;
}
</style>
