import { cache } from 'react';
import type { Payment } from '../migrations/00005-payment';
import { sql } from './connect';

export const getPaymentInsecure = cache(async () => {
  const payment = await sql<Payment[]>`
    SELECT
      *
    FROM
      payment
  `;

  return payment;
});
