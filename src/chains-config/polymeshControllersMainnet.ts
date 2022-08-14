import { ControllerConfig } from '../types/chains-config';
import { initLRUCache } from './cache/lruCache';

/**
 * Polymesh configuration for Sidecar.
 */
export const polymeshControllersMainnet: ControllerConfig = {
	controllers: [
		'AccountsBalanceInfo',
		'AccountsCddInfo',
		'AccountsPendingAuthorizations',
		'AccountsStakingPayouts',
		'AccountsStakingInfo',
		'AccountsValidate',
		'Blocks',
		'BlocksExtrinsics',
		'NodeNetwork',
		'NodeTransactionPool',
		'NodeVersion',
		'PalletsStakingProgress',
		'PalletsStorage',
		'RuntimeCode',
		'RuntimeMetadata',
		'RuntimeSpec',
		'TransactionDryRun',
		'TransactionFeeEstimate',
		'TransactionMaterial',
		'TransactionSubmit',
	],
	options: {
		finalizes: true,
		minCalcFeeRuntime: 0,
		blockStore: initLRUCache(),
	},
};
