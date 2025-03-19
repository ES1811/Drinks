var express = require("express");
var router = express.Router();
var { Drink, Drinks } = require("../models/drink");

const drinksModel = new Drinks();

router.get("/", async (req, res) => {
  try {
    const result = drinksModel.showAllDrinks();
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.post("/add", async (req, res) => {
  try {
    const { id, name } = req.body;
    const newDrink = new Drink(id, name);
    console.log(id, name);
    drinksModel.addDrink(newDrink);
    res.status(200).json(newDrink);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.put("/update/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { newName } = req.body;
    const updatedDrinks = new Drink(id, newName);

    if (isNaN(id) && !newName) {
      return res
        .status(400)
        .json({ message: "enter a valid number and/or name" });
    }
    const result = drinksModel.updateDrink(id, newName);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.get("/find/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const result = drinksModel.showDrinkById(id);
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.delete("/delete/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const result = drinksModel.deleteDrink(id);
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
