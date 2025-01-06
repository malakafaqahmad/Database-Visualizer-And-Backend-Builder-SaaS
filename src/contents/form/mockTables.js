import React, { useEffect, useRef } from 'react';
import Mainsect from '../dbview/nodesCalling';

const TableCheck = ({ table }) => {
  const [nodes, setNodes] = React.useState([]); // Updated state name to 'nodes'
  const tableRef = useRef([]); // Ref to store the table object

  useEffect(() => {
    // Update the ref with the latest table value
    tableRef.current = table;

    // Convert table data to initialNodes format
    const initialNodes = table.map((tbl, index) => ({
      id: String(index + 1), // Generate a unique id for each node
      type: 'database', // Assuming database type for nodes
      data: {
        tableName: tbl.name,
        schemaFields: tbl.content.map(field => ({
          name: field.fieldName,
          type: field.constraints.join(', '),
        })),
      },
      position: tbl.position || { x: 0, y: 0 }, // Default position if not provided
    }));

    // Set the nodes state with initialNodes
    setNodes(initialNodes);

    // Log the updated tableRef and initialNodes to the console
    console.log('Table updated in ref:', tableRef.current);
    console.log('Initial nodes are:', initialNodes);
  }, [table]);

  return (
    <div>
      {/* Pass the nodes to Mainsect component as 'nodesData' */}
      <Mainsect nodesData={nodes} />
    </div>
  );
};

export default TableCheck;