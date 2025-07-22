import { AdvanceSolutions } from "@/common/AdvanceSolutions";
import { login } from "@/store/appSlice";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

const GoogleRedirect = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    AuthRedirect();
    //     {
    //     "accessToken": "ya29.a0AS3H6NzpXsVAMTY1C6YPdA8Hllnxcdh7_9kNjl3Nve0Y1Bu2LjGJUx0z4gL-r1qhgDYcWxei0cUGk_XY2yGD25zmOMZrR7tacVSorR5ybLXz83eLnLv7o-tW3F9uMN5CQIXutlNsdP7NBVpj4_lorr_eQ0QMi12hUn4Hqnq0aCgYKARgSARYSFQHGX2Mix5geF4FwfRe5440fY5KtyQ0175",
    //     "idToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImI1MDljNTEzODc2OGY3Y2YyZTgyN2UwNGIyN2U3ZTRjYmM3YmI5MTkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI2NzM1NDU5MjcwMTMtY2IyNnU2MWU4MzExMzN0b2U5MDUzNGYxNjc0dDAzYjguYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI2NzM1NDU5MjcwMTMtY2IyNnU2MWU4MzExMzN0b2U5MDUzNGYxNjc0dDAzYjguYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTI3MTM2MDgxMDMxNDE1OTIwMjIiLCJlbWFpbCI6IjI4MTFhc2luZ2hAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJnUGExY0xrei1TNVRJb3d1R3F2X01BIiwibm9uY2UiOiJqMW12eDUiLCJuYmYiOjE3NTMxNzAxMDksIm5hbWUiOiJhYmhpc2hlayBzaW5naCIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NMRm4xTzlZVWxOaEN5LTcyb0VzVzNEWUtLYjNORUt5Ukd5eVUwSjZFMmVKckR1QlE9czk2LWMiLCJnaXZlbl9uYW1lIjoiYWJoaXNoZWsiLCJmYW1pbHlfbmFtZSI6InNpbmdoIiwiaWF0IjoxNzUzMTcwNDA5LCJleHAiOjE3NTMxNzQwMDksImp0aSI6IjU2ZjU5YWM5YTY1ZWYwMTYyODI1MDFkYzQ4ZjkxYzI2ZDYxYThmMzcifQ.hXTDVNrqngHLItIsdHAt_DS2vzCBfSAgYyJKUvBdndA-seXHay8dFrYFfnVWPmFwkQb8iNMcH6SZkckccaLIV1YkgBcYf_B8nbd9rmVLk2cQUt5e-QvqgR_47Ubku9bUw49pAKCK_59qzwileVPq7ITV-Y0Tnhu1dVSXK_6MwM8RIPjAohkRSYocmZV757sB4TDugBeV62TzKkDUJtJwSMTqHLqxEAS_vilQrqXeWRhwiJ9nVFmqhruLAXFV-TBVUm5C1OVMTVumRP53wP_8R8hWgH4dh0Iopw0ZUnhIK6t2Sc121aPGsdTihtrO8UlQ7L6k7VizRTg6o0yRXX7J4A",
    //     "state": "ryq4g",
    //     "tokenType": "Bearer",
    //     "expiresIn": "3599",
    //     "scope": "email profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid"
    // }
  }, []);

  const AuthRedirect = async () => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.substring(1));
    const accessToken = params.get("access_token");
    const idToken = params.get("id_token");
    const state = params.get("state");
    const tokenType = params.get("token_type");
    const expiresIn = params.get("expires_in");
    const scope = params.get("scope");

    console.log("Extracted params:", {
      accessToken,
      idToken, // Log the ID token
      state,
      tokenType,
      expiresIn,
      scope,
    });
    const resp = await AdvanceSolutions.FetchClient(
      {
        accessToken,
        idToken,
        state,
        tokenType,
        expiresIn,
        scope,
      },
      "UserSignUpLoginGoogle",
      "/api/Auth/Login"
    );

    if (resp.message === "ok") {
      const obj = {
        ...resp.user,
        isRemember: false,
        isGuestMode: false,
      };

      dispatch(
        login({
          access_token: resp.token,
          userData: obj,
          isAuthenticated: true,
        })
      );
      Swal.fire({
        titleText: "Login Successful!",
        icon: "success",
      });
      router.push("/Webportal/Activation/AddDevice");
    } else {
      Swal.fire({
        title: resp.message,
        icon: "error",
      });
    }
  };

  return <p>Authenticating with Google...</p>;
};

export default GoogleRedirect;
