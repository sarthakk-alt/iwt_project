#!/usr/bin/env fish

set -l project_dir (dirname (status --current-filename))
set -l tomcat_home (brew --prefix tomcat@9)/libexec
set -l webapps $tomcat_home/webapps
set -l app chronoculture
set -l war $project_dir/target/$app.war

cd $project_dir; or exit 1

echo "==> Stopping Tomcat 9 (if running)"
catalina stop 30 >/dev/null 2>&1; or true

echo "==> Building WAR"
mvn clean package -q; or begin
    echo "Build failed"; exit 1
end

echo "==> Removing old deployment"
rm -rf $webapps/$app $webapps/$app.war

echo "==> Copying new WAR to $webapps"
cp $war $webapps/

echo "==> Deployed. Tail logs with: tail -f $tomcat_home/logs/catalina.out"
