import PropTypes from 'prop-types'
import favorites from "utils/favorites"
import * as size from "utils/size"
import Icon from "../../icons/heart.svg"

FavoriteButton.propTypes = {
  iso: PropTypes.string,
  size: size.isSize,
}

export default function FavoriteButton({ iso, size = "size-m"}) {
  const favoritesList = favorites.useFavoritesList()
  const isFavorite = favoritesList.values.includes(iso)

  const handleOnClick = evt => {
    evt.preventDefault()
    evt.stopPropagation()

    if (isFavorite) {
      favoritesList.remove(iso)
    } else {
      favoritesList.add(iso)
    }
  }

  const iconStyle = [
    size,
    isFavorite ? "app_heart_icon_fill_primary" : ""
  ].join(" ")

  return (
    <button className="icon-button" onClick={handleOnClick}>
      <Icon className={iconStyle} />
    </button>
  )
}

