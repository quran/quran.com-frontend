# Docker instructions

## Development

To build for development:

    docker-compose up

Then navigate to `http://localhost:8000`

## Production

To build for production:

    docker-compose -f docker-compose.production.yml build

Then tag and push the resulting `frontend-prod:latest` image to a docker registry.
