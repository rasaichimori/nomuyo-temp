var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild( renderer.domElement );

raycaster = new THREE.Raycaster();
mouse = new THREE.Vector2();

document.addEventListener('mousemove', ()=>{
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

function Cup(w){
	this.mesh = new THREE.Group();
	var cupBaseG = new THREE.CylinderGeometry(w,w/1.4,7,30,1,true);
	var cupBaseT = new THREE.TextureLoader().load('cup.png');
	cupBaseT.generateMipmaps = false;
	cupBaseT.minFilter = THREE.LinearFilter;
	cupBaseT.needsUpdate = true;
	var cupBaseM = new THREE.MeshLambertMaterial( { map: cupBaseT, side: THREE.DoubleSide} );
//	var cupBaseM = new THREE.MeshBasicMaterial( { color: 0xffc964, side: THREE.DoubleSide } );
	var cupBase = new THREE.Mesh(cupBaseG,cupBaseM);
	this.mesh.add(cupBase);
	
	var rimG = new THREE.TorusGeometry(w,0.2,3,24);
	var rimM = new THREE.MeshLambertMaterial( { color: 0xffffff, side: THREE.DoubleSide } );
	var rim = new THREE.Mesh(rimG,rimM);
	rim.rotation.x = Math.PI/2;
	rim.position.y = 3.5;
	this.mesh.add(rim);
	
	var lidG = new THREE.CircleGeometry(w*1.05,24);
	var lidT = new THREE.TextureLoader().load('lid.png');
	var lidM = new THREE.MeshBasicMaterial( { map: lidT, side: THREE.FrontSide } );
	var lid = new THREE.Mesh(lidG,lidM);
	lid.rotation.x = Math.PI/2;
	lid.rotation.y = Math.PI;
	lid.position.y = 3.6;
	this.mesh.add(lid);
	
	var bottomG = new THREE.CircleGeometry(w/1.4,24);
	var bottomM = new THREE.MeshLambertMaterial( { color: 0xffffff} );
	var bottom = new THREE.Mesh(bottomG,bottomM);
	bottom.rotation.x = Math.PI/2;
	bottom.position.y = -3.1;
	this.mesh.add(bottom);
	
	  //straw
  var strawG = new THREE.CylinderGeometry(0.35,0.35,7,30,1,true);
	var strawM = new THREE.MeshPhongMaterial( { color: 0x22222, side: THREE.DoubleSide } );
	var straw = new THREE.Mesh(strawG,strawM);
	straw.rotation.z = 0.2;
	straw.position.y = 1.5;
	straw.position.x = -1;
	
	this.mesh.add(straw);
}

var cup;

const createCup = () => {
	cup = new Cup(2.2);
	cup.mesh.scale.set(1,1,1);
	scene.add(cup.mesh);
}

var ambLight = new THREE.AmbientLight(0xd1d1d1);
scene.add(ambLight);

var light = new THREE.PointLight(0xd1d1d1, 1, 5000);
light.position.set(50,-50,50);
//scene.add(light);

var light1 = new THREE.PointLight(0x707070, 0.5, 5000);
light1.position.set(-50,0,50);
scene.add(light1);


camera.position.z = 25;


function loop() {
	renderer.render( scene, camera );
	cup.mesh.rotation.x = -mouse.y;
	cup.mesh.rotation.y += 0.03;
	requestAnimationFrame(loop);
};

const main = () => {
	createCup();
	loop();
}
main();

window.addEventListener('resize', ()=>{
	renderer.setSize( window.innerWidth, window.innerHeight );
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
});

