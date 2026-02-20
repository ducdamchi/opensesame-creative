"use client"

import { Position, ReactFlow, useNodesState, type Node } from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import {
  BaseNode,
  BaseNodeContent,
  BaseNodeHeader,
  BaseNodeHeaderTitle,
} from "@/components/base-node"
import { Button } from "@/components/ui/button"
import { Clock2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import FlickeringGrid from "@/components/ui/flickering-grid"
import { Spinner } from "@/components/ui/spinner"

// Custom node component with tooltip
function CustomNode({
  data,
}: {
  data: {
    title: string
    content: string
    header: string
    url: string
    time: string
    button: string
    img: string
  }
}) {
  const router = useRouter()
  return (
    // <NodeTooltip>
    //   <NodeTooltipContent position={Position.Top}>
    //     Hidden Content
    //   </NodeTooltipContent>
    <BaseNode className="p-5 max-w-[40rem]">
      <div className="border-b-1 text-lg pb-3 flex justify-between">
        <BaseNodeHeader className="font-extrabold m-0 p-0">
          {data.header}
        </BaseNodeHeader>
        {data.time && (
          <div className="flex items-center justify-center gap-2">
            <Clock2 size={18} />
            <span className="">{data.time}</span>
          </div>
        )}
      </div>
      <BaseNodeHeaderTitle className="font-black text-2xl pt-3">
        {data.title}
      </BaseNodeHeaderTitle>
      {data.img && (
        <div className="p-5 w-full">
          <img
            src={data.img}
            className="aspect-3/2 object-cover rounded-md w-full"
          />
        </div>
      )}
      <BaseNodeContent>
        {data.content}
        {/* <NodeTooltipTrigger>Hover</NodeTooltipTrigger> */}
      </BaseNodeContent>
      <Button
        className="w-full mt-3 bg-orange-500 hover:bg-orange-500/70"
        onClick={() => {
          if (data.url === "/") {
            window.location.reload()
          } else {
            router.push(data.url)
          }
        }}>
        {data.button}
      </Button>
    </BaseNode>
    // </NodeTooltip>
  )
}

const nodeTypes = {
  custom: CustomNode,
}

const initialNodes: Node[] = [
  {
    id: "1",
    position: { x: 200, y: 65 },
    data: {
      header: "Question 1",
      time: "3 min",
      title:
        "How do you see OpenSesame fitting into your career journey or long-term goals?",
      content:
        "In this section, you'll learn about some of my aspirations, which have motivated both my past and present works.",
      url: "/question-1",
      button: "View",
      img: "https://ghiinqdxtvecsscabqyl.supabase.co/storage/v1/object/sign/opensesame-media/q1.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9kMzY0ZThjZC1hOTRjLTQwODktOGI0Ni04MGE2Yzg5MTY4MTciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJvcGVuc2VzYW1lLW1lZGlhL3ExLmpwZWciLCJpYXQiOjE3NzE2MDkwNTYsImV4cCI6MTgwMzE0NTA1Nn0.pVQsa8T_8z9LOl0Ko8yggr8s0tOMvOZ6_NPKGX-lVXQ",
    },
    type: "custom",
  },
  {
    id: "2",
    position: { x: 900, y: 300 },
    data: {
      header: "Question 2",
      time: "3 min",
      title:
        "What strengths, skills, or perspectives will you bring to OpenSesame to make an impact and contribute to our mission?",
      content:
        "In this section, you'll get to view some of my strengths, skills, as well as past experiences that defined my perspectives, which I am eager to bring to OpenSesame!",
      url: "/question-2",
      button: "View",
      img: "https://ghiinqdxtvecsscabqyl.supabase.co/storage/v1/object/sign/opensesame-media/q2.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9kMzY0ZThjZC1hOTRjLTQwODktOGI0Ni04MGE2Yzg5MTY4MTciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJvcGVuc2VzYW1lLW1lZGlhL3EyLmpwZWciLCJpYXQiOjE3NzE2MDkxMTYsImV4cCI6MTgwMzE0NTExNn0.y8XrXV19NIb6gve9_GIRmexqup_iMjErkxKcjxPeyJE",
    },
    type: "custom",
  },
  {
    id: "3",
    position: { x: 120, y: 880 },
    data: {
      header: "Question 3",
      time: "2 min",
      title:
        "What excites you most about working with AI, and how do you think it can shape the future of learning and work?",
      content:
        "In this section, you'll hear my opinions on the potentials of AI, and how it can shape the broader culture of work and learning.",
      url: "question-3",
      button: "View",
      img: "https://ghiinqdxtvecsscabqyl.supabase.co/storage/v1/object/sign/opensesame-media/q3.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9kMzY0ZThjZC1hOTRjLTQwODktOGI0Ni04MGE2Yzg5MTY4MTciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJvcGVuc2VzYW1lLW1lZGlhL3EzLmpwZWciLCJpYXQiOjE3NzE2MDkxMzksImV4cCI6MTgwMzE0NTEzOX0.W_P3hTgn8jKgr7MMjg1WAoGo5CRQbDyBxA8VsbEQVbY",
    },
    type: "custom",
  },
  {
    id: "4",
    position: { x: 900, y: 1200 },
    data: {
      header: "Move me around!",
      // time: "Try it out!",
      title: "Fun Fact",
      content:
        "You can move any of these boxes around, and their positionings will survive page refresh! This is because their metadata are updated in realtime (every 200ms after you move something) and stored in a PostgreSQL database.",
      url: "/",
      button: "Refresh",
    },
    type: "custom",
  },
]

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  // const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)

  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([])
  const debounceTimer = useRef<NodeJS.Timeout | null>(null)

  // Fetch saved nodes from Supabase on mount
  useEffect(() => {
    const loadNodesFromSupabase = async () => {
      const maxAttempts = 3
      let attempt = 0
      let loaded = false

      while (attempt < maxAttempts && !loaded) {
        attempt += 1
        try {
          const res = await fetch("/api/nodes?page=home")
          const body = await res.json()
          const savedNodes = body?.nodes

          // If API returned nodes array, use it. Otherwise retry.
          if (Array.isArray(savedNodes) && savedNodes.length > 0) {
            // setNodes(savedNodes)
            setNodes(initialNodes)

            loaded = true
            break
          }

          // If body explicitly contains `nodes` but it's empty, don't bail out early —
          // retry, because a transient auth/session issue can cause `nodes: null`.
          // We'll only fall back to `initialNodes` after all attempts fail.

          // Otherwise, retry after a short delay
          await new Promise((r) => setTimeout(r, 200 * attempt))
        } catch (error) {
          // network/parse error — retry
          // eslint-disable-next-line no-console
          console.warn("Attempt", attempt, "failed to load nodes:", error)
          await new Promise((r) => setTimeout(r, 200 * attempt))
        }
      }

      if (!loaded) {
        // final fallback
        setNodes(initialNodes)
      }
      setIsLoading(false)
    }

    loadNodesFromSupabase()
  }, []) // Runs only on mount

  // Detect position changes and save with debounce
  useEffect(() => {
    // Clear previous timer
    // console.log("nodes changed:", nodes)
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
    }

    // Set new timer — save after 1 second of inactivity
    debounceTimer.current = setTimeout(() => {
      saveNodesToSupabase(nodes)
      // console.log("nodes:", nodes)
    }, 200)

    // Cleanup on unmount
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current)
    }
  }, [nodes]) // Runs every time nodes change

  const saveNodesToSupabase = async (nodesToSave: Node[]) => {
    try {
      const res = await fetch("/api/nodes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nodes: nodesToSave,
          pageName: "home",
        }),
      })

      const { success } = await res.json()
      if (success) {
        console.log("Nodes saved to Supabase")
      }
    } catch (error) {
      console.error("Error saving nodes:", error)
    }
  }

  return (
    <div className="h-screen w-screen relative overflow-hidden bg-zinc-50 font-sans">
      <FlickeringGrid className="z-0 absolute" />
      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-zinc-200/70" />
          <div className="relative z-10 flex flex-col items-center gap-4">
            <Spinner className="h-12 w-12 text-black" />
            <div className="text-black">Loading…</div>
          </div>
        </div>
      )}
      <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        defaultViewport={{ x: 0, y: 0, zoom: 0.6 }}
        // fitView
      />
    </div>
  )
}
