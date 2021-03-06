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
        "image.id as image_id",
        "image.src as image_src",
        "image.h as image_h",
        "image.s as image_s",
        "image.l as image_l"
      )
      .innerJoin("footwear", "footwear.category_id", "footwear_category.id")
      .innerJoin("image", "image.id", "footwear_category.image_id")
      .groupBy("footwear_category.id")
      .orderBy("footwear_category.name");
  }
}

module.exports = db => new FootwearCategory(db);
