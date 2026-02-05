'use client';

import { useState } from 'react';
import { initialBoard } from '@/lib/chess-logic';
import type { Board, Piece } from '@/lib/types';
import { cn } from '@/lib/utils';

const pieceToUnicode: { [key in NonNullable<Piece>['type']]: { white: string; black: string } } = {
  pawn: { white: '♙', black: '♟' },
  rook: { white: '♖', black: '♜' },
  knight: { white: '♘', black: '♞' },
  bishop: { white: '♗', black: '♝' },
  queen: { white: '♕', black: '♛' },
  king: { white: '♔', black: '♚' },
};

function ChessPiece({ piece }: { piece: Piece }) {
  if (!piece) return null;
  return <span className="text-4xl md:text-5xl drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">{pieceToUnicode[piece.type][piece.color]}</span>;
}

export function Chessboard() {
  const [board, setBoard] = useState<Board>(initialBoard);
  const [selectedPiece, setSelectedPiece] = useState<{ row: number; col: number } | null>(null);

  const handleSquareClick = (row: number, col: number) => {
    if (selectedPiece) {
      // Basic move logic (no validation)
      const newBoard = board.map(r => [...r]);
      const pieceToMove = newBoard[selectedPiece.row][selectedPiece.col];
      
      if (pieceToMove) {
          newBoard[row][col] = pieceToMove;
          newBoard[selectedPiece.row][selectedPiece.col] = null;
          setBoard(newBoard);
      }
      setSelectedPiece(null);
    } else {
      // Select piece
      if (board[row][col]) {
        setSelectedPiece({ row, col });
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
        <div className="grid grid-cols-8 border-2 border-gray-900 shadow-2xl">
        {board.map((row, rowIndex) =>
            row.map((piece, colIndex) => {
            const isLightSquare = (rowIndex + colIndex) % 2 !== 0;
            const isSelected = selectedPiece?.row === rowIndex && selectedPiece?.col === colIndex;

            return (
                <div
                key={`${rowIndex}-${colIndex}`}
                onClick={() => handleSquareClick(rowIndex, colIndex)}
                className={cn(
                    'flex h-16 w-16 cursor-pointer items-center justify-center md:h-20 md:w-20',
                    isLightSquare ? 'bg-stone-300' : 'bg-emerald-700',
                    isSelected && 'ring-4 ring-blue-500 ring-inset'
                )}
                >
                <ChessPiece piece={piece} />
                </div>
            );
            })
        )}
        </div>
    </div>
  );
}
