import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPasswordScreen = () => {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSendCode = (e) => {
    e.preventDefault();
    console.log("Sending reset code to phone number:", phone);
    setStep(2);
  };

  const handleVerifyCode = (e) => {
    e.preventDefault();
    console.log("Verifying reset code:", code);
    if (code.length === 4) {
      setStep(3);
    } else {
      alert("Verification code must be 4 digits.");
    }
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    console.log("Resetting password to:", newPassword);
    navigate("/login");
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-black text-white'>
      <div className='w-full max-w-md bg-white p-8 rounded-lg shadow-lg'>
        <h1 className='text-3xl font-bold text-center text-black mb-6'>
          Forgot Password
        </h1>

        {step === 1 && (
          <form onSubmit={handleSendCode}>
            <div className='mb-6'>
              <label htmlFor='phone' className='block text-black font-medium'>
                Phone Number:
              </label>
              <input
                type='tel'
                id='phone'
                name='phone'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className='w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400'
                placeholder='Enter your phone number'
                pattern='[0-9]{10,11}'
                required
              />
            </div>
            <button
              type='submit'
              className='w-full py-3 bg-yellow-500 text-black font-bold rounded-md hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500'>
              Send Reset Code
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyCode}>
            <div className='mb-6'>
              <label htmlFor='code' className='block text-black font-medium'>
                Verification Code:
              </label>
              <input
                type='text'
                id='code'
                name='code'
                value={code}
                onChange={(e) => setCode(e.target.value)}
                maxLength={4}
                className='w-full p-3 mt-1 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400'
                placeholder='Enter 4-digit code'
                required
              />
            </div>
            <button
              type='submit'
              className='w-full py-3 bg-yellow-500 text-black font-bold rounded-md hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500'>
              Verify Code
            </button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleResetPassword}>
            <div className='mb-4'>
              <label
                htmlFor='newPassword'
                className='block text-black font-medium'>
                New Password:
              </label>
              <input
                type='password'
                id='newPassword'
                name='newPassword'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className='w-full p-3 mt-1 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400'
                required
              />
            </div>
            <div className='mb-6'>
              <label
                htmlFor='confirmPassword'
                className='block text-black font-medium'>
                Confirm Password:
              </label>
              <input
                type='password'
                id='confirmPassword'
                name='confirmPassword'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className='w-full p-3 mt-1 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400'
                required
              />
            </div>
            <button
              type='submit'
              className='w-full py-3 bg-yellow-500 text-black font-bold rounded-md hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500'>
              Reset Password
            </button>
          </form>
        )}

        <p className='mt-4 text-center text-black'>
          Remembered your password?{" "}
          <a
            href='/login'
            className='text-yellow-500 font-semibold hover:text-yellow-400'>
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordScreen;
