class Address {
  constructor(db) {
    this.db = db;
  }

  select() {
    return this.db
      .select("id", "city", "street", "zip_code", "state")
      .from("address");
  }

  getByUserId(userId, limit = 10) {
    return this.select()
      .where("user_id", userId)
      .limit(limit);
  }
}

module.exports = db => new Address(db);
