const faker = require("faker");

const CENTS = 100;

const price = () => (19 + Math.round(Math.random() * 20) * 10) * CENTS + 95;
const unique = (value, index, self) => self.indexOf(value) === index;
const slugify = str => faker.helpers.slugify(str).toLowerCase();
const identity = x => x;

const sample = (arr, amount) =>
  arr
    .slice(0)
    .sort(_ => (Math.random() > 0.5 ? -1 : 1))
    .slice(0, amount);

const times = (length, transform = identity) =>
  Array.from({ length }).map((_, i) => transform(i));

const insert = (knex, table, input, transform) =>
  Promise.all(
    input.map(async (name, i) => {
      const [id] = await knex(table).insert(transform(name, i), "id");
      return id;
    })
  );

const getAddress = () => ({
  city: faker.address.city(),
  street: faker.address.streetName(),
  zip_code: faker.address.zipCode(),
  state: faker.address.state(),
  country: faker.address.country()
});

const random = arr =>
  arr.length ? arr[Math.floor(Math.random() * arr.length)] : null;

exports.seed = async (knex, Promise) => {
  console.log("seed");

  const tables = [
    "address",
    "brand",
    "color",
    "favorite_clothing",
    "favorite_footwear",
    "order",
    "footwear_size",
    "footwear_category",
    "footwear_variant",
    "footwear_review",
    "footwear",
    "clothing_size",
    "clothing_category",
    "clothing_variant",
    "clothing_review",
    "clothing",
    "user",
    "wishlist"
  ];
  await Promise.all(tables.map(table => knex(table).del()));

  const clothingSizes = ["xs", "s", "m", "l", "xl", "2xl"];
  const footwearSizes = times(3, i => 35 + i * 0.5);

  const clothingSizeIds = await insert(
    knex,
    "clothing_size",
    clothingSizes,
    name => ({
      name,
      created_at: knex.fn.now()
    })
  );
  console.log("inserted clothing sizes");

  const footwearSizeIds = await insert(
    knex,
    "footwear_size",
    footwearSizes,
    size => ({
      eu: size,
      us: size,
      asia: size,
      created_at: knex.fn.now()
    })
  );
  console.log("inserted footwear sizes");

  const userIds = await insert(
    knex,
    "user",
    times(10, () => {
      const male = faker.random.boolean();

      return {
        male,
        phone: faker.phone.phoneNumber(),
        firstname: faker.name.firstName(male),
        lastname: faker.name.lastName(male),
        domainName: faker.internet.domainName()
      };
    }),
    ({ firstname, lastname, domainName, male, phone }) => ({
      firstname,
      lastname,
      male,
      phone,
      clothing_size_id: random(clothingSizeIds),
      footwear_size_id: random(footwearSizeIds),
      email: `${firstname.charAt(0)}.${slugify(lastname)}@${domainName}`,
      created_at: knex.fn.now()
    })
  );
  console.log("inserted users", userIds);

  const brandIds = await insert(
    knex,
    "brand",
    [
      "Adidas",
      "Calvin Klein",
      "Converse",
      "G-Star",
      "Gucci",
      "Lacoste",
      "New Balance",
      "Nike",
      "Rolex",
      "Sotch & Soda",
      "The North Face",
      "Tommy Hilfiger"
    ],
    name => ({
      name,
      slug: slugify(name),
      created_at: knex.fn.now()
    })
  );
  console.log("inserted brands");

  const clothingCategoryIds = await insert(
    knex,
    "clothing_category",
    times(7, () => faker.commerce.department()).filter(unique),
    name => ({
      name,
      slug: slugify(name),
      created_at: knex.fn.now()
    })
  );
  console.log("inserted clothing categories");

  const footwearCategoryIds = await insert(
    knex,
    "footwear_category",
    times(7, () => faker.commerce.department()).filter(unique),
    name => ({
      name,
      slug: slugify(name),
      created_at: knex.fn.now()
    })
  );
  console.log("inserted footwear categories");

  const colorIds = await insert(
    knex,
    "color",
    times(15, i => ({
      h: i * (360 / 15),
      l: 70,
      created_at: knex.fn.now()
    })),
    identity
  );
  console.log("inserted colors");

  const insertProductCreator = (table, brandId) => categoryId => {
    const name = [
      faker.commerce.productName(),
      faker.company.catchPhraseNoun()
    ].join(" ");

    return knex(table).insert(
      {
        name,
        male: faker.random.boolean(),
        slug: slugify(name),
        description: faker.lorem.paragraph(),
        brand_id: brandId,
        price: price(),
        category_id: categoryId,
        created_at: knex.fn.now()
      },
      "id"
    );
  };

  /**
   * Clothing
   */
  const clothingInserts = brandIds.flatMap(brandId =>
    clothingCategoryIds.map(insertProductCreator("clothing", brandId))
  );
  const clothingReturns = await Promise.all(clothingInserts);
  const clothingIds = clothingReturns.map(res => res[0]);

  console.log("inserted clothing");

  const clothingVariantInserts = clothingIds.flatMap(clothingId => {
    const colorSamples = sample(colorIds, 3);
    return clothingSizeIds.flatMap(clothingSizeId =>
      colorSamples.map(colorId =>
        knex("clothing_variant").insert(
          {
            clothing_id: clothingId,
            clothing_size_id: clothingSizeId,
            color_id: colorId,
            in_stock: Math.round(Math.random() * 10)
          },
          "id"
        )
      )
    );
  });
  const clothingVariantReturns = await Promise.all(clothingVariantInserts);
  const clothingVariantIds = clothingVariantReturns.map(res => res[0]);

  console.log("inserted clothing variants");

  /**
   * Footwear
   */
  const footwearInserts = brandIds.flatMap(brandId =>
    footwearCategoryIds.map(insertProductCreator("footwear", brandId))
  );
  const footwearReturns = await Promise.all(footwearInserts);
  const footwearIds = footwearReturns.map(res => res[0]);

  console.log("inserted footwear");

  const footwearVariantInserts = footwearIds.flatMap(footwearId => {
    const colorSamples = sample(colorIds, 3);
    return footwearSizeIds.flatMap(footwearSizeId =>
      colorSamples.map(colorId =>
        knex("footwear_variant").insert(
          {
            footwear_id: footwearId,
            footwear_size_id: footwearSizeId,
            color_id: colorId,
            in_stock: Math.round(Math.random() * 10)
          },
          "id"
        )
      )
    );
  });
  const footwearVariantReturns = await Promise.all(footwearVariantInserts);
  const footwearVariantIds = footwearVariantReturns.map(res => res[0]);

  console.log("inserted footwear variants", footwearVariantIds);

  /**
   * Clothing Reviews
   */
  const clothingReviewInserts = clothingIds.flatMap(clothingId => {
    return insert(knex, "clothing_review", userIds, userId => ({
      clothing_id: clothingId,
      user_id: userId,
      rating: 1 + Math.floor(Math.random() * 5),
      title: faker.company.catchPhraseAdjective(),
      description: faker.lorem.paragraph(),
      created_at: knex.fn.now()
    }));
  });
  await Promise.all(clothingReviewInserts);
  console.log("inserted clothing reviews");

  const wishlistInserts1 = userIds.flatMap(userId => {
    return insert(
      knex,
      "wishlist",
      sample(clothingVariantIds, 5),
      clothingVariantId => ({
        user_id: userId,
        clothing_variant_id: clothingVariantId,
        amount: 1,
        created_at: knex.fn.now()
      })
    );
  });
  await Promise.all(wishlistInserts1);
  console.log("inserted clothing wishlist");

  const wishlistInserts2 = userIds.flatMap(userId => {
    return insert(
      knex,
      "wishlist",
      sample(footwearVariantIds, 5),
      footwearVariantId => ({
        user_id: userId,
        footwear_variant_id: footwearVariantId,
        amount: 1,
        created_at: knex.fn.now()
      })
    );
  });
  await Promise.all(wishlistInserts2);
  console.log("inserted footwear wishlist");

  const favoriteClothingInserts = userIds.flatMap(userId =>
    sample(clothingIds, 5).map(clothingId =>
      knex("favorite_clothing").insert({
        user_id: userId,
        clothing_id: clothingId,
        created_at: knex.fn.now()
      })
    )
  );
  await Promise.all(favoriteClothingInserts);
  console.log("inserted favorite clothing");

  const orderInserts = userIds
    .flatMap(userId =>
      times(2, () => {
        const address = getAddress();

        return knex("order").insert(
          {
            ...address,
            user_id: userId,
            delivery_date: knex.fn.now(),
            created_at: knex.fn.now()
          },
          "id"
        );
      })
    )
    .flat();

  const orderIds = await Promise.all(orderInserts);
  console.log("inserted orders", orderIds.slice(0, 3));

  const productOrderInserts1 = orderIds
    .flat()
    .flatMap(orderId =>
      sample(clothingVariantIds, 3).map(clothingVariantId =>
        knex("product_order").insert(
          {
            order_id: orderId,
            clothing_variant_id: clothingVariantId,
            amount: 1,
            price: 100, // fixme
            created_at: knex.fn.now()
          },
          "id"
        )
      )
    )
    .flat();
  await Promise.all(productOrderInserts1);
  console.log("inserted order clothings");

  const productOrderInserts2 = orderIds
    .flat()
    .flatMap(orderId =>
      sample(footwearVariantIds, 2).map(footwearVariantId =>
        knex("product_order").insert(
          {
            order_id: orderId,
            footwear_variant_id: footwearVariantId,
            amount: 1,
            price: 100, // fixme
            created_at: knex.fn.now()
          },
          "id"
        )
      )
    )
    .flat();
  await Promise.all(productOrderInserts2);
  console.log("inserted order footwear");

  const addressInserts = userIds.flatMap(userId =>
    insert(knex, "address", times(2), () => {
      const address = getAddress();
      return {
        ...address,
        user_id: userId,
        created_at: knex.fn.now()
      };
    })
  );
  await Promise.all(addressInserts);
  console.log("inserted addresses");
};
