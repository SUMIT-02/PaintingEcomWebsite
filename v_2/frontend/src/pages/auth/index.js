import { postData } from "@/ApiAuthHelper";
import { authUser } from "@/app/userAuthSlice";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Login = () => {
  const router = useRouter();

  const [formFields, setFormFields] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    signUpEmail: "",
    signUpPassword: "",
  });
  const {
    email,
    password,
    signUpEmail,
    name,
    signUpPassword,
    confirmPassword,
  } = formFields;

  const formFieldValuehandler = (name) => (e) => {
    const value = e.target.value;
    setFormFields({ ...formFields, [name]: value });
  };

  const [isSeller, setIsSeller] = useState(router.query.seller || false);

  const dispatch = useDispatch();

  const fieldChecks = (type) => {
    if (type === "signin") {
      if (email === "" || password === "") {
        toast.error("All fields are required");
        return true;
      }
      return false;
    }
    if (type === "signup") {
      if (signUpEmail === "" || signUpPassword === "" || name === "") {
        toast.error("All fields are required");
        return true;
      }
      if (signUpPassword !== confirmPassword) {
        toast.error("Passwords not matching");
        return true;
      }
      return false;
    }
  };

  const signUpHandler = (e) => {
    e.preventDefault();
    const fieldsCheck = fieldChecks("signup");
    if (fieldsCheck) return;
    const apiData = {
      email: signUpEmail,
      password: signUpPassword,
      fullName: name,
      isSeller,
    };

    postData("/signup", apiData)
      .then((data) => {
        if (data?.err) {
          return toast.error(data.err);
        }
        dispatch(authUser(data.user));

        // Resetting the fields
        setFormFields({
          ...formFields,
          name: "",
          confirmPassword: "",
          signUpEmail: "",
          signUpPassword: "",
        });
        if (data.user.role === 1 && !data.user.sellerOnboarded) {
          return router.replace("/seller/onboard");
        }
        router.replace("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const signInHandler = (e) => {
    e.preventDefault();
    const fieldsCheck = fieldChecks("signin");
    if (fieldsCheck) return;
    const apiData = { email, password };

    postData("/signin", apiData)
      .then((data) => {
        if (data?.err) {
          return toast.error(data.err);
        }

        dispatch(authUser(data.user));

        // Resetting the fields
        setFormFields({
          ...formFields,
          email: "",
          password: "",
        });

        if (data.user.role === 1 && !data.user.sellerOnboarded) {
          return router.replace("/seller/onboard");
        }
        router.replace("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <main>
      <Navbar />
      <section className="mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8 sm:py-16 lg:py-24">
            <div className="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
              <h2 className="text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl">
                Sign in
              </h2>

              <form method="POST" className="mt-8">
                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor=""
                      className="text-base font-medium text-gray-900 dark:text-gray-200"
                    >
                      {" "}
                      Email address{" "}
                    </label>
                    <div className="mt-2.5">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                        type="email"
                        placeholder="Email"
                        onChange={formFieldValuehandler("email")}
                        value={email}
                      ></input>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor=""
                        className="text-base font-medium text-gray-900 dark:text-gray-200"
                      >
                        {" "}
                        Password{" "}
                      </label>
                    </div>
                    <div className="mt-2.5">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                        type="password"
                        placeholder="Password"
                        onChange={formFieldValuehandler("password")}
                        value={password}
                      ></input>
                    </div>
                  </div>

                  <div>
                    <button
                      className="w-full inline-flex items-center justify-center rounded-md bg-indigo-600 px-3.5 py-2.5 text-base font-semibold leading-7 text-white hover:bg-indigo-500"
                      onClick={signInHandler}
                    >
                      Get started
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 ml-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </form>

              {/* <div className="mt-3 space-y-3">
                <button
                  type="button"
                  className="relative inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-gray-700 dark:text-gray-400 transition-all duration-200 bg-white border border-gray-500 rounded-md hover:bg-gray-100 focus:bg-gray-100 hover:text-black focus:text-black focus:outline-none"
                >
                  <div className="absolute inset-y-0 left-0 p-4">
                    <svg
                      className="w-6 h-6 text-rose-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                    </svg>
                  </div>
                  Sign in with Google
                </button>
              </div> */}
            </div>
          </div>

          <div className="w-full h-full">
            <div className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8 sm:py-16 lg:py-24">
              <div className="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
                <h2 className="text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl">
                  Sign Up
                </h2>

                <form method="POST" className="mt-8">
                  <div className="space-y-5">
                    <div>
                      <label
                        htmlFor="name"
                        className="text-base font-medium text-gray-900 dark:text-gray-200"
                      >
                        {" "}
                        Full Name{" "}
                      </label>
                      <div className="mt-2.5">
                        <input
                          className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                          type="text"
                          placeholder="Enter You Full Name"
                          id="name"
                          onChange={formFieldValuehandler("name")}
                          value={name}
                        ></input>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="text-base font-medium text-gray-900 dark:text-gray-200"
                      >
                        {" "}
                        Email address{" "}
                      </label>
                      <div className="mt-2.5">
                        <input
                          className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                          type="email"
                          placeholder="Enter Your Email"
                          id="email"
                          onChange={formFieldValuehandler("signUpEmail")}
                          value={signUpEmail}
                        ></input>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        className="text-base font-medium text-gray-900 dark:text-gray-200"
                      >
                        {" "}
                        Password{" "}
                      </label>
                      <div className="mt-2.5">
                        <input
                          className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                          type="password"
                          placeholder="Enter Your Password"
                          id="password"
                          onChange={formFieldValuehandler("signUpPassword")}
                          value={signUpPassword}
                        ></input>
                      </div>
                    </div>{" "}
                    <div>
                      <label
                        htmlFor="password"
                        className="text-base font-medium text-gray-900 dark:text-gray-200"
                      >
                        {" "}
                        Confirm Password{" "}
                      </label>
                      <div className="mt-2.5">
                        <input
                          className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                          type="password"
                          placeholder="Confirm Password"
                          id="password"
                          onChange={formFieldValuehandler("confirmPassword")}
                          value={confirmPassword}
                        ></input>
                      </div>
                    </div>
                    <div className="flex flex-row-reverse items-center w-max">
                      <label
                        htmlFor="isSeller"
                        className="text-base font-medium text-gray-900 dark:text-gray-200 ml-2"
                      >
                        {" "}
                        Are you a seller ?{" "}
                      </label>

                      <input
                        type="radio"
                        name=""
                        id=""
                        checked={router.query.seller || isSeller}
                        onClick={() => setIsSeller(!isSeller)}
                      />
                    </div>
                    <div>
                      <button
                        className="w-full inline-flex items-center justify-center rounded-md bg-indigo-600 px-3.5 py-2.5 text-base font-semibold leading-7 text-white hover:bg-indigo-500"
                        onClick={signUpHandler}
                      >
                        Get started
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4 ml-2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </form>

                {/* <div className="mt-3 space-y-3">
                  <button
                    type="button"
                    className="relative inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-gray-700 dark:text-gray-400 transition-all duration-200 bg-white border border-gray-500 rounded-md hover:bg-gray-100 focus:bg-gray-100 hover:text-black focus:text-black focus:outline-none"
                  >
                    <div className="absolute inset-y-0 left-0 p-4">
                      <svg
                        className="w-6 h-6 text-rose-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                      </svg>
                    </div>
                    Sign up with Google
                  </button>

                  <p>
                    <span className="text-gray-500 dark:text-gray-400 text-sm">
                      Read our{" "}
                      <span className="capitalize text-indigo-600">
                        privacy policy
                      </span>{" "}
                      and{" "}
                      <span className="capitalize text-indigo-600">
                        terms of service
                      </span>{" "}
                      to learn more
                    </span>
                  </p>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
export default Login;
