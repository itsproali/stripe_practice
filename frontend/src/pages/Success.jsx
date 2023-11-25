import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [params, setParams] = useSearchParams();
  const [sessionId, setSessionId] = useState(
    "cs_test_a18b3HD2EhyScgwazD0awpahQecC4MmX4tErCiWb2Q8OhMYFeoild9nF0o"
  );

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?._id) setUserId(user._id);
    if (params.get("session_id")) setSessionId(params.get("session_id"));

    // payment success
    const paymentSuccess = async () => {
      try {
        const { data } = await axios.post(
          "http://localhost:5000/payment/success",
          {
            userId,
            sessionId,
          }
        );

        if (data?.success) {
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    };
    paymentSuccess();
  }, [userId, sessionId, params, navigate]);

  return (
    <>
      <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)]">
        <svg
          className="w-24 h-24 text-green-500 mb-6"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M19.293 3.293a1 1 0 0 0-1.414 0L8 13.586 3.707 9.293a1 1 0 1 0-1.414 1.414l5 5a1 1 0 0 0 1.414 0l11-11a1 1 0 0 0 0-1.414z"
          />
        </svg>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Payment Successful!
        </h2>
        <p className="text-gray-600 text-lg mb-8">
          Thank you for your subscription.
        </p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Go to Dashboard
        </button>
      </div>
    </>
  );
};

export default Success;
