import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useFormateDate } from "@/hooks/useFormateDate";
import { Location, User } from "@/types";
import { useLocation } from "@/context/LocationContext";
type userProps = {
  user: User | undefined;
  me?: boolean;
};
export default function ProfileCard({ user, me }: userProps) {
  const { location } = useLocation();

  return (
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
          source={{ uri: user?.image }}
          style={{ width: 90, height: 90, borderRadius: 50 }}
        />
        <Text style={{ fontWeight: "bold", fontSize: 20, flex: 1 }}>
          {location.longitude}
        </Text>
        <TouchableOpacity
          style={[
            {
              padding: 10,
              borderRadius: 10,
              flex: 1,
              width: "100%",
            },
            me ? { backgroundColor: "gray" } : { backgroundColor: "green" },
          ]}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 5,
            }}
          >
            {!me ? (
              <>
                <Ionicons name="call" size={24} color="white" />
                <Text
                  style={{ color: "white", textAlign: "center", fontSize: 16 }}
                >
                  Call
                </Text>
              </>
            ) : (
              <>
                <Ionicons name="pencil-outline" size={24} color="white" />
                <Text
                  style={{ color: "white", textAlign: "center", fontSize: 16 }}
                >
                  Edit
                </Text>
              </>
            )}
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
        <Ionicons name="calendar" size={24} color="black" />
        <Text>Member since {useFormateDate(user?.createdAt)}</Text>
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
        <Text>{location.latitude || "No description"}</Text>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
        <Ionicons name="location" size={24} color="black" />
        <Text>{user?.address || "No address"}</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
        <Ionicons name="phone-portrait" size={24} color="black" />
        <Text>{user?.phone}</Text>
      </View>

      <View style={{ flexDirection: "row", width: "100%" }}>
        <Text>User verifyed </Text>
        <Ionicons name="checkmark-circle" size={24} color="green" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
