import Image from "next/image";
import { NodeProps, Handle, Position } from "reactflow";

export function Agents(props: NodeProps) {
  return (
    <div className="border border-violet-500 w-[100px] h-[100px] rounded-full bg-[url('https://media.valorant-api.com/agents/dade69b4-4f5a-8528-247b-219e5a1facd6/displayicon.png')] bg-cover">
      <Handle id="right" type="source" position={Position.Right} />
      <Handle id="left" type="source" position={Position.Left} />
    </div>
  );
}