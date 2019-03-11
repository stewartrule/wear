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
      clothingCategories: normalize(clothingCategories),
      clothingSizes: normalize(clothingSizes),
      footwearBrands: normalize(footwearBrands),
      footwearCategories: normalize(footwearCategories),
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
