
import { ForumGetDto } from "../requests";

export type PropsForumCard = { forum: ForumGetDto }

export function ForumItem({ forum }: PropsForumCard) {
    return (
        <div className="max-w-2xl mx-auto bg-white shadow-md rounded-md p-6">
            <h1 className="text-2xl font-bold text-gray-800">{forum.nome}</h1>
            <p className="mt-4 text-gray-600">{forum.descricao}</p>
        </div>
    );
};

export function ForumDetails({ forum }: PropsForumCard) {
    return (
        <div className="max-w-2xl mx-auto bg-white shadow-md rounded-md p-6">
            <h1 className="text-2xl font-bold text-gray-800">{forum.nome}</h1>
            <p className="mt-4 text-gray-600">{forum.descricao}</p>
        </div>
    );
};