import { FaAngleDown } from "react-icons/fa6";
import "./Header.css";
import { useRef, useState } from "react";
import DateRangePicker from "rsuite/DateRangePicker";

export default function Header() {
  const [active, setActive] = useState("1D");
  const [openPicker, setOpenPicker] = useState(false);
  const [openPicker1, setOpenPicker1] = useState(false);
  const [customRange, setCustomRange] = useState(null);
  const [customRange1, setCustomRange1] = useState(null);
  const datePickerRef = useRef(null);

  const PERIODS = ["1D", "1W", "1M", "6M", "1Y", "Select Period"];

  const formatDate = (date) =>
    date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });

  const getDateRange = (period, customRange = {}) => {
    const today = new Date();
    let startDate = new Date(today);

    switch (period) {
      case "1D":
        startDate = new Date(today);
        break;

      case "1W":
        startDate.setDate(today.getDate() - 6);
        break;

      case "1M":
        startDate.setMonth(today.getMonth() - 1);
        break;

      case "6M":
        startDate.setMonth(today.getMonth() - 6);
        break;

      case "1Y":
        startDate.setFullYear(today.getFullYear() - 1);
        break;

      case "Select Period":
        if (customRange.start && customRange.end) {
          return `${formatDate(customRange.start)} – ${formatDate(
            customRange.end
          )}`;
        }
        return "";

      default:
        return "";
    }

    return `${formatDate(startDate)} – ${formatDate(today)}`;
  };

  const handlePeriodClick = (item) => {
    setActive(item);

    if (item === "Select Period") {
      setOpenPicker(true);
    } else {
      setOpenPicker(false);
      setCustomRange(null);
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Left Section */}
        <div className="header-left">
          <img
            className="logo"
            src="https://img.freepik.com/free-vector/logo-with-shape-3d_1043-51.jpg?t=st=1767846251~exp=1767849851~hmac=d418669011df025853a24dcc3401a5879de64b9b2ca217d097ee482d0cbf2ced&w=2000"
            // src="https://app-stage.amplicommacp.com/assets/assets/amplicommlogo.c57c1180cfce1ec88045b3288b068bb0.svg?platform=web&hash=c57c1180cfce1ec88045b3288b068bb0"
            alt="Amplicomm"
          />
          <h1 className="title">Home</h1>
        </div>
        <div className="header-center">
          {/* Center Section */}
          <div className="header-center">
            <div className="period-main">
              <div className="period-buttons">
                {PERIODS.map((item) => {
                  return (
                    <button
                      key={item}
                      className={`period-btn ${
                        item == "Select Period"
                          ? active === item
                            ? "select"
                            : ""
                          : active === item
                          ? "active"
                          : ""
                      }`}
                      onClick={() => handlePeriodClick(item)}
                    >
                      <div>
                        <p
                          className={`${
                            active === item ? "compare-label" : ""
                          }`}
                        >
                          {item}
                        </p>

                        {active === item &&
                          (item == "Select Period" ? (
                            <div className="date-picker-wrapper">
                              <DateRangePicker
                                ref={datePickerRef}
                                open={openPicker}
                                appearance={"default"}
                                plaintext
                                style={{ color: "#f97316" }}
                                size="sm"
                                w={240}
                                showHeader={false}
                                defaultValue={[new Date(), new Date()]}
                                onChange={(value, event) => {
                                  setCustomRange(value);
                                  setOpenPicker(false);
                                }}
                                onOk={(value) => {
                                  setCustomRange(value);
                                  setOpenPicker(false);
                                }}
                                placement="bottomEnd"
                                container={() => document.body}
                                onClose={() => {
                                  setOpenPicker(false);
                                }}
                              />
                            </div>
                          ) : (
                            <span className="compare-date">
                              {getDateRange(item, {
                                start: new Date(),
                                end: new Date(),
                              })}
                            </span>
                          ))}
                      </div>

                      {item == "Select Period" && (
                        <FaAngleDown height={10} width={10} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="compare-main">
              <div className="compare-box1">
                <div className="compare-box">
                  <p className="compare-label">Compare Period</p>
                  <div className="compare-date-row">
                    <div className="date-picker-wrapper">
                      <DateRangePicker
                        open={openPicker1}
                        appearance
                        plaintext
                        character={"-"}
                        color={"red"}
                        size="sm"
                        w={240}
                        style={{ color: "#f97316" }}
                        showHeader={false}
                        defaultValue={[new Date(), new Date()]}
                        onChange={(value) => {
                          setCustomRange1(value);
                          setOpenPicker1(false);
                        }}
                        placement="bottomEnd"
                        container={() => document.body}
                        onClose={() => setOpenPicker1(false)}
                      />
                    </div>
                  </div>
                </div>
                <FaAngleDown
                  height={10}
                  width={10}
                  onClick={() => setOpenPicker1((prev) => !prev)}
                />
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="header-right">
            <div className="avatar">A</div>
            <span className="username">Admin</span>
            <FaAngleDown />
          </div>
        </div>
      </div>
    </header>
  );
}
