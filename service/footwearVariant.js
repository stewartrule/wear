class FootwearVariant {
  constructor(db) {
    this.db = db;
  }

  select() {
    return this.db
      .from("footwear_variant")
      .select(
        "footwear_variant.id",
        "footwear_variant.footwear_id",
        "footwear_size.id as size_id",
        "footwear_variant.in_stock",
        "color.id as color_id"
      )
      .innerJoin(
        "footwear_size",
        "footwear_size.id",
        "footwear_variant.footwear_size_id"
      )
      .innerJoin("color", "color.id", "footwear_variant.color_id");
  }

  getByFootwearIds(footwearIds) {
    return footwearIds.length
      ? this.select().whereIn("footwear_variant.footwear_id", footwearIds)
      : [];
  }
}

module.exports = db => new FootwearVariant(db);
