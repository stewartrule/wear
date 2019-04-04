module.exports = ({
  clothingService,
  clothingVariantService,
  clothingReviewService
}) => async () => {
  const clothings = await clothingService.limit(100);
  const clothingIds = clothings.map(({ id }) => id);

  const [variants, reviews] = await Promise.all([
    clothingVariantService.getByClothingIds(clothingIds),
    clothingReviewService.getByClothingIds(clothingIds)
  ]);

  const transform = clothing => {
    const ownReviews = reviews.filter(
      ({ clothing_id }) => clothing_id === clothing.id
    );

    const clothingVariants = variants.filter(
      ({ clothing_id }) => clothing_id === clothing.id
    );

    const inStock = clothingVariants.reduce(
      (sum, { in_stock }) => sum + in_stock,
      0
    );

    const sumRating = ownReviews.length
      ? ownReviews.reduce((sum, { rating }) => sum + rating, 0)
      : 0;

    const avgRating = ownReviews.length ? sumRating / ownReviews.length : 0;

    return {
      id: clothing.id,
      name: clothing.name,
      description: clothing.description,
      price: clothing.price,
      brand_id: clothing.brand_id,
      brand_name: clothing.brand_name,
      category_id: clothing.category_id,
      category_name: clothing.category_name,
      image: {
        id: clothing.image_id,
        src: clothing.image_src,
        h: clothing.image_h,
        s: clothing.image_s,
        l: clothing.image_l
      },
      in_stock: inStock,
      review_count: ownReviews.length,
      reviews: normalize(ownReviews.slice(0, 1)),
      variants: clothingVariants,
      avg_rating: avgRating
    };
  };

  return {
    data: normalize(clothings.map(transform))
  };
};

const normalize = arr =>
  arr.reduce((collection, row) => {
    collection[row.id] = row;
    return collection;
  }, {});
