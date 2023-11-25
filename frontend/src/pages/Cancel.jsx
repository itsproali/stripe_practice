const Cancel = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)]">
        <svg
          className="w-24 h-24 text-red-500 mb-6"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm-4.293-5.293a1 1 0 011.414-1.414L10 12.586l3.879-3.879a1 1 0 111.414 1.414L11.414 14l3.879 3.879a1 1 0 11-1.414 1.414L10 15.414l-3.879 3.879a1 1 0 01-1.414-1.414L8.586 14 4.707 10.121a1 1 0 010-1.414z"
          />
        </svg>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Payment Canceled
        </h2>
        <p className="text-gray-600 text-lg mb-8">
          Your subscription payment was canceled.
        </p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Return to Homepage
        </button>
      </div>
    </>
  );
};

export default Cancel;
