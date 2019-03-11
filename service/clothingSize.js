class ClothingSize {
  constructor(db) {
    this.db = db;
  }

  select() {
    return this.db
      .from("clothing_size")
      .select("clothing_size.id", "clothing_size.name as size");
  }
}

module.exports = db => new ClothingSize(db);
