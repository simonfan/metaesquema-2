const Matter = require('matter-js')

/**
 * Matter submodules
 */
const Engine = Matter.Engine
const Render = Matter.Render
const Runner = Matter.Runner
const Body = Matter.Body
const Bodies = Matter.Bodies
const World = Matter.World
const Mouse = Matter.Mouse
const MouseConstraint = Matter.MouseConstraint
const Events = Matter.Events
const Common = Matter.Common

const MatterSound = require('./lib/matter-sound')
const MatterCollisionStyles = require('./lib/matter-collision-styles')
const AUDIOS = require('./audios')

function randomAudio() {
	return AUDIOS[Math.floor(Math.random()*AUDIOS.length)].name
}

function setup(options) {
  const CANVAS_WIDTH = options.canvasWidth
  const CANVAS_HEIGHT = options.canvasHeight
  let canvas = options.canvas

  if (!canvas) {
    throw new Error('canvas is required')
  }
  
  if (!CANVAS_WIDTH) {
    throw new Error('CANVAS_WIDTH is required')
  }
  
  if (!CANVAS_HEIGHT) {
    throw new Error('CANVAS_HEIGHT is required')
  }

  if (options.plugins) {
  	options.plugins.forEach(plugin => {
  		Matter.use(plugin)
  	})
  }

  // create engine
  let engine = Engine.create({
  	// enable sleeping as we are collision heavy users
  	// enableSleeping: true
  })

  engine.world.gravity.x = 0
  engine.world.gravity.y = 0

  // create renderer
  let render = Render.create({
  	canvas: canvas,
  	engine: engine,
  	options: {
  		wireframes: false,
      // showAngleIndicator: true,
  		background: '#1BA158',
  		pixelRatio: 2,

  		width: CANVAS_WIDTH,
  		height: CANVAS_HEIGHT,
  	}
  })

  // create runner
  let runner = Runner.create()

  Runner.run(runner, engine)
  Render.run(render)

  let walls = [
  	// ceiling
		Bodies.rectangle(
	    CANVAS_WIDTH / 2, // align center to center
	    -(60 / 2),         
	    CANVAS_WIDTH, // width
	    60,  // height
	    {
	      isStatic: true,
	      restitution: 1,
	    }
	  ),
	  // ground
		Bodies.rectangle(
	    CANVAS_WIDTH / 2, // align center to center
	    CANVAS_HEIGHT + (60 / 2),         
	    CANVAS_WIDTH, // width
	    60,  // height
	    {
	      isStatic: true,
	      restitution: 1,
        friction: 0,
        frictionStatic: 0,
	    }
	  ),
    
	  // left
		Bodies.rectangle(
	    -(60 / 2), // align center to center
	    CANVAS_HEIGHT / 2,         
	    60, // width
	    CANVAS_HEIGHT,  // height
	    {
	      isStatic: true,
	      restitution: 1,
	    }
	  ),
	  // right
		Bodies.rectangle(
	    CANVAS_WIDTH + (60 / 2), // align center to center
	    CANVAS_HEIGHT / 2,         
	    60, // width
	    CANVAS_HEIGHT,  // height
	    {
	      isStatic: true,
	      restitution: 1,
	    }
	  ),
	]

  World.add(engine.world, walls)

  /**
   * Rotating elements
   * @type {[type]}
   */
  let rotatingRectangles = [
    Bodies.rectangle(
      CANVAS_WIDTH / 3,
      CANVAS_HEIGHT / 2,         
      CANVAS_HEIGHT / 3,
      40,
      {
        isStatic: true,
        restitution: 1,
        plugin: {
          sound: {
            audio: 'barra-01',
          }
        },
        render: {
          fillStyle: '#F66D63',
        },
      }
    ),
    Bodies.rectangle(
      CANVAS_WIDTH * 2/3,
      CANVAS_HEIGHT / 2,         
      CANVAS_HEIGHT / 3,
      40,
      {
        isStatic: true,
        restitution: 1,
        plugin: {
          sound: {
            audio: 'barra-02',
          }
        },
        render: {
          fillStyle: '#E2B33D',
        },
      }
    )
  ]
  World.add(engine.world, rotatingRectangles)

  // add rotation
  Events.on(engine, 'beforeUpdate', (event) => {
    Body.rotate(rotatingRectangles[0], 0.06)
    Body.rotate(rotatingRectangles[1], 0.03)
  })

  /**
   * Sensors
   * @type {[type]}
   */
  let sensors = [
    Bodies.rectangle(100, 400, 10, 10, {
      isSensor: true,
      isStatic: false,
      render: {
        fillStyle: 'transparent',
        lineWidth: 1,
        strokeStyle: '#FFFFFF'
      },
    }),
    Bodies.rectangle(100, 400, 10, 10, {
      isSensor: true,
      isStatic: false,
      render: {
        fillStyle: 'transparent',
        lineWidth: 1,
        strokeStyle: '#FFFFFF'
      },
    }),
    Bodies.rectangle(100, 400, 10, 10, {
      isSensor: true,
      isStatic: false,
      render: {
        fillStyle: 'transparent',
        lineWidth: 1,
        strokeStyle: '#FFFFFF'
      },
    }),
    Bodies.rectangle(100, 400, 10, 10, {
      isSensor: true,
      isStatic: false,
      render: {
        fillStyle: 'transparent',
        lineWidth: 1,
        strokeStyle: '#FFFFFF'
      },
    }),
    Bodies.rectangle(100, 400, 10, 10, {
      isSensor: true,
      isStatic: false,
      render: {
        strokeStyle: '#FFFFFF',
        fillStyle: 'transparent',
        lineWidth: 1,
      },
    }),
    Bodies.rectangle(100, 400, 10, 10, {
      isSensor: true,
      isStatic: false,
      render: {
        strokeStyle: '#FFFFFF',
        fillStyle: 'transparent',
        lineWidth: 1,
      },
    }),
  ]
  World.add(engine.world, sensors)

  let soundBodies = [
    Bodies.circle(200, 250, 20, {
      restitution: 0.8,
      friction: 0,
      frictionAir: 0,
      frictionStatic: 0,
      slop: 0,
      density: 0.0001,
      inertia: Infinity,
      plugin: {
        sound: { audio: 'bola-01' },
      }
    }),
    Bodies.circle(400, 250, 20, {
      restitution: 0.8,
      friction: 0,
      frictionAir: 0,
      frictionStatic: 0,
      slop: 0,
      density: 0.0001,
      inertia: Infinity,
      plugin: {
        sound: { audio: 'bola-02' },
      }
    }),
    Bodies.circle(600, 250, 20, {
      restitution: 0.8,
      friction: 0,
      frictionAir: 0,
      frictionStatic: 0,
      slop: 0,
      density: 0.0001,
      inertia: Infinity,
      plugin: {
        sound: { audio: 'bola-02B' },
      }
    }),
    Bodies.circle(600, 250, 20, {
      restitution: 0.8,
      friction: 0,
      frictionAir: 0,
      frictionStatic: 0,
      slop: 0,
      density: 0.0001,
      inertia: Infinity,
      plugin: {
        sound: { audio: 'bola-03' },
      }
    }),

  ]

  World.add(engine.world, soundBodies)


  // add mouse control
  let mouse = Mouse.create(render.canvas)
  let mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      // allow bodies on mouse to rotate
      angularStiffness: 0,
      render: {
        visible: false
      }
    }
  })

  World.add(engine.world, mouseConstraint);

  // keep the mouse in sync with rendering
  render.mouse = mouse;

  return {
  	engine: engine,
  	stop: () => {
	    Matter.Render.stop(render)
	    Matter.Runner.stop(runner)
  	}
  }
}


/**
 * Instantiate MatterSound plugin
 */
let matterSound = new MatterSound({
	audios: AUDIOS,
})

matterSound.ready.then(() => {
	let config = {
	  canvasWidth: window.innerWidth,
	  canvasHeight: window.innerHeight,
	  canvas: document.querySelector('canvas'),
	  plugins: [
	  	matterSound,
	  	new MatterCollisionStyles()
	  ]
	}

	let app = setup(config)
})
.catch(err => {
  console.warn(err)
})