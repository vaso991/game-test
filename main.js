import './style.css'
import kaboom from 'kaboom';
kaboom();

loadSprite("misha", "/misha.png", {
	sliceX: 30,
	// Define animations
	anims: {
		"idle": {
			from: 0,
			to: 11,
			// Frame per second
			speed: 12,
			loop: true,
		},
		"run": {
			from: 12,
			to: 29,
			speed: 20,
			loop: true,
		},
		"jump": {
			from: 20,
			to: 24,
			speed: 4,
			loop: true,
		},
	},
})

const SPEED = 200
const JUMP_FORCE = 350

gravity(640)

const player = add([
	sprite("misha"),
	pos(center()),
	origin("center"),
	area(),
	body(),
])

player.play('idle');

add([
	rect(width(), 24),
	area(),
	outline(1),
	pos(0, height() - 24),
	solid(),
])

add([
	rect(24, height()),
	area(),
	outline(1),
	pos(0, 0),
	solid(),
])

add([
	rect(24, height()),
	area(),
	outline(1),
	pos(width() - 24, 0),
	solid(),
])

onKeyPress("space", () => {
	if (player.isGrounded()) {
		player.jump(JUMP_FORCE)
		player.play("jump")
	}
})

onKeyDown("left", () => {
	player.move(-SPEED, 0)
	player.flipX(true)
	// .play() will reset to the first frame of the anim, so we want to make sure it only runs when the current animation is not "run"
	if (player.isGrounded() && player.curAnim() !== "run") {
		player.play("run")
	}
})

onKeyDown("right", () => {
	player.move(SPEED, 0)
	player.flipX(false)
	if (player.isGrounded() && player.curAnim() !== "run") {
		player.play("run")
	}
})

onKeyRelease(["left", "right"], () => {
	// Only reset to "idle" if player is not holding any of these keys
	if (player.isGrounded() && !isKeyDown("left") && !isKeyDown("right")) {
		player.play("idle")
	}
})