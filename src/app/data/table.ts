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
