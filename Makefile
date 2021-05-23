include ./secrets.mk

.PHONY: wrangler.toml

wrangler.toml:
	envsubst < ./$@.template > $@

deploy: wrangler.toml
	cd app && yarn build
	wrangler publish --env production
