import React, { useRef, useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  View,
} from "react-native";
import { main, PRIMARY_COLOR } from "../../global";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import BottomSheetComponent from "../../../components/BottomSheet";
import { Area, CartesianChart, Line, Bar } from "victory-native";
import {
  LinearGradient,
  TextAlign,
  useFont,
  vec,
} from "@shopify/react-native-skia";
import BottomSheetWeightComponent from "../../../components/BottomSheetWeight";
import { Chip, SegmentedButtons } from "react-native-paper";
import { useAuth } from "../../../content/AuthContext";
import { router } from "expo-router";

const { height: totalHeight } = Dimensions.get("screen");

const ITEMS = [
  { label: "Sugar", value: "120 mg/dL" },
  { label: "Weight", value: "85 Kg" },
];

const SugarComponent = ({ data }) => {
  const font = useFont(
    require("../../../assets/fonts/fonts/Manrope/Manrope-VariableFont_wght.ttf"),
    10
  );
  if (data.length === 0) {
    return (
      <View
        style={{
          justifyContent: "center",
          textAlign: "center",
          flex: 1,
          alignItems: "center",
          padding: 40,
          margin: 40,
        }}
      >
        <Text>No data to display</Text>
      </View>
    );
  } else {
    return (
      <View style={{ height: totalHeight / 3.3 }}>
        <CartesianChart
          data={data}
          xKey="date"
          yKeys={["sugar"]}
          domainPadding={{ top: 20, left: 50, right: 50, bottom: 20 }}
          axisOptions={{
            font,
            formatXLabel: (value) => {
              return value || "";
            },
          }}
        >
          {({ points, chartBounds }) => (
            //👇 pass a PointsArray to the Bar component, as well as options.
            <Bar
              points={points.sugar}
              chartBounds={chartBounds}
              color={PRIMARY_COLOR}
              roundedCorners={{ topLeft: 10, topRight: 10 }}
              animate={{ type: "spring", duration: 400 }}
              barWidth={30}
            />
          )}
        </CartesianChart>
      </View>
    );
  }
};

const ChartComponent = ({ data }) => {
  const font = useFont(
    require("../../../assets/fonts/fonts/Manrope/Manrope-VariableFont_wght.ttf"),
    10
  );
  if (data.length === 0) {
    return (
      <View
        style={{
          justifyContent: "center",
          textAlign: "center",
          flex: 1,
          alignItems: "center",
          padding: 40,
          margin: 40,
        }}
      >
        <Text>No data to display</Text>
      </View>
    );
  } else {
    return (
      <View style={{ height: totalHeight / 3.3 }}>
        <CartesianChart
          data={data}
          xKey={"date"}
          yKeys={["weight"]}
          domainPadding={{ top: 20, left: 50, right: 50, bottom: 20 }}
          axisOptions={{
            font,
            formatXLabel: (value) => {
              return value || "";
            },
          }}
        >
          {({ points, chartBounds }) => (
            <>
              <Line
                points={points.weight}
                color={PRIMARY_COLOR}
                connectMissingData={false}
                strokeWidth={3}
                animate={{ type: "timing", duration: 300 }}
              />
            </>
          )}
        </CartesianChart>
      </View>
    );
  }
};

const Home = () => {
  const { sugarData, weightData } = useAuth();
  const [formattedSugarDate, setFormattedSugarData] = useState([]);
  const bottomSheetRef = useRef(null);
  const bottomSheetWeightRef = useRef(null);
  const handleOpen = () => bottomSheetRef.current.expand();

  const handleClose = () => bottomSheetRef.current.close();

  const handleWeightOpen = () => bottomSheetWeightRef.current.expand();

  const handleWeightClose = () => bottomSheetWeightRef.current.close();

  const handleDisplay = (label) => {
    if (sugarData.length === 0 && label === "Sugar") {
      return "";
    }
    if (weightData.length === 0 && label === "Weight") {
      return "";
    }
    if (sugarData.length > 0 && label === "Sugar") {
      return `${sugarData[sugarData.length - 1].sugar} mg/dL`;
    }
    if (weightData.length > 0 && label === "Weight") {
      return `${weightData[weightData.length - 1].weight} kg`;
    }
  };

  handleNavigation = (label) => {
    router.push({
      pathname: "/home/list",
      params: {
        label: label,
      },
    });
  };

  // useEffect(() => {
  //   if (sugarData.length > 0) {
  //     let data = sugarData.filter((item) => item.type === "fasted");
  //     setFormattedSugarData(data);
  //   }
  // }, [sugarData]);

  return (
    <SafeAreaView style={main.common_container_dimensions}>
      <ScrollView style={main.common_container_styles}>
        {ITEMS.map((item, index) => (
          <View key={index} style={{ paddingBottom: 8 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{ padding: 10, gap: 10 }}>
                <Text style={{ fontSize: 16 }}>{item.label}</Text>
                <Text style={{ fontSize: 24 }}>
                  {handleDisplay(item.label)}
                </Text>
              </View>
              <View>
                <Chip
                  onPress={() => {
                    item.label === "Sugar" ? handleOpen() : handleWeightOpen();
                  }}
                  style={{
                    backgroundColor: "#fff",
                    borderWidth: 1,
                    borderColor: PRIMARY_COLOR,
                  }}
                  textStyle={{
                    color: PRIMARY_COLOR,
                    fontSize: 14,
                    fontWeight: "semibold",
                  }}
                >{`Add ${item.label} Entry`}</Chip>
                <TouchableOpacity
                  style={{
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                    textAlign: "right",
                    paddingTop: 10,
                    flexDirection: "row",
                  }}
                  onPress={() => handleNavigation(item.label)}
                >
                  <AntDesign name="bars" size={15} color={PRIMARY_COLOR} />
                  <Text
                    style={{
                      paddingLeft: 2,
                      paddingTop: 2,
                      textDecorationLine: "underline",
                      color: PRIMARY_COLOR,
                    }}
                  >
                    View List
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {item.label === "Sugar" ? (
              <SugarComponent data={sugarData} />
            ) : (
              <ChartComponent data={weightData} />
            )}
            {/* <ChartComponent
              label={item.label}
              data={item.label === "Sugar" ? sugarData : weightData}
            /> */}
          </View>
        ))}
      </ScrollView>

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={[totalHeight - 150]}
      >
        <BottomSheetScrollView>
          <BottomSheetComponent handleClick={handleClose} />
        </BottomSheetScrollView>
      </BottomSheet>

      <BottomSheet
        ref={bottomSheetWeightRef}
        index={-1}
        snapPoints={[totalHeight - 150]}
      >
        <BottomSheetScrollView>
          <BottomSheetWeightComponent handleClick={handleWeightClose} />
        </BottomSheetScrollView>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default Home;
