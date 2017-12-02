# Docker instructions

## Development

To build for development:

    docker-compose up

Then navigate to `http://localhost:8000`

## Production

To build for production:

    docker-compose -f docker-compose.production.yml up

Then push the resulting `frontend-prod:latest` image to a docker registry.

[Pending] To deploy a swarm stack:

    docker-compose -f docker-compose.production.yml config | docker stack deploy -c- <stack-name>

