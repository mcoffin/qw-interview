# qw-interview

Code for the QuoteWizard coding exercise

## Assumptions & Questions for "Client"

1. I'd ask what format they want the data to be returned in (but assume JSON, based on the format of the provided data file)
2. I'd ask what the size of the final data set they plan to use may be.
3. I would assume, but confirm that they're looking for an HTTP API.
4. I would ask for a timeline for the project.
5. I would ask for ballpark estimates on traffic and dataset size.
6. I would ask about security concerns, and whether this API would require an authentication feature.

## Installation instructions

Regardless of platform, with a working docker installation, the following commands will build a docker image of the project, and run it, forwarded on port `8080` on the local machine. These should be run from the root project directory.

**NOTE**: The extra `--` is *necessary* to escape from the argument parsing of the `docker` command and pass through to the API program itself

```
docker build -t qw-interview .
docker run -t --rm -p 8080:8080 qw-interview -- --bind-address 0.0.0.0
```

## Endpoints

| Endpoint | Method | Description |
| -------- | ------ | ----------- |
| `/leads` | `GET` | Retrieves a potentially-filtered list of all leads in the data set. To filter the leads, use query parameters. (EX `/leads?consumer.state=OK` to filter down to only Oklahoma leads, `/leads?vehicle.0.make=HONDA` to filter down to only Honda vehicles, or `/leads?coverage.former_insurer=Monolith%20Casualty` to filter down to leads from a specific former insurer) |
| `/leads/:id` | `GET` | Attempts to retreive a lead with the given identifier. (EX `/leads/34879`) |
