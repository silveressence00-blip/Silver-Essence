#!/usr/bin/env node

/**
 * Create Shopify Theme Structure
 * 
 * This script creates a Shopify-compatible theme structure
 * and copies your React build files into it.
 * 
 * Usage:
 * 1. Build your React app: npm run build
 * 2. Run this script: node scripts/create-shopify-theme.js
 * 3. The theme will be created in the /theme directory
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');
const themeDir = path.join(rootDir, 'theme');
const distDir = path.join(rootDir, 'dist');

console.log('🎨 Creating Shopify theme structure...\n');

// Create theme directory structure
const directories = [
  'assets',
  'config',
  'layout',
  'locales',
  'sections',
  'snippets',
  'templates',
  'templates/customers',
];

directories.forEach(dir => {
  const fullPath = path.join(themeDir, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`✅ Created: ${dir}/`);
  }
});

// Check if dist directory exists
if (!fs.existsSync(distDir)) {
  console.error('\n❌ Error: dist/ directory not found!');
  console.error('Please run "npm run build" first.\n');
  process.exit(1);
}

// Copy React build files to assets
console.log('\n📦 Copying build files to assets...');

function copyDirectory(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
      console.log(`  Copied: ${entry.name}`);
    }
  }
}

copyDirectory(distDir, path.join(themeDir, 'assets'));

// Create theme.liquid
const themeLiquid = `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{ shop.name }} - {{ page_title }}</title>
  
  {{ content_for_header }}
  
  <!-- React App Styles -->
  {{ 'index.css' | asset_url | stylesheet_tag }}
</head>
<body>
  <div id="root"></div>
  
  {{ content_for_layout }}
  
  <!-- React App Scripts -->
  {{ 'index.js' | asset_url | script_tag }}
</body>
</html>`;

fs.writeFileSync(path.join(themeDir, 'layout', 'theme.liquid'), themeLiquid);
console.log('\n✅ Created: layout/theme.liquid');

// Create index.liquid
const indexLiquid = `<!-- Silver Essence React App -->
<div id="silver-essence-app"></div>

<script>
  window.SHOPIFY_CONFIG = {
    shop: {{ shop | json }},
    cart: {{ cart | json }},
    customer: {{ customer | json }}
  };
</script>`;

fs.writeFileSync(path.join(themeDir, 'templates', 'index.liquid'), indexLiquid);
console.log('✅ Created: templates/index.liquid');

// Create config files
const settingsSchema = [
  {
    name: 'theme_info',
    theme_name: 'Silver Essence',
    theme_version: '1.0.0',
    theme_author: 'Silver Essence',
    theme_documentation_url: '',
    theme_support_url: '',
  },
];

const settingsData = {
  current: 'Default',
  presets: {
    Default: {},
  },
};

fs.writeFileSync(
  path.join(themeDir, 'config', 'settings_schema.json'),
  JSON.stringify(settingsSchema, null, 2)
);
console.log('✅ Created: config/settings_schema.json');

fs.writeFileSync(
  path.join(themeDir, 'config', 'settings_data.json'),
  JSON.stringify(settingsData, null, 2)
);
console.log('✅ Created: config/settings_data.json');

console.log('\n✨ Shopify theme created successfully!\n');
console.log('📍 Location: /theme\n');
console.log('Next steps:');
console.log('1. cd theme');
console.log('2. shopify theme dev --store=your-store.myshopify.com');
console.log('3. shopify theme push\n');
