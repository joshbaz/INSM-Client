import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { usePaymentStatus } from "../../../store/tanstackStore/services/queries";

const PaymentCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const orderTrackingId = searchParams.get("OrderTrackingId");
  const [pollCount, setPollCount] = useState(0);
  const [statusText, setStatusText] = useState("Verifying your payment transaction...");

  const { data, error, isLoading, refetch } = usePaymentStatus(orderTrackingId, {
    refetchInterval: (query) => {
      // Poll every 3 seconds if status is still pending and we haven't polled more than 10 times
      const currentStatus = query?.state?.data?.status;
      if (currentStatus === "PENDING" && pollCount < 12) {
        return 3000;
      }
      return false;
    },
    // We increment our poll counter on each fetch
    refetchIntervalInBackground: false,
  });

  useEffect(() => {
    if (data) {
      if (data.status === "SUCCESS" || data.payment_status_description === "Completed") {
        setStatusText("Payment verified successfully!");
      } else if (data.status === "FAILED") {
        setStatusText("Payment transaction failed.");
      } else {
        setPollCount((prev) => prev + 1);
        if (pollCount >= 12) {
          setStatusText("Verification timed out. Please check your transaction list later.");
        }
      }
    }
  }, [data, pollCount]);

  if (!orderTrackingId) {
    return (
      <div className="min-h-screen bg-brand-white flex items-center justify-center p-6">
        <div className="bg-brand-white border border-brand-dark-200/20 max-w-md w-full rounded-2xl p-8 shadow-lg text-center space-y-6">
          <div className="w-16 h-16 bg-red-100 text-[#DC3545] rounded-full flex items-center justify-center mx-auto">
            <Icon icon="ph:warning-octagon-bold" className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold font-primary text-brand-dark">Invalid Payment Request</h2>
          <p className="text-sm font-secondary text-brand-dark-400">
            No order tracking reference was found in the URL.
          </p>
          <button
            onClick={() => navigate("/")}
            className="w-full py-3 bg-brand-lilac text-brand-white font-bold rounded-full hover:bg-brand-lilac/95 transition-colors uppercase tracking-wider text-xs"
          >
            Go back Home
          </button>
        </div>
      </div>
    );
  }

  const isSuccess = data?.status === "SUCCESS" || data?.payment_status_description === "Completed";
  const isFailed = data?.status === "FAILED" || (data && data.status !== "PENDING" && !isSuccess) || pollCount >= 12;
  const isPending = !isSuccess && !isFailed;

  return (
    <div className="min-h-screen bg-brand-white flex items-center justify-center p-6">
      <div className="bg-brand-white border border-brand-dark-200/20 max-w-md w-full rounded-2xl p-8 shadow-lg text-center space-y-6">
        
        {/* ── STATUS ICON ── */}
        {isPending && (
          <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
            {/* Spinning ring */}
            <div className="absolute inset-0 border-4 border-brand-lilac/20 border-t-brand-lilac rounded-full animate-spin" />
            <Icon icon="ph:wallet-bold" className="w-8 h-8 text-brand-lilac animate-pulse" />
          </div>
        )}

        {isSuccess && (
          <div className="w-20 h-20 bg-[#eaf7ec] text-[#1fb039] rounded-full flex items-center justify-center mx-auto animate-bounce">
            <Icon icon="ph:check-circle-bold" className="w-12 h-12" />
          </div>
        )}

        {isFailed && (
          <div className="w-20 h-20 bg-red-50 text-[#DC3545] rounded-full flex items-center justify-center mx-auto">
            <Icon icon="ph:x-circle-bold" className="w-12 h-12" />
          </div>
        )}

        {/* ── CARD TITLE & SUBTITLE ── */}
        <div>
          <h2 className="text-2xl font-bold font-primary text-brand-dark">
            {isSuccess ? "Thank You!" : isFailed ? "Payment Failed" : "Verifying Payment"}
          </h2>
          <p className="text-xs font-mono text-brand-dark-300 mt-1 uppercase tracking-wider">
            Ref: {orderTrackingId}
          </p>
        </div>

        <p className="text-sm font-secondary text-brand-dark-400 leading-relaxed px-4">
          {statusText}
        </p>

        {/* ── PAYMENT DETAIL BOX (if success or fetched info exists) ── */}
        {data && (
          <div className="bg-brand-white-100 rounded-xl p-4 text-left border border-brand-dark-200/10 space-y-2 text-xs font-secondary">
            <div className="flex justify-between">
              <span className="text-brand-dark-400">Donor Name:</span>
              <span className="font-semibold text-brand-dark">{data.donorName || "Guest"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-dark-400">Contribution Tier:</span>
              <span className="font-semibold text-brand-dark">{data.tierTitle}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-dark-400">Amount Contributed:</span>
              <span className="font-bold text-brand-dark">
                {data.currency} {data.amount?.toLocaleString()}
              </span>
            </div>
            {data.paymentMethod && (
              <div className="flex justify-between">
                <span className="text-brand-dark-400">Payment Method:</span>
                <span className="font-semibold text-brand-dark">{data.paymentMethod}</span>
              </div>
            )}
          </div>
        )}

        {/* ── CONTROLS ── */}
        <div className="pt-4 space-y-2">
          {isSuccess && (
            <button
              onClick={() => navigate("/")}
              className="w-full py-3.5 bg-brand-lilac hover:bg-brand-lilac/90 text-brand-white font-bold rounded-full transition-all uppercase tracking-wider text-xs shadow-md"
            >
              Continue to Website
            </button>
          )}

          {isFailed && (
            <>
              <button
                onClick={() => navigate("/how-to-help/partner-with-us")}
                className="w-full py-3.5 bg-[#DC3545] hover:bg-[#DC3545]/90 text-brand-white font-bold rounded-full transition-all uppercase tracking-wider text-xs shadow-md"
              >
                Try Payment Again
              </button>
              <button
                onClick={() => navigate("/")}
                className="w-full py-3 text-brand-dark-400 hover:text-brand-dark font-semibold transition-all text-xs"
              >
                Cancel
              </button>
            </>
          )}

          {isPending && (
            <button
              onClick={() => refetch()}
              className="w-full py-3 border border-brand-dark-200 text-brand-dark hover:bg-brand-white-100 font-bold rounded-full transition-all uppercase tracking-wider text-xs"
            >
              Refresh Status
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

export default PaymentCallback;
