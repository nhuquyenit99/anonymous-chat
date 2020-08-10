# develop | production | certify
TARGET_ENV?=develop

run:
	@REACT_APP_ENV=./.env.${TARGET_ENV} npm start

build:
	@REACT_APP_ENV=./.env.${TARGET_ENV} npm build
