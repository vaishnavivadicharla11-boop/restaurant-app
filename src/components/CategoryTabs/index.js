import './index.css'

const CategoryTabs = props => {
  const {categories, selectedCategory, setSelectedCategory} = props

  return (
    <nav className="category-container">
      <div className="category-list">
        {categories.map(category => {
          const isActive = selectedCategory === category.menu_category

          return (
            <button
              type="button"
              key={category.menu_category_id}
              className={`category-button ${isActive ? 'active-category' : ''}`}
              onClick={() => setSelectedCategory(category.menu_category)}
            >
              {category.menu_category}
            </button>
          )
        })}
      </div>
    </nav>
  )
}

export default CategoryTabs
