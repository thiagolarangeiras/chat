import { useState } from "react";
import { ComentarioPostDto, postComentario, convertData } from "../requests";

type PropsComentarioDetails = {
    usuario?: string;
    nome?: string;
    texto?: string;
    data?: Date;
}
export function ComentarioDetails({ usuario, nome, texto, data }: PropsComentarioDetails) {
    return (
        <div className="flex space-x-3 p-4 border-b border-gray-200">
            {/* <div className="bg-gray-300 h-10 w-10 rounded-full flex-shrink-0"></div> */}
            <div className="flex-1">
                <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm">{`${nome} (${usuario})`}</span>
                    <span className="text-xs text-gray-500">{data ? convertData(data) : ""}</span>
                </div>
                <p className="text-sm mt-1 whitespace-pre-line">{texto}</p> {/* whitespace-pre-line para respeitar quebras de linha */}
                <div className="flex items-center space-x-4 text-gray-500 text-sm mt-2">
                    {/* <button className="hover:text-blue-600">Curtir</button> */}
                    <button className="hover:text-blue-600">Responder</button>
                </div>
            </div>
        </div>
    );
};

type PropsComentarioItem = {
    usuario?: string;
    nome?: string;
    texto?: string;
    data?: Date;
}
export function ComentarioItem({ usuario, nome, texto, data }: PropsComentarioItem) {
    return (
        <div className="flex space-x-3 p-4 border-b border-gray-200">
            {/* <div className="bg-gray-300 h-10 w-10 rounded-full flex-shrink-0"></div> */}
            <div className="flex-1">
                <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm">{`${nome} (${usuario})`}</span>
                    <span className="text-xs text-gray-500">{data ? convertData(data) : ""}</span>
                </div>
                <p className="text-sm mt-1 whitespace-pre-line">{texto}</p> {/* whitespace-pre-line para respeitar quebras de linha */}
                <div className="flex items-center space-x-4 text-gray-500 text-sm mt-2">
                    {/* <button className="hover:text-blue-600">Curtir</button> */}
                    <button className="hover:text-blue-600">Responder</button>
                </div>
            </div>
        </div>
    );
};

type PropsComentarioForm = {
    idTopico?: number;
    idComentario?: number;
}

export function ComentarioForm({ idTopico, idComentario }: PropsComentarioForm) {
    const [enviar, setEnviar] = useState("");
    
    function handleTextareaKeyDown(e: any) {
        if (e.key === 'Tab') {
            e.preventDefault();
            const { selectionStart, selectionEnd } = e.target;
            setEnviar(
                enviar.substring(0, selectionStart) + '\t' + enviar.substring(selectionEnd)
            );
            setTimeout(() => {
                e.target.selectionStart = e.target.selectionEnd = selectionStart + 1;
            }, 0);
        }
    };

    function handleCommentSubmit(e: any) {
        e.preventDefault();
        const dto: ComentarioPostDto = {
            idTopico: idTopico,
            idComentarioPai: idComentario,
            corpo: enviar,
        };
        postComentario(dto);
        setEnviar("");
    };
    
    return (
        <form onSubmit={handleCommentSubmit} className="mb-4">
            <textarea
                value={enviar}
                onChange={(e) => { setEnviar(e.target.value) }}
                onKeyDown={handleTextareaKeyDown}
                placeholder="Adicione um comentário..."
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 resize-none"
                rows={4}
            />
            <button
                type="submit"
                className="bg-blue-600 text-white p-2 mt-2 rounded-lg hover:bg-blue-700"
            >
                Comentar
            </button>
        </form>
    )
}


// type PropsComentarioSecao = {
//     idTopico?: number;
//     idComentario?: number;
// }

// export default function ComentarioSecao({ idTopico, idComentario }: PropsComentarioSecao) {
//     const [enviar, setEnviar] = useState("");
//     const [comentarios, setComentarios] = useState<ComentarioGetDto[]>();

//     useEffect(() => {
//         if (idComentario) {
//             getComentarioPorComentario(idComentario, 0, 20).then((value) => {
//                 setComentarios(value);
//             });
//         } else if (idTopico) {
//             getComentarioPorTopico(idTopico, 0, 20).then((value) => {
//                 setComentarios(value);
//             });
//         }
//     }, []);

//     function handleCommentSubmit(e: any) {
//         e.preventDefault();
//         const dto: ComentarioPostDto = {
//             idTopico: idTopico,
//             idComentarioPai: idComentario,
//             corpo: enviar,
//         };
//         postComentario(dto);
//         setEnviar("");
//     };

//     function handleTextareaKeyDown(e: any) {
//         if (e.key === 'Tab') {
//             e.preventDefault();
//             const { selectionStart, selectionEnd } = e.target;
//             setEnviar(
//                 enviar.substring(0, selectionStart) + '\t' + enviar.substring(selectionEnd)
//             );
//             setTimeout(() => {
//                 e.target.selectionStart = e.target.selectionEnd = selectionStart + 1;
//             }, 0);
//         }
//     };

//     return (
//         <div className="max-w-2xl mx-auto my-10 bg-white p-6 rounded-md shadow-lg">
//             <h2 className="text-lg font-semibold mb-4">Comentários</h2>

//             <form onSubmit={handleCommentSubmit} className="mb-4">
//                 <textarea
//                     value={enviar}
//                     onChange={(e) => { setEnviar(e.target.value) }}
//                     onKeyDown={handleTextareaKeyDown}
//                     placeholder="Adicione um comentário..."
//                     className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 resize-none"
//                     rows={4}
//                 />
//                 <button
//                     type="submit"
//                     className="bg-blue-600 text-white p-2 mt-2 rounded-lg hover:bg-blue-700"
//                 >
//                     Comentar
//                 </button>
//             </form>

//             <div className="space-y-4">
//                 {comentarios?.map((com, index) => (
//                     <ComentarioItem
//                         key={index}
//                         usuario={com.usuario?.nome}
//                         nome={com.usuario?.nome}
//                         texto={com.corpo}
//                         data={com.data}
//                     />
//                 ))}
//             </div>
//         </div>
//     );
// };