import toast from "react-hot-toast";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const store = (set, get) => ({
  showCart: false,
  cartItems: [],
  totalPrice: 0,
  totalQuantities: 0,
  qty: 0,

  toggleShowCart: (value) => set((state) => ({ showCart: value })),
  toggleCartItemQuantity: (id, operator) => {
    const foundProduct = get().cartItems.find((item) => item._id === id);
    if (operator === "inc") {
      foundProduct.quantity += 1;
      set((state) => [...state.cartItems, { ...foundProduct }]);
      set((state) => ({ totalPrice: state.totalPrice + foundProduct.price }));
      set((state) => ({ totalQuantities: state.totalQuantities + 1 }));
    } else if (operator === "dec" && foundProduct.quantity - 1 > 0) {
      foundProduct.quantity -= 1;
      set((state) => [...state.cartItems, { ...foundProduct }]);
      set((state) => ({ totalPrice: state.totalPrice - foundProduct.price }));
      set((state) => ({ totalQuantities: state.totalQuantities - 1 }));
    }
  },
  onRemove: (id) => {
    const foundProduct = get().cartItems.find((item) => item._id === id);
    set((state) => ({
      totalPrice: state.totalPrice - foundProduct.quantity * foundProduct.price,
    }));
    set((state) => ({
      totalQuantities: state.totalQuantities - foundProduct.quantity,
    }));
    const newCartItems = get().cartItems.filter((item) => item._id !== id);
    set((state) => ({ cartItems: [...newCartItems] }));
  },
  addCartItems: (product, quantity) => {
    console.log(get().cartItems);
    const productExists = get().cartItems.find(
      (item) => item._id === product._id
    );
    console.log("the product exists or not", productExists);
    if (productExists) {
      set(
        (prevTotalPrice) => ({
          totalPrice: prevTotalPrice.totalPrice + product.price * quantity,
        }),
        false,
        "Total Price Added"
      );
      // console.log(get().totalQuantities);
      set(
        (prevQuantity) => ({
          totalQuantities: prevQuantity.totalQuantities + quantity,
        }),
        false,
        "Total Quantity Added"
      );
      const updatedCartItems = get().cartItems.map((item) => {
        if (item._id === product._id)
          return {
            ...item,
            quantity: item.quantity + quantity,
          };
      });

      set((state) => ({
        cartItems: [...updatedCartItems],
      }));
      // if (quantity >= productExists.quantity) {
      //
      //   console.log(updatedCartItems);

      //   set((state) => ({
      //     cartItems: [...updatedCartItems],
      //   }));
      // } else {
      //   set(
      //     (prevTotalPrice) => ({
      //       totalPrice: prevTotalPrice.totalPrice - product.price * quantity,
      //     }),
      //     false,
      //     "Total Price Reduced"
      //   );
      //   set(
      //     (prevQuantity) => ({
      //       totalQuantities: prevQuantity.totalQuantities - quantity,
      //     }),
      //     false,
      //     "Total Quantity Reduced"
      //   );
      //   const updatedCartItems = get().cartItems.map((item) => {
      //     if (item._id === product._id)
      //       return {
      //         ...item,
      //         quantity: item.quantity - quantity,
      //       };
      //   });
      //   console.log(updatedCartItems);

      //   set((state) => ({
      //     cartItems: [...updatedCartItems],
      //   }));
      // }
    } else {
      console.log("This is the first time entering the store");
      console.log(product);
      product.quantity = quantity;
      set((state) => ({
        cartItems: [...state.cartItems, { ...product }],
      }));
      set(
        (prevTotalPrice) => ({
          totalPrice: prevTotalPrice.totalPrice + product.price * quantity,
        }),
        false,
        "Total Price Added"
      );
      set(
        (prevQuantity) => ({
          totalQuantities: prevQuantity.totalQuantities + quantity,
        }),
        false,
        "Total Quantity Added"
      );
    }

    toast.success(`${get().qty} ${product.name} added to the cart`);

    set((state) => ({ qty: 0 }), false, "Quantity Reset to Zero");
  },

  incQty: () =>
    set((state) => ({ qty: state.qty + 1 }), false, "Increase Quantity"),
  decQty: () =>
    set(
      (state) => ({ qty: Math.max(0, state.qty - 1) }),
      false,
      "Decrease Quantity"
    ),

  clearCartItems: () => set((state) => ({ cartItems: [] })),
  clearTotalPrice: () => set((state) => ({ totalPrice: 0 })),
  clearTotalQuantities: () => set((state) => ({ totalQuantities: 0 })),
});

export const useStore = create(persist(devtools(store), { name: "store" }));
