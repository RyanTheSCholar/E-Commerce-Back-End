const router = require("express").Router();
const { json } = require("sequelize");
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  try {
    const cat = await Category.findAll();
    res.status(200).json(cat);
  } catch (err) {
    res.status(500).json(err);
  }
  // find all categories
  // be sure to include its associated Products
});

router.get("/:id", async (req, res) => {
  try {
    const cat = await Category.findByPk(req.params.id, {
      include: [{ model: Product}],
    });
    if (!cat) {
      res.status(404).json({ message: "This category is not found." });
    }
    res.status(200).json(cat);
  } catch (err) {
    res.status(500).json(err);
  }
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post("/", async (req, res) => {
  // create a new category
  try {
    const cat = await Category.create(req.body);
    res.status(200).json(cat);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const cat = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    // insert bang statement later
    if(!cat){
      res.status(400).json({messsage: 'This is not a valid ID.'})
    }
    res.status(200).json(cat);
    
  } catch (err) {
    res.status(500).json(err);
  }
  // update a category by its `id` value
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    const cat = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(cat);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
