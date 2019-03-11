module.exports = ({
  addressService,
  orderService,
  userService
}) => async () => {
  const userId = 10;

  // @todo: login
  const [user] = await userService.getById(userId);

  if (!user) {
    return {
      data: {
        user: null,
        clothingWishlist: [],
        footwearWishlist: [],
        addresses: [],
        orders: []
      }
    };
  }

  const [
    addresses,
    orders,
    clothingWishlist,
    footwearWishlist
  ] = await Promise.all([
    addressService.getByUserId(userId),
    orderService.getByUserId(userId),
    userService.getClothingWishlistByUserId(userId),
    userService.getFootwearWishlistByUserId(userId)
  ]);

  return {
    data: {
      user,
      clothingWishlist,
      footwearWishlist,
      addresses,
      orders
    }
  };
};
