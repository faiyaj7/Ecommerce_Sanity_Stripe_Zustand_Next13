export const product = {
  name: "product",
  type: "document",
  title: "Product",
  fields: [
    {
      name: "image",
      type: "array",
      title: "Image",
      of: [{ type: "image" }],
      options: { hotspot: true },
    },
    {
      name: "name",
      type: "string",
      title: "Name",
    },
    {
      name: "slug",
      type: "slug",
      title: "Slug",
      options: {
        source: "name",
        maxLength: 80,
      },
    },
    {
      name: "price",
      type: "number",
      title: "Price",
    },
    {
      name: "details",
      type: "string",
      title: "Details",
    },
  ],
};
