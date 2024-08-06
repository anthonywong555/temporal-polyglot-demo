### Generate PB2 from Proto

```sh
protoc -I=. --python_out=. ai-messages.proto
```

Running Worker

```sh
poetry run python python/activity_worker.py
```