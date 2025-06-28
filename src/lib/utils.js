export function formatMessageTime(date){
    return new Date(date).toLocaleTimeString("en-US" ,{
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });
}

export function formatDate(dateInput) {
  try {
    // Handle null, undefined, or empty string
    if (!dateInput) return "N/A";
    
    const date = new Date(dateInput);
    
    // Check if date is valid
    if (isNaN(date.getTime())) return "N/A";
    
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`;
  } catch {
    return "N/A";
  }
}

