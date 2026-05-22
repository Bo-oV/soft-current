import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { useCart } from "../../context/useCart";
import { getWarehouses, searchCities } from "../../services/novaPoshta";
import "./CartCheckoutContent.scss";

const CITY_DEBOUNCE_MS = 400;
const DEFAULT_CURRENCY = "грн";

function formatPrice(price, currency = DEFAULT_CURRENCY) {
  return `${price || 0} ${currency}`;
}

function getItemLabel(item) {
  return item.label || item.description || "";
}

function CartDropdown({
  disabled = false,
  emptyText = "",
  items,
  loading = false,
  loadingText = "",
  name,
  onChange,
  onSelect,
  placeholder,
  value,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClick = (event) => {
      if (!dropdownRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);

    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const shouldShowOptions =
    isOpen && !disabled && (loading || items.length > 0 || emptyText);

  return (
    <div className="cart-checkout__dropdown" ref={dropdownRef}>
      <div className="cart-checkout__select-wrap">
        <input
          className="cart-checkout__input cart-checkout__input--select"
          type="text"
          name={name}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete="off"
          onChange={(event) => {
            onChange(event.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
        />
        <ChevronDown
          className="cart-checkout__chevron"
          size={18}
          strokeWidth={1.5}
          aria-hidden="true"
        />
      </div>

      {shouldShowOptions && (
        <div className="cart-checkout__options">
          {loading ? (
            <p className="cart-checkout__option-status">{loadingText}</p>
          ) : items.length > 0 ? (
            items.map((item) => (
              <button
                className="cart-checkout__option"
                type="button"
                key={item.ref || getItemLabel(item)}
                onClick={() => {
                  onSelect(item);
                  setIsOpen(false);
                }}
              >
                <span>{getItemLabel(item)}</span>
                {item.area && (
                  <span className="cart-checkout__option-meta">
                    {item.area}
                  </span>
                )}
              </button>
            ))
          ) : (
            <p className="cart-checkout__option-status">{emptyText}</p>
          )}
        </div>
      )}
    </div>
  );
}

function CartCheckoutContent({ onClose }) {
  const { cartItems, clearCart, removeFromCart, totalPrice } = useCart();
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerComment, setCustomerComment] = useState("");
  const [citySearch, setCitySearch] = useState("");
  const [cityResults, setCityResults] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [warehouses, setWarehouses] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [isLoadingCities, setIsLoadingCities] = useState(false);
  const [isLoadingWarehouses, setIsLoadingWarehouses] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [errors, setErrors] = useState({});
  const currency = cartItems[0]?.currency || DEFAULT_CURRENCY;

  const orderItems = useMemo(
    () =>
      cartItems.map((item) => ({
        id: item.id,
        title: item.title,
        category: item.category,
        selectedSize: item.selectedSize || item.sizes || "",
        quantity: item.quantity || 1,
        price: item.price,
        currency: item.currency || DEFAULT_CURRENCY,
      })),
    [cartItems],
  );

  useEffect(() => {
    const query = citySearch.trim();

    if (query.length < 2 || selectedCity?.description === query) {
      return undefined;
    }

    const timeoutId = window.setTimeout(async () => {
      setIsLoadingCities(true);

      try {
        const items = await searchCities(query);
        setCityResults(items);
      } catch {
        setCityResults([]);
      } finally {
        setIsLoadingCities(false);
      }
    }, CITY_DEBOUNCE_MS);

    return () => window.clearTimeout(timeoutId);
  }, [citySearch, selectedCity]);

  useEffect(() => {
    if (!selectedCity?.ref) {
      return undefined;
    }

    let isActive = true;

    const loadWarehouses = async () => {
      setIsLoadingWarehouses(true);

      try {
        const items = await getWarehouses(selectedCity.ref);

        if (isActive) {
          setWarehouses(items);
        }
      } catch {
        if (isActive) {
          setWarehouses([]);
        }
      } finally {
        if (isActive) {
          setIsLoadingWarehouses(false);
        }
      }
    };

    loadWarehouses();

    return () => {
      isActive = false;
    };
  }, [selectedCity]);

  const resetForm = () => {
    setCustomerName("");
    setCustomerPhone("");
    setCustomerComment("");
    setCitySearch("");
    setCityResults([]);
    setSelectedCity(null);
    setWarehouses([]);
    setSelectedWarehouse(null);
    setErrors({});
  };

  const clearFieldError = (field) => {
    setErrors((currentErrors) => ({
      ...currentErrors,
      [field]: "",
    }));
    setSubmitError("");
    setSubmitSuccess("");
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!customerName.trim()) {
      nextErrors.customerName = "Вкажіть ім'я";
    }

    if (!customerPhone.trim()) {
      nextErrors.customerPhone = "Вкажіть номер телефону";
    }

    if (!selectedCity) {
      nextErrors.deliveryCity = "Оберіть місто зі списку";
    }

    if (!selectedWarehouse) {
      nextErrors.deliveryWarehouse = "Оберіть відділення Нової пошти";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError("");
    setSubmitSuccess("");

    if (cartItems.length === 0 || !validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/.netlify/functions/send-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: orderItems,
          totalPrice,
          customerName: customerName.trim(),
          customerPhone: customerPhone.trim(),
          customerComment: customerComment.trim(),
          deliveryCity: selectedCity.description,
          deliveryCityRef: selectedCity.ref,
          deliveryWarehouse: selectedWarehouse.description,
          deliveryWarehouseRef: selectedWarehouse.ref,
        }),
      });

      if (!response.ok) {
        throw new Error("Order submit failed");
      }

      clearCart();
      resetForm();
      setSubmitSuccess(
        "Замовлення успішно відправлено. Ми скоро зв'яжемося з вами!",
      );
    } catch {
      setSubmitError("Не вдалося відправити замовлення. Спробуйте ще раз.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="cart-checkout">
      <div className="cart-checkout__items">
        {cartItems.length === 0 ? (
          <p className="cart-checkout__empty">Кошик порожній</p>
        ) : (
          cartItems.map((item) => (
            <article className="cart-item" key={item.id}>
              <div className="cart-item__content">
                <h3 className="cart-item__title">{item.title}</h3>
                <p className="cart-item__subtitle">{item.subtitle}</p>
              </div>
              <p className="cart-item__price">
                {formatPrice(item.price, item.currency || DEFAULT_CURRENCY)}
              </p>
              <button
                className="cart-item__remove"
                type="button"
                aria-label="Видалити товар"
                onClick={() => removeFromCart(item.id)}
              >
                <X size={20} strokeWidth={1.5} aria-hidden="true" />
              </button>
            </article>
          ))
        )}
      </div>

      <div className="cart-checkout__checkout">
        <h2 className="cart-checkout__title" id="cart-modal-title">
          Кошик
        </h2>
        <p className="cart-checkout__total">
          <span>Сума до сплати:</span>
          <strong>{formatPrice(totalPrice, currency)}</strong>
        </p>

        <form className="cart-checkout__form" onSubmit={handleSubmit}>
          <label className="cart-checkout__field">
            <input
              className="cart-checkout__input"
              type="text"
              name="customerName"
              value={customerName}
              placeholder="Ім'я"
              onChange={(event) => {
                setCustomerName(event.target.value);
                clearFieldError("customerName");
              }}
            />
            {errors.customerName && (
              <span className="cart-checkout__error">
                {errors.customerName}
              </span>
            )}
          </label>

          <label className="cart-checkout__field">
            <input
              className="cart-checkout__input"
              type="tel"
              name="customerPhone"
              value={customerPhone}
              placeholder="*Номер телефону"
              onChange={(event) => {
                setCustomerPhone(event.target.value);
                clearFieldError("customerPhone");
              }}
            />
            {errors.customerPhone && (
              <span className="cart-checkout__error">
                {errors.customerPhone}
              </span>
            )}
          </label>

          <div className="cart-checkout__field">
            <CartDropdown
              name="deliveryCity"
              items={cityResults}
              value={citySearch}
              placeholder="Оберіть місто доставки"
              loading={isLoadingCities}
              loadingText="Шукаємо місто..."
              emptyText={
                citySearch.trim().length >= 2 ? "Місто не знайдено" : ""
              }
              onChange={(value) => {
                setCitySearch(value);
                setSelectedCity(null);
                setSelectedWarehouse(null);
                setWarehouses([]);
                setCityResults([]);
                clearFieldError("deliveryCity");
              }}
              onSelect={(city) => {
                setSelectedCity(city);
                setCitySearch(city.description);
                setSelectedWarehouse(null);
                setWarehouses([]);
                clearFieldError("deliveryCity");
              }}
            />
            {errors.deliveryCity && (
              <span className="cart-checkout__error">
                {errors.deliveryCity}
              </span>
            )}
          </div>

          <div className="cart-checkout__field">
            <CartDropdown
              disabled={!selectedCity}
              name="deliveryWarehouse"
              items={warehouses}
              value={selectedWarehouse?.description || ""}
              placeholder="Оберіть відділення Нової Пошти"
              loading={isLoadingWarehouses}
              loadingText="Завантажуємо відділення..."
              emptyText={selectedCity ? "Відділення не знайдено" : ""}
              onChange={() => {
                setSelectedWarehouse(null);
                clearFieldError("deliveryWarehouse");
              }}
              onSelect={(warehouse) => {
                setSelectedWarehouse(warehouse);
                clearFieldError("deliveryWarehouse");
              }}
            />
            {errors.deliveryWarehouse && (
              <span className="cart-checkout__error">
                {errors.deliveryWarehouse}
              </span>
            )}
          </div>

          <label className="cart-checkout__field">
            <textarea
              className="cart-checkout__textarea"
              name="customerComment"
              value={customerComment}
              placeholder="Повідомлення"
              onChange={(event) => setCustomerComment(event.target.value)}
            />
          </label>

          <p className="cart-checkout__note">
            * - поля обов'язкові для вводу
          </p>

          {submitSuccess && (
            <p className="cart-checkout__success">{submitSuccess}</p>
          )}

          {submitError && (
            <p className="cart-checkout__submit-error">{submitError}</p>
          )}

          <button
            className="cart-checkout__submit"
            type="submit"
            disabled={cartItems.length === 0 || isSubmitting}
          >
            {isSubmitting ? "Відправляємо..." : "Оформити замовлення"}
          </button>

          {submitSuccess && (
            <button
              className="cart-checkout__close-success"
              type="button"
              onClick={onClose}
            >
              Закрити
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default CartCheckoutContent;
