.PHONY: all docker-setup docker-dashboard docker-sites docker-resources docker-wordpress backup-database restore-database

default: all

all: docker-setup docker-dashboard docker-sites docker-resources backup-database

docker-setup: provision/setup.sh
	/bin/bash provision/setup.sh

docker-dashboard: provision/dashboard.sh
	/bin/bash provision/dashboard.sh

docker-sites: provision/sites.sh
	/bin/bash provision/sites.sh

docker-resources: provision/resources.sh
	/bin/bash provision/resources.sh

docker-wordpress: provision/wordpress.sh
	/bin/bash provision/wordpress.sh

backup-database: provision/backup-database.sh
	/bin/bash provision/backup-database.sh

restore-database: provision/restore-database.sh
	/bin/bash provision/restore-database.sh
