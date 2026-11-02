export type CompanionMode = "idle" | "laptop" | "walk" | "coffee" | "approach" | "pet";

export type CompanionTarget = { x: number; y: number; face: 1 | -1 };
export type CompanionFrame = {
  x: number;
  y: number;
  mode: CompanionMode;
  facing: 1 | -1;
  elapsed: number;
  moving: boolean;
};

// Match the supplied full-body Vini art so the shoes stay inside the viewport.
const WIDTH = 150;
const HEIGHT = 190;
const EDGE = 14;
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

/** Time based finite state controller. Coordinates are viewport pixels at the character's top left. */
export class CompanionMachine {
  private mode: CompanionMode = "idle";
  private enteredAt = 0;
  private x = 24;
  private y = 0;
  private destination: { x: number; y: number } = { x: 24, y: 0 };
  private facing: 1 | -1 = 1;
  private nextPetAt = 0;
  private cycle = 0;
  private initialized = false;

  private enter(mode: CompanionMode, now: number) {
    this.mode = mode;
    this.enteredAt = now;
  }

  get state() { return this.mode; }

  reset(viewWidth: number, viewHeight: number, now: number) {
    // Start at the quiet edge of the viewport so the companion never lands on the intro copy.
    this.x = Math.max(EDGE, viewWidth - WIDTH - EDGE);
    this.y = Math.max(EDGE, viewHeight - HEIGHT - EDGE);
    this.destination = { x: this.x, y: this.y };
    this.enter("idle", now);
    this.initialized = true;
  }

  advance(now: number, deltaSeconds: number, viewWidth: number, viewHeight: number, mervi: CompanionTarget | null): CompanionFrame {
    if (!this.initialized) this.reset(viewWidth, viewHeight, now);
    const maxX = Math.max(EDGE, viewWidth - WIDTH - EDGE);
    const maxY = Math.max(EDGE, viewHeight - HEIGHT - EDGE);
    const floorY = maxY;
    this.x = clamp(this.x, EDGE, maxX);
    this.y = clamp(this.y, EDGE, maxY);
    const elapsed = now - this.enteredAt;

    // A visible Mervi takes priority once per cooldown. The player can scroll away
    // during the visit, so the approach must also have an exit path.
    if (mervi && now >= this.nextPetAt && elapsed > 600 && this.mode !== "pet" && this.mode !== "approach") {
      this.destination = { x: clamp(mervi.x, EDGE, maxX), y: clamp(mervi.y, EDGE, maxY) };
      this.enter("approach", now);
    }

    if (this.mode === "idle" && elapsed > 1750) this.enter("laptop", now);
    else if (this.mode === "laptop" && elapsed > 4100) this.enter("coffee", now);
    else if (this.mode === "coffee" && elapsed > 2400) {
      this.cycle += 1;
      this.destination = {
        x: clamp(this.cycle % 2 ? viewWidth * 0.28 : viewWidth * 0.72, EDGE, maxX),
        y: floorY,
      };
      this.enter("walk", now);
    } else if (this.mode === "pet" && elapsed > 1900) {
      this.nextPetAt = now + 30000;
      this.destination = { x: clamp(this.x + (this.facing === -1 ? 120 : -120), EDGE, maxX), y: floorY };
      this.enter("walk", now);
    }

    if (this.mode === "approach" && !mervi) {
      this.nextPetAt = now + 6000;
      this.destination = { x: this.x, y: floorY };
      this.enter("walk", now);
    }

    let moving = false;
    if (this.mode === "walk" || this.mode === "approach") {
      if (this.mode === "approach" && mervi) {
        this.destination.x = clamp(mervi.x, EDGE, maxX);
        this.destination.y = clamp(mervi.y, EDGE, maxY);
      }
      const dx = this.destination.x - this.x;
      const dy = this.destination.y - this.y;
      const distance = Math.hypot(dx, dy);
      if (Math.abs(dx) > 3) this.facing = dx > 0 ? 1 : -1;
      if (distance < 5) {
        this.x = this.destination.x;
        this.y = this.destination.y;
        if (this.mode === "approach") {
          if (mervi) this.facing = mervi.face;
          this.enter("pet", now);
        }
        else this.enter("idle", now);
      } else {
        const speed = this.mode === "approach" ? 210 : 96;
        const step = Math.min(distance, Math.min(speed, Math.max(24, distance * 3.5)) * clamp(deltaSeconds, 0, 0.05));
        this.x += dx / distance * step;
        this.y += dy / distance * step;
        moving = true;
      }
    }

    return { x: this.x, y: this.y, mode: this.mode, facing: this.facing, elapsed: now - this.enteredAt, moving };
  }

  still(viewWidth: number, viewHeight: number): CompanionFrame {
    if (!this.initialized) this.reset(viewWidth, viewHeight, 0);
    return { x: clamp(this.x, EDGE, Math.max(EDGE, viewWidth - WIDTH - EDGE)), y: clamp(this.y, EDGE, Math.max(EDGE, viewHeight - HEIGHT - EDGE)), mode: "laptop", facing: 1, elapsed: 0, moving: false };
  }

  shiftTime(milliseconds: number) {
    this.enteredAt += milliseconds;
    this.nextPetAt += milliseconds;
  }
}
