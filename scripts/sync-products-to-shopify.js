#!/usr/bin/env node

/**
 * Sync Products to Shopify
 * 
 * This script uploads your local products to Shopify via the Admin API.
 * 
 * Prerequisites:
 * 1. Set up .env.local with Admin API credentials
 * 2. Install: npm install dotenv @shopify/shopify-api
 * 
 * Usage:
 * node scripts/sync-products-to-shopify.js
 */

import 'dotenv/config';
import fetch from 'node-fetch';
import { products } from '../data/products.js';

const SHOP_DOMAIN = process.env.VITE_SHOPIFY_STORE_DOMAIN;
const ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_API_TOKEN;
const API_VERSION = process.env.SHOPIFY_ADMIN_API_VERSION || '2024-01';

if (!SHOP_DOMAIN || !ADMIN_TOKEN) {
  console.error('❌ Missing Shopify credentials in .env.local');
  console.error('Required: VITE_SHOPIFY_STORE_DOMAIN, SHOPIFY_ADMIN_API_TOKEN');
  process.exit(1);
}

const shopifyEndpoint = `https://${SHOP_DOMAIN}/admin/api/${API_VERSION}/graphql.json`;

async function shopifyAdminRequest(query, variables = {}) {
  const response = await fetch(shopifyEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': ADMIN_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  const data = await response.json();
  
  if (data.errors) {
    throw new Error(JSON.stringify(data.errors, null, 2));
  }

  return data;
}

async function createProduct(product) {
  const mutation = `
    mutation CreateProduct($input: ProductInput!) {
      productCreate(input: $input) {
        product {
          id
          title
          handle
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  // Build variants from materials and sizes
  const variants = [];
  product.materials.forEach(material => {
    product.sizes.forEach(size => {
      variants.push({
        price: product.price.toString(),
        inventoryQuantity: 100,
        inventoryPolicy: 'DENY',
        options: [material, size],
      });
    });
  });

  const input = {
    title: product.name,
    descriptionHtml: `<p>${product.description}</p>`,
    vendor: 'Silver Essence',
    productType: product.jewelryType,
    tags: [product.category, product.jewelryType],
    options: ['Material', 'Size'],
    variants: variants,
    metafields: [
      {
        namespace: 'custom',
        key: 'category',
        value: product.category,
        type: 'single_line_text_field',
      },
      {
        namespace: 'custom',
        key: 'jewelry_type',
        value: product.jewelryType,
        type: 'single_line_text_field',
      },
      {
        namespace: 'custom',
        key: 'rating',
        value: product.rating.toString(),
        type: 'number_decimal',
      },
      {
        namespace: 'custom',
        key: 'reviews',
        value: product.reviews.toString(),
        type: 'number_integer',
      },
    ],
  };

  try {
    const result = await shopifyAdminRequest(mutation, { input });
    
    if (result.data.productCreate.userErrors.length > 0) {
      console.error(`❌ Error creating ${product.name}:`, result.data.productCreate.userErrors);
      return null;
    }

    console.log(`✅ Created: ${product.name}`);
    return result.data.productCreate.product;
  } catch (error) {
    console.error(`❌ Failed to create ${product.name}:`, error.message);
    return null;
  }
}

async function syncProducts() {
  console.log(`\n🚀 Starting product sync to Shopify...\n`);
  console.log(`📦 Total products to sync: ${products.length}\n`);

  let successCount = 0;
  let failCount = 0;

  for (const product of products) {
    const result = await createProduct(product);
    if (result) {
      successCount++;
    } else {
      failCount++;
    }
    
    // Rate limiting: Wait 500ms between requests
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log(`\n✨ Sync complete!`);
  console.log(`✅ Success: ${successCount}`);
  console.log(`❌ Failed: ${failCount}\n`);
}

// Run the sync
syncProducts().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
