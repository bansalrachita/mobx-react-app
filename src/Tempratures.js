import { observable, computed, action, makeObservable } from "mobx";
import { inject, observer, Provider } from "mobx-react";
import ReactDOM from "react-dom";
import React, { Component } from "react";

class Temperature {
  constructor(location) {
    makeObservable(this);

    if (location) {
      this.location = location;
      this.fetch();
    }
  }

  @observable unit = "C";
  @observable temperatureCelsius = 25;
  @observable id = Math.random();
  @observable location = "Netherlands, NL";
  @observable loading = true;

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

  @action fetch = () => {
    window
      .fetch(
        `http://openweathermap.org/data/2.5/weather?id=524901&appid=${API_KEY}
    &q=${this.location}`
      )
      .then((res) => {
        return res.json();
      })
      .then(
        action((json) => {
          this.temperatureCelsius = json.main.temp - 273.15;
          this.loading = false;
        })
      );
  };
}

@inject("temperatures")
@observer
class TempratureInput extends Component {
  // constructor() {
  //   makeObservable(this, {
  //     input: observable,
  //     onChange: action,
  //     onSubmit: action,
  //   });

  // }
  @observable input = "";

  render() {
    return (
      <div>
        Destination
        <input onChange={this.onChange} value={this.input} />
        <button onClick={this.onSubmit}>Add</button>
      </div>
    );
  }

  @action
  onChange = (e) => {
    this.input += e.target.value;
    console.log("e.target.value: ", this.input);
  };

  @action
  onSubmit = () => {
    const { temperatures } = this.props;

    temperatures.push(new Temperature(this.input));
    this.input = "";
  };
}

@inject("temperatures")
@observer
class TView extends Component {
  render() {
    const { temperature } = this.props;

    return (
      <li onClick={this.temperatureOnClick}>
        {temperature.location}:
        {temperature.loading ? "Loading..." : temperature.temperature}
      </li>
    );
  }

  @action
  temperatureOnClick = () => {
    console.log("temperatureOnClick: ", temperatureOnClick);
  };
}

const App = inject("temperatures")(
  observer(({ temperatures }) => {
    return (
      <>
        <TempratureInput />
        {temperatures.map((t) => (
          <TView key={`temp-${t.id}`} temperature={t} />
        ))}
      </>
    );
  })
);

const tempArr = observable([]);

ReactDOM.render(
  <Provider temperatures={tempArr}>
    <App />
  </Provider>,
  document.getElementById("root")
);
