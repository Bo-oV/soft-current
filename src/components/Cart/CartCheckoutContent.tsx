import type { ChangeEvent, FocusEvent, FormEvent, KeyboardEvent } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, X } from "lucide-react";
import Button from "../UI/Button/Button";
import { useCart } from "../../context/useCart";
import { getWarehouses, searchCities } from "../../services/novaPoshta";
import type { NovaPoshtaCity, NovaPoshtaWarehouse } from "../../types/novaPoshta";
import "./CartCheckoutContent.scss";

const CITY_DEBOUNCE_MS = 400;
const PHONE_PREFIX = "+380";
const PHONE_PREFIX_LENGTH = PHONE_PREFIX.length;
const DEFAULT_CURRENCY = "грн";

type CheckoutErrors = Partial<
  Record<
    "customerName" | "customerPhone" | "deliveryCity" | "deliveryWarehouse",
    string
  >
>;
type CheckoutInvalidFields = Partial<
  Record<
    "customerName" | "customerPhone" | "deliveryCity" | "deliveryWarehouse",
    boolean
  >
>;

type CartDropdownItem = NovaPoshtaCity | NovaPoshtaWarehouse;

type CartDropdownProps<TItem extends CartDropdownItem> = {
  disabled?: boolean;
  emptyText?: string;
  isInvalid?: boolean;
  items: TItem[];
  loading?: boolean;
  loadingText?: string;
  name: string;
  onChange: (value: string) => void;
  onSelect: (item: TItem) => void;
  placeholder: string;
  validationAttempt?: number;
  value: string;
};

type CartCheckoutContentProps = {
  onClose: () => void;
  onOrderSuccess?: () => void;
};

function formatPrice(price: number, currency = DEFAULT_CURRENCY): string {
  return `${price || 0} ${currency}`;
}

function getItemLabel(item: CartDropdownItem): string {
  return item.label || item.description || "";
}

function getPhoneDigits(phone: string): string {
  return phone.replace(/\D/g, "");
}

function isPhoneEmpty(phone: string): boolean {
  return getPhoneDigits(phone).length <= 3;
}

function isPhoneValid(phone: string): boolean {
  return /^380\d{9}$/.test(getPhoneDigits(phone));
}

function normalizePhoneValue(phone: string): string {
  const digits = getPhoneDigits(phone);
  const localDigits = digits.startsWith("380") ? digits.slice(3) : digits;

  return `${PHONE_PREFIX}${localDigits.slice(0, 9)}`;
}

