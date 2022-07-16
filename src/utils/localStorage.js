import { MotionValue } from "framer-motion";

export const getLocalData = (key) => {
  if (key) {
    const data = localStorage.getItem(key);
    return data;
  }
};

export const saveData = (key, value) => {
  if (key && value) {
    localStorage.setItem(key, value);
  }
};

export const del = (key) => {
  if (key) {
    localStorage.removeItem(key);
  }
};
