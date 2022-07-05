const { Plugin } = require('powercord/entities');
const { getModule } = require('powercord/webpack'); 

module.exports = class UnblockPayments extends Plugin {
    async startPlugin() {
        const module = await getModule(['useBlockedPaymentsConfig']);
        this._oldValue = module.default.getCurrentConfig().paymentsBlocked;

        setTimeout(() => {
            module.default.getCurrentConfig().paymentsBlocked = false;
        }, 5000);
    }

    async pluginWillUnload() {
        if (!this._oldValue) return;
        const module = await getModule(['useBlockedPaymentsConfig']);
        module.default.getCurrentConfig().paymentsBlocked = this._oldValue;
    }
};
