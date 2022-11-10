import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import Cart from "../components/Cart";
import { MessageOverlay } from "../components/Overlays";

const Checkout = ({ route, navigation }) => {
  const { packageData, imgUrl, carType } = route.params;

  const [gallons, setGallons] = React.useState("1");
  const [subTotal, setSubTotal] = React.useState(
    parseFloat(packageData.Price).toFixed(2)
  );
  const [serviceFee, setServiceFee] = React.useState(
    parseFloat(packageData.Price * 0.12).toFixed(2)
  );
  const [total, setTotal] = React.useState(
    (parseFloat(packageData.Price) + parseFloat(serviceFee)).toFixed(2)
  );
  const [error, setError] = React.useState({
    value: false,
    message: "",
  });

  React.useEffect(() => {
    handleCalculations();
  }, [gallons]);

  const handleCalculations = () => {
    const extraFee = 5;
    if (packageData.type == "Gas") {
      const _sub = parseFloat(packageData.Price) * parseFloat(gallons);
      const _fee = parseFloat(_sub * 0.12).toFixed(2);
      const _total =
        carType.carType === "MPV" || carType.carType === "SUV"
          ? gallons != "0"
            ? parseFloat(_sub) + parseFloat(_fee) + extraFee
            : 0
          : parseFloat(_sub) + parseFloat(_fee);
      setSubTotal(_sub);
      setServiceFee(_fee);
      setTotal(parseFloat(_total).toFixed(2));
    } else {
      if (carType.carType === "MPV" || carType.carType === "SUV") {
        const _sum =
          parseInt(subTotal) + parseInt(extraFee) + parseInt(serviceFee);
        console.log(_sum);
        console.log(subTotal);
        console.log(extraFee);
        console.log(serviceFee);
        setTotal(parseInt(_sum).toFixed(2));
      }
    }
  };

  const handleProceed = () => {
    if (packageData.type == "Gas") {
      if (gallons <= 0) {
        setError({
          value: true,
          message: "Select at least 1 gallon",
        });
      } else {
        navigation.navigate("SelectStations", {
          packageData: packageData,
          serviceFee: serviceFee,
          total: total,
          numOfGal: gallons,
        });
      }
    } else {
      navigation.navigate("SelectDriver", {
        packageData: packageData,
        serviceFee: serviceFee,
        total: total,
      });
    }
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: "white",
      }}
    >
      <MessageOverlay
        value={error.value}
        message={error.message}
        setValue={setError}
      />
      <Cart
        data={packageData}
        imgUrl={imgUrl}
        serviceFee={serviceFee}
        total={total}
        subTotal={subTotal}
        gallons={gallons}
        setGallons={setGallons}
        carType={carType}
      />
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 0,
          height: 50,
          backgroundColor: "#43ce51",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          borderRadius: 10,
          marginVertical: 20,
          marginHorizontal: 20,
        }}
        onPress={handleProceed}
      >
        <Text style={{ color: "white" }}>Proceed</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Checkout;
