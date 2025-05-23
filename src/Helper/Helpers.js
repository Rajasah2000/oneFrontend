const BASE_URL = "http://localhost:7025/api";

async function Helpers(url, method = "GET", data = null, headers = {}) {
  let token = localStorage.getItem("token");
  let usertoken = localStorage.getItem("usertoken");
  console.log("Token in use:", url.startsWith("/user") ? usertoken : token);

  try {
    const options = {
      method: method,
      headers: {
        "Content-Type": "application/json",
        ...(url.startsWith("/user") &&
          usertoken && { authorization: usertoken }),
        ...(url.startsWith("/admin") && token && { authorization: token }),
        ...headers, // Merge custom headers
      },
      body: data ? JSON.stringify(data) : null,
    };

    const response = await fetch(BASE_URL + url, options);
    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.error("Error in Helpers function:", error);
    throw error; // Re-throw the error for higher-level handling if needed
  }
}

export default Helpers;
