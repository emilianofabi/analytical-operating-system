import React, { useMemo, useState } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  Handle,
  MiniMap,
  MarkerType,
  Position,
  useEdgesState,
  useNodesState
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import {
  fallbackGraph,
  graphEdgeTypes,
  graphEdges,
  graphLayers,
  graphNodeCategories,
  graphNodes
} from './graphData';
import './graphStyles.css';

const categoryLabels = {
  system: 'System',
  module: 'Module',
  lesson: 'Lesson',
  artifact: 'Artifact',
  review: 'Review',
  audit: 'Audit',
  competency: 'Competency',
  prompt: 'Prompt',
  runner: 'Runner',
  rag: 'RAG',
  frontend: 'Frontend',
  governance: 'Governance',
  portfolio: 'Portfolio'
};

const categoryColors = {
  system: '#f2d78d',
  module: '#79b8ff',
  lesson: '#a7e3c4',
  artifact: '#f0b47f',
  review: '#e6a1c7',
  audit: '#c9a84c',
  competency: '#8fd3ff',
  prompt: '#d5b3ff',
  runner: '#f5d36f',
  rag: '#7dd6c7',
  frontend: '#ffb3a7',
  governance: '#c4ccd8',
  portfolio: '#9ae6b4'
};

const nodeTypes = graphNodeCategories.reduce((types, category) => {
  types[category] = AOSGraphNode;
  return types;
}, {});

function AOSGraphNode({ data, selected }) {
  const kind = data?.kind || 'system';

  return (
    <div className={`aos-graph-node aos-graph-node--${kind} ${selected ? 'is-selected' : ''}`}>
      <Handle
        type="target"
        position={Position.Left}
        className="aos-graph-handle aos-graph-handle-target"
        isConnectable={false}
      />
      <div className="aos-graph-node__meta">
        <span>{categoryLabels[kind] || kind}</span>
        <span>{data?.status || 'mapped'}</span>
      </div>
      <div className="aos-graph-node__label">{data?.label || 'Untitled node'}</div>
      <p>{data?.description || 'No description available.'}</p>
      <Handle
        type="source"
        position={Position.Right}
        className="aos-graph-handle aos-graph-handle-source"
        isConnectable={false}
      />
    </div>
  );
}

const buildGraph = () => {
  if (!Array.isArray(graphNodes) || !Array.isArray(graphEdges)) {
    return fallbackGraph;
  }

  const nodeIds = new Set(graphNodes.map((node) => node.id));
  const validEdges = graphEdges.filter((edge) => nodeIds.has(edge.source) && nodeIds.has(edge.target));

  if (graphNodes.length === 0) {
    return fallbackGraph;
  }

  return {
    nodes: graphNodes,
    edges: validEdges
  };
};

const formatRelationship = (type) => type.replaceAll('_', ' ');

const describeDirection = (edge, nodeById) => {
  const sourceLabel = nodeById.get(edge.source)?.data?.label || edge.source;
  const targetLabel = nodeById.get(edge.target)?.data?.label || edge.target;
  return `${sourceLabel} ${edge.label || formatRelationship(edge.type)} ${targetLabel}`;
};

