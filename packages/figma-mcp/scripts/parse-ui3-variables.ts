// Script to parse UI3_Variables.json and create a proper mock-variables.json
import { readJSON, writeJSON } from './utils/fs.js';

interface UI3Token {
  $codeSyntax?: { WEB?: string };
  $value?: string | { [key: string]: any };
  $type?: string;
}

interface UI3Structure {
  Colors?: {
    modes?: {
      Light?: { [key: string]: any };
      Dark?: { [key: string]: any };
    };
  };
}

async function parseUI3Variables() {
  const ui3Data = await readJSON<UI3Structure[]>('packages/figma-mcp/config/data/UI3_Variables.json');
  
  // Extract tokens we need for buttons
  const buttonTokens = [
    // Component tokens
    '✦.bg.component.default',
    '✦.bg.component.hover',
    '✦.bg.component.pressed',
    '✦.bg.brand.default',
    '✦.bg.brand.hover',
    '✦.bg.brand.pressed',
    '✦.bg.danger.default',
    '✦.bg.danger.hover',
    '✦.bg.danger.pressed',
    '✦.text.component.oncomponent',
    '✦.text.component.default',
    '✦.border.component.default',
    '✦.border.component.hover',
    // Text tokens
    '✦._text.text-default',
    '✦._text.text-onbrand',
    // Background tokens
    '✦._bg.bg-default',
    '✦._bg.bg-brand',
    '✦._bg.bg-secondary',
    '✦._bg.bg-hover',
    '✦._bg.bg-selected',
    // Border tokens
    '✦._border.border-default',
    '✦._border.border-strong',
    // Spacing
    'space.2',
    'space.3',
    'space.4',
    'space.5',
    // Radius
    'radius.sm',
    'radius.md',
    'radius.lg',
  ];

  const variables: any[] = [];
  
  // Parse the UI3 structure to extract values
  // This is a simplified parser - you may need to adjust based on actual structure
  for (const collection of ui3Data) {
    if (collection.Colors?.modes) {
      const lightMode = collection.Colors.modes.Light;
      const darkMode = collection.Colors.modes.Dark;
      
      // Extract values for each token we need
      for (const tokenName of buttonTokens) {
        const path = tokenName.split('.');
        let lightValue: any = null;
        let darkValue: any = null;
        
        // Navigate the nested structure
        let current = lightMode;
        for (const part of path) {
          if (current && typeof current === 'object') {
            current = current[part];
          } else {
            current = null;
            break;
          }
        }
        if (current && current.$value) {
          lightValue = current.$value;
        }
        
        current = darkMode;
        for (const part of path) {
          if (current && typeof current === 'object') {
            current = current[part];
          } else {
            current = null;
            break;
          }
        }
        if (current && current.$value) {
          darkValue = current.$value;
        }
        
        if (lightValue || darkValue) {
          variables.push({
            name: tokenName,
            resolvedValues: {
              'Core/Light': lightValue || darkValue || '#000000',
              'Core/Dark': darkValue || lightValue || '#ffffff',
            },
            type: 'COLOR',
          });
        }
      }
    }
  }
  
  // Add spacing and radius tokens with default values
  const spacingTokens = [
    { name: 'space.2', value: '8px' },
    { name: 'space.3', value: '12px' },
    { name: 'space.4', value: '16px' },
    { name: 'space.5', value: '20px' },
  ];
  
  const radiusTokens = [
    { name: 'radius.sm', value: '6px' },
    { name: 'radius.md', value: '8px' },
    { name: 'radius.lg', value: '10px' },
  ];
  
  for (const token of [...spacingTokens, ...radiusTokens]) {
    variables.push({
      name: token.name,
      resolvedValues: {
        'Core/Light': token.value,
        'Core/Dark': token.value,
      },
      type: 'FLOAT',
    });
  }
  
  const output = {
    variables,
    collections: [
      { name: 'Core', modes: ['Light', 'Dark'] },
      { name: 'Brand', modes: ['Acme', 'Omega'] },
    ],
  };
  
  await writeJSON('packages/figma-mcp/config/mock-variables.json', output);
  console.log(`✅ Generated mock-variables.json with ${variables.length} tokens`);
}

parseUI3Variables().catch(console.error);

