import { useState } from 'react'
import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import Products from './components/Products/Products'
import HowToOrder from './components/HowToOrder/HowToOrder'
import CustomOrder from './components/CustomOrder/CustomOrder'
import Care from './components/Care/Care'
import About from './components/About/About'
import Contacts from './components/Contacts/Contacts'
import Footer from './components/Footer/Footer'

function App() {
  const [favoriteProductIds, setFavoriteProductIds] = useState([])

  const toggleFavorite = (productId) => {
    setFavoriteProductIds((currentIds) =>
      currentIds.includes(productId)
        ? currentIds.filter((id) => id !== productId)
        : [...currentIds, productId],
    )
  }

  return (
    <>
      <Header favoritesCount={favoriteProductIds.length} />
      <main className="page-grid">
        <Hero />
        <Products
          favoriteProductIds={favoriteProductIds}
          onFavoriteToggle={toggleFavorite}
        />
        <HowToOrder />
        <CustomOrder />
        <Care />
        <About />
        <Contacts />
      </main>
      <Footer />
    </>
  )
}

export default App
