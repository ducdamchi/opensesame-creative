"use client"

import { ReactFlow, useNodesState, type Node } from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import {
  BaseNode,
  BaseNodeContent,
  BaseNodeHeader,
  BaseNodeHeaderTitle,
} from "@/components/base-node"
import React from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

function StoryNode({
  data,
}: {
  data: {
    title: string
    content: string
    header: string
  }
}) {
  const router = useRouter()
  return (
    // <NodeTooltip>
    //   <NodeTooltipContent position={Position.Top}>
    //     Hidden Content
    //   </NodeTooltipContent>
    <BaseNode className="p-5 max-w-[40rem] bg-zinc-50">
      <div className="border-b-1 text-lg pb-3 flex justify-between">
        <BaseNodeHeader className="font-extrabold m-0 p-0">
          {data.header}
        </BaseNodeHeader>
      </div>
      <BaseNodeHeaderTitle className="font-black text-2xl pt-3">
        {data.title}
      </BaseNodeHeaderTitle>
      <BaseNodeContent>
        {data.content}
        {/* <NodeTooltipTrigger>Hover</NodeTooltipTrigger> */}
      </BaseNodeContent>
    </BaseNode>
    // </NodeTooltip>
  )
}

function SmallNode() {
  return (
    // <NodeTooltip>
    //   <NodeTooltipContent position={Position.Top}>
    //     Hidden Content
    //   </NodeTooltipContent>
    <BaseNode className="p-5 max-w-[40rem]">
      <div className="border-b-1 text-lg pb-3 flex justify-between">
        <BaseNodeHeader className="font-extrabold m-0 p-0">
          {/* {data.header} */}
        </BaseNodeHeader>
      </div>
      <BaseNodeHeaderTitle className="font-black text-2xl pt-3">
        {/* {data.title} */}
      </BaseNodeHeaderTitle>
      <BaseNodeContent>
        {/* {data.content} */}
        {/* <NodeTooltipTrigger>Hover</NodeTooltipTrigger> */}
      </BaseNodeContent>
    </BaseNode>
    // </NodeTooltip>
  )
}

function PageTitleNode({
  data,
}: {
  data: {
    content: string
  }
}) {
  return (
    <BaseNode className="p-5 max-w-[40rem] bg-zinc-50 border-0">
      <BaseNodeHeaderTitle className="font-black text-3xl text-center">
        {data.content}
      </BaseNodeHeaderTitle>
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
    <BaseNode className="p-5 max-w-[40rem] bg-zinc-50 border-0">
      <BaseNodeHeaderTitle className="text-3xl text-center font-light">
        {data.content}
      </BaseNodeHeaderTitle>
    </BaseNode>
  )
}

const nodeTypes = {
  story: StoryNode,
  small: SmallNode,
  pageTitle: PageTitleNode,
  answer: AnswerNode,
}

const initialNodes: Node[] = [
  {
    id: "1",
    position: { x: 100, y: 100 },
    data: {
      content:
        "How do you see OpenSesame fitting into your career journey or long-term goals?",
    },
    type: "pageTitle",
  },
  {
    id: "2",
    position: { x: 600, y: 300 },
    data: {
      content:
        "From past to present, I've been walking the line that connects Technology & the Humanities, with the drive to curate meaningful learning experiences for others.",
    },
    type: "answer",
  },
  {
    id: "3",
    position: { x: 600, y: 600 },
    data: {
      content:
        "As an Ed-Tech company that is currently redefining what it means for business to learn in the age of AI, OpenSesame speaks directly to the passion I have for designing learning spaces through modern software engineering.",
    },
    type: "answer",
  },
  {
    id: "4",
    position: { x: 300, y: 800 },
    data: {
      header: "After finishing high school in 2020...",
      title: "I co-founded MO Education",
      content:
        "Our goal was to attract Vietnamese talents and intellectuals from all over the world, and create a hybrid school that offers Liberal Arts courses to students from Vietnam. As Vietnamese students often face the pressure to specialize early, the idea of being able to take a creative course in an area outside of their main studies attracted mass interest.",
    },
    type: "story",
  },
  // {
  //   id: "3",
  //   position: { x: 100, y: 850 },
  //   data: {
  //     header: "Question 3",

  //     title:
  //       "What excites you most about working with AI, and how do you think it can shape the future of learning and work?",
  //     content:
  //       "In this section, you'll learn about the work I did in the past, what I'm up to in the present, as well as my aspirations for the future!",
  //   },
  //   type: "custom",
  // },
  // {
  //   id: "1.1",
  //   position: { x: 600, y: 450 },
  //   data: {},
  //   type: "small",
  // },
]

export default function questionOne() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes)

  return (
    <div className="h-screen w-screen relative overflow-hidden bg-zinc-50 font-sans">
      <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        // defaultViewport={{ x: 0, y: 0, zoom: 0.7 }}
        fitView
      />
    </div>
  )
}
