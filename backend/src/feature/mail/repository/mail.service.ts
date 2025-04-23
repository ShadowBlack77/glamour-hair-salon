import { BadRequestException, Injectable } from "@nestjs/common";
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {

  constructor(private readonly _mailerService: MailerService) {}

  async sendMail(to: string, subject: string, template: string, context: any) {
    try {
      await this._mailerService.sendMail({
        to,
        from: process.env.MAIL_USER,
        subject,
        template,
        context
      });

      return { content: 'email sended successfully' }
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}