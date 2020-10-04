import api from "./datasources/stats";

const resolvers = {
  Query: {
    allCountries: async () => {
      const stats = await api.getStats();
      const countriesInfo = await api.getCountriesInfo();
      return Object.keys(stats)
        .map(iso => ({ iso }))
        .filter(({ iso }) =>
          countriesInfo.find(country => country.alpha3Code === iso) !== undefined
        );
    },
    country: (parent, { iso }) => ({ iso }),
    worldTotalCases: async () => {
      const stats = await api.getStats();
      return Object.keys(stats)
        .map(iso => [...stats[iso]].pop())
        .map(cases => ({ ...cases, actives: calcActiveCases(cases) }))
        .reduce(sumCases);
    },
    worldTotalNewCases: async () => {
      const stats = await api.getStats();
      return Object.keys(stats)
        .map(iso => calcLatestNewCases(stats[iso]))
        .reduce(sumCases);
    },
    /**
     * Like every timeserie has the same length then I flat the array and apply the module
     * to avoid an nested loop
     */
    worldTimeserie: async () => {
      const stats = await api.getStats();
      const statsKeys = Object.keys(stats);
      const timeserieLength = stats[statsKeys[0]].length;
      return statsKeys
        .flatMap(key => stats[key])
        .reduce((acc, current, index) => {
          const accCases = acc[index % timeserieLength];
          acc[index % timeserieLength] = {
            date: current.date,
            cases: {
              confirmed: accCases.cases.confirmed + current.confirmed,
              deaths: accCases.cases.deaths + current.deaths,
              recovered: accCases.cases.recovered + current.recovered,
              actives: accCases.cases.actives + current.actives,
            }
          }
          return acc;
        },
          Array.from(new Array(timeserieLength)).fill({
            date: "",
            cases: {
              confirmed: 0,
              deaths: 0,
              recovered: 0,
              actives: 0,
            }
          })
        )
        .map(({ date, cases }) => ({
          date,
          cases: {
            ...cases,
            actives: calcActiveCases(cases),
          }
        }));
    },
  },
  Country: {
    iso: ({ iso }) => iso,
    timeserie: async ({ iso }) => {
      const stats = await api.getStats();
      return stats[iso].map(({ date, ...cases }) => ({
        date,
        cases: {
          ...cases,
          actives: calcActiveCases(cases),
        }
      }));
    },
    totalCases: async ({ iso }) => {
      const stats = await api.getStats();
      const timeserie = stats[iso];
      const total = [...timeserie].pop();
      return {
        ...total,
        actives: calcActiveCases(total),
      };
    },
    totalCasesPerMillion: async ({ iso }) => {
      const stats = await api.getStats();
      const countriesInfo = await api.getCountriesInfo();
      const total = [...stats[iso]].pop();
      const country = countriesInfo.find(country => country.alpha3Code === iso);
      const ONE_MILLION = 1000000;
      return {
        confirmed: parseInt(total.confirmed / country.population * ONE_MILLION),
        recovered: parseInt(total.recovered / country.population * ONE_MILLION),
        deaths: parseInt(total.deaths / country.population * ONE_MILLION),
        actives: parseInt(calcActiveCases(total) / country.population * ONE_MILLION),
      };
    },
    newCases: async ({ iso }) => {
      const stats = await api.getStats();
      const timeserie = stats[iso];
      return calcLatestNewCases(timeserie);
    },
    info: async ({ iso }) => {
      const countriesInfo = await api.getCountriesInfo();
      const country = countriesInfo.find(country => country.alpha3Code === iso);
      return {
        name: country.name,
        flag: country.flag,
        population: country.population,
        region: country.region,
        subregion: country.subregion,
        latlng: country.latlng,
      };
    },
  }
};

// HELPERS

function calcActiveCases(cases) {
  return cases.confirmed - cases.deaths - cases.recovered;
}

function calcLatestNewCases(arrDailyCases) {
  const copy = [...arrDailyCases];
  const lastCases = copy.pop();
  const prevLastCases = copy.pop();
  return {
    confirmed: lastCases.confirmed - prevLastCases.confirmed,
    deaths: lastCases.deaths - prevLastCases.deaths,
    recovered: lastCases.recovered - prevLastCases.recovered,
    actives: calcActiveCases(lastCases) - calcActiveCases(prevLastCases),
  }
}

const defaultCases = {
  confirmed: 0,
  deaths: 0,
  recovered: 0,
  actives: 0,
};

function sumCases(prevCases = defaultCases, cases = defaultCases) {
  return {
    confirmed: prevCases.confirmed + cases.confirmed,
    deaths: prevCases.deaths + cases.deaths,
    recovered: prevCases.recovered + cases.recovered,
    actives: prevCases.actives + cases.actives,
  };
}


export default resolvers;
