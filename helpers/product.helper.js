function buildCriteria(query) {
  const criteria = {};

  // Adding inStock criterion
  if (query.inStock === "true") {
    criteria.quantity = { $gt: 0 }; // gt for greater than
  }

  // Adding name criterion (case-insensitive search)
  if (query.name !== undefined && query.name.trim() !== "") {
    criteria.name = { $regex: query.name, $options: "i" }; // i for case-insensitive
  }

  // Adding minimum price criterion
  if (query.minPrice !== undefined) {
    criteria.price = { $gte: query.minPrice }; // gte for greater than or equal
  }

  // Adding maximum price criterion
  if (query.maxPrice !== undefined) {
    if (criteria.price === undefined) {
      criteria.price = {};
    }
    criteria.price.$lte = query.maxPrice; // lte for less than or equal
  }

  criteria.categories = { $in: query.categories };

  console.log("query", query);

  return criteria;
}

module.exports = { buildCriteria };
