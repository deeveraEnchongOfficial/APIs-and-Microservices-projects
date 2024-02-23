// "use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { cookies } from "next/headers";

export async default function Home() {
  // const [authenticated, setAuthenticated] = useState(false);

  // useEffect(() => {
  //   const checkAuthentication = async () => {
  //     try {
  //       // Make a GET request to your authentication API route
  //       const response = await axios.get("/api/check");
  //       // If the request is successful and the user is authenticated, set the authenticated state to true
  //       if (response.status === 200) {
  //         setAuthenticated(true);
  //       }
  //     } catch (error) {
  //       // If there is an error or the user is not authenticated, handle it appropriately
  //       console.log("Authentication error:", error);
  //     }
  //   };

  //   // Call the checkAuthentication function when the component mounts
  //   checkAuthentication();
  // }, []);

  const session = cookies().get("session")?.value;
console.log(session);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/signup", {
        name: "arjun",
        email: "ejujsj@gmail.com",
        password: "ajjskshsj"
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      <form onSubmit={onSubmit}>
          <input type="submit" value="Signup" />
        </form>
      {/* {authenticated ? (
        // Render authenticated content if the user is authenticated
        <div>Main page for authenticated users</div>
      ) : (
        // Render login form or non-authenticated content if the user is not authenticated
        <form onSubmit={onSubmit}>
          <input type="submit" value="Signup" />
        </form>
      )} */}
    </main>
  );
}