export default function AOSKnowledgeGraph() {
  const graph = useMemo(() => {
    try {
      return buildGraph();
    } catch {
      return fallbackGraph;
    }
  }, []);

  const preparedNodes = useMemo(
    () =>
      graph.nodes.map((node) => ({
        ...node,
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        data: {
          ...node.data,
          kind: node.data?.kind || node.type
        }
      })),
    [graph.nodes]
  );

  const preparedEdges = useMemo(
    () =>
      graph.edges.map((edge) => ({
        ...edge,
        type: 'smoothstep',
        data: {
          relationship: edge.type
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 16,
          height: 16,
          color: '#c9a84c'
        },
        style: {
          stroke: '#c9a84c',
          strokeOpacity: 0.58,
          strokeWidth: 1.5
        },
        labelStyle: {
          fill: '#faf8f5',
          fontSize: 10,
          fontWeight: 600
        },
        labelBgStyle: {
          fill: '#15151d',
          fillOpacity: 0.86
        },
        labelBgPadding: [6, 3],
        labelBgBorderRadius: 4
      })),
    [graph.edges]
  );

  const [nodes, , onNodesChange] = useNodesState(preparedNodes);
  const [edges, , onEdgesChange] = useEdgesState(preparedEdges);
  const [selectedNode, setSelectedNode] = useState(preparedNodes[0] || fallbackGraph.nodes[0]);

  const nodeById = useMemo(
    () => new Map(preparedNodes.map((node) => [node.id, node])),
    [preparedNodes]
  );

  const categoryCounts = useMemo(
    () =>
      preparedNodes.reduce((counts, node) => {
        const kind = node.data?.kind || node.type;
        counts[kind] = (counts[kind] || 0) + 1;
        return counts;
      }, {}),
    [preparedNodes]
  );

  const selectedRelationships = useMemo(() => {
    if (!selectedNode) return [];

    return graph.edges
      .filter((edge) => edge.source === selectedNode.id || edge.target === selectedNode.id)
      .map((edge) => ({
        ...edge,
        direction: edge.source === selectedNode.id ? 'outgoing' : 'incoming',
        peer: edge.source === selectedNode.id ? edge.target : edge.source,
        statement: describeDirection(edge, nodeById)
      }));
  }, [graph.edges, nodeById, selectedNode]);

  return (
    <section className="aos-graph-shell">
      <div className="aos-graph-header">
        <div>
          <h2>Directional Concept Atlas</h2>
          <p>
            A fixed explanatory map of how AOS connects learning foundations, analytical methods, system infrastructure,
            evidence review, and career proof.
          </p>
        </div>
        <div className="aos-graph-stats" aria-label="Graph summary">
          <span>{preparedNodes.length} nodes</span>
          <span>{graph.edges.length} edges</span>
          <span>{graphEdgeTypes.length} edge types</span>
        </div>
      </div>

      <div className="aos-atlas-note" aria-label="Concept atlas explanation">
        <strong>This graph is a fixed concept atlas, not an editable diagram.</strong>
        <span>
          Nodes represent AOS learning domains, system components, evidence artifacts, and career outputs. Edges show
          directional relationships: what grounds, enables, validates, governs, or translates into something else.
        </span>
      </div>

      <div className="aos-layer-strip" aria-label="Conceptual flow layers">
        {graphLayers.map((layer, index) => (
          <React.Fragment key={layer.id}>
            <div className="aos-layer-pill">{layer.label}</div>
            {index < graphLayers.length - 1 && <div className="aos-layer-arrow" aria-hidden="true">-&gt;</div>}
          </React.Fragment>
        ))}
      </div>

      <div className="aos-graph-layout">
        <div className="aos-graph-canvas" aria-label="AOS knowledge graph canvas">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={(_, node) => setSelectedNode(node)}
            onPaneClick={() => setSelectedNode(null)}
            fitView
            fitViewOptions={{ padding: 0.22 }}
            minZoom={0.22}
            maxZoom={1.45}
            nodesDraggable={false}
            nodesConnectable={false}
            elementsSelectable={true}
            connectOnClick={false}
            deleteKeyCode={null}
            selectionKeyCode={null}
            multiSelectionKeyCode={null}
            nodesFocusable={false}
            edgesFocusable={false}
            panOnDrag
            zoomOnScroll
          >
            <Background color="rgba(250, 248, 245, 0.14)" gap={28} size={1} />
            <MiniMap
              className="aos-graph-minimap"
              pannable
              zoomable
              nodeColor={(node) => categoryColors[node.data?.kind || node.type] || '#c9a84c'}
              nodeStrokeWidth={3}
              maskColor="rgba(13, 13, 18, 0.74)"
            />
            <Controls className="aos-graph-controls" showInteractive={false} />
          </ReactFlow>
        </div>

        <aside className="aos-graph-inspector" aria-label="Selected graph node details">
          {selectedNode ? (
            <>
              <div className="aos-inspector-kicker">
                <span>{categoryLabels[selectedNode.data?.kind] || selectedNode.data?.kind}</span>
                <span>{selectedNode.data?.status || 'mapped'}</span>
              </div>
              <h3>{selectedNode.data?.label}</h3>
              <p>{selectedNode.data?.description}</p>

              <div className="aos-inspector-block">
                <span>Atlas Role</span>
                <p className="aos-educational-copy">
                  This node is a fixed point in the AOS map. Its value comes from the incoming and outgoing relations
                  that explain what it depends on and what it makes possible.
                </p>
              </div>

              <div className="aos-inspector-block">
                <span>Path</span>
                <code>{selectedNode.data?.path || 'not mapped'}</code>
              </div>

              <div className="aos-inspector-block">
                <span>Relationships</span>
                {selectedRelationships.length > 0 ? (
                  <div className="aos-relationship-list">
                    {selectedRelationships.map((edge) => (
                      <div key={edge.id} className="aos-relationship">
                        <strong>{edge.direction === 'outgoing' ? 'enables' : 'depends on'}</strong>
                        <span>{edge.statement}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="aos-empty-copy">No mapped relationships for this node.</p>
                )}
              </div>
            </>
          ) : (
            <div className="aos-empty-state">
              <h3>No node selected</h3>
              <p>Select a node to inspect its purpose, path, status, and mapped relationships.</p>
            </div>
          )}

          <div className="aos-legend" aria-label="Node category legend">
            {graphNodeCategories.map((category) => (
              <div key={category} className="aos-legend-item">
                <span style={{ backgroundColor: categoryColors[category] }} />
                <span>{categoryLabels[category]}</span>
                <strong>{categoryCounts[category] || 0}</strong>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
