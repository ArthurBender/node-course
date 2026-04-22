const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"; 
const imagePath = (image: string | File, type: "users" | "items") => {
  if (!image) {
    return undefined;
  } else if (typeof image === "string") {
    return `${API_URL}/images/${type}/${image}`;
  } else {
    return URL.createObjectURL(image);
  }
}

export { imagePath }