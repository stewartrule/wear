module.exports = ({
  clothingBrandService,
  clothingCategoryService,
  clothingSizeService,
  footwearBrandService,
  footwearCategoryService,
  footwearSizeService,
  colorService
}) => async () => {
  const [
    clothingBrands,
    clothingCategories,
    clothingSizes,
    footwearBrands,
    footwearCategories,
    footwearSizes,
    colors
  ] = await Promise.all([
    clothingBrandService.select(),
    clothingCategoryService.select(),
    clothingSizeService.select(),
    footwearBrandService.select(),
    footwearCategoryService.select(),
    footwearSizeService.select(),
    colorService.select()
  ]);

  return {
    data: {
      clothingBrands: normalize(clothingBrands),
      clothingCategories: normalize(
        clothingCategories.map(category => ({
          product_count: category.product_count,
          id: category.id,
          name: category.name,
          image: {
            id: category.image_id,
            src: category.image_src,
            h: category.image_h,
            s: category.image_s,
            l: category.image_l
          }
        }))
      ),
      clothingSizes: normalize(clothingSizes),
      footwearBrands: normalize(footwearBrands),
      footwearCategories: normalize(
        footwearCategories.map(category => ({
          product_count: category.product_count,
          id: category.id,
          name: category.name,
          image: {
            id: category.image_id,
            src: category.image_src,
            h: category.image_h,
            s: category.image_s,
            l: category.image_l
          }
        }))
      ),
      footwearSizes: normalize(footwearSizes),
      colors: normalize(colors)
    }
  };
};

const normalize = arr =>
  arr.reduce((collection, row) => {
    collection[row.id] = row;
    return collection;
  }, {});
