export type OrderStep = {
  id: string;
  icon: string;
  title: string;
  text: string;
};

export const orderSteps: OrderStep[] = [
  {
    id: "choose",
    icon: "/images/order-steps/choose-product.svg",
    title: "Оберіть виріб",
    text: "Перегляньте каталог і знайдіть виріб, який вам сподобався.",
  },
  {
    id: "buy",
    icon: "/images/order-steps/buy-product.svg",
    title: "Натисніть «Купити»",
    text: "Натисніть «Замовити» — товар автоматично підтягнеться у форму.",
  },
  {
    id: "form",
    icon: "/images/order-steps/fill-form.svg",
    title: "Заповніть заявку",
    text: "Вкажіть ім’я, номер телефону та, за бажанням, короткий коментар.",
  },
  {
    id: "confirm",
    icon: "/images/order-steps/wait-confirmation.svg",
    title: "Очікуйте підтвердження",
    text: "Ми отримаємо заявку та зв’яжемося з вами для уточнення деталей.",
  },
];
