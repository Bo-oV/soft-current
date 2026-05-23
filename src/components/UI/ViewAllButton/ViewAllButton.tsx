import type { MouseEventHandler, ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import "./ViewAllButton.scss";

type ViewAllButtonProps = {
  children: ReactNode;
  isExpanded?: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

function ViewAllButton({
  children,
  isExpanded = false,
  onClick,
}: ViewAllButtonProps) {
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
