const BASE_URL = "http://localhost:3000";

export const existsUser = async (id, firstName, lastName, email) => {
  try {
    const response = await fetch(`${BASE_URL}/api/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, firstName, lastName, email}),
    });
    return response.json();
  } catch (e) {
    console.log("Exists user error: ", e);
  }
};
