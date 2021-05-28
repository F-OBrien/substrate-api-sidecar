import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { IAccountCddInfo } from 'src/types/responses';

import { AbstractService } from '../AbstractService';

export class AccountsCddInfoService extends AbstractService {
	private polymeshSdk: Polymesh | undefined;
	/**
	 * Fetch CDD status for an account.
	 *
	 * @param address Address to check for CDD status.
	 */
	async fetchAccountCddInfo(address: string): Promise<IAccountCddInfo> {
		if (this.polymeshSdk === undefined) {
			const nodeUrl = process.env.SAS_SUBSTRATE_URL;
			if (!nodeUrl) {
				throw new Error('SAS_SUBSTRATE_URL environment variable is not set');
			}
			this.polymeshSdk = await Polymesh.connect({ nodeUrl });
		}

		const account = await this.polymeshSdk.accountManagement.getAccount({ address: address });
		if (!(await account.exists())) {
			return {
				did: '',
				hasCddClaim: false,
			};
		}
		const identity = await account.getIdentity();
		if (identity === null) {
			return {
				did: '',
				hasCddClaim: false,
			};
		}
		const validCdd = await identity.hasValidCdd();

		return {
			did: identity.did,
			hasCddClaim: validCdd,
		};
	}
}
