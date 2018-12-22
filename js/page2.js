/**
 * Created by 49843 on 2018/12/22.
 */

var page2 = {
	speed: 7,
	direction: 1,
	currentIndex: 0,
	isPause: false,
	scene: new THREE.Scene(),
	camera: new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100000),
	webGLRenderer: new THREE.WebGLRenderer({alpha: true}),
	imgLists: [
		[
			'./img/1.jpg',
			'./img/car.png',
			'./img/nei-2.png',
			'./img/nei-3.png',
			'./img/nei-1.png'
		],
		[
			'./img/bg1.jpg',
			'./img/27T.png',
			'./img/shizu.png',
			'./img/futa.png',
			'./img/dayumi.png'
		],
		[
			'./img/bg1.jpg',
			'./img/27T.png',
			'./img/shizu.png',
			'./img/futa.png',
			'./img/dayumi.png'
		],
		[
			'./img/bg1.jpg',
			'./img/nei-3.png'
		]

	],
	dataLists: [
		[
			{name: 'bg', w: 2400, h: 2574, x: 0, y: 0, z: 0},
			{name: 'car', w: 595, h: 290, x: 0, y: 0, z: 100},
			{name: 'peo1', w: 204 * 0.8, h: 669 * 0.8, x: -280, y: -100, z: 550},
			{name: 'peo2', w: 217 * 0.7, h: 1002 * 0.7, x: 300, y: -180, z: 800},
			{name: 'peo3', w: 348 * 0.6, h: 1219 * 0.6, x: -100, y: -200, z: 1300}
		],
		[
			{name: 'bg', w: 2400, h: 2574, x: 0, y: 0, z: 0},
			{name: '27T', w: 150 * 0.6, h: 800 * 0.6, x: -280, y: -200, z: 200},
			{name: 'shizu', w: 348 * 0.6, h: 619 * 0.6, x: 280, y: -200, z: 200},
			{name: 'futa', w: 150 * 0.6, h: 800 * 0.6, x: -280, y: -200, z: 800},
			{name: 'dayumi', w: 150 * 0.6, h: 619 * 0.6, x: 280, y: -200, z: 800}
		],
		[
			{name: 'bg', w: 2400, h: 2574, x: 0, y: 0, z: 0},
			{name: 'peo1', w: 100 * 0.6, h: 800 * 0.6, x: -280, y: -200, z: 200},
			{name: 'peo2', w: 348 * 0.6, h: 619 * 0.6, x: 280, y: -200, z: 400}
		],
		[
			{name: 'bg', w: 2400, h: 2574, x: 0, y: 0, z: 0},
			{name: 'peo3', w: 348 * 0.6, h: 1219 * 0.6, x: 150, y: -200, z: 1300}
		]

	],
	init: function () {
		this.isPause = false;
		this.currentIndex = 0;
		this.webGLRenderer.clear();
		this.webGLRenderer.setClearColor(0x000000, 0.5);
		this.webGLRenderer.setSize(window.innerWidth, window.innerHeight);
		this.webGLRenderer.shadowMap.enabled = true;
	},
	drawScene: function (img, w, h, x, y, z) {
		var mapTexture = new THREE.TextureLoader().load(img);
		var sceneGeometry = new THREE.PlaneGeometry(w, h);
		var planeMaterial = new THREE.MeshBasicMaterial({
			transparent: true,
			map: mapTexture
		});
		var plane = new THREE.Mesh(sceneGeometry, planeMaterial);
		plane.position.x = x;
		plane.position.y = y;
		plane.position.z = z;

		this.scene.add(plane);
	},
	reDraw: function (imgList, dataList) {
		for (var i = 0; i < dataList.length; i++) {
			this.drawScene(imgList[i], dataList[i].w, dataList[i].h, dataList[i].x, dataList[i].y, dataList[i].z);
		}

		this.camera.position.x = 0;
		this.camera.position.y = 0;
		this.camera.position.z = 3000;
		this.camera.lookAt(this.scene.position);

	},

	render: function () {
		if (this.isPause) {
			this.scene.children.length = 0;
			if(this.currentIndex < 4){
				this.reDraw(this.imgLists[this.currentIndex], this.dataLists[this.currentIndex]);
				this.webGLRenderer.clear();
				this.webGLRenderer.render(this.scene, this.camera);
				this.isPause = false;
			}
			return;
		}

		this.camera.position.z -= this.speed * this.direction;


		if (this.camera.position.z < 499) {
			this.camera.position.z = 500;
			this.isPause = true;
			this.currentIndex++;
			if(this.currentIndex==4){
				alert('下滑进入下一个')
			}
		}

		if (this.camera.position.z > 3000) {
			this.camera.position.z = 3000;
			this.isPause = true;

		}

		this.webGLRenderer.clear();
		this.webGLRenderer.render(this.scene, this.camera);
	},

	appendEl: function () {
		document.getElementById('page3').appendChild(this.webGLRenderer.domElement);
	}


};

function animate2() {
	animateId = requestAnimationFrame(animate2);
	page2.render();
}
