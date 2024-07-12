import React, { useState, useEffect } from 'react';
import { Stage, Layer, Line, Circle, Text } from 'react-konva';
import './Canvas.css';

const Canvas = () => {
  const [vertices, setVertices] = useState([]);
  const [edges, setEdges] = useState([]);
  const [diagonals, setDiagonals] = useState([]);
  const [polygonComplete, setPolygonComplete] = useState(false);
  const [diagonalsComplete, setDiagonalsComplete] = useState(false);
  const [inputVisible, setInputVisible] = useState(false);
  const [selectedLine, setSelectedLine] = useState(null);
  const [edgeLengths, setEdgeLengths] = useState([]); // Initialize as empty array
  const [diagonalLengths, setDiagonalLengths] = useState([]); // Initialize as empty array  
  
  const [sideLengths, setSideLengths] = useState([]);
  const [message, setMessage] = useState('');
  const [activeVertex, setActiveVertex] = useState(null);
  const [unit, setUnit] = useState('feet');

  const requiredDiagonals = vertices.length - 3;

  const handleCanvasClick = (event) => {
    if (polygonComplete) return;
  
    const { offsetX, offsetY } = event.evt;
  
    // Check if the new vertex intersects with any existing edges
    if (vertices.length >= 2) {
      const newEdge = { start: vertices[vertices.length - 1], end: { x: offsetX, y: offsetY } };
      for (const edge of edges) {
        if (intersects(newEdge.start, newEdge.end, edge.start, edge.end)) {
          setMessage('Edges of the polygon cannot intersect. Try again.');
          return;
        }
      }
    }
  
    // Check if the new vertex is close to the first vertex to complete the polygon
    if (vertices.length < 2 || !isCloseToFirstVertex(offsetX, offsetY)) {
      setVertices([...vertices, { x: offsetX, y: offsetY }]);
      if (vertices.length > 0) {
        setEdges([...edges, { start: vertices[vertices.length - 1], end: { x: offsetX, y: offsetY } }]);
      }
    } else {
      setEdges([...edges, { start: vertices[vertices.length - 1], end: vertices[0] }]);
      setPolygonComplete(true);
      setMessage('Polygon complete! Now draw diagonals to form triangles.');
    }
  };
  const isCloseToFirstVertex = (x, y) => {
    if (vertices.length === 0) return false;
    const distance = Math.sqrt(Math.pow(x - vertices[0].x, 2) + Math.pow(y - vertices[0].y, 2));
    return distance < 10;
  };

  const handleVertexClick = (index) => {
    if (!polygonComplete || diagonalsComplete) return;

    if (activeVertex === null) {
      setActiveVertex(index);
    } else {
      if (activeVertex !== index && !areAdjacent(activeVertex, index)) {
        handleDiagonalClick(activeVertex, index);
      }
      setActiveVertex(null);
    }
  };

  const areAdjacent = (index1, index2) => {
    const length = vertices.length;
    return (
      Math.abs(index1 - index2) === 1 ||
      Math.abs(index1 - index2) === length - 1
    );
  };

  const handleDiagonalClick = (startIndex, endIndex) => {
    if (diagonalsComplete) return;

    // Check if the diagonal already exists or intersects with existing diagonals
    if (diagonals.some(d => (d.start === startIndex && d.end === endIndex) || (d.start === endIndex && d.end === startIndex))) {
      return;
    }

    const newDiagonal = { start: startIndex, end: endIndex };

    // Check for intersections with existing diagonals
    for (const diagonal of diagonals) {
      if (intersects(vertices[diagonal.start], vertices[diagonal.end], vertices[newDiagonal.start], vertices[newDiagonal.end])) {
        setMessage('Diagonals cannot intersect. Try again.');
        return;
      }
    }

    // Update diagonals state using the state updater function
    setDiagonals(prevDiagonals => [...prevDiagonals, newDiagonal]);

    setSideLengths(prevLengths => [...prevLengths, null]);
    // Initialize the length of diagonal in diagonalLengths array
    // setDiagonalLengths(prevLengths => [...prevLengths, null]);

    // Calculate the number of required diagonals (vertices.length - 3)
    const requiredDiagonals = vertices.length - 3;

    // Check if all required diagonals have been drawn
    if (diagonals.length + 1 === requiredDiagonals) {
      setDiagonalsComplete(true);
      setMessage('All diagonals complete! Now double-click edges to input lengths.');
    }
  };

  const intersects = (A, B, C, D) => {
    const ccw = (P, Q, R) => (R.y - P.y) * (Q.x - P.x) > (Q.y - P.y) * (R.x - P.x);
    return ccw(A, C, D) !== ccw(B, C, D) && ccw(A, B, C) !== ccw(A, B, D);
  };

  const handleLineClick = (index) => {
    if (!diagonalsComplete) return;
  
    // Check if the clicked line is within the bounds of what you want to allow input for
    if (index < edges.length + requiredDiagonals || (index >= edges.length && index < edges.length + requiredDiagonals)) {
      setSelectedLine(index);
      setInputVisible(true);
      if (index < edges.length ) {
        setMessage(`Enter length for Edge ${index + 1}.`);
      } else {
        setMessage(`Enter length for Diagonal ${index - edges.length + 1}.`);
      }
    } else {
      // Optionally, you can provide a message indicating why input is not allowed
      setMessage('Input length is not allowed for this line.');
    }
  };
  

  const handleInputChange = (event) => {
    const { value } = event.target;
  
    if (selectedLine !== null) {
      if (selectedLine < edges.length ) {
        // Update edge length
        setEdgeLengths(prevLengths => {
          const updatedLengths = [...prevLengths];
          updatedLengths[selectedLine] = parseFloat(value);
          return updatedLengths;
        });
      } else {
        // Update diagonal length
        const diagonalIndex = selectedLine - edges.length;
        const diagonal = diagonals[diagonalIndex];
        const startVertex = vertices[diagonal.start];
        const endVertex = vertices[diagonal.end];
  
        // Check geometric validity of the diagonal
        if (!isGeometricallyValid(startVertex, endVertex, parseFloat(value))) {
          setMessage('Diagonal length is not geometrically valid. Please enter a valid length.');
          return;
        } else {
          setMessage('');
        }
  
        setDiagonalLengths(prevLengths => {
          const updatedLengths = [...prevLengths];
          updatedLengths[diagonalIndex] = parseFloat(value);
          return updatedLengths;
        });
      }
    }
  };
  
  

  

  const handleInputSubmit = () => {
    setInputVisible(false);
    setSelectedLine(null);
  };

  const handleUnitChange = (event) => {
    setUnit(event.target.value);
  };

  const calculateArea = () => {
    if (!polygonComplete || !diagonalsComplete) return;

    let area = 0;
    
    // Calculate area based on edge lengths
    for (let i = 0; i < edges.length; i++) {
      const edge = edges[i];
      const length = edgeLengths[i];
      if (!length) {
        setMessage('Please input lengths for all sides (edges and diagonals).');
        return;
      }
      area += length * edgeLength(edge);
    }

    // Calculate area based on triangle formed by diagonals
    for (let j = 0; j < diagonals.length; j++) {
      const diagonal = diagonals[j];
      const length = diagonalLengths[j];
      if (length) {
        // Check if the triangle formed by the diagonal is geometrically valid
        if (isGeometricallyValid(vertices[diagonal.start], vertices[diagonal.end], length)) {
          // Implement calculation of triangle area based on diagonal and known lengths
          // For simplicity, let's assume a function to calculate triangle area
          const triangleArea = calculateTriangleArea(vertices[diagonal.start], vertices[diagonal.end], length);
          area += triangleArea;
        } else {
          setMessage('Triangle not formed geometrically. Length of diagonal is invalid.');
          return;
        }
      }
    }

    setMessage(`Total Area: ${area.toFixed(2)} ${unit === 'feet' ? 'sq feet' : 'sq meters'}`);
  };

  const isGeometricallyValid = (vertex1, vertex2, diagonalLength) => {
    // Implement your logic to check if the diagonal forms a valid triangle
    // This is a placeholder, you should implement based on your geometric conditions
    // For example, check if the length satisfies the triangle inequality theorem
    return true; // Placeholder for now
  };

  const calculateTriangleArea = (vertex1, vertex2, diagonalLength) => {
    // Implement calculation of triangle area based on vertices and diagonal length
    // This is a placeholder, you should implement the actual calculation
    return 0; // Placeholder for now
  };

  const edgeLength = (edge) => {
    const { start, end } = edge;
    return Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));
  };

  
  useEffect(() => {
    if (edgeLengths.every(length => length !== null) && diagonalLengths.every(length => length !== null)) {
      calculateArea();
    }
  }, [edgeLengths, diagonalLengths]);

  const drawLines = (lines, color) => {
    return lines.map((line, index) => (
      <React.Fragment key={index}>
        <Line
          points={[line.start.x, line.start.y, line.end.x, line.end.y]}
          stroke={color}
          strokeWidth={6}
          onClick={() => handleLineClick(index)}
        />
        {index < edges.length && edgeLengths[index] !== undefined && (
          <Text
            x={(line.start.x + line.end.x) / 2}
            y={(line.start.y + line.end.y) / 2}
            text={edgeLengths[index] !== null ? edgeLengths[index].toFixed(2) : ''}
          />
        )}
        {index >= edges.length && diagonalLengths[index - edges.length] !== undefined && (
          <Text
            x={(line.start.x + line.end.x) / 2}
            y={(line.start.y + line.end.y) / 2}
            text={diagonalLengths[index - edges.length] !== null ? diagonalLengths[index - edges.length].toFixed(2) : ''}
          />
        )}
      </React.Fragment>
    ));
  };

  return (
    <div className="canvas-container">
      <Stage width={window.innerWidth} height={window.innerHeight / 2} onClick={handleCanvasClick}>
        <Layer>
          {drawLines(edges, 'red')}
          {drawLines(diagonals.map(d => ({ start: vertices[d.start], end: vertices[d.end] })), 'blue')}
          {vertices.map((vertex, index) => (
            <Circle
              key={index}
              x={vertex.x}
              y={vertex.y}
              radius={5}
              fill="black"
              onClick={() => handleVertexClick(index)}
            />
          ))}
        </Layer>
      </Stage>
      <div className="controls">
        <label>
          Unit:
          <select value={unit} onChange={handleUnitChange}>
            <option value="feet">Feet</option>
            <option value="meters">Meters</option>
          </select>
        </label>
        <button onClick={calculateArea} disabled={!polygonComplete || !diagonalsComplete}>
          Calculate Area
        </button>
        {inputVisible && (
          <div className="input-container">
            <input type="number" onChange={handleInputChange} autoFocus />
            <button onClick={handleInputSubmit}>Submit</button>
          </div>
        )}
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default Canvas;

