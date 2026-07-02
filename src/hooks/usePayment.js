import { useState } from "react";
import api from "../services/api";

export const usePayment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const initiatePayment = async (paymentData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post("/payments/initiate", paymentData);
      if (response.data.redirect_url) {
        window.location.href = response.data.redirect_url;
      }
    } catch (err) {
      setError(err.response?.data?.message || "Payment initiation failed");
    } finally {
      setLoading(false);
    }
  };

  return { initiatePayment, loading, error };
};
