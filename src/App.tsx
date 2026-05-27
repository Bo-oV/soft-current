import { useState } from 'react'
import CartModal from './components/Cart/CartModal'
import OrderSuccessModal from './components/Cart/OrderSuccessModal'
import CartScreen from './components/Cart/CartScreen'
import FavoritesModal from './components/FavoritesModal/FavoritesModal'
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
import { FavoritesProvider } from './context/FavoritesContext'
import { useCart } from './context/useCart'
import { useFavorites } from './context/useFavorites'
import useMediaQuery from './hooks/useMediaQuery'
import FavoritesPage from './pages/FavoritesPage/FavoritesPage'

function AppContent() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false)
  const [isOrderSuccessOpen, setIsOrderSuccessOpen] = useState(false)
  const { cartItems } = useCart()
  const { favoritesCount } = useFavorites()
  const isMobile = useMediaQuery('(max-width: 767px)')

  return (
    <>
      <Header
        cartCount={cartItems.length}
        favoritesCount={favoritesCount}
        onCartOpen={() => setIsCartOpen(true)}
        onFavoritesOpen={() => setIsFavoritesOpen(true)}
      />
      <main className="page-grid">
        <Hero />
        <Products onCartOpen={() => setIsCartOpen(true)} />
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
      {isMobile ? (
        <FavoritesPage
          isOpen={isFavoritesOpen}
          onClose={() => setIsFavoritesOpen(false)}
          onCartOpen={() => setIsCartOpen(true)}
        />
      ) : (
        <FavoritesModal
          isOpen={isFavoritesOpen}
          onClose={() => setIsFavoritesOpen(false)}
          onCartOpen={() => setIsCartOpen(true)}
        />
      )}
    </>
  )
}

function App() {
  return (
    <CartProvider>
      <FavoritesProvider>
        <AppContent />
      </FavoritesProvider>
    </CartProvider>
  )
}

export default App
