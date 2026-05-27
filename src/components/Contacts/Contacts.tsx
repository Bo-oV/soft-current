import type {
  ChangeEvent,
  FocusEvent,
  FormEvent,
  KeyboardEvent as ReactKeyboardEvent,
  ReactNode,
} from 'react'
import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import useMediaQuery from '../../hooks/useMediaQuery'
import './Contacts.scss'

type ContactFormData = {
  name: string
  phone: string
  message: string
}

type ContactInvalidFields = Partial<Record<'name' | 'phone', boolean>>
type ContactErrors = Partial<Record<'name' | 'phone', string>>

type ContactInfoId = 'delivery' | 'returns'

type ContactInfo = {
  id: ContactInfoId
  title: string
  content: ReactNode
}

type ContactInfoModalProps = {
  info: ContactInfo
  isMobile: boolean
  onClose: () => void
}

const contactInfoItems: ContactInfo[] = [
  {
    id: 'delivery',
    title: 'Доставка і оплата',
    content: (
      <>
        <h3>Доставка</h3>
        <p>
          Ми дбайливо пакуємо кожен виріб, щоб він приїхав до вас охайним,
          чистим і готовим дарувати тепло.
        </p>
        <p>
          Доставка здійснюється по Україні службою Нова пошта. Після оформлення
          замовлення ми зв’яжемося з вами для підтвердження даних та уточнення
          деталей доставки.
        </p>
        <p>
          <strong>Вартість доставки: безкоштовно.</strong>
        </p>
        <p>
          Термін відправки готових виробів: 1–3 робочі дні після підтвердження
          замовлення. Індивідуальні замовлення: термін виготовлення узгоджується
          окремо, адже виріб створюється спеціально для вас.
        </p>
        <p>
          Після відправки ми надішлемо номер накладної, щоб ви могли
          відстежувати посилку.
        </p>
        <h3>Оплата</h3>
        <p>
          Наразі доступна оплата при отриманні. Ви можете оглянути виріб у
          відділенні або при доставці кур’єром і оплатити замовлення після
          перевірки.
        </p>
        <p>
          Після підтвердження замовлення ми уточнимо всі деталі: модель, колір,
          розмір, спосіб доставки та контактні дані.
        </p>
      </>
    ),
  },
  {
    id: 'returns',
    title: 'Повернення та обмін',
    content: (
      <>
        <h3>Повернення та обмін</h3>
        <p>
          Ми хочемо, щоб кожен виріб приносив радість і комфорт. Якщо товар вам
          не підійшов, ви можете повернути або обміняти його протягом 14 днів з
          моменту отримання.
        </p>
        <p>Повернення можливе, якщо:</p>
        <ul>
          <li>виріб не був у використанні;</li>
          <li>збережено товарний вигляд;</li>
          <li>немає пошкоджень, плям, запахів або слідів носіння;</li>
          <li>збережено пакування, бірки або інші елементи, якщо вони були;</li>
          <li>є підтвердження покупки.</li>
        </ul>
        <p>
          Щоб оформити повернення або обмін, напишіть нам у Telegram, Instagram
          або на email. Вкажіть номер замовлення, причину повернення та додайте
          фото виробу.
        </p>
        <p>
          Після отримання та перевірки товару ми повернемо кошти або погодимо
          обмін на інший виріб.
        </p>
        <h3>Індивідуальні замовлення</h3>
        <p>
          Вироби, створені за індивідуальними параметрами, кольором, розміром
          або особистими побажаннями покупця, повертаються лише у випадку браку
          або невідповідності погодженим характеристикам.
        </p>
      </>
    ),
  },
]

const initialFormData: ContactFormData = {
  name: '',
  phone: '',
  message: '',
}

const PHONE_PREFIX = '+380'
const PHONE_PREFIX_LENGTH = PHONE_PREFIX.length
const getPhoneDigits = (phone: string) => phone.replace(/\D/g, '')
const isPhoneEmpty = (phone: string) => getPhoneDigits(phone).length <= 3
const isPhoneValid = (phone: string) => /^380\d{9}$/.test(getPhoneDigits(phone))
const normalizePhoneValue = (phone: string) => {
  const digits = getPhoneDigits(phone)
  const localDigits = digits.startsWith('380') ? digits.slice(3) : digits

  return `${PHONE_PREFIX}${localDigits.slice(0, 9)}`
}

