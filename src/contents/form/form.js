import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiAddLargeFill } from "react-icons/ri";
import TableCheck from './mockTables';
import './form.css'; // Import your CSS file for styling

const sqlDataTypes = [
  'SMALLINT', 'INTEGER', 'BIGINT', 'DECIMAL', 'NUMERIC', 'REAL', 'DOUBLE PRECISION', 'SERIAL', 'BIGSERIAL', 'CHAR', 'VARCHAR', 'TEXT', 'BYTEA',
  'DATE', 'TIME', 'TIMESTAMP', 'TIMESTAMPTZ', 'INTERVAL', 'BOOLEAN', 'ENUM', 'JSON', 'JSONB', 'ARRAY', 'UUID', 'GEOMETRY', 'CIDR', 'INET', 'MACADDR',
  'TSVECTOR', 'TSQUERY'
];

const constraints = [
  'none', 'Primary Key', 'Foreign Key', 'Unique', 'Not Null', 'Check', 'Default', 'Index', 'Unique Key', 'Auto-Increment', 'Composite Key', 'Exclusion'
];

const mockTables = [
  { name: 'Users', columns: ['id', 'username', 'email'] },
  { name: 'Orders', columns: ['order_id', 'user_id', 'amount'] },
];

const FormField = ({ index, dataType, handleRemove, constraints, handleConstraintChange, handleForeignKeyChange, handleFeildName, field, constraintBtn, togglesConstraintBtn }) => (
  <div className='form-field'>
    <input
      type="text"
      placeholder="Column Name"
      className='input-field'
      onChange={(e) => handleFeildName(index, e.target.value)}
      value={field.fieldName}
    />
    <select className='select-field'>
      {dataType.map((type, idx) => (
        <option key={idx} value={type}>{type}</option>
      ))}
    </select>

    <button className='constraint-Btn' onClick={() => togglesConstraintBtn(index)}>constraints</button>
    {field.isConstraintOpen && (
      <select
        multiple
        className='constraint-field'
        onChange={(e) => handleConstraintChange(index, Array.from(e.target.selectedOptions, option => option.value))}
        value={field.constraints}
      >
        {constraints.map((constraint, idx) => (
          <option key={idx} value={constraint}>{constraint}</option>
        ))}
      </select> 
    )}

    {field.constraints.includes('Foreign Key') && (
      <>
        <select
          className='select-field foreign-attributes'
          onChange={(e) => handleForeignKeyChange(index, 'table', e.target.value)}
          value={field.foreignKey.table}
        >
          <option value="">Select Table</option>
          {mockTables.map((table, idx) => (
            <option key={`${index}-table-${idx}`} value={table.name}>{table.name}</option>
          ))}
        </select>
        <select
          className='select-field foreign-attributes'
          onChange={(e) => handleForeignKeyChange(index, 'column', e.target.value)}
          value={field.foreignKey.column}
        >
          <option value="">Select Column</option>
          {mockTables.flatMap((table, idx) => (
            table.columns.map((column, colIdx) => (
              <option key={`${index}-column-${idx}-${colIdx}`} value={column}>{column}</option>
            ))
          ))}
        </select>
      </>
    )}

    <button type="button" className='remove-btn' onClick={() => handleRemove(index)}>Remove</button>
  </div>
);

const TableCreationForm = () => {
  const [fields, setFields] = useState([{ id: Date.now(), tableName: '', fieldName: '', constraints: [], foreignKey: { table: '', column: '' }, isConstraintOpen: false }]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [tableName, setTableName] = useState('');
  const [tables, setTables] = useState([]);

  const addField = () => {
    setFields([...fields, { id: Date.now(), tableName: '', fieldName: '', constraints: [], foreignKey: { table: '', column: '' }, isConstraintOpen: false }]);
  };

  const toggleForm = () => {
    setIsFormOpen(true);
  };

  const removeField = (index) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const handleFeildName = (index, fieldName) => {
    const newFields = [...fields];
    newFields[index].fieldName = fieldName;
    setFields(newFields);
  };

  const handleConstraintChange = (index, selectedConstraints) => {
    const newFields = [...fields];
    newFields[index].constraints = selectedConstraints;

    // Reset foreign key if not selected
    if (!selectedConstraints.includes('Foreign Key')) {
      newFields[index].foreignKey = { table: '', column: '' };
    }
    setFields(newFields);
  };

  const handleForeignKeyChange = (index, key, value) => {
    const newFields = [...fields];
    newFields[index].foreignKey[key] = value;
    setFields(newFields);
  };

  const handleTableNameChange = (e) => {
    setTableName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted');
  };

//   const createTable = (e) => {
//     e.preventDefault();
    
//     if (tableName.trim() === '') {
//         alert('Please enter a table name.');
//         return;
//     }

//     // Update fields with the table name
//     const updatedFields = fields.map(field => ({
//         ...field,
//         tableName: tableName
//     }));

//     // Add the table to the list of tables
//     setTables(prevTables => {
//         const newTables = [...prevTables, { name: tableName, content: updatedFields }];
//         console.log('Tables:', newTables); // Log updated tables after setting
//         console.log('Fields:', updatedFields); // Log updated fields
//         return newTables;
//     });

//     // Reset form state
//     setIsFormOpen(false);
//     setTableName('');
//     setFields([{ id: Date.now(), tableName: '', fieldName: '', constraints: [], foreignKey: { table: '', column: '' }, isConstraintOpen: false }]);

// };


const createTable = (e) => {
  e.preventDefault();
  
  if (tableName.trim() === '') {
      alert('Please enter a table name.');
      return;
  }

  // Update fields with the table name
  const updatedFields = fields.map(field => ({
      ...field,
      tableName: tableName
  }));

  // Add the table to the list of tables
  setTables(prevTables => [...prevTables, { name: tableName, content: updatedFields }]);

  // Reset form state
  setIsFormOpen(false);
  setTableName('');
  setFields([{ id: Date.now(), tableName: '', fieldName: '', constraints: [], foreignKey: { table: '', column: '' }, isConstraintOpen: false }]);
};

useEffect(() => {
  console.log('use effect is called');
  console.log('Tables:', tables);
}, [tables]);



  const togglesConstraintBtn = (index) => {
    const newFields = fields.map((field, i) => ({
      ...field,
      isConstraintOpen: i === index ? !field.isConstraintOpen : false
    }));
    setFields(newFields);
    
  };

  return (
    <>
      <div className='collaps-btn'>
        <button className='clps-btn' onClick={toggleForm}><RiAddLargeFill /></button>
      </div>
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            className='form-container'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className='createTable'>Create a Table</h1>
            <input
              type="text"
              placeholder="Table Name"
              value={tableName}
              onChange={handleTableNameChange}
              className='input-field table-name-input'
            />
            <form className='table-form' onSubmit={handleSubmit}>
              {fields.map((field, index) => (
                <FormField
                  key={field.id}
                  index={index}
                  dataType={sqlDataTypes}
                  constraints={constraints}
                  handleRemove={removeField}
                  handleConstraintChange={handleConstraintChange}
                  handleForeignKeyChange={handleForeignKeyChange}
                  handleFeildName={handleFeildName}
                  field={field}
                  constraintBtn={field.isConstraintOpen}
                  togglesConstraintBtn={togglesConstraintBtn}
                />
              ))}
              <button type="button" className='add-btn' onClick={addField}>Add Field</button>
              <button type="submit" className='submit-btn' onClick={createTable}>Create Table</button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      <TableCheck table={tables} />

    </>
  );
};

export default TableCreationForm;
