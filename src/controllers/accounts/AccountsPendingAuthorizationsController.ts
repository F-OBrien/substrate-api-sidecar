import { RequestHandler } from 'express';
import { IAddressParam } from 'src/types/requests';

import { validateAddress } from '../../middleware';
import { AccountsPendingAuthorizationsService } from '../../services';
import AbstractController from '../AbstractController';

/**
 * GET pending authorizations for an address.
 *
 * Paths:
 * - `address`: The address to query.
 *
 * Returns:
 * - `auths`: Array of pending JoinIdentity authorization IDs for the account
 */
export default class AccountsPendingAuthorizationsController extends AbstractController<AccountsPendingAuthorizationsService> {
	constructor(api: string) {
		super(api, '/accounts/:address/auths-info', new AccountsPendingAuthorizationsService(api));
		this.initRoutes();
	}

	protected initRoutes(): void {
		this.router.use(this.path, validateAddress);

		this.safeMountAsyncGetHandlers([['', this.getAccountPendingAuthorizations]]);
	}

	/**
	 * Get the pending authorizations for `address`.
	 *
	 * @param req Express Request
	 * @param res Express Response
	 */
	private getAccountPendingAuthorizations: RequestHandler<IAddressParam> = async (
		{ params: { address } },
		res,
	): Promise<void> => {
		AccountsPendingAuthorizationsController.sanitizedSend(
			res,
			await this.service.fetchAccountPendingAuthorizations(address),
		);
	};
}
