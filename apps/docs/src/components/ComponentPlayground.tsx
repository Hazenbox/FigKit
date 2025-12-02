import React, { useState, useRef, useEffect } from 'react';

interface ComponentPlaygroundProps {
  component: React.ReactNode;
  layers: Array<{
    name: string;
    description: string;
    element?: string;
    selector: string; // CSS selector to find the element
  }>;
}

export default function ComponentPlayground({ component, layers }: ComponentPlaygroundProps) {
  const [hoveredLayer, setHoveredLayer] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [layerRects, setLayerRects] = useState<Array<{x: number, y: number, width: number, height: number} | null>>([]);

  const updateLayerRects = () => {
    if (!containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const newRects: Array<{x: number, y: number, width: number, height: number} | null> = [];

    layers.forEach((layer, index) => {
      if (layer.selector) {
        const element = containerRef.current?.querySelector(layer.selector);
        
        if (element) {
          const elementRect = element.getBoundingClientRect();
          const relativeRect = {
            x: elementRect.left - containerRect.left,
            y: elementRect.top - containerRect.top,
            width: elementRect.width,
            height: elementRect.height,
          };
          newRects.push(relativeRect);
        } else {
          newRects.push(null);
        }
      } else {
        newRects.push(null);
      }
    });

    setLayerRects(newRects);
  };

  useEffect(() => {
    const timeoutId1 = setTimeout(updateLayerRects, 100);
    const timeoutId2 = setTimeout(updateLayerRects, 500);
    
    window.addEventListener('resize', updateLayerRects);
    
    const observer = new MutationObserver(updateLayerRects);
    
    if (containerRef.current) {
      observer.observe(containerRef.current, {
        attributes: true,
        childList: true,
        subtree: true,
      });
    }

    return () => {
      clearTimeout(timeoutId1);
      clearTimeout(timeoutId2);
      window.removeEventListener('resize', updateLayerRects);
      observer.disconnect();
    };
  }, [layers]);

  const handleMouseEnter = (index: number) => {
    updateLayerRects();
    setHoveredLayer(index);
  };

  return (
    <div className="mb-8 component-playground">
      <h2 id="anatomy" className="text-[15px] mb-3">Anatomy</h2>
      
      {/* Anatomy Container with 12px border-radius */}
      <div style={{
        border: '1px solid var(--ifm-color-emphasis-200)',
        borderRadius: '12px',
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: 'var(--ifm-background-surface-color)',
      }}>
        {/* Component Preview - Light background to show component design */}
        <div 
          ref={containerRef}
          className="p-6"
          style={{
            backgroundColor: 'var(--ifm-background-color)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '120px',
          }}
        >
          {component}
        </div>

        {/* Overlay Layer */}
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: '1px',
            pointerEvents: 'none',
            overflow: 'visible',
          }}
        >
          {layerRects.map((rect, index) => {
            if (!rect) return null;
            const isHovered = hoveredLayer === index;
            
            return (
              <React.Fragment key={index}>
                {/* Highlight Overlay */}
                <div
                  style={{
                    position: 'absolute',
                    left: `${rect.x}px`,
                    top: `${rect.y}px`,
                    width: `${rect.width}px`,
                    height: `${rect.height}px`,
                    backgroundColor: isHovered ? 'rgba(13, 153, 255, 0.15)' : 'transparent',
                    border: isHovered ? '2px solid rgba(13, 153, 255, 0.6)' : 'none',
                    borderRadius: '4px',
                    zIndex: 100,
                    transition: 'all 0.2s ease',
                  }}
                />
                
                {/* Number Badge - Positioned outside to the right */}
                {isHovered && (
                  <div
                    style={{
                      position: 'absolute',
                      left: `${rect.x + rect.width + 16}px`, // 16px to the right of the element
                      top: `${rect.y + rect.height / 2}px`,
                      transform: 'translateY(-50%)',
                      zIndex: 200,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <span 
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--ifm-color-primary)',
                        color: '#ffffff',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                      }}
                    >
                      {index + 1}
                    </span>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
        
        {/* Layers Table - no border, no bottom padding */}
        <table className="w-full text-[11px] anatomy-table" style={{margin: 0, border: 'none', borderRadius: 0}}>
          <thead>
            <tr style={{backgroundColor: 'var(--ifm-color-emphasis-100)'}}>
              <th className="text-center p-2 font-['Geist_Mono',sans-serif]" style={{color: 'var(--ifm-color-emphasis-700)', width: '50px'}}>#</th>
              <th className="text-left p-2 font-['Geist_Mono',sans-serif]" style={{color: 'var(--ifm-color-emphasis-700)', width: '120px'}}>Layer</th>
              <th className="text-left p-2 font-['Geist_Mono',sans-serif]" style={{color: 'var(--ifm-color-emphasis-700)'}}>Description</th>
              <th className="text-left p-2 font-['Geist_Mono',sans-serif]" style={{color: 'var(--ifm-color-emphasis-700)', width: '150px'}}>Element</th>
            </tr>
          </thead>
          <tbody>
            {layers.map((layer, index) => (
              <tr
                key={index}
                className="cursor-pointer transition-colors"
                style={{
                  borderTop: index > 0 ? '1px solid var(--ifm-color-emphasis-200)' : 'none',
                  backgroundColor: hoveredLayer === index ? 'rgba(13, 153, 255, 0.05)' : 'transparent',
                }}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => setHoveredLayer(null)}
              >
                <td className="p-2 text-center">
                  <span 
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--ifm-color-primary)',
                      color: '#ffffff',
                      fontSize: '11px',
                      fontWeight: 'bold',
                      transition: 'transform 0.2s ease',
                      transform: hoveredLayer === index ? 'scale(1.1)' : 'scale(1)',
                    }}
                  >
                    {index + 1}
                  </span>
                </td>
                <td className="p-2 font-['Geist_Mono',sans-serif]" style={{color: 'var(--ifm-font-color-base)'}}>
                  {layer.name}
                </td>
                <td className="p-2" style={{color: 'var(--ifm-color-emphasis-700)'}}>
                  {layer.description}
                </td>
                <td className="p-2 font-['Geist_Mono',sans-serif]" style={{color: 'var(--ifm-color-emphasis-700)', fontSize: '10px'}}>
                  {layer.element || '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
