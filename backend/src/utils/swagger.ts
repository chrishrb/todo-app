import fs from 'fs';

function getPackageJsonVersion() {
  try {
    const packageFile = fs.readFileSync('./package.json', 'utf8')
    const packageJson = JSON.parse(packageFile)
    return packageJson['version'];
  } catch (err) {
    // Error getting and parsing package.json
  }
  return null;
}

const version = getPackageJsonVersion()

export const swaggerOptions = {
  info: {
    version: version ? version : 'unknown',
    title: 'Tasks API',
    description: 'Backend API for the Tasks service.',
    license: {
      name: 'MIT',
    },
  },
  security: {
    BearerAuth: {
      type: 'http',
      scheme: 'bearer',
    },
  },
  // Base directory which we use to locate your JSDOC files
  baseDir: __dirname + '/..',
  // Glob pattern to find your jsdoc files (multiple patterns can be added in an array)
  filesPattern: ['./**/*.ts', './**/*.js'],
  // URL where SwaggerUI will be rendered
  swaggerUIPath: '/api-docs',
  // Expose OpenAPI UI
  exposeSwaggerUI: true,
  // Expose Open API JSON Docs documentation in `apiDocsPath` path.
  exposeApiDocs: true,
  // Open API JSON Docs endpoint.
  apiDocsPath: '/v3/api-docs',
  // Set non-required fields as nullable by default
  notRequiredAsNullable: false,
  // You can customize your UI options.
  // you can extend swagger-ui-express config. You can checkout an example of this
  // in the `example/configuration/swaggerOptions.js`
  swaggerUiOptions: {},
  // multiple option in case you want more that one instance
  multiple: true,
};
