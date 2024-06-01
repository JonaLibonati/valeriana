export class ContactPsychologist {
  static async create(userData) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };

    const res = await fetch("/v1/contacts/psychologist", options);
    const body = await res.json();

    return { res, body: body.contactList };
  }

  static async delete() {
    const options = {
      method: "DELETE",
    };

    const res = await fetch("/v1/contacts/psychologist", options);
    const body = await res.json();

    return { res, body: body.contactList };
  }

  static async getContactList() {
    const res = await fetch("/v1/contacts/psychologist");
    const body = await res.json();

    return { res, body: body.contactList };
  }
}
