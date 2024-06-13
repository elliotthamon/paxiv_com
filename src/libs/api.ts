const BASE_URL_BACKEND_API = process.env.NEXT_PUBLIC_API_URL || "";

export default class API {
  async exec(
    method: string,
    path: string,
    qry: string = "",
    body: any = undefined
  ) {
    try {
      const response = await fetch(
        new URL(`${path}?${qry}`, BASE_URL_BACKEND_API),
        {
          method,
          headers: { "Content-Type": "application/json" },
          body: typeof body === "object" ? JSON.stringify(body) : body,
        }
      );

      if (response.ok) return response.json();
    } catch (e) {
      return { ok: false, error: e };
    }
  }

  async get(path: string, qry: string = "") {
    return this.exec("get", path, qry);
  }
  async put(path: string, body: any = undefined) {
    return this.exec("put", path, "", body);
  }
  async post(path: string, body: any = undefined) {
    return this.exec("post", path, "", body);
  }
  async delete(path: string, qry: string = "") {
    return this.exec("delete", path, qry);
  }
}
