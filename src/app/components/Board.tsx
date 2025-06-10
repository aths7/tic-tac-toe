'use client';
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Square from './Square';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const calculateWinner = (s: (string | null)[]) => {
    const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6],
    ];
    for (const [a, b, c] of lines) {
        if (s[a] && s[a] === s[b] && s[a] === s[c]) {
            return s[a];
        }
    }
    return null;
};

// Variants for twinkle-exit animation
const itemVariants = {
    enter: { opacity: 1, scale: 1, rotate: 0 },
    exit: {
        opacity: [1, 0.5, 1, 0],
        scale: [1, 1.1, 1, 0],
        rotate: [0, 10, -10, 0],
    },
};

const playClick = () => {
    const audio = new Audio('/handgun.mp3');
    audio.play();
};


export default function Board() {
    const [squares, setSquares] = useState<(string | null)[]>(Array(9).fill(null));
    const [histX, setHistX] = useState<number[]>([]);
    const [histO, setHistO] = useState<number[]>([]);
    const [xIsNext, setXIsNext] = useState(true);

    const winner = calculateWinner(squares);
    const { width, height } = useWindowSize();


    useEffect(() => {
        if (winner) {
            const audio = new Audio('/win.wav');
            audio.play();
        }
    }, [winner]);


    const handleClick = (i: number) => {
        if (squares[i] || winner) return;

        const next = [...squares];
        const playerSymbol = xIsNext ? 'X' : 'O';
        next[i] = playerSymbol;

        if (xIsNext) {
            const newHist = [...histX, i];
            if (newHist.length > 3) {
                const [oldest, ...rest] = newHist;
                next[oldest] = null;
                setHistX(rest);
            } else {
                setHistX(newHist);
            }
        } else {
            const newHist = [...histO, i];
            if (newHist.length > 3) {
                const [oldest, ...rest] = newHist;
                next[oldest] = null;
                setHistO(rest);
            } else {
                setHistO(newHist);
            }
        }

        setSquares(next);
        setXIsNext(!xIsNext);
    };

    const handleRestart = () => {
        setSquares(Array(9).fill(null));
        setHistX([]);
        setHistO([]);
        setXIsNext(true);
    };

    return (
        <div>
            <div className="flex flex-col items-center justify-center h-screen">
                <div className="text-center mb-4">
                    <h1 className="text-4xl font-bold">Tic Tac Toe</h1>
                    <p className="text-lg mt-2">
                        {winner
                            ? `Winner: ${winner}`
                            : `Next Player: ${xIsNext ? 'X' : 'O'}`}
                    </p>
                    {winner && (
                        <button
                            onClick={() => { playClick(); handleRestart() }}
                            className="mt-4 px-6 py-2 bg-blue-200 border-b-[6px] border-r-[6px] border-blue-500 rounded-lg shadow-[inset_0_-2px_4px_rgba(0,0,0,0.2)] flex items-center justify-center text-2xl font-bold text-gray-800 hover:bg-gray-300 active:border-b-[2px] active:border-r-[2px] active:translate-y-[4px] transition-all"
                        >
                            Restart Game
                        </button>
                    )}
                </div>
                <div className="grid grid-cols-3 gap-2">
                    <AnimatePresence>
                        {squares.map((v, i) => (
                            <motion.div
                                key={i}
                                layout
                                variants={itemVariants}
                                initial="enter"
                                animate="enter"
                                exit="exit"
                                transition={{ duration: 0.8, ease: 'easeInOut' }}
                            >
                                <Square value={v} playClick={playClick} onClick={() => handleClick(i)} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
            {winner && <Confetti width={width} height={height} />}

        </div>
    );
}