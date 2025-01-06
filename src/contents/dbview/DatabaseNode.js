// src/DatabaseNode.js
import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Box, Text, Flex, Button} from "@chakra-ui/react";
import { FiEdit } from "react-icons/fi";
import './DatabaseNode.css'
const DatabaseNode = ({ data }) => {
  return (
    <Box borderRadius="8px" minWidth="250px" borderWidth="1px" borderColor="#3d5787" bg="gray.800" color="white">
      <Box className='boxreg' p={2} textAlign="center" borderRadius="8px 8px 0 0" bg="#3d5787">
        <Text className='table-name' fontWeight="bold">{data.tableName}</Text>
        <Button className='addBtn'> <FiEdit /> </Button>
      </Box>
      <Box>
        {data.schemaFields.map((field, index) => (
          <Flex
            key={index}
            _even={{ bg: "#282828" }}
            _odd={{ bg: "#232323" }}
            justifyContent="space-between"
            p={2}
          >
            <Text>{field.name}</Text>
            <Text>{field.type}</Text>
          </Flex>
        ))}
      </Box>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </Box>
  );
};

export default DatabaseNode;
