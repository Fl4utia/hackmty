const BASE_URL = "http://localhost:3000";

export const existsUser = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/api/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    return response.json();
  } catch (e) {
    console.log("Exists user error: ", e);
  }
};
