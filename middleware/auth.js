export default defineNuxtRouteMiddleware(() => {
  const user = useCookie('user'); // Get user from cookie
  
  console.log("User cookie in middleware:", user.value); // Check if cookie is set

  if (!user.value) {
    return navigateTo('/auth/login'); // Redirect to login if user is not authenticated
  }
});
