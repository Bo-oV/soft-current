import { useState } from 'react'
import CartModal from './components/Cart/CartModal'
import OrderSuccessModal from './components/Cart/OrderSuccessModal'
import CartScreen from './components/Cart/CartScreen'
import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import Products from './components/Products/Products'
import HowToOrder from './components/HowToOrder/HowToOrder'
import CustomOrder from './components/CustomOrder/CustomOrder'
import Care from './components/Care/Care'
import About from './components/About/About'
import Contacts from './components/Contacts/Contacts'
import Footer from './components/Footer/Footer'
import { CartProvider } from './context/CartContext'
import { useCart } from './context/useCart'
import useMediaQuery from './hooks/useMediaQuery'

function AppContent() {
  const [favoriteProductIds, setFavoriteProductIds] = useState<string[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isOrderSuccessOpen, setIsOrderSuccessOpen] = useState(false)
  const { cartItems } = useCart()
  const isMobile = useMediaQuery('(max-width: 767px)')

  const toggleFavorite = (productId: string) => {
    setFavoriteProductIds((currentIds) =>
      currentIds.includes(productId)
        ? currentIds.filter((id) => id !== productId)
        : [...currentIds, productId],
    )
  }

  return (
    <>
      <Header
        cartCount={cartItems.length}
        favoritesCount={favoriteProductIds.length}
        onCartOpen={() => setIsCartOpen(true)}
      />
      <main className="page-grid">
        <Hero />
        <Products
          favoriteProductIds={favoriteProductIds}
          onCartOpen={() => setIsCartOpen(true)}
          onFavoriteToggle={toggleFavorite}
        />
        <HowToOrder />
        <CustomOrder />
        <Care />
        <About />
        <Contacts />
      </main>
      <Footer />
      {isMobile ? (
        <CartScreen
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          onOrderSuccess={() => setIsOrderSuccessOpen(true)}
        />
      ) : (
        <CartModal
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          onOrderSuccess={() => setIsOrderSuccessOpen(true)}
        />
      )}
      <OrderSuccessModal
        isOpen={isOrderSuccessOpen}
        onClose={() => setIsOrderSuccessOpen(false)}
      />
    </>
  )
}

function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  )
}

export default App
