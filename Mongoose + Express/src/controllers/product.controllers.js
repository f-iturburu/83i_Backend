import Product from "../models/product.model.js";

export const createProduct = async (req, res) => {
  const { name, price, discountPercentage, category, visible, image } =
    req.body;
  try {
    const newProduct = await Product.create({
      name: name,
      price: price,
      discountPercentage: discountPercentage,
      category: category,
      visible: visible,
      image: image,
    });

    res.status(201).json({ id: newProduct._id });
  } catch (error) {
    return res.status(500).json({ messagee: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ messagee: error.message });
  }
};

export const deleteById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);

    if (product) {
      await Product.findByIdAndDelete(id);
      return res.status(204);
    }

    return res.status(404).json({ message: "Producto no encontrado" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);

    if (product) {
      return res.status(200).json(product);
    }

    return res.status(404).json({ message: "Producto no encontrado" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const searchWithOptions = async (req, res) => {
  const { name, price, category } = req.query;
  const priceSortQuery = price == "asc" ? 1 : -1;
  const searchQuery = { visible: true };

  if (name) {
    const partialMatchName = new RegExp(name, "i");
    searchQuery.name = { $regex: partialMatchName };
  }

  if (category) {
    searchQuery.category = category;
  }


  if (price == "disc") {
    searchQuery.discountPercentage = { $exists: true };
  }

  console.log(searchQuery);
  try {
    const products = await Product.find(searchQuery).sort({
      price: priceSortQuery,
    });

    if (products.length >= 1) {
      return res.status(200).json(products);
    }

    return res.status(404).json({ message: "Producto no encontrado" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const edit = async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  console.log(payload);

  try {
    const product = await Product.findById(id);

    if (product) {
      await Product.findByIdAndUpdate(id, payload);
      return res
        .status(200)
        .json({ message: "Producto modificado exitosamente" });
    }

    return res.status(404).json({ message: "Producto no encontrado" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
