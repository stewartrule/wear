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
        "image.id as image_id",
        "image.src as image_src",
        "image.h as image_h",
        "image.s as image_s",
        "image.l as image_l"
      )
      .innerJoin("clothing", "clothing.category_id", "clothing_category.id")
      .innerJoin("image", "image.id", "clothing_category.image_id")
      .groupBy("clothing_category.id")
      .orderBy("clothing_category.name");
  }
}

module.exports = db => new ClothingCategory(db);
