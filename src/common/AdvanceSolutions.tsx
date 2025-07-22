//import * as helpers from "../lib/Helpers";
import axios from "axios";

declare const XLSX: any;
export class AdvanceSolutions {
  static async FetchClient(
    params = {},
    functionName: string,
    LocalApiPath: string
  ) {
    try {
      //const token = helpers.access_token();
      const token = "x";
      const axiosInstance = axios.create({
        baseURL: LocalApiPath,
        headers: {
          "Content-Type": "application/json",
        },
      });
      document.body.classList.add("loading-indicator");
      const response = await axiosInstance.post("/", params, {
        headers: {
          jwt: token,
          functionname: functionName,
        },
      });
      document.body.classList.remove("loading-indicator");
      return response.data;
    } catch (error) {
      document.body.classList.remove("loading-indicator");
    }
  }
}
