# What is Slippage

Slippage exists in Automatic Market Maker (AMM) DEXs because swaps will change the price of a token based on the availability of the tokens in the trading pair liquidity pool. 

For example, a liquidity pool that has 100 ADA and 100 TEDY tokens will be a 1:1 ratio, and therefore 1 TEDY token will equal 1 ADA. If you sell 10 TEDY tokens for 10 ADA, the pool will adjust to 110 TEDY : 90 ADA. Now one TEDY is worth 0.82 ADA. 

This matters because as you can see from the above example, the price of TEDY and ADA changes as the liquidity in the pool changes. If you make a large swap, the price will move more as a result of that swap. Slippage tolerance is a setting which lets you determine how far that price can move during your trade before the transaction fails. 

In other words, if you expect to receive 10 ADA for 10 TEDY but the price moves to where 10 ADA is only worth 5 TEDY as a result of that swap, you won't receive as many tokens as you expected. To prevent this from happening, you set the slippage tolerance to 3% (or higher on more volatile trading pairs), and this prevents the price from moving too much when you trade. 
