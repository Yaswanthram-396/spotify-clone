"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import Cookies from "js-cookie";
import "./login.css";
import React from "react";

export default function LoginPage() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Initialize useRouter
  useEffect(() => {
    if (Cookies.get("token")) {
      router.push("/Home"); // Updated route path
    }
  }, []);
  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    setLoading(true);
    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set headers properly
        },
        body: JSON.stringify({ userName, password }),
      });

      const data = await response.json();

      if (response.ok) {
        Cookies.set("token", data.token, { expires: 30 }); // Set cookie for 30 days
        // setLoading(false);
        router.push("/Home"); // Redirect to Home page
      } else {
        setLoading(false);
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      setLoading(false);
      setError("Login failed: " + error.message);
    }
  };

  return (
    <>
      {loading ? (
        // Loading Screen
        <div className="loading-screen">
          <img src="/music.png" alt="Loading..." width={150} height={100} />
          <p>Loading...</p>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
          className="login-page-withImage"
        >
          <div className="login-page">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img src="/music.png" alt="spotify" width={100} height={100} />
              <h1>Spotify Remix</h1>
            </div>
            <div>
              <form onSubmit={handleLogin}>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="submit">Login</button>
              </form>
              {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// "use client";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import Cookies from "js-cookie";
// import "./login.css";
// import React from "react";

// export default function LoginPage() {
//   const [userName, setUserName] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false); // Loading state
//   const router = useRouter();

//   useEffect(() => {
//     if (Cookies.get("token")) {
//       router.push("/Home");
//     }
//   }, []);

//   const handleLogin = async (event) => {
//     event.preventDefault();
//     setLoading(true); // Show loading screen

//     try {
//       const response = await fetch("/api/auth", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ userName, password }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         Cookies.set("token", data.token, { expires: 30 });
//         router.push("/Home");
//       } else {
//         setError(data.message || "Login failed. Please try again.");
//         setLoading(false); // Hide loading if login fails
//       }
//     } catch (error) {
//       setError("Login failed: " + error.message);
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="login-page-withImage">
//       {loading ? (
//         // Loading Screen
//         <div className="loading-screen">
//           <img src="/loading.gif" alt="Loading..." width={100} height={100} />
//           <p>Loading...</p>
//         </div>
//       ) : (
//         // Login Form
//         <div className="login-page">
//           <div className="logo-container">
//             <img src="/music.png" alt="Spotify" width={100} height={100} />
//             <h1>Spotify Remix</h1>
//           </div>
//           <form onSubmit={handleLogin}>
//             <label htmlFor="username">Username</label>
//             <input
//               type="text"
//               value={userName}
//               onChange={(e) => setUserName(e.target.value)}
//               required
//             />
//             <label htmlFor="password">Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//             <button type="submit">Login</button>
//           </form>
//           {error && <p style={{ color: "red" }}>{error}</p>}
//         </div>
//       )}
//     </div>
//   );
// }
