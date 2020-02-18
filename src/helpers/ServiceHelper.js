class ServiceHelper {
  filterSearchParams(queryParams, filters) {
    const searchParams = {};
    if (filters) {
      filters.forEach((filter) => {
        Object.keys(queryParams).filter(searchParam =>
          searchParam === filter).forEach((param) => {
            searchParams[param] = queryParams[param];
          });
      });
    }

    return searchParams;
  }
}

module.exports = ServiceHelper;
