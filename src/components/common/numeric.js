import PropTypes from 'prop-types'

Numeric.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string
}

function Numeric({ value, className = "" }) {
  const formattedValue = new Intl.NumberFormat().format(value)
  return <data className={className}>{formattedValue}</data>
}

export default Numeric
