import { useState } from "react";
import { postTopico, TopicoGetDto, TopicoPostDto } from "../requests";
import { Link } from "react-router-dom";

export type PropsTopicoCard = { topico: TopicoGetDto }

export function TopicoDetails({ topico }: PropsTopicoCard) {
    return (
        <div className="max-w-2xl mx-auto bg-white shadow-md rounded-md p-6">
            <Link to={`/forum/${topico.idForum}`}><p className="mt-4 text-gray-600 text-blue-500 hover:underline">Voltar para forum</p></Link>
            <div className="mt-6 flex items-center">
                <div className="flex-shrink-0">
                    <img
                        className="h-10 w-10 rounded-full"
                        src={topico.usuario?.avatar}
                        alt={""}
                    />
                </div>
                <div className="ml-4">
                    <p className="text-sm font-medium text-gray-800">{topico.usuario?.nome}</p>
                    <p className="text-sm text-gray-500">{topico.usuario?.email}</p>
                </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">{topico.titulo}</h1>
            <p className="mt-4 text-gray-600">{topico.corpo}</p>
        </div>
    );
};

export function TopicoItem({ topico }: PropsTopicoCard) {
    return (
        <div className="max-w-2xl mx-auto bg-white shadow-md rounded-md p-6">
            <div className="mt-6 flex items-center">
                <div className="flex-shrink-0">
                    <img
                        className="h-10 w-10 rounded-full"
                        src={topico.usuario?.avatar}
                        alt={""}
                    />
                </div>
                <div className="ml-4">
                    <p className="text-sm font-medium text-gray-800">{topico.usuario?.nome}</p>
                    <p className="text-sm text-gray-500">{topico.usuario?.email}</p>
                </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">{topico.titulo}</h1>
        </div>
    );
};

type TopicoFormModalProps = {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    idForum: number;
}

export function TopicoFormModal({ setIsOpen, idForum }: TopicoFormModalProps) {
    const [ topico, setTopico ] = useState<TopicoPostDto>({
        idForum: idForum,
        titulo: "",
        corpo: "",
    }); 
    
    function handleLogin(e: any) {
        e.preventDefault();
        postTopico(topico).then(()=> {
            setIsOpen(false);
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative w-full max-w-lg p-6 bg-white rounded shadow-lg">
                <button
                    onClick={()=> setIsOpen(false)}
                    className="absolute top-0 right-0 mt-2 mr-2 text-gray-500 hover:text-gray-700"
                >
                    ✕
                </button>
                <h2 className="mb-4 text-xl font-bold text-gray-800">Criar novo topico</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="titulo">
                            Titulo
                        </label>
                        <input
                            type="text"
                            id="titulo"
                            value={topico?.titulo}
                            onChange={(e) => setTopico({ ...topico, titulo: e.target.value })}
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="corpo">
                            Corpo
                        </label>
                        <input
                            type="text"
                            id="corpo"
                            value={topico?.corpo}
                            onChange={(e) => setTopico({ ...topico, corpo: e.target.value })}
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
            </div>
        </div>
    )
} 