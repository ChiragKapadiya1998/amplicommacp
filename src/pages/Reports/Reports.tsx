import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import "./Reports.css";

interface LeafItem {
  id: string;
  label: string;
}

interface SubMenuItem {
  id: string;
  label: string;
  items?: LeafItem[];
}

interface MenuItem {
  id: string;
  label: string;
  subItems?: SubMenuItem[];
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: "sales",
    label: "Sales",
    subItems: [
      {
        id: "seller",
        label: "Seller",
        items: [
          { id: "d2c", label: "D2C & Marketplace GMV" },
          { id: "business", label: "Business Overview" },
          { id: "sales_overview", label: "Sales Overview" },
        ],
      },
      {
        id: "primary",
        label: "Primary",
        items: [{ id: "qc_partner", label: "QC & Partner GMV" }],
      },
      { id: "secondary", label: "Secondary", items: [{ id: "qc_partner", label: "QC & Partner GMV" }], },
    ],
  },
  {
    id: "marketing",
    label: "Marketing",
    subItems: [
      {
        id: "marketplace",
        label: "Marketplace",
        items: [
          { id: "Channel Spend", label: "Channel Spend" },
          { id: "Campaign Analysis", label: "Campaign Analysis" },
        ],
      },
      {
        id: "D2C",
        label: "D2C",
        items: [{ id: "Channel Spend", label: "Channel Spend" },
        { id: "Campaign Analysis", label: "Campaign Analysis" },],
      },
      { id: "Quick Commerce", label: "Quick Commerce", items: [{ id: "Channel Spend", label: "Channel Spend" }], },
    ],
  },
  {
    id: "inventory",
    label: "Inventory",
    subItems: [{
      id: "D2C",
      label: "D2C",
      items: [{ id: "Channel Spend", label: "Channel Spend" },
      { id: "Campaign Analysis", label: "Campaign Analysis" },],
    },
    { id: "Quick Commerce", label: "Quick Commerce", items: [{ id: "Channel Spend", label: "Channel Spend" }], },],
  },
  {
    id: "fulfillment",
    label: "Fulfillment",
    subItems: [{
      id: "D2C",
      label: "D2C",
      items: [{ id: "Channel Spend", label: "Channel Spend" },
      { id: "Campaign Analysis", label: "Campaign Analysis" },],
    },
    { id: "Quick Commerce", label: "Quick Commerce", items: [{ id: "Channel Spend", label: "Channel Spend" }], },],
  },
];

export default function Reports() {
  // Expanded ID for top-level menu (Sales, Marketing, etc.)
  const [expandedId, setExpandedId] = useState<string | null>("sales");

  // Expanded ID for sub-menu items (Seller, Primary, etc.)
  // We can track this separately. Initialized to 'seller' as per requirement.
  const [expandedSubId, setExpandedSubId] = useState<string | null>("primary");

  const toggleSection = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const toggleSubSection = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedSubId(expandedSubId === id ? null : id);
  };

  return (
    <div className="reports-container">
      {/* Secondary Sidebar */}
      <div className="secondary-sidebar">
        {MENU_ITEMS.map((item) => {
          const isExpanded = expandedId === item.id;
          return (
            <div
              key={item.id}
              className={`menu-item ${isExpanded ? "active" : ""}`}
            >
              <div
                className="menu-header"
                onClick={() => toggleSection(item.id)}
              >
                <span>{item.label}</span>
                <span className="arrow-icon">
                  {isExpanded ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </span>
              </div>
              {isExpanded && item.subItems && item.subItems.length > 0 && (
                <div className="submenu">
                  {item.subItems.map((sub) => {
                    const isSubExpanded = expandedSubId === sub.id;
                    const hasChildren = sub.items && sub.items.length > 0;

                    return (
                      <div key={sub.id} className="submenu-wrapper">
                        <div
                          className={`submenu-item ${isSubExpanded ? "active" : ""
                            }`}
                          onClick={(e) => {
                            if (hasChildren) {
                              toggleSubSection(sub.id, e);
                            }
                          }}
                          style={{
                            cursor: hasChildren ? "pointer" : "default",
                          }}
                        >
                          <span className="submenu-label">{sub.label}</span>
                          {hasChildren && (
                            <span className="submenu-icon">
                              {isSubExpanded ? (
                                <IoIosArrowUp />
                              ) : (
                                <IoIosArrowDown />
                              )}
                            </span>
                          )}
                          {!hasChildren && (
                            <IoIosArrowDown className="submenu-icon" />
                          )}
                        </div>

                        {/* Level 3 items */}
                        {isSubExpanded && hasChildren && (
                          <div className="level3-menu">
                            {sub.items!.map((leaf) => (
                              <div key={leaf.id} className="level3-item">
                                <span className="bullet">•</span>
                                <span>{leaf.label}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Main Content Area */}
      <div className="reports-content">
        {/* Placeholder content */}
      </div>
    </div>
  );
}
