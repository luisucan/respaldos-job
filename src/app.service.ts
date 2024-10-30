import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';
import { exec } from 'child_process';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(private configService: ConfigService) {}

  //se ejecute a la media noche
  @Cron('0 0 * * *')
  handleRespaldos() {
    this.logger.debug('Realizando respaldos');

    const pathBash = this.configService.get<string>('PATH_BASH');
    console.log(pathBash);
    exec(`bash ${pathBash}`, (error, stdout, stderr) => {
      if (error) {
        this.logger.error(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        this.logger.error(`stderr: ${stderr}`);
        return;
      }
      this.logger.debug(`stdout: ${stdout}`);
    });
  }
}
