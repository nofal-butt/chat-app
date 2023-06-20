// import React from "react";

// class ChangingProgressProvider extends React.Component {
//   static defaultProps = {
//     interval: 1000,
//   };

//   state = {
//     valuesIndex: 0,
//   };

//   componentDidMount() {
//     setInterval(() => {
//       this.setState({
//         valuesIndex: (this.state.valuesIndex + 1) % this.props.values.length,
//       });
//     }, this.props.interval);
//   }

//   render() {
//     return this.props.children(this.props.values[this.state.valuesIndex]);
//   }
// }

// export default ChangingProgressProvider;

import React, { useState, useEffect } from "react";

const ChangingProgressProvider = ({ values, interval, children }) => {
  const [valuesIndex, setValuesIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setValuesIndex((prevIndex) => (prevIndex + 1) % values.length);
    }, interval);

    return () => {
      clearInterval(intervalId);
    };
  }, [values, interval]);

  return children(values[valuesIndex]);
};

ChangingProgressProvider.defaultProps = {
  interval: 1000,
};

export default ChangingProgressProvider;
