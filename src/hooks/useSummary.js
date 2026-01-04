import axiosInstance from "../utils/axiosinstance";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

export const useSummary = () => {
  const [summaries, setSummaries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [titles, setTitles] = useState([]);

  const fetchSummaries= async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/summary/get-summaries');
      setSummaries(response.data.data || []);
      // console.log("Fetched summaries:", response.data.data);
    } catch (err) {
      console.error("Error fetching summaries:", err);
      setError(err?.response?.data?.message || 'Failed to fetch summaries');
      toast.error('Failed to fetch summaries');
    } finally {
      setLoading(false);
    }
  };
useEffect(() => {
  setTitles(summaries.map(s => s.title));
}, [summaries]);
  
   const getSummary = (id) => {
    return summaries.find(summary => summary._id === id);
  };

  const updateTitle = async (id, newTitle) => {
    const res = await axiosInstance.put(`/summary/${id}/title`, { title: newTitle });
    console.log("Update title response:", res.data);
    if (res.data.data) {
      setSummaries(prev => prev.map(summary => 
        summary._id === id ? { ...summary, title: newTitle } : summary
      ));
    }
  };

  return { summaries, loading, error, fetchSummaries, titles, setTitles, getSummary, updateTitle };
};