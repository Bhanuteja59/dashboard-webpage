"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home() {
  const router = useRouter();

  return (
    <div className="vh-100 d-flex align-items-center justify-content-center bg-light">
      <motion.div
        className="container text-center p-5 bg-white shadow-lg rounded"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className="fw-bold text-primary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Welcome to DashboardPro 🚀
        </motion.h1>
        <p className="text-muted">
          Manage your data with ease and efficiency. A modern dashboard with seamless user experience and analytics.
        </p>

        <motion.div
          className="d-flex justify-content-center gap-3 mt-4"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <button className="btn btn-primary btn-lg px-4" onClick={() => router.push("/login")}>
            Login
          </button>
          <button className="btn btn-outline-primary btn-lg px-4" onClick={() => router.push("/register")}>
            Sign Up
          </button>
        </motion.div>

        <div className="mt-5">
          <h3 className="fw-bold text-success">Why Choose DashboardPro?</h3>
          <div className="row mt-4">
            <div className="col-md-4">
              <motion.div
                className="card p-3 shadow-sm"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <h5 className="fw-bold text-primary">🔒 Secure Login</h5>
                <p className="text-muted">Your data is safe with our encrypted authentication system.</p>
              </motion.div>
            </div>
            <div className="col-md-4">
              <motion.div
                className="card p-3 shadow-sm"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <h5 className="fw-bold text-primary">📊 Data Analytics</h5>
                <p className="text-muted">Track and visualize your data with interactive charts.</p>
              </motion.div>
            </div>
            <div className="col-md-4">
              <motion.div
                className="card p-3 shadow-sm"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <h5 className="fw-bold text-primary">⚡ Fast & Responsive</h5>
                <p className="text-muted">Optimized for speed and smooth performance on all devices.</p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
