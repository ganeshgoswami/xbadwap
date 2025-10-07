"use client";
import { createContext, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const AdminContext = createContext();

export default function AuthAdminProvider({ children }) {
  const [alldata, setAlldata] = useState([]);
  const [admin, setAdmin] = useState(null);
  const [categoryVideo, setCategoryVideo] = useState([]);
  const [categorys, setCategorys] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [message, setMessage] = useState("");
  const [showResultData, setShowResultData] = useState([]);
  const [filterCategoryData, setFilterCategoryData] = useState([]);
  const [viewBigVideo, setViewBigVideo] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [categoriesFirstData, setCategoriesFirstData] = useState([]);
  const [pornstarName, setPornstarName] = useState([]);
  const [pornStars, setPornStars] = useState([]);
  const [pornStarsLoading, setPornStarsLoading] = useState(false);
  const [pornStarsError, setPornStarsError] = useState("");
  const itemsPerPage = 18;
  const [searchCountry, setSearchCountry] = useState(null);

  // Prefer Next.js rewrites to backend; allow override via NEXT_PUBLIC_API_URL
  const apiUrl = useMemo(() => process.env.NEXT_PUBLIC_API_URL ?? "/api", []);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Helpers to read/write query params
  const getPageFromUrl = () => parseInt(searchParams.get("page") || "1", 10);
  const getSearchFromUrl = () => (searchParams.get("Search") || "").trim();

  // CRUD and data functions
  const getPornStars = async () => {
    try {
      setPornStarsLoading(true);
      setPornStarsError("");
      const res = await fetch(`${apiUrl}/pornstars`, { cache: "no-store" });
      const data = await res.json();
      if (res.ok && data?.data) setPornStars(data.data);
      else setPornStarsError(data.message || "Failed to load porn stars");
    } catch (e) {
      setPornStarsError("Network error while loading porn stars");
    } finally {
      setPornStarsLoading(false);
    }
  };

  const allCategorys = async () => {
    try {
      const res = await fetch(`${apiUrl}/allCategorys`, { cache: "no-store" });
      const data = await res.json();
      if (res.ok) setCategorys((data.data || []).slice().reverse());
    } catch (err) {
      console.error("Error fetching All Categorys:", err);
    }
  };

  const allPornstarName = async () => {
    try {
      const res = await fetch(`${apiUrl}/allPornstarName`, { cache: "no-store" });
      const data = await res.json();
      if (res.ok) setPornstarName((data.data || []).slice().reverse());
    } catch (err) {
      console.error("Error fetching All Porn Stars:", err);
    }
  };

  const allCategoriesFirstData = async () => {
    try {
      const res = await fetch(`${apiUrl}/categoryFirstData`, { cache: "no-store" });
      const data = await res.json();
      if (res.ok) setCategoriesFirstData(data.data || []);
      else console.error("API Error:", data.message || "Unknown error");
    } catch (err) {
      console.error("Error fetching all categories:", err.message);
    }
  };

  const getalldata = async (page) => {
    try {
      const res = await fetch(`${apiUrl}/allData?page=${page ?? 1}`, { cache: "no-store" });
      const data = await res.json();
      if (res.ok) {
        setAlldata(data.data || []);
        setTotalPages(data.totalPages || 0);
      }
    } catch (err) {
      console.error("Error fetching All Data:", err);
    }
  };

  const getbigVideo = async (id) => {
    try {
      const res = await fetch(`${apiUrl}/bigvideofind/${id}`);
      const data = await res.json();
      if (res.ok) {
        setViewBigVideo(data.data || null);
        setMessage(data.message || "This Id Data retrieved successfully.");
      } else {
        setMessage(data.message || "Error fetching Category.");
      }
    } catch (error) {
      console.error("Error fetching category:", error);
      setShowResultData([]);
      setMessage("An error occurred while fetching Category.");
    }
  };

  const getreletedData = async (reletedcategory) => {
    try {
      const res = await fetch(`${apiUrl}/findrelatedData/${reletedcategory}`);
      const data = await res.json();
      if (res.ok) {
        setShowResultData(data.data || []);
        setTotalPages(data.totalPages || 1);
        setMessage(data.message || "Category retrieved successfully.");
      } else {
        setShowResultData([]);
        setMessage(data.message || "Error fetching Category.");
      }
    } catch (error) {
      console.error("Error fetching category:", error);
      setShowResultData([]);
      setMessage("An error occurred while fetching Category.");
    }
  };

  const seprateCategory = async (category, page) => {
    try {
      if (!category || typeof category !== "string") {
        await getalldata(page || 1);
        setFilterCategoryData([]);
        return;
      }
      const u = category.replace(/(^\w|[\s-]\w)/g, (m) => m.toUpperCase());
      const res = await fetch(`${apiUrl}/seprateCate?category=${u}&page=${page || 1}`);
      const data = await res.json();
      if (res.ok) {
        setFilterCategoryData(data.data || []);
        setTotalPages(data.totalPages || 1);
        setMessage(data.message || "Category retrieved successfully.");
      } else {
        setShowResultData([]);
        setMessage(data.message || "Error fetching Saprate Category.");
      }
    } catch (error) {
      console.error("Error fetching category:", error);
      setFilterCategoryData([]);
      setMessage("An error occurred while fetching Category.");
    }
  };

  const addVdata = async (vdata, setItems) => {
    try {
      const res = await fetch(`${apiUrl}/addCollection`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(vdata),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to add data");
      if (data?.data?._id) {
        if (setItems) setItems((prev) => [data.data, ...prev]);
        return data;
      }
      throw new Error("Data not added - possible duplicate");
    } catch (err) {
      console.error("Error adding data:", err);
      throw err;
    }
  };

  const deletedata = async (id) => {
    try {
      const res = await fetch(`${apiUrl}/deleteVideo/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      await getalldata(currentPage);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const edit = async (id, formData) => {
    try {
      const res = await fetch(`${apiUrl}/editData/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update data");
      await getalldata(currentPage);
      return data;
    } catch (error) {
      console.error("Error updating data:", error);
      throw error;
    }
  };

  const handleViewsCount = async (videoId) => {
    try {
      const res = await fetch(`${apiUrl}/viewsUpdate/${videoId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoId }),
      });
      if (!res.ok) throw new Error(`Failed to update Views: ${res.statusText}`);
      await getalldata(currentPage);
    } catch (err) {
      console.error("Error Updating views:", err);
    }
  };

  const searchData = async (query, page) => {
    try {
      const res = await fetch(`${apiUrl}/searchData?query=${encodeURIComponent(query)}&page=${page || 1}`);
      const result = await res.json();
      if (res.ok) {
        setAlldata(result.data || []);
        setTotalPages(result.totalPages || 0);
      } else {
        console.error("Error fetching search results:", result.message);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const modelSearch = async (model, page = 1) => {
    if (!model) {
      setShowResultData([]);
      return;
    }
    try {
      const formatted = model.replace(/(^\w|[\s-]\w)/g, (m) => m.toUpperCase());
      const modelParam = typeof formatted === "object" ? JSON.stringify(formatted) : formatted;
      const res = await fetch(`${apiUrl}/findOneModelStar?model=${encodeURIComponent(modelParam)}&page=${page}`);
      const data = await res.json();
      if (res.ok) {
        setShowResultData(data.data || []);
        setTotalPages(data.totalPages || 1);
        setViewBigVideo(data.idBaseData || null);
        setMessage(data.message || "Model retrieved successfully.");
      } else {
        setShowResultData([]);
        setMessage(data.message || "Error fetching Models.");
      }
    } catch (error) {
      setShowResultData([]);
      setMessage("An error occurred while fetching Models.");
    }
  };

  const categorySection = async () => {
    try {
      const res = await fetch(`${apiUrl}/categorysection`);
      const data = await res.json();
      if (res.ok) setCategoryVideo(data.data || []);
    } catch (err) {
      console.error("Error fetching All Data:", err);
    }
  };

  const createSlug = (text) => (text ? text.replace(/\s+/g, "-") : text);

  // Effects
  useEffect(() => {
    allCategoriesFirstData();
    allPornstarName();
    getPornStars();
    allCategorys();
    categorySection();
    if (typeof window !== "undefined") setAdmin(localStorage.getItem("adminlogin"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const page = getPageFromUrl();
    const q = getSearchFromUrl();
    setCurrentPage(page);
    if (q) {
      setInputValue(q);
      searchData(q, page);
    } else {
      getalldata(page);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams]);

  useEffect(() => {
    if (viewBigVideo && viewBigVideo.Category) {
      getreletedData(viewBigVideo.Category);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewBigVideo?.Category]);

  const value = {
    addVdata,
    alldata,
    deletedata,
    edit,
    admin,
    setAdmin,
    getalldata,
    handleViewsCount,
    searchCountry,
    setSearchCountry,
    viewBigVideo,
    showResultData,
    seprateCategory,
    filterCategoryData,
    categorys,
    currentPage,
    totalPages,
    itemsPerPage,
    createSlug,
    searchData,
    inputValue,
    categoryVideo,
    setInputValue,
    modelSearch,
    setCurrentPage,
    getbigVideo,
    getreletedData,
    categoriesFirstData,
    pornstarName,
    pornStars,
    pornStarsLoading,
    pornStarsError,
    getPornStars,
    message,
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}
