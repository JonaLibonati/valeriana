
export class Config {
  static async getConfig() {
    const res = await fetch("/v1/config");
    const body = await res.json();

    return { res, body };
  }
}

