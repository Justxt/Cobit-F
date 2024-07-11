"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaUser, FaWpforms, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { PiPasswordFill } from "react-icons/pi";

export default function Register() {
  const router = useRouter();
  const [cedula, setCedula] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const registerUser = async () => {
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      const response = await fetch("https://localhost:7087/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cedula,
          name,
          lastName,
          email,
          phone,
          password,
          confirmPassword,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Usuario registrado correctamente", data);
        router.push("/login");
      } else {
        const errorMessage = await response.text();
        setError(errorMessage);
      }
    } catch (error) {
      setError("Error al hacer la solicitud: " + error.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      if (localStorage.getItem("role") === "admin") {
        router.push("/adminpage");
      } else {
        router.push("/au");
      }
    }
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-purple-900">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
          <div className="w-3/5 p-5">
            <div className="text-left font-bold">
              <span className="text-purple-900">BLACK</span>JACK
            </div>
            <div className="py-10">
              <h2 className="text-3xl font-bold text-purple-900 mb-2">
                Registrarse
              </h2>
              <div className="border-2 w-10 border-purple-900 inline-block mb-2"></div>

              <div className="flex flex-col items-center">
                <div className="bg-gray-100 w-96 p-2 rounded-3xl flex items-center mt-5 mb-4">
                  <FaWpforms className="text-gray-400 m-2" />
                  <input
                    type="text"
                    className="bg-gray-100 outline-none flex-1"
                    placeholder="Cedula"
                    value={cedula}
                    onChange={(e) => setCedula(e.target.value)}
                  />
                </div>
                <div className="flex justify-between mb-4 w-full">
                  <div className="bg-gray-100 w-48 p-2 rounded-3xl flex items-center">
                    <FaUser className="text-gray-400 m-2" />
                    <input
                      type="text"
                      className="bg-gray-100 outline-none w-full"
                      placeholder="Nombre"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="bg-gray-100 w-46 p-2 rounded-3xl flex items-center">
                    <FaUser className="text-gray-400 m-2" />
                    <input
                      type="text"
                      className="bg-gray-100 outline-none w-full"
                      placeholder="Apellido"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="bg-gray-100 w-96 p-2 rounded-3xl flex items-center mb-4">
                  <MdEmail className="text-gray-400 m-2" />
                  <input
                    type="email"
                    className="bg-gray-100 outline-none flex-1"
                    placeholder="Correo"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="bg-gray-100 w-96 p-2 rounded-3xl flex items-center mb-4">
                  <FaPhoneAlt className="text-gray-400 m-2" />
                  <input
                    type="tel"
                    className="bg-gray-100 outline-none flex-1"
                    placeholder="Telefono"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="bg-gray-100 w-96 p-2 rounded-3xl flex items-center mb-4">
                  <PiPasswordFill className="text-gray-400 m-2" />
                  <input
                    type="password"
                    className="bg-gray-100 outline-none flex-1"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="bg-gray-100 w-96 p-2 rounded-3xl flex items-center mb-4">
                  <PiPasswordFill className="text-gray-400 m-2" />
                  <input
                    type="password"
                    className="bg-gray-100 outline-none flex-1"
                    placeholder="Confirmar Contraseña"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                {error && <p className="text-purple-900 mt-4">{error}</p>}
                <button
                  className="border-2 text-purple-900 border-purple-900 rounded-full px-12 py-2 mt-6 inline-block font-semibold hover:bg-white hover:text-black"
                  onClick={registerUser}
                >
                  Registrarse
                </button>
              </div>
            </div>
          </div>
          <div className="w-2/5 bg-purple-900 text-white rounded-tr-2xl rounded-br-2xl py-36 px-12">
            <h2 className="text-3xl font-bold mb-2">¡HOLA!</h2>
            <div className="border-2 w-10 border-white inline-block mb-2"></div>
            <p className="mb-1">
              ¿Ya tienes una cuenta?
            </p>
            <p className="mb-10">Inicia sesión</p>
            <Link
              href="/login"
              className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-purple-900"
            >
              Iniciar Sesion
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
