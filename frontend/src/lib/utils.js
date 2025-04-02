export const formatMessageTime = (date) => {
  // if (!time) return "Sending..."; // Avoid "Invalid Date"
  return new Date(date).toLocaleDateString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};
