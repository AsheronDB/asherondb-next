import {
  WeenieSearchListingRow,
  getWeeniesByName,
} from "~/util/queries/new";
import { weenieTypeToSearchResultCategory, weenieTypeToSearchResultSubCategory, weenieTypeURLMapThing } from "~/util/search";

interface SearchResponseItem {
  source: string;
  category: string;
  subcategory: string;
  name: string;
  url: string;
}

interface SearchResponse {
  count: number;
  items: SearchResponseItem[];
  truncated: boolean;
  query_ms: number;
}

// For right now, we're just searching the ACE DB so this needs one more
// level of abstraction
export default defineEventHandler(async (event) => {
  const start = performance.now();

  const query = getQuery(event);
  const limit = 100; // Using the n+1 trick below to populate 'truncated'
  const querySQL = getWeeniesByName(0, limit + 1);

  let initial_results: WeenieSearchListingRow[] = []

  // $fetch can throw when it runs into normal HTTP errors and doesn't return
  // an error object like regular fetch.
  try {
    initial_results = await $fetch(
      `https://acedb.treestats.net/ace_world_patches.json?_shape=array`,
      {
        key: "search",
        query: {
          sql: querySQL,
          name: `%${query.q}%`
        },
      },
    );
  } catch (e) {
    throw createError({
      statusCode: e.statusCode,
      statusMessage: `${e.name}: ${e.statusMessage}`
    })
  }

  // Reshape result
  let results: SearchResponseItem[] = initial_results.map((i) => {
    return {
      source: "acedb",
      category: weenieTypeToSearchResultCategory[i.type],
      subcategory: weenieTypeToSearchResultSubCategory[i.type],
      name: i.name,
      url: "/database/" + weenieTypeURLMapThing[i.type] + "/" + i.wcid,
    };
  });

  // If we got limit + 1 results, truncate to just limit
  if (results.length > limit) {
    results = results.slice(0, limit);
  }

  const diff = performance.now() - start;

  const response: SearchResponse = {
    count: results.length,
    items: results,
    truncated: initial_results.length > limit,
    query_ms: diff,
  };

  return response;
});
