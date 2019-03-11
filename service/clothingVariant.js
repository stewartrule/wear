class ClothingVariant {
  constructor(db) {
    this.db = db;
  }

  select() {
    return this.db
      .from("clothing_variant")
      .select(
        "clothing_variant.id",
        "clothing_variant.clothing_id",
        "clothing_size.id as size_id",
        "clothing_variant.in_stock",
        "color.id as color_id"
      )
      .innerJoin(
        "clothing_size",
        "clothing_size.id",
        "clothing_variant.clothing_size_id"
      )
      .innerJoin("color", "color.id", "clothing_variant.color_id");
  }

  getByClothingIds(clothingIds) {
    return clothingIds.length
      ? this.select().whereIn("clothing_variant.clothing_id", clothingIds)
      : [];
  }
}

module.exports = db => new ClothingVariant(db);
