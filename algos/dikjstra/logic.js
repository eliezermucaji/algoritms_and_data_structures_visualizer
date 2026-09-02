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

const distances = [];
distances.push(0);

const INF = 1e9+7;

const dijkstra = ()=>{
    // Colocar um dos verteces de partida no princípio do object
    distances[1] = 0;
    visited[1] = true;
    for (let index = 0; index < visited.length-1; index++) {
        distances.push(INF);
    }

    for(const key in graph) {

        const vertex = graph[key];
        if(visited[vertex['myPos']] && vertex['myPos'] !== 1) {
            console.log('Já visitado');
            continue;
        }
        const a = vertex['myPos'];
        const b = key;
        visited[a] = true;

        graph[key]['neighbors'].forEach(element => {
            if(1+distances[a] < distances[graph[element]['myPos']]) {
                distances[graph[element]['myPos']] = 1+distances[a];
            }
        });
    }
    //console.log(distances);

}

const dfs = (inicio)=>{
    if(visited[inicio]) return;
    visited[inicio] = true;
    if(!Object.hasOwn(graph, inicio)) return;
    graph[inicio].forEach(node=>{
        dfs(node);
    })
}

const clearMemory =()=>{

};

const createVisited=()=>{
    visited = {};
    for(const key in graph) {
        if(!Object.hasOwn(visited, key)) {
            visited[key] = false;
        }
    }
}

const run =()=>{
    createGraph();
    createVisited();
    dfs('1-1');
    if(visited['5-5']) {
        console.log('Alcansável')
    } else {
        console.log('Não alcansável')
    }
    //dijkstra();
    //clearMemory();
}

startBtn.addEventListener('click', run);