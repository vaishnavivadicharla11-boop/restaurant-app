import {useEffect, useState} from 'react'
import Header from './components/Header'
import CategoryTabs from './components/CategoryTabs'
import DishItem from './components/DishItem'
import './App.css'

const API_URL =
  'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'

const App = () => {
  const [restaurant, setRestaurant] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [cartItems, setCartItems] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const getRestaurantData = async () => {
      try {
        const response = await fetch(API_URL)

        if (!response.ok) {
          throw new Error('Failed to fetch restaurant data')
        }

        const data = await response.json()

        const restaurantData = data[0]

        setRestaurant(restaurantData)

        if (restaurantData.table_menu_list.length > 0) {
          setSelectedCategory(
            restaurantData.table_menu_list[0].menu_category,
          )
        }
      } catch (error) {
        setIsError(true)
      } finally {
        setIsLoading(false)
      }
    }

    getRestaurantData()
  }, [])

  const addItem = dishId => {
    setCartItems(previousItems => ({
      ...previousItems,
      [dishId]: (previousItems[dishId] || 0) + 1,
    }))
  }

  const removeItem = dishId => {
    setCartItems(previousItems => {
      const currentQuantity = previousItems[dishId] || 0

      if (currentQuantity <= 1) {
        const updatedItems = {...previousItems}
        delete updatedItems[dishId]
        return updatedItems
      }

      return {
        ...previousItems,
        [dishId]: currentQuantity - 1,
      }
    })
  }

  const getCartCount = () => {
    return Object.values(cartItems).reduce(
      (total, quantity) => total + quantity,
      0,
    )
  }

  const selectedMenu = restaurant?.table_menu_list.find(
    category => category.menu_category === selectedCategory,
  )

  if (isLoading) {
    return (
      <div className="status-container">
        <p>Loading...</p>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="status-container">
        <p>Something went wrong. Please try again.</p>
      </div>
    )
  }

  return (
    <div className="app-container">
      <Header
        restaurantName={restaurant.restaurant_name}
        cartCount={getCartCount()}
      />

      <CategoryTabs
        categories={restaurant.table_menu_list}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <main className="menu-container">
        {selectedMenu?.category_dishes.map(dish => (
          <DishItem
            key={dish.dish_id}
            dish={dish}
            quantity={cartItems[dish.dish_id] || 0}
            addItem={addItem}
            removeItem={removeItem}
          />
        ))}
      </main>
    </div>
  )
}

export default App