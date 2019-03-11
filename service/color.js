class Color {
  constructor(db) {
    this.db = db;
  }

  select() {
    return this.db
      .from("color")
      .select("color.id", "color.h", "color.s", "color.l");
  }
}

module.exports = db => new Color(db);
