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
      {data.content.map((content: any) => (
        <NodeTooltip key={content.id}>
          <NodeTooltipContent
            position={Position.Right}
            className="bg-orange-600 text-white">
            <div className="flex flex-col items-start gap-3">
              <img src={content.img} className="max-w-[25rem] rounded-lg"></img>
              <div className="w-[25rem] text-xs p-2">{content.caption}</div>
            </div>
            {/* <img src={content.img} className="w-[30rem]"></img> */}
          </NodeTooltipContent>
          <NodeTooltipTrigger>
            <BaseNodeContent className="border-1 border-orange-600 rounded-lg hover:bg-orange-600 hover:text-white m-4 transition-all ease-out duration-200 text-2xl p-5">
              {content.text}
            </BaseNodeContent>
          </NodeTooltipTrigger>
        </NodeTooltip>
      ))}
      {/* <Handle id="x" type="target" position={Position.Right} /> */}
      <Handle id="story-in" type="target" position={Position.Top} />
      <Handle id="story-out" type="source" position={Position.Right} />
      {/* <Handle id="story-out" type="source" position={Position.Bottom} /> */}
    </BaseNode>
  )
}

function SubStoryNode({
  data,
}: {
  data: { content: string; img: string; caption: string }
}) {
  return (
    <NodeTooltip>
      <BaseNode className="p-5 max-w-[30rem] bg-zinc-50 border-orange-600 hover:bg-orange-600 hover:text-white transition-all ease-out duration-200">
        <NodeTooltipTrigger>
          <BaseNodeHeaderTitle className="font-light text-2xl p-5 ">
            {data.content}
          </BaseNodeHeaderTitle>
        </NodeTooltipTrigger>
        <NodeTooltipContent className="bg-orange-600 text-white">
          <div className="flex flex-col items-start gap-3">
            <img src={data.img} className="max-w-[25rem] rounded-lg"></img>
            <div className="w-[25rem] text-xs p-2">{data.caption}</div>
          </div>
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
    <BaseNode
      className="p-5 max-w-[40rem] bg-zinc-50 border-1 flex gap-2 items-center justify-center text-2xl font-bold border-1 hover:bg-orange-600 hover:text-white hover:text-white transition-all duration-300 ease-out border-1 border-orange-600"
      onClick={handleClick}>
      {/* <Button className="text-2xl"> */}
      <span>{data.content}</span>

      {/* {clicked ? (
          <span>Hide learning outcomes</span>
        ) : (
          <span>Show learning outcomes</span>
        )} */}
      {/* </Button> */}
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
        "As a company that’s redefining what it means for businesses to learn in the age of AI, OpenSesame’s goals speak directly to the passion I have for creating educational spaces through the use of modern technology and software engineering.",
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
          img: "https://ghiinqdxtvecsscabqyl.supabase.co/storage/v1/object/sign/opensesame-media/mo1.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9kMzY0ZThjZC1hOTRjLTQwODktOGI0Ni04MGE2Yzg5MTY4MTciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJvcGVuc2VzYW1lLW1lZGlhL21vMS5qcGciLCJpYXQiOjE3NzE2MDkyNzgsImV4cCI6MTgwMzE0NTI3OH0.xZ-QLgx6ng5HAffiR1XP0fGDDjl-_cnLVp1_qVV2v3U",
          caption:
            "2021 end-of-year meetup and social for all students, alumni, and instructors at MO",
        },
        {
          id: "2",
          text: "OKIA Film Production was a creative hub where directors, writers, and artists from across Vietnam gather to exchange ideas, and organize community events. At OKIA, I organized 20+ events, panels, and screenings, with topics ranging from post-modern poetry to 35mm film preservation efforts around the world.",
          img: "https://ghiinqdxtvecsscabqyl.supabase.co/storage/v1/object/sign/opensesame-media/okia1.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9kMzY0ZThjZC1hOTRjLTQwODktOGI0Ni04MGE2Yzg5MTY4MTciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJvcGVuc2VzYW1lLW1lZGlhL29raWExLmpwZyIsImlhdCI6MTc3MTYwOTI5NCwiZXhwIjoxODAzMTQ1Mjk0fQ.mjiMgM221-ndNq8NxySuy2n4FEk3zR4DEIiJizifXY8",
          caption:
            "Screening event of OKIA Studio's founder latest film, '1982'",
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
      img: "https://ghiinqdxtvecsscabqyl.supabase.co/storage/v1/object/sign/opensesame-media/mo2.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9kMzY0ZThjZC1hOTRjLTQwODktOGI0Ni04MGE2Yzg5MTY4MTciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJvcGVuc2VzYW1lLW1lZGlhL21vMi5qcGVnIiwiaWF0IjoxNzcxNjA5MzE1LCJleHAiOjE4MDMxNDUzMTV9.bNN-D5aA6wQsMSeqqSvL2JhQ1f0fVkoYsXLFnLzSTig",
      visible: false,
      caption:
        "Bringing a film class to a VIP screening of an award-winning documentary with directors Q&A",
    },
    type: "substory",
  },
  {
    id: "substory-2",
    position: { x: 1800, y: 1000 },
    data: {
      content:
        "Engage the local community in arts and culture through organizing large-scale events and hosting technical workshops.",
      img: "https://ghiinqdxtvecsscabqyl.supabase.co/storage/v1/object/sign/opensesame-media/okia2.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9kMzY0ZThjZC1hOTRjLTQwODktOGI0Ni04MGE2Yzg5MTY4MTciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJvcGVuc2VzYW1lLW1lZGlhL29raWEyLmpwZWciLCJpYXQiOjE3NzE2MDkzMzUsImV4cCI6MTgwMzE0NTMzNX0.VwOct8tyvmJiwWBAeCI6_xcOS6Yg1-fyTFh3wTGXR_k",
      visible: false,
      caption:
        "Me leading a pannel discussion at OKIA Studio on the importance of 35mm film preservation",
    },
    type: "substory",
  },
  {
    id: "substory-3",
    position: { x: 1200, y: 1300 },
    data: {
      content:
        "Conduct extensive archival research, translation work, and grant writings that lay the foundation for high-budget film productions.",
      img: "https://ghiinqdxtvecsscabqyl.supabase.co/storage/v1/object/sign/opensesame-media/okia3.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9kMzY0ZThjZC1hOTRjLTQwODktOGI0Ni04MGE2Yzg5MTY4MTciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJvcGVuc2VzYW1lLW1lZGlhL29raWEzLmpwZWciLCJpYXQiOjE3NzE2MDkzNDksImV4cCI6MTgwMzE0NTM0OX0.z8uUVc_fasqj_ZF7JVKqKy9DLz0GxvHYpR5ICSORrY8",
      visible: false,
      caption:
        "Me conducting archival research at the National Film Institute of Vietnam",
    },
    type: "substory",
  },
  {
    id: "story-2",
    position: { x: 0, y: 1800 },
    data: {
      header: "During college…",
      title:
        "I learned software engineering, and used it to create tools that served the needs of the campus community.",
      content: [
        {
          id: "1",
          text: "Swarthmore College's 3D Modeling Studio is a space designed for students and faculty to design, test, and craft products with a wide range of materials, ranging from traditional woodworking to modern Engineering prototypes. Here, I worked as a Software Technician, using React/Node.js to develop a digital testing application that will grant students and faculty a certification to use woodworking equipment, laser engravers, 3D printers and various power tools.",
          img: "https://ghiinqdxtvecsscabqyl.supabase.co/storage/v1/object/sign/opensesame-media/makerspace.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9kMzY0ZThjZC1hOTRjLTQwODktOGI0Ni04MGE2Yzg5MTY4MTciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJvcGVuc2VzYW1lLW1lZGlhL21ha2Vyc3BhY2Uud2VicCIsImlhdCI6MTc3MTYwOTM2MywiZXhwIjoxODAzMTQ1MzYzfQ.aiNPVBNC7iHhfyKDfUnMoxx2YFXUPo2eXaLbtUrWM9I",
          caption: "A sculpture class taking place inside the studio",
        },
        {
          id: "2",
          text: "Swarthmore College Computer Society (SCCS) is a student-led club that create campus-wide digital solutions not provided by the school's IT department. Here, I renovated the college intranet with a new UI, and created a Course Planner that helped students visualize course combinations, as well as rate professors.",
          img: "https://ghiinqdxtvecsscabqyl.supabase.co/storage/v1/object/sign/opensesame-media/sccs.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9kMzY0ZThjZC1hOTRjLTQwODktOGI0Ni04MGE2Yzg5MTY4MTciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJvcGVuc2VzYW1lLW1lZGlhL3NjY3Mud2VicCIsImlhdCI6MTc3MTYwOTM3OCwiZXhwIjoxODAzMTQ1Mzc4fQ.JY4_09OwYkvFGfsgHK0EhH4cYz_zUlQI0Kz0Z67umFU",
          caption: "SCCS members weekly meetup and project time",
        },
      ],
    },
    type: "story",
  },
  {
    id: "substory-4",
    position: { x: 1200, y: 1600 },
    data: {
      content:
        "Identify where technical solutions can significantly improve the communal experience of a community.",
      img: "https://ghiinqdxtvecsscabqyl.supabase.co/storage/v1/object/sign/opensesame-media/sub4.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9kMzY0ZThjZC1hOTRjLTQwODktOGI0Ni04MGE2Yzg5MTY4MTciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJvcGVuc2VzYW1lLW1lZGlhL3N1YjQuanBlZyIsImlhdCI6MTc3MTYwOTM5MiwiZXhwIjoxODAzMTQ1MzkyfQ.R0t8kUnjn0yG8LVa-81McBMBi1MLa6aprCiJf3Yedcw",
      visible: false,
      caption:
        "A end-of-year social outing in Philadelphia that I organized for technicians at the 3D Modeling Studio",
    },
    type: "substory",
  },
  {
    id: "substory-5",
    position: { x: 1800, y: 2000 },
    data: {
      content:
        "Develop a rigorous flow for coding practices, from high-level architectural designs to low-level implementation.",
      img: "https://ghiinqdxtvecsscabqyl.supabase.co/storage/v1/object/sign/opensesame-media/sub5.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9kMzY0ZThjZC1hOTRjLTQwODktOGI0Ni04MGE2Yzg5MTY4MTciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJvcGVuc2VzYW1lLW1lZGlhL3N1YjUucG5nIiwiaWF0IjoxNzcxNjA5NDEzLCJleHAiOjE4MDMxNDU0MTN9.zoFUWrWrq3kBArrI59h47uomtqC8y672yL_msAQa_yA",
      visible: false,
      caption:
        "SCCS whiteboarding session for an interactive reader that could be used to assist students in a Classical Chinese class at Swarthmore",
    },
    type: "substory",
  },
  {
    id: "substory-6",
    position: { x: 1200, y: 2200 },
    data: {
      content:
        "Communicate efficiently, while maintaining meaningful, long-lasting relationships with teammates.",
      img: "https://ghiinqdxtvecsscabqyl.supabase.co/storage/v1/object/sign/opensesame-media/sub6.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9kMzY0ZThjZC1hOTRjLTQwODktOGI0Ni04MGE2Yzg5MTY4MTciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJvcGVuc2VzYW1lLW1lZGlhL3N1YjYuanBnIiwiaWF0IjoxNzcxNjA5NDI3LCJleHAiOjE4MDMxNDU0Mjd9.Ri8fk74xAMLyzY2hmbWeZQMqklEzRH8wFBhGeoDVhGU",
      visible: false,
      caption:
        "Launch celebration with teammates I worked with on the SCCS's Course Planner",
    },
    type: "substory",
  },
  {
    id: "conn-2",
    type: "connection",
    position: { x: 800, y: 2100 },
    data: {
      content: "Reveal learning outcomes",
      targets: ["substory-4", "substory-5", "substory-6"],
    },
  },
  {
    id: "story-3",
    position: { x: 0, y: 2500 },
    data: {
      header: "After college…",
      title:
        "I received a $40,000 grant to work on a social justice project, and decided to take a gap year.",
      content: [
        {
          id: "1",
          text: "In 2023, having gained a deeper understanding on the historical animosity between the inland and diasporic Vietnamese communities through living in the United States, I started working with a friend from Lawrence University to propose a project that would start a modern dialogue between these two communities. In 2025, our proposal won the Class of 1968 Peace and Social Justice Fund and Povolny Fund for Excellence, enabling us to interview 50+ Vietnamese writers, journalists, artists, professors, and directors of cultural centers over the course of 2 months in California.",
          img: "https://ghiinqdxtvecsscabqyl.supabase.co/storage/v1/object/sign/opensesame-media/du.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9kMzY0ZThjZC1hOTRjLTQwODktOGI0Ni04MGE2Yzg5MTY4MTciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJvcGVuc2VzYW1lLW1lZGlhL2R1LmpwZyIsImlhdCI6MTc3MTYwOTQ0OSwiZXhwIjoxODAzMTQ1NDQ5fQ.mVDWFivbrOL4F-sJj4RJfpU7n32LnDPpwcJ4nO26hsA",
          caption:
            "Meeting with the board members of Vietbao, the longest-running independent newspaper in Little Saigon, California",
        },
        {
          id: "2",
          text: "After the production concluded in November 2025, I started volunteering as a Frontend Engineer for Greenstand, a non-profit that provides financial support for tree planters around the world, and stimulates a greener economy by converting positive environmental actions into tradable NFTs. I'm currently working with Next.js for web applications, and React Native/Expo for mobile apps, while continuing to engage in dialogues with the open-source community about how we can use Technology in the age of AI to drive positive changes in the world.",
          img: "https://ghiinqdxtvecsscabqyl.supabase.co/storage/v1/object/sign/opensesame-media/green.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9kMzY0ZThjZC1hOTRjLTQwODktOGI0Ni04MGE2Yzg5MTY4MTciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJvcGVuc2VzYW1lLW1lZGlhL2dyZWVuLnBuZyIsImlhdCI6MTc3MTYwOTQ2MCwiZXhwIjoxODAzMTQ1NDYwfQ.yErhoR6zjHiULwstP85wqYdIhQfuwe7CHXBftoiDa5o",
          caption:
            "Greenstand's mission is to use technology to drive sustainable reforestation and poverty alleviation",
        },
      ],
    },
    type: "story",
  },
  {
    id: "substory-7",
    position: { x: 1400, y: 2500 },
    data: {
      content:
        "Develop interpersonal skills needed for interviewing subjects with complex history, and lead a high-budget project that involve many teammates and stakeholders.",
      img: "https://ghiinqdxtvecsscabqyl.supabase.co/storage/v1/object/sign/opensesame-media/doc.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9kMzY0ZThjZC1hOTRjLTQwODktOGI0Ni04MGE2Yzg5MTY4MTciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJvcGVuc2VzYW1lLW1lZGlhL2RvYy5qcGciLCJpYXQiOjE3NzE2MDk0NzAsImV4cCI6MTgwMzE0NTQ3MH0.PgiyM_iGG0DH5nj7sSW6a1p_2-zFAdJlRWmM3IRplcc",
      visible: false,
      caption:
        "Interviewing different Vietnamese American generations about their identities, family relations, and conception of the current state of Vietnam",
    },
    type: "substory",
  },
  {
    id: "substory-8",
    position: { x: 1200, y: 2800 },
    data: {
      content:
        "Use software engineering as a means to create tangible outcomes in wider communities, and engage in open-source development practices.",
      img: "https://ghiinqdxtvecsscabqyl.supabase.co/storage/v1/object/sign/opensesame-media/greenstand.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9kMzY0ZThjZC1hOTRjLTQwODktOGI0Ni04MGE2Yzg5MTY4MTciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJvcGVuc2VzYW1lLW1lZGlhL2dyZWVuc3RhbmQucG5nIiwiaWF0IjoxNzcxNjA5NDg0LCJleHAiOjE4MDMxNDU0ODR9.UL7xC1r07xQ61aZg9lrf3aM4r9r3xuq3wQqJ4jvb2sQ",
      visible: false,
      caption:
        "Implementing the Figma design of Greenstand's mobile Wallet App",
    },
    type: "substory",
  },

  {
    id: "conn-3",
    type: "connection",
    position: { x: 800, y: 2800 },
    data: {
      content: "Reveal learning outcomes",
      targets: ["substory-7", "substory-8"],
    },
  },
  {
    id: "answer-3",
    position: { x: 1500, y: 3000 },
    data: {
      content:
        "Having gone through a journey where the use of Technology is never separate from a drive towards creating meaningful, educational product for others, I am now thrilled at the prospect of being a Software Engineer Intern at OpenSesame. I want to use this opportunity to deepen my skills in Software Engineer, and collaborate with like-minded developers in a fast-paced, innovative environment with an eye towards tangible outcomes!",
    },
    type: "answer",
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
  {
    id: "story1-story2",
    source: "story-1",
    target: "story-2",
    type: "default",
  },
  {
    id: "story2-conn2",
    source: "story-2",
    target: "conn-2",
    type: "default",
  },
  {
    id: "conn2-sub4",
    source: "conn-2",
    target: "substory-4",
    type: "default",
  },
  {
    id: "conn2-sub5",
    source: "conn-2",
    target: "substory-5",
    type: "default",
  },
  {
    id: "conn2-sub6",
    source: "conn-2",
    target: "substory-6",
    type: "default",
  },
  {
    id: "story2-story3",
    source: "story-2",
    target: "story-3",
    type: "default",
  },
  {
    id: "story3-conn3",
    source: "story-3",
    target: "conn-3",
    type: "default",
  },
  {
    id: "conn3-sub7",
    source: "conn-3",
    target: "substory-7",
    type: "default",
  },
  {
    id: "conn3-sub8",
    source: "conn-3",
    target: "substory-8",
    type: "default",
  },
  {
    id: "story3-ans3",
    source: "story-3",
    target: "answer-3",
    type: "default",
  },
]

export default function questionOne() {
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
          const res = await fetch("/api/nodes?page=question-1")
          const body = await res.json()
          const savedNodes = body?.nodes

          if (Array.isArray(savedNodes) && savedNodes.length > 0) {
            setNodes(savedNodes)
            // setNodes(initialNodes)
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
        body: JSON.stringify({ nodes: nodesToSave, pageName: "question-1" }),
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
