import {topicService} from "../services/blogService";
import { useState, useEffect } from "react";


const CategoryFilter = ({ selected, onSelect }) => {

  const [categories, setCategories] = useState(["All"]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await topicService.getAllTopics();
        const topicNames = response.data.map(topic => topic.topic);
        setCategories(["All", ...topicNames]);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="flex space-x-4 mt-6 mb-6">
      {categories.map(cat => (
        <button
          key={cat}
          className={`px-2 py-1 rounded-full text-xs font-sm ${
            selected === cat ? "bg-black text-white" : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => onSelect(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
