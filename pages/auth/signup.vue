<template>
  <div class="flex items-center justify-center min-h-screen bg-green-950">
    <!-- Page Loader -->
    <PageLoader />

    <Alert
      v-if="showAlert"
      :message="'Signup Successful!'"
      :show="showAlert"
      class="absolute top-0 left-auto z-50"
    />
    <div class="p-8 rounded-2xl w-96 text-center">
      <div class="flex justify-center mb-4">
        <div class="p-3">
          <nuxt-link to="/">
            <div
              class="flex flex-col w-full font-semibold mb-4 justify-center items-center py-3"
            >
              <div class="w-full text-white flex flex-col justify-center items-center">
                <img class="w-16" src="/images/logo2.png" alt="" />
                Motion Experts
              </div>
            </div>
          </nuxt-link>
        </div>
      </div>

      <form @submit.prevent="signUp">
        <input
          v-model="username"
          type="text"
          placeholder="Username"
          class="w-full p-3 rounded-lg border border-gray-600 mb-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="w-full p-3 rounded-lg border border-gray-600 mb-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="w-full p-3 rounded-lg border border-gray-600 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />

        <button
          type="submit"
          :disabled="isLoading"
          class="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition flex items-center justify-center"
        >
          <span
            v-if="isLoading"
            class="animate-spin border-4 border-white border-t-transparent rounded-full w-5 h-5 mr-2"
          ></span>
          {{ isLoading ? "Signing up..." : "Sign up" }}
        </button>
      </form>

      <div v-if="errorMessage" class="text-red-500 text-sm mt-2">
        {{ errorMessage }}
      </div>

      <div class="my-4 text-gray-400">or</div>
      <p class="text-gray-400 mt-4 text-sm">
        Already have an account?
        <NuxtLink to="/auth/login" class="text-green-600 hover:underline"
          >login!</NuxtLink
        >
      </p>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "auths",
});
import { ref } from "vue";
import { useNuxtApp } from "#app"; // Accessing injected auth object
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";
import Alert from "@/components/Alert.vue";
import { getFriendlyErrorMessage } from "@/utils/errorMessages";
import PageLoader from "@/components/PageLoader.vue";

const email = ref("");
const password = ref("");
const username = ref("");
const errorMessage = ref(""); // To store error messages
const isLoading = ref(false); // Loading state
const router = useRouter(); // To navigate after successful signup
const showAlert = ref(false);
const { $auth } = useNuxtApp(); // Accessing auth object injected by the plugin

const signUp = async () => {
  errorMessage.value = "";
  isLoading.value = true; // Start loading
  try {
    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(
      $auth,
      email.value,
      password.value
    );
    const user = userCredential.user;
    console.log("User registered:", user);

    // Show alert immediately
    showAlert.value = true;

    // Delay hiding the alert for 7 seconds
    setTimeout(() => (showAlert.value = false), 7000); // Alert disappears after 7 seconds

    // Redirect user after successful signup
    router.push("/auth/login"); // Redirect to login page after sign-up
  } catch (error) {
    console.error("Error registering user:", error.message);
    errorMessage.value = getFriendlyErrorMessage(error);
  } finally {
    isLoading.value = false; // Stop loading
  }
};
</script>

<style scoped>
/* You can add any specific styles for the page here */
</style>
