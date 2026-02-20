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
          // <NodeTooltip key={content.id}>
          //   <NodeTooltipContent
          //     position={Position.Right}
          //     className="bg-orange-300">
          //     <div className="flex flex-col items-start gap-3">
          //       <img src={content.img} className="max-w-[25rem] rounded-lg"></img>
          //       <div className="w-[25rem] text-black text-xs p-2">
          //         {content.caption}
          //       </div>
          //     </div>
          //     {/* <img src={content.img} className="w-[30rem]"></img> */}
          //   </NodeTooltipContent>
          //   <NodeTooltipTrigger>
          //     <BaseNodeContent className="border-1 border-orange-600 rounded-lg hover:bg-orange-300 m-4 transition-all ease-out duration-200 text-lg">
          //       {content.text}
          //     </BaseNodeContent>
          //   </NodeTooltipTrigger>
          // </NodeTooltip>
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
  data: { content: string; img: string; caption: string; href: string }
}) {
  return (
    <NodeTooltip>
      <BaseNode className="p-5 max-w-[30rem] bg-zinc-50 border-orange-600 hover:bg-orange-600 hover:text-white transition-all ease-out duration-200">
        <NodeTooltipTrigger>
          <BaseNodeHeaderTitle className="font-light text-2xl p-5 flex flex-col gap-2">
            <div>{data.content}</div>
            <a
              href={data.href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-800 cursor-pointer">
              View More
            </a>
          </BaseNodeHeaderTitle>
        </NodeTooltipTrigger>
        <NodeTooltipContent className="bg-orange-600">
          <div className="flex flex-col items-start gap-3">
            <img src={data.img} className="max-w-[25rem] rounded-lg"></img>
            {data.caption && (
              <div className="w-[25rem] text-white text-xs p-2">
                {data.caption}
              </div>
            )}
          </div>
        </NodeTooltipContent>
        <Handle id="substory-in" type="target" position={Position.Left} />
      </BaseNode>
    </NodeTooltip>
  )
}

function CountryNode({
  data,
}: {
  data: { name: string; map: string; img: string; caption: string }
}) {
  return (
    <NodeTooltip>
      <BaseNode className="p-5 max-w-[30rem] bg-zinc-50 border-none transition-all ease-out duration-200">
        <NodeTooltipTrigger>
          <img src={data.map} className=""></img>
        </NodeTooltipTrigger>
        <NodeTooltipContent className="bg-orange-600">
          <div className="flex flex-col items-start max-w-[25rem] ">
            <img
              src={data.img}
              className="w-full object-cover rounded-lg pb-2"></img>
            {data.name && (
              <div className="w-full text-white text-xs p-2 pb-2 font-bold">
                {data.name}
              </div>
            )}
            {data.caption && (
              <div className="w-full text-white text-xs p-2 pt-0">
                {data.caption}
              </div>
            )}
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

function SkillsNode({
  data,
}: {
  data: {
    name: string
    list: any
  }
}) {
  return (
    <BaseNode className="p-8 max-w-[30rem] bg-zinc-50 border-1">
      <div className="text-3xl font-semibold mb-3">{data.name}</div>
      {data.list.map((item: any, key: any) => (
        <div key={key} className="">
          <div className="flex items-center gap-5 rounded-md p-2">
            <img
              src={item.logo}
              alt="logo"
              className="h-[4rem] w-[4rem] object-contain"
            />
            <span className="text-3xl">{item.name}</span>
          </div>
        </div>
      ))}

      {/* <BaseNodeHeaderTitle className="text-3xl text-center font-bold">
        Languages
      </BaseNodeHeaderTitle>
      <div className="flex flex-wrap gap-3 mt-3">
        {languages.map((item, key) => (
          <div key={key} className="flex items-center gap-3 rounded-md p-2">
            <img
              src={item.logo}
              alt="TypeScript logo"
              className="h-[4rem] w-[4rem] object-contain"
            />
            <span className="text-3xl">{item.name}</span>
          </div>
        ))}
      </div>
      <BaseNodeHeaderTitle className="text-3xl text-center font-light">
        Frameworks
      </BaseNodeHeaderTitle>
      <div className="flex flex-wrap gap-3 mt-3">
        {frameworks.map((item, key) => (
          <div key={key} className="flex items-center gap-3 rounded-md p-2">
            <img
              src={item.logo}
              alt="TypeScript logo"
              className="h-[4rem] w-[4rem] object-contain"
            />
            <span className="text-3xl">{item.name}</span>
          </div>
        ))}
      </div>
      <BaseNodeHeaderTitle className="text-3xl text-center font-light">
        Backend
      </BaseNodeHeaderTitle>
      <BaseNodeHeaderTitle className="text-3xl text-center font-light">
        AI/ML
      </BaseNodeHeaderTitle>
      <BaseNodeHeaderTitle className="text-3xl text-center font-light">
        CI/CD
      </BaseNodeHeaderTitle> */}
      <Handle id="answer-in" type="target" position={Position.Left} />
      {/* <Handle id="answer-out" type="source" position={Position.Bottom} /> */}
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
      className="p-5 max-w-[40rem] bg-zinc-50 border-1 flex gap-2 items-center justify-center text-2xl font-bold border-1 hover:bg-orange-600 hover:text-white transition-all duration-300 ease-out border-1 border-orange-600"
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
  skills: SkillsNode,
  country: CountryNode,
}

const initialNodes: Node[] = [
  {
    id: "question-1",
    position: { x: 100, y: 100 },
    data: {
      content:
        "What strengths, skills, or perspectives will you bring to OpenSesame to make an impact and contribute to our mission?",
    },
    type: "question",
  },
  {
    id: "answer-1",
    position: { x: 700, y: 400 },
    data: {
      content:
        "At OpenSesame, I believe that technology, collaboration, and understanding of modern work cultures are the core propellers of its mission to help companies develop a powerful workforce and employees unlock their potentials. The diverse range of projects that I've worked on has trained me to become a motivated initiator who quickly overcomes technical hindrances to achieve the common goal of a team. ",
    },
    type: "answer",
  },
  {
    id: "answer-2",
    position: { x: -200, y: 600 },
    data: {
      content:
        "Meanwhile, my experience of having studied in multiple countries and engaged in various industries will bring to OpenSesame a unique perspective grounded in diversity, empathy, and responsibility. ",
    },
    type: "answer",
  },
  {
    id: "story-1",
    position: { x: 0, y: 1000 },
    data: {
      header: "My greatest strength is...",
      title:
        "Taking complete ownership of a project and working it until completion",
      content: [
        {
          id: "1",
          text: "I feel responsibility towards a project the same way a founder feel responsibility towards their company's product. This means developing a broad range of skills, and quickly master multiple aspects of development, no matter how trivial it is. And most importantly, it means striving for originality whenever there's space to do so.",
          // img: "/mo1.jpg",
          // caption:
          //   "2021 end-of-year meetup and social for all students, alumni, and instructors at MO",
        },
        {
          id: "2",
          text: "Working on many projects until its final form has also trained me to reach a balance between fast execution and careful planning. As charging head-first into a complicated problem or getting occupied with excessive details will both bring diminishing results, I've learned to context-switch between each mindset based on the phase of development in order to create an efficient and sustainable workflow.",
          // img: "/okia1.jpg",
          // caption:
          //   "Screening event of OKIA Studio's founder latest film, '1982'",
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
      content: "Toggle my most recent projects",
      targets: ["strengths-1", "strengths-2", "strengths-3"],
    },
  },
  {
    id: "conn-2",
    type: "connection",
    position: { x: 660, y: 2200 },
    data: {
      content: "Toggle my skills",
      targets: [
        "skills-1",
        "skills-2",
        "skills-3",
        "skills-4",
        "skills-5",
        "skills-6",
      ],
    },
  },
  {
    id: "conn-3",
    type: "connection",
    position: { x: -650, y: 3670 },
    data: {
      content: "Toggle countries",
      targets: [
        "country-1",
        "country-2",
        "country-3",
        "country-4",
        "country-5",
        "country-6",
      ],
    },
  },

  {
    id: "strengths-1",
    position: { x: 1300, y: 900 },
    data: {
      content:
        "The Film Atlas is a free SaaS Node application that promotes the discovery of cinema from underrepresented regions around the world. Once logged in, user can create a customized heat map of the world (MapLibre GL) based on the diversity of their collections.",
      img: "https://ghiinqdxtvecsscabqyl.supabase.co/storage/v1/object/sign/opensesame-media/tfa.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9kMzY0ZThjZC1hOTRjLTQwODktOGI0Ni04MGE2Yzg5MTY4MTciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJvcGVuc2VzYW1lLW1lZGlhL3RmYS5wbmciLCJpYXQiOjE3NzE2MTA0NDcsImV4cCI6MTgwMzE0NjQ0N30.GcMPo9A8OHxAIEAv03wPxoMBlhHCHgwA01_MiQuJln4",
      visible: false,
      href: "https://thefilmatlas.org/#/docs",

      // caption:
      //   "Bringing a film class to a VIP screening of an award-winning documentary with directors Q&A",
    },
    type: "substory",
  },
  {
    id: "strengths-2",
    position: { x: 1800, y: 1200 },
    data: {
      content:
        "SinoScript is an interactive reader for premodern texts from the Sinosphere (focusing on Vietnam + China), inspired by the quran.com. It currently features an OpenAI-integrated dynamic voice-to-text highlighting function, and live dictionary querying.",
      img: "https://ghiinqdxtvecsscabqyl.supabase.co/storage/v1/object/sign/opensesame-media/ddj.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9kMzY0ZThjZC1hOTRjLTQwODktOGI0Ni04MGE2Yzg5MTY4MTciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJvcGVuc2VzYW1lLW1lZGlhL2Rkai5wbmciLCJpYXQiOjE3NzE2MTA0OTksImV4cCI6MTgwMzE0NjQ5OX0.IZUCq41JV802IEZyQ64inbPukfGQ7XT_d4ZXL5bqxoI",
      visible: false,
      href: "https://github.com/ducdamchi/sinoscript",

      // caption:
      //   "Me leading a pannel discussion at OKIA Studio on the importance of 35mm film preservation",
    },
    type: "substory",
  },
  {
    id: "strengths-3",
    position: { x: 1200, y: 1300 },
    data: {
      content:
        "ducdam.com is a sleek, minimalist React web portfolio with serverless CMS built with Node's fs module. It was created interactive custom components, and styled using Tailwind CSS, showcasing the art projects I'm up to when not working with code.",
      img: "https://ghiinqdxtvecsscabqyl.supabase.co/storage/v1/object/sign/opensesame-media/ducdam.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9kMzY0ZThjZC1hOTRjLTQwODktOGI0Ni04MGE2Yzg5MTY4MTciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJvcGVuc2VzYW1lLW1lZGlhL2R1Y2RhbS5wbmciLCJpYXQiOjE3NzE2MTA1MTMsImV4cCI6MTgwMzE0NjUxM30.VkLD1BfrMHzVJWUrekh778ZPhtBdHeCK5aoAkygTP8U",
      visible: false,
      href: "https://ducdam.com/#/photography",
      // caption:
      //   "Me conducting archival research at the National Film Institute of Vietnam",
    },
    type: "substory",
  },
  {
    id: "story-2",
    position: { x: -200, y: 1950 },
    data: {
      header: "The skills that I have...",
      title:
        "Are contained in a constantly-expanding bucket, acting as the means of achieving the end product that I envision",
      content: [
        {
          id: "1",
          text: "The skills displayed over here are things that I've directly used in both recreational and in-production projects. As someone who builds a lot of web applications, my most frequently used stack is TypeScript, Next.js, PostgreSQL, and Tailwind CSS (all are being used to build this portfolio).",
          // img: "/makerspace.webp",
          // caption: "A sculpture class taking place inside the studio",
        },
        {
          id: "2",
          text: "My favorite area to explore is the backend, where I enjoy designing APIs and leveraging powerful databases like PostgreSQL. In fact, thanks to experimenting with a PostgreSQL framework like Supabase, I was able to smoothly implement the authentication feature for this portfolio!",
          // img: "/sccs.webp",
          // caption: "SCCS members weekly meetup and project time",
        },
        {
          id: "3",
          text: "While there's much for me to learn about CI/CD and DevOps, I've continously deployed new versions of my apps on an AWS EC2 instance. I'm also currently studying for the AWS Solutions Architect Certificate (SAA-C03), with the exam being schedule for April!",
          // img: "/sccs.webp",
          // caption: "SCCS members weekly meetup and project time",
        },
      ],
    },
    type: "story",
  },
  {
    id: "story-3",
    position: { x: -1400, y: 3300 },
    data: {
      header: "My perspectives on work and collaboration is informed by...",
      title:
        "My experience of having studied and worked in multiple countries in the past 8 years",
      content: [
        {
          id: "1",
          text: "In 2018, I received a full scholarship to attend the Mahindra United World College in India, a boarding school in rural Maharashtra where 70% of the student body comes from 120+ countries in the world. This experience fundamentally changed how I interact with people whose backgrounds and cultures differ from mine, and taught me to always navigate past differences to see the common thread that unites us together.",
          // img: "/makerspace.webp",
          // caption: "A sculpture class taking place inside the studio",
        },
        {
          id: "2",
          text: "More importantly, I've learned that the essence of a place are always the people who occupy that space, which makes it natural for me to invest in long-lasting partnerships, and meaningful interactions wherever I go. For me, this has resulted in trans-continental relationships with people who I've worked on projects together, allowing me to expand my horizons by contemplating the journeys each of us had to take before convening with one another.",
          // img: "/sccs.webp",
          // caption: "SCCS members weekly meetup and project time",
        },
      ],
    },
    type: "story",
  },
  {
    id: "answer-3",
    position: { x: -1200, y: 4750 },
    data: {
      content:
        "The strengths, skills and perspectives that I have were all developed with the goal to make a positive impact on the life of others. I am excited to carry them with me to OpenSesame, where I can join a diverse team who is motivated by the goal to unlock the potential of modern workforces, and reshape the relationship between human and technology in the age of AI!",
    },
    type: "answer",
  },
  {
    id: "skills-1",
    position: { x: 1100, y: 1780 },
    data: {
      name: "Languages",
      list: [
        {
          name: "Typescript",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
        },
        {
          name: "Javascript",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
        },
        {
          name: "Python",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
        },
        {
          name: "C",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg",
        },
        {
          name: "C++",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg",
        },
        {
          name: "HTML",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
        },
        {
          name: "CSS",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
        },
        {
          name: "Bash",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg",
        },
      ],
      // content:
      //   "Having gone through a journey where the use of Technology is never separate from a drive towards creating meaningful, educational product for others, I am now thrilled at the prospect of being a Software Engineer Intern at OpenSesame. I want to use this opportunity to deepen my skills in Software Engineer, and collaborate with like-minded developers in a fast-paced, innovative environment with an eye towards tangible outcomes!",
    },
    type: "skills",
  },
  {
    id: "skills-2",
    position: { x: 1590, y: 1730 },
    data: {
      name: "Frameworks",
      list: [
        {
          name: "React",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
        },
        {
          name: "Node.js",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
        },
        {
          name: "Next.js",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
        },
        {
          name: "Tailwind",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
        },
        {
          name: "Expo",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/expo/expo-original.svg",
        },
        {
          name: "TanStack",
          logo: "https://tanstack.com/images/logos/logo-color-100.png",
        },
      ],
      // content:
      //   "Having gone through a journey where the use of Technology is never separate from a drive towards creating meaningful, educational product for others, I am now thrilled at the prospect of being a Software Engineer Intern at OpenSesame. I want to use this opportunity to deepen my skills in Software Engineer, and collaborate with like-minded developers in a fast-paced, innovative environment with an eye towards tangible outcomes!",
    },
    type: "skills",
  },
  {
    id: "skills-3",
    position: { x: 590, y: 2500 },
    data: {
      name: "Backend",
      list: [
        {
          name: "GraphQL",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/graphql/graphql-plain.svg",
        },
        {
          name: "FastAPI",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg",
        },
        {
          name: "PostgreSQL",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
        },
        {
          name: "MySQL",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
        },
        {
          name: "Sequelize",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sequelize/sequelize-original.svg",
        },
        {
          name: "Prisma",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg",
        },
        {
          name: "Express",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
        },
        {
          name: "Supabase",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg",
        },
      ],
    },
    type: "skills",
  },
  {
    id: "skills-4",
    position: { x: 1100, y: 2640 },
    data: {
      name: "AI/ML",
      list: [
        {
          name: "OpenAI SDK",
          logo: "https://cdn.brandfetch.io/idR3duQxYl/theme/dark/symbol.svg?c=1bxid64Mup7aczewSAYMX&t=1749527471692",
        },
        {
          name: "DeepSeek SDK",
          logo: "https://cdn.brandfetch.io/idC_7w82en/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1766410489146",
        },
        {
          name: "Pandas",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg",
        },
        {
          name: "NumPy",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg",
        },
        {
          name: "Scikit-learn",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg",
        },
        {
          name: "TensorFlow",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg",
        },
        {
          name: "Jupyter",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jupyter/jupyter-original.svg",
        },
      ],
    },
    type: "skills",
  },
  {
    id: "skills-5",
    position: { x: 1600, y: 2300 },
    data: {
      name: "CI/CD",
      list: [
        {
          name: "AWS",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jupyter/jupyter-original.svg",
        },
        {
          name: "Docker",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
        },
        {
          name: "Terraform",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/terraform/terraform-original.svg",
        },
        {
          name: "Kubernetes",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-original.svg",
        },
      ],
    },
    type: "skills",
  },
  {
    id: "skills-6",
    position: { x: 1570, y: 2850 },
    data: {
      name: "Others",
      list: [
        {
          name: "Vietnamese (fluent)",
          logo: "https://catamphetamine.gitlab.io/country-flag-icons/3x2/VN.svg",
        },
        {
          name: "English (fluent)",
          logo: "https://catamphetamine.gitlab.io/country-flag-icons/3x2/US2.svg",
        },
        {
          name: "Chinese (proficient)",
          logo: "https://catamphetamine.gitlab.io/country-flag-icons/3x2/CN.svg",
        },
        {
          name: "Spanish (proficient)",
          logo: "https://catamphetamine.gitlab.io/country-flag-icons/3x2/MX.svg",
        },
      ],
    },
    type: "skills",
  },
  {
    id: "country-1",
    position: { x: -260, y: 4000 },
    data: {
      name: "Vietnam",
      map: "/vn.svg",
      img: "https://ghiinqdxtvecsscabqyl.supabase.co/storage/v1/object/sign/opensesame-media/vn2.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9kMzY0ZThjZC1hOTRjLTQwODktOGI0Ni04MGE2Yzg5MTY4MTciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJvcGVuc2VzYW1lLW1lZGlhL3ZuMi5qcGVnIiwiaWF0IjoxNzcxNjEwOTA2LCJleHAiOjE4MDMxNDY5MDZ9.koLc1Rw0ZechlT68YHbl0KhkIkaoUqGNkMn5e70FZyY",
      caption: "Organizing a community film screening in Hanoi",
    },
    type: "country",
  },
  {
    id: "country-2",
    position: { x: -150, y: 3100 },
    data: {
      name: "Japan",
      map: "/jp.svg",
      img: "https://ghiinqdxtvecsscabqyl.supabase.co/storage/v1/object/sign/opensesame-media/jp2.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9kMzY0ZThjZC1hOTRjLTQwODktOGI0Ni04MGE2Yzg5MTY4MTciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJvcGVuc2VzYW1lLW1lZGlhL2pwMi5qcGciLCJpYXQiOjE3NzE2MTA5MTcsImV4cCI6MTgwMzE0NjkxN30.mmGPObtccZX-EOnfIqz_s8Qk4zwMLHqHaL4JwtBWLBk",
      caption:
        "A panel discussion with Akie Abe, the former First Lady of Japan, as part of the Global Citizens Initiative 2019 Summit",
    },
    type: "country",
  },
  {
    id: "country-3",
    position: { x: 400, y: 4000 },
    data: {
      name: "India",
      map: "/in.svg",
      img: "https://ghiinqdxtvecsscabqyl.supabase.co/storage/v1/object/sign/opensesame-media/in2.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9kMzY0ZThjZC1hOTRjLTQwODktOGI0Ni04MGE2Yzg5MTY4MTciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJvcGVuc2VzYW1lLW1lZGlhL2luMi5qcGVnIiwiaWF0IjoxNzcxNjEwOTI3LCJleHAiOjE4MDMxNDY5Mjd9.1Y6QW67vJHU_2dTVt1KCoR8inXgFFE2nWB_BqrKqDXc",
      caption:
        "A student-led Fire and Rescue Service fitness training session, on the campus on Mahindra United World College",
    },
    type: "country",
  },
  {
    id: "country-4",
    position: { x: 420, y: 3500 },
    data: {
      name: "Mexico",
      map: "/mx.svg",
      img: "https://ghiinqdxtvecsscabqyl.supabase.co/storage/v1/object/sign/opensesame-media/mx2.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9kMzY0ZThjZC1hOTRjLTQwODktOGI0Ni04MGE2Yzg5MTY4MTciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJvcGVuc2VzYW1lLW1lZGlhL214Mi5qcGVnIiwiaWF0IjoxNzcxNjEwOTM3LCJleHAiOjE4MDMxNDY5Mzd9.jTgXWmwRL8J0gtEDTtO6YnA1gEi5Vf589Skvnhbry2A",
      caption:
        "A field trip to Tixkokob, Yucatan, Mexico, as part of a Swarthmore College-funded summer research on the microhistory of Korean immigrants to Mexico the early 1900s",
    },
    type: "country",
  },
  {
    id: "country-5",
    position: { x: -180, y: 3700 },
    data: {
      name: "USA",
      map: "/us2.svg",
      img: "https://ghiinqdxtvecsscabqyl.supabase.co/storage/v1/object/sign/opensesame-media/us2.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9kMzY0ZThjZC1hOTRjLTQwODktOGI0Ni04MGE2Yzg5MTY4MTciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJvcGVuc2VzYW1lLW1lZGlhL3VzMi5qcGVnIiwiaWF0IjoxNzcxNjEwOTUyLCJleHAiOjE4MDMxNDY5NTJ9.TduDiE30re78YF6rbWNxzUAhcNHgjGH9ZS-UsbshOPY",
      caption: "At Swarthmore College's Class of 2025 Commencement",
    },
    type: "country",
  },
]

const initialEdges: Edge[] = [
  { id: "q1-a1", source: "question-1", target: "answer-1", type: "default" },
  { id: "a1-a2", source: "answer-1", target: "answer-2", type: "default" },
  { id: "a2-story1", source: "answer-2", target: "story-1", type: "default" },
  { id: "story1-conn1", source: "story-1", target: "conn-1", type: "default" },
  {
    id: "conn1-strength1",
    source: "conn-1",
    target: "strengths-1",
    type: "default",
  },
  {
    id: "conn1-strength2",
    source: "conn-1",
    target: "strengths-2",
    type: "default",
  },
  {
    id: "conn1-strength3",
    source: "conn-1",
    target: "strengths-3",
    type: "default",
  },
  {
    id: "story1-story2",
    source: "story-1",
    target: "story-2",
    type: "default",
  },
  { id: "story2-conn2", source: "story-2", target: "conn-2", type: "default" },
  {
    id: "conn2-skill1",
    source: "conn-2",
    target: "skills-1",
    type: "default",
  },
  {
    id: "conn2-skill2",
    source: "conn-2",
    target: "skills-2",
    type: "default",
  },
  {
    id: "conn2-skill3",
    source: "conn-2",
    target: "skills-3",
    type: "default",
  },
  {
    id: "conn2-skill4",
    source: "conn-2",
    target: "skills-4",
    type: "default",
  },
  {
    id: "conn2-skill5",
    source: "conn-2",
    target: "skills-5",
    type: "default",
  },
  {
    id: "conn2-skill6",
    source: "conn-2",
    target: "skills-6",
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
    id: "conn3-country1",
    source: "conn-3",
    target: "country-1",
    type: "default",
  },
  {
    id: "conn3-country2",
    source: "conn-3",
    target: "country-2",
    type: "default",
  },
  {
    id: "conn3-country3",
    source: "conn-3",
    target: "country-3",
    type: "default",
  },
  {
    id: "conn3-country4",
    source: "conn-3",
    target: "country-4",
    type: "default",
  },
  {
    id: "conn3-country5",
    source: "conn-3",
    target: "country-5",
    type: "default",
  },
  {
    id: "story3-answer3",
    source: "story-3",
    target: "answer-3",
    type: "default",
  },
]

export default function questionTwo() {
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
          const res = await fetch("/api/nodes?page=question-2")
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
        body: JSON.stringify({ nodes: nodesToSave, pageName: "question-2" }),
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
    </div>
  )
}
