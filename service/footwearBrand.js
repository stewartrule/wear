class FootwearBrand {
  constructor(db) {
    this.db = db;
  }

  select() {
    return this.db
      .from("brand")
      .count({ product_count: "footwear.id" })
      .select("brand.id", "brand.name")
      .innerJoin("footwear", "footwear.brand_id", "brand.id")
      .groupBy("brand.id")
      .orderBy("brand.name");
  }
}

module.exports = db => new FootwearBrand(db);
