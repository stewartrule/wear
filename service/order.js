class Order {
  constructor(db) {
    this.db = db;
  }

  select() {
    return this.db
      .select(
        "id",
        "created_at",
        "canceled_at",
        "processed_at",
        "shipped_at",
        "delivered_at"
      )
      .from("order")
      .orderBy("created_at", "desc");
  }

  getByUserId(userId, limit = 10) {
    return this.select()
      .where("user_id", userId)
      .limit(limit);
  }
}

module.exports = db => new Order(db);
