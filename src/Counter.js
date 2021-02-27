import { observable } from "mobx";
import { observer } from "mobx-react";
import React from "react";
import ReactDom from "react-dom";
const appState = observable({
  count: 0,
});

appState.inc = () => {
  ++appState.count;
};

appState.dec = () => {
  appState.count--;
};

@observer
export class Counter extends React.Component {
  //   @observable count = 0;

  render() {
    return (
      <>
        <div>Counter: {appState.count}</div>
        <button onClick={appState.inc}> + </button>
        <button onClick={appState.dec}> - </button>
      </>
    );
  }
}
