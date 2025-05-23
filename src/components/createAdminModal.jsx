import { X } from "lucide-react";
import { useState } from "react";

const CreateAdminModal = ({ setShowCreateAdmin }) => {
  const [admin, setAdmin] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleCreate = () => {
    if (!admin || !password || !confirmPassword) {
      setError("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp.");
      return;
    }

    console.log("Tạo admin:", { admin, password });

    setAdmin("");
    setPassword("");
    setConfirmPassword("");
    setError("");
    setShowCreateAdmin(false);
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm'>
      <div className='relative w-full max-w-md bg-white p-6 rounded-xl shadow-lg'>
        <button
          onClick={() => setShowCreateAdmin(false)}
          className='absolute top-4 right-4 text-gray-500 hover:text-black'>
          <X size={24} />
        </button>

        <h2 className='text-xl font-semibold mb-4 text-center text-black'>
          Tạo tài khoản admin
        </h2>

        <div className='flex flex-col gap-4'>
          <input
            type='text'
            placeholder='Tên admin'
            value={admin}
            onChange={(e) => setAdmin(e.target.value)}
            className='border px-3 py-2 rounded-md outline-none focus:ring-2 ring-blue-300'
          />
          <input
            type='password'
            placeholder='Mật khẩu'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='border px-3 py-2 rounded-md outline-none focus:ring-2 ring-blue-300'
          />
          <input
            type='password'
            placeholder='Xác nhận mật khẩu'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className='border px-3 py-2 rounded-md outline-none focus:ring-2 ring-blue-300'
          />

          {error && <p className='text-sm text-red-600'>{error}</p>}

          <div className='flex justify-end gap-2 pt-2'>
            <button
              onClick={() => setShowCreateAdmin(false)}
              className='px-4 py-2 rounded-md border hover:bg-gray-100'>
              Hủy
            </button>
            <button
              onClick={handleCreate}
              className='px-4 py-2 rounded-md bg-yellow-500 text-white hover:bg-yellow-600'>
              Tạo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreateAdminModal;
