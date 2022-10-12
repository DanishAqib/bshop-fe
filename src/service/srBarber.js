import axios from "axios";

const url = "http://localhost:8080/api/barber";

export const updateBarberStatus = async (u_id, b_status) => {
  try {
    const response = await axios.put(url + "/update_status/" + u_id, {
      b_status,
    });
    return response;
  } catch (error) {}
};
