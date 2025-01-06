import React, { useCallback, useEffect } from 'react';
import { ReactFlow, Controls, useNodesState, useEdgesState, addEdge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import DatabaseNode from './DatabaseNode'; 

// Define node types
const nodeTypes = { database: DatabaseNode };

const initialEdges = [];

const Mainsect = ({ nodesData }) => {
  // Initialize nodes state, but update when nodesData changes
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Update nodes state when nodesData changes
  useEffect(() => {
    if (nodesData && nodesData.length > 0) {
      setNodes(nodesData); // Update the nodes state
      console.log('Nodes state updated:', nodesData);
    }
  }, [nodesData, setNodes]); // Watch for nodesData changes and the setNodes function

  // Handle new connection (edge)
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const defaultEdgeOptions = { animated: true };

  return (
    <div style={{ height: '100vh' }}>
      <ReactFlow
        nodes={nodes} // Use the updated nodes state
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        defaultEdgeOptions={defaultEdgeOptions}
        nodeTypes={nodeTypes}
      >
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default Mainsect;
