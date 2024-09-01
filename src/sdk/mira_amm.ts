import {Account, Address, AssetId, BigNumberish, ScriptTransactionRequest, TxParams} from "fuels";
import {DEFAULT_AMM_CONTRACT_ID} from "./constants";
import {
  AddLiquidityScript,
  CreatePoolAndAddLiquidityScript,
  RemoveLiquidityScript,
  SwapExactInputScript,
  SwapExactOutputScript
} from "./typegen";
import {MiraAmmContract} from "./typegen/MiraAmmContract";
import {PoolId} from "./model";
import {addressInput, assetInput, contractIdInput, getAssetId, getLPAssetId, poolIdInput, reorderPoolId} from "./utils";

export class MiraAmm {
  private readonly account: Account;
  private readonly ammContract: MiraAmmContract;
  private readonly addLiquidityScript: AddLiquidityScript;
  private readonly createPoolAndAddLiquidityScript: CreatePoolAndAddLiquidityScript;
  private readonly removeLiquidityScript: RemoveLiquidityScript;
  private readonly swapExactInputScript: SwapExactInputScript;
  private readonly swapExactOutputScript: SwapExactOutputScript;

  constructor(account: Account, contractIdOpt?: string) {
    const contractId = contractIdOpt ?? DEFAULT_AMM_CONTRACT_ID;
    const contractIdConfigurables = {AMM_CONTRACT_ID: contractIdInput(contractId)};
    this.account = account;
    this.ammContract = new MiraAmmContract(contractId, account);
    this.addLiquidityScript = new AddLiquidityScript(account)
      .setConfigurableConstants(contractIdConfigurables);
    this.createPoolAndAddLiquidityScript = new CreatePoolAndAddLiquidityScript(account)
      .setConfigurableConstants(contractIdConfigurables);
    this.removeLiquidityScript = new RemoveLiquidityScript(account)
      .setConfigurableConstants(contractIdConfigurables);
    this.swapExactInputScript = new SwapExactInputScript(account)
      .setConfigurableConstants(contractIdConfigurables);
    this.swapExactOutputScript = new SwapExactOutputScript(account)
      .setConfigurableConstants(contractIdConfigurables);
  }

  id(): string {
    return this.ammContract.id.toString();
  }

  async addLiquidity(
    poolId: PoolId,
    amount0Desired: BigNumberish,
    amount1Desired: BigNumberish,
    amount0Min: BigNumberish,
    amount1Min: BigNumberish,
    deadline: BigNumberish,
    txParams?: TxParams,
  ): Promise<ScriptTransactionRequest> {
    poolId = reorderPoolId(poolId);
    const request = await this.addLiquidityScript
      .functions
      .main(poolIdInput(poolId), amount0Desired, amount1Desired, amount0Min, amount1Min, addressInput(this.account.address), deadline)
      .addContracts([this.ammContract])
      .txParams(txParams ?? {})
      .getTransactionRequest();

    request.addResources(
      await this.account.getResourcesToSpend([
        {
          assetId: poolId[0].bits,
          amount: amount0Desired,
        },
        {
          assetId: poolId[1].bits,
          amount: amount1Desired,
        },
      ])
    );

    request.addVariableOutputs(1); // LP token

    return request;
  }

  async createPoolAndAddLiquidity(
    token0Contract: string,
    token0SubId: string,
    token1Contract: string,
    token1SubId: string,
    isStable: boolean,
    amount0Desired: BigNumberish,
    amount1Desired: BigNumberish,
    deadline: BigNumberish,
    txParams?: TxParams,
  ): Promise<ScriptTransactionRequest> {
    let request = await this.createPoolAndAddLiquidityScript
      .functions
      .main(contractIdInput(token0Contract), token0SubId, contractIdInput(token1Contract), token1SubId, isStable, amount0Desired, amount1Desired, addressInput(this.account.address), deadline)
      .addContracts([this.ammContract])
      .txParams(txParams ?? {})
      .getTransactionRequest();
    const token0Asset = getAssetId(token0Contract, token0SubId);
    const token1Asset = getAssetId(token1Contract, token1SubId);

    request.addResources(
      await this.account.getResourcesToSpend([
        {
          assetId: token0Asset.bits,
          amount: amount0Desired,
        },
        {
          assetId: token1Asset.bits,
          amount: amount1Desired,
        },
      ])
    );

    request = request.addContractInputAndOutput(Address.fromString(token0Contract));
    if (token0Contract != token1Contract) {
      request = request.addContractInputAndOutput(Address.fromString(token1Contract));
    }

    request.addVariableOutputs(2); // LP token x2

    return request;
  }

  async removeLiquidity(
    poolId: PoolId,
    liquidity: BigNumberish,
    amount0Min: BigNumberish,
    amount1Min: BigNumberish,
    deadline: BigNumberish,
    txParams?: TxParams,
  ): Promise<ScriptTransactionRequest> {
    poolId = reorderPoolId(poolId);
    const request = await this.removeLiquidityScript
      .functions
      .main(poolIdInput(poolId), liquidity, amount0Min, amount1Min, addressInput(this.account.address), deadline)
      .addContracts([this.ammContract])
      .txParams(txParams ?? {})
      .getTransactionRequest();

    request.addResources(
      await this.account.getResourcesToSpend([
        {
          assetId: getLPAssetId(this.ammContract.id.toB256(), poolId).bits,
          amount: liquidity,
        },
      ])
    );

    request.addVariableOutputs(2); // tokens to receive back

    return request;
  }

  async swapExactInput(
    amountIn: BigNumberish,
    assetIn: AssetId,
    amountOutMin: BigNumberish,
    pools: PoolId[],
    deadline: BigNumberish,
    txParams?: TxParams,
  ): Promise<ScriptTransactionRequest> {
    const request = await this.swapExactInputScript
      .functions
      .main(amountIn, assetInput(assetIn), amountOutMin, pools.map(poolIdInput), addressInput(this.account.address), deadline)
      .addContracts([this.ammContract])
      .txParams(txParams ?? {})
      .getTransactionRequest();

    request.addVariableOutputs(1); // The token to receive

    return request;
  }

  async swapExactOutput(
    amountOut: BigNumberish,
    assetOut: AssetId,
    amountInMax: BigNumberish,
    pools: PoolId[],
    deadline: BigNumberish,
    txParams?: TxParams,
  ): Promise<ScriptTransactionRequest> {
    const request = await this.swapExactOutputScript
      .functions
      .main(amountOut, assetInput(assetOut), amountInMax, pools.map(poolIdInput), addressInput(this.account.address), deadline)
      .addContracts([this.ammContract])
      .txParams(txParams ?? {})
      .getTransactionRequest();

    request.addVariableOutputs(1); // The token to receive

    return request;
  }

  async transferOwnership(
    newOwner: string,
    txParams?: TxParams,
  ): Promise<ScriptTransactionRequest> {
    return await this.ammContract
      .functions
      .transfer_ownership(addressInput(newOwner))
      .addContracts([this.ammContract])
      .txParams(txParams ?? {})
      .getTransactionRequest();
  }
}
