import React from "react";
import { useSelector } from "react-redux";
import useAlert from "../../useAlert";

export const Alert = () => {
  const alerts = useSelector((state) => state.alert);
  const { hideAlert } = useAlert();

  console.log(alerts);
  return (
    alerts !== null &&
    alerts.map((alert) => (
      <div key={alert.id} className={`alert alert-${alert.alertType}`}>
        {alert.msg}
        <button className="close" onClick={() => hideAlert(alert.id)}>x</button>
      </div>
    ))
  );
};
