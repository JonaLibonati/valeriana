import { UserHelpers } from "./userHelpers";

export class MyDataHelpers {

  static async handleNameModule(e, { setters, currentUser }) {
    e.preventDefault()

    const { user_name, first_name, last_name } = currentUser.data.current;

    const userData = {
      user_name: e.target[0].value == "" ? undefined : e.target[0].value,
      first_name: e.target[1].value == "" ? undefined : e.target[1].value,
      last_name: e.target[2].value == "" ? undefined : e.target[2].value,
    };

    if (user_name !== userData.user_name) {
      await UserHelpers.handleNewUserName(userData, {setters});
    }
    if (first_name !== userData.first_name) {
      await UserHelpers.handleNewFirstName(userData, {setters});
    }
    if (last_name !== userData.last_name) {
      await UserHelpers.handleNewLastName(userData, {setters});
    }
  }

  static async handleEmailModule(e, { setters, currentUser }) {
    e.preventDefault()

    const { email } = currentUser.data.current;

    const userData = {
      email_address: e.target[0].value == "" ? undefined : e.target[0].value,
      user_password: e.target[1].value == "" ? undefined : e.target[1].value,
    };

    if (email !== userData.email_address) {
      await UserHelpers.handleNewEmail(userData, {setters});
    }
  }
}