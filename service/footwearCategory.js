class FootwearCategory {
  constructor(db) {
    this.db = db;
  }

  select() {
    return this.db
      .from("footwear_category")
      .count({ product_count: "footwear.id" })
      .select(
        "footwear_category.id",
        "footwear_category.name",
        "footwear_category.image"
      )
      .innerJoin("footwear", "footwear.category_id", "footwear_category.id")
      .groupBy("footwear_category.id")
      .orderBy("footwear_category.name");
  }
}

module.exports = db => new FootwearCategory(db);
