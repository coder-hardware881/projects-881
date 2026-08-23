{
    p = document.querySelector("#cont");
    msg = document.querySelector("#cont p");
    // l = document.querySelector("div.l");
    tiles = 3;
    add = tiles == 3 ? add3 : add4;
    p.style.setProperty("--tile", tiles);
    board = 0;
    sum = [];
    tilew = ~~(p.clientWidth / tiles);
    checks = (tiles + 1) * 2;
    for (let i = 0; i < tiles * tiles; i++) {
        d = document.createElement("div");
        d.setAttribute("class", "sq");
        p.prepend(d);
    }
    n = document.querySelectorAll(".sq");
    document.querySelector("#reset").addEventListener("click", reset);
    reset();
}
function ai() {
    let best = -10,
        bestmove = [0, 0],
        mov=0;
    for (let i = 0; i < tiles; i++) {
        for (let j = 0; j < tiles; j++) {
            if (board[i][j] !== 0) continue;
            mov++
            board[i][j] = 1;
            if (check() == 1) {
                circle(i, j);
                show("AI wins!");
                p.removeEventListener("click", click);
                return;
            }
            let score= minimax(-1, -30, 30, 8);
                board[i][j] = 0;
            if (score > best) {
                best = score;
                bestmove = [i, j];
            }
        }
    }
    if (mov == 0) {
        p.removeEventListener("click", click);
        show("Tie");
        return;
    }
    window.setTimeout(circle,300,...bestmove);
    //O cannot win, x is a perfect player
}
function minimax(p, alpha, beta, d) {
    let win = check(),mov=0;
    if (win !== 0) return win;
    if (d==0)return 0;
    let best = p * -30;
    for (let i = 0; i < tiles; i++) {
        for (let j = 0; j < tiles; j++) {
            if (board[i][j] !== 0) continue;
            mov++;
            board[i][j] = p;
            let score = minimax(-1 * p, alpha, beta, d - 1);
            board[i][j] = 0;
            if (p == 1) {
                best = Math.max(score, best);
                alpha = Math.max(alpha, score);
            } else {
                best = Math.min(score, best);
                beta = Math.min(beta, score);
            }
            if (beta <= alpha) {
                return best;
            }
        }
    }
    return (mov==0)?0:best;
}
function empty() {
    return board.some((x) => {
        return x.some((i) => {
            return i == 0;
        });
    });
}
function check() {
    sum = Array.from(Array(checks), () => 0);
    board.forEach(add);
    for (let i = 0; i < checks; i++) {
        if (Math.abs(sum[i]) == tiles) return sum[i] / tiles;
    }
    return 0;
}
function add3(row, i) {
    sum[3] += row[i];
    sum[4] += row[2 - i];
    for (let k = 0; k <3; k++) {
        sum[i] += row[k];
        sum[5 + k] += row[k];
    }
    /*sum 0-2 column
    sum 3 left to right diagonal
    sum 4 right to left diagonal
    sum 5-7 row*/
}
function add4(row, i) {
    sum[8] += row[i];
    sum[9] += row[3 - i];
    for (let k = 0; k < 4; k++) {
        sum[i] += row[k];
        sum[4 + k] += row[k];
    }
    /*sum 0-3 column
    sum 4-7 row
    sum 8 left to right diagonal
    sum 9 right to left diagonal
    */
}
function circle(x, y) {
    board[x][y] = 1;
    n[y * tiles + x].classList.add("cl");
}
function click(e) {
    let x = ~~(e.target.offsetLeft / tilew),
        y = ~~(e.target.offsetTop / tilew);
    if (board[x][y] !== 0) return;
    board[x][y] = -1;
    e.target.classList.add("cr");
    ai();
}
function reset() {
    board = Array.from(Array(tiles), () => new Array(tiles).fill(0));
    n.forEach((e) => e.classList.remove("cr", "cl"));
    msg.style.display = "none";
    // l.classList = "l";
    p.addEventListener("click", click);
}
function show(text) {
    msg.innerText = text;
    msg.style.display = "block";
}