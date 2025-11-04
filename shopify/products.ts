/**
 * Shopify Products API
 * 
 * Functions for fetching and managing products from Shopify.
 */

import { shopifyFetch } from './client';
import { Product } from '../types/product';

/**
 * GraphQL query to fetch all products
 */
const GET_PRODUCTS_QUERY = `
  query GetProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                priceV2 {
                  amount
                  currencyCode
                }
                availableForSale
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
          availableForSale
          tags
          metafields(identifiers: [
            { namespace: "custom", key: "category" }
            { namespace: "custom", key: "jewelry_type" }
            { namespace: "custom", key: "rating" }
            { namespace: "custom", key: "reviews" }
          ]) {
            key
            value
          }
        }
      }
    }
  }
`;

/**
 * Fetch products from Shopify and map to our Product type
 */
export async function fetchShopifyProducts(): Promise<Product[]> {
  try {
    const data = await shopifyFetch<any>(GET_PRODUCTS_QUERY, { first: 50 });
    
    const products: Product[] = data.products.edges.map((edge: any) => {
      const node = edge.node;
      
      // Extract metafields
      const metafields = node.metafields.reduce((acc: any, mf: any) => {
        acc[mf.key] = mf.value;
        return acc;
      }, {});

      // Extract materials and sizes from variants
      const materials = new Set<string>();
      const sizes = new Set<string>();
      
      node.variants.edges.forEach((variant: any) => {
        variant.node.selectedOptions.forEach((option: any) => {
          if (option.name === 'Material') materials.add(option.value);
          if (option.name === 'Size') sizes.add(option.value);
        });
      });

      // Map to our Product type
      return {
        id: node.handle,
        name: node.title,
        price: parseFloat(node.priceRange.minVariantPrice.amount),
        images: node.images.edges.map((img: any) => img.node.url),
        description: node.description,
        category: metafields.category || 'women',
        jewelryType: metafields.jewelry_type || 'rings',
        materials: Array.from(materials) as any[],
        sizes: Array.from(sizes) as any[],
        inStock: node.availableForSale,
        rating: parseFloat(metafields.rating || '4.5'),
        reviews: parseInt(metafields.reviews || '0'),
      };
    });

    return products;
  } catch (error) {
    console.error('Error fetching Shopify products:', error);
    // Fallback to local products if Shopify fails
    return [];
  }
}

/**
 * Fetch a single product by handle
 */
export async function fetchProductByHandle(handle: string): Promise<Product | null> {
  const query = `
    query GetProduct($handle: String!) {
      product(handle: $handle) {
        id
        title
        handle
        description
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 5) {
          edges {
            node {
              url
              altText
            }
          }
        }
        variants(first: 10) {
          edges {
            node {
              id
              title
              priceV2 {
                amount
                currencyCode
              }
              availableForSale
              selectedOptions {
                name
                value
              }
            }
          }
        }
        availableForSale
      }
    }
  `;

  try {
    await shopifyFetch<any>(query, { handle });
    // Map to Product type (similar to above)
    // ... implement mapping
    return null; // TODO: Implement mapping
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}
