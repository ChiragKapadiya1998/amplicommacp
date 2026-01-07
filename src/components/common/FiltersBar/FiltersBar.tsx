import { useEffect, useState } from "react";
import Select from "react-select";
import { components } from "react-select";

import "./FiltersBar.css";
import {
  brandData,
  categoryData,
  channelData,
  parentCategoryData,
  SKUData,
  tenantData,
} from "../../../utils/constant";

const selectStyles = {
  control: (base) => ({
    ...base,
    minHeight: 36,
    borderRadius: 8,
    borderColor: "#d1d5db",
    boxShadow: "none",
    fontSize: 14,
    cursor: "pointer",
  }),
};

const MultiValue = (props) => {
  const { index, getValue } = props;
  const selectedValues = getValue();

  // Show only first selected value
  if (index === 0) {
    return <components.MultiValue {...props} />;
  }

  // Show +N for second item only
  if (index === 1) {
    return <div className="multi-count">+{selectedValues.length - 1}</div>;
  }

  // Hide remaining items
  return null;
};

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

    // Example API call
    // axios.post("/api/filters", filtersJson)
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
        <Select
          isMulti
          placeholder="Tenant : Select"
          styles={selectStyles}
          value={tenant}
          onChange={setTenant}
          options={tenantData}
          components={{
            MultiValue,
          }}
        />
        <Select
          isMulti
          placeholder="Brand : Select"
          styles={selectStyles}
          value={brand}
          onChange={setBrand}
          options={brandData}
          components={{
            MultiValue,
          }}
        />
        <Select
          isMulti
          placeholder="Channel : Select"
          styles={selectStyles}
          value={channel}
          onChange={setChannel}
          options={channelData}
          components={{
            MultiValue,
          }}
        />
        <Select
          isMulti
          placeholder="Parent Category : Select"
          styles={selectStyles}
          value={parent}
          onChange={setParent}
          options={parentCategoryData}
          components={{
            MultiValue,
          }}
        />
        <Select
          isMulti
          placeholder="Category : Select"
          styles={selectStyles}
          value={category}
          onChange={setCategory}
          options={categoryData}
          components={{
            MultiValue,
          }}
        />
        <Select
          isMulti
          placeholder="SKU : Select"
          styles={selectStyles}
          value={sku}
          onChange={setSku}
          components={{
            MultiValue,
          }}
          options={SKUData}
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
