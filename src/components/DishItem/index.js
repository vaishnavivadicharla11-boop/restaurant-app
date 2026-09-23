import './index.css'

const DishItem = props => {
  const {dish, quantity, addItem, removeItem} = props

  const {
    dish_id,
    dish_name,
    dish_price,
    dish_currency,
    dish_image,
    dish_calories,
    dish_description,
    dish_Availability,
    dish_Type,
    addonCat,
  } = dish

  const hasCustomizations = addonCat && addonCat.length > 0

  return (
    <article className="dish-card">
      <div className="dish-details">
        <div
          className={`dish-type ${
            dish_Type === 2 ? 'vegetarian' : 'non-vegetarian'
          }`}
        >
          <span />
        </div>

        <div className="dish-information">
          <h2 className="dish-name">{dish_name}</h2>

          <p className="dish-price">
            {dish_currency} {dish_price}
          </p>

          <p className="dish-description">{dish_description}</p>

          {dish_Availability ? (
            <>
              <div className="quantity-container">
                <button
                  type="button"
                  className="quantity-button"
                  onClick={() => removeItem(dish_id)}
                  disabled={quantity === 0}
                >
                  -
                </button>

                <span className="quantity">{quantity}</span>

                <button
                  type="button"
                  className="quantity-button"
                  onClick={() => addItem(dish_id)}
                >
                  +
                </button>
              </div>

              {hasCustomizations && (
                <p className="customization-text">Customizations available</p>
              )}
            </>
          ) : (
            <p className="not-available">Not available</p>
          )}
        </div>
      </div>

      <p className="calories">{dish_calories} calories</p>

      <img className="dish-image" src={dish_image} alt={dish_name} />
    </article>
  )
}

export default DishItem
