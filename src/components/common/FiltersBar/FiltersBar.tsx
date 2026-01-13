import { useState, memo } from "react";
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

function FiltersBar() {
  const [tenant, setTenant] = useState<any[]>([]);
  const [brand, setBrand] = useState<any[]>([]);
  const [channel, setChannel] = useState<any[]>([]);
  const [parent, setParent] = useState<any[]>([]);
  const [category, setCategory] = useState<any[]>([]);
  const [sku, setSku] = useState<any[]>([]);

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

export default memo(FiltersBar);
