// import { createContext, useContext, useState } from "react";
// import axios from "axios";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useAuth, useUser } from "@clerk/clerk-react";
// import toast from "react-hot-toast";
// import { useEffect } from "react";

// axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

// export const AppContext = createContext();

// export const AppProvider = ({ children }) => {
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [shows, setShows] = useState([]);
//   const [favoriteMovies, setFavoriteMovies] = useState([]);

//   const image_base_url = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;
//   const user = useUser();
//   const getToken = useAuth();
//   const location = useLocation();
//   const navigate = useNavigate();

//   const fetchIsAdmin = async () => {
//     try {
//       const { data } = await axios.get("/api/admin/is-admin", {
//         headers: {
//           Authorization: `Bearer ${await getToken()}}`,
//         },
//       });
//       setIsAdmin(data.isAdmin);

//       if (!data.isAdmin && location.pathname.startsWith("/admin")) {
//         navigate("/");
//         toast.error("you are not supposed to access admin dashboard");
//         // Body of this if statement is empty in the image
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const fetchShows = async () => {
//     try {
//       const { data } = await axios.get("/api/show/all");
//       if (data.success) {
//         setShows(data.shows);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const fetchFavoriteMovies = async () => {
//     try {
//       const { data } = await axios.get("/api/user/favorites", {
//         headers: {
//           Authorization: `Bearer ${await getToken()}}`,
//         },
//       });

//       if (data.success) {
//         setFavoriteMovies(data.movies);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     fetchShows();
//   }, []);

//   useEffect(() => {
//     if (user) {
//       fetchIsAdmin();
//       fetchFavoriteMovies();
//     }
//   }, [user]);

//   const value = {
//     axios,
//     fetchIsAdmin,
//     user,
//     getToken,
//     navigate,
//     isAdmin,
//     shows,
//     favoriteMovies,
//     fetchFavoriteMovies,
//     image_base_url,
//   }; // This 'value' object is empty in the image

//   return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
// };

// export const useAppContext = () => useContext(AppContext);
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth, useUser } from "@clerk/clerk-react";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [shows, setShows] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  const image_base_url = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;
  const { user } = useUser();
  const { getToken } = useAuth(); // ✅ FIXED: Correctly extracting getToken
  const location = useLocation();
  const navigate = useNavigate();

  const fetchIsAdmin = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get("/api/admin/is-admin", {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ FIXED: Removed extra }
        },
      });

      setIsAdmin(data.isAdmin);

      if (!data.isAdmin && location.pathname.startsWith("/admin")) {
        navigate("/");
        toast.error("You are not supposed to access admin dashboard");
      }
    } catch (error) {
      console.error("Error checking admin:", error);
    }
  };

  const fetchShows = async () => {
    try {
      const { data } = await axios.get("/api/show/all");
      if (data.success) {
        setShows(data.shows);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching shows:", error);
    }
  };

  const fetchFavoriteMovies = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get("/api/user/favorites", {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ FIXED: Removed extra }
        },
      });

      if (data.success) {
        setFavoriteMovies(data.movies);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  useEffect(() => {
    fetchShows();
  }, []);

  useEffect(() => {
    if (user) {
      fetchIsAdmin();
      fetchFavoriteMovies();
    }
  }, [user]);

  const value = {
    axios,
    fetchIsAdmin,
    user,
    getToken,
    navigate,
    isAdmin,
    shows,
    favoriteMovies,
    fetchFavoriteMovies,
    image_base_url,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
