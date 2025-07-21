"use client";

import React, { useRef, useEffect, useCallback } from "react";
import { useMousePosition } from "../util/mouse";

interface ParticlesProps {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
  refresh?: boolean;
}

type Circle = {
  x: number;
  y: number;
  translateX: number;
  translateY: number;
  size: number;
  alpha: number;
  targetAlpha: number;
  dx: number;
  dy: number;
  magnetism: number;
};

export default function Particles({
  className = "",
  quantity = 30,
  staticity = 50,
  ease = 60,
  refresh = false,
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const circlesRef = useRef<Circle[]>([]);
  const mousePosition = useMousePosition();
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const canvasSizeRef = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;

  const remapValue = useCallback(
    (
      value: number,
      start1: number,
      end1: number,
      start2: number,
      end2: number,
    ): number => {
      const remapped =
        ((value - start1) * (end2 - start2)) / (end1 - start1) + start2;
      return remapped > 0 ? remapped : 0;
    },
    [],
  );

  const createCircle = useCallback((): Circle => {
    const { w, h } = canvasSizeRef.current;
    const x = Math.floor(Math.random() * w);
    const y = Math.floor(Math.random() * h);
    const size = Math.floor(Math.random() * 2) + 0.4;
    const alpha = 0;
    const targetAlpha = parseFloat(
      (Math.random() * 0.6 + 0.1).toFixed(1),
    );
    const dx = (Math.random() - 0.5) * 0.3;
    const dy = (Math.random() - 0.5) * 0.3;
    const magnetism = 0.1 + Math.random() * 4;

    return {
      x,
      y,
      translateX: 0,
      translateY: 0,
      size,
      alpha,
      targetAlpha,
      dx,
      dy,
      magnetism,
    };
  }, []);

  const clearCanvas = useCallback(() => {
    if (contextRef.current) {
      const { w, h } = canvasSizeRef.current;
      contextRef.current.clearRect(0, 0, w, h);
    }
  }, []);

  const resizeCanvas = useCallback(() => {
    if (
      containerRef.current &&
      canvasRef.current &&
      contextRef.current
    ) {
      const container = containerRef.current;
      const canvas = canvasRef.current;
      const context = contextRef.current;

      const w = container.offsetWidth;
      const h = container.offsetHeight;
      canvasSizeRef.current = { w, h };

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      circlesRef.current = []; // Clear existing particles
      for (let i = 0; i < quantity; i++) {
        circlesRef.current.push(createCircle());
      }
    }
  }, [dpr]);

  const drawCircle = useCallback(
    (circle: Circle, update = false) => {
      if (!contextRef.current) return;
      const context = contextRef.current;
      const { x, y, translateX, translateY, size, alpha } = circle;

      context.translate(translateX, translateY);
      context.beginPath();
      context.arc(x, y, size, 0, 2 * Math.PI);
      context.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      context.fill();
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (!update) {
        circlesRef.current.push(circle);
      }
    },
    [],
  );

  const drawInitialParticles = useCallback(() => {
    clearCanvas();
    for (let i = 0; i < quantity; i++) {
      const circle = createCircle();
      drawCircle(circle);
    }
  }, [clearCanvas, createCircle, drawCircle, quantity]);

  const initializeCanvas = useCallback(() => {
    resizeCanvas();
    drawInitialParticles();
  }, [resizeCanvas, drawInitialParticles]);

  const updateMousePosition = useCallback(() => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const { w, h } = canvasSizeRef.current;
    const x = mousePosition.x - rect.left - w / 2;
    const y = mousePosition.y - rect.top - h / 2;
    const inside =
      x < w / 2 &&
      x > -w / 2 &&
      y < h / 2 &&
      y > -h / 2;

    if (inside) {
      mouseRef.current.x = x;
      mouseRef.current.y = y;
    }
  }, [mousePosition]);

  const startAnimation = useCallback(() => {
    const animate = () => {
      clearCanvas();
      const { w, h } = canvasSizeRef.current;

      circlesRef.current.forEach((circle, i) => {
        const edges = [
          circle.x + circle.translateX - circle.size,
          w - circle.x - circle.translateX - circle.size,
          circle.y + circle.translateY - circle.size,
          h - circle.y - circle.translateY - circle.size,
        ];

        const closestEdge = Math.min(...edges);
        const remappedEdge = parseFloat(
          remapValue(closestEdge, 0, 20, 0, 1).toFixed(2),
        );

        if (remappedEdge > 1) {
          circle.alpha += 0.02;
          if (circle.alpha > circle.targetAlpha) {
            circle.alpha = circle.targetAlpha;
          }
        } else {
          circle.alpha = circle.targetAlpha * remappedEdge;
        }

        circle.x += circle.dx;
        circle.y += circle.dy;
        circle.translateX +=
          (mouseRef.current.x /
            (staticity / circle.magnetism) -
            circle.translateX) /
          ease;
        circle.translateY +=
          (mouseRef.current.y /
            (staticity / circle.magnetism) -
            circle.translateY) /
          ease;

        if (
          circle.x < -circle.size ||
          circle.x > w + circle.size ||
          circle.y < -circle.size ||
          circle.y > h + circle.size
        ) {
          circlesRef.current.splice(i, 1);
          const newCircle = createCircle();
          drawCircle(newCircle);
        } else {
          drawCircle(
            {
              ...circle,
              alpha: circle.alpha,
              translateX: circle.translateX,
              translateY: circle.translateY,
            },
            true,
          );
        }
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, [
    clearCanvas,
    remapValue,
    createCircle,
    drawCircle,
    staticity,
    ease,
  ]);

  useEffect(() => {
    if (canvasRef.current) {
      contextRef.current = canvasRef.current.getContext("2d");
    }
    initializeCanvas();
    startAnimation();

    window.addEventListener("resize", initializeCanvas);
    return () => {
      window.removeEventListener("resize", initializeCanvas);
    };
  }, [initializeCanvas, startAnimation]);

  useEffect(() => {
    updateMousePosition();
  }, [updateMousePosition]);

  useEffect(() => {
    initializeCanvas();
  }, [initializeCanvas, refresh]);

  return (
    <div
      className={className}
      ref={containerRef}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} />
    </div>
  );
}
