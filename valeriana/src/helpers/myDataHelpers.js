import { UserHelpers } from "./userHelpers";

export class MyDataHelpers {

  static async handleNameModule(e, { setters }) {

    const userData = {
      user_name: e.target[0].value == "" ? undefined : e.target[0].value,
      first_name: e.target[1].value == "" ? undefined : e.target[1].value,
      last_name: e.target[2].value == "" ? undefined : e.target[2].value,
    };

    if (userName !== userData.user_name) {
      UserHelpers.handleNewUserName(userData, {setters});
    }
    if (firstName !== userData.first_name) {
      UserHelpers.handleNewFirstName(userData, {setters});
    }
    if (firstName !== userData.first_name) {
      UserHelpers.handleNewLastName(userData, {setters});
    }
  }
}