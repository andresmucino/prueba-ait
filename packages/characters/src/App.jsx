import React from 'react';
import './global.css';
import { useCharacters } from './hooks/useCharacters';
import { usePagination } from './hooks/usePagination';

const Characters = () => {
    const { allCharacters, loading, fetchingMore, error, totalCount, nextApiUrl, fetchPage } = useCharacters();
    const { displayPage, totalDisplayPages, visibleCharacters, goToPage, getPageNumbers } = usePagination({
        allCharacters, totalCount, nextApiUrl, fetchingMore, loading, fetchPage
    });

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-200 flex items-center justify-center">
                <p className="text-lg text-gray-500">Loading characters...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-200 flex items-center justify-center">
                <p className="text-red-600">{error}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-200 px-4 py-4 md:px-8 md:py-6">
            {fetchingMore && (
                <p className="text-sm text-gray-500 mb-3">Loading more...</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                {visibleCharacters.map((character) => (
                    <article
                        key={character.id}
                        className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-200"
                    >
                        <img
                            src={character.image}
                            alt={character.name}
                            className="w-full h-48 sm:h-52 md:h-56 object-cover"
                        />
                        <div className="p-4">
                            <h2 className="text-base font-semibold text-gray-900 mb-1">{character.name}</h2>
                            <p className="text-sm text-gray-600">{character.species}</p>
                            <p className="text-xs text-gray-500 mt-1">{character.status}</p>
                        </div>
                    </article>
                ))}
            </div>

            <div className="flex justify-center items-center gap-2 mt-8 md:mt-10 flex-wrap">
                <button
                    onClick={() => goToPage(displayPage - 1)}
                    disabled={displayPage === 1}
                    className={displayPage === 1
                        ? 'px-3 py-2 rounded-lg border border-gray-200 bg-gray-300 text-gray-400 text-sm cursor-not-allowed'
                        : 'px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm cursor-pointer hover:bg-gray-100'}
                >
                    ← Prev
                </button>

                {getPageNumbers().map((item, idx) =>
                    item === '...' ? (
                        <span key={`ellipsis-${idx}`} className="px-1 text-gray-500">…</span>
                    ) : (
                        <button
                            key={item}
                            onClick={() => goToPage(item)}
                            className={item === displayPage
                                ? 'px-3 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white font-bold text-sm cursor-pointer'
                                : 'px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm cursor-pointer hover:bg-gray-100'}
                        >
                            {item}
                        </button>
                    )
                )}

                <button
                    onClick={() => goToPage(displayPage + 1)}
                    disabled={displayPage === totalDisplayPages}
                    className={displayPage === totalDisplayPages
                        ? 'px-3 py-2 rounded-lg border border-gray-200 bg-gray-300 text-gray-400 text-sm cursor-not-allowed'
                        : 'px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm cursor-pointer hover:bg-gray-100'}
                >
                    Next →
                </button>
            </div>

            <p className="text-center mt-3 text-gray-500 text-sm">
                Página {displayPage} de {totalDisplayPages} — {totalCount} personajes
            </p>
        </div>
    );
};

export default Characters;