import { observable, computed, action } from "mobx";
import { observer } from "mobx-react";
const ReactDOM = require("react-dom");
const React = require("react");

class Temperature {
  @observable unit = "C";
  @observable temperatureCelsius = 25;

  @computed get temperatureKelvin() {
    console.log("calculating Kelvin");
    return this.temperatureCelsius + 9 / 5 + 32;
  }

  @computed get temperatureFareheit() {
    console.log("calculating Farenheit");
    return this.temperatureCelsius + 273.5;
  }

  @computed get temperature() {
    console.log("t2", this.unit);
    switch (this.unit) {
      case "K":
        return `${this.temperatureKelvin} °K`;
      case "F":
        return `${this.temperatureFareheit} ℉`;
      default:
        return `${this.temperatureCelsius} ℃`;
    }
  }
  @action setUnit(newUnit) {
    this.unit = newUnit;
  }
}

export const t = new Temperature();
// const App2 = observer(({ temperature }) => {
//   return (
//     <button
//       onClick={() => {
//         console.log("t", temperature.unit);
//         // temperature.temperatureCelsius = 100;
//         temperature.unit = temperature.unit === "C" ? "F" : "C";
//       }}
//     >
//       Change
//     </button>
//   );
// });
const App = observer(({ temperature }) => {
  //   const [me, setMe] = React.useState(false);

  return (
    <>
      {/* <button onClick={() => setMe(!me)}>update me</button> */}
      <button
        onClick={() => {
          console.log("t", temperature.unit);
          // temperature.temperatureCelsius = 100;
          temperature.unit = temperature.unit === "C" ? "F" : "C";
          //   temperature.setUnit(temperature.unit === "C" ? "F" : "C");
        }}
      >
        Change
      </button>
      <div>{temperature.unit}</div>
      <div>{temperature.temperature}</div>
    </>
  );
});

ReactDOM.render(
  <>
    <App temperature={t} />
    {/* <App2 temperature={t} /> */}
  </>,
  document.getElementById("root")
);
