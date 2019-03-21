module.exports = ({
  footwearService,
  footwearVariantService,
  footwearReviewService
}) => async () => {
  const footwears = await footwearService.limit(40);
  const footwearIds = footwears.map(({ id }) => id);

  const [variants, reviews] = await Promise.all([
    footwearVariantService.getByFootwearIds(footwearIds),
    footwearReviewService.getByFootwearIds(footwearIds)
  ]);

  const transform = footwear => {
    const ownReviews = reviews.filter(
      ({ footwear_id }) => footwear_id === footwear.id
    );

    const footwearVariants = variants.filter(
      ({ footwear_id }) => footwear_id === footwear.id
    );

    const inStock = footwearVariants.reduce(
      (sum, { in_stock }) => sum + in_stock,
      0
    );

    const sumRating = ownReviews.length
      ? ownReviews.reduce((sum, { rating }) => sum + rating, 0)
      : 0;

    const avgRating = ownReviews.length ? sumRating / ownReviews.length : 0;

    return {
      ...footwear,
      in_stock: inStock,
      review_count: ownReviews.length,
      reviews: normalize(ownReviews.slice(0, 3)),
      variants: normalize(footwearVariants),
      avg_rating: avgRating
    };
  };

  return {
    data: normalize(footwears.map(transform))
  };
};

const normalize = arr =>
  arr.reduce((collection, row) => {
    collection[row.id] = row;
    return collection;
  }, {});
