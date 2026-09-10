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
let identifier;

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

    
    let inicio = 0;
    identifier = setInterval(()=>{
        const path = caminho[inicio];
        if(inicio >= timeBetween) {
            clearInterval(identifier);
        }
        console.log(path);
        console.log(inicio);
        const cell = document.getElementById(`path-cell-${path}`);
        if(cell) {
            if(!cell.classList.contains('path')) cell.classList.add('path');
        }
        inicio++;
    }, 150);

    /*caminho.forEach(path=>{
        const cell = document.getElementById(`path-cell-${path}`);
        if(cell) {
            if(!cell.classList.contains('path')) cell.classList.add('path');
        }
        
    })*/
}

const run =()=>{
    clearInterval(identifier);
    limparCaminho();
    createGraph();
    createVisited();
    //dfs('1-1');
    if(Object.hasOwn(graph, origem)) {
        bfs(origem);
    }
    if(Object.hasOwn(graph, destino) && visited[destino]) {
        pintarCaminho(rebuildPath(destino));
    } else {
        console.log('Não alcansável')
    }
}

startBtn.addEventListener('click', run);