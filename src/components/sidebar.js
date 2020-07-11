import useGlobalSummary from "api/hooks/useGlobalSummary"
import api from "api/api"
import * as size from "utils/size"
import prettyDate from "utils/prettyDate"
import ActiveLinke from "./common/activeLink"
import Stack from "./common/stack"
import Summary from "./common/summary"
import ListCountries from "./common/listCountries"

function Sidebar() {
  const globalSummary = useGlobalSummary()

  return (
    <aside className="background-deep-0 inset-m">
      <Stack size={size.XL}>
        {api.isLoading(globalSummary) ?
          <div>loading</div>
        :api.isError(globalSummary) ?
          <div>error</div>
        :api.isSuccess(globalSummary) ?
          <GlobalCount summary={globalSummary} />
        :null
        }
      </Stack>
      <ListCountries />
    </aside>
  )
}

function GlobalCount({ summary }) {
  return (
    <section>
      {api.isError(summary) ?
        <h2 className="text-error">Error...</h2>
      :api.isLoading(summary) ?
        <h2>Loading...</h2>
      :api.isSuccess(summary) ?
        <>
          <Stack size={size.XS}>
            <h3>Global cases</h3>
          </Stack>
          {/* <Stack size={size.M}>
            <span className="text-secondary text-s">
              Updated <time>{prettyDate(summary.data)}</time>
            </span>
          </Stack> */}
          <ActiveLinke href="/" passHref activeClassName="background-deep-1">
            <a>
              <Summary.Compact data={api.getResult(summary)} />
            </a>
          </ActiveLinke>
        </>
      :null
      }
    </section>
  )
}

export default Sidebar
