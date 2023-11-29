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
        - Creation Transaction:
            - Mint Tokens
            - Lock Tokens to Pool
            - Others
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
 - The batcher must synchronize at the point before the pools are created or must atleast see a succesful transaction for the pool creation, swap or add / remove liquidity.
 
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

### Cardano Markets Tracker

The Cardano Markets Tracker is a core component of the Spectrum offchain infrastructure, developed in Haskell. Its primary functions include:

- **Monitoring the Cardano Blockchain**: It keeps track of the current state of the blockchain, ensuring up-to-date information.
- **Liquidity Pools and Transactions**: Tracks the state and transactions of liquidity pools to ensure proper market operation.
- **Swap Orders and Transactions**: Monitors swap orders and their associated transactions to facilitate asset exchanges.
- **Deposit Orders and Transactions**: Tracks deposit orders and transactions to aid in liquidity provision.
- Redeem Orders and Transactions: Monitors redeem orders and transactions to ensure accurate liquidity and fee retrieval.
- **Mempool and Transactions**: Keeps track of the mempool and transactions within it, aiding in managing network congestion and transaction throughput.
- **UTXO Set:** Monitors the Unspent Transaction Output (UTXO) set, which is crucial for transaction validation.

After tracking these components, the Cardano Markets Tracker writes the state of the blockchain to various Kafka topics (e.g., mempool-orders-topic, orders-topic, pools-topic-name, tx-events), which are then utilized by Spectrum's offchain services for further processing.

> *Note: The existing Markets Tracker repository from Spectrum Finance contained incomplete code which hindered its successful compilation and execution. The TeddySwap team addressed this by amending the Haskell code in the file `tracker/src/Tracker/Models/OnChainEvent.hs` as follows:*

```hs
module Tracker.Models.OnChainEvent
  ( OnChainEvent(..)
  ) where

import Cardano.Api (SlotNo)
import ErgoDex.State
import Data.Aeson (FromJSON, ToJSON)
import GHC.Generics (Generic)

data OnChainEvent a = OnChainEvent (OnChain a) SlotNo
  deriving (Show, Eq, Generic, FromJSON, ToJSON)
```

### Cardano Dex Index

The Cardano Dex Index is a pivotal component of the Spectrum offchain infrastructure and is engineered using Scala. It is compartmentalized into three distinct microservices:

- **Db-Writer**: This microservice is tasked with listening to specified Kafka topics (e.g., mempool-orders-topic, orders-topic, pools-topic-name, tx-events) and transcribing the data into a PostgreSQL database. Before committing certain data, it evaluates specific conditions, like verifying if the transactions originate from or are directed to a designated script-hash (pool validator). For TeddySwap, the script-hash is currently hardcoded to `28bbd1f7aebb3bc59e13597f333aeefb8f5ab78eda962de1d605b388`, as observed in the file `modules/db-writer/src/main/scala/fi/spectrumlabs/db/writer/classes/Handle.scala` at line `403`, as of the documentation date. 

> *Note: A recommended future change is to relocate the script-hash to a config file to facilitate easier modification.*.

- **Rates-Resolver**: **Work-In-Progress**

- **Markets-API**: This microservice offers a RESTful API to enable data retrieval from the PostgreSQL database. The available REST endpoints encompass:

    - **/v1/front/pools**: Fetches the current status of all liquidity pools.
    - **/v1/pools/overview**: Similar to the previous endpoint but enriched with additional data such as current Total Value Locked (TVL), Volume, and Fees.
    - **/v1/platform/stats**: Provides a snapshot of the platform's current status, including Total Volume and Total Value Locked.
    - **/v1/mempool/order**: Fetches the current status of the mempool filtered by user address.
    - **/v1/history/order/v2**: Retrieves the order history for a specified user address.

> *Note: The repository for Cardano Dex Index from Spectrum Finance exhibited certain issues, including PostgreSQL errors pertaining to the insertion of `\0000` data into JSON columns, which led PostgreSQL to reject the data insertion. The TeddySwap team resolved this by modifying the file `modules/db-writer/src/main/scala/fi/spectrumlabs/db/writer/models/Output.scala` as shown below:*

```scala
 Addr(output.fullTxOutAddress.addressCredential.toString),
        Bytea(""),
        none,
        output.fullTxOutValue.asJson,
        sanitizeJson(output.fullTxOutValue.asJson),
        none,
        none,
        none,
        none
      )
    }
  }

  def sanitizeJson(json: Json): Json = {
    json.mapString(removeNullCharacter).mapArray(_.map(sanitizeJson)).mapObject(_.mapValues(sanitizeJson))
  }

  def removeNullCharacter(str: String): String = {
    str.replace("\u0000", "") // Replaces the null character with an empty string
  }
}
```

> Another issue was related to a mismatch between the Kafka topic schema to the parser expected schema. The TeddySwap team had to adjust the parsing logic to address the issue, For example `modules/db-writer/src/main/scala/fi/spectrumlabs/db/writer/models/cardano/Confirmed.scala`: 

```scala
override def apply(c: HCursor): Decoder.Result[Confirmed[A]] = {
      c.values.toRight(DecodingFailure("Expected array", c.history)).flatMap { jsons =>
        jsons.toList match {
          case List(innerArrayJson, slotNoJson) =>
            for {
              innerArray <- innerArrayJson.asArray.toRight(DecodingFailure("Expected inner array", c.history))
              List(txOutJson, elementJson) = innerArray.toList
              txOut <- txOutJson.as[FullTxOut]
              element <- elementJson.as[A]
              slotNo <- slotNoJson.as[Long]
            } yield Confirmed(txOut, element, slotNo)
          case _ => Left(DecodingFailure("Expected array of two elements", c.history))
        }
```

> The TeddySwap team is currently uncertain whether these issues have been addressed in unmerged/pending pull requests or through uncommitted changes in the Spectrum Finance repository, given the presence of several unmerged branches and pull requests within the repository. The solutions implemented are considered temporary, with plans to consult the upstream repository for more permanent resolutions in the future. Engaging in a dialogue with the Spectrum Finance team might be necessary to thoroughly address and resolve these concerns.