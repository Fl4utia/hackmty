// src/api/clerk.js

const BASE_URL = "http://localhost:3000";

const createEvent = async (event) => {
  try {
    const response = await fetch(`${BASE_URL}/api/events/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    });
    return response.json();
  } catch (e) {
    console.log("Exists user error: ", e);
  }
};

const getEvents = async (idUser) => {
  try {
    const response = await fetch(`${BASE_URL}/api/events/user/${idUser}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  } catch (e) {
    console.log("Exists user error: ", e);
  }
};

export { createEvent, getEvents };
