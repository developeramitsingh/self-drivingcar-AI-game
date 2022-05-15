class Car {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.sensors = new Sensors(this);
        this.controls = new Controls()

        this.speed = 0;
        this.acceleration = 0.2;
        this.maxSpeed = 3;
        this.friction = 0.05;

        this.angle = 0;
    }

    draw(ctx){
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(-this.angle);
        ctx.beginPath();
        ctx.rect(-this.width/2, -this.height/2, this.width, this.height);
        ctx.fill();
        ctx.restore();

        this.sensors.draw(ctx);
    }

    update(roadBorders) {
        this.#move();
        this.sensors.update(roadBorders);
    }

    #move() {
        if(this.controls.forward) {
            this.speed += this.acceleration;
        }

        if(this.controls.reverse) {
            this.speed -= this.acceleration;
        }

        //assigning max speed forward
        if (this.speed > this.maxSpeed) {
            this.speed = this.maxSpeed;
        }

        //asigning max speed reverse
        if(this.speed < -this.maxSpeed /2 ) {
            this.speed = -this.maxSpeed / 2;
        }
        
        //forward mode adding friction
        if (this.speed > 0) {
            this.speed -= this.friction;
        }

        //reverse mode adding friction
        if (this.speed < 0) {
            this.speed += this.friction;
        }

        if(Math.abs(this.speed) < this.friction) {
            this.speed = 0;
        }

        if (this.speed != 0) {
            const flip = this.speed > 0 ? 1 : -1;
            if (this.controls.left) {
                this.angle += 0.02 * flip;
            }
    
            if(this.controls.right) {
                this.angle -= 0.02 * flip;
            }
        }
        
        this.x -= Math.sin(this.angle) * this.speed;
        this.y -= Math.cos(this.angle) * this.speed;
    }
}