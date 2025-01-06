const data = [
    {
        "name": "tableName",
        "content": [
            {
                "id": 1724446850293,
                "tableName": "tableName",
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
            }
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
]

// Log everything
data.forEach(table => {
    console.log(`Table Name: ${table.name}`);
    table.content.forEach(field => {
        console.log(`Field ID: ${field.id}`);
        console.log(`Field Name: ${field.fieldName}`);
        console.log(`Constraints: ${field.constraints.join(', ')}`);
        console.log(`Foreign Key Table: ${field.foreignKey.table}`);
        console.log(`Foreign Key Column: ${field.foreignKey.column}`);
        console.log(`Is Constraint Open: ${field.isConstraintOpen}`);
    });
});
