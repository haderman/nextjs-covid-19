import statsAPI from "./datasources/stats";

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    allCountries: async () => {
      const stats = await statsAPI.statsLoader.load("stats");
      return Object.keys(stats).map(name => ({ name }));
    },
    country: (parent, { name }) => ({ name }),
    worldTotalCases: async () => {
      const stats = await statsAPI.statsLoader.load("stats");
      return Object.keys(stats)
        .map(countryName => [...stats[countryName]].pop())
        .map(cases => ({ ...cases, actives: calcActiveCases(cases) }))
        .reduce(sumCases);
    },
    worldTotalNewCases: async () => {
      const stats = await statsAPI.statsLoader.load("stats");
      return Object.keys(stats)
        .map(countryName => calcLatestNewCases(stats[countryName]))
        .reduce(sumCases);
    },
  },
  Country: {
    name: ({ name }) => name,
    timeserie: async ({ name }) => {
      const stats = await statsAPI.statsLoader.load("stats");
      return stats[name].map(({ date, ...cases }) => ({
        date,
        cases: {
          ...cases,
          actives: calcActiveCases(cases),
        }
      }));
    },
    totalCases: async ({ name }) => {
      const stats = await statsAPI.statsLoader.load("stats");
      const timeserie = stats[name];
      const total = [...timeserie].pop();
      return {
        ...total,
        actives: calcActiveCases(total),
      };
    },
    newCases: async ({ name }) => {
      const stats = await statsAPI.statsLoader.load("stats");
      const timeserie = stats[name];
      return calcLatestNewCases(timeserie);
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
