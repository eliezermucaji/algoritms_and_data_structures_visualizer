// Botão start
const startBtn = document.getElementById('control-button-play');

// Aqui onde acontece toda magia do algoritmo de Dijkstra
const graph = {};

// A variavel matrix faz de conta ser
const matrix = Array.from(document.getElementsByClassName('path-cell'));

// Array que vai guardar os grafos visitados
const visited = [];


const createGraph = ()=>{
    if(matrix.length === 0){ return;}

    // Pra que array seja one based index
    visited.push(true);

    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    let position = 1;
    for(let i = 1; i <= rows; ++i) {
        for(let j = 1; j <= columns; ++j) {
            const elementId = `path-cell-${i}-${j}`;
            const cell = document.getElementById(elementId);
            if(cell.classList.contains('rock')) continue;
            // Achar os vertices alcánsaveis desta celula
            for(let k = 0; k < directions.length; ++k){
                const direction = directions[k];
                const neighborX = i + direction[0];
                const neighborY = j + direction[1];
                if(neighborX > rows || neighborY > columns) continue;
                if(neighborX < 1 || neighborY < 1) continue;
                
                const neighborId = `path-cell-${neighborX}-${neighborY}`;
                const myNeighbor = document.getElementById(neighborId);
                //if(!myNeighbor) continue;
                // Verificar se o meu visinho é uma rocha, caso for não se lhe adiciono como vertice visinha
                // console.log(elementId);
                if(myNeighbor.classList.contains('rock')) continue;

                // Adiciono este meu visinho como sendo alcansável para mim
                const meOnGraph = `${i}-${j}`;
                const neighborOnGraph = `${neighborX}-${neighborY}`;

                if(!Object.hasOwn(graph, meOnGraph)) {
                    graph[meOnGraph] = {

                    };
                }
                if(!Object.hasOwn(graph[meOnGraph], 'neighbors')) {
                    graph[meOnGraph]['neighbors'] = [];
                    graph[meOnGraph]['myPos'] = -1;
                }
                
                graph[meOnGraph]['neighbors'].push(neighborOnGraph);
            }
            visited.push(false);
            if(Object.hasOwn(graph, `${i}-${j}`)) {
                graph[`${i}-${j}`]['myPos'] = position;
            }
            position++;
        }

    }
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
    console.log(distances);

}

const clearMemory =()=>{

};

const run =()=>{
    createGraph();
    dijkstra();
    clearMemory();
}

startBtn.addEventListener('click', run);