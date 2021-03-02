import { observable, computed, action, makeObservable } from "mobx";
import { observer } from "mobx-react";
import ReactDOM from "react-dom";
import React from "react";
import DevTools from "mobx-react-devtools";

class Temperature {
  constructor() {
    makeObservable(this);
  }
  @observable unit = "C";
  @observable temperatureCelsius = 25;
  @observable id = Math.random();

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

  @action("Set the new unit")
  setUnit(newUnit) {
    this.unit = newUnit;
  }
}

const temp = observable([]);
temp.push(new Temperature());
temp.push(new Temperature());

const App = observer(({ temperatures }) => {
  return (
    <>
      {temperatures.map((t) => (
        <div key={`temp-${t.id}`}>
          <button onClick={() => t.setUnit("F")}>F</button>
          <button onClick={() => t.setUnit("K")}>K</button>
          <button onClick={() => t.setUnit("C")}>C</button>
          <div>{t.temperature}</div>
        </div>
      ))}
    </>
  );
});

ReactDOM.render(<App temperatures={temp} />, document.getElementById("root"));
