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
import React, { useCallback, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  NodeTooltip,
  NodeTooltipTrigger,
  NodeTooltipContent,
} from "@/components/node-tooltip"
import { LabeledHandle } from "@/components/labeled-handle"
import { Checkbox } from "@/components/ui/checkbox"
import { DotPattern } from "@/components/ui/dot-pattern"
import FlickeringGrid from "@/components/ui/flickering-grid"

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
    <BaseNode className="p-5 max-w-[40rem] bg-zinc-50 border-none">
      <div className="text-lg pb-3 flex justify-between">
        <BaseNodeHeader className="font-extrabold m-0 p-0">
          {data.header}
        </BaseNodeHeader>
      </div>
      <BaseNodeHeaderTitle className="font-black text-2xl pt-3">
        {data.title}
      </BaseNodeHeaderTitle>
      {data.content.map((content: any) => (
        <NodeTooltip key={content.id}>
          <NodeTooltipContent
            position={Position.Right}
            className="bg-orange-300 border-1">
            <img src={content.img} className="w-[30rem]"></img>
          </NodeTooltipContent>
          <NodeTooltipTrigger>
            <BaseNodeContent className="border-1 border-orange-500 rounded-lg hover:bg-orange-300 m-4 transition-all ease-out duration-200 text-lg">
              {content.text}
            </BaseNodeContent>
          </NodeTooltipTrigger>
        </NodeTooltip>
      ))}
      {/* <Handle id="x" type="target" position={Position.Right} /> */}
      <Handle id="story-in" type="target" position={Position.Top} />
      <Handle id="story-out" type="source" position={Position.Right} />
    </BaseNode>
  )
}

function SubStoryNode({ data }: { data: { content: string; img: string } }) {
  return (
    <NodeTooltip>
      <BaseNode className="p-5 max-w-[30rem] bg-zinc-50 border-orange-500 hover:bg-orange-300 transition-all ease-out duration-200">
        <NodeTooltipTrigger>
          <BaseNodeHeaderTitle className="font-light text-2xl p-5 ">
            {data.content}
          </BaseNodeHeaderTitle>
        </NodeTooltipTrigger>
        <NodeTooltipContent className=" bg-orange-300">
          <img src={data.img} className="max-w-[25rem] rounded-lg"></img>
        </NodeTooltipContent>
        <Handle id="substory-in" type="target" position={Position.Left} />
      </BaseNode>
    </NodeTooltip>
  )
}

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
      <Handle id="answer-in" type="target" position={Position.Top} />
      <Handle id="answer-out" type="source" position={Position.Bottom} />
    </BaseNode>
  )
}

function ConnectionNode({
  data,
}: {
  data: {
    content: string
    targets?: string[]
    onToggle?: (id: string, visible: boolean) => void
  }
}) {
  const [clicked, setClicked] = useState(false)

  function handleClick() {
    const next = !clicked
    setClicked(next)
    // reveal/hide all targets
    data.targets?.forEach((t) => data.onToggle?.(t, next))
  }

  return (
    <BaseNode className="p-5 max-w-[40rem] bg-zinc-50 border-1 flex gap-2 items-center justify-center border-0">
      <Button className="text-2xl" onClick={handleClick}>
        {clicked ? (
          <span>Hide learning outcomes</span>
        ) : (
          <span>Show learning outcomes</span>
        )}
      </Button>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </BaseNode>
  )
}

const nodeTypes = {
  story: StoryNode,
  substory: SubStoryNode,
  question: QuestionNode,
  answer: AnswerNode,
  connection: ConnectionNode,
}

const initialNodes: Node[] = [
  {
    id: "question-1",
    position: { x: 100, y: 100 },
    data: {
      content:
        "How do you see OpenSesame fitting into your career journey or long-term goals?",
    },
    type: "question",
  },
  {
    id: "answer-1",
    position: { x: 600, y: 300 },
    data: {
      content:
        "The work I do bridge the gap between Technology and the Humanities, with the goal to curate meaningful experiences for learners.",
    },
    type: "answer",
  },
  {
    id: "answer-2",
    position: { x: 100, y: 600 },
    data: {
      content:
        "As a company that’s redefining what it means for businesses to learn in the age of AI, OpenSesame’s goals speak directly to the passion I have for designing educational spaces through modern software engineering.",
    },
    type: "answer",
  },
  {
    id: "story-1",
    position: { x: 0, y: 1000 },
    data: {
      header: "Before starting college…",
      title:
        "I co-founded an educational startup, and worked for a production house in Vietnam.",
      content: [
        {
          id: "1",
          text: "MO Education recruited Vietnamese intellectuals from all over the world to create a hybrid school that offers Liberal Arts Courses to students from Vietnam. At MO, I oversaw the creation of the first courses at MO, and liased with local community organizations to extend the learning outside of the classroom.",
          img: "/mo1.jpg",
        },
        {
          id: "2",
          text: "OKIA Film Production was a creative hub where directors, writers, and artists from across Vietnam gather to exchange ideas, and organize community events. At OKIA, I organized 20+ events, panels, and screenings, with topics ranging from post-modern poetry to 35mm film preservation efforts around the world.",
          img: "/okia1.jpg",
        },
      ],
    },
    type: "story",
  },
  {
    id: "conn-1",
    type: "connection",
    position: { x: 800, y: 1200 },
    data: {
      content: "Reveal learning outcomes",
      targets: ["substory-1", "substory-2", "substory-3"],
    },
  },
  {
    id: "substory-1",
    position: { x: 1200, y: 600 },
    data: {
      content:
        "Design experiential learning curriculum that allows creative freedom for instructors, and puts students at the center of learning.",
      img: "/mo2.jpeg",
      visible: false,
    },
    type: "substory",
  },
  {
    id: "substory-2",
    position: { x: 1800, y: 1000 },
    data: {
      content:
        "Engage the local community in arts and culture through organizing large-scale events and hosting technical workshops.",
      img: "/okia2.jpeg",
      visible: false,
    },
    type: "substory",
  },
  {
    id: "substory-3",
    position: { x: 1200, y: 1300 },
    data: {
      content:
        "Conduct extensive archival research, translation work, and grant writings that lay the foundation for high-budget film productions.",
      img: "/okia3.jpg",
      visible: false,
    },
    type: "substory",
  },
]

const initialEdges: Edge[] = [
  { id: "q1-a1", source: "question-1", target: "answer-1", type: "default" },
  { id: "a1-a2", source: "answer-1", target: "answer-2", type: "default" },
  { id: "a2-story1", source: "answer-2", target: "story-1", type: "default" },

  {
    id: "story1-conn1",
    source: "story-1",
    target: "conn-1",
    type: "default",
  },
  {
    id: "conn1-sub1",
    source: "conn-1",
    target: "substory-1",
    type: "default",
  },
  {
    id: "conn1-sub2",
    source: "conn-1",
    target: "substory-2",
    type: "default",
  },
  {
    id: "conn1-sub3",
    source: "conn-1",
    target: "substory-3",
    type: "default",
  },
]

export default function questionOne() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [],
  )

  // toggle visibility for a target node id
  function handleToggle(targetId: string, visible: boolean) {
    setNodes((ns) =>
      ns.map((n) =>
        n.id === targetId ? { ...n, data: { ...n.data, visible } } : n,
      ),
    )
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
