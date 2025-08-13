import React from "react";

const Promotions = ({ promoCode, setPromoCode, promoDesc, setPromoDesc, touched, setTouched }) => {
  const inputBase = "w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500";
  const errorBorder = "border-red-500";
  const errorText = "text-red-600 text-sm mt-1";

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-2">Promotions</h2>
      <p className="text-gray-600 mb-6">Add promo code, discounts, or deals to attract more learners.</p>

      <input
        type="text"
        className={`${inputBase} ${touched.promoCode && promoCode.trim() === "" ? errorBorder : ""} mb-2`}
        placeholder="Promo Code"
        value={promoCode}
        onChange={(e) => {
          setPromoCode(e.target.value);
          setTouched((t) => ({ ...t, promoCode: true }));
        }}
      />
      {touched.promoCode && promoCode.trim() === "" && (
        <span className={errorText}>This field is required</span>
      )}

      <input
        type="text"
        className={`${inputBase} ${touched.promoDesc && promoDesc.trim() === "" ? errorBorder : ""} mt-4`}
        placeholder="Discount description"
        value={promoDesc}
        onChange={(e) => {
          setPromoDesc(e.target.value);
          setTouched((t) => ({ ...t, promoDesc: true }));
        }}
      />
      {touched.promoDesc && promoDesc.trim() === "" && (
        <span className={errorText}>This field is required</span>
      )}
    </div>
  );
};

export default Promotions;
