class User {
  constructor(db) {
    this.db = db;
  }

  select() {
    return this.db
      .from("user")
      .select(
        "id",
        "firstname",
        "lastname",
        "email",
        "phone",
        "male",
        "footwear_size_id",
        "clothing_size_id"
      );
  }

  getById(userId) {
    return this.select()
      .where("id", userId)
      .limit(1);
  }

  getFootwearWishlistByUserId(userId) {
    return this.db
      .from("wishlist")
      .select(
        "wishlist.amount",
        "wishlist.footwear_variant_id",
        "footwear_variant.footwear_id",
        "footwear_variant.footwear_size_id",
        "footwear_size.us as size_us",
        "footwear_size.eu as size_eu",
        "footwear_size.asia as size_asia",
        "footwear.name"
      )
      .innerJoin(
        "footwear_variant",
        "footwear_variant.id",
        "wishlist.footwear_variant_id"
      )
      .innerJoin("footwear", "footwear.id", "footwear_variant.footwear_id")
      .innerJoin(
        "footwear_size",
        "footwear_size.id",
        "footwear_variant.footwear_size_id"
      )
      .where("user_id", userId);
  }

  getClothingWishlistByUserId(userId) {
    return this.db
      .from("wishlist")
      .select(
        "wishlist.amount",
        "wishlist.clothing_variant_id",
        "clothing_variant.clothing_id",
        "clothing_variant.clothing_size_id",
        "clothing_size.name as size_name",
        "clothing.name"
      )
      .innerJoin(
        "clothing_variant",
        "clothing_variant.id",
        "wishlist.clothing_variant_id"
      )
      .innerJoin("clothing", "clothing.id", "clothing_variant.clothing_id")
      .innerJoin(
        "clothing_size",
        "clothing_size.id",
        "clothing_variant.clothing_size_id"
      )
      .where("user_id", userId);
  }
}

module.exports = db => new User(db);
