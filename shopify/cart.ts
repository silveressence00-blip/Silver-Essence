/**
 * Shopify Cart & Checkout API
 * 
 * Functions for managing cart and creating checkouts.
 */

import { shopifyFetch } from './client';
import { CartItem } from '../types/product';

/**
 * Create a checkout with cart items
 */
export async function createCheckout(items: CartItem[]): Promise<string | null> {
  const lineItems = items.map(item => ({
    variantId: item.id, // This should be the Shopify variant ID
    quantity: item.quantity,
  }));

  const mutation = `
    mutation CreateCheckout($input: CheckoutCreateInput!) {
      checkoutCreate(input: $input) {
        checkout {
          id
          webUrl
          lineItems(first: 10) {
            edges {
              node {
                title
                quantity
              }
            }
          }
        }
        checkoutUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  try {
    const data = await shopifyFetch<any>(mutation, {
      input: { lineItems },
    });

    if (data.checkoutCreate.checkoutUserErrors.length > 0) {
      console.error('Checkout errors:', data.checkoutCreate.checkoutUserErrors);
      return null;
    }

    // Return the checkout URL to redirect user
    return data.checkoutCreate.checkout.webUrl;
  } catch (error) {
    console.error('Error creating checkout:', error);
    return null;
  }
}

/**
 * Add items to an existing checkout
 */
export async function addToCheckout(
  checkoutId: string,
  items: CartItem[]
): Promise<boolean> {
  const lineItems = items.map(item => ({
    variantId: item.id,
    quantity: item.quantity,
  }));

  const mutation = `
    mutation AddLineItems($checkoutId: ID!, $lineItems: [CheckoutLineItemInput!]!) {
      checkoutLineItemsAdd(checkoutId: $checkoutId, lineItems: $lineItems) {
        checkout {
          id
          webUrl
        }
        checkoutUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  try {
    const data = await shopifyFetch<any>(mutation, {
      checkoutId,
      lineItems,
    });

    return data.checkoutLineItemsAdd.checkoutUserErrors.length === 0;
  } catch (error) {
    console.error('Error adding to checkout:', error);
    return false;
  }
}

/**
 * Update checkout line item quantity
 */
export async function updateCheckoutItem(
  checkoutId: string,
  lineItemId: string,
  quantity: number
): Promise<boolean> {
  const mutation = `
    mutation UpdateLineItems($checkoutId: ID!, $lineItems: [CheckoutLineItemUpdateInput!]!) {
      checkoutLineItemsUpdate(checkoutId: $checkoutId, lineItems: $lineItems) {
        checkout {
          id
        }
        checkoutUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  try {
    const data = await shopifyFetch<any>(mutation, {
      checkoutId,
      lineItems: [{ id: lineItemId, quantity }],
    });

    return data.checkoutLineItemsUpdate.checkoutUserErrors.length === 0;
  } catch (error) {
    console.error('Error updating checkout item:', error);
    return false;
  }
}

/**
 * Remove items from checkout
 */
export async function removeFromCheckout(
  checkoutId: string,
  lineItemIds: string[]
): Promise<boolean> {
  const mutation = `
    mutation RemoveLineItems($checkoutId: ID!, $lineItemIds: [ID!]!) {
      checkoutLineItemsRemove(checkoutId: $checkoutId, lineItemIds: $lineItemIds) {
        checkout {
          id
        }
        checkoutUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  try {
    const data = await shopifyFetch<any>(mutation, {
      checkoutId,
      lineItemIds,
    });

    return data.checkoutLineItemsRemove.checkoutUserErrors.length === 0;
  } catch (error) {
    console.error('Error removing from checkout:', error);
    return false;
  }
}
