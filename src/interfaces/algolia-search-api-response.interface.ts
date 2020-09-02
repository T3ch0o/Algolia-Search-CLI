export interface AlgoliaSearchApiResponseInterface {
    hits: any;
    nbHits: number;
    page: number;
    nbPages: number;
    hitsPerPage: number;
    exhaustiveNbHits: true,
    query: '',
    params: '',
    processingTimeMS: number;
}