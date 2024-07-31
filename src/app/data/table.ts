import db from "./db";

export async function getSalesData() {
  const { _sum, _count } = await db.order.aggregate({
    _sum: { pricePaidInCents: true },
    _count: true,
  });

  return {
    amount: (_sum.pricePaidInCents ?? 0) / 100,
    numberOfSales: _count,
  };
}

export async function getCustomerData() {
  const [userCount, orderData] = await Promise.all([
    db.user.count(),
    db.order.aggregate({
      _avg: { pricePaidInCents: true },
    }),
  ]);

  return {
    averageOrderValue: (orderData._avg.pricePaidInCents ?? 0) / 100,
    numberOfCustomers: userCount,
  };
}

export async function getProductData() {
  const [activeCount, inactiveCount] = await Promise.all([
    db.product.count({ where: { isAvailableForPurchase: true } }),
    db.product.count({ where: { isAvailableForPurchase: false } }),
  ]);

  return {
    numberOfActive: activeCount,
    numberOfInactive: inactiveCount,
  };
}
