import type { ChangeEvent, FormEvent } from 'react'
import { useState } from 'react'
import Button from '../UI/Button/Button'
import Input from '../UI/Input/Input'
import Textarea from '../UI/Textarea/Textarea'
import Modal from '../UI/Modal/Modal'
import './Contacts.scss'

const initialForm = {
  name: '',
  phone: '',
  message: '',
}

function Contacts() {
  const [form, setForm] = useState(initialForm)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsModalOpen(true)
    setForm(initialForm)
  }

  return (
    <section className="contacts section" id="contacts">
      <div className="container contacts__container">
        <div className="contacts__info">
          <span className="section__eyebrow">Contacts</span>
          <h2>Напишіть нам</h2>
          <p>
            Залиште контакти для майбутнього замовлення, уточнення розміру або
            індивідуального knitwear-проєкту.
          </p>
          <ul className="contacts__list">
            <li>Instagram: @soft.current</li>
            <li>Email: hello@soft-current.ua</li>
            <li>Київ, Україна</li>
          </ul>
        </div>

        <form className="contacts__form" onSubmit={handleSubmit}>
          <Input
            label="Ім'я"
            name="name"
            placeholder="Ваше ім'я"
            value={form.name}
            onChange={handleChange}
          />
          <Input
            label="Телефон або email"
            name="phone"
            placeholder="+380 або email"
            value={form.phone}
            onChange={handleChange}
          />
          <Textarea
            label="Повідомлення"
            name="message"
            placeholder="Розкажіть, який виріб вас цікавить"
            value={form.message}
            onChange={handleChange}
          />
          <Button type="submit">Надіслати заявку</Button>
        </form>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h3>Дякуємо, заявку отримано!</h3>
        <p>Ми зв'яжемося з вами після уточнення деталей.</p>
      </Modal>
    </section>
  )
}

export default Contacts
