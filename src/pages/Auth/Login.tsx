import React, { useEffect, useState } from "react";
import LayoutWrapper from "../../container/LayoutWrapper";
import { useRouter } from "next/router";
import AddDevice from "../Webportal/Activation/AddDevice";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "@/store/appSlice";
import Link from "next/link";
import AuthLogo from "@/ProjectComponents/AuthLogo";
import DeviceLoginImage from "@/ProjectComponents/DeviceLoginImage";
import { AdvanceSolutions } from "@/common/AdvanceSolutions";
import Swal from "sweetalert2";

interface Inputs {
  email: string;
  password: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onChange",
  });
  const router = useRouter();
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState<any>(true);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
      const resp = await AdvanceSolutions.FetchClient(
        data,
        "UserLogin",
        "/api/Auth/Login"
      );
      console.log(resp);

      if (resp.message === "ok") {
        const obj = {
          ...resp.user,
          isRemember: isChecked,
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
          icon: "success",
          title: "Login Successful",
          text: "Welcome back!",
          toast: true,
          timer: 1500,
        });
        router.push("/Webportal/Activation/AddDevice");
      } else {
        Swal.fire({
          title: resp.message,
          icon: "error",
        });
        console.log(resp.message, "failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const submitAsGuestMode = () => {
    const obj = {
      isGuestMode: true,
    };
    dispatch(login({ userData: obj }));
    router.push("/Webportal/Activation/AddDevice");
  };

  const handleGoogleSignIn = () => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL}/Auth/GoogleRedirect`;
    const scope = "openid email profile";
    const state = Math.random().toString(36).substring(7);
    const nonce = Math.random().toString(36).substring(7); // Add this line
    const responseType = "token id_token";

    const oauthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${encodeURIComponent(
      responseType
    )}&scope=${encodeURIComponent(scope)}&state=${state}&nonce=${nonce}`; // Add nonce parameter

    const width = 500;
    const height = 600;
    const left = window.screenX + (window.innerWidth - width) / 2;
    const top = window.screenY + (window.innerHeight - height) / 2;

    const windowFeatures = `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes,status=yes`;

    window.location.href = oauthUrl;
  };
  return (
    <>
      <div className="container-fluid vh-100 overflow-hidden">
        <div className="row h-100">
          <div className="col-md-6 position-relative px-5 d-flex flex-column bg-white">
            <AuthLogo />
            <div className="my-auto w-100 d-flex justify-content-center">
              <div style={{ width: "100%", maxWidth: "400px" }}>
                <h1 className="mb-4">Login</h1>
                <p className="title">
                  Welcome back! Please enter your details.
                </p>
                <form>
                  <div className="form-group  mb-3">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      type="text"
                      className={`form-control`}
                      placeholder="Enter your email"
                      {...register("email", {
                        required: "This field is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Invalid email",
                        },
                      })}
                    />
                    {errors?.email && (
                      <p className="invalid-text">{errors?.email?.message}</p>
                    )}
                  </div>
                  <div className="form-group  mb-3 position-relative">
                    <label htmlFor="password">Password</label>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      className={`form-control`}
                      placeholder="Password"
                      {...register("password", {
                        required: "This field is required",
                        //  pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,}$/, message: "Min. 8 characters with uppercase, lowercase, number & special character."},
                      })}
                    />
                    <span
                      role="button"
                      tabIndex={0}
                      className="position-absolute end-0 translate-middle-y me-4"
                      style={{ cursor: "pointer", top: "50px" }}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <i className="bi bi-eye-slash p-eye" />
                      ) : (
                        <i className="bi bi-eye p-eye" />
                      )}
                    </span>
                    {errors?.password && (
                      <p className="invalid-text">
                        {errors?.password?.message}
                      </p>
                    )}
                  </div>
                  <div className="row mt-4">
                    <div className="col">
                      <div className="form-group form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="exampleCheck1"
                          checked={isChecked}
                          onChange={(e) => setIsChecked(e.target.checked)}
                        />
                        <label
                          className="form-check-label pargp"
                          htmlFor="exampleCheck1"
                        >
                          Remember for 30 days
                        </label>
                      </div>
                    </div>
                    <div className="col text-end cursor">
                      <Link href="/Auth/ForgotPassword">
                        <label className="cursor">Forgot password</label>
                      </Link>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-success w-100 mt-3"
                    onClick={handleSubmit(onSubmit)}
                  >
                    Sign in securely
                  </button>
                </form>
                <div className="d-flex align-items-center my-4">
                  <hr className="flex-grow-1" />
                  <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
                  <hr className="flex-grow-1" />
                </div>
                <button
                  onClick={handleGoogleSignIn}
                  className="btn socialbtn border rounded-4 border-secondary w-100 d-flex align-items-center justify-content-center gap-2 py-2"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 48 48"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="#EA4335"
                      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                    />
                    <path
                      fill="#4285F4"
                      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                    />
                    <path
                      fill="#34A853"
                      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                    />
                    <path fill="none" d="M0 0h48v48H0z" />
                  </svg>
                  <span className="fw-semibold title">Sign in with Google</span>
                </button>
                <div className="d-flex align-items-center my-4">
                  <hr className="flex-grow-1" />
                  <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
                  <hr className="flex-grow-1" />
                </div>
                <p
                  className="p-success text-center cursor"
                  style={{ fontSize: "14px" }}
                  onClick={submitAsGuestMode}
                >
                  Continue as Guest to change settings
                </p>
                <Link href="/Auth/Signup">
                  <p className="pargp text-center" style={{ fontSize: "14px" }}>
                    Don’t have an account?{" "}
                    <strong className="text-success">Sign up</strong>
                  </p>
                </Link>
              </div>
            </div>
            <div>
              <div className="copyright position-absolute bottom-0 start-0 p-4">
                © 2025 Nerve Cells AI. All rights reserved.
              </div>
            </div>
          </div>

          <div className="col-md-6 p-0">
            <DeviceLoginImage />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
