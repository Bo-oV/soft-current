import type { ReactNode } from "react";
import "./SectionTitle.scss";

type SectionTitleProps = {
  children: ReactNode;
  className?: string;
};

function SectionTitle({ children, className = "" }: SectionTitleProps) {
  const titleClassName = ["section-title", className].filter(Boolean).join(" ");

  return (
    <div className={titleClassName}>
      <h2 className="section-title__text">{children}</h2>
      <img
        className="section-title__decor"
        src="/images/h1_bottom.svg"
        alt=""
        aria-hidden="true"
      />
    </div>
  );
}

export default SectionTitle;
