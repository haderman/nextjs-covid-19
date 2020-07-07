import PropTypes from "prop-types"

import Stack from "./stack"
import Inline from "./inline"
import Chip from "./chip"
import Numeric from "./numeric"

import * as size from "../../utils/size"
import * as color from "../../utils/color"

const dataShape = {
  TotalConfirmed: PropTypes.number,
  NewConfirmed: PropTypes.number,
  TotalRecovered: PropTypes.number,
  NewRecovered: PropTypes.number,
  TotalDeaths: PropTypes.number,
  NewDeaths: PropTypes.number,
}

Compact.propTypes = {
  data: PropTypes.shape(dataShape)
}

export function Compact({ data }) {
  return (
    <article className="block stretch-inset-m rounded border-s border-color-strong background-interactive">
      <Stack size={size.S}>
        <h4>Total confirmed cases</h4>
      </Stack>
      <Stack size={size.L}>
        <div className="flex justify-space-between align-center">
          <h3 className="text-red text-xl">
            <Numeric value={data.TotalConfirmed} />
          </h3>
          <Chip rounded={size.L} background={color.RED_SOFT} size={size.S}>
            + <Numeric value={data.NewConfirmed} />
          </Chip>
        </div>
      </Stack>
      <div className="grid grid-gap-m grid-col-3-auto">
        {/* row 1 */}
        <span className="text-secondary">Actives</span>
        <Numeric
          value={data.TotalConfirmed - data.TotalRecovered - data.TotalDeaths}
          className="text-orange text-end"
        />
        <span className="text-end">
          <Chip rounded={size.L} background={color.ORANGE_SOFT} size={size.S}>
            + <Numeric value={data.NewConfirmed} />
          </Chip>
        </span>
        {/* row 2 */}
        <span className="text-secondary">Recovered</span>
        <Numeric
          value={data.TotalRecovered}
          className="text-green text-end"
        />
        <span className="text-end">
          <Chip rounded={size.L} background={color.GREEN_SOFT} size={size.S}>
            + <Numeric value={data.NewRecovered} />
          </Chip>
        </span>
        {/* row 3 */}
        <span className="text-secondary">Deaths</span>
        <Numeric
          value={data.TotalDeaths}
          className="text-gray text-end"
        />
        <span className="text-end">
          <Chip rounded={size.L} background={color.GRAY_SOFT} size={size.S}>
            + <Numeric value={data.NewDeaths} />
          </Chip>
        </span>
      </div>
    </article>
  )
}

Cards.propTypes = {
  data: PropTypes.shape(dataShape)
}

export function Cards({ data }) {
  return (
    <section className="layout-summary-cards">
      <Card
        topText="Confirmed cases"
        middleText={data.TotalConfirmed}
        middleTextColor={color.RED}
        bottomText={data.NewConfirmed}
        bottomTextColor={color.RED_SOFT}
      />
      <Card
        topText="Active cases"
        middleText={data.TotalConfirmed - data.TotalRecovered - data.TotalDeaths}
        middleTextColor={color.ORANGE}
        bottomText={data.NewConfirmed - data.NewRecovered - data.NewDeaths}
        bottomTextColor={color.ORANGE_SOFT}
      />
      <Card
        topText="Recovered cases"
        middleText={data.TotalRecovered}
        middleTextColor={color.GREEN}
        bottomText={data.NewRecovered}
        bottomTextColor={color.GREEN_SOFT}
      />
      <Card
        topText="Deaths cases"
        middleText={data.TotalDeaths}
        middleTextColor={color.GRAY}
        bottomText={data.NewDeaths}
        bottomTextColor={color.GRAY_SOFT}
      />
    </section>
  )
}

function Card(props) {
  const {
    topText,
    middleText,
    bottomText,
    middleTextColor,
    bottomTextColor,
  } = props

  return (
    <article className="inset-m flex-1 flex column align-center rounded border-s border-color-soft">
      <Stack size={size.M}>
        <p className="text-secondary">{topText}</p>
      </Stack>
      <Stack size={size.M}>
        <h3 className={`text-secondary text-xl text-${middleTextColor}`}>
          <Numeric value={middleText} />
        </h3>
      </Stack>
      <Stack>
        <Chip
          size={size.M}
          rounded={size.XL}
          background={bottomTextColor}
        >
          {bottomText >= 0 && "+"}<Numeric value={bottomText} />
        </Chip>
      </Stack>
    </article>
  )
}

export default {
  Cards,
  Compact
}
