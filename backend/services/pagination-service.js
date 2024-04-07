class PaginationService {
  async getRequestWithPagination(req, model, routerName) {
    const { page = 1, limit = 10 } = req.query;
    const url = `${req.protocol}://${req.get('host')}${req.baseUrl}/${routerName}`;

    const count = await model.countDocuments();
    const currentPage = parseInt(page);
    const restItems = count - (page * limit);

    let nextPage = null;
    let previousPage = null;

    if (restItems !== 0 && restItems > 0) {
      nextPage = currentPage + 1;
    }

    if (currentPage > 1) {
      previousPage = currentPage - 1;
    }

    const items = await model.find()
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({created_date: -1});

    return {
      results: items,
      next: nextPage ? this.paginationQuery(url, nextPage) : null,
      previous: previousPage ? this.paginationQuery(url, previousPage) : null,
      count,
    };
  }

  paginationQuery(path, page) {
    return `${path}?page=${page}`;
  }
}

module.exports = new PaginationService();