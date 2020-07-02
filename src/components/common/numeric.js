function Numeric({ value, className = "" }) {
  const formattedValue = new Intl.NumberFormat().format(value)
  return <data className={className}>{formattedValue}</data>
}

export default Numeric
