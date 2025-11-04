/**
 * Shopify Storefront API Client
 * 
 * This file sets up the GraphQL client for communicating with Shopify's Storefront API.
 * The Storefront API is designed to be used in client-side applications.
 * 
 * Setup Instructions:
 * 1. Create a .env.local file in your project root
 * 2. Add your Shopify credentials (see .env.example)
 * 3. Install dependencies: npm install graphql-request graphql
 */

import { GraphQLClient } from 'graphql-request';

// Environment variables (set these in .env.local)
const SHOPIFY_STORE_DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
const STOREFRONT_ACCESS_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const API_VERSION = import.meta.env.VITE_SHOPIFY_API_VERSION || '2024-01';

// Validate environment variables
if (!SHOPIFY_STORE_DOMAIN || !STOREFRONT_ACCESS_TOKEN) {
  console.error(
    '⚠️ Shopify credentials missing! Please set up your .env.local file.\n' +
    'See .env.example for required variables.'
  );
}

// Create GraphQL client
const endpoint = `https://${SHOPIFY_STORE_DOMAIN}/api/${API_VERSION}/graphql.json`;

export const shopifyClient = new GraphQLClient(endpoint, {
  headers: {
    'X-Shopify-Storefront-Access-Token': STOREFRONT_ACCESS_TOKEN || '',
    'Content-Type': 'application/json',
  },
});

/**
 * Execute a GraphQL query against Shopify Storefront API
 */
export async function shopifyFetch<T>(query: string, variables?: Record<string, any>): Promise<T> {
  try {
    const data = await shopifyClient.request<T>(query, variables);
    return data;
  } catch (error) {
    console.error('Shopify API Error:', error);
    throw error;
  }
}

/**
 * Health check for Shopify connection
 */
export async function testShopifyConnection(): Promise<boolean> {
  const query = `
    query {
      shop {
        name
        primaryDomain {
          url
        }
      }
    }
  `;

  try {
    const data = await shopifyFetch<any>(query);
    console.log('✅ Connected to Shopify store:', data.shop.name);
    return true;
  } catch (error) {
    console.error('❌ Failed to connect to Shopify:', error);
    return false;
  }
}
