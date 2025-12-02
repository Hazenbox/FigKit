import React, { useState } from 'react';

interface PropControl {
  name: string;
  type: 'select' | 'boolean' | 'toggle' | 'text' | 'number' | 'color-select';
  options?: string[];
  defaultValue?: any;
  label?: string;
  colorMap?: Record<string, string>; // Map option values to colors
}

interface PropsPlaygroundProps {
  component: React.ComponentType<any>;
  controls: PropControl[];
  defaultProps?: Record<string, any>;
  renderIcon?: () => React.ReactNode;
}

export default function PropsPlayground({ component: Component, controls, defaultProps = {}, renderIcon }: PropsPlaygroundProps) {
  const [props, setProps] = useState<Record<string, any>>(() => {
    const initialProps = { ...defaultProps };
    controls.forEach(control => {
      if (control.defaultValue !== undefined) {
        initialProps[control.name] = control.defaultValue;
      }
    });
    return initialProps;
  });

  // Add icon to props if iconLead is true and renderIcon is provided
  const componentProps = {
    ...props,
    ...(props.iconLead && renderIcon ? { icon: renderIcon() } : {}),
  };

  const handleChange = (name: string, value: any) => {
    setProps(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div style={{ marginBottom: '2rem' }}>
      {/* Single unified container */}
      <div style={{
        backgroundColor: '#ffffff',
        border: '1px solid var(--ifm-color-emphasis-200, #e0e0e0)',
        borderRadius: '12px',
        overflow: 'hidden',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.5fr 1fr',
          gap: 0,
        }}>
          {/* Component Preview - Left Column */}
          <div style={{
            padding: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '300px',
            borderRight: '1px solid var(--ifm-color-emphasis-200)',
            background: 'var(--ifm-background-color)',
          }}>
            <Component {...componentProps} />
          </div>

          {/* Controls Panel - Right Column */}
          <div style={{
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            background: 'var(--ifm-background-color)',
          }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          flex: 1,
        }}>
          {controls.map(control => {
            return (
            <div key={control.name} style={{ 
              display: 'flex', 
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '0.75rem'
            }}>
              <span style={{
                fontSize: '12px',
                fontWeight: 500,
                color: 'var(--ifm-color-emphasis-700)',
                flexShrink: 0,
              }}>
                {control.label || control.name}
              </span>

              {control.type === 'color-select' && control.colorMap && (
                <div style={{
                  display: 'flex',
                  gap: '4px',
                  flexWrap: 'wrap',
                }}>
                  {control.options?.map(option => (
                    <button
                      key={option}
                      onClick={() => handleChange(control.name, option)}
                      title={option}
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        backgroundColor: control.colorMap![option],
                        border: props[control.name] === option 
                          ? '2.5px solid var(--ifm-font-color-base)' 
                          : '1.5px solid var(--ifm-color-emphasis-300)',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        boxShadow: props[control.name] === option 
                          ? `0 0 0 1.5px var(--ifm-background-surface-color)` 
                          : 'none',
                      }}
                      onMouseEnter={(e) => {
                        if (props[control.name] !== option) {
                          e.currentTarget.style.transform = 'scale(1.1)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    />
                  ))}
                </div>
              )}

              {control.type === 'select' && !control.colorMap && (
                <select
                  value={props[control.name] || ''}
                  onChange={(e) => handleChange(control.name, e.target.value)}
                  style={{
                    padding: '6px 10px',
                    fontSize: '12px',
                    border: '1px solid var(--ifm-color-emphasis-300)',
                    borderRadius: '6px',
                    backgroundColor: 'var(--ifm-background-surface-color)',
                    color: 'var(--ifm-font-color-base)',
                    cursor: 'pointer',
                  }}
                >
                  {control.options?.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              )}

              {control.type === 'boolean' && (
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  cursor: 'pointer',
                }}>
                  <input
                    type="checkbox"
                    checked={props[control.name] || false}
                    onChange={(e) => handleChange(control.name, e.target.checked)}
                    style={{
                      width: '16px',
                      height: '16px',
                      cursor: 'pointer',
                    }}
                  />
                  <span style={{ fontSize: '13px', color: 'var(--ifm-color-emphasis-700)' }}>
                    {props[control.name] ? 'Enabled' : 'Disabled'}
                  </span>
                </label>
              )}

              {control.type === 'toggle' && (
                <div
                  onClick={() => handleChange(control.name, !props[control.name])}
                  style={{
                    position: 'relative',
                    width: '36px',
                    height: '18px',
                    backgroundColor: props[control.name] ? 'var(--ifm-color-primary)' : 'var(--ifm-color-emphasis-300)',
                    borderRadius: '9px',
                    transition: 'background-color 0.2s',
                    cursor: 'pointer',
                    flexShrink: 0,
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    top: '2px',
                    left: props[control.name] ? '20px' : '2px',
                    width: '14px',
                    height: '14px',
                    backgroundColor: 'var(--ifm-background-surface-color)',
                    borderRadius: '50%',
                    transition: 'left 0.2s',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
                  }} />
                </div>
              )}

              {control.type === 'text' && (
                <input
                  type="text"
                  value={props[control.name] || ''}
                  onChange={(e) => handleChange(control.name, e.target.value)}
                  style={{
                    padding: '6px 10px',
                    fontSize: '12px',
                    border: '1px solid var(--ifm-color-emphasis-300)',
                    borderRadius: '6px',
                    backgroundColor: 'var(--ifm-background-surface-color)',
                    color: 'var(--ifm-font-color-base)',
                  }}
                />
              )}

              {control.type === 'number' && (
                <input
                  type="number"
                  value={props[control.name] || 0}
                  onChange={(e) => handleChange(control.name, parseInt(e.target.value, 10))}
                  style={{
                    padding: '6px 10px',
                    fontSize: '12px',
                    border: '1px solid var(--ifm-color-emphasis-300)',
                    borderRadius: '6px',
                    backgroundColor: 'var(--ifm-background-surface-color)',
                    color: 'var(--ifm-font-color-base)',
                  }}
                />
              )}
            </div>
          );
          })}
        </div>

        {/* Current Props Display */}
        <div style={{ marginTop: 'auto', paddingTop: '1rem', marginTop: '1rem', borderTop: '1px solid var(--ifm-color-emphasis-200)' }}>
          <h5 style={{ 
            margin: '0 0 0.375rem 0', 
            fontSize: '11px', 
            fontWeight: 600,
            color: 'var(--ifm-color-emphasis-700)',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}>
            Props
          </h5>
          <pre style={{
            margin: 0,
            padding: '0.5rem',
            backgroundColor: 'var(--ifm-background-surface-color)',
            border: '1px solid var(--ifm-color-emphasis-200)',
            borderRadius: '6px',
            fontSize: '11px',
            lineHeight: 1.4,
            overflowX: 'auto',
            fontFamily: 'var(--ifm-font-family-monospace)',
            color: 'var(--ifm-font-color-base)',
          }}>
            {JSON.stringify(props, null, 2)}
          </pre>
        </div>
        </div>
        </div>
      </div>
    </div>
  );
}

