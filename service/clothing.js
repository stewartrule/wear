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
        "clothing.category_id",
        "clothing_category.name as category_name"
      )
      .innerJoin(
        "clothing_category",
        "clothing_category.id",
        "clothing.category_id"
      )
      .innerJoin("brand", "brand.id", "clothing.brand_id")
      .orderBy("clothing.id");
  }

  limit(limit = 50) {
    return this.select().limit(limit);
  }
}

module.exports = db => new Clothing(db);
