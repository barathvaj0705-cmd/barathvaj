import { Chessboard } from '@/components/chess/chessboard';

export default function ChessPage() {
  return (
    <div className="space-y-8 p-4 md:p-8 flex flex-col items-center">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-center">Chess</h1>
        <p className="text-muted-foreground text-center">
          A simple chessboard to play on. Click a piece, then click a destination square.
        </p>
      </div>
      <Chessboard />
    </div>
  );
}
