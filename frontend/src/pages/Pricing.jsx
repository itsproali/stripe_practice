import axios from "axios";

const plans = [
  {
    name: "Basic",
    price: "9.99",
    features: ["Access to essential features"],
  },
  {
    name: "Pro",
    price: "19.99",
    features: ["Access to essential and pro features"],
  },
  {
    name: "Business",
    price: "49.99",
    features: ["Access to all features including advanced analytics"],
  },
];

const Pricing = () => {
  const handleChoosePlan = async (plan) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/payment/create-subscription-session",
        {
          plan,
          userId: JSON.parse(localStorage.getItem("user"))._id,
        }
      );

      console.log(data);
      if (data?.session?.url) {
        window.location.href = data?.session?.url;
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-[calc(100vh-64px)] grid place-items-center">
      <div>
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-blue-600 tracking-wide uppercase">
              Transactions
            </h2>
            <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              Simple, transparent pricing
            </p>
            <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
              No contracts, no hidden fees, cancel anytime.
            </p>
          </div>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-3 gap-4 mt-16">
          {plans.map((plan, i) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden shadow-xl py-4 border hover:border-blue-500 flex flex-col justify-between gap-12"
            >
              <div className="px-6">
                <div className="font-bold text-xl mb-2">{plan?.name}</div>
                {plan?.features?.map((feature, index) => (
                  <p key={index} className="text-gray-700 text-base">
                    {feature}
                  </p>
                ))}
              </div>
              <div className="px-6 pt-4 pb-2">
                <p className="text-blue-700 text-2xl font-bold">
                  ${plan?.price}
                </p>
                <button
                  className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                  onClick={() => handleChoosePlan(plan)}
                >
                  Choose Plan
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
