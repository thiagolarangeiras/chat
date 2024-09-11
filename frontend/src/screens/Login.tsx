import { useState } from 'react';
import { postLogin, UsuarioLoginDto } from '../requests';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState<UsuarioLoginDto>({
        nome: "",
        senha: ""
    });
    function handleLogin(e: any) {
        e.preventDefault();
        postLogin(usuario).then((value)=> {
            if (value.token) navigate("/forum/1");
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="usuario">
                            Email/Usuario
                        </label>
                        <input
                            type="usuario"
                            id="usuario"
                            value={usuario.nome}
                            onChange={(e) => setUsuario({ ...usuario, nome: e.target.value })}
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Senha
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={usuario.senha}
                            onChange={(e) => setUsuario({ ...usuario, senha: e.target.value })}
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
                    >
                        Entrar
                    </button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-600">
                    Não tem uma conta?  <Link className="text-blue-500 hover:underline" to={`/signin`}>Cadastre-se</Link>
                </p>
            </div>
        </div>
    );
}