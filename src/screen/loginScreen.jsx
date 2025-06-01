const LoginScreen = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-black text-white">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-black mb-6">
          Login
        </h1>
        <form>
          <div className="mb-4">
            <label htmlFor="username" className="block text-black font-medium">
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-black font-medium">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-yellow-500 text-black font-bold rounded-md hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
