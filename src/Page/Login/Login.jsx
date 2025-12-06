import React from 'react';

const Login = () => {
   return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card w-full max-w-md bg-base-100 shadow-xl p-8"
      >
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

        <form className="space-y-4">
          <div className="form-control">
            <label className="label">Email</label>
            <input type="email" placeholder="your@email.com" className="input input-bordered" />
          </div>

          <div className="form-control">
            <label className="label">Password</label>
            <input type="password" placeholder="••••••••" className="input input-bordered" />
          </div>

          <button className="btn btn-primary w-full mt-2">Login</button>
        </form>

        <div className="divider">or</div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn btn-outline w-full flex items-center gap-2"
        >
          <img src="https://i.ibb.co/GpV4bbX/google.png" className="w-6" />
          Continue with Google
        </motion.button>

        <p className="mt-4 text-center text-sm">
          Don't have an account? <Link to="/register" className="text-primary">Register</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;