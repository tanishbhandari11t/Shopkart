const formatPrice = (amount) => `₹${Number(amount).toLocaleString("en-IN")}`;

export default formatPrice;
