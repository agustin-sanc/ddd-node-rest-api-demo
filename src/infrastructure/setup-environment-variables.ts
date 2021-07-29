import * as DotEnv from 'dotenv';
import * as DotEnvExpand from 'dotenv-expand';

export default function setupEnvironmentVariables() {
  const dotEnvFile = DotEnv.config({ debug: true });
  DotEnvExpand(dotEnvFile)
}