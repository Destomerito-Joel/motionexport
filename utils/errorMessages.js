export const getFriendlyErrorMessage = (error) => {
    if (!error || !error.code) return "An unexpected error occurred.";
  
    const errorMapping = {
      "auth/email-already-in-use": "This email is already registered.",
      "auth/invalid-email": "Invalid email format. Please enter a valid email.",
      "auth/weak-password": "Password must be at least 6 characters long.",
      "auth/invalid-credential": "invalid email or password,Please try again.",
      "auth/wrong-password": "Incorrect password. Please try again.",
      "auth/network-request-failed": "Network error. Check your connection.",
      "auth/too-many-requests": "Too many failed attempts. Please try again later.",
    };
  
    return errorMapping[error.code] || "Something went wrong. Please try again.";
  };
  