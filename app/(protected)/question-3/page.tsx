"use client"

import {
  ReactFlow,
  useNodesState,
  type Node,
  Position,
  Handle,
  useEdgesState,
  Edge,
  addEdge,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import {
  BaseNode,
  BaseNodeContent,
  BaseNodeHeader,
  BaseNodeHeaderTitle,
} from "@/components/base-node"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  NodeTooltip,
  NodeTooltipTrigger,
  NodeTooltipContent,
} from "@/components/node-tooltip"
import FlickeringGrid from "@/components/ui/flickering-grid"
import { Spinner } from "@/components/ui/spinner"

function StoryNode({
  data,
}: {
  data: {
    title: string
    content: any
    header: string
  }
}) {
  const router = useRouter()
  return (
    <BaseNode className="p-5 max-w-[40rem] bg-zinc-50 border-1">
      <div className="text-xl pb-3 flex justify-between">
        <BaseNodeHeader className="font-extrabold m-0 p-0">
          {data.header}
        </BaseNodeHeader>
      </div>
      <BaseNodeHeaderTitle className="font-black text-2xl pt-3">
        {data.title}
      </BaseNodeHeaderTitle>
      {data.content &&
        data.content.map((content: any) => (
          <div key={content.id}>
            <BaseNodeContent className="border-1 border-black rounded-lg hover:bg-black hover:text-white m-4 transition-all ease-out duration-200 text-2xl p-5">
              {content.text}
            </BaseNodeContent>
          </div>
        ))}

      <Handle id="story-in" type="target" position={Position.Top} />
      <Handle id="story-out" type="source" position={Position.Right} />
    </BaseNode>
  )
}

// function SubStoryNode({
//   data,
// }: {
//   data: { content: string; img: string; caption: string; href: string }
// }) {
//   return (
//     <NodeTooltip>
//       <BaseNode className="p-5 max-w-[30rem] bg-zinc-50 border-orange-500 hover:bg-orange-300 transition-all ease-out duration-200">
//         <NodeTooltipTrigger>
//           <BaseNodeHeaderTitle className="font-light text-2xl p-5 flex flex-col gap-2">
//             <div>{data.content}</div>
//             <a
//               href={data.href}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="underline text-blue-800 cursor-pointer">
//               View More
//             </a>
//           </BaseNodeHeaderTitle>
//         </NodeTooltipTrigger>
//         <NodeTooltipContent className="bg-orange-300">
//           <div className="flex flex-col items-start gap-3">
//             <img src={data.img} className="max-w-[25rem] rounded-lg"></img>
//             {data.caption && (
//               <div className="w-[25rem] text-black text-xs p-2">
//                 {data.caption}
//               </div>
//             )}
//           </div>
//         </NodeTooltipContent>
//         <Handle id="substory-in" type="target" position={Position.Left} />
//       </BaseNode>
//     </NodeTooltip>
//   )
// }

function QuestionNode({
  data,
}: {
  data: {
    content: string
  }
}) {
  return (
    <BaseNode className="p-5 max-w-[40rem] bg-zinc-50 border-1">
      <BaseNodeHeaderTitle className="font-black text-3xl text-center">
        {data.content}
      </BaseNodeHeaderTitle>
      <Handle id="question-out" type="source" position={Position.Bottom} />
    </BaseNode>
  )
}

// function AnswerNode({
//   data,
// }: {
//   data: {
//     content: string
//   }
// }) {
//   return (
//     <BaseNode className="p-5 max-w-[40rem] bg-zinc-50 border-1">
//       <BaseNodeHeaderTitle className="text-3xl text-center font-light">
//         {data.content}
//       </BaseNodeHeaderTitle>
//       <Handle id="answer-in" type="target" position={Position.Top} />
//       <Handle id="answer-out" type="source" position={Position.Bottom} />
//     </BaseNode>
//   )
// }

// function ConnectionNode({
//   data,
// }: {
//   data: {
//     content: string
//     targets?: string[]
//     onToggle?: (id: string, visible: boolean) => void
//   }
// }) {
//   const [clicked, setClicked] = useState(false)

//   function handleClick() {
//     const next = !clicked
//     setClicked(next)
//     // reveal/hide all targets
//     data.targets?.forEach((t) => data.onToggle?.(t, next))
//   }

//   return (
//     <BaseNode className="p-5 max-w-[40rem] bg-zinc-50 border-1 flex gap-2 items-center justify-center border-0">
//       <Button className="text-2xl" onClick={handleClick}>
//         <span>{data.content}</span>
//       </Button>
//       <Handle type="target" position={Position.Left} />
//       <Handle type="source" position={Position.Right} />
//     </BaseNode>
//   )
// }

const nodeTypes = {
  story: StoryNode,
  // substory: SubStoryNode,
  question: QuestionNode,
  // answer: AnswerNode,
  // connection: ConnectionNode,
}

