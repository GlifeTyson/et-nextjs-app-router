import JsCookie from "js-cookie";
import { domainOpts } from "./cookies";

type State = {
  "x-token": string | null;
};

const Auth = {
  state: {
    "x-token": null as string | null,
  },
  initialize() {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("x-token") || JsCookie.get("x-token");
      this.state["x-token"] = token !== undefined ? token : null;
    }
  },
  set(token: string): boolean {
    if (typeof window !== "undefined") {
      JsCookie.set("x-token", token, { expires: 365 });
      localStorage.setItem("x-token", token);
    }
    this.initialize();
    return true;
  },
  setAsyncToken(token: string): boolean {
    if (typeof window !== "undefined") {
      JsCookie.set("x-token", token, { expires: 365, ...domainOpts() });
      localStorage.setItem("x-token", token);
    }
    this.initialize();
    return true;
  },
  check(): boolean {
    this.initialize();
    if (typeof window !== "undefined") {
      const token = this.state["x-token"];
      return token !== null && token !== "null";
    }
    return false;
  },
  login(token: string): boolean {
    return this.set(token);
  },
  logout(): boolean {
    JsCookie.remove("x-token");
    localStorage.removeItem("x-token");
    const token = localStorage.getItem("x-token") || JsCookie.get("x-token");
    return token === undefined || token === null;
  },
};

export default Auth;
