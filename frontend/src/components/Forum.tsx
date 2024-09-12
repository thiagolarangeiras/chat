
import { ForumGetDto } from "../requests";

export type PropsForumCard = { forum: ForumGetDto }

export function ForumItem({ forum }: PropsForumCard) {
    return (
        <div className="max-w-2xl mx-auto bg-white shadow-md rounded-md p-6 m-6">
            <h1 className="text-2xl font-bold text-gray-800">{forum.nome}</h1>
            <p className="mt-4 text-gray-600">{forum.descricao}</p>
        </div>
    );
};

export type PropsForumDetals = { 
    forum: ForumGetDto;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ForumDetails({ forum, setIsOpen }: PropsForumDetals) {
    return (
        <>
            <div className="max-w-2xl mx-auto bg-white shadow-md rounded-md p-6 m-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">{forum.nome}</h1>
                        <p className="mt-4 text-gray-600">{forum.descricao}</p>
                    </div>
                    <button
                        onClick={() => { setIsOpen(true) }}
                        className="bg-blue-600 text-white p-2 mt-2 rounded-lg hover:bg-blue-700"
                    > Novo Topico </button>
                </div>
            </div>
        </>
    );
};

type ForumFormModalProps = {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function ForumFormModal({ setIsOpen }: ForumFormModalProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative w-full max-w-lg p-6 bg-white rounded shadow-lg">
                <button
                    onClick={()=> setIsOpen(false)}
                    className="absolute top-0 right-0 mt-2 mr-2 text-gray-500 hover:text-gray-700"
                >
                    ✕
                </button>
                <h2 className="mb-4 text-xl font-bold text-gray-800">Modal Title</h2>
                <p className="text-gray-600">
                    This is a modal with Tailwind CSS. You can put any content here.
                </p>
                <div className="mt-4">
                    <button
                        onClick={()=> setIsOpen(false)}
                        className="px-4 py-2 mr-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                    >
                        Close
                    </button>
                    <button className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600">
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    )
} 