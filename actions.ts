// import { BASE_URL } from "@env";
const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

import { useProducts } from "./context/ProductContext";
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

export const updateStatus = async (productId: string) => {
  try {
    const res = await fetch(
      `${BASE_URL}/api/product/status-update/${productId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // const data = await res.json();
    return res;
  } catch (error) {
    console.error("Error updating status:", error);
  }
};

export const updateProfile = async (data: any) => {
  try {
    const res = await fetch(`${BASE_URL}/api/auth/update-profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    // const response = await res.json();
    return res;
  } catch (error) {
    console.error("Error updating profile:", error);
  }
};
export const updateAvatar = async (avatar: string) => {
  console.log(avatar, "avatar");

  try {
    const res = await fetch(`${BASE_URL}/api/auth/avatar`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ avatar }),
    });
    const response = await res.json();

    return res;
  } catch (error) {
    console.error("Error updating profile:", error);
  }
};
export const login = async (phone: string, password: string) => {
  try {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone, password }),
    });
    return res;
  } catch (error) {
    console.error("Error logging in:", error);
  }
};
export const logout = async () => {
  console.log(BASE_URL);
  try {
    const res = await fetch(`${BASE_URL}/api/auth/logout`);
    console.log(res, "res");
    return res;
  } catch (error) {
    console.error("Error logging out:", error);
  }
};

export const getProductDetail = async (productId: string) => {
  // console.log(productId, "productId");

  try {
    const res = await fetch(`${BASE_URL}/api/product/${productId}`, {
      method: "GET",
    });
    const data = await res.json();
    // console.log(res);

    // console.log(data);

    if (res.ok) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const toggleRent = async (productId: string) => {
  try {
    const res = await fetch(`${BASE_URL}/api/product/rented/${productId}`, {
      method: "PUT",
    });
    const data = await res.json();
    console.log(data);
  } catch (error) {
    alert(error);
  }
};
export const getUser = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/auth/me`);
    return res;
  } catch (error) {
    alert(error);
  }
};
export const addProduct = async (data: any) => {
  try {
    const res = await fetch(`${BASE_URL}/api/product/listing`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

type Props = {
  senderId: string | undefined;
  receiverId: string;
  text: string;
};
export const sendMessage = async ({ senderId, receiverId, text }: Props) => {
  try {
    const res = await fetch(`${BASE_URL}/api/chat/send-message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ senderId, receiverId, text }),
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getMessages = async ({ chatUserId }: { chatUserId: string }) => {
  // console.log(chatUserId, "chatUserId");
  try {
    const res = await fetch(`${BASE_URL}/api/chat/get-messages/${chatUserId}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getConverstions = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/chat/get-conversations`);
    // console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};
