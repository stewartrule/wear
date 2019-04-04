exports.up = async ({ schema }) => {
  const withProductInfo = t => {
    t.increments();
    t.string("name", 150);
    t.string("slug", 150);
    t.integer("image_id")
      .unsigned()
      .notNullable();

    t.text("description");
    t.boolean("male").nullable();

    t.integer("price")
      .unsigned()
      .notNullable();
    t.integer("category_id")
      .unsigned()
      .notNullable();
    t.integer("brand_id")
      .unsigned()
      .notNullable();

    t.datetime("created_at").notNullable();
    t.datetime("changed_at").nullable();

    t.index("image_id");
    t.index("category_id");
    t.index("brand_id");
    t.unique("slug");
  };

  const withAddress = t => {
    t.string("city", 150);
    t.string("street", 150);
    t.string("zip_code", 150);
    t.string("state", 150);
    t.string("country", 150);
  };

  const withHSL = t => {
    t.integer("h")
      .unsigned()
      .defaultTo(0)
      .notNullable();
    t.integer("s")
      .unsigned()
      .defaultTo(100)
      .notNullable();
    t.integer("l")
      .unsigned()
      .defaultTo(50)
      .notNullable();
  };

  await schema
    .createTable("user", t => {
      t.increments();
      t.string("firstname", 150);
      t.string("lastname", 150);
      t.string("email", 150);
      t.string("phone", 150);
      t.boolean("male").nullable();

      t.integer("clothing_size_id")
        .unsigned()
        .notNullable();

      t.integer("footwear_size_id")
        .unsigned()
        .notNullable();

      t.datetime("created_at").notNullable();
      t.datetime("changed_at").nullable();

      t.unique("email");
    })

    .createTable("address", t => {
      t.increments();
      t.integer("user_id")
        .unsigned()
        .notNullable();

      withAddress(t);

      t.datetime("created_at").notNullable();
      t.datetime("changed_at").nullable();
    })

    .createTable("image", t => {
      t.increments();
      t.string("src", 150);

      withHSL(t);

      t.datetime("created_at").notNullable();
      t.datetime("changed_at").nullable();
    })

    .createTable("brand", t => {
      t.increments();
      t.string("name", 150);
      t.string("slug", 150);
      t.datetime("created_at").notNullable();
      t.datetime("changed_at").nullable();

      t.unique("slug");
    })

    .createTable("color", t => {
      t.increments();
      withHSL(t);
      t.datetime("created_at").notNullable();
      t.datetime("changed_at").nullable();
    })

    .createTable("clothing_category", t => {
      t.increments();
      t.string("name", 150);
      t.string("slug", 150);
      t.integer("image_id")
        .unsigned()
        .notNullable();
      t.datetime("created_at").notNullable();
      t.datetime("changed_at").nullable();

      t.index("image_id");
      t.unique("slug");
    })

    .createTable("clothing", t => {
      withProductInfo(t);
    })

    .createTable("clothing_size", t => {
      t.increments();
      t.string("name", 150);
      t.datetime("created_at").notNullable();
      t.datetime("changed_at").nullable();
    })

    .createTable("clothing_variant", t => {
      t.increments();
      t.integer("clothing_id")
        .unsigned()
        .notNullable();
      t.integer("clothing_size_id")
        .unsigned()
        .notNullable();
      t.integer("color_id")
        .unsigned()
        .notNullable();

      t.integer(`in_stock`)
        .unsigned()
        .defaultTo(0)
        .notNullable();

      t.index("clothing_id");
      t.index("clothing_size_id");
      t.index("color_id");
    })

    .createTable("footwear", t => {
      withProductInfo(t);
    })

    .createTable("footwear_category", t => {
      t.increments();
      t.string("name", 150);
      t.string("slug", 150);
      t.integer("image_id")
        .unsigned()
        .notNullable();

      t.datetime("created_at").notNullable();
      t.datetime("changed_at").nullable();

      t.index("image_id");
      t.unique("slug");
    })

    .createTable("footwear_size", t => {
      t.increments();
      t.float("us")
        .unsigned()
        .notNullable()
        .defaultTo(7);
      t.float("eu")
        .unsigned()
        .notNullable()
        .defaultTo(37.5);
      t.float("asia")
        .unsigned()
        .notNullable()
        .defaultTo(23);
      t.datetime("created_at").notNullable();
      t.datetime("changed_at").nullable();
    })

    .createTable("footwear_variant", t => {
      t.increments();
      t.integer("footwear_id")
        .unsigned()
        .notNullable();
      t.integer("footwear_size_id")
        .unsigned()
        .notNullable();
      t.integer("color_id")
        .unsigned()
        .notNullable();
      t.integer(`in_stock`)
        .unsigned()
        .defaultTo(0)
        .notNullable();

      t.index("footwear_id");
      t.index("footwear_size_id");
      t.index("color_id");
    })

    .createTable("clothing_review", t => {
      t.increments();
      t.integer("clothing_id")
        .unsigned()
        .notNullable();
      t.integer("user_id")
        .unsigned()
        .notNullable();
      t.integer("rating")
        .unsigned()
        .notNullable();
      t.string("title", 150);
      t.text("description");
      t.datetime("created_at").notNullable();
      t.datetime("changed_at").nullable();

      t.index("clothing_id");
      t.index("user_id");
    })

    .createTable("footwear_review", t => {
      t.increments();
      t.integer("footwear_id")
        .unsigned()
        .notNullable();
      t.integer("user_id")
        .unsigned()
        .notNullable();
      t.integer("rating")
        .unsigned()
        .notNullable();
      t.string("title", 150);
      t.text("description");
      t.datetime("created_at").notNullable();
      t.datetime("changed_at").nullable();

      t.index("footwear_id");
      t.index("user_id");
    })

    .createTable("favorite_clothing", t => {
      t.integer("clothing_id")
        .unsigned()
        .notNullable();
      t.integer("user_id")
        .unsigned()
        .notNullable();
      t.datetime("created_at").notNullable();

      t.primary(["clothing_id", "user_id"]);
    })

    .createTable("favorite_footwear", t => {
      t.integer("footwear_id")
        .unsigned()
        .notNullable();
      t.integer("user_id")
        .unsigned()
        .notNullable();
      t.datetime("created_at").notNullable();

      t.primary(["footwear_id", "user_id"]);
    })

    .createTable("sale", t => {
      t.increments();
      t.string("name", 150);
    })

    .createTable("sale_clothing", t => {
      t.integer("clothing_id")
        .unsigned()
        .notNullable();
      t.integer("sale_id")
        .unsigned()
        .notNullable();

      t.primary(["clothing_id", "sale_id"]);
    })

    .createTable("wishlist", t => {
      t.increments();

      t.integer("user_id")
        .unsigned()
        .notNullable();
      t.integer("clothing_variant_id")
        .unsigned()
        .nullable();
      t.integer("footwear_variant_id")
        .unsigned()
        .nullable();
      t.integer("amount")
        .unsigned()
        .defaultTo(1);
      t.datetime("created_at").notNullable();
      t.datetime("changed_at").nullable();

      t.index("clothing_variant_id");
      t.index("footwear_variant_id");
      t.index("user_id");
    })

    .createTable("order", t => {
      t.increments();

      t.integer("user_id")
        .unsigned()
        .notNullable();

      withAddress(t);

      t.date("delivery_date").nullable();
      t.datetime("canceled_at").nullable();
      t.datetime("processed_at").nullable();
      t.datetime("shipped_at").nullable();
      t.datetime("delivered_at").nullable();
      t.datetime("created_at").notNullable();
      t.datetime("changed_at").nullable();
    })

    .createTable("product_order", t => {
      t.increments();

      t.integer("clothing_variant_id")
        .unsigned()
        .nullable();
      t.integer("footwear_variant_id")
        .unsigned()
        .nullable();
      t.integer("order_id")
        .unsigned()
        .notNullable();
      t.integer("amount")
        .unsigned()
        .defaultTo(1);
      t.integer("price")
        .unsigned()
        .notNullable();
      t.datetime("created_at").notNullable();
      t.datetime("changed_at").nullable();

      t.index("clothing_variant_id");
      t.index("footwear_variant_id");
      t.index("order_id");
    });
};

exports.down = async ({ schema }) => {
  await schema
    .dropTable("address")
    .dropTable("brand")
    .dropTable("color")
    .dropTable("favorite_clothing")
    .dropTable("favorite_footwear")
    .dropTable("image")
    .dropTable("order")
    .dropTable("product_order")
    .dropTable("footwear_size")
    .dropTable("footwear_category")
    .dropTable("footwear_variant")
    .dropTable("footwear_review")
    .dropTable("footwear")
    .dropTable("clothing_size")
    .dropTable("clothing_category")
    .dropTable("clothing_variant")
    .dropTable("clothing_review")
    .dropTable("clothing")
    .dropTable("sale")
    .dropTable("sale_clothing")
    .dropTable("user")
    .dropTable("wishlist");
};
