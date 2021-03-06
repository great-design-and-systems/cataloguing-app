import PropTypes from 'prop-types';
import React from 'react';
import { TableColumn } from './TableColumn';
import { TableEditableColumn } from './TableEditableColumn';
export const TableRow = ({ columns, value, index, columnClass, rowClass, tableName, editable, column, editableIndex }) => {
  const scheme = index % 2 === 0 ? 'even' : 'odd';
  const className = `${scheme} ${rowClass || ''}`;
  return (<tr className={className}>{columns && columns.map(col => {
    return editable && index === editableIndex && col.field === column || value.isNew ?
      <TableEditableColumn tableName={tableName}
        columnClass={columnClass} key={col.field}
        value={value} column={col} />
      : (<TableColumn index={index} tableName={tableName}
        columnClass={columnClass} key={col.field}
        value={value} column={col} />);
  }
  )}</tr>);
};

TableRow.propTypes = {
  column: PropTypes.string,
  editable: PropTypes.bool,
  columns: PropTypes.array.isRequired,
  columnClass: PropTypes.string,
  rowClass: PropTypes.string,
  value: PropTypes.object,
  index: PropTypes.number,
  tableName: PropTypes.string.isRequired,
  editableIndex: PropTypes.number
};
