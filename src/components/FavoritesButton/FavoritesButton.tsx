import { Heart } from "lucide-react";
import "./FavoritesButton.scss";

type FavoritesButtonProps = {
  count: number;
  onClick?: () => void;
};

function FavoritesButton({ count, onClick }: FavoritesButtonProps) {
  return (
    <button
      className="favorites-button"
      type="button"
      aria-label="Відкрити обрані товари"
      onClick={onClick}
    >
      <span className="favorites-button__icon-wrap">
        <Heart
          className="favorites-button__icon"
          color="currentColor"
          size={24}
          strokeWidth={1}
          aria-hidden="true"
        />
        {count > 0 && <span className="favorites-button__counter">{count}</span>}
      </span>
    </button>
  );
}

export default FavoritesButton;
