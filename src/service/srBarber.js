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

export const srGetBarberInfo = async (u_email) => {
  try {
    const response = await axios.get(url + "/get_barber_info/" + u_email);
    return response.data;
  } catch (error) {}
};

export const srGetAllBarbers = async () => {
  try {
    const response = await axios.get(url + "/all_barbers");
    return response.data;
  } catch (error) {}
};

export const srGetAllAppointmentRequestsForBarber = async (
  u_id,
  uar_status
) => {
  try {
    const response = await axios.get(
      url + "/all_appointment_requests/" + u_id + "/" + uar_status
    );
    return response.data;
  } catch (error) {}
};

export const srUpdateAppointmentRequestStatus = async (uar_id, uar_status) => {
  try {
    const response = await axios.put(url + "/update_appointment/" + uar_id, {
      uar_status,
    });
    return response;
  } catch (error) {}
};
