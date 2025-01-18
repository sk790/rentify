import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Colors } from "@/constants/Colors";
import { BASE_URL } from "@env";

export default function reviewProduct({ navigation }: any) {
  const { formData } = useLocalSearchParams();
  const FormData = JSON.parse(formData as string);

  const handleSubmit = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/product/listing`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(FormData),
      });
      const data = await res.json();
      alert(data.msg);
      if (res.ok) {
        alert(data.msg);
        router.push("/");
        router.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <View style={{ backgroundColor: "white", padding: 10 }}>
        <View>
          <Text>Category : {FormData.category}</Text>
          <Text>Title : {FormData.title}</Text>
          <Text>Description : {FormData.description}</Text>
          <Text>Price : {FormData.price}</Text>
          <Text>Address : {FormData.address}</Text>
          <Text>Period : {FormData.period}</Text>
          <Text>Product Name : {FormData.productName}</Text>
        </View>
        <TouchableOpacity
          onPress={handleSubmit}
          style={{
            marginTop: 20,
            padding: 10,
            borderRadius: 10,
            backgroundColor: Colors.light,
            marginHorizontal: 10,
            width: "50%",
            alignSelf: "center",
          }}
        >
          <Text style={{ textAlign: "center" }}>Final Submit</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
