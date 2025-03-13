import { createRouter, createWebHistory } from "vue-router";
import ProfilePage from "../views/ProfilePage.vue";
import HomePage from "../views/HomePage.vue";
// import TaskDetail from "../views/TaskDetail.vue";
import CategoryPage from "@/views/CategoryPage.vue";
import QuizPage from "@/views/QuizPage.vue";
import ResultPage from "@/views/ResultPage.vue";

const routes = [
   {
      path: "/",
      alias: "/home",
      name: "home",
      component: HomePage,
   },
   {
      path: "/profile",
      name: "profile",
      component: ProfilePage,
   },
   // {
   //    path: "/task/:id",
   //    name: "task-detail",
   //    component: TaskDetail,
   //    props: true, // route with props
   // },
   {
      path: "/categories",
      name: "categories",
      component: CategoryPage,
   },
   {
      path: "/categories/:id",
      name: "quiz",
      component: QuizPage,
      props: true,
   },
   { path: "/result", component: ResultPage },
];

const router = createRouter({
   history: createWebHistory(),
   routes,
});

router.beforeEach((to, from, next) => {
   const publicPages = ["/", "/home", "/login", "/register"];
   const authRequired = !publicPages.includes(to.path);
   const loggedIn = localStorage.getItem("loggedInUser");

 

   if (authRequired && !loggedIn) {
      alert("You need to log in to access this page."); // alert for auth
      next("/"); // redirect to home page if not auth
   } else {
      next(); // allow access after log in
   }
});

export default router;
