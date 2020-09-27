import { graphql } from "graphql";

import { schema } from "../pages/api/graphql";

export default async function queryGraphql(query, variableValues = {}) {
  const result = await graphql({ schema, source: query, variableValues });
  const { data } = result;
  return data || {};
}
