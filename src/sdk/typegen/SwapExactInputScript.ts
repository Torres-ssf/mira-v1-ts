/* Autogenerated file. Do not edit manually. */

/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/consistent-type-imports */

/*
  Fuels version: 0.96.0
*/

import {
  Account,
  BigNumberish,
  BN,
  decompressBytecode,
  Script,
  StrSlice,
} from 'fuels';

import type { Enum, Vec } from "./common";

export type IdentityInput = Enum<{ Address: AddressInput, ContractId: ContractIdInput }>;
export type IdentityOutput = Enum<{ Address: AddressOutput, ContractId: ContractIdOutput }>;

export type AddressInput = { bits: string };
export type AddressOutput = AddressInput;
export type AssetIdInput = { bits: string };
export type AssetIdOutput = AssetIdInput;
export type ContractIdInput = { bits: string };
export type ContractIdOutput = ContractIdInput;

export type SwapExactInputScriptInputs = [amount_in: BigNumberish, asset_in: AssetIdInput, amount_out_min: BigNumberish, pools: Vec<[AssetIdInput, AssetIdInput, boolean]>, recipient: IdentityInput, deadline: BigNumberish];
export type SwapExactInputScriptOutput = Vec<[BN, AssetIdOutput]>;

export type SwapExactInputScriptConfigurables = Partial<{
  AMM_CONTRACT_ID: ContractIdInput;
}>;

