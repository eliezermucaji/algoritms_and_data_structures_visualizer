// Botão start
const startBtn = document.getElementById('control-button-play');

// Aqui onde acontece toda magia do algoritmo de Dijkstra
let graph = {};

// A variavel matrix faz de conta ser
const matrix = Array.from(document.getElementsByClassName('path-cell'));

// Array que vai guardar os grafos visitados
let visited = {};


const createGraph = ()=>{
    graph = {};
    if(matrix.length === 0){ return;}
    const stepsAround = [[-1, 0], [0, 1], [1, 0], [0, -1]];
    for(let i = 1; i <= rows; ++i) {
        for(let j = 1; j <= columns; ++j) {
            const cellId = `path-cell-${i}-${j}`;
            const cellHtml = document.getElementById(cellId);
            const meOnGraph = `${i}-${j}`;
            for(let k = 0; k < stepsAround.length; ++k){
                const step = stepsAround[k];
                const x = i + step[0] ;
                const y = j + step[1];
                const point = `${x}-${y}`;
                if(x > rows || y > columns || x < 1 || y < 1) continue;
                if(!Object.hasOwn(graph, meOnGraph)) {
                    graph[meOnGraph] = [];
                }
                if(document.getElementById(`path-cell-${point}`).classList.contains('rock')) continue;
                graph[meOnGraph].push(point);        
            
            }
        }
    }
    //console.log(graph);
}

let distances = {};
const INF = 1e9+7;

const dfs = (inicio)=>{
    if(visited[inicio]) return;
    visited[inicio] = true;
    if(!Object.hasOwn(graph, inicio)) return;
    graph[inicio].forEach(node=>{
        dfs(node);
    })
}

const startDistances = ()=>{
    distances = {};
    for(const key in graph) {
        distances[key] = INF;
    }
}

const parentOf = {};

const initPaths= ()=>{
    for(const key in graph) {
        parentOf[key] = [];
    }
}

const bfs = (inicio)=>{
    startDistances();
    initPaths();
    if(!Object.hasOwn(graph, inicio)) return;
    distances[inicio] = 0;
    visited[inicio] = true;
    const queue = [];
    queue.push(inicio);
    while(queue.length != 0) {
        const element = queue.shift();
        const sizeNeighbors = graph[element].length;

        for(let i = 0; i < sizeNeighbors; ++i) {
            if(visited[graph[element][i]]) continue;
            visited[graph[element][i]] = true;
            distances[graph[element][i]] = distances[element] + 1;
            parentOf[graph[element][i]] = element;
            queue.push(graph[element][i]);
        }
    }
}

const rebuildPath = (destino)=>{
    let dest = destino;
    const path = [];
    while(parentOf[dest] != dest) {
        path.push(dest);
        dest = parentOf[dest];
    }

    return path;
}

const createVisited=()=>{
    visited = {};
    for(const key in graph) {
        if(!Object.hasOwn(visited, key)) {
            visited[key] = false;
        }
    }
}

const pintarCaminho =(caminho)=>{
    let timeBetween = caminho.length;
    caminho.forEach(path=>{
        const cell = document.getElementById(`path-cell-${path}`);
        if(cell) {
            if(!cell.classList.contains('path')) cell.classList.add('path');
        }
        
    })
}

const run =()=>{
    createGraph();
    createVisited();
    //dfs('1-1');
    bfs('1-1');
    if(visited['5-5']) {
        pintarCaminho(rebuildPath('5-5'));
    } else {
        console.log('Não alcansável')
    }
    //dijkstra();
    //clearMemory();
    // para teste: const caminho = ['1-1', '1-2', '1-3', '2-3', '2-4', '2-5', '2-5', '2-6', '2-7', '3-7', '3-8', '4-8', '5-8', '6-8', '6-9','6-10', '6-11', '7-11', '8-11', '9-11', '10-11', '10-10', '10-9'];
    
}

startBtn.addEventListener('click', run);