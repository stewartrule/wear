class Clothing {
  constructor(db) {
    this.db = db;
  }

  select() {
    return this.db
      .from("clothing")
      .select(
        "clothing.id",
        "clothing.name",
        "clothing.description",
        "clothing.price",
        "clothing.brand_id",
        "brand.name as brand_name",
        "image.id as image_id",
        "image.src as image_src",
        "image.h as image_h",
        "image.s as image_s",
        "image.l as image_l",
        "clothing.category_id",
        "clothing_category.name as category_name"
      )
      .innerJoin(
        "clothing_category",
        "clothing_category.id",
        "clothing.category_id"
      )
      .innerJoin("image", "image.id", "clothing.image_id")
      .innerJoin("brand", "brand.id", "clothing.brand_id")
      .orderBy("clothing.id");
  }

  limit(limit = 50) {
    return this.select().limit(limit);
  }
}

module.exports = db => new Clothing(db);
