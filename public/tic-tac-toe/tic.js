{
    p = document.querySelector("#cont");
    msg = document.querySelector("#cont p");
    // l = document.querySelector("div.l");
    tiles = 3;
    add = tiles == 3 ? add3 : add4;
    p.style.setProperty("--tile", tiles);
    board = 0;
    sum = [0, 0, 0, 0, 0, 0, 0, 0];
    tilew = ~~(p.clientWidth / tiles);
    checks = (tiles + 1) * 2 - 1;
    for (let i = 0; i < tiles * tiles; i++) {
        d = document.createElement("div");
        d.setAttribute("class", "sq");
        p.prepend(d);
    }
    n = document.querySelectorAll(".sq");
    document.querySelector("#reset").addEventListener("click", reset);
    reset();
}
function ai2() {
    let best = -1000,
        bestmove,
        mov = 0;
    for (i = 0; i < tiles; i++) {
        for (j = 0; j < tiles; j++) {
            if (board[i][j] != 0) continue;
            mov++;
            board[i][j] = 1;
            if (check()==1) {
                cross(i, j);
                show("AI wins!");
                p.removeEventListener("click", click);
                return;
            }
            let score = minimax(-1, -1000, 1000, 8);
            board[i][j] = 0;
            console.log("tot", score, [i, j]);
            if (score > best) {
                bestmove = [i, j];
                best = score;
            }
        }
    }
    if (mov == 0) {
        show("Tie");
        return;
    }
    console.log("newk",bestmove,best);
    cross(...bestmove);
}
function ai() {
    // console.log("next");
    // if (!empty()) {
    //     // console.timeEnd("first");
    //     show("Tie!");
    //     return;
    // }
    // let best = -10,
    //     bestmove = [0, 0];
    // for (let i = 0; i < tiles; i++) {
    //     for (let j = 0; j < tiles; j++) {
    //         if (board[i][j] !== 0) continue;
    //         board[i][j] = 1;
    //         let score,
    //             c = check();
    //         if (c == 0) {
    //             score = minimax(-1, -30, 30, 1);
    //             board[i][j] = 0;
    //             if (score > best) {
    //                 best = score;
    //                 bestmove = [i, j];
    //             }
    //             console.log(score, [i, j]);
    //         } else {
    //             (i = tiles + 1), (j = tiles + 1);
    //             show("AI wins!");
    //             // l.classList += " l" + sum.indexOf(3);
    //             p.removeEventListener("click", click);
    //             return;
    //         }
    //     }
    // }
    // // console.timeEnd("first");
    // // window.setTimeout(cross,300,...bestmove);
    // //O cannot win, x is a perfect player
}
function minimax(p, alpha, beta, d) {
    let win = check(),mov=0;
    if (win !== 0) return win;
    if (d==0)return 0;
    let best = p * -1000;
    for (let i = 0; i < tiles; i++) {
        for (let j = 0; j < tiles; j++) {
            if (board[i][j] !== 0) continue;
            mov+=1;
            board[i][j] = p;
            let score = minimax(-1 * p, alpha, beta, d - 1);
            if (d>7) console.log(score, [i, j]);
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
    for (let i = 0; i <= checks; i++) {
        if (Math.abs(sum[i]) == tiles) return sum[i] / tiles;
    }
    return 0;
}
function add3(row, i) {
    sum[3] += row[i];
    sum[4] += row[2 - i];
    for (let k = 0; k <= 2; k++) {
        sum[i] += row[k];
        sum[5 + k] += row[k];
    }
    /*sum 0-2 column
    sum 3 left to right diagonal
    sum 4 right to left diagonal
    sum 5-7 row*/
    /*sum 0-2 column
    sum 3-5 row
    sum 6 left to right diagonal
    sum 7 right to left diagonal*/
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
function cross(x, y) {
    // console.log(x, y);
    board[x][y] = 1;
    n[y * tiles + x].classList.add("cr");
}
function click(e) {
    let x = ~~(e.target.offsetLeft / tilew),
        y = ~~(e.target.offsetTop / tilew);
    console.log(x, y);
    if (board[x][y] != 0) return;
    board[x][y] = -1;
    e.target.classList.add("cl");
    // console.time("first");
    ai2();
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
function play(x, y, p) {
    board[x][y] = p;
    n[y * tiles + x].classList.add(p == 1 ? "cr" : "cl");
}
function del(x, y) {
    n[y * tiles + x].classList.remove("cl", "cr");
    board[x][y] = 0;
}
