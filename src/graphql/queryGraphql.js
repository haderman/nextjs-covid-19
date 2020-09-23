import { graphql } from "graphql";

import { schema, context } from "pages/api/graphql";

export default async function queryGraphql(query, variableValues = {}) {
  const result = await graphql({ schema, contextValue: context, source: query, variableValues });
  const { data } = result;
  return data || {};
}
