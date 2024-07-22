import { Bike } from "../Models/Bike";

export const fetchBikes = async (): Promise<Bike[]> => {
  const response = await fetch("/Data/bikes_response.json");
  if (!response.ok) {
    throw new Error("Failed to fetch bikes data");
  }
  const data = await response.json();
  return data;
};
