import { addAliases } from 'module-alias';
import path from 'path';

const srcPath = path.resolve(__dirname, '..', 'dist');

addAliases({
  '@src': srcPath,
  '@http': path.join(srcPath, 'app', 'http'),
  '@shared': path.join(srcPath, 'app', 'shared'),
  '@integration': path.join(srcPath, 'app', 'integration'),
});
