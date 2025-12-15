import {
  Component,
  OnInit,
  OnDestroy,
  Inject
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PLATFORM_ID } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';

type Color = 'W' | 'B';
type PieceType = 'P' | 'R' | 'N' | 'B' | 'Q' | 'K';

interface Piece {
  type: PieceType;
  color: Color;
}

interface Move {
  from: number;
  to: number;
}

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, OnDestroy {

  gameId!: number;
  currentUser!: { username: string };

  board: (Piece | null)[] = [];
  selected: number | null = null;
  possibleMoves: number[] = [];

  turn: Color = 'W';
  history: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ws: WebsocketService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }



  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const u = localStorage.getItem('user');
    if (!u) {
      this.router.navigate(['/']);
      return;
    }

    this.currentUser = JSON.parse(u);
    this.gameId = Number(this.route.snapshot.paramMap.get('id'));

    this.initBoard();


    this.ws.connectGame(
      this.gameId,
      this.currentUser.username,
      (move: Move) => {

        if (this.board[move.from]) {
          this.applyMove(move, false);
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.ws.disconnectGame();
  }



  initBoard(): void {
    this.board = [
      { type: 'R', color: 'B' }, { type: 'N', color: 'B' }, { type: 'B', color: 'B' }, { type: 'Q', color: 'B' },
      { type: 'K', color: 'B' }, { type: 'B', color: 'B' }, { type: 'N', color: 'B' }, { type: 'R', color: 'B' },
      ...Array(8).fill({ type: 'P', color: 'B' }),
      ...Array(32).fill(null),
      ...Array(8).fill({ type: 'P', color: 'W' }),
      { type: 'R', color: 'W' }, { type: 'N', color: 'W' }, { type: 'B', color: 'W' }, { type: 'Q', color: 'W' },
      { type: 'K', color: 'W' }, { type: 'B', color: 'W' }, { type: 'N', color: 'W' }, { type: 'R', color: 'W' },
    ];
  }



  selectSquare(i: number): void {
    const piece = this.board[i];

    if (this.selected === null) {
      if (!piece || piece.color !== this.turn) return;
      this.selected = i;
      this.possibleMoves = this.getMoves(i);
      return;
    }


    if (!this.possibleMoves.includes(i)) {
      this.selected = null;
      this.possibleMoves = [];
      return;
    }

    const move: Move = { from: this.selected, to: i };


    this.applyMove(move, true);


    this.ws.sendMove(this.gameId, move);

    this.selected = null;
    this.possibleMoves = [];
  }


  applyMove(move: Move, local: boolean): void {
    const piece = this.board[move.from];
    const captured = this.board[move.to];

    if (!piece) return;


    const note = this.notation(piece, move.from, move.to, !!captured);
    this.history.push(note);

    this.board[move.to] = piece;
    this.board[move.from] = null;

    this.turn = this.turn === 'W' ? 'B' : 'W';
  }


  getMoves(i: number): number[] {
    const p = this.board[i];
    if (!p) return [];

    switch (p.type) {
      case 'P': return this.pawnMoves(i, p);
      case 'R': return this.lineMoves(i, p, [-8, 8, -1, 1]);
      case 'B': return this.lineMoves(i, p, [-9, -7, 7, 9]);
      case 'Q': return this.lineMoves(i, p, [-9, -8, -7, -1, 1, 7, 8, 9]);
      case 'N': return this.knightMoves(i, p);
      case 'K': return this.kingMoves(i, p);
    }
  }

  pawnMoves(i: number, p: Piece): number[] {
    const dir = p.color === 'W' ? -8 : 8;
    const res: number[] = [];
    const f = i + dir;

    if (this.board[f] === null) res.push(f);

    for (const d of [dir - 1, dir + 1]) {
      const t = i + d;
      if (this.board[t] && this.board[t]?.color !== p.color) res.push(t);
    }
    return res.filter(x => x >= 0 && x < 64);
  }

  knightMoves(i: number, p: Piece): number[] {
    const deltas = [-17, -15, -10, -6, 6, 10, 15, 17];
    return deltas
      .map(d => i + d)
      .filter(t => t >= 0 && t < 64 && (!this.board[t] || this.board[t]?.color !== p.color));
  }

  kingMoves(i: number, p: Piece): number[] {
    const deltas = [-9, -8, -7, -1, 1, 7, 8, 9];
    return deltas
      .map(d => i + d)
      .filter(t => t >= 0 && t < 64 && (!this.board[t] || this.board[t]?.color !== p.color));
  }

  lineMoves(i: number, p: Piece, dirs: number[]): number[] {
    const res: number[] = [];
    for (const d of dirs) {
      let t = i + d;
      while (t >= 0 && t < 64) {
        if (this.board[t]) {
          if (this.board[t]?.color !== p.color) res.push(t);
          break;
        }
        res.push(t);
        t += d;
      }
    }
    return res;
  }

  /* ================= UI ================= */

  pieceSymbol(p: Piece | null): string {
    if (!p) return '';
    const map: any = {
      WP: '♙', WR: '♖', WN: '♘', WB: '♗', WQ: '♕', WK: '♔',
      BP: '♟', BR: '♜', BN: '♞', BB: '♝', BQ: '♛', BK: '♚'
    };
    return map[p.color + p.type];
  }

  dark(i: number): boolean {
    return (Math.floor(i / 8) + i) % 2 === 1;
  }

  square(i: number): string {
    return 'abcdefgh'[i % 8] + (8 - Math.floor(i / 8));
  }

  notation(p: Piece, from: number, to: number, capture: boolean): string {
    const m: any = { P: '', R: 'R', N: 'N', B: 'B', Q: 'Q', K: 'K' };
    return m[p.type] + (capture ? 'x' : '') + this.square(to);
  }
}
