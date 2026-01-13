import { useState, useMemo, memo } from "react";
import Select, { components } from "react-select";
import { FaSearch } from "react-icons/fa";
import "./FiltersBar.css";

// Styles for React Select
const selectStyles = {
  control: (base: any) => ({
    ...base,
    minHeight: 36,
    borderRadius: 8,
    borderColor: "#d1d5db",
    boxShadow: "none",
    fontSize: 14,
    cursor: "pointer",
    backgroundColor: "#ffffff",
  }),
  menu: (base: any) => ({
    ...base,
    borderRadius: 8,
    overflow: "hidden", // Rounded corners for the container
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    zIndex: 9999,
    padding: 0,
    width: "100%",
  }),
  menuList: (base: any) => ({
    ...base,
    padding: 0,
    maxHeight: "250px",
    // CRITICAL: We must disable the default react-select scroll behavior (maxHeight)
    // so that our custom ".dropdown-list-container" can handle scrolling
    // while keeping the Header and Footer sticky/fixed.
    // maxHeight: "initial", 
    // overflow: "hidden", 
  }),
  option: (base: any, state: any) => ({
    ...base,
    backgroundColor: state.isFocused ? "#fff7ed" : "white",
    color: "#374151",
    cursor: "pointer",
    padding: "8px 12px",
    fontSize: "14px",
    ":active": {
      backgroundColor: "#fff7ed",
    },
  }),
  multiValue: (base: any) => ({
    ...base,
    backgroundColor: "transparent",
    margin: 0,
    padding: 0,
  }),
  multiValueLabel: (base: any) => ({
    ...base,
    color: "#374151",
    padding: 0,
    paddingRight: 3,
  }),
  multiValueRemove: () => ({
    display: "none",
  }),
  dropdownIndicator: (base: any) => ({
    ...base,
    padding: "8px",
    color: "#9ca3af",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  valueContainer: (base: any) => ({
    ...base,
    padding: "2px 8px",
  }),
};

const MultiValue = (props: any) => {
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

// Custom MenuList Component
const CustomMenuList = (props: any) => {
  const { selectProps, children, getValue, setValue, ...restProps } = props;
  // const onSearchChange = selectProps?.onSearchChange;
  // const searchTerm = selectProps?.searchTerm || "";

  // Get filtered options from selectProps
  const filteredOptions = selectProps?.options || [];
  const selectedValues = getValue();

  // "Select All" Logic
  const isAllSelected =
    filteredOptions.length > 0 &&
    filteredOptions.every((opt: any) =>
      selectedValues.some((val: any) => val.value === opt.value)
    );

  const handleSelectAll = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    if (isAllSelected) {
      // Deselect all filtered options
      const newValues = selectedValues.filter(
        (val: any) => !filteredOptions.some((opt: any) => opt.value === val.value)
      );
      setValue(newValues);
    } else {
      // Select all filtered options
      const newValues = [...selectedValues];
      filteredOptions.forEach((opt: any) => {
        if (!newValues.some((val: any) => val.value === opt.value)) {
          newValues.push(opt);
        }
      });
      setValue(newValues);
    }
  };

  const handleClearSelection = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setValue([]);
  };

  // Prevent wrapping issues by passing children=null to components.MenuList,
  // then rendering our structure as its children.
  return (
    <components.MenuList {...restProps} selectProps={selectProps} getValue={getValue} setValue={setValue}>
      {/* <div className="dropdown-search-container">
        <input
          className="dropdown-search-input"
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
          autoFocus={false}
          // Stop propagation to prevent menu closing or weird focus behavior
          onKeyDown={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
        />
      </div> */}

      <div className="dropdown-select-all" onClick={handleSelectAll}>
        <input
          type="checkbox"
          checked={isAllSelected}
          readOnly
          className="dropdown-checkbox"
        />
        <span className="dropdown-item-label">Select All</span>
      </div>

      <div className="dropdown-list-container">
        {children}
        {(!children || (Array.isArray(children) && children.length === 0)) && (
          <div style={{ padding: '8px 12px', color: '#9ca3af', textAlign: 'center' }}>
            No options found
          </div>
        )}
      </div>

      <div className="dropdown-footer">
        <button className="dropdown-clear-btn" onClick={handleClearSelection}>
          Clear Selection
        </button>
      </div>
    </components.MenuList>
  );
};

// Custom Option Component
const CustomOption = (props: any) => {
  const { isSelected, label, data } = props;
  const optionLabel = data?.label || label || props.children;

  return (
    <components.Option {...props}>
      <div className="dropdown-option-row">
        <input
          type="checkbox"
          checked={isSelected}
          readOnly
          className="dropdown-checkbox"
        />
        <span className="dropdown-item-label">{optionLabel}</span>
      </div>
    </components.Option>
  );
};

const CustomDropdownIndicator = (props: any) => (
  <components.DropdownIndicator {...props}>
    <FaSearch size={14} />
  </components.DropdownIndicator>
);

const customComponents = {
  MenuList: CustomMenuList,
  Option: CustomOption,
  MultiValue,
  DropdownIndicator: CustomDropdownIndicator,
};

// Reusable FilterDropdown Component
const FilterDropdown = ({ label, options = [], value, onChange }: any) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOptions = useMemo(() => {
    if (!searchTerm) return options;
    return options.filter((opt: any) =>
      opt.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [options, searchTerm]);

  return (
    <Select
      isMulti
      placeholder={`${label} : Select`}
      styles={selectStyles}
      value={value}
      onChange={onChange}
      options={filteredOptions}
      closeMenuOnSelect={false}
      hideSelectedOptions={false}
      // isSearchable={false} 
      onMenuClose={() => setSearchTerm("")}
      components={customComponents}
      // Pass custom props via Select to access them in MenuList via selectProps
      // @ts-ignore
      onSearchChange={setSearchTerm}
      searchTerm={searchTerm}
    />
  );
};

export default memo(FilterDropdown);