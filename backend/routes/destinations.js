// routes/destinations.js

const { Router } = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const router = new Router();

// 1. GET route for fetching ALL destinations
router.get("/", async (req, res) => {
  const { country } = req.query; // Get the country from query parameters
  const client = new MongoClient(process.env.MONGODB_URL);

  try {
    await client.connect();
    const database = client.db(process.env.DB_NAME);
    const destinations = database.collection("destinations");

    // Construct query based on provided parameters
    const query = country ? { country } : {}; // Use country in the query
    const result = await destinations.find(query).toArray();

    console.log("Querying destinations with:", query); // Debugging line
    console.log("Fetched results:", result); // Debugging line

    res.json(result); // Send the filtered results back
  } catch (error) {
    console.error("Error fetching destinations:", error);
    res.status(500).json({ error: "Failed to fetch destinations" });
  } finally {
    await client.close();
  }
});

// 2. GET route for fetching a SINGLE destination by ID
router.get("/:id", async (req, res) => {
  const client = new MongoClient(process.env.MONGODB_URL);

  try {
    await client.connect();
    const database = client.db(process.env.DB_NAME);
    const destinations = database.collection("destinations");
    const reviewsCollection = database.collection("Reviews"); // Add this line

    const destinationId = req.params.id; // Get ID from the URL
    const destination = await destinations.findOne({ _id: new ObjectId(destinationId) });

    if (!destination) {
      return res.status(404).json({ error: "Destination not found" });
    }

    // Fetch reviews for the specific destination
    const reviews = await reviewsCollection.find({ destinationId: new ObjectId(destinationId) }).toArray();
    
    // Include reviews in the destination object
    destination.reviews = reviews;

    res.json(destination); // Send the specific destination as JSON
  } catch (error) {
    console.error("Error fetching destination:", error);
    res.status(500).json({ error: "Failed to fetch destination" });
  } finally {
    await client.close();
  }
});

// 3. POST route for adding a new destination
router.post("/", async (req, res) => {
  const client = new MongoClient(process.env.MONGODB_URL);

  try {
    await client.connect();
    const database = client.db(process.env.DB_NAME);
    const destinations = database.collection("destinations");

    const newDestination = req.body; // Get destination data from the request body

    // Validate if necessary
    if (!newDestination.name || !newDestination.country || !newDestination.description || !newDestination.image_url) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Insert the new destination into the database
    const result = await destinations.insertOne(newDestination);
    res.status(201).json(result.ops[0]); // Send back the added destination
  } catch (error) {
    console.error("Error adding destination:", error);
    res.status(500).json({ error: "Error adding destination" });
  } finally {
    await client.close();
  }
});

// 4. DELETE route for deleting a destination by ID
router.delete("/:id", async (req, res) => {
  const client = new MongoClient(process.env.MONGODB_URL);

  try {
    await client.connect();
    const database = client.db(process.env.DB_NAME);
    const destinations = database.collection("destinations");

    const destinationId = req.params.id;

    const result = await destinations.deleteOne({ _id: new ObjectId(destinationId) });

    if (result.deletedCount === 1) {
      res.status(200).json({ message: "Destination deleted successfully" });
    } else {
      res.status(404).json({ error: "Destination not found" });
    }
  } catch (error) {
    console.error("Error deleting destination:", error);
    res.status(500).json({ error: "Error deleting destination" });
  } finally {
    await client.close();
  }
});

// 5. PUT route for updating a destination by name
router.put("/", async (req, res) => { // Remove :id from the route
  const client = new MongoClient(process.env.MONGODB_URL);

  try {
    await client.connect();
    const database = client.db(process.env.DB_NAME);
    const destinations = database.collection("destinations");

    const { name, updatedData } = req.body; // Expecting name and updated data

    // Validate incoming data
    if (!name || !updatedData) {
      return res.status(400).json({ error: "Name and updated data are required" });
    }

    // Update the destination based on name
    const result = await destinations.updateMany( // Use updateMany if you want to update all matching names
      { name: name }, // Find destinations by name
      { $set: updatedData } // Update fields in the document
    );

    if (result.matchedCount > 0) {
      res.status(200).json({ message: `${result.modifiedCount} destination(s) updated successfully` });
    } else {
      res.status(404).json({ error: "Destination not found" });
    }
  } catch (error) {
    console.error("Error updating destination:", error);
    res.status(500).json({ error: "Error updating destination" });
  } finally {
    await client.close();
  }
});

module.exports = router;
