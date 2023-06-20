import React from "react";
import { LegacyCard } from "@shopify/polaris";
import ChangingProgressProvider from "../components/style";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Style = () => {
  // const Countvalue = [50];
  const arr = [
    {
      category: "SEO",
      score: 10,
    },
    {
      category: "Performance",
      score: 100,
    },
    {
      category: "Accessibility",
      score: 70,
    },
    {
      category: "MPN",
      score: 59,
    },
  ];
  return (
    <div style={{ margin: "20px" }}>
      <LegacyCard>
        <div
          style={{
            display: "flex",
            // padding: "10px",
            // margin: "20px",
            marginLeft: "20%",
            // justifyContent: "center",
            height: "50%",
            width: "50%",
          }}
        >
          {arr.map((item) => (
            <div key={item.category}>
              <ChangingProgressProvider values={[item.score]}>
                {(percentage) => (
                  <div style={{ margin: "20px" }}>
                    <CircularProgressbar
                      value={percentage}
                      text={`${percentage}%`}
                      styles={buildStyles({
                        pathTransition:
                          percentage === 0
                            ? "none"
                            : "stroke-dashoffset 0.5s ease 0s",
                        textColor:
                          item.score <= 60
                            ? "red"
                            : item.score > 60 && item.score < 80
                            ? "orange"
                            : item.score >= 80
                            ? "green"
                            : "grey",
                        pathColor:
                          item.score <= 60
                            ? "red"
                            : item.score > 60 && item.score < 80
                            ? "orange"
                            : item.score >= 80
                            ? "green"
                            : "grey",
                      })}
                    />
                  </div>
                )}
              </ChangingProgressProvider>

              <div
                style={{
                  // justifyContent: "space",
                  fontSize: "15px",
                  marginLeft: "50px",
                  marginBottom: "20px",
                }}
              >
                {item.category}
              </div>
            </div>
          ))}
        </div>
      </LegacyCard>
    </div>
  );
};

export default Style;
