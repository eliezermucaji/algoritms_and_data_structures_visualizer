// Esta é o arquivo que vais apresentar dados na tela
const arena = document.getElementById('main-container');
const dijkstraArena = document.createElement('div');
dijkstraArena.className = 'dijkstra-arena';

let selectedButton = '';

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
                cell.classList.toggle(selectedButton);
            });
            cellFieldContainer.appendChild(cell);
        }
    }
    dijkstraArena.appendChild(cellFieldContainer);
}

const drawControls = ()=>{
    const controlsPannel = document.createElement('div');
    
    controlsPannel.classList = 'control-panel-dijkstra';
    controlsPannel.id = 'control-panel-dijkstra';

    const location = createControlButton('location', 'Pontos');
    const rock = createControlButton('rock', 'Rochas');
    const start = createControlButton('play', 'Jogar');

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

    start.addEventListener('click', ()=>{
        const selectedButtons = document.getElementsByClassName('selected');
        Array.from(selectedButtons).forEach(lastSelectedButton=>{
            if(lastSelectedButton.id !== start.id)
            lastSelectedButton.classList.remove('selected');
        });
        start.classList.toggle('selected');
        if(start.classList.contains('selected')) {
            selectedButton = '';
        }else {
            selectedButton = '';
        }
    });

    controlsPannel.appendChild(location);
    controlsPannel.appendChild(rock);
    controlsPannel.appendChild(start);

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
