//SELECT CVS
var cvs = document.getElementById('mycanvas');
var ctx = cvs.getContext('2d');

//GAME VARS AND CONSTS
let frame = 0;
const DEGREE = Math.PI/180;


//LOAD SOUNDS
const SCORE_S = new Audio();
SCORE_S.src = "./audio/sfx_point.wav";

const FLAP = new Audio();
FLAP.src = "./audio/sfx_flap.wav";

const HIT = new Audio();
HIT.src = "./audio/sfx_hit.wav";

const SWOOSHING = new Audio();
SWOOSHING.src = "./audio/sfx_swooshing.wav";

const DIE = new Audio();
DIE.src = "./audio/sfx_die.wav";

//RANK POINTS
const SCORE_MEDAL_NORMAL = 10;
const SCORE_MEDAL_BRONZE = 20;
const SCORE_MEDAL_SILVER = 30;
const SCORE_MEDAL_GOLD = 40;