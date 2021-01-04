import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { getUserOrders } from "./helper/userapicalls";
import { Link } from "react-router-dom";

const UserOrders = () => {
  const [orders, setOrders] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { user, token, role } = isAuthenticated();
  const preload = () => {
    getUserOrders(user, token).then((data) => {
      if (data.error) {
        setLoading(false);
        return setError(data.error);
      }
      setOrders(data);
      console.log(orders);
      setLoading(false);
    });
  };

  useEffect(() => {
    setLoading(true);
    preload();
  }, []);

  const loadingComp = () => {
    return (
      loading && (
        <div class="d-flex align-items-center mb-3">
          <strong>Loading...</strong>
          <div
            class="spinner-border ml-auto"
            role="status"
            aria-hidden="true"
          ></div>
        </div>
      )
    );
  };
  const errorComp = () => {
    return (
      error && (
        <div class="alert alert-danger text-center" role="alert">
          {error}
        </div>
      )
    );
  };
  const loadRows = () => {
    if (orders) {
      return orders.map((order, index) => (
        <tr>
          <th scope="row" key={index + 1}>
            {index + 1}
          </th>
          <td>{order._id}</td>
          <td>{order.transaction_id}</td>
          <td>$ {order.amount}</td>
          <td>{order.status}</td>
        </tr>
      ));
    }
  };
  return (
    <Base title="Your Orders" description="All your orders and their Status">
      {role === 0 ? (
        <Link to="/user/dashboard" className="btn btn-md btn-info ml-3 mb-3">
          Back
        </Link>
      ) : (
        <Link to="/admin/dashboard" className="btn btn-md btn-info ml-3 mb-3">
          Back
        </Link>
      )}
      {loadingComp()}
      {errorComp()}
      <table class="table table-hover table-dark">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Order ID</th>
            <th scope="col">Transaction ID</th>
            <th scope="col">Total Order Amount</th>
            <th scope="col">Order Status</th>
          </tr>
        </thead>
        <tbody>{loadRows()}</tbody>
      </table>
    </Base>
  );
};
export default UserOrders;
