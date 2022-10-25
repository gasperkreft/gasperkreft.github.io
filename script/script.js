
	
	let SCREEN_WIDTH = window.innerWidth;
	let SCREEN_HEIGHT = window.innerHeight;
	let aspect = SCREEN_WIDTH / SCREEN_HEIGHT;

	let scene, camera, renderer, container, particles, mesh, com;
	let mouseX = 0, mouseY = 0;
	let targetX = 0, targetY = 0;
	
	let windowHalfX = window.innerWidth / 2;
	let windowHalfY = window.innerHeight / 2;
	
	init();
	animate();
	
	function init() {
	
		container = document.createElement( 'div' );
		container.z_index = -100;
		document.body.appendChild( container );
		
		scene = new THREE.Scene();
		scene.background = new THREE.Color(0x212038);

		camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 1000);
		camera.position.x = 0;
		camera.position.y = 0;
		camera.position.z = 100;

		/*	const mesh = new THREE.Mesh(
					new THREE.SphereGeometry( 10, 16, 8 ),
					new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true } )
				);
		scene.add( mesh );*/
		
		const geometry = new THREE.BufferGeometry();
		const vertices = [];

		for ( let i = 0; i < 10000; i ++ ) {

			vertices.push( THREE.MathUtils.randFloatSpread( 1500 ) ); // x
			vertices.push( THREE.MathUtils.randFloatSpread( 1500 ) ); // y
			vertices.push( THREE.MathUtils.randFloatSpread( 1500 ) ); // z

		}

		geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
		const particles = new THREE.Points( geometry, new THREE.PointsMaterial( { color: 0x888888 } ) );
		scene.add( particles );
		
		renderer = new THREE.WebGLRenderer( { antialias: true } );
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
		container.appendChild( renderer.domElement );
		
		document.addEventListener( 'mousemove', onDocumentMouseMove );
		window.addEventListener( 'resize', onWindowResize );
		
	}
	
	function onWindowResize() {

		windowHalfX = window.innerWidth / 2;
		windowHalfY = window.innerHeight / 2;

		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		renderer.setSize( window.innerWidth, window.innerHeight );

	}
		
	function onDocumentMouseMove( event ) {

		mouseX = ( event.clientX - windowHalfX ) / 2;
		mouseY = ( event.clientY - windowHalfY ) / 2;
	}
	
	function animate() {
		requestAnimationFrame(animate);
		render();   
	}
		
	function render() {
	
		camera.rotation.x += 0.01*(mouseY*0.001-camera.rotation.x)
		camera.rotation.y += 0.01*(mouseX*0.001-camera.rotation.y)

	

		//camera.lookAt( scene.position );


		renderer.render(scene, camera );

	}
	