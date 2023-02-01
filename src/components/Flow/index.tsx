import { useCallback } from 'react';
import ReactFlow, { Controls, Background, Node, ConnectionMode, useEdgesState, Connection, addEdge, useNodesState, ReactFlowProvider } from 'reactflow';
import 'reactflow/dist/style.css';
import { Agents } from '../nodes/Agents';
import { Maps } from '../nodes/Maps';
import * as Toolbar from '@radix-ui/react-toolbar';
import { v4 as uuidv4 } from 'uuid'


const NODE_TYPES = {
  agents: Agents,
  maps: Maps
}

const INITIAL_NODES = [
  {
    id: uuidv4(),
    type: 'maps',
    position: { x: 250, y: 250 },
    data: {}
  }

]satisfies Node[]

function Flow() {

  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [nodes, setNodes, onNodesChange] = useNodesState(INITIAL_NODES);

  const onConnect = useCallback((connection: Connection) => {
    return setEdges(edges => addEdge(connection, edges))
  }, [])

  function addAgentNode() {
    setNodes(nodes => [...nodes, {
      id: uuidv4(),
      type: 'agents',
      position: { x: 250, y: 300 },
      data: {}

    }])
  }

  function removeAgentNode() {
    setNodes(nodes => nodes.filter(node => node.id !== node.id))
  }

  return (
    <div style={{ height: '100%' }}>
      <ReactFlowProvider>
        <ReactFlow
          nodeTypes={NODE_TYPES}
          nodes={nodes}
          edges={edges}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodesChange={onNodesChange}
          connectionMode={ConnectionMode.Loose}
        >
          <Background className='' />
          <div>

          </div>
          <Controls />
        </ReactFlow>

        <Toolbar.Root className='fixed bottom-20 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-lg border border-zinc-300 px-8 h-20 w-96 overflow-hidden'>
          <Toolbar.Button
            onDoubleClick={removeAgentNode}
            onClick={addAgentNode}
            className='w-20 h-20 border border-violet-500  rounded-full mt-6 transition-transform hover:-translate-y-2 bg-[url("https://media.valorant-api.com/agents/dade69b4-4f5a-8528-247b-219e5a1facd6/displayicon.png")] bg-cover' />
        </Toolbar.Root>
      </ReactFlowProvider>
    </div>
  );
}

export default Flow;
