import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import HorizontalProductCard from "@/components/HorizontalProductCard";

export default function profile() {
  const user = {
    id: 1,
    name: "John Doe",
    email: "G0aYV@example.com",
    phone: "123-456-7890",
    address: "123 Main St, Anytown, USA",
    image:
      "https://in.bmscdn.com/iedb/artist/images/website/poster/large/akshay-kumar-94-1681713982.jpg",
    createdat: "2022-01-01",
    description: "I am a user",
    verifyed: true,
  };
  const data = [
    {
      id: 1,
      name: "Yamaha R15 V4",
      images: [
        "https://cdn.bikedekho.com/processedimages/yamaha/r15-v4/source/r15-v466e5433ef20f5.jpg",
      ],
      price: 3999,
      period: "Month",
      uploadAt: 5,
      description: "this is a description",
      title: "this is a title",
      category: "Vehicle",
      address: "this is an address",
    },
    {
      id: 2,
      name: "Yamaha R15 V4",
      images: [
        "https://cdn.bikedekho.com/processedimages/yamaha/r15-v4/source/r15-v466e5433ef20f5.jpg",
      ],
      price: 3999,
      period: "Month",
      uploadAt: 5,
      description: "this is a description",
      title: "this is a title",
      category: "Vehicle",
      address: "this is an address",
    },
    {
      id: 3,
      name: "Yamaha R15 V4",
      images: [
        "https://cdn.bikedekho.com/processedimages/yamaha/r15-v4/source/r15-v466e5433ef20f5.jpg",
      ],
      price: 3999,
      period: "Month",
      uploadAt: 5,
      description: "this is a description",
      title: "this is a title",
      category: "Vehicle",
      address: "this is an address",
    },
    {
      id: 4,
      name: "Yamaha R15 V4ih hihinninknhnbihgibkbk hih ",
      images: [
        "https://cdn.bikedekho.com/processedimages/yamaha/r15-v4/source/r15-v466e5433ef20f5.jpg",
      ],
      price: 3999,
      period: "Month",
      uploadAt: 5,
      description: "this is a description",
      title: "this is a title",
      category: "Vehicle",
      address: "this is an addresvuuvjuvhjjvjvjvs",
    },
    {
      id: 5,
      name: "Yamaha R15 V4ih hihinninknhnbihgibkbk hih ",
      images: [
        "https://cdn.bikedekho.com/processedimages/yamaha/r15-v4/source/r15-v466e5433ef20f5.jpg",
      ],
      price: 3999,
      period: "Month",
      uploadAt: 5,
      description: "this is a description",
      title: "this is a title",
      category: "Vehicle",
      address: "this is an addresvuuvjuvhjjvjvjvs",
    },
    {
      id: 6,
      name: "Yamaha R15 V4ih hihinninknhnbihgibkbk hih ",
      images: [
        "https://cdn.bikedekho.com/processedimages/yamaha/r15-v4/source/r15-v466e5433ef20f5.jpg",
      ],
      price: 3999,
      period: "Month",
      uploadAt: 5,
      description: "this is a description",
      title: "this is a title",
      category: "Vehicle",
      address: "this is an addresvuuvjuvhjjvjvjvs",
    },
  ];
  return (
    <ScrollView>
      <View
        style={{
          flexDirection: "column",
          margin: 10,
          backgroundColor: Colors.white,
          padding: 10,
          borderRadius: 10,
          gap: 10,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Image
            source={{ uri: user.image }}
            style={{ width: 90, height: 90, borderRadius: 50 }}
          />
          <Text style={{ fontWeight: "bold", fontSize: 20, flex: 1 }}>
            {user.name}
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: "green",
              padding: 10,
              borderRadius: 10,
              flex: 1,
              width: "100%",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 5,
              }}
            >
              <Ionicons name="call" size={24} color="white" />
              <Text
                style={{ color: "white", textAlign: "center", fontSize: 16 }}
              >
                Call
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <Ionicons name="calendar" size={24} color="black" />
          <Text>Member since {user.createdat}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            width: "100%",
          }}
        >
          <Ionicons name="mail" size={24} color="black" />
          <Text>{user.description}</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <Ionicons name="location" size={24} color="black" />
          <Text>{user.address}</Text>
        </View>
        <View style={{ flexDirection: "row", width: "100%" }}>
          <Text>User verifyed </Text>
          <Ionicons name="checkmark-circle" size={24} color="green" />
        </View>
      </View>
      <HorizontalProductCard products={data} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
