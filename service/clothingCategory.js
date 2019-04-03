class ClothingCategory {
  constructor(db) {
    this.db = db;
  }

  select() {
    return this.db
      .from("clothing_category")
      .count({ product_count: "clothing.id" })
      .select(
        "clothing_category.id",
        "clothing_category.name",
        "clothing_category.image"
      )
      .innerJoin("clothing", "clothing.category_id", "clothing_category.id")
      .groupBy("clothing_category.id")
      .orderBy("clothing_category.name");
  }
}

module.exports = db => new ClothingCategory(db);
