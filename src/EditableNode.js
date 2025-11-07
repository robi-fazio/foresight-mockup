import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { sectionTypes } from './sectionConfig';

export default function EditableNode({ data, id }) {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(data.label);
  
  const sectionType = data.section || 'horizon-scanning';
  const backgroundColor = sectionTypes[sectionType]?.color || '#FFF9C4';
  const sectionLabel = sectionTypes[sectionType]?.label || 'Horizon Scanning';

  return (
    <div
      style={{ 
        background: backgroundColor,
        padding: 15,
        borderRadius: 8,
        minWidth: 180,
        minHeight: 80,
        border: '1px solid #ccc',
        position: 'relative',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        gap: 8
      }}
      onDoubleClick={() => setEdit(true)}
    >
      {/* Section badge */}
      <div style={{
        fontSize: '10px',
        color: '#666',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
      }}>
        {sectionLabel}
      </div>

      {/* Left handle */}
      <Handle 
        type="target" 
        position={Position.Left}
        id="left"
        style={{ top: '25%' }}
      />
      
      {/* Right handle */}
      <Handle 
        type="source" 
        position={Position.Right}
        id="right"
        style={{ top: '25%' }}
      />
      
      {/* Editable content */}
      <div style={{ flex: 1 }}>
        {edit ? (
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={() => setEdit(false)}
            autoFocus
            style={{ 
              width: '100%', 
              border: 'none', 
              outline: 'none',
              background: 'transparent',
              fontSize: '14px'
            }}
          />
        ) : (
          <div style={{ fontSize: '14px' }}>{value}</div>
        )}
      </div>
    </div>
  );
}
