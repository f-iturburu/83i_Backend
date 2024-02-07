export const discountPrice = (price, discountPercentage) => {
    const multiplier = 1 - parseFloat(`0.${discountPercentage}`);
    return price * multiplier;
  };
  