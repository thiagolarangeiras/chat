import { useState } from 'react';
import { LoginDto, postLogin, postSign, UsuarioGetDto, UsuarioPostDto } from '../requests';
import { Link, useNavigate } from 'react-router-dom';

export default function Signin() {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState<UsuarioPostDto>({
        nome: "",
        email: "",
        senha: "",
    });
    const [senha2, setSenha2] = useState("");

    function handleSignIn(event: any) {
        event.preventDefault();
        if (usuario.senha !== senha2) {
            alert('As senhas não coincidem');
            return;
        }
        postSign(usuario).then((value: UsuarioGetDto)=>{
            if(value.id) navigate("/login");
        });
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold text-center mb-6">Cadastro</h2>
                <form onSubmit={handleSignIn}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="usuario">
                            Nome de usuario
                        </label>
                        <input
                            type="text"
                            id="usuario"
                            value={usuario.nome}
                            onChange={(e) => setUsuario({ ...usuario, nome: e.target.value })}
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={usuario.email}
                            onChange={(e) => setUsuario({ ...usuario, email: e.target.value })}
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                            required
                        />
                    </div>
                    <div className="mb-4">
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
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                            Confirmar Senha
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={senha2}
                            onChange={(e) => setSenha2(e.target.value)}
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
                    >
                        Cadastrar
                    </button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-600">
                    Já tem uma conta?  <Link className="text-blue-500 hover:underline" to={`/login`}>Entrar</Link>
                </p>
            </div>
        </div>
    );
}