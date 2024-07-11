"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaWpforms } from "react-icons/fa";
import { PiPasswordFill } from "react-icons/pi";

export default function Login() {
  const router = useRouter();
  const [loginCedula, setLoginCedula] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [error, setError] = useState(null);

  const [userData, setUserData] = useState(null); // aqui se crea el estado para el usuario

  const getLoginDetails = async () => {
    try {
      const response = await fetch("https://localhost:7087/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          cedula: loginCedula,
          password: loginPassword,
        }),
      });

      if (response.ok) {
        console.log("Login exitoso");
        const data = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role); // Almacenar el rol

        const userRole = data.role.trim().toLowerCase();
        if (userRole === "user") {
          router.push("/au");
        } else {
          router.push("/adminpage");
        }
      } else {
        const errorMessage = await response.text();
        console.error("Error al loguearse: " + errorMessage);
        setError("Cedula o contraseña incorrecta!");
      }
    } catch (error) {
      console.error("Error al hacer la solicitud: " + error.message);
      setError("Error al hacer la solicitud: " + error.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const role = localStorage.getItem("role"); // Obtener el rol del localStorage
      if (role === "admin") {
        router.push("/adminpage");
      } else {
        router.push("/au");
      }
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-purple-900">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
          <div className="w-3/5 p-5">
            <div className="text-left font-bold">
              <span className="text-purple-900">COBIT</span>19
            </div>
            <div className="py-16">
              <h2 className="text-3xl font-bold text-purple-900 mb-2">
                Iniciar Sesion
              </h2>
              <div className="border-2 w-10 border-purple-500 inline-block mb-2"></div>
              <div className="flex flex-col items-center">
                <div className="bg-gray-100 w-72 p-2 rounded-3xl flex items-center mt-5 mb-4">
                  <FaWpforms className="text-gray-400 m-2" />
                  <input
                    type="text"
                    className="bg-gray-100 outline-none flex-1"
                    placeholder="Cedula"
                    value={loginCedula}
                    onChange={(e) => setLoginCedula(e.target.value)}
                  />
                </div>
                <div className="bg-gray-100 w-72 p-2 rounded-3xl flex items-center">
                  <PiPasswordFill className="text-gray-400 m-2" />
                  <input
                    type="password"
                    className="bg-gray-100 outline-none flex-1"
                    placeholder="Contraseña"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                {error && <p className="text-purple-500 mt-4">{error}</p>}
                <button
                  className="border-2 text-purple-500 border-purple-500 rounded-full px-12 py-2 mt-6 inline-block font-semibold hover:bg-white hover:text-black"
                  onClick={getLoginDetails}
                >
                  Entrar
                </button>
              </div>
            </div>
          </div>
          <div className="w-2/5 bg-purple-900 text-white rounded-tr-2xl rounded-br-2xl py-36 px-12">
            <h2 className="text-3xl font-bold mb-2">¡HOLA!</h2>
            <div className="border-2 w-10 border-white inline-block mb-2"></div>
            <p className="mb-1">
              ¿Nuevo usuario?</p>
            <p className="mb-10">¡Registrate!</p>
            <Link
              href="/register"
              className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-purple-500"
            >
              Registrarse
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
