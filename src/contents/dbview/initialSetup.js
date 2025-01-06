const data = [
  {
      "name": "tableName",
      "content": [
          {
              "id": 1724446850293,
              "tableName": "tableName",
              "fieldName": "c1",
              "constraints": [
                  "Primary Key",
                  "Not Null"
              ],
              "foreignKey": {
                  "table": "",
                  "column": ""
              },
              "isConstraintOpen": false
          },
          {
              "id": 1724447377125,
              "tableName": "tableName",
              "fieldName": "c2",
              "constraints": [
                  "Foreign Key"
              ],
              "foreignKey": {
                  "table": "Users",
                  "column": "id"
              },
              "isConstraintOpen": true
          },
          {
              "id": 1724447377125,
              "tableName": "tableName",
              "fieldName": "c2",
              "constraints": [
                  "Foreign Key"
              ],
              "foreignKey": {
                  "table": "Users",
                  "column": "id"
              },
              "isConstraintOpen": true
          },
          {
              "id": 1724447377125,
              "tableName": "tableName",
              "fieldName": "c2",
              "constraints": [
                  "Foreign Key"
              ],
              "foreignKey": {
                  "table": "Users",
                  "column": "id"
              },
              "isConstraintOpen": true
          },
          {
              "id": 1724447377125,
              "tableName": "tableName",
              "fieldName": "c2",
              "constraints": [
                  "Foreign Key"
              ],
              "foreignKey": {
                  "table": "Users",
                  "column": "id"
              },
              "isConstraintOpen": true
          },
          {
              "id": 1724447377125,
              "tableName": "tableName",
              "fieldName": "c2",
              "constraints": [
                  "Foreign Key"
              ],
              "foreignKey": {
                  "table": "Users",
                  "column": "id"
              },
              "isConstraintOpen": true
          },
          {
              "id": 1724447377125,
              "tableName": "tableName",
              "fieldName": "c2",
              "constraints": [
                  "Foreign Key"
              ],
              "foreignKey": {
                  "table": "Users",
                  "column": "id"
              },
              "isConstraintOpen": true
          },
          {
              "id": 1724447377125,
              "tableName": "tableName",
              "fieldName": "c2",
              "constraints": [
                  "Foreign Key"
              ],
              "foreignKey": {
                  "table": "Users",
                  "column": "id"
              },
              "isConstraintOpen": true
          },
      ],
      "position": { x: 300, y: 200 },
  },
  {
      "name": "ahmad",
      "content": [
          {
              "id": 1724447406117,
              "tableName": "ahmad",
              "fieldName": "c1",
              "constraints": [
                  "Primary Key"
              ],
              "foreignKey": {
                  "table": "",
                  "column": ""
              },
              "isConstraintOpen": false
          },
          {
              "id": 1724447974828,
              "tableName": "ahmad",
              "fieldName": "c2",
              "constraints": [
                  "Unique"
              ],
              "foreignKey": {
                  "table": "",
                  "column": ""
              },
              "isConstraintOpen": true
          }
      ],
      position: { x: 100, y: 100 },
  }
];

// Convert data to initialNodes format
const initialNodes = data.map((table, index) => ({
    id: String(index + 1), // Generate a unique id for each node
    type: 'database',
    data: {
      tableName: table.name,
      schemaFields: table.content.map(field => ({
        name: field.fieldName,
        type: field.constraints.join(', ')
      })),
    },
    position: table.position,
}));


const initialEdges = [];
export default initialNodes;
export {initialEdges};