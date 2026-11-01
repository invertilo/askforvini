"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface MerviProps {
  className?: string;
  size?: number;
  interactive?: boolean;
}

export function Mervi({ className, size = 96, interactive = true }: MerviProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const animationRef = useRef<{
    catX: number;
    catY: number;
    targetX: number;
    targetY: number;
    walkDirection: number;
    walkFrame: number;
    time: number;
    tailAngle: number;
  }>({
    catX: 50,
    catY: 50,
    targetX: 50,
    targetY: 50,
    walkDirection: 1,
    walkFrame: 0,
    time: 0,
    tailAngle: 0,
  });

  const canvasSize = size * 2;

  // Draw 8-bit cat frame
  const drawCat = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    frame: number,
    direction: number,
    tailAngle: number
  ) => {
    ctx.save();
    ctx.translate(x, y);

    if (direction === -1) {
      ctx.scale(-1, 1);
    }

    const pixelSize = size / 16;

    // Body (black tuxedo)
    ctx.fillStyle = "#1a1a1a";
    ctx.fillRect(2 * pixelSize, 6 * pixelSize, 12 * pixelSize, 8 * pixelSize);

    // Head
    ctx.fillRect(3 * pixelSize, 2 * pixelSize, 10 * pixelSize, 6 * pixelSize);

    // Ears
    ctx.fillRect(4 * pixelSize, 1 * pixelSize, 2 * pixelSize, 2 * pixelSize);
    ctx.fillRect(10 * pixelSize, 1 * pixelSize, 2 * pixelSize, 2 * pixelSize);

    // Eyes (amber)
    ctx.fillStyle = "#ffb84d";
    ctx.fillRect(5 * pixelSize, 3 * pixelSize, 1.5 * pixelSize, 1.5 * pixelSize);
    ctx.fillRect(9.5 * pixelSize, 3 * pixelSize, 1.5 * pixelSize, 1.5 * pixelSize);

    // White face markings (tuxedo pattern)
    ctx.fillStyle = "#f3ede2";
    ctx.fillRect(3 * pixelSize, 4 * pixelSize, 10 * pixelSize, 3 * pixelSize);

    // Hoodie (dark with gold trim)
    ctx.fillStyle = "#2a2a2a";
    ctx.fillRect(2 * pixelSize, 5 * pixelSize, 12 * pixelSize, 4 * pixelSize);

    // Gold accent on hoodie
    ctx.fillStyle = "#c4a36a";
    ctx.fillRect(2 * pixelSize, 5 * pixelSize, 12 * pixelSize, 0.5 * pixelSize);

    // Front paws
    ctx.fillStyle = "#1a1a1a";
    ctx.fillRect(4 * pixelSize, 12 * pixelSize, 2 * pixelSize, 3 * pixelSize);
    ctx.fillRect(10 * pixelSize, 12 * pixelSize, 2 * pixelSize, 3 * pixelSize);

    // Animated tail (sways)
    ctx.strokeStyle = "#1a1a1a";
    ctx.lineWidth = pixelSize;
    ctx.beginPath();
    ctx.moveTo(12 * pixelSize, 10 * pixelSize);
    const tailCurve = Math.sin(tailAngle) * 2 * pixelSize;
    ctx.quadraticCurveTo(
      14 * pixelSize + tailCurve,
      12 * pixelSize,
      14 * pixelSize + tailCurve,
      14 * pixelSize
    );
    ctx.stroke();

    // Walking animation (leg movement)
    if (frame > 0) {
      const legOffset = Math.sin((frame / 20) * Math.PI) * pixelSize;
      ctx.fillStyle = "#1a1a1a";
      ctx.fillRect(5 * pixelSize, 13 * pixelSize + legOffset, 1.5 * pixelSize, 2 * pixelSize);
      ctx.fillRect(9.5 * pixelSize, 13 * pixelSize - legOffset, 1.5 * pixelSize, 2 * pixelSize);
    }

    ctx.restore();
  };

  useEffect(() => {
    if (!interactive) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [interactive]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const anim = animationRef.current;
    let rafId: number;

    const animate = () => {
      anim.time += 1 / 60; // 60 FPS

      // Update target position based on mouse
      if (interactive) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = mousePos.x - rect.left;
        const mouseY = mousePos.y - rect.top;

        // Cat chases mouse with smooth easing
        const dx = mouseX - anim.targetX;
        const dy = mouseY - anim.targetY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 20) {
          anim.targetX += dx * 0.02;
          anim.targetY += dy * 0.02;

          // Determine direction
          anim.walkDirection = dx > 0 ? 1 : -1;
        }
      } else {
        // Random walk behavior
        if (Math.random() < 0.01) {
          anim.targetX = Math.random() * canvasSize;
          anim.targetY = Math.random() * (canvasSize * 0.7);
          anim.walkDirection = Math.random() > 0.5 ? 1 : -1;
        }
      }

      // Smooth cat movement
      anim.catX += (anim.targetX - anim.catX) * 0.1;
      anim.catY += (anim.targetY - anim.catY) * 0.1;

      // Update walking animation
      anim.walkFrame = (anim.walkFrame + 1) % 40;

      // Tail sway animation
      anim.tailAngle = Math.sin(anim.time * 2) * Math.PI;

      // Clear canvas
      ctx.fillStyle = "transparent";
      ctx.clearRect(0, 0, canvasSize, canvasSize);

      // Draw cat
      drawCat(ctx, anim.catX, anim.catY, anim.walkFrame, anim.walkDirection, anim.tailAngle);

      rafId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(rafId);
  }, [canvasSize, interactive, mousePos]);

  return (
    <div className={cn("inline-block", className)}>
      <canvas
        ref={canvasRef}
        width={canvasSize}
        height={canvasSize}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          imageRendering: "pixelated",
          display: "block",
        }}
      />
    </div>
  );
}
