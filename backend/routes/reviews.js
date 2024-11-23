const { Router } = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const router = new Router();

// POST review for a specific destination
router.post("/:destinationId/reviews", async (req, res) => {
  console.log("Request received:", req.params, req.body);
  const client = new MongoClient(process.env.MONGODB_URL, { useUnifiedTopology: true });
  try {
    await client.connect();
    const database = client.db(process.env.DB_NAME);
    const reviews = database.collection("Reviews");
    const { destinationId } = req.params;
    const { rating, comment, user } = req.body;

    if (!rating || !comment || !user) {
      return res.status(400).json({ error: "Rating, comment, and user are required." });
    }

    const newReview = {
      destinationId: new ObjectId(destinationId),
      rating,
      comment,
      user,
      createdAt: new Date()
    };

    const result = await reviews.insertOne(newReview);

    // Fetch the inserted review using its insertedId
    const insertedReview = await reviews.findOne({ _id: result.insertedId });
    res.status(200).json(insertedReview);
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ error: "Error adding review: " + error.message });
  } finally {
    await client.close();
  }
});

module.exports = router;
