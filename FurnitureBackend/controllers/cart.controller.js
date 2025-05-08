import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
const AddToCart = async (req, res) => {
  try {
    const { items } = req.body || {};
    const userId = req?.user?._id;
    if (!userId) {
      return res.status(400).json({ message: "you are not logged in" });
    }
    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Items are required" });
    }
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (
        !item.productId ||
        !mongoose.Types.ObjectId.isValid(items.productId)
      ) {
        return res.status(400).json({ message: "Product id is required" });
      }
      if (!item.quantity || item.quantity < 1) {
        return res.status(400).json({ message: "Quantity is required" });
      }
      const isProductExisted = await Product.findById(item.productId);
      if (!isProductExisted) {
        return res.status(404).json({ message: "Product not found" });
      }
    }
    const cart = await Cart.findOne({ userId });
    //
    if (cart) {
      items.map(async (item) => {
        let existingItem = cart.items.find(
          (i) => i.productId.toString() === item.productId.toString()
        );
        if (existingItem) {
          const newQuantity = (existingItem.quantity += item.quantity);
          if (newQuantity > existingItem.stock) {
            return res.status(400).json({ message: "Out of stock" });
          }
          cart.totalAmount +=
            (item.price - (1 * item.discount) / 100) * item.quantity;
        } else {
          cart.items.push(item);
          cart.totalAmount +=
            (item.price - (1 * item.discount) / 100) * item.quantity;
        }
        await cart.save();
      });
    } else {
      await Cart.create({ userId, items });
    }

    return res.status(200).json({ message: "Added to cart successfully" });
  } catch (error) {
    console.log("create cart error", error);
    return res
      .status(500)
      .json({ message: "Failed to add to cart", error: error.message });
  }
};

const updateCartQuantity = async (req, res) => {
  try {
    const { productId, action } = req.body || {};
    const userId = req?.user?._id;

    if (!productId || !action) {
      return res
        .status(400)
        .json({ message: "Product id and action is required" });
    }
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const cart = await Cart.findOne({ userId });
    if (action === "Increase") {
      const item = cart.items.find(
        (i) => i.productId.toString() === productId.toString()
      );
      if (item.quantity > product.stock) {
        return res.status(400).json({ message: "Out of stock" });
      }
      item.quantity++;
      cart.totalAmount +=
        (product.price - (1 * product.discount) / 100) * item.quantity;
    } else {
      const item = cart.items.find(
        (i) => i.productId.toString() === productId.toString()
      );
      if (item.quantity === 1) {
        return res.status(400).json({ message: "Out of stock" });
      }
      item.quantity--;
    }
    cart.totalAmount +=
      (product.price - (1 * product.discount) / 100) * item.quantity;
    await cart.save();
    return res.status(200).json({ message: "Cart updated successfully" });
  } catch (error) {
    console.log("update cart quantity error", error);
    return res.status(500).json({
      message: "Failed to update cart quantity",
      error: error.message,
    });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const userId = req?.user?._id;
    const { productId } = req.body || {};
    if (!userId) {
      return res.status(400).json({ message: "you are not logged in" });
    }
    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Product id is required" });
    }
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    const removedItem = cart.items.find(
      (i) => i.productId.toString() === productId.toString()
    );
    if (!removedItem) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    if (removedItem) {
      cart.items.filter((i) => i.productId.toString() !== productId.toString());
      cart.totalAmount -=
        (removedItem.price - (1 * removedItem.discount) / 100) *
        removedItem.quantity;
      await cart.save();
    }

    return res.status(200).json({ message: "Removed from cart successfully" });
  } catch (error) {
    console.log("remove from cart error", error);
    return res
      .status(500)
      .json({ message: "Failed to remove from cart", error: error.message });
  }
};
const getAllCarts = async (req, res) => {
  try {
    const userId = req?.user?._id;
    const carts = await Cart.find({ userId });
    res
      .status(200)
      .json({ message: "Carts retrieved successfully", data: carts });
  } catch (error) {
    console.error("get all carts error", error);
    res
      .status(500)
      .json({ message: "Failed to retrieve carts", error: error.message });
  }
};

export {
  AddToCart,
  createCart,
  getAllCarts,
  removeFromCart,
  updateCartQuantity,
};
