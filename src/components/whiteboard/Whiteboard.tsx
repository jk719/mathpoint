import { useEffect, useRef, useState } from 'react';
import './Whiteboard.css';
import { FaPencilAlt, FaEraser, FaUndo, FaRedo, FaTrash, FaSave, FaRuler } from 'react-icons/fa';
import { IoColorPaletteOutline } from 'react-icons/io5';

interface CanvasSize {
  width: number;
  height: number;
}

// Point interface for smooth drawing
interface Point {
  x: number;
  y: number;
}

// Predefined color palettes for quick selection
const colorPresets = [
  '#000000', // Black
  '#FF5252', // Red
  '#FF9800', // Orange
  '#FFEB3B', // Yellow
  '#4CAF50', // Green
  '#2196F3', // Blue
  '#673AB7', // Purple
  '#F06292', // Pink
];

// Tool types
type ToolType = 'pen' | 'eraser';

const Whiteboard = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [lineWidth, setLineWidth] = useState(2);
  const [tool, setTool] = useState<ToolType>('pen');
  const drawHistoryRef = useRef<ImageData[]>([]);
  const historyPointerRef = useRef<number>(-1);
  const [canvasSize, setCanvasSize] = useState<CanvasSize>({ width: 800, height: 600 });
  const [showSizeControls, setShowSizeControls] = useState(false);
  const [showColorPresets, setShowColorPresets] = useState(false);
  const startPointRef = useRef<{x: number, y: number} | null>(null);
  
  // For smooth drawing
  const pathPointsRef = useRef<Point[]>([]);
  
  // For cursor style
  const [canvasCursor, setCanvasCursor] = useState('default');

  // Helper function to get canvas context - eliminates repetition
  const getContext = () => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    
    const context = canvas.getContext('2d', { willReadFrequently: true });
    return context;
  };

  useEffect(() => {
    const context = getContext();
    if (!context) return;

    // Set white background
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
    
    // Save initial state
    saveCanvasState();
    
    // Update cursor based on current tool
    updateCursor();
  }, []);
  
  // Effect to update cursor when tool changes
  useEffect(() => {
    updateCursor();
  }, [tool]);
  
  // Update cursor based on current tool
  const updateCursor = () => {
    switch (tool) {
      case 'pen':
        setCanvasCursor('pen');
        break;
      case 'eraser':
        setCanvasCursor('eraser');
        break;
      default:
        setCanvasCursor('default');
    }
  };

  const saveCanvasState = () => {
    const context = getContext();
    if (!context || !canvasRef.current) return;
    
    // Remove any states after current pointer if we've gone back in history
    if (historyPointerRef.current < drawHistoryRef.current.length - 1) {
      drawHistoryRef.current = drawHistoryRef.current.slice(0, historyPointerRef.current + 1);
    }
    
    // Save current state
    const imageData = context.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
    drawHistoryRef.current.push(imageData);
    historyPointerRef.current = drawHistoryRef.current.length - 1;
  };

  const undo = () => {
    if (historyPointerRef.current <= 0) return;
    
    historyPointerRef.current--;
    const context = getContext();
    if (!context) return;
    
    context.putImageData(drawHistoryRef.current[historyPointerRef.current], 0, 0);
  };

  const redo = () => {
    if (historyPointerRef.current >= drawHistoryRef.current.length - 1) return;
    
    historyPointerRef.current++;
    const context = getContext();
    if (!context) return;
    
    context.putImageData(drawHistoryRef.current[historyPointerRef.current], 0, 0);
  };

  // Configure drawing context settings based on current tool
  const configureContext = (context: CanvasRenderingContext2D) => {
    if (tool === 'pen' || tool === 'eraser') {
      context.strokeStyle = tool === 'eraser' ? '#ffffff' : color;
      context.lineWidth = tool === 'eraser' ? 20 : lineWidth;
      context.lineCap = 'round';
      context.lineJoin = 'round';
    }
  };
  
  // Draw a line directly between two points
  const drawDirectLine = (
    context: CanvasRenderingContext2D,
    startX: number,
    startY: number,
    endX: number,
    endY: number
  ) => {
    context.beginPath();
    context.moveTo(startX, startY);
    context.lineTo(endX, endY);
    context.stroke();
  };
  
  // Draw smooth line between points using advanced Catmull-Rom spline algorithm
  const drawSmoothLine = (
    context: CanvasRenderingContext2D, 
    points: Point[]
  ) => {
    if (points.length < 2) return;
    
    // Clear existing path and start fresh
    context.beginPath();
    
    // Always start at the exact first point
    context.moveTo(points[0].x, points[0].y);
    
    // Apply tension (0 = tight, 1 = smooth)
    const tension = 0.33;
    
    // For just 2 points, draw a direct line for accuracy
    if (points.length === 2) {
      context.lineTo(points[1].x, points[1].y);
    } else if (points.length === 3) {
      // For 3 points, use quadratic curve
      const xc = (points[1].x + points[2].x) / 2;
      const yc = (points[1].y + points[2].y) / 2;
      context.quadraticCurveTo(points[1].x, points[1].y, xc, yc);
      context.lineTo(points[2].x, points[2].y);
    } else {
      // For more points, use Catmull-Rom spline (centripetal)
      // This creates beautiful smooth curves that follow the hand movement naturally
      
      // Move to first point
      context.moveTo(points[0].x, points[0].y);
      
      let i;
      for (i = 0; i < points.length - 3; i++) {
        const p0 = i > 0 ? points[i - 1] : points[0];
        const p1 = points[i];
        const p2 = points[i + 1];
        const p3 = points[i + 2];
        
        // Calculate tension vectors
        const t1x = (p2.x - p0.x) * tension;
        const t1y = (p2.y - p0.y) * tension;
        const t2x = (p3.x - p1.x) * tension;
        const t2y = (p3.y - p1.y) * tension;
        
        // Calculate control points for bezier curve
        const c1x = p1.x + t1x / 3;
        const c1y = p1.y + t1y / 3;
        const c2x = p2.x - t2x / 3;
        const c2y = p2.y - t2y / 3;
        
        // Draw smooth curve segment
        context.bezierCurveTo(c1x, c1y, c2x, c2y, p2.x, p2.y);
      }
      
      // Handle the last segment
      const lastSegStartIdx = Math.max(0, points.length - 3);
      const lastSegEndIdx = points.length - 1;
      
      if (lastSegEndIdx > lastSegStartIdx + 1) {
        const p0 = points[lastSegStartIdx];
        const p1 = points[lastSegStartIdx + 1];
        const p2 = points[lastSegEndIdx];
        
        // For last segment, use quadratic curve
        const xc = (p1.x + p2.x) / 2;
        const yc = (p1.y + p2.y) / 2;
        context.quadraticCurveTo(p1.x, p1.y, p2.x, p2.y);
      }
    }
    
    context.stroke();
  };

  // Optimize points by removing redundant ones that don't contribute to curve shape
  const optimizePoints = (points: Point[], tolerance: number = 1): Point[] => {
    if (points.length <= 2) return points;
    
    const result: Point[] = [points[0]];
    let prevPoint = points[0];
    
    for (let i = 1; i < points.length - 1; i++) {
      const point = points[i];
      const nextPoint = points[i + 1];
      
      // Calculate if this point is needed for the curve
      const dx1 = point.x - prevPoint.x;
      const dy1 = point.y - prevPoint.y;
      const dx2 = nextPoint.x - point.x;
      const dy2 = nextPoint.y - point.y;
      
      // Calculate distance and angle change
      const segmentDistance = Math.sqrt(dx1 * dx1 + dy1 * dy1);
      
      // Direction change check - keeping points that change direction
      const dot = dx1 * dx2 + dy1 * dy2;
      const len1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
      const len2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
      const cosAngle = dot / (len1 * len2);
      
      // Keep point if:
      // 1. It's far enough from the previous point, or
      // 2. It represents a significant direction change
      if (segmentDistance > tolerance || cosAngle < 0.95) {
        result.push(point);
        prevPoint = point;
      }
    }
    
    // Always add the last point
    result.push(points[points.length - 1]);
    
    return result;
  };

  // Get precise cursor coordinates relative to canvas
  const getCursorPosition = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    return { 
      x: (e.clientX - rect.left) * scaleX, 
      y: (e.clientY - rect.top) * scaleY 
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const { x, y } = getCursorPosition(e);
    
    setIsDrawing(true);
    startPointRef.current = { x, y };
    
    const context = getContext();
    if (!context) return;
    
    // Reset path points array for this new drawing stroke
    pathPointsRef.current = [{ x, y }];
    
    // Begin a new path
    context.beginPath();
    configureContext(context);
    context.moveTo(x, y);
    // Add a small dot to ensure the starting point is visible
    context.arc(x, y, lineWidth / 2, 0, Math.PI * 2);
    context.fill();
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const { x, y } = getCursorPosition(e);
    
    const context = getContext();
    if (!context) return;
    
    // Add current point to our path
    const newPoint = { x, y };
    const lastPoint = pathPointsRef.current[pathPointsRef.current.length - 1];
    
    // Only add point if it's different from the last one (prevents duplicates)
    if (lastPoint.x !== newPoint.x || lastPoint.y !== newPoint.y) {
      pathPointsRef.current.push(newPoint);
      
      // Draw just the segment between last point and new point for immediate visual feedback
      context.beginPath();
      configureContext(context);
      context.moveTo(lastPoint.x, lastPoint.y);
      context.lineTo(newPoint.x, newPoint.y);
      context.stroke();
    }
  };

  const stopDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const context = getContext();
    if (!context) return;
    
    // When done drawing, redraw the entire path with smooth curves
    if (pathPointsRef.current.length > 2) {
      // Clear the canvas to the last saved state
      if (historyPointerRef.current >= 0) {
        context.putImageData(drawHistoryRef.current[historyPointerRef.current], 0, 0);
      }
      
      // Optimize the collected points to remove unnecessary ones
      const optimizedPoints = optimizePoints(pathPointsRef.current, 0.5);
      
      // Draw the optimized path with our smooth algorithm
      context.beginPath();
      configureContext(context);
      drawSmoothLine(context, optimizedPoints);
    }
    
    context.closePath();
    saveCanvasState();
    setIsDrawing(false);
    startPointRef.current = null;
    pathPointsRef.current = [];
  };

  const clearCanvas = () => {
    const context = getContext();
    if (!context || !canvasRef.current) return;
    
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    saveCanvasState();
  };

  // Get precise touch coordinates relative to canvas
  const getTouchPosition = (touch: React.Touch) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    return { 
      x: (touch.clientX - rect.left) * scaleX, 
      y: (touch.clientY - rect.top) * scaleY 
    };
  };

  // Touch event handlers for mobile support
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault(); // Prevent scrolling when using the canvas
    
    if (!e.touches[0]) return;
    
    const { x, y } = getTouchPosition(e.touches[0]);
    
    setIsDrawing(true);
    startPointRef.current = { x, y };
    
    const context = getContext();
    if (!context) return;
    
    // Reset path points array for this new drawing stroke
    pathPointsRef.current = [{ x, y }];
    
    // Begin a new path
    context.beginPath();
    configureContext(context);
    context.moveTo(x, y);
    // Add a small dot to ensure the starting point is visible
    context.arc(x, y, lineWidth / 2, 0, Math.PI * 2);
    context.fill();
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault(); // Prevent scrolling when using the canvas
    
    if (!isDrawing || !e.touches[0]) return;
    
    const { x, y } = getTouchPosition(e.touches[0]);
    
    const context = getContext();
    if (!context) return;
    
    // Add current point to our path
    const newPoint = { x, y };
    const lastPoint = pathPointsRef.current[pathPointsRef.current.length - 1];
    
    // Only add point if it's different from the last one (prevents duplicates)
    if (lastPoint.x !== newPoint.x || lastPoint.y !== newPoint.y) {
      pathPointsRef.current.push(newPoint);
      
      // Draw just the segment between last point and new point for immediate feedback
      context.beginPath();
      configureContext(context);
      context.moveTo(lastPoint.x, lastPoint.y);
      context.lineTo(newPoint.x, newPoint.y);
      context.stroke();
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault(); // Prevent scrolling when using the canvas
    
    if (!isDrawing) return;
    
    const context = getContext();
    if (!context) return;
    
    // When done drawing, redraw the entire path with smooth curves
    if (pathPointsRef.current.length > 2) {
      // Clear the canvas to the last saved state
      if (historyPointerRef.current >= 0) {
        context.putImageData(drawHistoryRef.current[historyPointerRef.current], 0, 0);
      }
      
      // Optimize the collected points to remove unnecessary ones
      const optimizedPoints = optimizePoints(pathPointsRef.current, 0.5);
      
      // Draw the optimized path with our smooth algorithm
      context.beginPath();
      configureContext(context);
      drawSmoothLine(context, optimizedPoints);
    }
    
    context.closePath();
    saveCanvasState();
    setIsDrawing(false);
    startPointRef.current = null;
    pathPointsRef.current = [];
  };

  const saveWhiteboard = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Create a download link for the canvas image
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `mathpoint-whiteboard-${new Date().toISOString().slice(0, 10)}.png`;
    link.href = dataUrl;
    link.click();
  };

  const resizeCanvas = (newSize: CanvasSize) => {
    setCanvasSize(newSize);
  };

  // Add effect to handle canvas size changes
  useEffect(() => {
    const context = getContext();
    if (!context || !canvasRef.current) return;
    
    // Set white background for new size
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    
    // If we have history, redraw the last state
    if (historyPointerRef.current >= 0) {
      try {
        context.putImageData(drawHistoryRef.current[historyPointerRef.current], 0, 0);
      } catch (error) {
        // If the previous image doesn't fit the new canvas, just start fresh
        drawHistoryRef.current = [];
        historyPointerRef.current = -1;
        saveCanvasState();
      }
    } else {
      // Initialize history for new canvas
      saveCanvasState();
    }
  }, [canvasSize]);

  // Helper to hide all popovers
  const hideAllPopovers = () => {
    setShowSizeControls(false);
    setShowColorPresets(false);
  };

  const toggleSizeControls = () => {
    hideAllPopovers();
    setShowSizeControls(!showSizeControls);
  };

  const toggleColorPresets = () => {
    hideAllPopovers();
    setShowColorPresets(!showColorPresets);
  };

  const handleToolClick = (selectedTool: ToolType) => {
    setTool(selectedTool);
    hideAllPopovers();
  };

  return (
    <div className="whiteboard-container">
      <div className="whiteboard-header">
        <h2>Interactive Whiteboard</h2>
        <p>Use this whiteboard to collaborate with students and tutors</p>
      </div>
      
      <div className="toolbar">
        <div className="tool-group">
          <button 
            className={`tool-btn ${tool === 'pen' ? 'active' : ''}`}
            onClick={() => handleToolClick('pen')}
            title="Pen"
          >
            <FaPencilAlt />
          </button>
          <button 
            className={`tool-btn ${tool === 'eraser' ? 'active' : ''}`}
            onClick={() => handleToolClick('eraser')}
            title="Eraser"
          >
            <FaEraser />
          </button>
        </div>
        
        <div className="color-options">
          <button 
            className="tool-btn color-palette-btn"
            onClick={toggleColorPresets}
            title="Color Palette"
          >
            <IoColorPaletteOutline />
          </button>
          <input 
            type="color" 
            value={color} 
            onChange={(e) => setColor(e.target.value)}
            className="color-picker"
            disabled={tool === 'eraser'}
            title="Pick Custom Color"
          />
        </div>
        
        <div className="line-width">
          <input 
            type="range" 
            min="1" 
            max="20" 
            value={lineWidth} 
            onChange={(e) => setLineWidth(parseInt(e.target.value))}
            disabled={tool === 'eraser'}
            title="Line Width"
          />
        </div>
        
        <div className="history-buttons">
          <button onClick={undo} title="Undo" disabled={historyPointerRef.current <= 0}>
            <FaUndo />
          </button>
          <button onClick={redo} title="Redo" disabled={historyPointerRef.current >= drawHistoryRef.current.length - 1}>
            <FaRedo />
          </button>
          <button onClick={clearCanvas} title="Clear All">
            <FaTrash />
          </button>
          <button onClick={saveWhiteboard} title="Save as Image" className="save-btn">
            <FaSave />
          </button>
          <button onClick={toggleSizeControls} title="Resize Canvas">
            <FaRuler />
          </button>
        </div>
      </div>
      
      {showSizeControls && (
        <div className="size-controls popover">
          <h3>Canvas Size</h3>
          <div className="size-buttons">
            <button onClick={() => resizeCanvas({ width: 800, height: 600 })}>
              Small (800x600)
            </button>
            <button onClick={() => resizeCanvas({ width: 1024, height: 768 })}>
              Medium (1024x768)
            </button>
            <button onClick={() => resizeCanvas({ width: 1280, height: 960 })}>
              Large (1280x960)
            </button>
          </div>
        </div>
      )}
      
      {showColorPresets && (
        <div className="color-presets popover">
          <h3>Color Presets</h3>
          <div className="color-grid">
            {colorPresets.map((presetColor, index) => (
              <button 
                key={index}
                className={`color-preset ${color === presetColor ? 'active' : ''}`}
                style={{ backgroundColor: presetColor }}
                onClick={() => setColor(presetColor)}
                title={presetColor}
              />
            ))}
          </div>
        </div>
      )}
      
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={`whiteboard-canvas cursor-${canvasCursor}`}
      />
    </div>
  );
};

export default Whiteboard; 