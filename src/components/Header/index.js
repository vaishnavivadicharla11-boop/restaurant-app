import './index.css'

const Header = props => {
  const {restaurantName, cartCount} = props

  return (
    <header className="header">
      <h1 className="restaurant-name">{restaurantName}</h1>

      <div className="header-right">
        <p className="my-orders">My Orders</p>

        <div className="cart-container">
          <span className="cart-icon">🛒</span>
          <span className="cart-count">{cartCount}</span>
        </div>
      </div>
    </header>
  )
}

export default Header
