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
  return (
    <>
      <Header />
      <main className="page-grid">
        <Hero />
        <Products />
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
