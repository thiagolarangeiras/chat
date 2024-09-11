import { TopicoGetDto } from "../requests";
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