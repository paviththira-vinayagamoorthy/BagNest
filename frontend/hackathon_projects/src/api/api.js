// FastAPI backend URL.
// Change it with a VITE_API_URL variable in frontend/hackathon_projects/.env
const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://bagnest-production-abe9.up.railway.app";
// ---------- Session helpers ----------

export function getToken() {
  return localStorage.getItem("token");
}

export function getUser() {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
}

export function saveSession(data) {
  localStorage.setItem("token", data.access_token);
  localStorage.setItem("user", JSON.stringify(data.user));
  // Navbar and other pages already use these two keys
  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("userType", data.user.role);
}

export function clearSession() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("userType");
}

// ---------- Error message helper ----------

function getErrorMessage(data) {
  if (!data) return "Something went wrong. Please try again.";

  if (typeof data.detail === "string") return data.detail;

  // FastAPI validation errors come as a list
  if (Array.isArray(data.detail)) {
    return data.detail
      .map((item) => {
        const field = (item.loc || []).slice(1).join(".");
        return field ? `${field}: ${item.msg}` : item.msg;
      })
      .join(", ");
  }

  return "Something went wrong. Please try again.";
}

// ---------- Main fetch helper ----------

export async function apiFetch(
  path,
  { method = "GET", body, auth = true } = {}
) {
  const headers = {};
  const token = getToken();

  if (auth && token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const isFormData = body instanceof FormData;

  if (body && !isFormData) {
    headers["Content-Type"] = "application/json";
  }

  let response;

  try {
    response = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      body: body
        ? isFormData
          ? body
          : JSON.stringify(body)
        : undefined,
    });
  } catch {
    throw new Error(
      "Cannot reach the server. Please check that the backend is running."
    );
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    // Token expired / invalid on a protected call: send user to login
    if (response.status === 401 && auth) {
      clearSession();
      window.location.href = "/login";
    }

    throw new Error(getErrorMessage(data));
  }

  return data;
}

// ---------- File download helper (CSV / PDF reports) ----------

export async function downloadFile(path, fallbackName = "report") {
  const token = getToken();

  let response;

  try {
    response = await fetch(`${API_URL}${path}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch {
    throw new Error("Cannot reach the server.");
  }

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    throw new Error(getErrorMessage(data));
  }

  // Use the file name sent by the backend if available
  const disposition = response.headers.get("Content-Disposition") || "";
  const match = disposition.match(/filename="?([^"]+)"?/);
  const filename = match ? match[1] : fallbackName;

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
}

// ---------- Small formatting helpers ----------

export function formatDate(value) {
  return new Date(value).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function formatTime(value) {
  return new Date(value).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

// "08:00:00" -> "08:00"
export function shortTime(value) {
  return value ? String(value).slice(0, 5) : "";
}

export default API_URL;
