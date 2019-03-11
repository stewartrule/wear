const cfg = require("./cfg");
const knex = require("knex")(cfg);

const accountRoute = require("./routes/account");
const clothingRoute = require("./routes/clothing");
const footwearListRoute = require("./routes/footwear/list");
const settingsRoute = require("./routes/settings");

const addressService = require("./service/address")(knex);
const colorService = require("./service/color")(knex);
const orderService = require("./service/order")(knex);
const userService = require("./service/user")(knex);

const clothingBrandService = require("./service/clothingBrand")(knex);
const clothingCategoryService = require("./service/clothingCategory")(knex);
const clothingReviewService = require("./service/clothingReview")(knex);
const clothingService = require("./service/clothing")(knex);
const clothingSizeService = require("./service/clothingSize")(knex);
const clothingVariantService = require("./service/clothingVariant")(knex);

const footwearBrandService = require("./service/footwearBrand")(knex);
const footwearCategoryService = require("./service/footwearCategory")(knex);
const footwearReviewService = require("./service/footwearReview")(knex);
const footwearService = require("./service/footwear")(knex);
const footwearSizeService = require("./service/footwearSize")(knex);
const footwearVariantService = require("./service/footwearVariant")(knex);

const controllers = {
  clothing: clothingRoute({
    clothingService,
    clothingReviewService,
    clothingVariantService
  }),
  footwear: footwearListRoute({
    footwearService,
    footwearReviewService,
    footwearVariantService
  }),
  settings: settingsRoute({
    clothingBrandService,
    clothingCategoryService,
    clothingSizeService,
    footwearBrandService,
    footwearCategoryService,
    footwearSizeService,
    colorService
  }),
  account: accountRoute({
    addressService,
    orderService,
    userService
  })
};

module.exports = controllers;
