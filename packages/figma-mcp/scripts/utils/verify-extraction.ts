// packages/figma-mcp/scripts/utils/verify-extraction.ts
/**
 * Utility to verify 100% property extraction from Figma
 * Compares extracted properties with Figma node to ensure nothing is missing
 */

import { extractAllProperties, ExtractedProperties } from './extract-all-properties.js';
import { fetchNode } from './figma.nodes.js';

export interface ExtractionReport {
  nodeId: string;
  nodeName: string;
  extracted: ExtractedProperties;
  missing: {
    fills?: boolean;
    strokes?: boolean;
    effects?: boolean;
    layout?: boolean;
    typography?: boolean;
    dimensions?: boolean;
    constraints?: boolean;
    transform?: boolean;
    opacity?: boolean;
    blendMode?: boolean;
    cornerRadius?: boolean;
  };
  coverage: {
    fills: number;
    strokes: number;
    effects: number;
    layout: number;
    typography: number;
    dimensions: number;
    total: number;
  };
}

export async function verifyExtraction(
  fileKey: string,
  nodeId: string
): Promise<ExtractionReport> {
  const { node } = await fetchNode(fileKey, nodeId);
  const extracted = extractAllProperties(node);
  
  // Check what's missing
  const missing = {
    fills: !node.fills || node.fills.length === 0,
    strokes: !node.strokes || node.strokes.length === 0,
    effects: !node.effects || node.effects.length === 0,
    layout: !node.layoutMode,
    typography: !node.style && node.type !== 'TEXT',
    dimensions: !node.absoluteBoundingBox && !node.size,
    constraints: !node.constraints,
    transform: !node.transform && !node.rotation,
    opacity: node.opacity === undefined,
    blendMode: !node.blendMode,
    cornerRadius: node.cornerRadius === undefined && !node.rectangleCornerRadii,
  };
  
  // Calculate coverage
  const coverage = {
    fills: extracted.fills.length,
    strokes: extracted.strokes.length,
    effects: extracted.effects.length,
    layout: extracted.layout.layoutMode ? 1 : 0,
    typography: extracted.typography ? 1 : 0,
    dimensions: (extracted.dimensions.width > 0 || extracted.dimensions.height > 0) ? 1 : 0,
    total: 0,
  };
  
  coverage.total = Object.values(coverage).reduce((sum, val) => sum + (typeof val === 'number' ? val : 0), 0);
  
  return {
    nodeId,
    nodeName: node.name || 'Unknown',
    extracted,
    missing,
    coverage,
  };
}

export function printExtractionReport(report: ExtractionReport): void {
  console.log('\n📊 100% Extraction Verification Report');
  console.log('=====================================');
  console.log(`Node: ${report.nodeName} (${report.nodeId})`);
  console.log('\n✅ Extracted Properties:');
  console.log(`   Fills: ${report.extracted.fills.length}`);
  console.log(`   Strokes: ${report.extracted.strokes.length}`);
  console.log(`   Effects: ${report.extracted.effects.length}`);
  console.log(`   Layout: ${report.extracted.layout.layoutMode || 'none'}`);
  console.log(`   Typography: ${report.extracted.typography ? 'yes' : 'no'}`);
  console.log(`   Dimensions: ${report.extracted.dimensions.width}x${report.extracted.dimensions.height}`);
  console.log(`   Opacity: ${report.extracted.opacity}`);
  console.log(`   Blend Mode: ${report.extracted.blendMode || 'NORMAL'}`);
  console.log(`   Clips Content: ${report.extracted.clipsContent}`);
  
  console.log('\n⚠️  Missing Properties:');
  const missingProps = Object.entries(report.missing)
    .filter(([_, isMissing]) => isMissing)
    .map(([prop]) => prop);
  
  if (missingProps.length === 0) {
    console.log('   ✅ All properties extracted!');
  } else {
    missingProps.forEach(prop => console.log(`   ❌ ${prop}`));
  }
  
  console.log('\n📈 Coverage:');
  console.log(`   Total: ${report.coverage.total}/6 property categories`);
  const percentage = Math.round((report.coverage.total / 6) * 100);
  console.log(`   Coverage: ${percentage}%`);
  
  if (percentage === 100) {
    console.log('\n✅ 100% property extraction achieved!');
  } else {
    console.log(`\n⚠️  Missing ${100 - percentage}% of properties`);
  }
}

