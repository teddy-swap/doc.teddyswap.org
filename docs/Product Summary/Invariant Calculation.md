---
sidebar_position: 5
---
# Invariant Calculation

The following is a summary of the invariant calculation that will be used to reduce slippage and impermanent loss on stable/stable trading pairs. 

It all began with Uniswap…

The famous protocol that first applied the constant product formula, also known as:

_x * y = k_

where x and y are the quantities of the tokens in the pair; this formula says that whenever a swap happens k must be the same; so who is swapping must provide the number of tokens accordingly.

While the formula above works great for unrelated assets it might not be the best for tokens that are meant to be 1:1 in price.

For a token pair like that it would be great to have a formula that guarantees a price of one.

We know that in the Uniswap formula the price is given by the derivative. So we are searching for a formula with a derivative of 1! Eureka! Any y = x + C will do the work! But is it true?

_x + y = C_

A formula like the above guarantees the price of 1, but suppose C = 200; x = 100 and y = 100; then a couple of swaps of 50x in exchange for 50y and the pool is drained!

We might need something that used both of the two formulas above; let’s try to sum the two:

_(x + y) + (x * y) = C + k_

to have one single constant we can express k in terms of C, we can do that by multiplying the average of x and y (C/2) by itself as follows:

_k = (C/2)²_

so the formula becomes:

_(x + y) + (x * y) = C + (C²/4)_

if you plot the formula we got you’ll notice that it is still too similar to the constant product; so we help the constant sum part by amplifying its presence with a parameter A:

_A(x + y) + (x * y) = AC + (C²/4)_

this parameter will change dynamically with the actual price; so that is very big when close to 1, that way the constant product one loses significance; but it becomes very small (close to 0) when far away; so that it transforms back to the constant product of Uniswap.

And voilà; the last formula is what we were searching for! Something that at the equilibrium gives a price close to 1:1; but prevents the pool to be drained.
