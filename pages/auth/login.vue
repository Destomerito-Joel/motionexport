<template>
  <div class="flex items-center justify-center min-h-screen bg-teal-950 relative ">
    <Alert v-if="showAlert" :message="'Login Successful!'" :show="showAlert" class="absolute top-0 left-auto z-50" />
    <div class=" p-8 rounded-2xl w-96 text-center">
      <div class="flex justify-center mb-4">
        <div class="p-3">
          <nuxt-link to="/">
            <div class="flex items-center text-xl font-bold bg-transparent">
              <div>
                <img src="" alt="Logo" class="w-16" />
              </div>
              <div class="-ml-5">hollery</div>
            </div>
          </nuxt-link>
        </div>
      </div>

      <form @submit.prevent="signIn">
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="w-full p-3 rounded-lg border border-gray-600 mb-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
          required
        />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="w-full p-3 rounded-lg border border-gray-600 mb-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
          required
        />

        <button
          type="submit"
          :disabled="isLoading"
          class="w-full bg-teal-600 text-white p-3 rounded-lg hover:bg-teal-700 transition flex items-center justify-center"
        >
          <span v-if="isLoading" class="animate-spin border-4 border-white border-t-transparent rounded-full w-5 h-5 mr-2"></span>
          {{ isLoading ? "Signing in..." : "Sign in" }}
        </button>
      </form>

      <div v-if="errorMessage" class="text-red-500 text-sm mt-2">
        {{ errorMessage }}
      </div>

      <div class="my-4 text-gray-400">or</div>
      <p class="text-gray-400 mt-4 text-sm">
        Don't have an account?
        <NuxtLink to="/auth/signup" class="text-teal-600 hover:underline">
          Sign up, it's free!
        </NuxtLink>
      </p>
      <p class="text-gray-400 mt-4 text-sm">
        forgotten password?
        <NuxtLink to="/auth/passwordreset" class="text-teal-600 hover:underline">
          Resetpassword!
        </NuxtLink>
      </p>
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  layout: "auths",
});
import { ref } from "vue";
import { useNuxtApp } from "#app";
import { signInWithEmailAndPassword, fetchSignInMethodsForEmail } from "firebase/auth";
import { useRouter } from "vue-router";
import Alert from '@/components/Alert.vue';
import { getFriendlyErrorMessage } from "@/utils/errorMessages";

const email = ref("");
const password = ref("");
const errorMessage = ref("");
const isLoading = ref(false);
const router = useRouter();
const showAlert = ref(false);

const { $auth } = useNuxtApp();

const signIn = async () => {
  errorMessage.value = "";
  isLoading.value = true;

  try {
    // ✅ Attempt login directly
    const userCredential = await signInWithEmailAndPassword($auth, email.value.trim(), password.value);
    const user = userCredential.user;

    // 🎉 Show success alert
    showAlert.value = true;
    setTimeout(() => (showAlert.value = false), 3000);

    console.log("User signed in:", user);
    router.push("/admin"); // Redirect after login

  } catch (error) {
    console.error("Login Error:", error);
    errorMessage.value = getFriendlyErrorMessage(error); // Show user-friendly error
  } finally {
    isLoading.value = false;
  }
};

</script>
