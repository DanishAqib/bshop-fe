import axios from "axios";

const url = "http://localhost:8080/api/user";

export const validateUser = async ({ u_email, u_password }) => {
  try {
    const response = await axios.post(url, {
      u_email,
      u_password,
    });
    return response.data;
  } catch (error) {}
};

export const createUser = async ({
  u_firstname,
  u_lastname,
  u_email,
  u_password,
  u_role,
  u_location,
}) => {
  try {
    const response = await axios.post(url + "/add_user", {
      u_firstname,
      u_lastname,
      u_email,
      u_password,
      u_role,
      u_location,
    });
    return response;
  } catch (error) {}
};

export const srGetUserInfo = async (u_email) => {
  try {
    const response = await axios.get(url + "/get_user_info/" + u_email);
    return response.data;
  } catch (error) {}
};
