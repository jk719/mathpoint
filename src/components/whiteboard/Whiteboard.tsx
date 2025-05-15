import { useEffect, useRef, useState } from 'react';
import './Whiteboard.css';
import { FaPencilAlt, FaEraser, FaUndo, FaRedo, FaTrash, FaSave, FaRuler } from 'react-icons/fa';
import { IoColorPaletteOutline } from 'react-icons/io5';
import { TbEraser } from 'react-icons/tb';

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
  '#FFFFFF', // White
  '#101010', // Black
  '#FF5252', // Red
  '#FF9800', // Orange
  '#FFEB3B', // Yellow
  '#4CAF50', // Green
  '#29B6F6', // Blue
  '#B39DDB', // Purple
  '#F48FB1', // Pink
  '#80DEEA', // Cyan
  '#F0E68C', // Light Yellow
  '#A5D6A7', // Light Green
];

// Tool types
type ToolType = 'pen' | 'big-eraser';

const Whiteboard = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [lineWidth, setLineWidth] = useState(2);
  const [tool, setTool] = useState<ToolType>('pen');
  const drawHistoryRef = useRef<ImageData[]>([]);
  const historyPointerRef = useRef<number>(-1);
  const [canvasSize, setCanvasSize] = useState<CanvasSize>({ width: 800, height: 500 }); // Match CSS height
  const [showSizeControls, setShowSizeControls] = useState(false);
  const [showColorPresets, setShowColorPresets] = useState(false);
  const startPointRef = useRef<{x: number, y: number} | null>(null);
  const tempCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const isResizingRef = useRef<boolean>(false);
  
  // For smooth drawing
  const pathPointsRef = useRef<Point[]>([]);
  
  // For cursor style
  const [canvasCursor, setCanvasCursor] = useState('default');
  
  // For mobile touch indicator
  const [touchPoint, setTouchPoint] = useState<Point | null>(null);
  const [touchIndicatorVisible, setTouchIndicatorVisible] = useState(false);
  const [touchIndicatorColor, setTouchIndicatorColor] = useState('#000000');

  // Create a chalk tip SVG element for the touch indicator
  const ChalkTipSVG = (color: string) => `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="8" fill="${color}" fill-opacity="0.9" />
      <circle cx="12" cy="12" r="12" fill="${color}" fill-opacity="0.3" />
    </svg>
  `;

  // Helper function to get canvas context - eliminates repetition
  const getContext = () => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    
    const context = canvas.getContext('2d', { willReadFrequently: true });
    return context;
  };

  // Initialize canvas with proper dimensions and background
  const initializeCanvas = () => {
    const context = getContext();
    if (!context || !canvasRef.current) return;
    
    // Set white background
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    
    // Save initial state
    if (canvasRef.current.width > 0 && canvasRef.current.height > 0 && drawHistoryRef.current.length === 0) {
      saveCanvasState();
    }
  };

  // Create temporary canvas to store drawings during resize
  useEffect(() => {
    // Create temp canvas immediately
    tempCanvasRef.current = document.createElement('canvas');
    
    // Initialize canvas and calculate proper size
    const updateCanvasSize = () => {
      if (canvasContainerRef.current) {
        const containerWidth = canvasContainerRef.current.clientWidth;
        if (containerWidth > 0) {
          // Keep aspect ratio
          const aspectRatio = 3 / 4; // Maintain 4:3 aspect ratio
          const newHeight = Math.round(containerWidth * aspectRatio);
          
          setCanvasSize({
            width: containerWidth,
            height: newHeight
          });
        }
      }
    };
    
    // Initial size calculation
    updateCanvasSize();
    
    // Wait for DOM to fully render before initializing
    setTimeout(() => {
      initializeCanvas();
      updateCursor();
    }, 300); // Increased delay for initialization
    
    // Add window resize listener with debounce
    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      isResizingRef.current = true;
      
      // Use the tempCanvas to store the current drawing before resize
      if (canvasRef.current && tempCanvasRef.current) {
        const currentContext = getContext();
        if (currentContext) {
          tempCanvasRef.current.width = canvasRef.current.width;
          tempCanvasRef.current.height = canvasRef.current.height;
          
          // Copy current canvas to temp canvas
          const tempContext = tempCanvasRef.current.getContext('2d');
          if (tempContext) {
            tempContext.clearRect(0, 0, tempCanvasRef.current.width, tempCanvasRef.current.height);
            tempContext.drawImage(canvasRef.current, 0, 0);
          }
        }
      }
      
      resizeTimer = setTimeout(() => {
        updateCanvasSize();
        isResizingRef.current = false;
      }, 250); // Debounce resize events
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
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
      case 'big-eraser':
        setCanvasCursor('big-eraser');
        break;
      default:
        setCanvasCursor('default');
    }
  };

  const saveCanvasState = () => {
    const context = getContext();
    if (!context || !canvasRef.current) return;
    
    // Check for valid canvas dimensions before proceeding
    if (canvasRef.current.width <= 0 || canvasRef.current.height <= 0) {
      console.warn('Cannot save canvas state - canvas has zero width or height');
      return;
    }
    
    // Remove any states after current pointer if we've gone back in history
    if (historyPointerRef.current < drawHistoryRef.current.length - 1) {
      drawHistoryRef.current = drawHistoryRef.current.slice(0, historyPointerRef.current + 1);
    }
    
    try {
      // Save current state
      const imageData = context.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
      drawHistoryRef.current.push(imageData);
      historyPointerRef.current = drawHistoryRef.current.length - 1;
    } catch (error) {
      console.error('Error saving canvas state:', error);
    }
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
    if (tool === 'pen') {
      context.strokeStyle = color;
      context.lineWidth = lineWidth;
      context.lineCap = 'round';
      context.lineJoin = 'round';
      
      // Add slight shadowBlur for chalk-like effect
      context.shadowColor = color;
      context.shadowBlur = 1;
      context.globalAlpha = 0.9; // Slight transparency for chalk look
    } else if (tool === 'big-eraser') {
      context.strokeStyle = '#ffffff';
      context.lineWidth = 100;
      context.lineCap = 'square';
      context.lineJoin = 'miter';
      
      // Reset shadow and opacity for erasers
      context.shadowBlur = 0;
      context.globalAlpha = 1;
    }
  };
  
  // Draw smooth line between points using advanced Catmull-Rom spline algorithm
  const drawSmoothLine = (
    context: CanvasRenderingContext2D, 
    points: Point[]
  ) => {
    if (points.length < 2) return;
    
    // First point
    context.moveTo(points[0].x, points[0].y);
    
    // Catmull-Rom to Bezier conversion
    for (let i = 0; i < points.length - 1; i++) {
      const p1 = points[i];
      const p2 = points[i + 1];
      
      // For the start point, handle first segment
      let lastSegStartIdx = i === 0 ? 0 : i - 1;
      const _p0 = points[lastSegStartIdx]; // Unused but kept for reference
      
      // Next point (careful with bounds)
      let nextPointIdx = i + 2 < points.length ? i + 2 : i + 1;
      const p3 = points[nextPointIdx];
      
      // Control points
      const _xc = (p1.x + p2.x) / 2; // Unused but kept for reference
      const _yc = (p1.y + p2.y) / 2; // Unused but kept for reference
      
      // Compute control points for Bezier curve
      const cp1x = p1.x + (p2.x - _p0.x) / 6;
      const cp1y = p1.y + (p2.y - _p0.y) / 6;
      
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;
      
      // Draw the curve
      context.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
    }
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
    // Don't allow drawing while resizing
    if (isResizingRef.current) return;
    
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
    if (tool === 'big-eraser') {
      // For big eraser, draw a rectangle
      context.fillStyle = '#ffffff';
      context.fillRect(x - 50, y - 25, 100, 50); // Adjust to a more rectangular shape 100x50
    } else {
      context.arc(x, y, context.lineWidth / 2, 0, Math.PI * 2);
      context.fill();
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || isResizingRef.current) return;
    
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

  const stopDrawing = (_e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || isResizingRef.current) return;
    
    const context = getContext();
    if (!context) return;
    
    // When done drawing, redraw the entire path with smooth curves
    if (pathPointsRef.current.length > 2) {
      // Get the current state from history to avoid erasing parts during path redrawing
      if (historyPointerRef.current >= 0 && drawHistoryRef.current.length > historyPointerRef.current) {
        context.putImageData(drawHistoryRef.current[historyPointerRef.current], 0, 0);
      }
      
      // Optimize the collected points to remove unnecessary ones
      const optimizedPoints = optimizePoints(pathPointsRef.current, 0.5);
      
      // Draw the optimized path with our smooth algorithm
      context.beginPath();
      configureContext(context);
      
      // For the big eraser, we can use a more direct approach instead of curves
      if (tool === 'big-eraser') {
        optimizedPoints.forEach((point, index) => {
          if (index === 0) {
            context.moveTo(point.x, point.y);
          } else {
            context.lineTo(point.x, point.y);
          }
        });
      } else {
        drawSmoothLine(context, optimizedPoints);
      }
      context.stroke();
    }
    
    context.closePath();
    
    // Reset context shadow and alpha
    context.shadowBlur = 0;
    context.globalAlpha = 1;
    
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
    
    // Don't allow drawing while resizing
    if (isResizingRef.current) return;
    
    if (!e.touches[0]) return;
    
    const { x, y } = getTouchPosition(e.touches[0]);
    
    // Show touch indicator
    setTouchPoint({ x, y });
    setTouchIndicatorVisible(true);
    setTouchIndicatorColor(tool === 'pen' ? color : '#ffffff');
    
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
    if (tool === 'big-eraser') {
      // For big eraser, draw a rectangle
      context.fillStyle = '#ffffff';
      context.fillRect(x - 50, y - 25, 100, 50); // Adjust to a more rectangular shape 100x50
    } else {
      context.arc(x, y, context.lineWidth / 2, 0, Math.PI * 2);
      context.fill();
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault(); // Prevent scrolling when using the canvas
    
    if (!isDrawing || isResizingRef.current || !e.touches[0]) return;
    
    const { x, y } = getTouchPosition(e.touches[0]);
    
    // Update touch indicator position
    setTouchPoint({ x, y });
    
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
    
    // Hide touch indicator
    setTouchIndicatorVisible(false);
    
    if (!isDrawing || isResizingRef.current) return;
    
    const context = getContext();
    if (!context) return;
    
    // When done drawing, redraw the entire path with smooth curves
    if (pathPointsRef.current.length > 2) {
      // Get the current state from history to avoid erasing parts
      if (historyPointerRef.current >= 0 && drawHistoryRef.current.length > historyPointerRef.current) {
        context.putImageData(drawHistoryRef.current[historyPointerRef.current], 0, 0);
      }
      
      // Optimize the collected points to remove unnecessary ones
      const optimizedPoints = optimizePoints(pathPointsRef.current, 0.5);
      
      // Draw the optimized path with our smooth algorithm
      context.beginPath();
      configureContext(context);
      
      // For the big eraser, we can use a more direct approach instead of curves
      if (tool === 'big-eraser') {
        optimizedPoints.forEach((point, index) => {
          if (index === 0) {
            context.moveTo(point.x, point.y);
          } else {
            context.lineTo(point.x, point.y);
          }
        });
      } else {
        drawSmoothLine(context, optimizedPoints);
      }
      context.stroke();
    }
    
    context.closePath();
    
    // Reset context shadow and alpha
    context.shadowBlur = 0;
    context.globalAlpha = 1;
    
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
    // Set resizing flag to prevent drawing during resize
    isResizingRef.current = true;
    
    // Store current drawing in temp canvas
    if (canvasRef.current && tempCanvasRef.current) {
      tempCanvasRef.current.width = canvasRef.current.width;
      tempCanvasRef.current.height = canvasRef.current.height;
      
      const tempContext = tempCanvasRef.current.getContext('2d');
      if (tempContext) {
        tempContext.clearRect(0, 0, tempCanvasRef.current.width, tempCanvasRef.current.height);
        tempContext.drawImage(canvasRef.current, 0, 0);
      }
    }
    
    setCanvasSize(newSize);
    
    // Clear resizing flag after a short delay
    setTimeout(() => {
      isResizingRef.current = false;
    }, 300);
  };

  // Handle canvas size changes
  useEffect(() => {
    const context = getContext();
    const canvas = canvasRef.current;
    if (!context || !canvas) return;
    
    // Ensure canvas has valid dimensions
    if (canvasSize.width <= 0 || canvasSize.height <= 0) {
      console.warn('Invalid canvas dimensions', canvasSize);
      return;
    }
    
    // Set white background for new size
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    // If we have a temp canvas with content, restore it with proper scaling
    if (tempCanvasRef.current && tempCanvasRef.current.width > 0 && tempCanvasRef.current.height > 0) {
      try {
        context.drawImage(
          tempCanvasRef.current,
          0, 0, tempCanvasRef.current.width, tempCanvasRef.current.height,
          0, 0, canvas.width, canvas.height
        );
        
        // Save this as a new state in history
        saveCanvasState();
      } catch (error) {
        console.error('Error restoring from temp canvas:', error);
        // If restoring fails, just save the white background
        saveCanvasState();
      }
    } else if (historyPointerRef.current >= 0 && drawHistoryRef.current.length > 0) {
      // Try to restore from history if temp canvas is empty
      try {
        // Only use putImageData if the dimensions match
        if (drawHistoryRef.current[historyPointerRef.current].width === canvas.width &&
            drawHistoryRef.current[historyPointerRef.current].height === canvas.height) {
          context.putImageData(drawHistoryRef.current[historyPointerRef.current], 0, 0);
        } else {
          // Dimensions mismatch - create a temporary canvas to scale the image
          const tempCanvas = document.createElement('canvas');
          tempCanvas.width = drawHistoryRef.current[historyPointerRef.current].width;
          tempCanvas.height = drawHistoryRef.current[historyPointerRef.current].height;
          
          const tempContext = tempCanvas.getContext('2d');
          if (tempContext) {
            tempContext.putImageData(drawHistoryRef.current[historyPointerRef.current], 0, 0);
            context.drawImage(tempCanvas, 0, 0, canvas.width, canvas.height);
          }
          
          // Save the scaled version
          saveCanvasState();
        }
      } catch (error) {
        console.warn('Could not restore canvas from history:', error);
        // Just save the current state (white background)
        saveCanvasState();
      }
    } else {
      // No history and no temp canvas - initialize a new state
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

  // Custom chalk icon for pen tool
  const ChalkIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6,4 L18,4 L18,16 C18,19 14,22 12,23 C10,22 6,19 6,16 Z" fill="#FFFFFF" stroke="#666666" strokeWidth="1.2"/>
      <path d="M7,5 L17,5 L17,16 C17,18.5 13.5,21 12,22 C10.5,21 7,18.5 7,16 Z" fill="#F5F5F5"/>
      <path d="M8,10 L16,10 L16,16 C16,18 13,20 12,20.5 C11,20 8,18 8,16 Z" fill="#E6E6E6"/>
      <path d="M10,6 L14,6 L14,8 L10,8 Z" fill="#DDDDDD"/>
    </svg>
  );

  // Custom chalkboard eraser SVG icon for the big eraser
  const ChalkboardEraserIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="8" width="20" height="10" rx="1" fill="#f0f0f0" stroke="#888888" strokeWidth="1.2"/>
      <rect x="3" y="9" width="18" height="8" rx="1" fill="#ffffff"/>
      <rect x="5" y="11" width="3" height="1" fill="#dddddd"/>
      <rect x="10" y="13" width="4" height="1" fill="#dddddd"/>
      <rect x="16" y="12" width="3" height="1" fill="#dddddd"/>
      <rect x="7" y="15" width="4" height="1" fill="#dddddd"/>
    </svg>
  );

  return (
    <div className="whiteboard-container" ref={canvasContainerRef}>
      <div className="whiteboard-header">
        <h2>Interactive Whiteboard</h2>
        <p>Use this whiteboard to collaborate with students and tutors</p>
      </div>
      
      <div className="toolbar">
        <div className="tool-group">
          <button 
            className={`tool-btn ${tool === 'pen' ? 'active' : ''}`}
            onClick={() => handleToolClick('pen')}
            title="Chalk"
          >
            <ChalkIcon />
          </button>
          <button 
            className={`tool-btn ${tool === 'big-eraser' ? 'active' : ''}`}
            onClick={() => handleToolClick('big-eraser')}
            title="Eraser"
          >
            <ChalkboardEraserIcon />
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
            disabled={tool === 'big-eraser'}
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
            disabled={tool === 'big-eraser'}
            title="Line Width"
          />
        </div>
        
        <div className="history-buttons">
          <button 
            className="tool-btn"
            onClick={undo} 
            title="Undo" 
            disabled={historyPointerRef.current <= 0}
          >
            <FaUndo />
          </button>
          <button 
            className="tool-btn"
            onClick={redo} 
            title="Redo" 
            disabled={historyPointerRef.current >= drawHistoryRef.current.length - 1}
          >
            <FaRedo />
          </button>
          <button 
            className="tool-btn"
            onClick={clearCanvas} 
            title="Clear All"
          >
            <FaTrash />
          </button>
          <button 
            className="tool-btn save-btn"
            onClick={saveWhiteboard} 
            title="Save as Image" 
          >
            <FaSave />
          </button>
          <button 
            className="tool-btn"
            onClick={toggleSizeControls} 
            title="Resize Canvas"
          >
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
      
      <div className="canvas-wrapper" style={{ position: 'relative' }}>
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
        
        {/* Touch indicator for mobile devices */}
        {touchIndicatorVisible && touchPoint && (
          <div 
            className="touch-indicator"
            style={{
              position: 'absolute',
              left: `${touchPoint.x / canvasSize.width * 100}%`,
              top: `${touchPoint.y / canvasSize.height * 100}%`,
              transform: 'translate(-50%, -50%)',
              width: tool === 'pen' ? '32px' : '50px',
              height: tool === 'pen' ? '32px' : '25px',
              pointerEvents: 'none',
              zIndex: 1000,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              ...(tool === 'pen' 
                ? {
                    backgroundImage: `url('data:image/svg+xml;utf8,${encodeURIComponent(ChalkTipSVG(touchIndicatorColor))}')`
                  }
                : {
                    backgroundColor: touchIndicatorColor,
                    borderRadius: '2px',
                    opacity: 0.7,
                    boxShadow: '0 0 3px rgba(0,0,0,0.3)'
                  }
              )
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Whiteboard; 