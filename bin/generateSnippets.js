const Generatorsnippets = require('generatorsnippets');
// const modulesFilePath = 'PATH_TO/cartridge/templates/default/util/modules.isml';
const modulesFilePath = '/home/esteban/www-dev/theme_sfra/app_custom_theme/cartridges/app_custom_theme/cartridge/templates/default/components/modules.isml';
// Example 1
new Generatorsnippets({
    'modulesFilePath': modulesFilePath,
    'editorTarget': 'vscode',
    'paths': {
        'vscode': {
            outputpath: "/home/esteban/.config/Code/User/snippets/isml.json"
        }
    }
}).writeSnippets();