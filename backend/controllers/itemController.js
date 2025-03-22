import Item from '../models/itemModel.js';

// @desc   Get all items
// @route  GET /api/items
// @access Public
export const getItems = async (req, res) => {
  try {
    const items = await Item.find({});
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Get single item
// @route  GET /api/items/:id
// @access Public
export const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Create a new item
// @route  POST /api/items
// @access Public
export const createItem = async (req, res) => {
  try {
    const { name, description, price, quantity, image } = req.body;
    const newItem = new Item({ name, description, price, quantity, image });
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc   Update an item
// @route  PUT /api/items/:id
// @access Public
export const updateItem = async (req, res) => {
  try {
    const { name, description, price, quantity, image } = req.body;
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      { name, description, price, quantity, image },
      { new: true }
    );
    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc   Delete an item
// @route  DELETE /api/items/:id
// @access Public
export const deleteItem = async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
