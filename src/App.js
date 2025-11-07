import React, { useCallback, useState, useRef, useEffect } from "react";
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";
import EditableNode from "./EditableNode";
import { sectionTypes } from "./sectionConfig";

const nodeTypes = { editableNode: EditableNode };

const initialNodes = [
  {
    id: "1",
    type: "editableNode",
    position: { x: 100, y: 100 },
    data: { label: "Double-click to edit", section: "horizon-scanning" },
  },
];
const initialEdges = [];

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const addNode = (sectionType) => {
    setNodes((nds) => [
      ...nds,
      {
        id: `${nds.length + 1}`,
        type: "editableNode",
        position: { x: 150 + nds.length * 30, y: 150 + nds.length * 20 },
        data: {
          label: `New ${sectionTypes[sectionType].label} Card`,
          section: sectionType,
        },
      },
    ]);
    setDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Toolbar */}
      <div
        style={{
          padding: 15,
          background: "#f5f5f5",
          borderBottom: "1px solid #ddd",
          display: "flex",
          gap: 10,
        }}
      >
        {/* Dropdown Container */}
        <div style={{ position: "relative" }} ref={dropdownRef}>
          {/* Pill-shaped Button */}
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            style={{
              padding: "8px 20px",
              background: "white",
              color: "#4B5563",
              border: "1px solid #4B5563",
              borderRadius: 20,
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              gap: 6,
              boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "#F9FAFB";
              e.target.style.boxShadow = "0 2px 6px rgba(0,0,0,0.1)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "white";
              e.target.style.boxShadow = "0 2px 4px rgba(0,0,0,0.05)";
            }}
          >
            <span style={{ fontSize: "16px", fontWeight: "bold" }}>+</span>
            New
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                marginTop: 8,
                background: "white",
                border: "1px solid #ddd",
                borderRadius: 8,
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                minWidth: 200,
                zIndex: 1000,
                overflow: "hidden",
              }}
            >
              {Object.entries(sectionTypes).map(([key, section]) => (
                <button
                  key={key}
                  onClick={() => addNode(key)}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    background: "white",
                    border: "none",
                    borderBottom: "1px solid #f0f0f0",
                    cursor: "pointer",
                    fontSize: "14px",
                    textAlign: "left",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) => (e.target.style.background = "#f9fafb")}
                  onMouseLeave={(e) => (e.target.style.background = "white")}
                >
                  <div
                    style={{
                      width: 16,
                      height: 16,
                      borderRadius: 3,
                      background: section.color,
                      border: "1px solid #ddd",
                    }}
                  />
                  {section.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* React Flow Canvas */}
      <div style={{ flex: 1 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
        >
          <MiniMap />
          <Controls />
          <Background variant="dots" />
        </ReactFlow>
      </div>
    </div>
  );
}

export default App;
