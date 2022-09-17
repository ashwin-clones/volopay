import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire, faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import {
  API_CARD_TYPES_KEYS,
  BURNER_CARD_TYPE,
  CARD_TYPES_KEYS,
} from "../constants";

export default function Card({ data }) {
  const handleCalculatePercentage = (value, totalValue) =>
    (+value / +totalValue) * 100;

  return (
    <div className="card">
      <div className="d-flex space-between">
        <div>
          <div>{data.name}</div>
          <div className="c-gray-1">
            {data.customer_name} . {data.budget_name}
          </div>
        </div>
        <div className="icon">
          {data.card_type === BURNER_CARD_TYPE ? (
            <FontAwesomeIcon size="lg" icon={faFire} />
          ) : (
            <FontAwesomeIcon size="lg" icon={faArrowsRotate} />
          )}
        </div>
      </div>
      <div className="d-flex space-between desciption">
        <div className="badge">{data.card_type}</div>
        <div>
          {CARD_TYPES_KEYS[data.card_type]} :{" "}
          {data?.[API_CARD_TYPES_KEYS[data.card_type]]}
        </div>
      </div>
      <div className="progress">
        <div className="progress-bar">
          <div
            className="active-bar"
            style={{
              width: `${Math.round(
                handleCalculatePercentage(
                  data?.spent.value,
                  data?.available_to_spend.value
                )
              )}%`,
            }}
          ></div>
        </div>
        <div className="d-flex-s-c mb-12">
          <div className="d-flex-c-c">
            <span className="metrics spent"></span>Spent
          </div>
          <div>{data?.spent.value} sgd</div>
        </div>
        <div className="d-flex-s-c">
          <div className="d-flex-c-c">
            <span className="metrics available"></span> Available to spend
          </div>
          <div>{data?.available_to_spend.value} sgd</div>
        </div>
      </div>
    </div>
  );
}

//https://fontawesome.com/v5/docs/web/use-with/react