const initialNodes: Node[] = [
  {
    id: "question-1",
    position: { x: 100, y: 100 },
    data: {
      content:
        "What excites you most about working with AI, and how do you think it can shape the future of learning and work?",
    },
    type: "question",
  },

  {
    id: "story-1",
    position: { x: -300, y: 500 },
    data: {
      header: "What excites me the most about working with AI is…",
      title:
        "How it removes low-level concerns and allows us the freedom of abstract thinking when solving problems",
      content: [
        {
          id: "1",
          text: "A documentary shot in multiple languages, can now be transcribed to a single language in minutes. A personalized recommendation system, which previously required bulky machine learning frameworks, can now be made to a user by channeling their preferences to an AI agent. A long text can come alive with a voice, for those who cannot afford to hire a narrator.",
        },
        {
          id: "2",
          text: "These are real examples that I have personally encountered when working on both creative and technical projects. When I think of the heavy lifting that could be done by AI, I imagine that creators and developers can now shift their attention to what matters most: making authentic decisions, and maintaining a birds eye view on the direction of a project. Adopting this new mindset has profoundly changed the pace and quality of work that I create.",
        },
        {
          id: "3",
          text: "While AI’s expanding capabilities can be a double-edged sword that stirs up fear of replacement among many, I believe it’s also a chance to reflect on the potentials that were, just years ago, beyond our reach. With AI’s constantly expanding capabilities, I think it is more fruitful to frame the question as: “What can we now shift our attention to?” instead of “Are we getting replaced?”. ",
        },
        {
          id: "4",
          text: "The mechanical ‘how’ of most work sectors may get automated, but the ‘why’ and ‘what’s next’ are things that will always need human attention, which opens up an entire area of high-level work that requires rigorous knowledge standards, extensive collaboration, and ethical decision-making. If I’m empowered to focus on important architectural decisions even in small personal projects, I cannot help but feel excited about the prospects of innovation that AI can bring to the workforce.",
        },
      ],
    },
    type: "story",
  },
  {
    id: "story-2",
    position: { x: 600, y: 500 },
    data: {
      header: "In the future, I envision that AI will enable…",
      title:
        "Workspaces to focus on the exchange of creative ideas and joint decision-making, and educational spaces to personalize learning journeys according to the needs of each individual",
      content: [
        {
          id: "1",
          text: "When the routine housekeeping tasks can be offloaded, I imagine that teams can dedicate much more of their time on exchanging ideas, outlining concrete priorities, and making sharp decisions based on a wealth of AI-driven analysis and context-building. Moreover, as AI can provide personal assistance to each worker, the hierarchical divide between ‘junior’ and ‘senior’ levels can be blurred in a way that promotes organic interaction between teammates, putting emphasis on the timely delivery of final products, rather than on a chain of command.",
        },
        {
          id: "2",
          text: "When it comes to learning, the shift to AI can also unlock our understanding of each learner’s needs, while giving instructors clear insight into where students are struggling, and tapping into their strongest suites. For the learner, this will generate a constant source of motivation that helps them grow. For the instructor, this means creating captivating curriculum and connecting to their students with intentionality.",
        },
        {
          id: "3",
          text: "At OpenSesame, I see that AI has already been effectively used to accompany both employees and course creators in a way that complements one another. While Oro is capable of analyzing skill gaps and provide personalized learning paths for employees, Simon acts as a perfect assistant that helps instructors turn standardized knowledge into engaging, multilingual training programs.",
        },
        {
          id: "4",
          text: "I’m genuinely excited at the prospect of joining OpenSesame and help build AI-driven learning experiences that make workforce development more inclusive, personal, and exciting!",
        },
      ],
    },
    type: "story",
  },
]

const initialEdges: Edge[] = [
  { id: "q1-s1", source: "question-1", target: "story-1", type: "default" },
  { id: "q1-s2", source: "question-1", target: "story-2", type: "default" },
]

export default function questionThree() {
  const [isLoading, setIsLoading] = useState(true)
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
          const res = await fetch("/api/nodes?page=question-3")
          const body = await res.json()
          const savedNodes = body?.nodes

          if (Array.isArray(savedNodes) && savedNodes.length > 0) {
            // setNodes(initialNodes)

            setNodes(savedNodes)
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
        body: JSON.stringify({ nodes: nodesToSave, pageName: "question-3" }),
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

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [],
  )

  // toggle visibility for a target node id and persist immediately
  function handleToggle(targetId: string, visible: boolean) {
    setNodes((ns) => {
      const updated = ns.map((n) =>
        n.id === targetId ? { ...n, data: { ...n.data, visible } } : n,
      )
      // persist this change immediately so visibility updates are saved
      saveNodesToSupabase(updated)
      return updated
    })
  }

  // inject callback into connection nodes so they can toggle targets
  const nodesWithCallbacks = nodes.map((n) =>
    n.type === "connection"
      ? { ...n, data: { ...n.data, onToggle: handleToggle } }
      : n,
  )

  // only render nodes that are visible (unless they're connection controllers)
  const visibleNodes = nodesWithCallbacks.filter(
    (n) => n.type === "connection" || n.data?.visible !== false,
  )

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
        nodes={visibleNodes}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        // defaultViewport={{ x: 0, y: 0, zoom: 0.7 }}
        fitView
      />
      {/* <DotPattern className="absolute z-0" /> */}
    </div>
  )
}
