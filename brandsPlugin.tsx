/** @jsx h */
import {
  AutocompletePlugin,
  getAlgoliaFacetHits
} from "@algolia/autocomplete-js";
import { SearchClient } from "algoliasearch/lite";
import { h, Fragment } from "preact";

import { Highlighted } from "./types";

type BrandRecord = {
  label: string;
  count: number;
};

type BrandHit = Highlighted<BrandRecord>;

type CreateCategoriesPluginProps = {
  searchClient: SearchClient;
  attribute: string;
};

export function createBrandsPlugin({
  searchClient,
  attribute
}: CreateCategoriesPluginProps): AutocompletePlugin<BrandHit, undefined> {
  return {
    getSources({ query }) {
      return [
        {
          sourceId: "brandsPlugin",
          getItems() {
            return getAlgoliaFacetHits({
              searchClient,
              queries: [
                {
                  indexName: "instant_search",
                  params: {
                    facetName: attribute,
                    facetQuery: query,
                    maxFacetHits: 5
                  }
                }
              ]
            });
          },
          templates: {
            header() {
              return (
                <Fragment>
                  <span className="aa-SourceHeaderTitle">Brands</span>
                  <div className="aa-SourceHeaderLine" />
                </Fragment>
              );
            },
            item({ item, components }) {
              return (
                <div className="aa-ItemWrapper">
                  <div className="aa-ItemContent">
                    <div className="aa-ItemIcon aa-ItemIcon--noBorder">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                        <line x1="7" y1="7" x2="7.01" y2="7"></line>
                      </svg>
                    </div>

                    <div className="aa-ItemContentTitle">
                      <components.Highlight hit={item} attribute="label" />
                    </div>
                  </div>
                </div>
              );
            },
            noResults() {
              return (
                <div className="aa-ItemWrapper">
                  <div className="aa-ItemContent">No brands matching.</div>
                </div>
              );
            }
          }
        }
      ];
    }
  };
}
