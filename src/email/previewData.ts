export const orderHistoryEmailPreviewData = {
  email: "test@gmail.com",
  history: [
    {
      order: {
        id: "1",
        userId: "1",
        productId: "1",
        pricePaidInCents: 1000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      product: {
        id: "1",
        name: "Image 01",
        priceInCents: 1000,
        filePath: "path/to/file",
        imagePath:
          "products/dc873dc3-b4dd-419b-bdc0-c37c4f87ff2b-2016-04-17_13.20.11.png",
        description: "Description",
        isAvailableForPurchase: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      downloadId: "1",
    },
    {
      order: {
        id: "2",
        userId: "1",
        productId: "2",
        pricePaidInCents: 2000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      product: {
        id: "2",
        name: "Image 02",
        priceInCents: 2000,
        filePath: "path/to/file",
        imagePath:
          "products/dc873dc3-b4dd-419b-bdc0-c37c4f87ff2b-2016-04-17_13.20.11.png",
        description: "Description",
        isAvailableForPurchase: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      downloadId: "2",
    },
  ],
};

export const purchaseReceiptEmailPreviewData = {
  email: "test@gmail.com",
  product: {
    id: "1",
    name: "Image 01",
    priceInCents: 1000,
    filePath: "path/to/file",
    imagePath:
      "products/dc873dc3-b4dd-419b-bdc0-c37c4f87ff2b-2016-04-17_13.20.11.png",
    description: "Description",
    isAvailableForPurchase: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  order: {
    id: crypto.randomUUID(),
    userId: crypto.randomUUID(),
    productId: "1",
    pricePaidInCents: 1000,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  downloadId: crypto.randomUUID(),
};
