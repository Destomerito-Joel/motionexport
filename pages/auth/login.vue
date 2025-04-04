<template>
  <div
    class="flex items-center justify-center min-h-screen bg-green-950 relative"
  >
    <Alert
      v-if="showAlert"
      :message="'Login Successful!'"
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

      <form @submit.prevent="signIn">
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
          {{ isLoading ? "Signing in..." : "Sign in" }}
        </button>
      </form>

      <div v-if="errorMessage" class="text-red-500 text-sm mt-2">
        {{ errorMessage }}
      </div>

      <div class="my-4 text-gray-400">or</div>
      <p class="text-gray-400 mt-4 text-sm">
        Don't have an account?
        <NuxtLink to="/auth/signup" class="text-green-600 hover:underline">
          Sign up, it's free!
        </NuxtLink>
      </p>
      <p class="text-gray-400 mt-4 text-sm">
        forgotten password?
        <NuxtLink
          to="/auth/passwordreset"
          class="text-green-600 hover:underline"
        >
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
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";
import Alert from "@/components/Alert.vue";
import { getFriendlyErrorMessage } from "@/utils/errorMessages";

// Remove the duplicate import for useCookie
const user = useCookie('user'); // Define cookie to store user data

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
    const userCredential = await signInWithEmailAndPassword(
      $auth,
      email.value.trim(),
      password.value
    );
    const user = userCredential.user;

    // Store user data in cookie (Make sure to stringify it properly)
    useCookie('user').value = JSON.stringify({
      uid: user.uid,
      email: user.email,
    });

    // Show success alert
    showAlert.value = true;
    setTimeout(() => (showAlert.value = false), 3000);

    console.log("User signed in:", user);
    await nextTick(() => {
      router.push("/admin"); // Redirect after login
    });
  } catch (error) {
    console.error("Login Error:", error);
    errorMessage.value = getFriendlyErrorMessage(error); // Show user-friendly error
  } finally {
    isLoading.value = false;
  }
};
</script>