const abi = {
  "programType": "script",
  "specVersion": "1",
  "encodingVersion": "1",
  "concreteTypes": [
    {
      "type": "(struct std::asset_id::AssetId, struct std::asset_id::AssetId, bool)",
      "concreteTypeId": "a95e1fcceb1451b8a76471f593f66c4a52ca04bde3c227c746ad7aaf988de5c6",
      "metadataTypeId": 1
    },
    {
      "type": "(u64, struct std::asset_id::AssetId)",
      "concreteTypeId": "e10d8bfc338a29565debd72645b365f9b0481e462fd7d591848de4a73223d58d",
      "metadataTypeId": 0
    },
    {
      "type": "enum std::identity::Identity",
      "concreteTypeId": "ab7cd04e05be58e3fc15d424c2c4a57f824a2a2d97d67252440a3925ebdc1335",
      "metadataTypeId": 4
    },
    {
      "type": "str",
      "concreteTypeId": "8c25cb3686462e9a86d2883c5688a22fe738b0bbc85f458d2d2b5f3f667c6d5a"
    },
    {
      "type": "struct std::asset_id::AssetId",
      "concreteTypeId": "c0710b6731b1dd59799cf6bef33eee3b3b04a2e40e80a0724090215bbf2ca974",
      "metadataTypeId": 8
    },
    {
      "type": "struct std::contract_id::ContractId",
      "concreteTypeId": "29c10735d33b5159f0c71ee1dbd17b36a3e69e41f00fab0d42e1bd9f428d8a54",
      "metadataTypeId": 9
    },
    {
      "type": "struct std::vec::Vec<(struct std::asset_id::AssetId, struct std::asset_id::AssetId, bool)>",
      "concreteTypeId": "a5cbfec6a05585025be4180a09c2bd7944724d54ac729c9bebe421d061ee5378",
      "metadataTypeId": 11,
      "typeArguments": [
        "a95e1fcceb1451b8a76471f593f66c4a52ca04bde3c227c746ad7aaf988de5c6"
      ]
    },
    {
      "type": "struct std::vec::Vec<(u64, struct std::asset_id::AssetId)>",
      "concreteTypeId": "6f03bcbe6f8a1e01b5dcb5701ab21443606d1b323a888ead4e9a2ecda650ae2e",
      "metadataTypeId": 11,
      "typeArguments": [
        "e10d8bfc338a29565debd72645b365f9b0481e462fd7d591848de4a73223d58d"
      ]
    },
    {
      "type": "u32",
      "concreteTypeId": "d7649d428b9ff33d188ecbf38a7e4d8fd167fa01b2e10fe9a8f9308e52f1d7cc"
    },
    {
      "type": "u64",
      "concreteTypeId": "1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0"
    }
  ],
  "metadataTypes": [
    {
      "type": "(_, _)",
      "metadataTypeId": 0,
      "components": [
        {
          "name": "__tuple_element",
          "typeId": "1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0"
        },
        {
          "name": "__tuple_element",
          "typeId": 8
        }
      ]
    },
    {
      "type": "(_, _, _)",
      "metadataTypeId": 1,
      "components": [
        {
          "name": "__tuple_element",
          "typeId": 8
        },
        {
          "name": "__tuple_element",
          "typeId": 8
        },
        {
          "name": "__tuple_element",
          "typeId": 3
        }
      ]
    },
    {
      "type": "b256",
      "metadataTypeId": 2
    },
    {
      "type": "bool",
      "metadataTypeId": 3
    },
    {
      "type": "enum std::identity::Identity",
      "metadataTypeId": 4,
      "components": [
        {
          "name": "Address",
          "typeId": 7
        },
        {
          "name": "ContractId",
          "typeId": 9
        }
      ]
    },
    {
      "type": "generic T",
      "metadataTypeId": 5
    },
    {
      "type": "raw untyped ptr",
      "metadataTypeId": 6
    },
    {
      "type": "struct std::address::Address",
      "metadataTypeId": 7,
      "components": [
        {
          "name": "bits",
          "typeId": 2
        }
      ]
    },
    {
      "type": "struct std::asset_id::AssetId",
      "metadataTypeId": 8,
      "components": [
        {
          "name": "bits",
          "typeId": 2
        }
      ]
    },
    {
      "type": "struct std::contract_id::ContractId",
      "metadataTypeId": 9,
      "components": [
        {
          "name": "bits",
          "typeId": 2
        }
      ]
    },
    {
      "type": "struct std::vec::RawVec",
      "metadataTypeId": 10,
      "components": [
        {
          "name": "ptr",
          "typeId": 6
        },
        {
          "name": "cap",
          "typeId": "1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0"
        }
      ],
      "typeParameters": [
        5
      ]
    },
    {
      "type": "struct std::vec::Vec",
      "metadataTypeId": 11,
      "components": [
        {
          "name": "buf",
          "typeId": 10,
          "typeArguments": [
            {
              "name": "",
              "typeId": 5
            }
          ]
        },
        {
          "name": "len",
          "typeId": "1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0"
        }
      ],
      "typeParameters": [
        5
      ]
    }
  ],
  "functions": [
    {
      "inputs": [
        {
          "name": "amount_in",
          "concreteTypeId": "1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0"
        },
        {
          "name": "asset_in",
          "concreteTypeId": "c0710b6731b1dd59799cf6bef33eee3b3b04a2e40e80a0724090215bbf2ca974"
        },
        {
          "name": "amount_out_min",
          "concreteTypeId": "1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0"
        },
        {
          "name": "pools",
          "concreteTypeId": "a5cbfec6a05585025be4180a09c2bd7944724d54ac729c9bebe421d061ee5378"
        },
        {
          "name": "recipient",
          "concreteTypeId": "ab7cd04e05be58e3fc15d424c2c4a57f824a2a2d97d67252440a3925ebdc1335"
        },
        {
          "name": "deadline",
          "concreteTypeId": "d7649d428b9ff33d188ecbf38a7e4d8fd167fa01b2e10fe9a8f9308e52f1d7cc"
        }
      ],
      "name": "main",
      "output": "6f03bcbe6f8a1e01b5dcb5701ab21443606d1b323a888ead4e9a2ecda650ae2e",
      "attributes": null
    }
  ],
  "loggedTypes": [
    {
      "logId": "10098701174489624218",
      "concreteTypeId": "8c25cb3686462e9a86d2883c5688a22fe738b0bbc85f458d2d2b5f3f667c6d5a"
    }
  ],
  "messagesTypes": [],
  "configurables": [
    {
      "name": "AMM_CONTRACT_ID",
      "concreteTypeId": "29c10735d33b5159f0c71ee1dbd17b36a3e69e41f00fab0d42e1bd9f428d8a54",
      "offset": 18048
    }
  ]
};

const bytecode = decompressBytecode('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');

export class SwapExactInputScript extends Script<SwapExactInputScriptInputs, SwapExactInputScriptOutput> {

  static readonly abi = abi;
  static readonly bytecode = bytecode;

  constructor(wallet: Account) {
    super(bytecode, abi, wallet);
  }
}
