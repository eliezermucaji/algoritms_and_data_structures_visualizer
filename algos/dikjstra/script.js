// Esta é o arquivo que vais apresentar dados na tela
const arena = document.getElementById('main-container');
const dijkstraArena = document.createElement('div');
dijkstraArena.className = 'dijkstra-arena';

let selectedButton = '';
const destines = [false, false];
let origem = '';
let destino = '';

const rows = 10;
const columns = 20;
let gridDivision = '';
for(let i = 1; i <= columns; ++i) {
    gridDivision += ' 1fr ';
}

const createPathCell = (i, j)=> {
    const cell = document.createElement('div');
    cell.className = 'path-cell';
    cell.id = `path-cell-${i}-${j}`

    return cell;
}

const drawCellsField = ()=> {

    const cellFieldContainer = document.createElement('div');
    cellFieldContainer.className = 'cell-field-container';
    cellFieldContainer.id = 'cell-field-container';
    cellFieldContainer.style['gridTemplateColumns'] = gridDivision;
    for(let i = 1; i <= rows; ++i) {
        for(let j = 1; j <= columns; ++j) {
            const cell = createPathCell(i, j);
            cell.addEventListener('click', ()=>{
                if(selectedButton === 'destine') {
                    cell.classList.toggle(selectedButton);
                    if(!destines[0]) {
                        origem = `${i}-${j}`;
                        destines[0] = true;
                    }else if(!destines[1]) {
                        destino = `${i}-${j}`;
                        destines[1] = true;
                    }
                }else {
                    cell.classList.toggle(selectedButton);
                }
            });
            cellFieldContainer.appendChild(cell);
        }
    }
    dijkstraArena.appendChild(cellFieldContainer);
}

const limparArena =()=>{
    for(let i = 1; i <= rows; i++) {
        for(let j = 1; j <= columns; j++) {
            const cell = document.getElementById(`path-cell-${i}-${j}`);
            cell.className = 'path-cell';
        }
    }
    origem = '';
    destino = '';
    destines[0] = false;
    destines [1] = false;
}

const limparCaminho =()=>{
    const paths = document.getElementsByClassName('path');
    const pathAsArray = Array.from(paths);
    pathAsArray.forEach(path=>{
        path.classList.remove('path');
    });
}

const drawControls = ()=>{
    const controlsPannel = document.createElement('div');
    
    controlsPannel.classList = 'control-panel-dijkstra';
    controlsPannel.id = 'control-panel-dijkstra';

    const location = createControlButton('location', 'Pontos');
    const rock = createControlButton('rock', 'Rochas');
    const start = createControlButton('play', 'Jogar');
    const clearPath = createControlButton('clean', 'Limpar Caminho');
    const clearField = createControlButton('clean', 'Limpar Arena');

    location.addEventListener('click', ()=>{
        const selectedButtons = document.getElementsByClassName('selected');
        Array.from(selectedButtons).forEach(lastSelectedButton=>{
            if(lastSelectedButton.id !== location.id)
            lastSelectedButton.classList.remove('selected');
        });
        location.classList.toggle('selected');
        if(location.classList.contains('selected')) {
            selectedButton = 'destine';
        }else {
            selectedButton = '';
        }
    });

    rock.addEventListener('click', ()=>{
        const selectedButtons = document.getElementsByClassName('selected');
        
        Array.from(selectedButtons).forEach(lastSelectedButton=>{
            if(lastSelectedButton.id !== rock.id)
            lastSelectedButton.classList.remove('selected');
        });
        rock.classList.toggle('selected');
        if(rock.classList.contains('selected')) {
            selectedButton = 'rock';
        }else {
            selectedButton = '';
        }
    });

    clearField.classList.add('clickble');
    clearPath.classList.add('clickble');
    start.classList.add('clickble');
    clearField.addEventListener('click', limparArena);
    clearPath.addEventListener('click', limparCaminho);

    controlsPannel.appendChild(location);
    controlsPannel.appendChild(rock);
    controlsPannel.appendChild(start);
    controlsPannel.appendChild(clearPath);
    controlsPannel.appendChild(clearField);

    dijkstraArena.appendChild(controlsPannel);
}

const createControlButton =(buttonType, text)=>{
    const button = document.createElement('button');
    button.classList = 'control-button';
    button.id = `control-button-${buttonType}`
    button.innerText = text;

    return button;
}

const drawMyArena_Dijkstra = ()=>{
    
    //Desenhar as celulas do campo
    drawCellsField();
    
    //Desenhar botões
    drawControls();

    // Adicionar campo de dijkstra na arena da aplicação
    arena.appendChild(dijkstraArena);
}

drawMyArena_Dijkstra();
