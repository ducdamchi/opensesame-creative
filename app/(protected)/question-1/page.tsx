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

function CustomNode({
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
    <BaseNode className="p-5 max-w-[40rem]">
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

const nodeTypes = {
  custom: CustomNode,
  small: SmallNode,
}

const initialNodes: Node[] = [
  {
    id: "1",
    position: { x: 100, y: 100 },
    data: {
      header: "In 2018... ",
      title:
        "How do you see OpenSesame fitting into your career journey or long-term goals?",
      content:
        "In this section, you'll learn about the work I did in the past, what I'm up to in the present, as well as my aspirations for the future!",
    },
    type: "custom",
  },
  {
    id: "2",
    position: { x: 600, y: 450 },
    data: {
      header: "Question 2",

      title:
        "What strengths, skills, or perspectives will you bring to OpenSesame to make an impact and contribute to our mission?",
      content:
        "In this section, you'll learn about the work I did in the past, what I'm up to in the present, as well as my aspirations for the future!",
    },
    type: "custom",
  },
  {
    id: "3",
    position: { x: 100, y: 850 },
    data: {
      header: "Question 3",

      title:
        "What excites you most about working with AI, and how do you think it can shape the future of learning and work?",
      content:
        "In this section, you'll learn about the work I did in the past, what I'm up to in the present, as well as my aspirations for the future!",
    },
    type: "custom",
  },
  {
    id: "1.1",
    position: { x: 600, y: 450 },
    data: {},
    type: "small",
  },
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
