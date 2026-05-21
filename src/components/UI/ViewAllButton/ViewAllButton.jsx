import { ChevronDown } from "lucide-react";
import "./ViewAllButton.scss";

function ViewAllButton({ children, isExpanded = false, onClick }) {
  return (
    <button
      className={`view-all-button ${isExpanded ? "view-all-button--expanded" : ""}`}
      type="button"
      aria-expanded={isExpanded}
      onClick={onClick}
    >
      <span className="view-all-button__text">{children}</span>
      <ChevronDown
        className="view-all-button__icon"
        size={24}
        strokeWidth={1.5}
        aria-hidden="true"
      />
    </button>
  );
}

export default ViewAllButton;
