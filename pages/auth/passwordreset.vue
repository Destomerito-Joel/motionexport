<template>
  <div class="flex items-center justify-center min-h-screen bg-green-950 ">
    <!-- Page Loader -->
    <PageLoader />
    <div class="bg-white p-8 rounded-2xl w-96 text-center">
      <div class="flex justify-center mb-4">
        <div class="p-3">
          <nuxt-link to="/">
            <div
              class="flex flex-col w-full font-semibold mb-4 justify-center items-center py-3"
            >
              <div class="w-full text-white flex flex-col justify-center items-center">
                <img class="w-16" src="/images/logo2.png" alt="" />
                Motion Celerity
              </div>
            </div>
          </nuxt-link>
        </div>
      </div>

      <h2 class="text-xl font-semibold mb-4">Recover Your Account</h2>

      <form @submit.prevent="recoverAccount">
        <input
          v-model="email"
          type="email"
          placeholder="Enter your email"
          class="w-full p-3 rounded-lg border border-gray-600 mb-3 focus:outline-none focus:ring-2 focus:ring-green-500"
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
          {{ isLoading ? "Sending..." : "Send Reset Link" }}
        </button>
      </form>

      <div v-if="errorMessage" class="text-red-500 text-sm mt-2">
        {{ errorMessage }}
      </div>

      <div class="my-4 text-gray-400">or</div>
      <p class="text-gray-400 mt-4 text-sm">
        Remember your password?
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
import { sendPasswordResetEmail } from "firebase/auth";
import { useRouter } from "vue-router";
import PageLoader from "@/components/PageLoader.vue";

const email = ref("");
const errorMessage = ref(""); // To store error messages
const isLoading = ref(false); // Loading state
const router = useRouter(); // To navigate after recovery email is sent

const { $auth } = useNuxtApp(); // Accessing auth object injected by the plugin

const recoverAccount = async () => {
  errorMessage.value = "";
  isLoading.value = true; // Start loading
  try {
    // Send password reset email
    await sendPasswordResetEmail($auth, email.value);
    console.log("Password reset email sent successfully.");

    // Redirect to login page after successful request
    router.push("/auth/login"); // Redirect to login page
  } catch (error) {
    console.error("Error sending password reset email:", error.message);
    errorMessage.value = error.message; // Set the error message to display
  } finally {
    isLoading.value = false; // Stop loading
  }
};
</script>
