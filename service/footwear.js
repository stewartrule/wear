class Footwear {
  constructor(db) {
    this.db = db;
  }

  select() {
    return this.db
      .from("footwear")
      .select(
        "footwear.id",
        "footwear.name",
        "footwear.description",
        "footwear.price",
        "footwear.brand_id",
        "image.src as image_src",
        "image.h as image_h",
        "image.s as image_s",
        "image.l as image_l",
        "brand.name as brand_name",
        "footwear.category_id",
        "footwear_category.name as category_name"
      )
      .innerJoin(
        "footwear_category",
        "footwear_category.id",
        "footwear.category_id"
      )
      .innerJoin("image", "image.id", "footwear.image_id")
      .innerJoin("brand", "brand.id", "footwear.brand_id");
  }

  limit(limit = 50) {
    return this.select().limit(limit);
  }
}

module.exports = db => new Footwear(db);
