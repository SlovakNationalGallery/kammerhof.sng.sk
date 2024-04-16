<?php
namespace Deployer;

require 'recipe/laravel.php';

set('bin/php', 'php8.1');
set('bin/composer', '{{bin/php}} $(which composer2)');
set('bin/npm', 'n --offline exec 20 npm');

// Project name
set('application', 'atlas');

// Project repository
set('repository', 'git@github.com:SlovakNationalGallery/kammerhof.sng.sk.git');

// Shared files/dirs between deploys
add('shared_dirs', ['resources/fonts']);

set('allow_anonymous_stats', false);

// Hosts
host('webumenia.sk')
    ->set('remote_user', 'lab_sng')
    ->set('deploy_path', '/var/www/kammerhof.sng.sk');

// Tasks
task('build', function () {
    cd('{{release_path}}');
    run('{{bin/npm}} ci');
    run('{{bin/npm}} run build');
});

// Hooks
after('deploy:vendors', 'build');
after('deploy:failed', 'deploy:unlock');