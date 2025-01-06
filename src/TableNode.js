import React from 'react';
import { Node } from '@xyflow/react';
import { Card, CardContent, Typography, List, ListItem, ListItemText } from '@mui/material';

function TableNode({ data }) {
  return (
    <Card variant="outlined" style={{ width: 200 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {data.label}
        </Typography>
        <List>
          {data.columns.map((col, index) => (
            <ListItem key={index}>
              <ListItemText primary={col} />
            </ListItem>
          ))}
        </List>
      </CardContent>
      <Node.Handle type="target" position="top" />
      <Node.Handle type="source" position="bottom" />
    </Card>
  );
}

export default TableNode;
