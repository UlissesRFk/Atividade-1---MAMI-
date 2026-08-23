const aInicial = -10;
let tInicial = 0;
let img;
let tela = 1;
let velocidadeH;
let velocidadeV;
let dAtualMRUV;
let dAtualMRU;
let d;
let mensagem = "";
let MensagemHorizontal;
let MensagemVertical;
let botaoEnviar;
let botaoSair;

async function setup() {
  createCanvas(600, 600);
  background(255);
  frameRate(12);

  img = await loadImage("imagem.png");

  MensagemHorizontal = createInput('');
  MensagemHorizontal.position(200, 230);

  MensagemVertical = createInput('');
  MensagemVertical.position(200, 330);


  botaoEnviar = createButton('Enviar');
  botaoEnviar.position(270, 400);
  botaoEnviar.mousePressed(enviar);

  botaoSair = createButton('X');
  botaoSair.position(550, 30);
  botaoSair.mousePressed(voltar);
  botaoSair.hide();
  
}

function draw() {

  if (tela == 1){
    background(255);
    fill(0);
    textSize(20);
    mensagem = "";
    text("Adicione o valor entre 20 e 70 da velocidade vertical", 50, 320);
    text("Adicione o valor entre 20 e 70 da velocidade horizontal", 50, 220);
  }
  if (tela == 2) {
    background(img);
    
    dAtualMRUV = MRUV(velocidadeV, aInicial, tInicial);
    dAtualMRU = MRUV(velocidadeH, 0, tInicial);

    fill(255);
    ellipse(dAtualMRU, height - dAtualMRUV, 20, 20);

    fill(0);
    textSize(18);
    text("Velocidade horizontal: " + velocidadeH, 20, 30);
    text("Velocidade vertical: " + velocidadeV, 20, 55);

    textSize(22);
    text(mensagem, 20, 100);

     
    tInicial++;
  }
}


function MRUV(v, a, t) {
  d = v * t + a * pow(t, 2) / 2;
  return d;
}


function enviar() {
  velocidadeH = Number(MensagemHorizontal.value());
  velocidadeV = Number(MensagemVertical.value());

  if (velocidadeH >= 20 && velocidadeV >= 20 && velocidadeH <= 70 && velocidadeV <= 70) {
    if (velocidadeH == velocidadeV) {
      mensagem = "Alcance máximo horizontal atingido!"; 
    }

    tela = 2;
    botaoSair.show();
    MensagemHorizontal.hide();
    MensagemVertical.hide();
    botaoEnviar.hide();

  } 
}

function voltar(){
  tela = 1;
  tInicial = 0;
  botaoSair.hide();
  MensagemHorizontal.show();
  MensagemVertical.show();
  botaoEnviar.show();
  

  MensagemHorizontal.value('');
  MensagemVertical.value('');
  
}