function ContactInfoModal({ info, isMobile, onClose }: ContactInfoModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose])

  if (isMobile) {
    return (
      <div className="contact-info contact-info--mobile" role="dialog" aria-modal="true" aria-labelledby="contact-info-title">
        <button className="contact-info__close" type="button" aria-label="Закрити" onClick={onClose}>
          <X size={28} strokeWidth={1.5} aria-hidden="true" />
        </button>
        <div className="contact-info__body">
          <h2 className="contact-info__title" id="contact-info-title">
            {info.title}
          </h2>
          <div className="contact-info__text">{info.content}</div>
          <button className="contact-info__button" type="button" onClick={onClose}>
            OK
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="contact-info" role="presentation" onClick={onClose}>
      <div
        className="contact-info__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-info-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button className="contact-info__close" type="button" aria-label="Закрити" onClick={onClose}>
          <X size={24} strokeWidth={1.5} aria-hidden="true" />
        </button>
        <div className="contact-info__body">
          <h2 className="contact-info__title" id="contact-info-title">
            {info.title}
          </h2>
          <div className="contact-info__text">{info.content}</div>
          <button className="contact-info__button" type="button" onClick={onClose}>
            OK
          </button>
        </div>
      </div>
    </div>
  )
}

function Contacts() {
  const isMobile = useMediaQuery('(max-width: 767px)')
  const [formData, setFormData] = useState<ContactFormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState('')
  const [submitError, setSubmitError] = useState('')
  const [invalidFields, setInvalidFields] = useState<ContactInvalidFields>({})
  const [errors, setErrors] = useState<ContactErrors>({})
  const [validationAttempt, setValidationAttempt] = useState(0)
  const [selectedInfoId, setSelectedInfoId] = useState<ContactInfoId | null>(null)
  const selectedInfo = contactInfoItems.find((item) => item.id === selectedInfoId)

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }))

    if (name === 'name' || name === 'phone') {
      setInvalidFields((currentFields) => ({
        ...currentFields,
        [name]: false,
      }))
      setErrors((currentErrors) => ({
        ...currentErrors,
        [name]: '',
      }))
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitSuccess('')
    setSubmitError('')

    const nextInvalidFields: ContactInvalidFields = {
      name: !formData.name.trim(),
      phone: !isPhoneValid(formData.phone),
    }
    const nextErrors: ContactErrors = {
      name: nextInvalidFields.name ? "Вкажіть ім'я" : '',
      phone: isPhoneEmpty(formData.phone)
        ? 'Вкажіть номер телефону'
        : !isPhoneValid(formData.phone)
          ? 'Введіть коректний номер телефону у форматі +380XXXXXXXXX'
          : '',
    }

    if (nextInvalidFields.name || nextInvalidFields.phone) {
      setInvalidFields(nextInvalidFields)
      setErrors(nextErrors)
      setValidationAttempt((currentAttempt) => currentAttempt + 1)
      window.setTimeout(() => setInvalidFields({}), 3000)
      setSubmitError('')
      return
    }

    try {
      setIsSubmitting(true)

      const response = await fetch('/.netlify/functions/send-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          message: formData.message.trim(),
        }),
      })

      if (!response.ok) {
        throw new Error('Contact submit failed')
      }

      setFormData(initialFormData)
      setInvalidFields({})
      setErrors({})
      setSubmitSuccess("Повідомлення успішно надіслано. Ми скоро зв'яжемося з вами!")
    } catch {
      setSubmitError('Не вдалося надіслати повідомлення. Спробуйте ще раз.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const getFieldClassName = (field: keyof ContactInvalidFields) =>
    [
      'contacts__input',
      invalidFields[field] ? 'contacts__input--invalid' : '',
    ]
      .filter(Boolean)
      .join(' ')

  const protectPhonePrefix = (input: HTMLInputElement) => {
    window.requestAnimationFrame(() => {
      const selectionStart = input.selectionStart ?? PHONE_PREFIX_LENGTH
      const selectionEnd = input.selectionEnd ?? PHONE_PREFIX_LENGTH

      if (selectionStart < PHONE_PREFIX_LENGTH || selectionEnd < PHONE_PREFIX_LENGTH) {
        input.setSelectionRange(PHONE_PREFIX_LENGTH, PHONE_PREFIX_LENGTH)
      }
    })
  }

  const handlePhoneFocus = (event: FocusEvent<HTMLInputElement>) => {
    if (!formData.phone.trim()) {
      setFormData((currentData) => ({
        ...currentData,
        phone: PHONE_PREFIX,
      }))
    }

    protectPhonePrefix(event.currentTarget)
  }

  const handlePhoneBlur = () => {
    if (formData.phone.trim() === PHONE_PREFIX) {
      setFormData((currentData) => ({
        ...currentData,
        phone: '',
      }))
    }
  }

  const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData((currentData) => ({
      ...currentData,
      phone: normalizePhoneValue(event.currentTarget.value),
    }))
    setInvalidFields((currentFields) => ({
      ...currentFields,
      phone: false,
    }))
    setErrors((currentErrors) => ({
      ...currentErrors,
      phone: '',
    }))
    protectPhonePrefix(event.currentTarget)
  }

  const handlePhoneKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    const input = event.currentTarget
    const selectionStart = input.selectionStart ?? PHONE_PREFIX_LENGTH
    const selectionEnd = input.selectionEnd ?? PHONE_PREFIX_LENGTH

    if (
      event.key === 'Home' ||
      (event.key === 'Backspace' &&
        selectionStart <= PHONE_PREFIX_LENGTH &&
        selectionEnd <= PHONE_PREFIX_LENGTH) ||
      (event.key === 'Delete' && selectionStart < PHONE_PREFIX_LENGTH)
    ) {
      event.preventDefault()
      input.setSelectionRange(PHONE_PREFIX_LENGTH, PHONE_PREFIX_LENGTH)
    }
  }

  return (
    <section className="contacts" id="contacts">
      <div className="contacts__panel contacts__panel--info">
        <div className="contacts__info">
          <h2 className="contacts__title">Контакти</h2>

          <address className="contacts__list">
            <div className="contacts__group">
              <p className="contacts__label">Telegram:</p>
              <a className="contacts__value" href="https://t.me/roni9991">
                @roni9991
              </a>
            </div>

            <div className="contacts__group">
              <p className="contacts__label">E-mail:</p>
              <a className="contacts__value contacts__value--accent" href="mailto:softcurrent.shop@gmail.com">
                softcurrent.shop@gmail.com
              </a>
            </div>
          </address>

          <div className="contacts__policy-list">
            {contactInfoItems.map((item) => (
              <button
                className="contacts__policy-button"
                type="button"
                key={item.id}
                onClick={() => setSelectedInfoId(item.id)}
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="contacts__panel contacts__panel--form">
        <form className="contacts__form" onSubmit={handleSubmit}>
          <div className="contacts__form-header">
            <p className="contacts__eyebrow">Напишіть нам</p>
            <p className="contacts__subtitle">
              Заповніть форму, і ми зв'яжемося з вами найближчим часом
            </p>
          </div>

          <label className="contacts__field">
            <span className="contacts__field-label">Ім'я</span>
            <input
              className={getFieldClassName('name')}
              key={`contact-name-${validationAttempt}`}
              name="name"
              placeholder="*Ім'я"
              value={formData.name}
              onChange={handleChange}
              autoComplete="name"
            />
            {errors.name && (
              <span className="contacts__field-error">{errors.name}</span>
            )}
          </label>

          <label className="contacts__field">
            <span className="contacts__field-label">Номер телефону</span>
            <input
              className={getFieldClassName('phone')}
              key={`contact-phone-${validationAttempt}`}
              name="phone"
              placeholder="*Номер телефону"
              value={formData.phone}
              onChange={handlePhoneChange}
              onClick={(event) => protectPhonePrefix(event.currentTarget)}
              onFocus={handlePhoneFocus}
              onKeyDown={handlePhoneKeyDown}
              onKeyUp={(event) => protectPhonePrefix(event.currentTarget)}
              onBlur={handlePhoneBlur}
              autoComplete="tel"
            />
            {errors.phone && (
              <span className="contacts__field-error">{errors.phone}</span>
            )}
          </label>

          <label className="contacts__field">
            <span className="contacts__field-label">Повідомлення</span>
            <textarea
              className="contacts__textarea"
              name="message"
              placeholder="Повідомлення"
              value={formData.message}
              onChange={handleChange}
            />
          </label>

          <p className="contacts__note">*- поля обов'язкові для вводу</p>

          {submitSuccess && (
            <p className="contacts__status contacts__status--success">
              {submitSuccess}
            </p>
          )}

          {submitError && (
            <p className="contacts__status contacts__status--error">
              {submitError}
            </p>
          )}

          <button
            className="contacts__button"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Надсилаємо...' : 'Надіслати'}
          </button>
        </form>
      </div>
      {selectedInfo && (
        <ContactInfoModal
          info={selectedInfo}
          isMobile={isMobile}
          onClose={() => setSelectedInfoId(null)}
        />
      )}
    </section>
  )
}

export default Contacts
