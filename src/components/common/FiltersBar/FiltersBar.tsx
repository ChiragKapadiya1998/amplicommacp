import { useState, useMemo, useRef, useEffect } from "react";
import Select, { components } from "react-select";
import { FaSearch } from "react-icons/fa";
import "./FiltersBar.css";
import constantData from "../../../utils/constant.json";
import FilterDropdown from "./FilterDropdown";

// Safely access data or default to empty arrays
const {
  brandData = [],
  categoryData = [],
  channelData = [],
  parentCategoryData = [],
  SKUData = [],
  tenantData = [],
} = constantData || {};

export default function FiltersBar() {
  const [tenant, setTenant] = useState([]);
  const [brand, setBrand] = useState([]);
  const [channel, setChannel] = useState([]);
  const [parent, setParent] = useState([]);
  const [category, setCategory] = useState([]);
  const [sku, setSku] = useState([]);

  const handleApplyFilters = () => {
    const filtersJson = {
      tenant: tenant.map((t) => t.value),
      brand: brand.map((b) => b.value),
      channel: channel.map((c) => c.value),
      parent: parent.map((p) => p.value),
      category: category.map((c) => c.value),
      sku: sku.map((s) => s.value),
    };

    console.log("Applied Filters JSON:", filtersJson);
  };

  const hasFiltersSelected =
    tenant.length ||
    brand.length ||
    channel.length ||
    parent.length ||
    category.length ||
    sku.length;

  return (
    <div className="filters-container">
      <div className="filters-left">
        <FilterDropdown
          label="Tenant"
          options={tenantData}
          value={tenant}
          onChange={setTenant}
        />
        <FilterDropdown
          label="Brand"
          options={brandData}
          value={brand}
          onChange={setBrand}
        />
        <FilterDropdown
          label="Channel"
          options={channelData}
          value={channel}
          onChange={setChannel}
        />
        <FilterDropdown
          label="Parent Category"
          options={parentCategoryData}
          value={parent}
          onChange={setParent}
        />
        <FilterDropdown
          label="Category"
          options={categoryData}
          value={category}
          onChange={setCategory}
        />
        <FilterDropdown
          label="SKU"
          options={SKUData}
          value={sku}
          onChange={setSku}
        />
      </div>

      <div className="filters-right">
        <button
          className={`apply-btn ${hasFiltersSelected ? "active" : ""}`}
          disabled={!hasFiltersSelected}
          onClick={handleApplyFilters}
        >
          Apply Filters
        </button>

        <button
          className="clear-btn"
          onClick={() => {
            setTenant([]);
            setBrand([]);
            setChannel([]);
            setParent([]);
            setCategory([]);
            setSku([]);
          }}
        >
          Clear All
        </button>
      </div>
    </div>
  );
}
