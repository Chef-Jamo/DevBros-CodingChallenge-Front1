import React, { useEffect, useState } from "react";
import { fetchBikes } from "../Services/BikeService";
import "../Components/Styles/bikes-table-style.css";
import { Bike } from "../Models/Bike";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSortUp,
  faSortDown,
  faSort,
} from "@fortawesome/free-solid-svg-icons";

type SortConfig = {
  key: keyof Bike | null;
  direction: "ascending" | "descending";
};

export default function DisplayBikes() {
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: "ascending",
  });
  const [searchQuery, setSearchQuery] = useState<string>("");

  const getBikes = async () => {
    try {
      const data = await fetchBikes();
      setBikes(data);
    } catch (error) {
      alert("Failed to fetch bikes data");
    }
  };

  useEffect(() => {
    getBikes();
  }, []);

  const handleButtonClick = () => {
    setSearchQuery("");
  };

  const sortData = (key: keyof Bike) => {
    let direction: "ascending" | "descending" = "ascending";

    // If the current sort key is the same as the new key and the direction is ascending, toggle to descending
    if (sortConfig.key === key) {
      direction =
        sortConfig.direction === "ascending" ? "descending" : "ascending";
    }

    // Update the sort configuration
    setSortConfig({ key, direction });

    // Sort the bikes based on the new direction
    setBikes((prevBikes) => {
      return [...prevBikes].sort((a, b) => {
        if (a[key] < b[key]) {
          return direction === "ascending" ? -1 : 1;
        }
        if (a[key] > b[key]) {
          return direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    });
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredBikes = bikes.filter((bike) =>
    Object.values(bike).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const getSortingIcon = (key: keyof Bike) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "ascending" ? faSortUp : faSortDown;
    }
    return faSort;
  };

  return (
    <div className='bikes-table-container'>
      <h1>Bike List</h1>
      <div className='bike-table-toolbar'>
        <input
          type='text'
          placeholder='Search...'
          value={searchQuery}
          onChange={handleSearch}
        />
        <Button onClick={handleButtonClick} />
      </div>
      <table className='bikes-table'>
        <tr>
          <th onClick={() => sortData("Make")}>
            <span>Make</span>
            <FontAwesomeIcon icon={getSortingIcon("Make")} />
          </th>
          <th onClick={() => sortData("Model")}>
            <span>Model</span>
            <FontAwesomeIcon icon={getSortingIcon("Model")} />
          </th>
          <th onClick={() => sortData("Year")}>
            <span>Year</span>
            <FontAwesomeIcon icon={getSortingIcon("Year")} />
          </th>
          <th onClick={() => sortData("Displacement")}>
            <span>Displacement</span>
            <FontAwesomeIcon icon={getSortingIcon("Displacement")} />
          </th>
          <th onClick={() => sortData("Price")}>
            <span>Price</span>
            <FontAwesomeIcon icon={getSortingIcon("Price")} />
          </th>
          <th onClick={() => sortData("Terrain")}>
            <span>Terrain</span>
            <FontAwesomeIcon icon={getSortingIcon("Terrain")} />
          </th>
          <th>Description</th>
        </tr>
        {filteredBikes.map((bike) => (
          <tr key={bike.BikeID}>
            <td>{bike.Make}</td>
            <td>{bike.Model}</td>
            <td>{bike.Year}</td>
            <td>{bike.Displacement}</td>
            <td>{bike.Price}</td>
            <td>{bike.Terrain}</td>
            <td>{bike.Description}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}
