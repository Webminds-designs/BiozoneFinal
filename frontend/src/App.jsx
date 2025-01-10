import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { lazy, Suspense, useState, useEffect } from "react";
import PrivateRoute from "./Services/PrivateRoute";
import PreLoader from "./Components/PreLoader";
import SplashScreen from "./Components/SplashScreen";
import { AuthProvider, useAuth } from "./Services/AuthContex";

// Lazy load route components
const Home = lazy(() => import("./Pages/Home"));
const GalleryExpanded = lazy(() => import("./Components/Gallery_Expanded"));
const Admin = lazy(() => import("./Pages/Admin/Admin"));
const Login = lazy(() => import("./Pages/Admin/Login"));

function App() {
  const [loadingPhase, setLoadingPhase] = useState("preloading"); // "preloading", "splash", or "loaded"

  const isAuth = useAuth();

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      setLoadingPhase("loaded");
    } else {
      setLoadingPhase("splash");
    }
  }, []);

  const handleLanguageChange = (lang) => {
    localStorage.setItem("language", lang);
    setTimeout(() => setLoadingPhase("loaded"), 3000);
  };

  const handlePreLoader = () => {
    setLoadingPhase("splash");
  };

  if (loadingPhase === "preloading") {
    return <PreLoader onLoaded={handlePreLoader} />;
  }

  if (loadingPhase === "splash") {
    return <SplashScreen handleLanguageChange={handleLanguageChange} />;
  }

  return (
    <div className="app bg-primarybg text-primarytext">
      <Toaster position="top-center" containerStyle={{ top: 60 }} />
      <Suspense fallback={<PreLoader onLoaded={handlePreLoader} />}>
        <Routes>
          <Route
            path="/"
            element={
              <SplashScreen handleLanguageChange={handleLanguageChange} />
            }
          />
          <Route path="/home" element={<Home />} />
          <Route path="/gallery" element={<GalleryExpanded />} />
          {/* Admin Routes */}
          <Route path="/admin" element={<Login />} />
          <Route element={<PrivateRoute isAuth={isAuth} />}>
            <Route path="/admin/dashboard" element={<Admin />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  );
}
