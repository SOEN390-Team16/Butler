import { PublicUser } from "../src/models/user/public-user.model.js";

export const parseUserObjectToLocalStorage = (userObj) => {
  const user = PublicUser.copy(userObj).build()
  const stringUser = JSON.stringify(
    {
      userId: user.userid,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      role: user.role
    })
  localStorage.setItem("userData", stringUser);
}
