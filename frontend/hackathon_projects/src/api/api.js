// FastAPI backend URL
const API_URL = "http://192.168.1.21:8000";

// Backend connection test panna function
export async function testBackend() {

  const response = await fetch(`${API_URL}/`);

  const data = await response.json();

  return data;
}

export default API_URL;