"use client";

import { useEffect, useRef } from "react";
import Matter from "matter-js";
import { useQuality } from "@/lib/device";

/**
 * Small physics playground in the footer — drop gold coins, drag them around.
 * Desktop / quality === "high" only.
 */
export function CoinBin() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const quality = useQuality();

  useEffect(() => {
    if (quality !== "high") return;
    const wrap = wrapRef.current;
    if (!wrap) return;

    const W = wrap.clientWidth;
    const H = 220;

    const engine = Matter.Engine.create();
    engine.gravity.y = 1.1;

    const render = Matter.Render.create({
      element: wrap,
      engine,
      options: {
        width: W,
        height: H,
        background: "transparent",
        wireframes: false,
        pixelRatio: window.devicePixelRatio,
      },
    });

    const walls = [
      // floor
      Matter.Bodies.rectangle(W / 2, H, W, 20, {
        isStatic: true,
        render: { fillStyle: "transparent" },
      }),
      // left
      Matter.Bodies.rectangle(-10, H / 2, 20, H, {
        isStatic: true,
        render: { fillStyle: "transparent" },
      }),
      // right
      Matter.Bodies.rectangle(W + 10, H / 2, 20, H, {
        isStatic: true,
        render: { fillStyle: "transparent" },
      }),
    ];
    Matter.World.add(engine.world, walls);

    const colors = ["#f2f2ef", "#d9d9d5", "#4d4d4b", "#bfbfbc"];
    const dropCoin = () => {
      const c = Matter.Bodies.circle(
        40 + Math.random() * (W - 80),
        -30,
        10 + Math.random() * 8,
        {
          restitution: 0.55,
          friction: 0.2,
          density: 0.002,
          render: {
            fillStyle: colors[Math.floor(Math.random() * colors.length)],
          },
        }
      );
      Matter.World.add(engine.world, c);
      if (engine.world.bodies.length > 40) {
        Matter.World.remove(engine.world, engine.world.bodies[3]);
      }
    };

    // drop a handful on mount
    for (let i = 0; i < 14; i++) {
      setTimeout(dropCoin, i * 90);
    }

    // drag
    const mouse = Matter.Mouse.create(render.canvas);
    const mc = Matter.MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.18,
        render: { visible: false },
      },
    });
    Matter.World.add(engine.world, mc);

    // click to drop more
    const onClick = () => dropCoin();
    wrap.addEventListener("click", onClick);

    // resize
    const onResize = () => {
      const nw = wrap.clientWidth;
      render.bounds.max.x = nw;
      render.options.width = nw;
      render.canvas.width = nw * window.devicePixelRatio;
      render.canvas.style.width = nw + "px";
      Matter.Body.setPosition(walls[2], { x: nw + 10, y: H / 2 });
    };
    window.addEventListener("resize", onResize);

    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);
    Matter.Render.run(render);

    return () => {
      wrap.removeEventListener("click", onClick);
      window.removeEventListener("resize", onResize);
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      Matter.World.clear(engine.world, false);
      Matter.Engine.clear(engine);
      render.canvas.remove();
    };
  }, [quality]);

  if (quality !== "high") return null;

  return (
    <div className="relative mt-16">
      <div className="mb-3 flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-300/80">
          // Playground
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">
          click · drag · throw
        </span>
      </div>
      <div
        ref={wrapRef}
        data-cursor="drag"
        className="relative h-[220px] w-full cursor-grab overflow-hidden rounded-xl border border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent active:cursor-grabbing"
      />
    </div>
  );
}
