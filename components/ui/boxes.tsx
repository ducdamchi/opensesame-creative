"use client"

import { motion } from "framer-motion"
import React, { useMemo } from "react"

export interface BoxesProps {
  className?: string
  rows?: number
  cols?: number
}

const colors = [
  "rgba(245, 172, 140)",
  "rgba(237, 143, 102)",
  "rgba(225, 92, 41)",
  "rgba(202, 83, 37)",
  "rgba(180, 74, 33)",
  "rgba(158, 65, 29)",
  "rgba(135, 56, 25)",
  "rgba(112, 46, 20)",
  "rgba(90, 37, 16)",
  // "#e15c29", // sky-300
  // "#37160a", // pink-300
  // "#8c391a", // green-300
  // "#ffffff", // yellow-300
  // "#4d4d4d", // red-300
  // "#fcefea", // purple-300
  // "#f9ded4", // blue-300
  // "#e6e6e6", // indigo-300
  // "#cccccc", // violet-300
]

const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)]

const BoxCell = React.memo(({ showPlus }: { showPlus: boolean }) => (
  <motion.div
    className="relative h-8 w-16 border-r border-t border-zinc-200"
    whileHover={{
      backgroundColor: getRandomColor(),
      transition: { duration: 0 },
    }}
    transition={{ duration: 2 }}>
    {/* {showPlus && (
      <svg
        className="pointer-events-none absolute -left-[22px] -top-[14px] h-6 w-10 text-slate-700"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M12 6v12m6-6H6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )} */}
  </motion.div>
))

BoxCell.displayName = "BoxCell"

const BoxRow = React.memo(
  ({ rowIndex, cols }: { rowIndex: number; cols: number }) => (
    <div className="relative h-8 w-16 border-l border-stone-700">
      {Array.from({ length: cols }).map((_, colIndex) => (
        <BoxCell
          key={colIndex}
          showPlus={rowIndex % 2 === 0 && colIndex % 2 === 0}
        />
      ))}
    </div>
  ),
)

BoxRow.displayName = "BoxRow"

export const Boxes = ({ className, rows = 150, cols = 100 }: BoxesProps) => {
  const rowElements = useMemo(
    () =>
      Array.from({ length: rows }).map((_, rowIndex) => (
        <BoxRow key={rowIndex} rowIndex={rowIndex} cols={cols} />
      )),
    [rows, cols],
  )

  return (
    <div
      className={["pointer-events-auto absolute inset-0 z-0 flex", className]
        .filter(Boolean)
        .join(" ")}
      style={{
        transform:
          "translate(-50%, -50%) skewX(-48deg) skewY(14deg) scale(0.675)",
        transformOrigin: "center center",
        top: "50%",
        left: "50%",
        width: "300vw",
        height: "300vh",
      }}>
      {rowElements}
    </div>
  )
}

export default function BackgroundBoxesDemo() {
  return (
    <div className="fixed inset-0 overflow-hidden bg-slate-900">
      <Boxes />
      <div className="pointer-events-none absolute inset-0 z-20 bg-slate-900 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
    </div>
  )
}
