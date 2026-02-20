"use client"
import { BaseNode, BaseNodeHeaderTitle } from "@/components/base-node"
import {
  NodeTooltipTrigger,
  NodeTooltip,
  NodeTooltipContent,
} from "@/components/node-tooltip"
import FlickeringGrid from "@/components/ui/flickering-grid"
import { Spinner } from "@/components/ui/spinner"
import {
  Handle,
  Position,
  ReactFlow,
  type Node,
  useNodesState,
  useEdgesState,
  Edge,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import React, { useEffect, useRef, useState } from "react"

function AnswerNode({
  data,
}: {
  data: {
    content: string
  }
}) {
  return (
    <BaseNode className="p-5 max-w-[40rem] bg-zinc-50 border-1">
      <BaseNodeHeaderTitle className="text-3xl text-center font-light">
        {data.content}
      </BaseNodeHeaderTitle>
      <Handle id="answer-out" type="source" position={Position.Bottom} />
      <Handle id="answer-in" type="target" position={Position.Top} />
    </BaseNode>
  )
}

function ToolsNode({
  data,
}: {
  data: {
    name: string
    list: any
  }
}) {
  return (
    <BaseNode className="p-8 max-w-[30rem] bg-zinc-50 border-1 flex flex-col items-center justify-center gap-3">
      {/* <div className="text-3xl font-semibold mb-3">{data.name}</div> */}
      {data.list.map((item: any, key: any) => (
        <NodeTooltip key={key} className="w-full">
          <NodeTooltipTrigger className="w-full">
            <div className="border-1 border-orange-600 rounded-md p-3 w-[15rem] hover:bg-orange-600/20 transiton-all duration-200 ease-out">
              <div className="flex items-center gap-5 rounded-md p-2">
                <img
                  src={item.logo}
                  alt="logo"
                  className="h-[4rem] w-[4rem] object-contain"
                />
                <span className="text-2xl">{item.name}</span>
              </div>
            </div>
          </NodeTooltipTrigger>
          <NodeTooltipContent>{item.purpose}</NodeTooltipContent>
        </NodeTooltip>
      ))}
      <Handle id="tools-in" type="target" position={Position.Top} />
      <Handle id="tools-out" type="source" position={Position.Bottom} />
    </BaseNode>
  )
}

const nodeTypes = {
  answer: AnswerNode,
  tools: ToolsNode,
}

const initialNodes: Node[] = [
  {
    id: "answer-1",
    position: { x: 100, y: 100 },
    data: {
      content: "The tools that I used to build and launch this project are...",
    },
    type: "answer",
  },
  {
    id: "answer-2",
    position: { x: 90, y: 1200 },
    data: {
      content:
        "I hope you enjoyed viewing it and would love to chat should a chance arise!",
    },
    type: "answer",
  },
  {
    id: "tools",
    position: { x: 250, y: 235 },
    data: {
      list: [
        {
          name: "Typescript",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
          purpose:
            "For static typing, error detection, and type-safe data fetching",
        },
        {
          name: "Next.js",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
          purpose:
            "For the convenient built-in routing architecture, and ease of designing API endpoints",
        },
        {
          name: "Tailwind",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
          purpose: "For extremely efficient styling and reusable classes",
        },
        {
          name: "Supabase",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg",
          purpose:
            "For streamlining authentication, simplifying database update/query of node positions, and image storage",
        },
        {
          name: "ReactFlow",
          logo: "https://cdn.brandfetch.io/idE1mPhz3H/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1768143416950",
          purpose:
            "For its powerful, fun, and easily extendtable node-graphing library",
        },
        {
          name: "AWS",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jupyter/jupyter-original.svg",
          purpose:
            "For full control and customization of the deployment process on an EC2 instance",
        },
        {
          name: "Bash",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg",
          purpose: "For automating some CI/CD tasks on AWS's virtual machine",
        },
      ],
    },
    type: "tools",
  },
]

const initialEdges: Edge[] = [
  { id: "a1-t1", source: "answer-1", target: "tools", type: "default" },
  { id: "t1-a2", source: "tools", target: "answer-2", type: "default" },
]

export default function madewith() {
  const [isLoading, setIsLoading] = useState(false)
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([])
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

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
          const res = await fetch("/api/nodes?page=tools")
          const body = await res.json()
          const savedNodes = body?.nodes

          if (Array.isArray(savedNodes) && savedNodes.length > 0) {
            setNodes(initialNodes)

            // setNodes(savedNodes)
            loaded = true
            break
          }

          await new Promise((r) => setTimeout(r, 200 * attempt))
        } catch (error) {
          // eslint-disable-next-line no-console
          console.warn("Attempt", attempt, "failed to load nodes:", error)
          await new Promise((r) => setTimeout(r, 200 * attempt))
        }
      }

      if (!loaded) {
        setNodes(initialNodes)
      }
      setIsLoading(false)
    }

    loadNodesFromSupabase()
  }, [])

  // Debounce node saves
  useEffect(() => {
    // console.log("nodes changes:", nodes)
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
    }

    debounceTimer.current = setTimeout(() => {
      saveNodesToSupabase(nodes)
    }, 200)

    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current)
    }
  }, [nodes])

  const saveNodesToSupabase = async (nodesToSave: Node[]) => {
    try {
      const res = await fetch("/api/nodes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nodes: nodesToSave, pageName: "tools" }),
      })

      const body = await res.json()
      if (body) {
        // saved
      }
    } catch (error) {
      // eslint-disable-next-line no-console
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
        edges={edges}
        onEdgesChange={onEdgesChange}
        // defaultViewport={{ x: 100, y: 0, zoom: 0.7 }}
        fitView
      />
    </div>
  )
}
