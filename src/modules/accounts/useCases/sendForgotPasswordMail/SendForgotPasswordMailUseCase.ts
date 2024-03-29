import { resolve } from "path";
import { inject, injectable } from "tsyringe";
import { v4 as uuidV4 } from "uuid";

import IUserRepository from "@modules/accounts/repositories/IUserRepository";
import IUsersTokenRepository from "@modules/accounts/repositories/IUsersTokenRepository";
import IDateProvider from "@shared/container/providers/DateProvider/IDateProvider";
import IMailProvider from "@shared/container/providers/MailProvider/IMailProvider";
import AppError from "@shared/errors/AppError";

@injectable()
class SendForgotPasswordMailUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,

    @inject("UsersTokenRepository")
    private usersTokenRepository: IUsersTokenRepository,

    @inject("DayDateProvider")
    private dayDateProvider: IDateProvider,

    @inject("MailProvider")
    private mailProvider: IMailProvider
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.userRepository.findByEmail(email);

    const templatePath = resolve(
      __dirname,
      "..",
      "..",
      "views",
      "emails",
      "forgotPassword.hbs"
    );

    if (!user) {
      throw new AppError("User does not exists!");
    }

    const token = uuidV4();

    await this.usersTokenRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date: this.dayDateProvider.addHours(3),
    });

    const variables = {
      name: user.name,
      link: `${process.env.FORGOT_MAIL_URL}${token}`,
    };

    await this.mailProvider.sendMail(
      email,
      "Recuperação de senha",
      variables,
      templatePath
    );
  }
}

export default SendForgotPasswordMailUseCase;
