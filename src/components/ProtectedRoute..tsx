// import { Navigate, Outlet } from "react-router-dom";

// const ProtectedRoute = () => {
//   const token = localStorage.getItem("token");

//   if (!token) {
//     return <Navigate to="/login" replace />;
//   }

//   return <Outlet />;
// };

// export default ProtectedRoute;



// src/components/ProtectedRoute.tsx
// import { useEffect, useState, ReactNode } from "react";
// import { Navigate } from "react-router-dom";

// interface ProtectedRouteProps {
//   children: ReactNode;
// }

// const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
//   const [isAuth, setIsAuth] = useState<boolean | null>(null);

//   useEffect(() => {
//     // Check backend auth status
//     fetch("http://localhost:3005/api/auth/me", {
//       credentials: "include", // send cookies
//     })
//       .then((res) => {
//         if (res.ok) setIsAuth(true);
//         else setIsAuth(false);
//       })
//       .catch(() => setIsAuth(false));
//   }, []);

//   // While checking auth
//   if (isAuth === null) return <p className="text-center mt-10">Checking auth...</p>;

//   // If authenticated, render children
//   if (isAuth) return <>{children}</>;

//   // If not authenticated, redirect to login
//   return <Navigate to="/login" replace />;
// };

// export default ProtectedRoute;

// src/components/ProtectedRoute.tsx
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:3005/api/user/me", {
          method: "GET",
          credentials: "include",
        });

        console.log("Response " , res)
        setIsAuth(res.ok);
      } catch {
        setIsAuth(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuth === null) {
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  }

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;