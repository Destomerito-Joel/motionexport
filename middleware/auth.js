export default defineNuxtRouteMiddleware((to, from) => {
    const user = useCookie('user') // Example: Using a cookie to store authentication state
  
    if (!user.value) {
      return navigateTo('/auth/login') // Redirect if user is not authenticated
    }
  })
  