import { BASE_URL } from "@env";

export const deleteProduct = async (productId: string) => {
  try {
    if (!productId) return;
    const res = await fetch(`${BASE_URL}/api/product/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (res.ok) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const toggleFavorite = async (productId: string) => {
  try {
    const res = await fetch(`${BASE_URL}/api/product/favorite/${productId}`, {
      method: "PUT",
    });
    // console.log({ res });
    if (!res.ok) {
      throw new Error("Failed to update favorite status");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error updating favorite:", error);
  }
};
