module.exports = ({
  footwearService,
  footwearVariantService,
  footwearReviewService
}) => async () => {
  const footwears = await footwearService.limit(100);
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
      id: footwear.id,
      name: footwear.name,
      description: footwear.description,
      price: footwear.price,
      brand_id: footwear.brand_id,
      brand_name: footwear.brand_name,
      category_id: footwear.category_id,
      category_name: footwear.category_name,
      image: {
        id: footwear.image_id,
        src: footwear.image_src,
        h: footwear.image_h,
        s: footwear.image_s,
        l: footwear.image_l
      },
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
