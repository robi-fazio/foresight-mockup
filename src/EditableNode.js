import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { sectionTypes } from './sectionConfig';

export default function EditableNode({ data, id, selected }) {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(data.label);
  const [functionType, setFunctionType] = useState(null); // 'source', 'prompt', or 'tool'
  
  const sectionType = data.section || 'horizon-scanning';
  const sectionLabel = sectionTypes[sectionType]?.label || 'Horizon Scanning';
  
  const backgroundColor = selected 
    ? 'white' 
    : sectionTypes[sectionType]?.color || '#FFF9C4';
  
  const boxShadow = selected
    ? 'inset 0 2px 4px rgba(0,0,0,0.15)'
    : '0 2px 4px rgba(0,0,0,0.1)';

  const functionTypes = ['Source', 'Prompt', 'Tool'];

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
        boxShadow: boxShadow,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        transition: 'all 0.2s ease'
      }}
      onDoubleClick={() => !functionType && setEdit(true)}
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
      
      {/* Content Area */}
      <div style={{ flex: 1 }}>
        {!functionType ? (
          <>
            {/* Initial editable content */}
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
                  fontSize: '14px',
                  marginBottom: '10px'
                }}
              />
            ) : (
              <div style={{ fontSize: '14px', marginBottom: '10px' }}>{value}</div>
            )}
            
            {/* Function selection pills */}
            <div style={{ 
              display: 'flex', 
              gap: 6,
              flexWrap: 'wrap'
            }}>
              {functionTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setFunctionType(type.toLowerCase())}
                  style={{
                    padding: '4px 12px',
                    fontSize: '11px',
                    fontWeight: '600',
                    background: 'white',
                    border: '1px solid #9CA3AF',
                    borderRadius: 12,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    color: '#4B5563'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#F3F4F6';
                    e.target.style.borderColor = '#6B7280';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'white';
                    e.target.style.borderColor = '#9CA3AF';
                  }}
                >
                  {type}
                </button>
              ))}
            </div>
          </>
        ) : (
          /* Function content window */
          <div style={{
            background: 'rgba(0,0,0,0.4)',
            border: '1px solid #D1D5DB',
            borderRadius: 8,
            padding: 15,
            minHeight: 60,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            fontWeight: '600',
            color: '#374151'
          }}>
            {functionType.charAt(0).toUpperCase() + functionType.slice(1)}
          </div>
        )}
      </div>
    </div>
  );
}
