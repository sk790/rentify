import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { Colors } from "@/constants/Colors";
import { useGetLocation } from "@/hooks/GetLocation";

export default function addcordinets() {
  const { formData } = useLocalSearchParams();
  const data = JSON.parse(formData as string);
  const { fetchLocation, location } = useGetLocation();
  const [btnStyle, setBtnStyle] = useState("");
  const [locationBtnLoading, setLocationBtnLoading] = useState(false);

  useEffect(() => {
    data.cordinets.latitude = location.latitude;
    data.cordinets.longitude = location.longitude;
    if (data.cordinets.latitude > 0 && data.cordinets.longitude > 0) {
      setBtnStyle("green");
    } else {
      setBtnStyle("red");
    }
  }, [fetchLocation]);
  const getLocation = async () => {
    setLocationBtnLoading(true);
    await fetchLocation();
    setLocationBtnLoading(false);
  };

  const hendleNext = () => {
    router.push({
      pathname: "/(listing)/reviewProduct",
      params: { formData: JSON.stringify(data) },
    });
  };

  return (
    <>
      <Stack.Screen options={{ title: "Add Location" }} />
      <View style={{ backgroundColor: "white", flex: 1 }}>
        <TouchableOpacity
          style={[
            {
              width: "50%",
              alignSelf: "center",
              padding: 15,
              borderRadius: 10,
              marginTop: 20,
            },
            { backgroundColor: btnStyle },
          ]}
          onPress={getLocation}
        >
          <Text
            style={{ textAlign: "center", fontWeight: "600", color: "white" }}
          >
            {locationBtnLoading ? (
              <ActivityIndicator size={"small"} />
            ) : (
              "Get Location"
            )}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: Colors.light,
            width: "50%",
            alignSelf: "center",
            padding: 15,
            borderRadius: 10,
            marginTop: 20,
          }}
          onPress={hendleNext}
          disabled={btnStyle !== "green"}
        >
          <Text style={{ textAlign: "center" }}>Next</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
