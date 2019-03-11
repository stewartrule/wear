class ClothingReview {
  constructor(db) {
    this.db = db;
  }

  select() {
    return this.db
      .from("clothing_review")
      .select(
        "clothing_review.id",
        "clothing_review.clothing_id",
        "clothing_review.title",
        "clothing_review.description",
        "clothing_review.user_id",
        "clothing_review.rating",
        "clothing_review.created_at"
      )
      .orderBy("created_at", "desc");
  }

  getByClothingIds(clothingIds) {
    return clothingIds.length
      ? this.select()
          .whereIn("clothing_review.clothing_id", clothingIds)
          .orderBy("clothing_review.rating")
      : [];
  }
}

module.exports = db => new ClothingReview(db);
