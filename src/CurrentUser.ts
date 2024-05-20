import { Account, ID } from "appwrite";

export class CurrentUser extends Account {
    isLogin() {
        return this.get().catch(() => false);
    }
    createAccountWithEmail(email: string, password: string) {
        this.create(ID.unique(), email, password);
    }
    logout = this.deleteSessions;
    loginWithEmail = this.createEmailPasswordSession;
    loginWithAnonymous = this.createAnonymousSession;
    /**
     * @zh 自动邮件验证
     * @onlyOnServer
     */
    async autoEmailValidate() {
        const result = await this.createVerification(
            ''
        );
        return this.updateVerification(
            result.userId,
            result.secret // secret
        );
    }
}
