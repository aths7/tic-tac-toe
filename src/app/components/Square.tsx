'use client';
import React from 'react';


export default function Square({ value, playClick, onClick }: { value: string | null; playClick: () => void; onClick: () => void }) {

    return (
        <button
            style={{ cursor: 'url("/gun.png") 16 16, auto' }}
            className="w-20 h-20 bg-gray-200 border-b-[6px] border-r-[6px] border-gray-500 rounded-lg shadow-[inset_0_-2px_4px_rgba(0,0,0,0.2)] flex items-center justify-center text-2xl font-bold text-gray-800 hover:bg-gray-300 active:border-b-[2px] active:border-r-[2px] active:translate-y-[4px] transition-all"
            onClick={() => {
                playClick();
                onClick();
            }}
        >
            {value}
        </button>


    );
}
