import React from "react";

const priceOptions = [
  "Free",
  "$9.99 (tier 1)",
  "$12.99 (tier 2)",
  "$14.99 (tier 3)",
  "$16.99 (tier 4)",
  "$19.99 (tier 5)",
  "$22.99 (tier 6)",
  "$24.99 (tier 7)",
  "$27.99 (tier 8)",
  "$29.99 (tier 9)",
  "$34.99 (tier 10)",
  "$39.99 (tier 11)",
  "$44.99 (tier 12)",
  "$49.99 (tier 13)",
  "$54.99 (tier 14)",
  "$59.99 (tier 15)",
  "$64.99 (tier 16)",
  "$69.99 (tier 17)",
  "$74.99 (tier 18)",
  "$79.99 (tier 19)",
  "$84.99 (tier 20)",
  "$89.99 (tier 21)",
  "$94.99 (tier 22)",
];

const Pricing = ({ price, setPrice, touched, setTouched }) => {
  return (
    <div className="bg-white shadow-md rounded-md p-6 border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Pricing</h2>
      <p className="text-gray-600 mb-5">Choose a price tier or make the course free.</p>

      <select
        className={`w-full px-4 py-2 rounded-md border ${
          touched.price && price.trim() === "" ? "border-red-500" : "border-gray-300"
        } focus:outline-none focus:ring-2 focus:ring-blue-500 mb-1`}
        value={price}
        onChange={e => {
          setPrice(e.target.value);
          setTouched(t => ({ ...t, price: true }));
        }}
      >
        <option value="">Select price</option>
        {priceOptions.map((p, idx) => (
          <option key={idx} value={p}>{p}</option>
        ))}
      </select>

      {touched.price && price.trim() === "" && (
        <p className="text-red-500 text-sm mt-1">This field is required</p>
      )}
    </div>
  );
};

export default Pricing;
