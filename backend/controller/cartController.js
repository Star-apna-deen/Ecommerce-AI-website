import User from "../model/userModel.js";

export const addToCart = async (req, res) => {
  try {
    const { itemId, size } = req.body;
    const userData = await User.findById(req.userId);

    //check if user exist
    if (!userData) {
      return res.status(404).json({ meg: "User not found" });
    }

    //Ensure cartData is initialize
    let cartData = userData.cartData || {}; //cartdata usermodel me h

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      //item me kuch nhi h to khali object rhne do or jo phle tha wahi rhne do
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    await User.findByIdAndUpdate(req.userId, { cartData });
    return res.status(201).json({ msg: "Added to cart" });
  } catch (error) {
    console.log(error);
    return res.status(201).json({ msg: "addtocart error" });
  }
};

export const UpdateCart = async (req, res) => {
  try {
    const { itemId, size, quantity } = req.body;
    const userData = await User.findById(req.userId);
    let cartData = await userData.cartData; //user ko find kerke uske cartdata ko update ker rahe h

    cartData[item][size] = quantity;

    await User.findByIdAndUpdate(req.userId, { cartData });
    return res.status(201).json({ msg: "cart update" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "updatecart error" });
  }
};

//user ko find kerke uske cart data ko show ker rahe h
export const getUserCart = async (req, res) => {
  try {
    const userData = await User.findById(req.userId);
    let cartData = await userData.cartData;

    return res.status(200).json(cartData);
  } catch (error) {
    console.log(error);
    return res.status(201).json({ msg: "getUserCart error" });
  }
};
