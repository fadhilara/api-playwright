import { expect } from '../utils/custom-expect';

type Product = {
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedTotal: number;
};

type Cart = {
  products: Product[];
  total: number;
  discountedTotal: number;
};

export function assertCartTotals(cart: Cart) {
  if (!cart || !Array.isArray(cart.products)) {
    throw new Error('Invalid cart structure: products is missing');
  }

  let calculatedTotal = 0;
  let sumOfItemTotals = 0;
  let sumOfDiscountedTotals = 0;

  for (const item of cart.products) {
    const rawTotal = item.price * item.quantity;
    const expectedDiscounted =
      rawTotal * (1 - item.discountPercentage / 100);

    // 🔹 Item-level validation
    expect(item.total, 'Mismatch in item.total')
      .toBeCloseTo(rawTotal, 2);

    expect(item.discountedTotal, 'Mismatch in item.discountedTotal')
      .toBeCloseTo(expectedDiscounted, 2);

    // 🔹 Accumulate
    calculatedTotal += rawTotal;
    sumOfItemTotals += item.total;
    sumOfDiscountedTotals += item.discountedTotal;
  }

  // 🔹 Cart-level validation
  expect(cart.total, 'Mismatch in cart.total (raw calculation)')
    .toBeCloseTo(calculatedTotal, 2);

  expect(cart.total, 'Mismatch in cart.total (sum of item.total)')
    .toBeCloseTo(sumOfItemTotals, 2);

  expect(cart.discountedTotal, 'Mismatch in cart.discountedTotal')
    .toBeCloseTo(sumOfDiscountedTotals, 2);
}