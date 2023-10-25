# Post Mortem Analysis of Spectrum Dex Infrastructure (Work-In-Progress)

### Contracts/Validators:

- Spectrum boasts four Primary Validators:
    - Pool Validator:
        - Responsible for securing a liquidity pool and ensuring adherence to the AMM (Automated Market Maker) formula.
        - Permits direct interaction for pool manipulation, provided AMM formula/rules are followed.
        - Recommends off-chain batchers for effective pool interaction due to UTXO contention, although not mandatory.
    - Swap Validator:
        - Governs the rules for asset locking and unlocking within swap orders.
        - Ensures that only two outcomes are possible for swap orders:
            - Successful adherence to the order instructions (e.g., slippage limit) leading to the unlocking and application to the liquidity pool.
            - Order cancellation and refund.
        - Off-chain actors are responsible for executing the locking or unlocking actions in adherence to the validator's rules, while also updating the pool state and managing the transfer of order assets to users in exchange for fees.
        - Deposit Validator:
            - Functions similarly to Swap Validator but for liquidity addition.
            - Issues Liquidity Tokens as proof of liquidity shares in a specific pool to depositors.
    - Redeem Validator:
        - Mirrors the functionality of Deposit and Swap Validators for liquidity and fee retrieval.
        - Enables users to exchange Liquidity Tokens for actual liquidity plus any accumulated fees.
    - Validator Address Interaction:
        - Allows for address mangling with a stake key (StakeScript or StakeCredential) to enable ADA staking by the key's owner/controller.
        - Presents a potential avenue for staking rewards for liquidity providers.
    - Modified Validators:
        - Parameterized to alter hash based on a magic number (salt) ensuring distinct contract addresses/key hashes for protocol forks.

- Liquidity Pools
    - Creation:
        - Anyone can establish a liquidity pool, leading to what are termed Unverified Liquidity Pools.
            - One critical example concerning security is where an unlocked Liquidity Token Policy is in place. This policy could be exploited, enabling the pool creator to mint additional tokens, thereby potentially draining liquidity from the pool.
    - Verified Liquidity Pools:
        - These are sanctioned and created by Protocol Maintainers.
        - They operate under a Locked Token Policy, preventing the minting of additional tokens post-creation of the pool.
    - User Interface (UI) Display:
        - Typically, Verified Liquidity Pools are displayed within the UI, providing a layer of trust and security.
        - Although not displayed, Unverified Pools are accessible for use, albeit at the users' own risk.
- Infrastructure:
    - Numerous services reliant on the validator are dependent on the Haskell project titled `cardano-dex-contracts-offchain`, housed within the `cardano-dex-contracts` repository.
        - It's crucial to ensure that the updated UnTyped Plutus Core is generated into the `cardano-dex-contracts-offchain` project, specifically within the directory `cardano-dex-contracts-offchain/Contracts`.
            - The directory `cardano-dex-contracts-offchain/Contracts` must house the following files: (deposit.uplc, pool.uplc, redeem.uplc, swap.uplc).
        - Some services might also utilize the text-evolved version of Plutus Core.
        - Additionally, some services might reference the key-hash of the validators.
        - To generate the aforementioned information, you can use the provided functions located under `cardano-dex-contracts-offchain/ErgoDex/PValidators.hs`.
            - `writeValidatorsUPLC :: FilePath -> IO ()`
            - `writeValidators :: FilePath -> IO ()`
            - `validatorHash :: Validator -> Hash`

### Off-Chain Order Executor

- Known as the Batcher, the off-chain order executor plays a pivotal role in the Spectrum infrastructure by managing the execution of swap, deposit, and redeem orders.

- A discrepancy was noted with the Batcher version compatible with cardano-node 1.35.7, where transaction submission for confirmed orders seemed to be omitted, unlike for orders residing in the mempool. To rectify this, line 207 in amm-executor/src/Spectrum/Executor/OrdersExecutor/Service.hs was adjusted to include:

```haskell
_ <- submitTx tx
```

It's imperative to update the `cabal.project` file to reference the amended `cardano-dex-contracts` to ensure successful order batching. For instance:

For example:
```haskell
location: https://github.com/teddy-swap/cardano-dex-contracts
  tag: 29436275d34aebc4f5aaba899e32d979abe5540a
```

- Likewise, a pointer should be set to the revised cardano-dex-sdk-haskell that encompasses the updated cardano-dex-contracts submodule:

```
  location: https://github.com/teddy-swap/cardano-dex-sdk-haskell
  tag: d37d4ce18b5fd0d674fdf75f09bcbde8059bfe2e
```

- The `scripts` directory needs to be updated to house the latest UPLC files (deposit.uplc, poolV1.uplc, redeem.uplc, swap.uplc).

- The functionality of `poolV2.uplc` remains unclear. As an interim measure, the contents of `poolV1.uplc` have been replicated to `poolV2.uplc`.

