class FootwearReview {
  constructor(db) {
    this.db = db;
  }

  select() {
    return this.db
      .from("footwear_review")
      .select(
        "footwear_review.id",
        "footwear_review.footwear_id",
        "footwear_review.title",
        "footwear_review.description",
        "footwear_review.user_id",
        "footwear_review.rating",
        "footwear_review.created_at"
      )
      .orderBy("created_at", "desc");
  }

  getByFootwearIds(footwearIds) {
    return footwearIds.length
      ? this.select()
          .whereIn("footwear_review.footwear_id", footwearIds)
          .orderBy("footwear_review.rating")
      : [];
  }
}

module.exports = db => new FootwearReview(db);
