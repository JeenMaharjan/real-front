import React, { useState, useEffect } from 'react';
import { Stage, Layer, Line, Circle, Text } from 'react-konva';
import './Canvas.css';

const Canvas = () => {
  const [vertices, setVertices] = useState([]);
  const [edges, setEdges] = useState([]);
  const [logMessages, setLogMessages] = useState([]);
  const [diagonals, setDiagonals] = useState([]);
  const [triangles, setTriangles] = useState([]);
  const [polygonComplete, setPolygonComplete] = useState(false);
  const [diagonalsComplete, setDiagonalsComplete] = useState(false);
  const [inputVisible, setInputVisible] = useState(false);
  const [selectedLine, setSelectedLine] = useState(null);
  const [edgeLengths, setEdgeLengths] = useState([]);
  const [diagonalLengths, setDiagonalLengths] = useState([]);
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
      // Close the polygon
      setEdges([...edges, { start: vertices[vertices.length - 1], end: vertices[0] }]);
      setPolygonComplete(true);

      // If it's a triangle, allow input for its sides
      if (vertices.length === 3) {
        setMessage('Polygon complete! Enter the values for the sides of the triangle.');
        setDiagonalsComplete(true);
      } else {
        setMessage('Polygon complete! Now draw diagonals to form triangles.');
      }
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
    if (diagonals.some(d => (d.start.x === vertices[startIndex].x && d.start.y === vertices[startIndex].y && d.end.x === vertices[endIndex].x && d.end.y === vertices[endIndex].y) || (d.start.x === vertices[endIndex].x && d.start.y === vertices[endIndex].y && d.end.x === vertices[startIndex].x && d.end.y === vertices[startIndex].y))) {
      return;
    }

    const newDiagonal = { start: vertices[startIndex], end: vertices[endIndex] };

    // Check for intersections with existing diagonals
    for (const diagonal of diagonals) {
      if (intersects(diagonal.start, diagonal.end, newDiagonal.start, newDiagonal.end)) {
        setMessage('Diagonals cannot intersect. Try again.');
        return;
      }
    }

    // Update diagonals state using the state updater function
    setDiagonals(prevDiagonals => [...prevDiagonals, newDiagonal]);

    setSideLengths(prevLengths => [...prevLengths, null]);
    // Initialize the length of diagonal in diagonalLengths array
    setDiagonalLengths(prevLengths => [...prevLengths, null]);

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

  const handleLineClick = (line) => {
    if (!diagonalsComplete) return;

    setLogMessages(prevMessages => [...prevMessages, `Clicked line from (${line.start.x}, ${line.start.y}) to (${line.end.x}, ${line.end.y})`]);

    // Check if the clicked line is an edge or a diagonal based on its presence in the edges array
    const edgeIndex = edges.findIndex(e => e.start === line.start && e.end === line.end);
    const diagonalIndex = diagonals.findIndex(d => d.start.x === line.start.x && d.start.y === line.start.y && d.end.x === line.end.x && d.end.y === line.end.y);

    if (edgeIndex !== -1 || diagonalIndex !== -1) {
      setSelectedLine(line);
      setInputVisible(true);
      if (edgeIndex !== -1) {
        setMessage(`Enter length for side`);
      } else {
        setMessage(`Enter length for Diagonal `);
      }
    } else {
      setMessage('Input length is not allowed for this line.');
    }
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    const newLength = parseFloat(value);
  
    if (selectedLine !== null) {
      const { start, end } = selectedLine;
      const edgeIndex = edges.findIndex(e => e.start === start && e.end === end);
      const diagonalIndex = diagonals.findIndex(d => d.start.x === start.x && d.start.y === start.y && d.end.x === end.x && d.end.y === end.y);
  
      let updatedEdgeLengths = [...edgeLengths];
      let updatedDiagonalLengths = [...diagonalLengths];
      let isValidTriangle = true;
  
      if (edgeIndex !== -1) {
        // Update edge length
        updatedEdgeLengths[edgeIndex] = newLength;
      } else if (diagonalIndex !== -1) {
        // Update diagonal length
        updatedDiagonalLengths[diagonalIndex] = newLength;
      }
  
      // Check triangle inequality for all triangles involving the updated line
      const checkTriangleInequality = (lengths) => {
        for (let i = 0; i < lengths.length; i++) {
          for (let j = i + 1; j < lengths.length; j++) {
            for (let k = j + 1; k < lengths.length; k++) {
              const a = lengths[i];
              const b = lengths[j];
              const c = lengths[k];
              if (a + b <= c || a + c <= b || b + c <= a) {
                isValidTriangle = false;
                break;
              }
            }
          }
        }
      };
  
      checkTriangleInequality(updatedEdgeLengths);
      checkTriangleInequality(updatedDiagonalLengths);
  
      if (isValidTriangle) {
        setEdgeLengths(updatedEdgeLengths);
        setDiagonalLengths(updatedDiagonalLengths);
      } else {
        alert("The given lengths do not form a valid triangle. Please enter a valid length.");
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

  const calculateTriangleArea = (a, b, c) => {
    // Use Heron's formula to calculate the area of a triangle given sides a, b, and c
    const s = (a + b + c) / 2;
    return Math.sqrt(s * (s - a) * (s - b) * (s - c));
  };

  const calculateDistance = (point1, point2) => {
    return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
  };

  const isValidTriangle = (a, b, c) => {
    return a + b > c && a + c > b && b + c > a;
  };

  const findTriangles = () => {
    const trianglesList = [];

    // Function to find index of a vertex in vertices array
    const findIndex = (vertex) => vertices.findIndex(v => v.x === vertex.x && v.y === vertex.y);

    // Use a set to track used vertices in diagonals to ensure we don't repeat triangles
    const usedVertices = new Set();

    diagonals.forEach(diagonal => {
      const { start, end } = diagonal;
      const startIndex = findIndex(start);
      const endIndex = findIndex(end);

      if (startIndex !== -1 && endIndex !== -1) {
        // Find adjacent vertices
        const prevVertex = vertices[(startIndex - 1 + vertices.length) % vertices.length];
        const nextVertex = vertices[(endIndex + 1) % vertices.length];

        // Ensure we don't use the same vertex pair twice
        if (!usedVertices.has(`${startIndex}-${endIndex}`)) {
          usedVertices.add(`${startIndex}-${endIndex}`);

          // First triangle
          trianglesList.push([
            { start: vertices[startIndex], end: vertices[endIndex] },
            { start: vertices[endIndex], end: nextVertex },
            { start: nextVertex, end: vertices[startIndex] }
          ]);

          // Second triangle
          trianglesList.push([
            { start: vertices[startIndex], end: vertices[endIndex] },
            { start: vertices[endIndex], end: prevVertex },
            { start: prevVertex, end: vertices[startIndex] }
          ]);
        }
      }
    });

    return trianglesList.slice(0, vertices.length - 2); // Return only required number of triangles
  };
  useEffect(() => {
    setTriangles(findTriangles());
  }, [diagonalsComplete]);

  const calculateArea = () => {
    if (!polygonComplete || (!edges.length && !diagonalsComplete)) {
      setMessage('Please complete the polygon and all diagonals.');
      return;
    }
  
    if (edgeLengths.includes(null) || diagonalLengths.includes(null)) {
      setMessage('Please provide lengths for all edges and diagonals.');
      return;
    }
  
    let totalArea = 0;
    triangles.forEach(triangle => {
      const lengths = triangle.map(line => calculateDistance(line.start, line.end));
      const [a, b, c] = lengths;
      if (isValidTriangle(a, b, c)) {
        totalArea += calculateTriangleArea(a, b, c);
      } else {
        setMessage('Invalid triangle detected. Please check the side lengths.');
      }
    });
  
    setMessage(`Total area of the polygon: ${totalArea.toFixed(2)} square ${unit}`);
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
          strokeWidth={5}
          onClick={() => handleLineClick(line)}
        />
        <Text
          x={(line.start.x + line.end.x) / 2}
          y={(line.start.y + line.end.y) / 2}
          text={
            edges.find(e => e.start === line.start && e.end === line.end)
              ? edgeLengths[edges.findIndex(e => e.start === line.start && e.end === line.end)]
              : diagonalLengths[diagonals.findIndex(d => d.start.x === line.start.x && d.start.y === line.start.y && d.end.x === line.end.x && d.end.y === line.end.y)]
          }
        />
      </React.Fragment>
    ));
  };

  return (
    <div className="canvas-container">
      <Stage width={window.innerWidth} height={window.innerHeight / 2} onClick={handleCanvasClick}>
        <Layer>
          {drawLines(edges, 'red')}
          {drawLines(diagonals, 'blue')}
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
