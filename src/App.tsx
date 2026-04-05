
// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { HelmetProvider } from 'react-helmet-async';
// import Layout from "./components/Layout";
// import Home from "./pages/Home";
// import Services from "./pages/Services";
// import About from "./pages/About";
// import Careers from "./pages/Careers";
// import OurPeople from "./pages/OurPeople";
// import Contact from "./pages/Contact";
// import NotFound from "./pages/NotFound";
// import LayoutDashboard from "./components/LayoutDashboard";
// import AdminHome from "./pages/admin/AdminHome";
// import Users from "./pages/admin/User";
// import Settings from "./pages/admin/Setting";

// const queryClient = new QueryClient();

// const App = () => (
//   <HelmetProvider>
//     <QueryClientProvider client={queryClient}>
//       <TooltipProvider>
//         <Toaster />
//         <Sonner />
//         <BrowserRouter>
//           <Layout>
//             <Routes>
//               <Route path="/" element={<Home />} />
//               <Route path="/services" element={<Services />} />
//               <Route path="/about" element={<About />} />
//               <Route path="/careers" element={<Careers />} />
//               <Route path="/our-people" element={<OurPeople />} />
//               <Route path="/contact" element={<Contact />} />
//               <Route path="*" element={<NotFound />} />

//                {/* Admin routes with Dashboard Layout */}
//             <Route path="/admin" element={<LayoutDashboard />}>
//               <Route index element={<AdminHome />} />
//               <Route path="users" element={<Users />} />
//               <Route path="settings" element={<Settings />} />
//             </Route>
//             </Routes>
//           </Layout>
//         </BrowserRouter>
//       </TooltipProvider>
//     </QueryClientProvider>
//   </HelmetProvider>
// );

// export default App;


import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LayoutDashboard from "./components/LayoutDashboard";
import Home from "./pages/Home";
import Services from "./pages/Services";
import About from "./pages/About";
import Careers from "./pages/Careers";
import OurPeople from "./pages/OurPeople";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import AdminHome from "./pages/admin/AdminHome";
import Users from "./pages/admin/User";
import ProtectedRoute from "./components/ProtectedRoute.";
import { HelmetProvider } from "react-helmet-async";
import ServicesPage from "./pages/admin/Services";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "./components/ui/tooltip";
import Login from "./pages/auth/Login";
const queryClient = new QueryClient()

const App = () => {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Layout><Home /></Layout>} />
              <Route path="/services" element={<Layout><Services /></Layout>} />
              <Route path="/about" element={<Layout><About /></Layout>} />
              <Route path="/careers" element={<Layout><Careers /></Layout>} />
              <Route path="/our-people" element={<Layout><OurPeople /></Layout>} />
              <Route path="/contact" element={<Layout><Contact /></Layout>} />

              <Route path="/login" element={<Login />} />

              {/* Protected Admin routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/admin" element={<LayoutDashboard />}>
                  <Route index element={<AdminHome />} />
                  <Route path="user-management" element={<Users />} />
                  <Route path="service-management" element={<ServicesPage />} />
                </Route>
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;