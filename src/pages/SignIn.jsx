import React, { useState } from "react";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaExclamationTriangle,
  FaSignInAlt,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice.js";

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  
  // Pega estado do Redux
  const { loading, error } = useSelector((state) => state.user);

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "email":
        if (!value.trim()) error = "Email é obrigatório";
        else if (!/\S+@\S+\.\S+/.test(value)) error = "Email inválido";
        break;
      case "password":
        if (!value.trim()) error = "Senha é obrigatória";
        else if (value.length < 6) error = "Senha deve ter pelo menos 6 caracteres";
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFieldErrors({ ...fieldErrors, [name]: validateField(name, value) });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setFieldErrors({ ...fieldErrors, [name]: validateField(name, value) });
  };

  const validateForm = () => {
    const errors = {};
    let isValid = true;
    Object.keys(formData).forEach((key) => {
      const msg = validateField(key, formData[key]);
      if (msg) {
        errors[key] = msg;
        isValid = false;
      }
    });
    setFieldErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      dispatch(signInStart());

      const res = await fetch("/api/empre/loginEmpresa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      // Guardar token e user
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      dispatch(signInSuccess(data.user));

      // Redirecionar
      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/empresa");
      }
    } catch (err) {
      dispatch(signInFailure(err.message));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8">
          {/* Cabeçalho */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaSignInAlt className="text-blue-600 text-2xl" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Bem-vindo de volta</h2>
            <p className="text-gray-600 mt-2">Entre na sua conta para continuar</p>
          </div>

          {/* Mensagem de erro */}
          {error && (
            <div className="flex items-start p-4 mb-6 bg-red-50 rounded-lg border border-red-200">
              <FaExclamationTriangle className="text-red-500 mt-1 mr-3 flex-shrink-0" />
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {/* Formulário */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <div
                className={`flex items-center border rounded-lg px-3 py-2 transition-all duration-200 ${
                  fieldErrors.email
                    ? "border-red-500"
                    : "border-gray-300 focus-within:border-blue-500"
                } focus-within:ring-2 focus-within:ring-blue-200`}
              >
                <FaEnvelope
                  className={`mr-2 ${
                    fieldErrors.email ? "text-red-500" : "text-gray-400"
                  }`}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full outline-none bg-transparent"
                  disabled={loading}
                />
              </div>
              {fieldErrors.email && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <FaExclamationTriangle className="mr-1" /> {fieldErrors.email}
                </p>
              )}
            </div>

            {/* Senha */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Senha</label>
              <div
                className={`flex items-center border rounded-lg px-3 py-2 transition-all duration-200 ${
                  fieldErrors.password
                    ? "border-red-500"
                    : "border-gray-300 focus-within:border-blue-500"
                } focus-within:ring-2 focus-within:ring-blue-200`}
              >
                <FaLock
                  className={`mr-2 ${
                    fieldErrors.password ? "text-red-500" : "text-gray-400"
                  }`}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Sua senha"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full outline-none bg-transparent"
                  disabled={loading}
                />
                <button
                  type="button"
                  className="text-gray-400 hover:text-gray-600 ml-2"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {fieldErrors.password && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <FaExclamationTriangle className="mr-1" /> {fieldErrors.password}
                </p>
              )}
            </div>

            {/* Botão Entrar */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold shadow-md hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed transition flex items-center justify-center"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Entrando...
                </>
              ) : (
                "Entrar"
              )}
            </button>
          </form>

          {/* Link para cadastro */}
          <p className="text-center text-sm text-gray-600 mt-8">
            Não tem uma conta?{" "}
            <Link
              to="/cadempresa"
              className="text-blue-600 font-semibold hover:underline"
            >
              Cadastre sua empresa
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
