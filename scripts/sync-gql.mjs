import { copyFileSync } from 'fs';
import globby from 'globby';


(async () => {
    const paths = await globby(['src/**/*.graphql', '!src/components']);
    paths.forEach((path) => {
        const newPath = path.replace(/src/,'dist');
        console.info(`Copying ${path} to ${newPath}`);
        copyFileSync(path, newPath);
    })
})();