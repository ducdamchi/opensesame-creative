"use client"

import { Position, ReactFlow, useNodesState, type Node } from "@xyflow/react"
import { Boxes } from "@/components/ui/boxes"
import "@xyflow/react/dist/style.css"
import {
  BaseNode,
  BaseNodeContent,
  BaseNodeHeader,
  BaseNodeHeaderTitle,
} from "@/components/base-node"
import {
  NodeTooltip,
  NodeTooltipContent,
  NodeTooltipTrigger,
} from "@/components/node-tooltip"
import { Button } from "@/components/ui/button"
import { Clock2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

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
    position: { x: 100, y: 100 },
    data: {
      header: "Question 1",
      time: "4 min",
      title:
        "How do you see OpenSesame fitting into your career journey or long-term goals?",
      content:
        "In this section, you'll learn about the work I did in the past, what I'm up to in the present, as well as my aspirations for the future!",
      url: "/question-1",
      button: "View",
      img: "/q1.jpeg",
    },
    type: "custom",
  },
  {
    id: "2",
    position: { x: 600, y: 450 },
    data: {
      header: "Question 2",
      time: "2 min",
      title:
        "What strengths, skills, or perspectives will you bring to OpenSesame to make an impact and contribute to our mission?",
      content:
        "In this section, you'll learn about the work I did in the past, what I'm up to in the present, as well as my aspirations for the future!",
      url: "/question-2",
      button: "View",
      img: "/q2.jpeg",
    },
    type: "custom",
  },
  {
    id: "3",
    position: { x: 100, y: 850 },
    data: {
      header: "Question 3",
      time: "1 min",
      title:
        "What excites you most about working with AI, and how do you think it can shape the future of learning and work?",
      content:
        "In this section, you'll learn about the work I did in the past, what I'm up to in the present, as well as my aspirations for the future!",
      url: "/question-3",
      button: "View",
      img: "/q3.jpeg",
    },
    type: "custom",
  },
  {
    id: "4",
    position: { x: 100, y: 850 },
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
      try {
        const res = await fetch("/api/nodes?page=home")
        const { nodes: savedNodes } = await res.json()

        console.log("Fetched nodes from Supabase:", savedNodes) // ← Add this

        if (savedNodes && savedNodes.length > 0) {
          // Use saved positions from Supabase
          setNodes(savedNodes)
          // setNodes(initialNodes)
        } else {
          // No saved nodes, use defaults
          setNodes(initialNodes)
        }
      } catch (error) {
        console.error("Error loading nodes:", error)
        // Fallback to default nodes on error
      } finally {
        setIsLoading(false)
      }
    }

    loadNodesFromSupabase()
  }, []) // Runs only on mount

  // Detect position changes and save with debounce
  useEffect(() => {
    // Clear previous timer
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
