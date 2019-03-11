class FootwearBrand {
  constructor(db) {
    this.db = db;
  }

  select() {
    return this.db
      .from("brand")
      .count({ product_count: "clothing.id" })
      .select("brand.id", "brand.name")
      .innerJoin("clothing", "clothing.brand_id", "brand.id")
      .groupBy("brand.id")
      .orderBy("brand.name");
  }
}

module.exports = db => new FootwearBrand(db);