function CartDropdown<TItem extends CartDropdownItem>({
  disabled = false,
  emptyText = "",
  isInvalid = false,
  items,
  loading = false,
  loadingText = "",
  name,
  onChange,
  onSelect,
  placeholder,
  validationAttempt = 0,
  value,
}: CartDropdownProps<TItem>) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node | null)) {
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
          className={[
            "cart-checkout__input",
            "cart-checkout__input--select",
            isInvalid ? "cart-checkout__input--invalid" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          key={`${name}-${validationAttempt}`}
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
                {"area" in item && item.area && (
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

function CartCheckoutContent({
  onClose,
  onOrderSuccess,
}: CartCheckoutContentProps) {
  const { cartItems, clearCart, removeFromCart, totalPrice } = useCart();
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerComment, setCustomerComment] = useState("");
  const [citySearch, setCitySearch] = useState("");
  const [cityResults, setCityResults] = useState<NovaPoshtaCity[]>([]);
  const [selectedCity, setSelectedCity] = useState<NovaPoshtaCity | null>(null);
  const [warehouses, setWarehouses] = useState<NovaPoshtaWarehouse[]>([]);
  const [selectedWarehouse, setSelectedWarehouse] =
    useState<NovaPoshtaWarehouse | null>(null);
  const [isLoadingCities, setIsLoadingCities] = useState(false);
  const [isLoadingWarehouses, setIsLoadingWarehouses] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [errors, setErrors] = useState<CheckoutErrors>({});
  const [invalidFields, setInvalidFields] = useState<CheckoutInvalidFields>({});
  const [validationAttempt, setValidationAttempt] = useState(0);
  const currency = cartItems[0]?.currency || DEFAULT_CURRENCY;

  const orderItems = useMemo(
    () =>
      cartItems.map((item) => ({
        id: item.id,
        title: item.title,
        subtitle: item.subtitle,
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
    setInvalidFields({});
    setValidationAttempt(0);
    setSubmitError("");
  };

  const clearFieldError = (field: keyof CheckoutErrors) => {
    setErrors((currentErrors) => ({
      ...currentErrors,
      [field]: "",
    }));
    setInvalidFields((currentFields) => ({
      ...currentFields,
      [field]: false,
    }));
    setSubmitError("");
  };

  const validateForm = () => {
    const nextErrors: CheckoutErrors = {};

    if (!customerName.trim()) {
      nextErrors.customerName = "Вкажіть ім'я";
    }

    if (isPhoneEmpty(customerPhone)) {
      nextErrors.customerPhone = "Вкажіть номер телефону";
    } else if (!isPhoneValid(customerPhone)) {
      nextErrors.customerPhone = "Введіть коректний номер телефону у форматі +380XXXXXXXXX";
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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError("");

    const isFormValid = validateForm();

    if (!isFormValid) {
      setInvalidFields({
        customerName: !customerName.trim(),
        customerPhone: !isPhoneValid(customerPhone),
        deliveryCity: !selectedCity,
        deliveryWarehouse: !selectedWarehouse,
      });
      setValidationAttempt((currentAttempt) => currentAttempt + 1);
      window.setTimeout(() => setInvalidFields({}), 3000);
    }

    if (cartItems.length === 0 || !isFormValid) {
      return;
    }

    setIsSubmitting(true);

    try {
      if (!selectedCity || !selectedWarehouse) {
        return;
      }

      const response = await fetch("/.netlify/functions/send-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer: {
            name: customerName.trim(),
            phone: customerPhone.trim(),
            cityName: selectedCity.description,
            cityRef: selectedCity.ref,
            warehouse: selectedWarehouse.description,
            warehouseRef: selectedWarehouse.ref,
            message: customerComment.trim(),
          },
          order: {
            items: orderItems,
            totalPrice,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Order submit failed");
      }

      clearCart();
      resetForm();
      onClose();
      onOrderSuccess?.();
    } catch {
      setSubmitError("Не вдалося відправити замовлення. Спробуйте ще раз.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const protectPhonePrefix = (input: HTMLInputElement) => {
    window.requestAnimationFrame(() => {
      const selectionStart = input.selectionStart ?? PHONE_PREFIX_LENGTH;
      const selectionEnd = input.selectionEnd ?? PHONE_PREFIX_LENGTH;

      if (selectionStart < PHONE_PREFIX_LENGTH || selectionEnd < PHONE_PREFIX_LENGTH) {
        input.setSelectionRange(PHONE_PREFIX_LENGTH, PHONE_PREFIX_LENGTH);
      }
    });
  };

  const handlePhoneFocus = (event: FocusEvent<HTMLInputElement>) => {
    if (!customerPhone.trim()) {
      setCustomerPhone(PHONE_PREFIX);
    }

    protectPhonePrefix(event.currentTarget);
  };

  const handlePhoneBlur = () => {
    if (customerPhone.trim() === PHONE_PREFIX) {
      setCustomerPhone("");
    }
  };

  const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCustomerPhone(normalizePhoneValue(event.currentTarget.value));
    clearFieldError("customerPhone");
    protectPhonePrefix(event.currentTarget);
  };

  const handlePhoneKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const input = event.currentTarget;
    const selectionStart = input.selectionStart ?? PHONE_PREFIX_LENGTH;
    const selectionEnd = input.selectionEnd ?? PHONE_PREFIX_LENGTH;

    if (
      event.key === "Home" ||
      (event.key === "Backspace" &&
        selectionStart <= PHONE_PREFIX_LENGTH &&
        selectionEnd <= PHONE_PREFIX_LENGTH) ||
      (event.key === "Delete" && selectionStart < PHONE_PREFIX_LENGTH)
    ) {
      event.preventDefault();
      input.setSelectionRange(PHONE_PREFIX_LENGTH, PHONE_PREFIX_LENGTH);
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
              className={[
                "cart-checkout__input",
                invalidFields.customerName ? "cart-checkout__input--invalid" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              key={`customerName-${validationAttempt}`}
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
              className={[
                "cart-checkout__input",
                invalidFields.customerPhone ? "cart-checkout__input--invalid" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              key={`customerPhone-${validationAttempt}`}
              type="tel"
              name="customerPhone"
              value={customerPhone}
              placeholder="*Номер телефону"
              onFocus={handlePhoneFocus}
              onBlur={handlePhoneBlur}
              onChange={handlePhoneChange}
              onClick={(event) => protectPhonePrefix(event.currentTarget)}
              onKeyDown={handlePhoneKeyDown}
              onKeyUp={(event) => protectPhonePrefix(event.currentTarget)}
            />
            {errors.customerPhone && (
              <span className="cart-checkout__error">
                {errors.customerPhone}
              </span>
            )}
          </label>

          <div className="cart-checkout__field">
            <CartDropdown
              isInvalid={Boolean(invalidFields.deliveryCity)}
              name="deliveryCity"
              items={cityResults}
              value={citySearch}
              placeholder="Оберіть місто доставки"
              validationAttempt={validationAttempt}
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
              isInvalid={Boolean(invalidFields.deliveryWarehouse)}
              name="deliveryWarehouse"
              items={warehouses}
              value={selectedWarehouse?.description || ""}
              placeholder="Оберіть відділення Нової Пошти"
              validationAttempt={validationAttempt}
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

          {submitError && (
            <p className="cart-checkout__submit-error">{submitError}</p>
          )}

          <Button
            variant="primary"
            className="cart-checkout__submit"
            type="submit"
            disabled={cartItems.length === 0 || isSubmitting}
          >
            {isSubmitting ? "Надсилаємо..." : "Оформити замовлення"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default CartCheckoutContent;
