class ClothingSize {
  constructor(db) {
    this.db = db;
  }

  select() {
    return this.db
      .from("footwear_size")
      .select(
        "footwear_size.id",
        "footwear_size.us",
        "footwear_size.eu",
        "footwear_size.asia"
      )
      .orderBy("us", "asc");
  }
}

module.exports = db => new ClothingSize(db);
