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
        "footwear.image",
        "footwear.brand_id",
        "brand.name as brand_name",
        "footwear.category_id",
        "footwear_category.name as category_name"
      )
      .innerJoin(
        "footwear_category",
        "footwear_category.id",
        "footwear.category_id"
      )
      .innerJoin("brand", "brand.id", "footwear.brand_id");
  }

  limit(limit = 50) {
    return this.select().limit(limit);
  }
}

module.exports = db => new Footwear(db);
