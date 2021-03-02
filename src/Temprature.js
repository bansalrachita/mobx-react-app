import { observable } from "mobx";
import { observer } from "mobx-react";
import ReactDOM from "react-dom";
import React from "react";

const t = observable({
  unit: "C",
  temperatureCelsius: 25,
  id: Math.random(),

  temperatureKelvin: function () {
    console.log("calculating Kelvin");
    return this.temperatureCelsius + 9 / 5 + 32;
  },

  temperatureFareheit: function () {
    console.log("calculating Farenheit");
    return this.temperatureCelsius + 273.5;
  },

  temperature: function () {
    console.log("calculating temperature");
    switch (this.unit) {
      case "K":
        return `${this.temperatureKelvin()} °K`;
      case "F":
        return `${this.temperatureFareheit()} ℉`;
      default:
        return `${this.temperatureCelsius} ℃`;
    }
  },
});

const App = observer(({ temperature }) => {
  return (
    <>
      <button onClick={() => (temperature.unit = "F")}>F</button>
      <button onClick={() => (temperature.unit = "K")}>K</button>
      <button onClick={() => (temperature.unit = "C")}>C</button>
      <div>{temperature.unit}</div>
      <div>{temperature.temperature()}</div>
    </>
  );
});

ReactDOM.render(<App temperature={t} />, document.getElementById("root"));
